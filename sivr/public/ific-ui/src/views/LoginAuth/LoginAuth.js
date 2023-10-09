import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {apiCall} from "../../api";
import {
    BENGALI,
    ENGLISH,
    LOGIN_AUTH_API_URL,
    SUCCESS_LOGIN_PIN_ERROR_CODE
} from "../../config/Constants";
import {getValidationErrorMsg} from "../../config/ValidationErrorMsg";
import {isLoggedIn} from "../../config/Helpers";
import Header from "../../Components/Header/Header";
import Loading from "../../Components/Loading/Loading";


const cookies = new Cookies();

class LoginAuth extends Component {
    constructor(props) {
        super(props);
        this.checkIsLoggedIn();
        let isChecked = true;
        let language = ENGLISH;

        if ((typeof (cookies.get('isLanguageChecked')) !== "undefined")) {
            isChecked = (cookies.get('isLanguageChecked') === "true");
        } else {
            cookies.set('isLanguageChecked', isChecked, {path: '/'});
        }

        if ((typeof (cookies.get('language')) !== "undefined")) {
            language = cookies.get('language');
        } else {
            cookies.set('language', language, {path: '/'});
        }
        this.state = {
            cli: '',
            isLoading: true,
            isChecked: isChecked,
            language: language,
            errorMsg: getValidationErrorMsg()
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    checkIsLoggedIn() {
        if (isLoggedIn()) {
            this.redirect('/home');
        }
    }

    redirect(redirectTo) {
        const {history} = this.props;
        const errorMsg = {
            "EN" : "Sorry, Link has been expired",
            "BN" : "দুঃখিত, লিঙ্কটির মেয়াদ শেষ হয়ে গেছে"
        };
        history.push({
            pathname: redirectTo,
            state: {errorMsg: errorMsg}
        });
    }

    handleLanguageChange(isChecked) {
        if (isChecked) {
            this.setState({
                language: ENGLISH,
                isChecked: isChecked
            });
            cookies.set('language', ENGLISH, {path: '/'});
        } else {
            this.setState({
                language: BENGALI,
                isChecked: isChecked
            });
            cookies.set('language', BENGALI, {path: '/'});
        }
        cookies.set('isLanguageChecked', isChecked, {path: '/'});
    }

    async componentDidMount() {
        this.checkIsLoggedIn();
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let authCode = params.toString();
        authCode = authCode.substring(0, authCode.length - 1);
        let alphaNumExp = /^[A-Za-z0-9]+$/;
        if (authCode.length === 12 && alphaNumExp.test(authCode)) {
            const parameters = {authCode: authCode};
            const responseData = await apiCall(LOGIN_AUTH_API_URL, parameters);
            if (typeof (responseData) !== "undefined") {
                if (responseData.errorCode === SUCCESS_LOGIN_PIN_ERROR_CODE) {
                    cookies.set('token', responseData.data.token, {path: '/'});
                    cookies.set('key', responseData.data.key, {path: '/'});
                    const {history} = this.props;
                    history.push('/home', {
                        language: ENGLISH,
                        isChecked: true
                    });
                } else {
                    this.redirect("/error");
                }
            } else {
                this.redirect("/error");
            }
        } else {
            this.redirect("/error");
        }
        return null;
    }

    render() {
        return (
            <div className="App">
                <Header
                    handleLanguage={this.handleLanguageChange}
                    isChecked={this.state.isChecked}
                />
                <Loading/>
            </div>
        );
    }
}

export default LoginAuth;
