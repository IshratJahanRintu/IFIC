import React, {Component} from 'react';
import styles from './PopMenu.module.css';

class PopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popMenu: this.props.popMenuProp
        }
        this.handleClosed = this.handleClosed.bind(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.popMenu === false) {
            this.setState({popMenu: this.props.popMenuProp});
        }
    }

    handleClosed() {
        this.setState({
            popMenu: false
        })
        this.props.parentPopMenuFalse();
    }

    render() {
        const {language,homePageData} = this.props;
        const {data,onClickHandler} = homePageData;
        if (this.state.popMenu) {
            return (
                <div>
                    <div className={styles.popMenuOverlay}>
                        <div className={styles.popMenuArea + ""}>
                            <svg className={styles.popMenuClose} onClick={() => this.handleClosed()}
                                 xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <div className={styles.popMenuMain}>
                            {data.map((item, idx) => <div className={styles.popMenuButton} key={idx} onClick={() => { onClickHandler(item.elementId, "", "", "", 'Slider'); }}  >
                                    <img src={process.env.PUBLIC_URL + '/image/icons/'+item.menuIcon.icon} alt=""/>


                                    <span>{language == 'EN' ? item.displayTextEN : item.displayTextBN}</span>
                            </div>)}


                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default PopMenu;
