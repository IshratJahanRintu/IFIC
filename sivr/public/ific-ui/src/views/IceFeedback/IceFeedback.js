import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import PageDescriptionElement from "../../Components/Elements/PageText/PageDescription/PageDescriptionElement";
import styles from "./IceFeedback.module.css";
import Cookies from 'universal-cookie';
import backgroundStyles from "../../Components/Elements/Elements.module.css";
// import TimeoutCounterElement from "../../Components/TimeoutCounter/TimeoutCounterElement";
import {
    BENGALI,
    ENGLISH,
    NO,
    VIVR_FEEDBACK_URL,
    YES,
    ICE_DISPLAY_TEXT,
    YES_TEXT,
    NO_TEXT,
    SOUND_ON, SOUND_OFF, FEEDBACK_PLAYLIST, CITY_BANK_URL, BODY_FOOTER_BACKGROUND,
    BODY_CENTER_BACKGROUND
} from "../../config/Constants";
import {apiCall} from "../../api";
import {isLoggedIn} from "../../config/Helpers";
import Loading from "../../Components/Loading/Loading";
import Footer from "../../Components/Footer/Footer";
import AudioPlayerElement from "../../Components/AudioPlayer/AudioPlayerElement";

const cookies = new Cookies();

class IceFeedback extends Component {

    constructor(props) {
        super(props);
        this.checkIsLoggedIn();
        let sound = SOUND_ON;
        if ((typeof (cookies.get('sound')) !== "undefined")) {
            sound = cookies.get('sound');
        }
        this.state = {
            cli: cookies.get('cli'),
            key: cookies.get('key'),
            feedback: null,
            comment: null,
            sound: sound,
            isLoading: false,
            isChecked: (cookies.get('isLanguageChecked') === "true"),
            language: cookies.get('language'),
            playlist: FEEDBACK_PLAYLIST
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleIceFeedback = this.handleIceFeedback.bind(this);
        this.submitIceFeedback = this.submitIceFeedback.bind(this);
    }

    checkIsLoggedIn() {
        if (isLoggedIn()) {
            this.redirect('/home');
        }
        if (typeof (cookies.get('key')) === "undefined") {
            this.redirect("/")
        }
    }

    redirect(redirectTo) {
        const {history} = this.props;
        history.push(redirectTo);
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

    async handleIceFeedback(feedback) {
        this.setState({feedback: feedback})
        // this.setState({isLoading: true});
        // try {
        //     const parameters = {
        //         key: this.state.key,
        //         feedback: feedback
        //     }
        //     await apiCall(VIVR_FEEDBACK_URL, parameters);
        //     cookies.remove('key', {path: '/'});
        //     cookies.remove('cli', {path: '/'});
        //     window.location.replace(CITY_BANK_URL);
        //     // console.log(responseData);
        // } catch (error) {
        //     console.log("Error while handling load data");
        //     console.log(error);
        //     cookies.remove('key', {path: '/'});
        //     cookies.remove('cli', {path: '/'});
        //     this.redirect("/");
        // }
        // this.setState({isLoading: false});
    }

    async submitIceFeedback() {
        this.setState({isLoading: true});
        try {
            const parameters = {
                key: this.state.key,
                feedback: this.state.feedback,
                comment: JSON.stringify(this.state.comment)
            }
            await apiCall(VIVR_FEEDBACK_URL, parameters);
            cookies.remove('key', {path: '/'});
            cookies.remove('cli', {path: '/'});
            window.location.replace(CITY_BANK_URL);
            // console.log(responseData);
        } catch (error) {
            console.log("Error while handling load data");
            console.log(error);
            cookies.remove('key', {path: '/'});
            cookies.remove('cli', {path: '/'});
            this.redirect("/");
        }
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

    handleMessageChange = event => {
        this.setState({comment: event.target.value})
    };

    render() {
        const happyImageLink = process.env.PUBLIC_URL + "/image/happy.png";
        const sadImageLink = process.env.PUBLIC_URL + "/image/sad.png";
        const thanksImageLink = process.env.PUBLIC_URL + "/image/contact.gif";
        const badImo = process.env.PUBLIC_URL + "/image/feedback/bad.svg";
        const goodImo = process.env.PUBLIC_URL + "/image/feedback/good.svg";
        const okayImo = process.env.PUBLIC_URL + "/image/feedback/okay.svg";
        const amazingImo = process.env.PUBLIC_URL + "/image/feedback/amazing.svg";
        const terribleImo = process.env.PUBLIC_URL + "/image/feedback/terrible.svg";
        let bgSrc = process.env.PUBLIC_URL + "/image/" + BODY_CENTER_BACKGROUND;
        let language = this.state.language;
        let LoadingWeb = null;
        const backgroundImageSrc = process.env.PUBLIC_URL + "/image/" + BODY_FOOTER_BACKGROUND;
        let inlineStyle = {backgroundImage: `url(${backgroundImageSrc})`};
        if (this.state.isLoading === true) {
            LoadingWeb = <Loading/>;
        }

        return (
            <div className="App">
                <div className={styles.feedbackBg}>
                    <Header
                        handleLanguage={this.handleLanguageChange}
                        isChecked={this.state.isChecked}
                    />
                    <AudioPlayerElement
                        playlist={this.state.playlist[language]}
                        sound={this.state.sound}
                        audioIndex={null}
                    />
                    {/*<TimeoutCounterElement />*/}
                    {/* <div className={"container-fluid"}>
                        <div className="row">
                            <div className="col-md-7 mx-md-auto text-center">
                                <div className={styles.mtbFeedbackArea}>
                                    <div className={styles.gFeedbackHeader}>
                                        <PageDescriptionElement pageDescription={ICE_DISPLAY_TEXT[language]}/>
                                    </div>




                                    <div className={styles.gFeedbackSurvey}>
                                        <button>
                                            <img src={terribleImo} alt=""/>
                                            <span>Terrible</span>
                                        </button>
                                        <button>
                                            <img src={badImo} alt=""/>
                                            <span>Bad</span>
                                        </button>
                                        <button>
                                            <img src={okayImo} alt=""/>
                                            <span>Okay</span>
                                        </button>
                                        <button>
                                            <img src={goodImo} alt=""/>
                                            <span>Good</span>
                                        </button>
                                        <button>
                                            <img src={amazingImo} alt=""/>
                                            <span>Amazing</span>
                                        </button>
                                    </div>




                                    <div className={"text-left " + styles.ivrFeedbackMsg}>
                                        <strong>What are the main reasons for our rating?</strong>
                                        <textarea placeholder="Your feedback is important to us" name="" id="" cols="45" rows="5"></textarea>

                                        <label htmlFor="">
                                            <input type="checkbox" name="" id=""/>
                                            I may be contacted about this feedback. Privacy Policy
                                        </label>
                                        <label htmlFor="">
                                            <input type="checkbox" name="" id=""/>
                                            I'd like to help improve by joining the Research Group.
                                        </label>

                                        <button type="submit">SEND</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className={"container-fluid"}>
                        <div className="row">
                            <div className="col-md-6 mx-auto mt-5 pt-4">
                                <PageDescriptionElement pageDescription={ICE_DISPLAY_TEXT[language]}/>
                                <div className={styles.ratingDiv}>
                                    <div className="text-center">
                                        <button className={"btn btn-sm " + styles.feedbackButton} onClick={() => {
                                            this.handleIceFeedback(YES)
                                        }}>
                                            <img className={styles.feedbackIcon} src={happyImageLink} alt={"happy"}/>
                                            <div> {YES_TEXT[language]} </div>
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <button className={"btn btn-sm " + styles.feedbackButton} onClick={() => {
                                            this.handleIceFeedback(NO)
                                        }}>
                                            <img className={styles.feedbackIcon} src={sadImageLink} alt={"sad"}/>
                                            <div> {NO_TEXT[language]} </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Feedback Area*/}
                        <div className="row">
                            <div className="col-md-3 mx-auto mt-4">
                                <div className={styles.gFeedbackArea}>
                                    <textarea className="form-control" onChange={this.handleMessageChange} name="" id=""
                                              cols="20" rows="5" placeholder="Text here..."></textarea>
                                    <button type="submit" onClick={this.submitIceFeedback}
                                            className={"mt-3 btn btn-block  btn-danger w-100"}>{language == 'EN' ? 'SUBMIT' : 'সাবমিট'}</button>
                                </div>

                            </div>
                        </div>
                        {/*End Feedback Area*/}

                    </div>

                    {LoadingWeb}
                    <div className={"row " + backgroundStyles.elementsRootContainer} style={inlineStyle}></div>
                </div>
                <div className="fixed-bottom text-center mb-3">
                    <h6 className={"text-danger"}>Powered by gPlex</h6>
                </div>
            </div>
        );
    }
}

export default IceFeedback;
