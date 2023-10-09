import React, {Component} from 'react';
import styles from "./InputFormElement.module.css"

class InputPhone extends Component {
    render() {
        const language = this.props.language;
        const placeholder = this.props.inputFormProperties.placeholder[language];
        const phoneicon = process.env.PUBLIC_URL + '/image/mobile.png';
        const phoneicon2 = process.env.PUBLIC_URL + '/image/mobile2.png';
        return (
            <div className={"input-group mt-4"}>

                {/*Fixme : Kept off*/}
                {/*<div className={styles.inputDialCode + "input-group-prepend"}>*/}
                {/*    /!*<span className={"input-group-text form-control-lg " + styles.phoneNoPrefix}*!/*/}
                {/*    /!*      id="basic-addon1">+880</span>*!/*/}
                {/*    */}
                {/*    /!*<span className={styles.phoneIcon}> *!/*/}
                {/*    /!*    <img src={phoneicon2} alt=""/>*!/*/}
                {/*    /!*</span>*!/*/}
                {/*</div>*/}
                <input
                    // onFocus={this.props.handleFooterSection?this.props.handleFooterSection(false):null}
                    // onBlur={this.props.handleFooterSection?this.props.handleFooterSection(true):null}
                    onChange={this.props.inputFormProperties.eventHandler}
                    className={styles.inputForm + " input text-center oph"}
                    type={"number"}
                    placeholder={placeholder}
                />
            </div>

        );
    }
}

export default InputPhone;
