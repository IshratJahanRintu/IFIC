import React, {Component} from 'react';
import styles from './Header.module.css';
import LanguageToggle from "./LanguageToggle";
import {BENGALI, ENGLISH} from "../../config/Constants";

class Header extends Component {
    render() {
        const ivrlogo = process.env.PUBLIC_URL + '/image/ivr-visual.png';
        const helplinec = process.env.PUBLIC_URL + '/image/helpline-c.png';
        const yaqueen = process.env.PUBLIC_URL + '/image/yaqueen.png';
        const mtbc = process.env.PUBLIC_URL + '/image/g-logo.svg';
        const acctype  = this.props.accType;
        return (
            <div className={styles.topBanner + " container-fluid p-0 p-md-2"}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className={styles.mtbTopHeader}>
                            <a href={"#"}>
                                {acctype=='I'?<img className={styles.brandLogo + " img-fluid float-right"}  src={yaqueen} alt={"Brand Logo"}/>:<img className={styles.brandLogo + " img-fluid float-right"}  src={mtbc} alt={"Brand Logo"}/>}
                            </a>
                            {/*Fixme: Kept Off*/}
                            {/*<a href={"tel:16219"}>*/}
                            {/*    {acctype=='I'?<img className={styles.brandLogo + " img-fluid"} src={ivrlogo} alt={"Brand Logo"}/>:<img className={styles.brandLogo + " img-fluid"} src={helplinec} alt={"Brand Logo"}/>}*/}
                            {/*</a>*/}
                            {/*<LanguageToggle/>*/}
                            <div className={styles.toggleBtn}>
                                {/* <LanguageToggle
                                   handleLanguageChange={this.props.handleLanguage}
                                   isChecked={this.props.isChecked}
                                /> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
