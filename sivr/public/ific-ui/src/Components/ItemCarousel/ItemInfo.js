import React from 'react';
import {MEDIA_FILE_PATH} from '../../config/Constants'
import styles from './itemCarousel.module.css';

const ItemInfo = (props) => {
    const {item, language} = props;
    let menuIconData = item.menuIcon;
    let iconSrc = null;
    if (menuIconData !== null) {
        iconSrc = process.env.PUBLIC_URL + '/image/icons/' + menuIconData.icon;
        // iconSrc = MEDIA_FILE_PATH + '/icons/' + menuIconData.icon; // optional cardActivation , pinIcon
    }
    return (<>{iconSrc ? (
        <img className={styles.carouselIcon} src={iconSrc} alt={"click"}/>
    ) : null}
        {language == 'EN' ? item.displayTextEN : item.displayTextBN}</>)
};

export default ItemInfo;