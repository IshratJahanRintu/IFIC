import React, {Component} from 'react';
import styles from "./InputFormElement.module.css"
import {isDevice} from "../../../config/Helpers";

class PinInput extends Component {

    constructor(props) {
        super(props);
        this.props.onChangeHandler(this.props.inputFormProperties.name, "");
    }

    state = {
        pin: {
            number1: '',
            number2: '',
            number3: '',
            number4: '',
            number5: '',
            number6: ''
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.pin !== this.state.pin) {
            const {number1, number2, number3, number4, number5, number6} = this.state.pin;
            // eslint-disable-next-line no-useless-concat
            const combineValue = `${number1}` + `${number2}` + `${number3}` + `${number4}` + `${number5}` + `${number6}`;
            this.props.onChangeHandler(this.props.inputFormProperties.name, combineValue);
        }
    }

    componentDidMount() {
        var dType = isDevice();
        if (dType === 'mobile') {
            let btns = document.getElementsByClassName("pin-input");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener('focusin', () => {
                    this.props.manageSliderBar(false)
                });
                btns[i].addEventListener('blur', () => {
                    this.props.manageSliderBar(true)
                });
            }

        }
    }


    handleChange = (e, field) => {

        const {maxLength, value, name} = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        let fieldIntIndex = parseInt(fieldIndex, 10);
        // Check if no of char in field == maxlength
        if (value.length === maxLength) {
            // It should not be last input field
            this.setState({...this.state, pin: {...this.state.pin, [field]: value}})
            if (fieldIntIndex < 6) {
                // Get the next input field using it's name
                const nextfield = document.querySelector(
                    `input[name=${fieldName}-${fieldIntIndex + 1}]`
                );
                // If found, focus the next field
                if (nextfield !== null) {
                    nextfield.focus();
                }
            }
        } else {
            const KeyID = e.which;
            if (KeyID === 8) {
                // It should not be last input field
                this.setState({...this.state, pin: {...this.state.pin, [field]: value}})
                if (fieldIntIndex > 1) {
                    // Get the next input field using it's name
                    const nextfield = document.querySelector(
                        `input[name=${fieldName}-${fieldIntIndex - 1}]`
                    );
                    // If found, focus the next field
                    if (nextfield !== null) {
                        nextfield.focus();
                    }
                }
            }
        }
    }


    render() {

        const {number1, number2, number3, number4, number5, number6} = this.state;
        const language = this.props.language;

        return (
            <>
                <div className="mtb-tpin-area-password">

                    <input type="password" data-role="pin" className="pin-input"
                           maxLength={1}
                           name="number-1"
                           value={number1}
                           pattern="[0-9]*" inputMode="numeric"
                           onKeyUp={e => {
                               this.handleChange(e, 'number1')
                           }}
                    />

                    <input type="password" data-role="pin" className="pin-input"
                           maxLength={1}
                           name="number-2"
                           value={number2}
                           pattern="[0-9]*" inputMode="numeric"
                           onKeyUp={e => {
                               this.handleChange(e, 'number2')
                           }}
                    />

                    <input type="password" data-role="pin" className="pin-input"
                           maxLength={1}
                           name="number-3"
                           value={number3}
                           pattern="[0-9]*" inputMode="numeric"
                           onKeyUp={e => {
                               this.handleChange(e, 'number3')
                           }}
                    />

                    <input type="password" data-role="pin" className="pin-input"
                           maxLength={1}
                           name="number-4"
                           value={number4}
                           pattern="[0-9]*" inputMode="numeric"
                           onKeyUp={e => {
                               this.handleChange(e, 'number4')
                           }}
                    />

                    <input type="password" data-role="pin" className="pin-input"
                           name="number-5"
                           maxLength={1}
                           value={number5}
                           pattern="[0-9]*" inputMode="numeric"
                           onKeyUp={e => {
                               this.handleChange(e, 'number5')
                           }}
                    />

                    <input type="password" data-role="pin" className="pin-input"
                           maxLength={1}
                           name="number-6"
                           value={number6}
                           pattern="[0-9]*" inputMode="numeric"
                           onKeyUp={e => {
                               this.handleChange(e, 'number6')
                           }}
                    />

                </div>

                {/*Resend PIN OTP*/}
                {/*<div className={styles.resendOtp}>*/}
                {/*   <span>*/}
                {/*       Didn't receive the OTP?*/}
                {/*       <a href="">*/}
                {/*       Resend OTP*/}
                {/*        </a>*/}
                {/*   </span>*/}
                {/*    <span>Time 01: 30</span>*/}
                {/*</div>*/}

            </>

        );
    }
}

export default PinInput;
