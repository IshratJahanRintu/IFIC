import React, {Component} from "react";
import styles from "./EmptyFooter.module.css";
import LanguageToggle from "../Header/LanguageToggle";
import Copyright from "../Elements/PageText/Copyright";
import SoundToggleButton from "./SoundToggleButton";
import {SOUND_OFF, SOUND_OFF_BUTTON_IMAGE, SOUND_ON_BUTTON_IMAGE} from "../../config/Constants";


class EmptyFooter extends Component {

    render() {
        const soundButtonData = this.props.soundButtonData;
        let soundImageSource = SOUND_ON_BUTTON_IMAGE;
        if (soundButtonData !== undefined) {
            if (soundButtonData.data === SOUND_OFF) {
                soundImageSource = SOUND_OFF_BUTTON_IMAGE;
            }
        }
        let soundToggleButton = <SoundToggleButton buttonImage={soundImageSource} buttonData={soundButtonData}/>;
        const brandLogoSrc = process.env.PUBLIC_URL + '/image/citybank-logo.png';
        return (
            <div className={styles.bottomFooter + " container-fluid fixed-bottom"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <div className={styles.languageCopyright}>
                            {/*Fixme: Kept Off*/}
                            {/*<LanguageToggle*/}
                            {/*    handleLanguageChange={this.props.handleLanguage}*/}
                            {/*    isChecked={this.props.isChecked}*/}
                            {/*/>*/}
                            <div className={"mx-auto"}>{soundToggleButton}</div>
                            <div className={styles.footerCopyright}>Powered By gPlex</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmptyFooter;
