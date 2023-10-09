import React, {Component} from 'react';
import {ENGLISH, BENGALITEXT} from '../../config/Constants';
import styles from './LanguageToggle.module.css';

class LanguageToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {checked: this.props.isChecked, buttonText: ENGLISH};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        if (this.state.checked === true) {
            this.setState({checked: false});
            this.props.handleLanguageChange(false);
        } else if (this.state.checked === false) {
            this.setState({checked: true});
            this.props.handleLanguageChange(true);
        }
    }

    render() {
        return (
            <div>
                <label className={styles.switch}>
                    <input
                        className={styles.toggleInput}
                        type={"checkbox"}
                        checked={this.props.isChecked}
                        onChange={this.handleChange}
                    />
                    <div className={styles.langBtn}>
                        <span className={styles.slider}> </span>
                        <span className={styles.langText}> {this.state.checked ? BENGALITEXT : ENGLISH} </span>
                    </div>
                </label>
            </div>
        );
    }
}

export default LanguageToggle;
