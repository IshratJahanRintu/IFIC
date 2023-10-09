import React, {Component} from 'react';
import ItemCarousel from '../../Components/ItemCarousel/itemCarousel'
import Header from "../../Components/Header/Header";
import Loading from "../../Components/Loading/Loading";
import Footer from "../../Components/Footer/Footer";
import Elements from "../../Components/Elements/Elements";
import {vivrDataCall} from "../../api/vivr-data";
import Cookies from 'universal-cookie';
import Copyright from "../../Components/Elements/PageText/Copyright";
import {
    BENGALI,
    ENGLISH,
    VIVR_DATA_API_URL,
    LOGOUT_TEXT,
    DEFAULT_BULLETIN,
    SOUND_ON,
    SOUND_OFF,
    ALERT_INTERVAL,
    MAX_ALERT_COUNT,
    SESSION_TIMEOUT_TEXT,
    SESSION_TIMEOUT_PLAYLIST,
    LOGOUT_API_URL,
    MANUAL_LOGOUT, IDLE_LOGOUT, BODY_FOOTER_BACKGROUND, CLOSE_POPUP, BLANK_PLAYLIST,
    BODY_ISLAMIC_BACKGROUND_BN, BODY_CONVENTIONAL_BACKGROUND_BN, EXP_DATE
} from "../../config/Constants";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BulletinElement from "../../Components/Bulletin/BulletinElement";
import TimeoutCounterElement from "../../Components/TimeoutCounter/TimeoutCounterElement";
import styles from "../../Components/Elements/Elements.module.css";
import AudioPlayerElement from "../../Components/AudioPlayer/AudioPlayerElement";
import IdleTimer from 'react-idle-timer';
import {getValidationErrorMsg} from "../../config/ValidationErrorMsg";
import AccountTypeToggle from "./AccountTypeToggle"
import CallToAction from "../CallToAction/CallToAction";
const cookies = new Cookies();

class VivrData extends Component {
    constructor(props) {
        super(props);
        this.idleTimer = null
        let sound = SOUND_ON;
        if ((typeof (cookies.get('sound')) === "undefined")) {
            cookies.set('sound', sound, {path: '/'});
        }
        this.state = {
            isFooterShow:true,
            checked: false,
            selectedButton:null,
            accountType: "C",
            cli: cookies.get('cli'),
            token: cookies.get('token'),
            key: cookies.get('key'),
            sound: cookies.get('sound'),
            isLoading: true,
            isChecked: (cookies.get('isLanguageChecked') === "true"),
            language: cookies.get('language'),
            pageContent: null,
            sliderData:null,
            currentPage: null,
            buttonId: "",
            playlist: null,
            playlistAction: null,
            inputData: "",
            bulletinMessage: DEFAULT_BULLETIN,
            alertCount: 0,
            showTimer: false,
            audioIndex: null,
            inputName: null,
            inputValue: null,
            homeMenuData:null,
            errorMsg: getValidationErrorMsg()
        };
        this.getVivrData = this.getVivrData.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleSound = this.handleSound.bind(this);
        this.handleDynamicInput = this.handleDynamicInput.bind(this);
        this.handleOnAction = this.handleOnAction.bind(this);
        this.handleOnIdle = this.handleOnIdle.bind(this);
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
        window.addEventListener("scroll",function(){
            window.scrollTo(0,0)
        },false)
        await this.getVivrData();
    }


    async getVivrData() {
        this.setState({isLoading: true});
        const cli = this.state.cli;
        const key = this.state.key;
        const token = this.state.token;
        try {
            const parameters = {
                cli: cli,
                key: key,
                type:this.state.accountType
            }
            const responseData = await vivrDataCall(VIVR_DATA_API_URL, parameters, token);
            this.setState({pageContent: responseData.data});
            //if page is home page then set home menu in diffrent state for slider
            if(responseData.data.page_type == 'HM'){
                this.setState({homeMenuData:responseData.data.pageContent})
            }
            this.setState({currentPage: responseData.data.currentPage});
            // this.setState({bulletinMessage: responseData.data.bulletinMessage});
            this.setState({playlist: responseData.data.audioFiles});
            this.setState({playlistAction: responseData.data.audioFiles});
        } catch (error) {
            console.log("Error while handling load data");
            console.log(error);
            this.logout("/");
        }
        this.setState({isLoading: false});
    }

    async handleMenu(buttonId, buttonValue, action ,param4, sliderItem=null , resendOtp = false) {
        let buttonIdData = "";
        if (buttonId !== null) {
            buttonIdData = buttonId;
            if(this.state.pageContent.page_type=='HM' || sliderItem){
                this.setState({selectedButton:buttonIdData})
            }
        }
        this.setState({isLoading: true});
        const previousPage = this.state.currentPage;
        const key = this.state.key;
        const token = this.state.token;
        const userInput = JSON.stringify(this.state.inputData);
        let isInputValid = true;
        
        // h = Home Button and p = Previous Button
        if (buttonValue !== 'h' && buttonValue !== 'p') {

            if (this.state.inputName !== null) {
                if (this.state.inputValue === null || this.state.inputValue === "") {
                    isInputValid = false;
                }
            }
            
            const pageContentList = this.state.pageContent.pageContent;
            const stateInputData = this.state.inputData;
            for (const element of pageContentList) {
                if(element.elementType == "dynamicInput"){
                    if(element.inputProperties.isRequired == 'Y'){
                        if(!stateInputData){
                            isInputValid = false;
                            break;
                        }
                        const elementName =  element.inputProperties.name;
                        if ( typeof(stateInputData) != 'object' || !stateInputData.hasOwnProperty(elementName) || stateInputData[elementName] == ''  ) {
                            isInputValid = false;
                            break;
                        }
                    }
                }
            }
        }
        // if(!isInputValid){
        //     if(resendOtp || this.state.inputValue.includes('/')){
        //         isInputValid = true;
        //     }
        // }
        if(isInputValid){
            try {
                const parameters = {
                    previousPage: previousPage,
                    buttonId: buttonIdData,
                    buttonValue: buttonValue,
                    action: action,
                    userInput: userInput,
                    language: this.state.language,
                    sound: this.state.sound,
                    key: key,
                }

                const responseData = await vivrDataCall(VIVR_DATA_API_URL, parameters, token);
                this.setState({pageContent: responseData.data});
                //if page is home page then set home menu in diffrent state for slider
                if(responseData.data.page_type == 'HM'){
                    this.setState({sliderData:responseData.data.pageContent})
                }
                this.setState({currentPage: responseData.data.currentPage});
                // this.setState({bulletinMessage: responseData.data.bulletinMessage});
                this.setState({playlist: responseData.data.audioFiles});
                this.setState({playlistAction: responseData.data.audioFiles});
                this.setState({inputData: ""});
                this.setState({inputName: null});
                this.setState({inputValue: null});
                // console.log(responseData);
            } catch (error) {
                console.log("Error while handling load data");
                // console.log(error);
                // this.redirect("/error");
                // this.logout("/");
            }
        } else {
            this.showPopup(this.state.errorMsg.fieldRequired[this.state.language]);
        }
        this.setState({isLoading: false});
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

    handleLogout() {
        const language = this.state.language;

        confirmAlert({
            title: LOGOUT_TEXT.title[language],
            message: LOGOUT_TEXT.message[language],
            buttons: [
                {
                    label: LOGOUT_TEXT.label.YES[language],
                    onClick: () => {
                        this.logout("/feedback", MANUAL_LOGOUT);
                    }
                },
                {
                    label: LOGOUT_TEXT.label.NO[language],
                }
            ]
        });
    }

    logout(redirectTo, type) {
        cookies.remove('token', {path: '/'});
        this.handleLogoutTask(type);
        this.redirect(redirectTo);
    }

    async handleLogoutTask(logoutType) {
        this.setState({isLoading: true});
        const key = this.state.key;
        const token = this.state.token;
        const type = logoutType;
        try {
            const parameters = {
                type: type,
                key: key,
            }
            const responseData = await vivrDataCall(LOGOUT_API_URL, parameters, token);
            return responseData;
        } catch (error) {
            this.redirect("/error");
        }
        this.setState({isLoading: false});
    }

    redirect(redirectTo) {
        const {history} = this.props;
        history.push(redirectTo);
    }

    async handleDynamicInput(name, value) {
        let currentState = this.state.inputData;
        if (currentState == "") {
            currentState = {[name]: value};
        } else {
            if (name in currentState)
                if(name == EXP_DATE){
                    let indexOfSpacialCharacter = value.lastIndexOf('/');
                    if(indexOfSpacialCharacter != -1){
                        value =  value.replace('/', '');
                    }
                }
                currentState[name] = value;
        }
        await  this.setState({inputData: currentState});
        await this.setState({inputName: name});
        await this.setState({inputValue: value});
    }

    showPopup(message) {
        const language = this.state.language;

        confirmAlert( {
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
        this.setState({playlist: this.state.playlistAction});
    }

    handleOnIdle() {
        this.idleTimer.reset();
        let alertCount = this.state.alertCount;
        if (alertCount > MAX_ALERT_COUNT) {
            this.logout("/feedback", IDLE_LOGOUT);
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
    /**
     * Handle To Change Toggle Button
     * Change State Value And Checked Type  if state is change
     * This function use for change Conventional and islamic banking type change
     * When This function called toggle button position change depend on bank type and status
     *
     */
     handleBnkingType = async () => {
        await  this.setState({checked: !this.state.checked});
        if (this.state.accountType === "C") {
            await this.setState({accountType: "I"});
        } else {
            await this.setState({accountType: "C"});
        }
        await this.getVivrData();
    }

    mangeFooterBarSection = (status)=>{
         this.setState({isFooterShow:status})
    }



    render() {
        let TimerComponent = null;
        if(this.state.showTimer){
            TimerComponent = <TimeoutCounterElement language={this.state.language} />;
        }
        if (this.state.isLoading || this.state.pageContent === null) {
            const backgroundImageSrc = process.env.PUBLIC_URL + "/image/"+ BODY_FOOTER_BACKGROUND;
            let rootDivClass = styles.elementsRootContainer;
            let inlineStyle = {backgroundImage: `url(${backgroundImageSrc})`};
            return (
                <div className="App full-height ">
                    <Header handleLanguage={this.handleLanguageChange} isChecked={this.state.isChecked} />
                    <Loading/>
                    <div className={"container-fluid "}>
                        <div className={"row " + rootDivClass} style={inlineStyle} />
                    </div>
                    <BulletinElement bulletinMessage={this.state.bulletinMessage} />
                    <Footer
                        soundButtonData={{
                            data: this.state.sound,
                            onClickHandler: this.handleSound.bind(this)
                        }}
                    />
                </div>
            );
        } else {
            const language = this.state.language;
            let bgSrcIslamic = process.env.PUBLIC_URL + "/image/" + BODY_ISLAMIC_BACKGROUND_BN;
            let bgSrcConventional = process.env.PUBLIC_URL + "/image/" + BODY_CONVENTIONAL_BACKGROUND_BN;
            return (
                <div className={"App full-height"}>
                    <IdleTimer
                        ref={ref => {
                            this.idleTimer = ref
                        }}
                        timeout={100 * ALERT_INTERVAL}
                        onIdle={this.handleOnIdle}
                        onAction={this.handleOnAction}
                    />

                    <div className="fixed-top-header">
                        <Header handleLanguage={this.handleLanguageChange} isChecked={this.state.isChecked} accType={this.state.accountType} />
                        {/*<div className="container-fluid">*/}
                        {/*    <div className="row">*/}
                        {/*        <div className="col-md-6 mx-md-auto d-flex justify-content-between align-items-center">*/}
                        {/*            <div className="">*/}
                        {/*                {TimerComponent}*/}
                        {/*            </div>*/}

                        {/*            <div className="">*/}
                        {/*                <AccountTypeToggle switchMode={this.state.checked} handleTochangeSwitch={this.handleBnkingType} />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <AudioPlayerElement
                        playlist={this.state.playlist[language]}
                        sound={this.state.sound}
                        audioIndex={this.state.audioIndex}
                    />

                        <Elements className={'btn btn-danger'}
                            handleFooterSction={this.mangeFooterBarSection}
                            isMenuItem={true}
                            elementsData={this.state.pageContent}
                            language={language}
                            onClickHandler={this.handleMenu}
                            onChangeHandler={this.handleDynamicInput}
                            colSize={6}
                        />



                    {this.state.pageContent.page_type === 'HM' && this.state.isFooterShow?( <div  className="container-fluid">
                        <div className="row" style={{marginBottom:65}}>
                            <div className="col-md-6 mx-md-auto">
                                <Copyright/>
                            </div>
                        </div>
                    </div>):null}


                    {this.state.isFooterShow?<BulletinElement bulletinMessage={this.state.bulletinMessage} />:null}

                    {/*{this.state.pageContent.page_type !=='HM' && this.state.isFooterShow ?(<ItemCarousel onClickHandler={this.handleMenu} selectedButton={this.state.selectedButton}  language={language} sliderData={this.state.sliderData} />):null}*/}


                    {this.state.pageContent.page_type !== 'HM' && this.state.isFooterShow?( <div  className="container-fluid">
                        <div className="row" style={{marginBottom:70}}>
                            <div className="col-md-6 mx-md-auto">
                                <Copyright/>
                            </div>
                        </div>
                    </div>):null}


                    <Footer
                        previousButtonData={{
                            data: this.state.pageContent.previousPage,
                            onClickHandler: this.handleMenu.bind(this)
                        }}
                        homePageData={{
                            data: this.state.homeMenuData,
                            onClickHandler: this.handleMenu.bind(this)
                        }}
                        // handleLanguage={this.handleLanguageChange}
                        // isChecked={this.state.isChecked}
                        homeButtonData={{
                            data: this.state.pageContent.homePage,
                            onClickHandler: this.handleMenu.bind(this)
                        }}
                        soundButtonData={{
                            data: this.state.sound,
                            onClickHandler: this.handleSound.bind(this)
                        }}
                        logoutButtonData={{
                            data: true,
                            onClickHandler: this.handleLogout.bind(this)
                        }}
                        language={language}
                    />

                    <CallToAction/>
                </div>
            );
        }
    }
}

export default VivrData;
