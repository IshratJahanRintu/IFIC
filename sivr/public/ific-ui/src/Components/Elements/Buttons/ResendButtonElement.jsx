import React, {Component} from 'react';
import styles from './ButtonElement.module.css';
import Cookies from 'universal-cookie';
import {vivrDataCall} from "../../../api/vivr-data";
import {VIVR_DATA_API_URL} from "../../../config/Constants";
import OTPTimerCounterElement from "../../TimeoutCounter/OTPTimerCounterElement";

const cookies = new Cookies();

class ResendButtonElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStatus:true,
            cli: cookies.get('cli'),
            token: cookies.get('token'),
            key: cookies.get('key'),
        }
        this.controlTimerStatus = this.controlTimerStatus.bind(this);
    }

    timerControl = async () =>{
        this.setState({timerStatus: true});
        const token = this.state.token;
        const key = this.state.key;
        const parameters = {
            previousPage: this.props.prevPage,
            buttonId: this.props.buttonProperties.elementId,
            buttonValue: this.props.buttonProperties.elementValue,
            action: '',
            userInput: "\"\"",
            language: 'EN',
            sound: 'ON',
            key: key,
        }
        await vivrDataCall(VIVR_DATA_API_URL, parameters, token);
    }

    controlTimerStatus(status){
        this.setState({timerStatus: status});
    }

    render() {

        const { timerStatus } = this.state;
        const lang = this.props.language;
        return (
            <div className={styles.resendOtp}>
                   <span>
                       {lang == 'EN'?'Didn\'t receive the OTP?':'আপনি কি ওটিপি পাননি?\n'}
                       <button className={styles.otpButton} type="button"  onClick={()=>{
                           this.timerControl();
                       }} disabled={timerStatus} >

                           {lang == 'EN'?'Resend OTP':'পুনরায় ওটিপি পাঠান\n' +
                               '\n'}
                       </button>
                   </span>
                {timerStatus?<span> {lang == 'EN'?'Time':'সময়'} <OTPTimerCounterElement controlTimerStatus={this.controlTimerStatus} language={this.props.language} />  </span>:null}

            </div>
        );
    }
}

export default ResendButtonElement;
