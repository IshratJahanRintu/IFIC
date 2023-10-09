import React, {Component} from "react";
import styles from "./Loading.module.css";

class Loading extends Component {
    render() {
        return (
            <div className={" d-flex justify-content-center " + styles.SpinnerLoaderArea}>
                <div className={" spinner-loader text-white " + styles.loadingSpinner} role="status">
                </div>
            </div>
        );
    }
}

export default Loading;
