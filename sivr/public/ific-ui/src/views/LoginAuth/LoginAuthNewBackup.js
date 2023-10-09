import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {apiCall} from "../../api";
import {
    ALERT_INTERVAL,
    BENGALI, BLANK_PLAYLIST,
    BODY_CENTER_BACKGROUND_BN,
    BODY_CENTER_BACKGROUND_EN,
    BODY_FULL_BACKGROUND, CITY_BANK_URL,
    CLOSE_POPUP,
    ENGLISH, GREETINGS,
    LENGTH_OF_PHONE_NUMBER,
    LINK_TIMEOUT_ERROR_MSG,
    LOGIN_AUTH_API_URL,
    LOGIN_PLAYLIST, LOGOUT_TEXT,
    MAX_ALERT_COUNT,
    SESSION_TIMEOUT_PLAYLIST,
    SESSION_TIMEOUT_TEXT,
    SOUND_OFF,
    SOUND_ON,
    SUCCESS_LOGIN_PIN_ERROR_CODE
} from "../../config/Constants";
import {getValidationErrorMsg} from "../../config/ValidationErrorMsg";
import {isLoggedIn} from "../../config/Helpers";
import Loading from "../../Components/Loading/Loading";
import EmptyHeader from "../../Components/Header/EmptyHeader";
import styles from "../LoginAuth/LoginAuth.module.css";
import Footer from "../../Components/Footer/Footer";
import EmptyFooter from "../../Components/Footer/EmptyFooter";
import Elements from "../../Components/Elements/Elements";
import {getLoginPhoneElements} from "../Login/LoginElements";
import {confirmAlert} from "react-confirm-alert";
import AudioPlayerElement from "../../Components/AudioPlayer/AudioPlayerElement";
import IdleTimer from "react-idle-timer";
import TimeoutCounterElement from "../../Components/TimeoutCounter/TimeoutCounterElement";


const cookies = new Cookies();

class LoginAuthNew extends Component {
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

        let sound = SOUND_ON;
        if ((typeof (cookies.get('sound')) === "undefined")) {
            cookies.set('sound', sound, {path: '/'});
        }
        this.state = {
            cli: '',
            isLoading: false,
            playlist: LOGIN_PLAYLIST,
            sound: cookies.get('sound'),
            audioIndex: 0,
            alertCount: 0,
            showTimer: false,
            isChecked: isChecked,
            language: language,
            errorMsg: getValidationErrorMsg()
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSound = this.handleSound.bind(this);
        this.handleOnAction = this.handleOnAction.bind(this);
        this.handleOnIdle = this.handleOnIdle.bind(this);
    }

    checkIsLoggedIn() {
        if (isLoggedIn()) {
            this.redirect('/home');
        }
    }

    redirect(redirectTo) {
        const {history} = this.props;
        history.push({
            pathname: redirectTo,
            state: {errorMsg: LINK_TIMEOUT_ERROR_MSG}
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

    handleSound(status) {
        if (status === SOUND_ON) {
            this.setState({sound: SOUND_ON});
            cookies.set('sound', SOUND_ON, {path: '/'});
        } else if (status === SOUND_OFF) {
            this.setState({sound: SOUND_OFF});
            cookies.set('sound', SOUND_OFF, {path: '/'});
        }
    }

    handleChange(event) {
        this.setState({cli: event.target.value});
    }

    async handleLoginPhone() {
        this.setState({isLoading: true});
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let authCode = params.toString();
        authCode = authCode.substring(0, authCode.length - 1);
        let alphaNumExp = /^[A-Za-z0-9]+$/; //regular expression for alphanumeric value
        if (authCode.length === 12 && alphaNumExp.test(authCode)) {
            const cli = this.state.cli.substring(this.state.cli.length - LENGTH_OF_PHONE_NUMBER);
            const isValid = this.validateInput(cli);
            if (isValid) {
                try {
                    const parameters = {cli: cli, authCode: authCode};
                    const responseData = await apiCall(LOGIN_AUTH_API_URL, parameters);
                    if (typeof (responseData) !== "undefined") {
                        if (responseData.errorCode === SUCCESS_LOGIN_PIN_ERROR_CODE) {
                            cookies.set('token', responseData.data.token, {path: '/'});
                            cookies.set('key', responseData.data.key, {path: '/'});
                            const {history} = this.props;
                            history.push('/home');
                        } else {
                            this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
                        }
                    } else {
                        this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
                        // this.redirect('/error');
                    }
                } catch (error) {
                    console.log(error);
                    this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
                }
            }
        } else {
            this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
        }
        this.setState({isLoading: false});
    }

    validateInput(cli) {
        let isValid = true;
        const language = this.state.language;
        if (cli.length === 0) {
            isValid = false;
            this.showPopup(this.state.errorMsg.requiredPhoneMsg[language]);
        } else if (!cli.match(/[0-9]/g) || cli.length !== LENGTH_OF_PHONE_NUMBER) {
            isValid = false;
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

    sessionTimeoutAlert() {
        const language = this.state.language;

        confirmAlert({
            title: SESSION_TIMEOUT_TEXT.title[language],
            message: SESSION_TIMEOUT_TEXT.message[language],
            buttons: [
                {
                    label: SESSION_TIMEOUT_TEXT.label[language],
                }
            ]
        });
    }

    handleOnAction() {
        this.setState({alertCount: 0});
        this.setState({showTimer: false});
        this.setState({audioIndex: null});
        this.setState({playlist: LOGIN_PLAYLIST});
    }

    handleOnIdle() {
        this.idleTimer.reset();
        let alertCount = this.state.alertCount;
        if (alertCount > MAX_ALERT_COUNT) {
            this.redirectToUrl();
            return;
        }
        alertCount++;
        this.setState({alertCount: alertCount});
        if(alertCount === 1) return;
        this.sessionTimeoutAlert();
        if ((alertCount % 2) === 1) {
            this.setState({playlist: BLANK_PLAYLIST});
            this.setState({audioIndex: 0});
            return
        }
        this.setState({showTimer: true});
        this.setState({playlist: SESSION_TIMEOUT_PLAYLIST});
        this.setState({audioIndex: 0});
    }

    handleLogout() {
        const language = this.state.language;

        confirmAlert({
            title: LOGOUT_TEXT.title[language],
            message: LOGOUT_TEXT.message[language],
            buttons: [
                {
                    label: LOGOUT_TEXT.label.YES[language],
                    onClick: () => {
                        this.setState({isLoading: true});
                        this.redirectToUrl();
                    }
                },
                {
                    label: LOGOUT_TEXT.label.NO[language],
                }
            ]
        });
    }

    redirectToUrl() {
        window.location.replace(CITY_BANK_URL);
    }

    render() {
        const language = this.state.language;
        let loginData = getLoginPhoneElements(language);
        loginData.elementsData.pageContent[1].onClickHandler = this.handleLoginPhone.bind(this);
        loginData.elementsData.pageContent[0].inputProperties.eventHandler = this.handleChange.bind(this);
        const elementsData = loginData.elementsData;
        let bgSrc = "";
        if (language === ENGLISH) {
            bgSrc = process.env.PUBLIC_URL + "/image/" + BODY_CENTER_BACKGROUND_EN;
        } else if (language === BENGALI) {
            bgSrc = process.env.PUBLIC_URL + "/image/" + BODY_CENTER_BACKGROUND_BN;
        }
        let homeBgSrc = process.env.PUBLIC_URL + "/image/" + BODY_FULL_BACKGROUND;
        let elements = null;
        if (this.state.isLoading) {
            elements = <Loading/>;
        } else {
            elements = <Elements
                elementsData={elementsData}
                hasBackground={false}
                headingSize={2}
            />;
        }
        let TimerComponent = null;
        if(this.state.showTimer){
            TimerComponent = <TimeoutCounterElement language={this.state.language} />;
        }
        return (
            <div className="App">
                <div className={styles.loginBg} style={{backgroundImage: `url(${homeBgSrc})`}}>
                    <div className={styles.welcomeBgParent}>
                        <div
                            className={styles.welcomeBg}
                            style={{backgroundImage: `url(${bgSrc})`}}
                        >
                        </div>
                    </div>
                    <EmptyHeader
                        handleLanguage={this.handleLanguageChange}
                        isChecked={this.state.isChecked}
                    />
                    <IdleTimer
                        ref={ref => {
                            this.idleTimer = ref
                        }}
                        timeout={1000 * ALERT_INTERVAL}
                        onIdle={this.handleOnIdle}
                        onAction={this.handleOnAction}
                    />
                    {TimerComponent}
                    <AudioPlayerElement
                        playlist={this.state.playlist[language]}
                        sound={this.state.sound}
                        audioIndex={this.state.audioIndex}
                    />
                    <div style={{height: '10vh'}}></div>
                    <div className={'d-block d-sm-none text-center text-white position-relative ' + styles.greetings}>
                        {GREETINGS[language]}
                    </div>
                    {elements}
                </div>

                <EmptyFooter/>
                <Footer
                    previousButtonData={{
                        isHidden: true
                    }}
                    homeButtonData={{
                        isHidden: true
                    }}
                    soundButtonData={{
                        data: this.state.sound,
                        onClickHandler: this.handleSound.bind(this)
                    }}
                    logoutButtonData={{
                        data: true,
                        onClickHandler: this.handleLogout.bind(this)
                    }}
                    justifyContentCenter={true}
                />
            </div>
        );
    }
}

export default LoginAuthNew;
