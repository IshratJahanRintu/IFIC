import React, {Component} from "react";
import FooterButton from "./FooterButton";
import LanguageToggle from "../Header/LanguageToggle";
import styles from "./Footer.module.css";
import {
    HOME_BUTTON_IMAGE, LOGOUT_BUTTON_IMAGE, PREVIOUS_BUTTON_IMAGE,
    SOUND_OFF,
    SOUND_OFF_BUTTON_IMAGE,
    SOUND_ON_BUTTON_IMAGE
} from "../../config/Constants";
import SoundToggleButton from "./SoundToggleButton";
import PopMenu from "../PopMenu/PopMenu";


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popMenu: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.makePopMenuFalse = this.makePopMenuFalse.bind(this);
    }

    handleClick() {
        this.setState({
            popMenu: true
        });
    }

    makePopMenuFalse() {
        this.setState({
            popMenu: false
        });
    }

    render() {

        const previousButtonData = this.props.previousButtonData;
        const homeButtonData = this.props.homeButtonData;
        const soundButtonData = this.props.soundButtonData;
        const logoutButtonData = this.props.logoutButtonData;

        let soundImageSource = SOUND_ON_BUTTON_IMAGE;
        if (soundButtonData !== undefined) {
            if (soundButtonData.data === SOUND_OFF) {
                soundImageSource = SOUND_OFF_BUTTON_IMAGE;
            }
        }
        let previousButton = <div className={""}><FooterButton buttonImage={PREVIOUS_BUTTON_IMAGE}
                                                               buttonData={previousButtonData}/></div>;
        let homeButton = <div className={""}><FooterButton buttonImage={HOME_BUTTON_IMAGE} buttonData={homeButtonData}/>
        </div>;
        let soundToggleButton = <SoundToggleButton buttonImage={soundImageSource} buttonData={soundButtonData}/>;
        let logoutButton = <FooterButton buttonImage={LOGOUT_BUTTON_IMAGE} buttonData={logoutButtonData}/>;
        if (this.props.previousButtonData !== undefined) {
            if (this.props.previousButtonData.isHidden === true) {
                previousButton = "";
            }
        }
        if (this.props.homeButtonData !== undefined) {
            if (this.props.homeButtonData.isHidden === true) {
                homeButton = "";
            }
        }
        let justifyClass = "justify-content-around";
        if (this.props.justifyContentCenter) {
            justifyClass = "justify-content-center";
        }

        return (
            <div className={"position-relative"}>
                <div className={styles.bottomFooter + " container-fluid fixed-bottom px-3"}
                >
                    <div className={"row"}>
                        <div className={"col-lg-12 footer-style justify-content-between align-items-center pb-1"}>

                            {/*Fixme: Next, Previous & Language Button Kept off*/}

                           {/* <div className="inner-language-btn" style={{marginTop:-18}}>
                                <LanguageToggle
                                    handleLanguageChange={this.props.handleLanguage}
                                    isChecked={this.props.isChecked}
                                />
                            </div> */}


                            {/*Fixme: Will be a Separate Components*/}
                            <div className="" onClick={this.handleClick}>
                                <svg style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" fill="#ffffff"
                                     className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                                </svg>

                            </div>
                            {previousButton}
                            <div className={""}>{soundToggleButton}</div>
                            {homeButton}
                            <div className={""}>{logoutButton}</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.popMenu &&
                    <PopMenu
                        language={this.props.language}
                        homePageData = {this.props.homePageData}
                        popMenuProp={this.state.popMenu}
                        parentPopMenuFalse={this.makePopMenuFalse}
                    />
                }
            </div>
        );
    }
}

export default Footer;
