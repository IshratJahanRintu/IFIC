import React, {Component} from 'react';
import styles from './FooterButton.module.css';

class FooterButton extends Component {

    footerButtonHandler(buttonId, buttonValue) {
        if (this.props.buttonData !== undefined) {
            // if (this.props.buttonData.data !== undefined) {
                this.props.buttonData.onClickHandler(buttonId, buttonValue);
            // }
        }
    }

    render() {
        const imgSrc = process.env.PUBLIC_URL + "/image/" + this.props.buttonImage;
        let buttonId = "";
        let buttonValue = "";
        let isDisabled = false;
        if (this.props.buttonData !== undefined && this.props.buttonData !== null) {
            if (this.props.buttonData.data !== undefined && this.props.buttonData.data !== null) {
                buttonId = this.props.buttonData.data.elementId;
                buttonValue = this.props.buttonData.data.elementValue;
            } else {
                isDisabled = true;
            }
        } else {
            isDisabled = true;
        }
        return (
            <button
                className={styles.footerBtn + " btn btn-xs"}
                onClick={() => {this.footerButtonHandler(buttonId,buttonValue)}}
                disabled={isDisabled}
            >
                <img src={imgSrc} alt={"logo"} style={{maxWidth: 32, maxHeight: 32}}/>
            </button>
        );
    }
}

export default FooterButton;

