import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Elements from "../../Components/Elements/Elements";
import {apiCall} from "../../api";
import Loading from "../../Components/Loading/Loading";
import {getValidationErrorMsg} from "../../config/ValidationErrorMsg";
import {getLoginPinElements} from "../LoginPin/LoginPinElements";
import Cookies from 'universal-cookie';
// import styles from './LoginPin.module.css';
import {
    ENGLISH,
    BENGALI,
    LOGIN_PIN_API_URL,
    SUCCESS_LOGIN_PIN_ERROR_CODE,
    LENGTH_OF_PIN,
    LENGTH_OF_PHONE_NUMBER, CLOSE_POPUP,
} from "../../config/Constants";
// import Footer from "../../Components/Footer/Footer";
// import TimeoutCounterElement from "../../Components/TimeoutCounter/TimeoutCounterElement";
import {isLoggedIn} from "../../config/Helpers";
import Footer from "../../Components/Footer/Footer";
import {confirmAlert} from "react-confirm-alert";
// import BulletinElement from "../../Components/Bulletin/BulletinElement";

const cookies = new Cookies();

class LoginPin extends Component {
    constructor(props) {
        super(props);
        this.checkIsLoggedIn();
        this.state = {
            pin: '',
            isLoading: false,
            cli: cookies.get('cli'),
            isChecked: (cookies.get('isLanguageChecked') === "true"),
            language: cookies.get('language'),
            errorMsg: getValidationErrorMsg()
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    checkIsLoggedIn() {
        if (isLoggedIn()) {
            this.redirect('/home');
        }
        if ((typeof (cookies.get('cli')) === "undefined")) {
            this.redirect("/");
        }
    }

    redirectLogin(){
        this.redirect("/");
    }

    redirect(redirectTo) {
        const {history} = this.props;
        history.push(redirectTo);
    }

    handleChange(event) {
        this.setState({pin: event.target.value});
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

    async handleLoginPin() {
        this.setState({isLoading: true});
        const {history} = this.props;
        const cli = this.state.cli;
        const pin = this.state.pin;
        const isValid = this.validateInput(cli, pin);

        if (isValid) {
            const parameters = {
                cli: cli,
                pin: pin
            }
            const responseData = await apiCall(LOGIN_PIN_API_URL, parameters);
            if (typeof (responseData) !== "undefined") {
                if (responseData.errorCode === SUCCESS_LOGIN_PIN_ERROR_CODE) {
                    const cookies = new Cookies();
                    cookies.set('cli', cli, {path: '/'});
                    cookies.set('token', responseData.data.token, {path: '/'});
                    cookies.set('key', responseData.data.key, {path: '/'});
                    history.push('/home', {
                        cli: cli,
                        language: this.state.language,
                        isChecked: this.state.isChecked
                    });
                } else {
                    // alert(this.state.errorMsg.unableToProcessMsg[this.state.language]);
                    this.showPopup(this.state.errorMsg.unableToProcessMsg[this.state.language]);
                }
            } else {
                // alert(this.state.errorMsg.invalidRequestMsg[this.state.language]);
                this.showPopup(this.state.errorMsg.invalidRequestMsg[this.state.language]);
            }
        }
        this.setState({isLoading: false});
    }

    validateInput(cli, pin) {
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
        } else if (pin.length === 0) {
            isValid = false;
            // alert(this.state.errorMsg.requiredPinMsg[language]);
            this.showPopup(this.state.errorMsg.requiredPinMsg[language]);
        } else if (!pin.match(/[0-9]/g) || pin.length !== LENGTH_OF_PIN) {
            isValid = false;
            // alert(this.state.errorMsg.validPinMsg[language]);
            this.showPopup(this.state.errorMsg.validPinMsg[language]);
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
        let loginPinData = getLoginPinElements(language);
        loginPinData.elementsData.pageContent[1].onClickHandler = this.handleLoginPin.bind(this);
        loginPinData.elementsData.pageContent[0].inputProperties.eventHandler = this.handleChange.bind(this);
        const elementsData = loginPinData.elementsData;

        if (this.state.isLoading) {
            return (
                <div className="App">
                    <Header
                        handleLanguage={this.handleLanguageChange}
                        isChecked={this.state.isChecked}
                    />
                    <Loading/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Header
                        handleLanguage={this.handleLanguageChange}
                        isChecked={this.state.isChecked}
                    />
                    {/*<TimeoutCounterElement />*/}
                    {/*<div className={styles.emptySpace}></div>*/}
                    <Elements elementsData={elementsData}/>
                    {/*<BulletinComponent />*/}
                    <Footer
                        previousButtonData={{
                            data: true,
                            onClickHandler: this.redirectLogin.bind(this)
                        }}
                    />
                </div>
            );
        }
    }
}

export default LoginPin;
