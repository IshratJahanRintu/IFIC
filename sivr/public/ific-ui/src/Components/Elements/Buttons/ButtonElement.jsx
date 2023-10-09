import React, {Component} from 'react';
import styles from './ButtonElement.module.css';

class ButtonElement extends Component {
/*    handleOnClick() {
        this.props.buttonProperties.onClickHandler();
    }*/

    render() {
        const language = this.props.language;
        const phoneicon = process.env.PUBLIC_URL + '/image/right-arrow.png';
        const name = this.props.buttonProperties["displayText" + language];
        let buttonId = null;
        if (this.props.buttonProperties.elementId) {
            buttonId = this.props.buttonProperties.elementId;
        }
        const buttonValue = this.props.buttonProperties.elementValue;
        return (
            <button className={styles.buttonElement + " btn-lg form-control "} onClick={() => {
                this.props.onClickHandler(buttonId, buttonValue, "", "")
            }}> {name}
                {/*Fixme: Kept Off*/}
                {/*<span className={styles.buttonArrow}>*/}
                {/*    <img src={phoneicon} alt=""/>*/}
                {/*</span>*/}
            </button>
        );
    }
}

export default ButtonElement;
