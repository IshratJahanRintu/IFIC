import React, {Component} from 'react';
import PageHeadingElement from "./PageText/PageHeadings/PageHeadingElement";
import PageDescriptionElement from "./PageText/PageDescription/PageDescriptionElement";
import InputFormElement from "./Inputs/InputFormElement";
import ButtonElement from "./Buttons/ButtonElement";
import InputPhone from "./Inputs/InputPhone";
import styles from "./Elements.module.css";
import MenuButtonElement from "./Buttons/MenuButtonElement";
// import InputLabelElement from "./Inputs/InputLabelElement";
import BlogLinkDataElement from "./Hyperlinks/BlogLinkDataElement";
import ButtonLInk from "./Hyperlinks/ButtonLInk";
import DynamicInputElement from "./Inputs/DynamicInputElement";
import TableElement from "./Tables/TableElement";
import DropdownElement from "./Dropdown/DropdownElement";
import TpinInput from "./Inputs/TpinInput";
import PinInput from "./Inputs/PinInput";
import ExpireDate from "./Inputs/ExpireDate";
import ResendButtonElement from "./Buttons/ResendButtonElement";
import Cta from "../Cta/Cta";
import DatePickerInput from './DatePicker/DatePickerInput';
import Card from '../../views/Card/Card';
import TextAreaElement from './Inputs/TextAreaElement';

class Elements extends Component {
    constructor(props) {
        super(props);
    }

    cehckPageStyleType(pageContent) {
        var result = false;
        const typeList = ["input", "dynamicInput", 'submit', 'confirm'];
        for (var item in pageContent) {
            if (typeList.includes(pageContent[item].elementType) || typeList.includes(pageContent[item].custom1)) {
                result = true;
                break;
            }
        }
        return result;
    }

    componentDidMount() {

    }

    controlSliderBarStatus = (status) => {
        this.props.handleFooterSction(status)
    }

    render() {

        let language = this.props.elementsData.language;
        if (this.props.isMenuItem) {
            language = this.props.language;
        }
        let headingSize = null;
        if (this.props.elementsData.headingSize != null) {
            headingSize = this.props.elementsData.headingSize;
        }
        let rootDivClass = null;
        let inlineStyle = {};
        const backgroundImageSrc = process.env.PUBLIC_URL + "/image/city-footer-bg.png";
        if (this.props.hasBackground !== false) {
            rootDivClass = styles.elementsRootContainer;
            inlineStyle = {backgroundImage: `url(${backgroundImageSrc})`};
        }
        let colSizeClass = "col-md-7 mx-auto";
        if (this.props.colSize === 6) {
            colSizeClass = "col-lg-7 mx-auto";
        }
        const pageHeading = this.props.elementsData.pageHeading[language];
        const elementCount = this.props.elementsData.pageContent.length;
        const pageElements = this.props.elementsData.pageContent;
        const pageStyleType = this.cehckPageStyleType(pageElements);
        const pageComponents = [];
        for (let counter = 0; counter < elementCount; counter++) {
            if (pageElements !== null) {
                if (pageElements[counter].elementType === "button") {

                    if (this.props.isMenuItem) {

                        if (this.props.elementsData.page_type !== 'HM') {
                            if (pageElements[counter].custom1 === 'resend') {
                                pageComponents.push(<ResendButtonElement
                                    key={counter}
                                    language={language}
                                    prevPage={this.props.elementsData.currentPage}
                                    onClickHandler={this.props.onClickHandler}
                                    buttonProperties={pageElements[counter]}
                                />);
                            } else if (pageElements[counter].custom1 === 'submit') {
                                pageComponents.push(<ButtonElement
                                    key={counter}
                                    language={language}
                                    onClickHandler={this.props.onClickHandler}
                                    buttonProperties={pageElements[counter]}
                                />);
                            }else if (pageElements[counter].custom1 === 'card') {
                                pageComponents.push(<Card language={language} key={counter} cardContent={pageElements[counter]} />);
                            } else {
                                pageComponents.push(<MenuButtonElement
                                    key={counter}
                                    pageType="SM"
                                    language={language}
                                    onClickHandler={this.props.onClickHandler}
                                    buttonProperties={pageElements[counter]}
                                />);
                            }


                        } else {
                            pageComponents.push(<MenuButtonElement
                                key={counter}
                                pageType="HM"
                                language={language}
                                onClickHandler={this.props.onClickHandler}
                                buttonProperties={pageElements[counter]}
                            />);
                        }

                    } else {
                        pageComponents.push(<ButtonElement
                            key={counter}
                            language={language}
                            buttonProperties={pageElements[counter]}
                        />);
                    }
                } else if (pageElements[counter].elementType === "paragraph") {
                    pageComponents.push(<PageDescriptionElement
                        key={counter}
                        pageDescription={pageElements[counter]["displayText" + language]}
                    />);
                } else if (pageElements[counter].elementType === "input") {
                    let inputType = pageElements[counter].inputProperties.type;
                    let inputName = pageElements[counter].inputProperties.name;
                    if (inputType === "text" || inputType === "number" || inputType === "password") {
                        pageComponents.push(
                            <PageDescriptionElement
                                key={counter}
                                pageDescription={pageElements[counter]["displayText" + language]}
                            />
                        );
                        if (inputName === "cli") {
                            pageComponents.push(
                                <InputPhone
                                    key={counter + 1000}
                                    language={language}
                                    inputFormProperties={pageElements[counter].inputProperties}
                                />
                            );
                        } else {

                            pageComponents.push(
                                <InputFormElement

                                    key={counter + 1000}
                                    language={language}
                                    inputFormProperties={pageElements[counter].inputProperties}
                                />
                            );

                        }
                    }
                } else if (pageElements[counter].elementType === "dynamicInput") {
                    let inputType = pageElements[counter].inputProperties.type;
                    if (inputType === "text_area") {
                        pageComponents.push(
                            <TextAreaElement
                                manageSliderBar={this.controlSliderBarStatus}
                                key={counter + 1000}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                                onChangeHandler={this.props.onChangeHandler}
                            />
                        );
                    }
                    if (inputType === "tpin") {
                        pageComponents.push(
                            <TpinInput
                                key={counter + 1000}
                                manageSliderBar={this.controlSliderBarStatus}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                                onChangeHandler={this.props.onChangeHandler}
                            />
                        );
                    }
                    if (inputType === "pin") {
                        pageComponents.push(
                            <PinInput
                                onChangeHandler={this.props.onChangeHandler}
                                manageSliderBar={this.controlSliderBarStatus}
                                key={counter + 1000}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                            />
                        );
                    }
                    if (inputType === "exp_date") {
                        pageComponents.push(
                            <ExpireDate
                                onChangeHandler={this.props.onChangeHandler}
                                manageSliderBar={this.controlSliderBarStatus}
                                key={counter + 1000}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                            />
                        );
                    }
                    if (inputType === "text" || inputType === "number" || inputType === "password") {
                        /*                       pageComponents.push(
                                                   <InputLabelElement
                                                       key={counter}
                                                       pageDescription={pageElements[counter]["displayText" + language]}
                                                   />
                                               );*/

                        pageComponents.push(
                            <DynamicInputElement
                                manageSliderBar={this.controlSliderBarStatus}
                                key={counter + 1000}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                                onChangeHandler={this.props.onChangeHandler}
                            />
                        );
                    } else if (inputType === "select") {
                        pageComponents.push(
                            <DropdownElement
                                key={counter + 1000}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                                onChangeHandler={this.props.onChangeHandler}
                            />
                        );
                    }
                    else if (inputType === "date") {
                        pageComponents.push(
                            <DatePickerInput
                                key={counter + 1000}
                                language={language}
                                inputFormProperties={pageElements[counter].inputProperties}
                                onChangeHandler={this.props.onChangeHandler}
                            />
                        );
                    }
                } else if (pageElements[counter].elementType === "table") {
                    pageComponents.push(
                        <TableElement
                            key={counter + 1000}
                            language={language}
                            tableType={pageElements[counter].tableType}
                            tableHead={pageElements[counter].tableHead}
                            tableBody={pageElements[counter].tableData}
                            columnCount={pageElements[counter].columnCount}
                        />
                    );
                } else if (pageElements[counter].elementType === "a") {
                    switch(pageElements[counter].custom1){
                        case 'paragrap_link':
                            break;
                        case 'video_link':
                            break;
                        case 'button_link':
                            pageComponents.push(<ButtonLInk
                                key={counter}
                                url={pageElements[counter].elementValue[language]}
                                title={pageElements[counter]["displayText" + language]}
                            />);
                            break;
                        case 'download_link':
                            break;
                        case 'blog_link':
                            pageComponents.push(<BlogLinkDataElement
                                key={counter}
                                blogContent={pageElements[counter].elementValue.content[language]}
                                blogHeading={pageElements[counter].elementValue.title[language]}
                            />);
                            break;
                        default:
                    }
                }
            }
        }
        return (
            <>
                <div className={styles.ctaArea + " text-center"}>
                    <Cta/>
                </div>
                <div className={"container-fluid "}>
                    <div className="row">
                        <div className={colSizeClass + " " + styles.elementsContainer}>
                            {this.props.elementsData.page_type !== 'HM' ? (<PageHeadingElement
                                pageHeading={pageHeading}
                                headingSize={headingSize}
                            />) : <PageHeadingElement
                                pageHeading={pageHeading}
                                headingSize={headingSize}
                            />}

                            {this.props.elementsData.page_type !== 'HM' ? (
                                <div className={pageStyleType ? ' flex-menu-inner-area ' : styles.flexMenuAreaInner}>
                                    {pageComponents}
                                </div>) : (<div className={styles.flexMenuArea}>
                                {pageComponents}
                            </div>)}

                        </div>
                    </div>
                    <div className={"row " + rootDivClass} style={inlineStyle}/>
                </div>
            </>
        );
    }
}

export default Elements;
