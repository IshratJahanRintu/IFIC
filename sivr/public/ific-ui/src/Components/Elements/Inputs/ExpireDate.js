import React, {Component} from 'react';
import styles from "./InputFormElement.module.css"
import {isDevice} from "../../../config/Helpers";

class ExpireDate extends Component {

    constructor(props) {
        super(props);
        this.props.onChangeHandler(this.props.inputFormProperties.name, "");
        this.state = {
            value:''
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.value !== this.state.value){
            const value = this.state.value;
            this.props.onChangeHandler(this.props.inputFormProperties.name,value);
        }
    }

    componentDidMount() {

        var dType = isDevice();
        if(dType === 'mobile'){
            document.querySelector('.exp-date').addEventListener('focusin',()=>{this.props.manageSliderBar(false)})
            document.querySelector('.exp-date').addEventListener('blur',()=>{this.props.manageSliderBar(true)})
        }
    }




    handleChangeInputValue = async (event) => {
        let {maxLength, value} = event.target;
        let  code = event.keyCode;
        let allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
            return;
        }
        event.target.value = event.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 `/`
        );
        if(event.target.value){
            await this.setState({value:event.target.value})
        }
    }




    render() {
        const language = this.props.language;
        const placeholder = this.props.inputFormProperties.placeholder[language];
        const input_value = this.state.value;
        return (
            <div className="">
                <input
                       className={styles.inputForm + " input form-control exp-date"}
                       maxLength={5}
                       type='text'
                       defaultValue={input_value}
                       placeholder={placeholder}
                       onChange={e=>{this.handleChangeInputValue(e)}}
                />
            </div>

        );
    }
}

export default ExpireDate;
