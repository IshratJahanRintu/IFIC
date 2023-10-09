import React, {Component} from "react";
import {BENGALI, BENGALI_DIGITS} from "../../config/Constants";

class OTPTimerCounterElement extends Component {

    constructor(props) {
        super(props);
        let min = parseInt((120) / 60);
        let sec = parseInt((120) % 60);
        this.myRef = React.createRef();
        min = parseInt(min) < 10 ? '0' + min : min;
        sec = parseInt(sec) < 10 ? '0' + sec : sec;
        this.state = {min: min, sec: sec, duration: 120};
    }

    setBengaliNumber(str) {
        str = str.toString();
        return BENGALI_DIGITS[str.charAt(0)] + (typeof(str.charAt(1)) !== 'undefined' ? BENGALI_DIGITS[str.charAt(1)] : '');
    }

    componentDidMount() {
        this.startTimer();
    };

    startTimer(duration, display) {
        this.myRef = setInterval(() => {
            let minutes = parseInt(this.state.duration / 60, 10);
            let seconds = parseInt(this.state.duration % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            if(parseInt(minutes) === 0 && parseInt(seconds)===0){
                clearInterval(this.myRef);
                this.props.controlTimerStatus(false)
            }
            let durn = this.state.duration - 1;
            this.setState({min: minutes});
            this.setState({sec: seconds});
            this.setState({duration: durn});

        }, 1000);
    }

    render() {
        const minutes = this.props.language === BENGALI ? this.setBengaliNumber(this.state.min) : this.state.min;
        const seconds = this.props.language === BENGALI ? this.setBengaliNumber(this.state.sec) : this.state.sec;
        return (<span id="time">{minutes}:{seconds}</span>);
    }
}

export default OTPTimerCounterElement;
