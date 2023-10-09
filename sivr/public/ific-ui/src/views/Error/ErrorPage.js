import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {
    BENGALI,
    ENGLISH,
} from "../../config/Constants";
import Header from "../../Components/Header/Header";
import Elements from "../../Components/Elements/Elements";
import styles from "../Error/Error.module.css";
import {getErrorElements} from "./ErrorElement";
import {isLoggedIn} from "../../config/Helpers";


const cookies = new Cookies();

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.checkIsLoggedIn();
        let isChecked = true;
        let language = ENGLISH;

        if ((typeof (cookies.get('isLanguageChecked')) !== "undefined")) {
            isChecked = (cookies.get('isLanguageChecked') === "true");
        } else {
            cookies.set('isLanguageChecked', isChecked, {path: '/'});
        }

        if ((typeof (cookies.get('language')) !== "undefined")) {
            language = cookies.get('language');
        } else {
            cookies.set('language', language, {path: '/'});
        }
        this.state = {
            cli: '',
            isLoading: true,
            isChecked: isChecked,
            language: language
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    checkIsLoggedIn() {
        if (isLoggedIn()) {
            this.redirect('/home');
        }
    }

    redirect(redirectTo) {
        const {history} = this.props;
        history.push(redirectTo);
    }

    goPreviousPage() {
        this.redirect("/home");
    }

    handleLanguageChange(isChecked) {
        if (isChecked) {
            this.setState({
                language: ENGLISH,
                isChecked: isChecked
            });
            cookies.set('language', ENGLISH, {path: '/'});
        } else {
            this.setState({
                language: BENGALI,
                isChecked: isChecked
            });
            cookies.set('language', BENGALI, {path: '/'});
        }
        cookies.set('isLanguageChecked', isChecked, {path: '/'});
    }

    render() {
        const error = process.env.PUBLIC_URL + "/image/error.svg"
        const language = this.state.language;
        let errorData = getErrorElements(language);
        // errorData.elementsData.pageContent[0].onClickHandler = this.goPreviousPage.bind(this);
        let elementsData = errorData.elementsData;
        if (this.props.location.state !== null && this.props.location.state !== undefined) {
            if (this.props.location.state.errorMsg !== null && this.props.location.state.errorMsg !== undefined) {
                elementsData.pageHeading = this.props.location.state.errorMsg;
            }
        }

        return (
            <div className={" App " + styles.ErrorPageArea}>
                <Header
                    handleLanguage={this.handleLanguageChange}
                    isChecked={this.state.isChecked}
                />
                {/*<Elements elementsData={elementsData}/>*/}
                <div className={styles.errorPageMain + " text-center p-1 p-md-4 d-flex h-75 flex-column justify-content-center align-items-center"}>
                    <h1 className="mb-5 text-uppercase">Page Not Found</h1>
                    <img src={error} alt="" className="img-fluid"/>
                </div>
            </div>
        );
    }
}

export default ErrorPage;
