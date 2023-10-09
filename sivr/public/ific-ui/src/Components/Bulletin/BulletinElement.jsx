import React, {Component} from "react";
import Ticker from 'react-ticker';
import styles from "./BulletinElement.module.css";

class BulletinElement extends Component {
    render() {
        const bulletinMsg = this.props.bulletinMessage;
        return (
            <div className={"container-fluid fixed-bottom " + styles.bulletinDiv}>
                <div className={"row"}>
                    <div className={"col-md-6 offset-md-3"}>
                        <Ticker mode={"await"}>
                            {(index) => (
                                <strong>{bulletinMsg}</strong>
                            )}
                        </Ticker>
                    </div>
                </div>
            </div>
        );
    }
}

export default BulletinElement;
