import React, {Component} from 'react';
import Carousel from 'react-elastic-carousel';
import {MEDIA_FILE_PATH} from '../../config/Constants'
import styles from './itemCarousel.module.css';
import ItemInfo from './ItemInfo'


class ItemCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItem: 6
        }
    }

    render() {
        const {sliderData, language, selectedButton} = this.props;
        const findActiveIndex = (element) => selectedButton == element.elementId;
        const activeIndex = sliderData.findIndex(findActiveIndex);
        return (
            <div className="container-fluid fixed-bottom carousal-fix">
                <div className={'row'}>
                    <div className={'col-md-6 mx-md-auto'}>
                        <Carousel itemsToShow={3} initialActiveIndex={activeIndex} showArrows={false}
                                  focusOnSelect={true}>
                            {sliderData.map((item, idx) => <div key={idx} onClick={() => {
                                this.props.onClickHandler(item.elementId, "", "", "", 'Slider');

                            }}
                                                                className={(selectedButton == item.elementId ? 'slider-item-active' : 'slider-item-in-active') + ' ' + styles.sliderBtn}
                                                                key={item.elementId}>
                                <ItemInfo item={item} language={language}/>
                            </div>)}
                        </Carousel>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemCarousel;