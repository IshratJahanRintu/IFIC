import React, {Component} from 'react';
import Switch from "react-switch";

class AccountTypeToggle extends Component {
    constructor(props) {
        super(props);

    }
    //Manage handleTochangeSwitch funciton depend on swithc plugin
    handleTochangeSwitch = () => {
        this.props.handleTochangeSwitch();
    }
    render() {
        const {switchMode} = this.props
        return (
            <div>
                <label htmlFor="small-radius-switch">

                    <Switch
                        checked={switchMode}
                        onChange={this.handleTochangeSwitch}
                        handleDiameter={28}
                        offColor="#fff"
                        onColor="#fff"
                        offHandleColor="#3AB6E8"
                        onHandleColor="#00734E"
                        height={40}
                        width={115}
                        activeBoxShadow="0px 0px 1px 2px #fffc35"
                        uncheckedIcon={
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                }}
                            >
                                Islamic
                            </div>
                        }
                        checkedIcon={
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                    paddingLeft:5
                                }}
                            >
                                Conventional
                            </div>
                        }
                        uncheckedHandleIcon={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 12
                                }}
                            >
                                <i className="fa fa-arrow-right text-white" style={{fontSize:"9px"}}  aria-hidden="true"></i>
                            </div>
                        }
                        checkedHandleIcon={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    color: "white",
                                    fontSize: 14
                                }}
                            >
                                <i className="fa fa-arrow-left text-white" style={{fontSize:"9px"}}  aria-hidden="true"></i>
                            </div>
                        }
                        className="react-switch"
                        id="small-radius-switch"
                    />
                </label>
            </div>
        );
    }
}

export default AccountTypeToggle;
