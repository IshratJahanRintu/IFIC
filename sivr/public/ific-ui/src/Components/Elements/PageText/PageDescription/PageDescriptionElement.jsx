import React, {Component} from 'react';
import styles from "./PageDescriptionElement.module.css";

class PageDescriptionElement extends Component {
    render() {
        const pageDescription = this.props.pageDescription;
        return (
            <p className={styles.pageDescription}>{pageDescription}</p>
        );
    }
}

export default PageDescriptionElement;
