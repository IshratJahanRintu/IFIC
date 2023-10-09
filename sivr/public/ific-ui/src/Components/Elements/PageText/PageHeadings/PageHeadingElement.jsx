import React, {Component} from 'react';
import styles from "./PageHeadingElement.module.css";

class PageHeadingElement extends Component {
    render() {
        const type = this.props.pageType;
        const pageHeading = this.props.pageHeading;
        const headingSize = this.props.headingSize;
        let HeadingTag = 'h4';
        let headingStyle = {};
        if(headingSize === 2){
            HeadingTag = 'h2';
            headingStyle = {fontSize: `30px`};
        }
        return (
            <HeadingTag className={type=='login'?styles.pageHeadingLogin:styles.pageHeading} style={headingStyle} >{pageHeading}</HeadingTag>
        );
    }
}

export default PageHeadingElement;
