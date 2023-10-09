import React, {Component} from 'react';
import PageHeadingElement from "./PageText/PageHeadings/PageHeadingElement";
import PageDescriptionElement from "./PageText/PageDescription/PageDescriptionElement";
import InputFormElement from "./Inputs/InputFormElement";
import ButtonElement from "./Buttons/ButtonElement";
import InputPhone from "./Inputs/InputPhone";
import styles from "./Elements.module.css";
// import 'element.css';
import MenuButtonElement from "./Buttons/MenuButtonElement";
// import InputLabelElement from "./Inputs/InputLabelElement";
import DynamicInputElement from "./Inputs/DynamicInputElement";
import TableElement from "./Tables/TableElement";
import DropdownElement from "./Dropdown/DropdownElement";
import Cta from "../Cta/Cta";

class LoginElement extends Component {
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
        let colSizeClass = "col-md-4 mx-md-auto";
        if (this.props.colSize === 6) {
            colSizeClass = "col-md-6 mx-md-auto";
        }
        const pageHeading = this.props.elementsData.pageHeading[language];
        const elementCount = this.props.elementsData.pageContent.length;
        const pageElements = this.props.elementsData.pageContent;
        const pageComponents = [];
        for (let counter = 0; counter < elementCount; counter++) {
            if (pageElements !== null) {
                if (pageElements[counter].elementType === "button") {
                    pageComponents.push(<ButtonElement
                        key={counter}
                        language={language}
                        buttonProperties={pageElements[counter]}
                    />);
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
                    if (inputType === "text" || inputType === "number" || inputType === "password") {
                        /*                       pageComponents.push(
                                                   <InputLabelElement
                                                       key={counter}
                                                       pageDescription={pageElements[counter]["displayText" + language]}
                                                   />
                                               );*/
                        pageComponents.push(
                            <DynamicInputElement
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
                } else if (pageElements[counter].elementType === "table") {
                    pageComponents.push(
                        <TableElement
                            key={counter + 1000}
                            language={language}
                            tableHead={pageElements[counter].tableHead}
                            tableBody={pageElements[counter].tableData}
                            columnCount={pageElements[counter].columnCount}
                        />
                    );
                }
            }
        }
        return (
            <div className={"container-fluid"}>
                <div className="row">
                    <div className={styles.elementsContainer}>

                        <div className={colSizeClass + " " + styles.loginFormArea}>
                            <Cta/>
                            {this.props.elementsData.page_type !== 'HM' ? (<PageHeadingElement
                                pageHeading={pageHeading}
                                headingSize={headingSize}
                                pageType="login"
                            />) : <PageHeadingElement
                                pageHeading={''}
                                headingSize={headingSize}
                            />}


                            {this.props.elementsData.page_type !== 'HM' ? (<div>

                                {pageComponents}
                            </div>) : (<div>
                                {pageComponents}
                            </div>)}
                        </div>
                    </div>
                </div>
                <div className={"row " + rootDivClass} style={inlineStyle}></div>
            </div>
        );
    }
}

export default LoginElement;
