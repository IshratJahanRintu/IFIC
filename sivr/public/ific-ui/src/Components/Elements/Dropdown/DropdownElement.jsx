import React, {Component} from 'react';
import Select from 'react-select';
import {BENGALI, ENGLISH} from "../../../config/Constants";

class DropdownElement extends Component {

    constructor(props) {
        super(props);
        const language = this.props.language;
        let optionData = this.props.inputFormProperties.optionData;
        let options = [];
        let count = 0;
        while (count < optionData.length) {
            if (language === ENGLISH) {
                options.push({label: optionData[count].optionEN, value: optionData[count].optionValue});
            } else if (language === BENGALI) {
                options.push({label: optionData[count].optionBN, value: optionData[count].optionValue});
            }
            count++;
        }
        this.state = {
            isClearable: true,
            selectedOption: null,
            options: options,
            name: this.props.inputFormProperties.name
        };
    }

    handleChange = selectedOption => {
        this.props.onChangeHandler(this.state.name, selectedOption.value);
    };

    render() {
        const options = this.state.options;
        return (
            <Select
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

export default DropdownElement;
