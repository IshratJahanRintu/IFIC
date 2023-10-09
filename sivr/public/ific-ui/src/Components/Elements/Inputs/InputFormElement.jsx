import React, {Component} from 'react';
import styles from "./InputFormElement.module.css"

class InputFormElement extends Component {

/*    handleChange(event) {
        this.props.inputFormProperties.eventHandler(event);
    }*/

    render() {
        const language = this.props.language;
        const inputType = this.props.inputFormProperties.type;
        const placeholder = this.props.inputFormProperties.placeholder[language];
        return (
            <div>
                <input
                    // onFocus={this.props.handleFooterSection?this.props.handleFooterSection(false):null}
                    // onBlur={this.props.handleFooterSection?this.props.handleFooterSection(true):null}
                    onChange={this.props.inputFormProperties.eventHandler}
                    className={styles.inputForm + " input form-control ofe"}
                    type={inputType}
                    placeholder={placeholder}
                    // minLength={this.props.inputFormProperties.minLength}
                    // maxLength={this.props.inputFormProperties.maxLength}
                />
            </div>

        );
    }


}

export default InputFormElement;
