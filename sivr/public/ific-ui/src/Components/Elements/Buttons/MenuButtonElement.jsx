import React, {Component} from 'react';
import styles from './MenuButtonElement.module.css';

class MenuButtonElement extends Component {

    // handleMenu(buttonId, buttonValue, action, userInput) {
    //     this.props.menuHandler(buttonId, buttonValue, action, userInput);
    // }

    render() {
        const triggerIconSrc = process.env.PUBLIC_URL + '/image/menu-trigger-sm.png';
        let menuIconData = this.props.buttonProperties['menuIcon'];
        // let iconSrc = null;
        let iconSrc = process.env.PUBLIC_URL + '/image/btn-image.png';
        let cardActivation = process.env.PUBLIC_URL + '/image/card-activation.png';
        let pinIcon = process.env.PUBLIC_URL + '/image/pin.png';
        if (menuIconData !== null) {
            iconSrc = process.env.PUBLIC_URL + '/image/icons/' + menuIconData.icon;
            //
            // iconSrc = MEDIA_FILE_PATH + '/icons/' + menuIconData.icon; // optional cardActivation , pinIcon
        } else {

        }

        const language = this.props.language;
        const name = this.props.buttonProperties["displayText" + language];
        let buttonId = null;
        if (this.props.buttonProperties.elementId) {
            buttonId = this.props.buttonProperties.elementId;
        }
        const buttonValue = this.props.buttonProperties.elementValue;
        return (
            <div className={this.props.pageType == 'HM'? styles.menuButtonGroup: styles.innerMenuButtonGroup}>
                {/*<div className={styles.iconBtnDiv}>*/}
                {/*    <button*/}
                {/*        className={styles.buttonElement + " " + styles.iconBtn + " btn form-control"}*/}
                {/*        onClick={() => {*/}
                {/*            this.props.onClickHandler(buttonId, buttonValue, "", "")*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <img className={styles.menuIcon} src={iconSrc} alt={"icon"}/>*/}
                {/*    </button>*/}
                {/*/!*buttonProperties !=='HM'*!/*/}
                {/*</div>*/}
                {this.props.pageType == 'HM' ?
                    <div className={styles.textBtnDiv}>
                        {/*Home Button Design*/}
                        <button
                            className={styles.buttonElement + " btn "}
                            onClick={() => {
                                this.props.onClickHandler(buttonId, buttonValue, "", "")
                            }}
                        >
                            {iconSrc ? (
                                <img className={styles.triggerIcon} src={iconSrc} alt={"click"}/>
                            ) : null}

                            <p className={styles.mtbMenuText}>{name}</p>

                        </button>
                    </div>
                    :
                    <div className={styles.textBtnDiv}>
                        {/*Home Button Design*/}
                        <button
                            className={styles.innerButtonElement + " btn innersubmit-btn"}
                            onClick={() => {
                                this.props.onClickHandler(buttonId, buttonValue, "", "")
                            }}
                        >
                            {iconSrc ? (
                                <img className={styles.triggerIcon} src={iconSrc} alt={"click"}/>
                            ) : null}

                            <p className={styles.mtbMenuTextInner}>{name}</p>

                        </button>
                    </div>
                }

            </div>
        );
    }
}

export default MenuButtonElement;
