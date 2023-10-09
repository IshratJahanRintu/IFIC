
import React, {Component} from 'react';
import  {isDevice} from "../../../config/Helpers";
import styles from "./InputFormElement.module.css"

class TextAreaElement extends Component {

    constructor(props) {
        super(props);
        this.props.onChangeHandler(this.props.inputFormProperties.name, "");
    }
    componentDidMount() {
        var dType = isDevice();
        if(dType === 'mobile'){
            document.querySelector('.die').addEventListener('focusin',()=>{this.props.manageSliderBar(false)})
            document.querySelector('.die').addEventListener('blur',()=>{this.props.manageSliderBar(true)})
        }
    }

    render() {
        const language = this.props.language;
        const inputType = this.props.inputFormProperties.type;
        const placeholder = this.props.inputFormProperties.placeholder[language];
        const inputName = this.props.inputFormProperties.name;
        return (
            <div>
                <textarea style={{textAlign: "left"}}
                    onChange={(event) => {
                        this.props.onChangeHandler(inputName, event.target.value)
                    }}
                    className={styles.inputForm + " input form-control die"}
                    type={inputType}
                    placeholder={placeholder}
                    name={inputName}
                    rows="5"
                >
                    </textarea>
            </div>
        );
    }
}

export default TextAreaElement;
