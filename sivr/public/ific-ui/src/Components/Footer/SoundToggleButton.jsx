import React, {Component} from 'react';
import styles from './FooterButton.module.css';
import {SOUND_OFF, SOUND_ON} from "../../config/Constants";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class SoundToggleButton extends Component {
    constructor(props) {
        super(props);
        let sound = SOUND_ON;
        if (this.props.sound !== undefined) {
            sound = this.props.sound;
        } else {
            if ((typeof (cookies.get('sound')) === "undefined")) {
                cookies.set('sound', sound, {path: '/'});
            } else {
                sound = cookies.get('sound');
            }
        }

        this.state = {sound: sound};
        this.handleSound = this.handleSound.bind(this);
    }


    handleSound() {if (this.state.sound === SOUND_ON) {
            this.setState({sound: SOUND_OFF});
            this.props.buttonData.onClickHandler(SOUND_OFF)
        } else if (this.state.sound === SOUND_OFF) {
            this.setState({sound: SOUND_ON});
            this.props.buttonData.onClickHandler(SOUND_ON)
        }
    }

    render() {
        const imgSrc = process.env.PUBLIC_URL + "/image/" + this.props.buttonImage;
        let isDisabled = true;
        if (this.props.buttonData !== undefined && this.props.buttonData !== null) {
            isDisabled = false;
        }
        return (
            <button className={styles.footerBtn + " btn btn-xs"} onClick={this.handleSound} disabled={isDisabled}>
                <img src={imgSrc} alt={"logo"} style={{maxWidth: 32, maxHeight: 32}}/>
            </button>
        );
    }
}

export default SoundToggleButton;

