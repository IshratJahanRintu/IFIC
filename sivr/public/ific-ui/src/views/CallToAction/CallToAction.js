import React, {Component} from "react";
import FdrCalculator from "../../Components/Elements/Modals/FdrCalculator";

class CallToAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFdrCalculator: false,
        };

    }

    hideComponent = () => {
        this.setState({showFdrCalculator: false});
    }

    render() {
        return (
            <>
                <div className="g-bottom-cta-area">

                    <div className="g-web-chat">
                        <button
                            onClick={() => window.open("https://webchat.ificbankbd.com/chat_proxy/chat.php?bGF5b3V0PWdyZWVuJmRvbWFpbj13ZWJjaGF0LmlmaWNiYW5rYmQuY29tJnBhZ2VfaWQ9Q0IxMjM0NTY3OSZzaXRlX2tleT1jYmxjOTBkMDk5ODE4YTNjZmI0NTBjNzY2Y2RhYmNiMSZ3d3dfaXA9MTkyLjE2OC4xLjE4NiZ1c2VyPUFBJmxhbmd1YWdlPUVO", "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=320, height=450, top=30")}>
                            <i className="bi bi-chat-right-fill"></i>
                        </button>
                    </div>
                    <div className="g-digital-banking-left">
                        {/* <a href="">
                            <i className="bi bi-globe2"></i> <span>Digital Banking</span>
                        </a>
                        <a href="">
                            <i className="bi bi-card-text"></i> <span>Apply Now</span>
                        </a> */}
                    </div>
                    <div className="g-digital-banking-right">
                        <a onClick={() => this.setState({showFdrCalculator: true})} href="javascript:void(0)">
                            <i className="bi bi-calculator-fill"></i><span>FDR Calculator</span>
                        </a>
                        {/* <a href="">
                            <i className="bi bi-telephone-fill"></i> <span>16255</span>
                        </a> */}
                    </div>

                </div>

                {this.state.showFdrCalculator &&
                    <FdrCalculator onClose={this.hideComponent}/>
                }


            </>
        )
    }

}

export default CallToAction;
