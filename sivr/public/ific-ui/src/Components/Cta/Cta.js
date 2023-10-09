import React from "react";
import styles from './Cta.module.css';

function Cta(){
    const IVRLOGO = process.env.PUBLIC_URL + "/image/g-ivr.svg";
    return(

        <div className={styles.ctaArea + " text-center"}>
            <a href={"tel:16255"}>
                <img className="img-fluid" src={IVRLOGO} alt=""/>
            </a>
        </div>

    )
}

export default Cta;
