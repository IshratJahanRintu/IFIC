import React, {Component} from "react";
import styles from "./TimeoutCounter.module.css";
import {ALERT_INTERVAL, BENGALI, BENGALI_DIGITS, MAX_ALERT_COUNT, SESSION_TIMEOUT} from "../../config/Constants";

class TimeoutCounterElement extends Component {

    constructor(props) {
        super(props);
        let min = parseInt((ALERT_INTERVAL * MAX_ALERT_COUNT) / 60);
        let sec = parseInt((ALERT_INTERVAL * MAX_ALERT_COUNT) % 60);
        min = parseInt(min) < 10 ? '0' + min : min;
        sec = parseInt(sec) < 10 ? '0' + sec : sec;
        this.state = {min: min, sec: sec, duration: ALERT_INTERVAL * MAX_ALERT_COUNT};
    }

    setBengaliNumber(str) {
        str = str.toString();
        return BENGALI_DIGITS[str.charAt(0)] + (typeof(str.charAt(1)) !== 'undefined' ? BENGALI_DIGITS[str.charAt(1)] : '');
    }

    componentDidMount() {
        this.startTimer();
    };

    startTimer(duration, display) {
        setInterval(() => {
            let minutes = parseInt(this.state.duration / 60, 10);
            let seconds = parseInt(this.state.duration % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            let durn = this.state.duration - 1;
            this.setState({min: minutes});
            this.setState({sec: seconds});
            this.setState({duration: durn});

        }, 1000);
    }

    render() {
        const minutes = this.props.language === BENGALI ? this.setBengaliNumber(this.state.min) : this.state.min;
        const seconds = this.props.language === BENGALI ? this.setBengaliNumber(this.state.sec) : this.state.sec;

        return (
            <div className={"container-fluid"}>
                <div className="row">
                    <div className={"col-md-6 offset-md-3"}>
                        <div className={"float-right " + styles.timeOutText + " " + styles.sessionTime}>
                            <span id="time">{minutes}:{seconds}</span>
                        </div>
                        <label
                            className={"float-right session-time-title " + styles.timeOutText + " " + styles.sessionTimeTitle}>
                            {SESSION_TIMEOUT[this.props.language]} -
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeoutCounterElement;
