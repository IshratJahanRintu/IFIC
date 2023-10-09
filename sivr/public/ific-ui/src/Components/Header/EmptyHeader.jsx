import React, {Component} from 'react';
import LanguageToggle from "./LanguageToggle";
import styles from './EmptyHeader.module.css';


class EmptyHeader extends Component {
    render() {
        const greetings = this.props.greetings;
        const logoSrc = process.env.PUBLIC_URL + '/image/g-logo.svg';
        return (
            <div className={styles.topBanner + " container-fluid"}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className={styles.gtopHeader}>
                            <a className="" href={"tel:16255"}>
                                <img className={"img-fluid center"} src={logoSrc} alt={"Brand Logo"}/>
                            </a>
                            <LanguageToggle/>
                        </div>

                        {/*FIXME: Greetings Kept Off*/}
                        {/*<h1 className={styles.greetings + " text-center"}>{greetings}</h1>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default EmptyHeader;
