import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {apiCall} from "../../api";
import {
    ALERT_INTERVAL,
    BENGALI, BLANK_PLAYLIST, BODY_CENTER_BACKGROUND,
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
    SUCCESS_LOGIN_PIN_ERROR_CODE,
    BODY_CENTER_BACKGROUND_LOGIN
} from "../../config/Constants";
import {getValidationErrorMsg} from "../../config/ValidationErrorMsg";
import {isLoggedIn} from "../../config/Helpers";
import Loading from "../../Components/Loading/Loading";
import EmptyHeader from "../../Components/Header/EmptyHeader";
import styles from "../LoginAuth/LoginAuth.module.css";
import EmptyFooter from "../../Components/Footer/EmptyFooter";
import {getLoginPhoneElements} from "../Login/LoginElements";
import {confirmAlert} from "react-confirm-alert";
import AudioPlayerElement from "../../Components/AudioPlayer/AudioPlayerElement";
import TimeoutCounterElement from "../../Components/TimeoutCounter/TimeoutCounterElement";
import LoginElement from "../../Components/Elements/LoginElement";


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
            isFooterShow:true,
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

    componentDidMount() {
        var dType = this.deviceType();
        // console.log(document.querySelector('input'));
        if(dType === 'mobile'){
            document.querySelector('input').addEventListener('focusin',  ()=> {
                this.setState({isFooterShow:false})
            });
            document.querySelector('input').addEventListener('blur',  ()=> {
                this.setState({isFooterShow:true})
            });
        }
        this.handleSound(SOUND_ON)
        this.handleLoginPhone();

    }
     deviceType  ()  {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };

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
        //this.setState({isLoading: true});
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let authenticateInfo = params.toString();
        authenticateInfo = authenticateInfo.substring(0, authenticateInfo.length - 1);
        let authCode = params.toString();
        authCode = authenticateInfo.substring(0, 12);
        let alphaNumExp = /^[A-Za-z0-9]+$/; //regular expression for alphanumeric value
        if (authCode.length === 12 && alphaNumExp.test(authCode)) {
            const cli = authenticateInfo.substring(12, authenticateInfo.length);
            console.log(cli)
            const isValid = this.validateInput(cli);
            if (isValid) {
                try {
                    const parameters = {cli: cli, authCode: authCode};
                    console.log(LOGIN_AUTH_API_URL,parameters);
                    const responseData = await apiCall(LOGIN_AUTH_API_URL, parameters);
                    console.log(responseData);
                    if (typeof (responseData) !== "undefined") {
                        if (responseData.errorCode === SUCCESS_LOGIN_PIN_ERROR_CODE) {
                            cookies.set('token', responseData.data.token, {path: '/'});
                            cookies.set('key', responseData.data.key, {path: '/'});
                            const {history} = this.props;
                            history.push('/home');
                        } else {
                            // this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
                            this.redirect('/error');
                        }
                    } else {
                        // this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
                        this.redirect('/error');
                    }
                } catch (error) {
                    console.log(error);
                    // this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
                    this.redirect('/error');
                }
            }
        } else {
            // this.showPopup(this.state.errorMsg.invalidPhoneMsg[this.state.language]);
            this.redirect('/error');
        }
        this.setState({isLoading: false});
    }

    validateInput(cli) {
        let isValid = true;
        const language = this.state.language;
        if (cli.length === 0) {
            isValid = false;
            // this.showPopup(this.state.errorMsg.requiredPhoneMsg[language]);
            this.redirect('/error');
        } else if (!cli.match(/[0-9]/g) || cli.length !== LENGTH_OF_PHONE_NUMBER) {
            isValid = false;
            // this.showPopup(this.state.errorMsg.validNumberMsg[language]);
            this.redirect('/error');
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
        let bgSrc = process.env.PUBLIC_URL + "/image/" + BODY_CENTER_BACKGROUND_LOGIN;

        // let homeBgSrc = process.env.PUBLIC_URL + "/image/" + BODY_FULL_BACKGROUND;
        let elements = null;
        elements = <Loading/>;
        // if (this.state.isLoading) {
            
        // } else {
        //     elements = <LoginElement
        //         elementsData={elementsData}
        //         hasBackground={false}
        //         headingSize={2}
        //     />;
        // }
        let TimerComponent = null;
        if(this.state.showTimer){
            TimerComponent = <TimeoutCounterElement language={this.state.language} />;
        }
        return (
            <div className="App">
                <div className={styles.loginBg}>
                    {/*Fixme: Kept Off*/}
                    {/*<div className={styles.welcomeBgParent}> </div>*/}
                    <EmptyHeader/>

                    {/* <AudioPlayerElement
                        playlist={this.state.playlist[language]}
                        sound={this.state.sound}
                        audioIndex={this.state.audioIndex}
                    /> */}

                    {/*Fixme: Kept Off*/}
                    <div className={'d-none text-center ' + styles.greetings}>
                       {GREETINGS[language]}
                    </div>
                    {elements}
                </div>
                {this.state.isFooterShow?
                    <EmptyFooter
                        handleLanguage={this.handleLanguageChange}
                        soundButtonData={{
                            data: this.state.sound,
                            onClickHandler: this.handleSound.bind(this)
                        }}
                        isChecked={this.state.isChecked}
                    />:null
                }

            </div>
        );
    }
}

export default LoginAuthNew;
