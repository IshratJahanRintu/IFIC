import React, {Component} from 'react';
import Switch from "react-switch";

class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {checked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({checked: checked});
        this.props.handleLanguageChange(checked);
    }

    render() {
        let checked = this.props.isChecked;
        if(typeof(checked) === "undefined"){
            checked = false;
        }
        const checkedIcon = this.props.checkedIcon;
        const uncheckedIcon = this.props.uncheckedIcon;
        // const inputName = this.props.inputName;
        return (
            <Switch
                checked={checked}
                onChange={this.handleChange}
                handleDiameter={30}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                className="react-switch"
                id="material-switch"
                onColor={"#d1c5c5"}
                offColor={"#d1c5c5"}
            />
        );
    }
}

export default ToggleButton;
