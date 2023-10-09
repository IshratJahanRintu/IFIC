import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Elements from "../../Components/Elements/Elements";
import EmptyFooter from "../../Components/Footer/EmptyFooter";
import {apiCall} from "../../api";
import Loading from "../../Components/Loading/Loading";
import EmptyHeader from "../../Components/Header/EmptyHeader";
import styles from "./Login.module.css";
import "./Login.module.css";
import {getValidationErrorMsg} from "../../config/ValidationErrorMsg";
import {getLoginPhoneElements} from "./LoginElements";
import {
    ENGLISH,
    BENGALI,
    LOGIN_PHONE_API_URL,
    SUCCESS_LOGIN_PHONE_ERROR_CODE,
    LENGTH_OF_PHONE_NUMBER, CLOSE_POPUP
} from "../../config/Constants";
import Cookies from 'universal-cookie';
import {isLoggedIn} from "../../config/Helpers";
import Footer from "../../Components/Footer/Footer";
import {confirmAlert} from "react-confirm-alert";
// import Footer from "../../Components/Footer/Footer";

const cookies = new Cookies();

class Login extends Component {

    constructor(props) {
        super(props);
        this.checkIsLoggedIn();
        let language = ENGLISH;
        let isChecked = true;
        if ((typeof (cookies.get('language')) !== "undefined")) {
            language = cookies.get('language');
        } else {
            cookies.set('language', language, {path: '/'});
        }
        if ((typeof (cookies.get('isLanguageChecked')) !== "undefined")) {
            isChecked = (cookies.get('isLanguageChecked') === "true");
        } else {
            cookies.set('isLanguageChecked', isChecked, {path: '/'});
        }
        this.state = {
            cli: '',
            isLoading: false,
            isChecked: isChecked,
            language: language,
            errorMsg: getValidationErrorMsg()
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    checkIsLoggedIn() {
        if (isLoggedIn()) {
            this.redirect('/home');
        }
    }

    redirect(redirectTo) {
        const {history} = this.props;
        history.push(redirectTo);
    }

    handleChange(event) {
        this.setState({cli: event.target.value});
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

    async handleLoginPhone() {
        this.setState({isLoading: true});
        const {history} = this.props;
        const cli = this.state.cli.substring(this.state.cli.length - LENGTH_OF_PHONE_NUMBER);
        const isValid = this.validateInput(cli);
        if (isValid) {
            const parameters = {
                cli: cli
            }
            const responseData = await apiCall(LOGIN_PHONE_API_URL, parameters);
            this.setState({isLoading: false});
            if (typeof (responseData) !== "undefined") {
                if (responseData.errorCode === SUCCESS_LOGIN_PHONE_ERROR_CODE) {
                    cookies.set('cli', cli, {path: '/'});
                    history.push('/pin');
                } else {
                    // alert(this.state.errorMsg.unableToProcessMsg[this.state.language]);
                    this.showPopup(this.state.errorMsg.unableToProcessMsg[this.state.language]);
                }
            } else {
                // alert(this.state.errorMsg.invalidRequestMsg[this.state.language]);
                this.showPopup(this.state.errorMsg.invalidRequestMsg[this.state.language]);
            }
        } else {
            this.setState({isLoading: false});
        }
    }

    validateInput(cli) {
        let isValid = true;
        const language = this.state.language;
        if (cli.length === 0) {
            isValid = false;
            // alert(this.state.errorMsg.requiredPhoneMsg[language]);
            this.showPopup(this.state.errorMsg.requiredPhoneMsg[language]);
        } else if (!cli.match(/[0-9]/g) || cli.length !== LENGTH_OF_PHONE_NUMBER) {
            isValid = false;
            // alert(this.state.errorMsg.validNumberMsg[language]);
            this.showPopup(this.state.errorMsg.validNumberMsg[language]);
        }
        return isValid;
    }

    showPopup(message) {
        const language = this.state.language;

        confirmAlert({
            // title: title,
            message: message,
            buttons: [
                {
                    label: CLOSE_POPUP[language],
                }
            ]
        });
    }

    render() {
        const language = this.state.language;
        let loginData = getLoginPhoneElements(language);
        loginData.elementsData.pageContent[1].onClickHandler = this.handleLoginPhone.bind(this);
        loginData.elementsData.pageContent[0].inputProperties.eventHandler = this.handleChange.bind(this);
        const greetings = loginData.greetings;
        const elementsData = loginData.elementsData;

        if (this.state.isLoading) {
            return (
                <div className="App">
                    <Header greetings={greetings}/>
                    <Loading/>
                </div>
            );
        } else {
            let bgSrc = "";
            if (language === ENGLISH) {
                bgSrc = process.env.PUBLIC_URL + "/image/cityivr_welcome-bg-en.png";
            } else if (language === BENGALI) {
                bgSrc = process.env.PUBLIC_URL + "/image/cityivr_welcome-bg-bn.png";
            }
            return (
                <div className="App">
                    <div className={styles.welcomeBgParent}
                    >
                        <div
                            className={styles.welcomeBg}
                            style={{backgroundImage: `url(${bgSrc})`}}
                        >
                        </div>
                    </div>
                    <EmptyHeader
                        // greetings={greetings}
                        handleLanguage={this.handleLanguageChange}
                        isChecked={this.state.isChecked}
                    />
                    <div style={{height: '15vh'}}></div>
                    <Elements elementsData={elementsData} hasBackground={false}/>
                    <EmptyFooter/>
                    <Footer
                        previousButtonData={{
                            isHidden: true
                        }}
                        homeButtonData={{
                            isHidden: true
                        }}
                    />
                </div>
            );
        }
    }
}

export default Login;

