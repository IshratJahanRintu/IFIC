import React, {Component} from 'react';
import styles from "./InputLabelElment.module.css"

class InputLabelElement extends Component {
    render() {
        const pageDescription = this.props.pageDescription;
        return (
            <label className={styles.inputLabel}>{pageDescription}</label>
        );
    }
}

export default InputLabelElement;
