import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {
    BENGALI,
    ENGLISH,
} from "../../config/Constants";
import Header from "../../Components/Header/Header";
import Elements from "../../Components/Elements/Elements";
import styles from "../Contents/Content.module.css";
import {getErrorElements} from "./Content.jsx";
import {isLoggedIn} from "../../config/Helpers";
import Footer from "../Footer/Footer";


const cookies = new Cookies();


function formatCardNumber(cardNumber) {
    const regex = /(\d{4})(\s?)/g;
    return cardNumber.replace(regex, '$1 ');
}

function CardNumber(props) {
    const {number} = props;
    const formattedNumber = formatCardNumber(number);
    return <span className="card-no">{formattedNumber}</span>;
}

class Content extends Component {
    constructor(props) {
        super(props);
        // this.checkIsLoggedIn();
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
            language: language,
            showFirstDiv: true,
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.toggleDivs = this.toggleDivs.bind(this);
    }

    toggleDivs = () => {
        this.setState({
            showFirstDiv: !this.state.showFirstDiv,
        });
    };

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
        const visaBusiness = process.env.PUBLIC_URL + "/image/cards/visa-business.png";
        const amarVisaSignature = process.env.PUBLIC_URL + "/image/cards/amar-visa-signature.png";
        const sohozVisaPlatinum = process.env.PUBLIC_URL + "/image/cards/sohoz-visa-platinum.png";
        const sohozVisaSignature = process.env.PUBLIC_URL + "/image/cards/sohoz-visa-signature.png";
        const visaPlatinum = process.env.PUBLIC_URL + "/image/cards/visa-platinum.png";
        const visaSignature = process.env.PUBLIC_URL + "/image/cards/visa-signature.png";
        const cardBack = process.env.PUBLIC_URL + "/image/cards/cards-back.png";
        const amarBack = process.env.PUBLIC_URL + "/image/cards/amar-back.png";
        const amarVisaPlatinum = process.env.PUBLIC_URL + "/image/cards/amarvisa-platinum.png";
        const error = process.env.PUBLIC_URL + "/image/error.svg";
        const thanksSvg = process.env.PUBLIC_URL + "/image/feedback/thanks.svg";
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 mx-auto">

                            {/*Post Content*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>Amar Account</h3>
                                </div>
                                <div className="g-post-area">
                                    <img src="https://picsum.photos/1200/400" alt="" className="img-fluid"/>

                                    <div className="g-post-content">
                                        <p>Unique individual (Single or Joint) savings account that allows you both
                                            deposit and loan facilities with unlimited transaction facility like current
                                            account. Aamar account comes with cross currency transaction facility all
                                            over the world with “Aamar Card”). This is the only account in Bangladesh
                                            that provides you supplementary debit card.
                                        </p>
                                        <figure>
                                            <h5>Highlights</h5>
                                            <figcaption>
                                                <ul>
                                                    <li>Unlimited Transaction Facility like Current Account</li>
                                                    <li>Daily basis interest calculation and paid monthly</li>
                                                    <li>International debit card with cross Currency facility</li>
                                                    <li>Easy access to overdraft facility</li>
                                                    <li>Loan interest (if any) calculated only on used amount</li>
                                                </ul>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            {/*Table Components*/}
                            <div className="g-post d-none">
                                <div className="g-post-table-area">
                                    <div className="g-post-title">
                                        <h3>Compare A/C Features</h3>
                                    </div>
                                    <div className="g-post-area table-responsive">
                                        <div className="table-responsive">
                                            <table id="g-table"
                                                   className="table table-striped table-bordered border table-sm">
                                                <thead>
                                                <tr>
                                                    <th>Types</th>
                                                    <th>Amar Account</th>
                                                    <th>Shohoj Account</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>Minimum Account Opening Balance</td>
                                                    <td>BDT 1000</td>
                                                    <td>BDT 10</td>
                                                </tr>
                                                <tr>
                                                    <td>Debit Card Facility</td>
                                                    <td>International</td>
                                                    <td>Local</td>
                                                </tr>
                                                <tr>
                                                    <td>Debit Card Facility</td>
                                                    <td>International</td>
                                                    <td>Local</td>
                                                </tr>
                                                <tr>
                                                    <td>Check Book & Withdraw Facility</td>
                                                    <td>Overdraft Credit</td>
                                                    <td>Shohoj Rin</td>
                                                </tr>
                                                <tr>
                                                    <td>One person can open multiple account</td>
                                                    <td>Open For Loan Purpose</td>
                                                    <td>Can't Open</td>
                                                </tr>
                                                <tr>
                                                    <td>Minor can open account</td>
                                                    <td>No</td>
                                                    <td>Yes</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Loan/EMI Calculator*/}
                            <div className="g-post">
                                <div className="g-post-title">
                                    <h3>Loan EMI Calculator</h3>

                                </div>
                                <div className="g-post-area">
                                    <div className="g-loan-emi">

                                        <form action="">

                                            <div className="form-group mb-3">
                                                <label htmlFor="d-date">Disbursement Date <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="date" name="" id="d-date" className="form-control"
                                                       placeholder="06/12/2027" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="l-amount">Loan Amount <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="number" name="" id="l-amount" className="form-control"
                                                       placeholder="40000000" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="">Number Of Month <sup className="bi bi-asterisk"></sup></label>
                                                <input type="number" name="" id="n-of-month" className="form-control"
                                                       placeholder="36" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="i-rate">Interest Rate <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="number" name="" id="i-rate" className="form-control"
                                                       placeholder="09" required/>
                                            </div>
                                            <div className="g-btn-group">
                                                <button type="reset" className="btn btn-outline-danger btn-sm">Reset
                                                </button>
                                                <button type="submit" className="btn btn-sm btn-danger">Calculate
                                                </button>
                                            </div>
                                        </form>


                                        {/*Calculating Result*/}
                                        <div className="g-emi-result d-none">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <strong>Loan EMI Details</strong>
                                                        <span className="bi bi-x-lg fw-bold text-danger"></span>
                                                    </div>

                                                </div>
                                                <div className="card-body table-responsive">
                                                    <table className="table-sm table table-striped g-result-table">
                                                        <tbody>
                                                        <tr>
                                                            <td>Loan Amount</td>
                                                            <td>TK <span>4,00,000</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Interest</td>
                                                            <td><span>9</span>%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Month</td>
                                                            <td><span>60</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Month EMI</td>
                                                            <td>TK <span>8,303</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total Interest</td>
                                                            <td>TK <span>98,201</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total Payments</td>
                                                            <td>TK <span>4,98,201</span></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/*End Calculating Result*/}


                                    </div>
                                </div>


                            </div>

                            {/*DPS Calculator*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>DPS EMI Calculator</h3>
                                </div>
                                <div className="g-post-area">
                                    <div className="g-dps-cal">

                                        <form>
                                            <div className="form-group mb-3">
                                                <label htmlFor="d-date">Monthly Deposit Amount <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="number" name="" id="d-date" className="form-control"
                                                       placeholder="Enter your monthly amount" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="l-amount">Number of Month <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="number" name="" id="l-amount" className="form-control"
                                                       placeholder="05" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="">Interest Compounding <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="text" name="" id="n-of-month" className="form-control"
                                                       placeholder="Enter Loan Month" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="i-rate">Interest Rate <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="text" name="" id="i-rate" className="form-control"
                                                       placeholder="Enter interest rate" required/>
                                            </div>
                                            <div className="g-btn-group">
                                                <button type="reset" className="btn btn-outline-danger btn-sm">Reset
                                                </button>
                                                <button type="submit" className="btn btn-sm btn-danger">Calculate
                                                </button>
                                            </div>
                                        </form>


                                        {/*Calculating Result*/}
                                        <div className="g-dps-result">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <strong>DPS EMI Details</strong>
                                                        <span className="bi bi-x-lg fw-bold text-danger"></span>
                                                    </div>

                                                </div>
                                                <div className="card-body table-responsive">
                                                    <table className="table-sm table table-striped g-result-table">
                                                        <tbody>
                                                        <tr>
                                                            <td>Monthly Deposit</td>
                                                            <td>TK <span>4,00,000</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Interest</td>
                                                            <td><span>9</span>%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Period(Months)</td>
                                                            <td><span>120</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Interest Compounding</td>
                                                            <td>Monthly</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Interest Amount</td>
                                                            <td>TK <span>98,201</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Maturity Amount</td>
                                                            <td>TK <span>4,98,201</span></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/*End Calculating Result*/}


                                    </div>
                                </div>
                            </div>

                            {/*Deposit Rate*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>Deposit Rate</h3>
                                </div>
                                <div className="g-post-area">
                                    <div className="text-end">
                                        <small>Effective From <span>10/12/2022</span></small>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-sm">
                                            <thead>
                                            <tr>
                                                <th>Deposit Product</th>
                                                <th>Rate of Interest</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="2" className="text-center"><strong className="text-danger">A.
                                                    IFIC Aamar Account</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Less then Tk. 25,000</td>
                                                <td>0.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 25,000 to Tk 5,00,000</td>
                                                <td>4.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk 5,00,001 to Tk. 20,00,000</td>
                                                <td>5.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 20,00,001 to Tk. 50,00,000</td>
                                                <td>5.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Above Tk. 50,00,000</td>
                                                <td>5.50%</td>
                                            </tr>

                                            <tr>
                                                <td colSpan="2" className="text-center"><strong className="text-danger">B.
                                                    Savings</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Savings Bank Deposit</td>
                                                <td>2.00%</td>
                                            </tr>
                                            <tr>
                                                <td>10 Taka Savings Account</td>
                                                <td>2.00%</td>
                                            </tr>

                                            <tr>
                                                <td colSpan="2" className="text-center"><strong className="text-danger">C.
                                                    IFIC Shohoj</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Less then Tk. 25,000</td>
                                                <td>0.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 25,000 to Tk 5,00,000</td>
                                                <td>4.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk 5,00,001 to Tk. 20,00,000</td>
                                                <td>5.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 20,00,001 to Tk. 50,00,000</td>
                                                <td>5.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Above Tk. 50,00,000</td>
                                                <td>5.50%</td>
                                            </tr>

                                            <tr>
                                                <td colSpan="2" className="text-center"><strong className="text-danger">D.
                                                    Special Notice Deposit (SND)</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Less then Tk. 1 Cr.</td>
                                                <td>2.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 1 Cr. & less than Tk. 25 Cr.</td>
                                                <td>2.00%</td>
                                            </tr>
                                            <tr>
                                                <td>Tk 25 Cr. & less than to Tk. 50 Cr.</td>
                                                <td>2.00%</td>
                                            </tr>

                                            </tbody>


                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/*Schedule Of Charge*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>Schedule Of Charge</h3>
                                </div>
                                <div className="g-post-area">
                                    <div className="text-end">
                                        <small>Effective From <span>10/12/2022</span></small>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-sm">
                                            <thead>
                                            <tr>
                                                <th>Particulars</th>
                                                <th>Rate</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="2" className="text-center"><strong className="text-danger">Deposit
                                                    Accounts</strong></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Current Account</td>
                                            </tr>
                                            <tr>
                                                <td>Account Maintenance Fee (half yearly)</td>
                                                <td>Tk. 300 + VAT</td>
                                            </tr>
                                            <tr>
                                                <td>Closing of Account</td>
                                                <td>Tk. 300 + VAT</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="" className="text-start"><strong className="text-danger">SND
                                                    Account & Corporate
                                                    Plus</strong></td>
                                                <td><strong className="text-danger">Account Maintenance Fee</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Average balance up to Tk. 10,000</td>
                                                <td>Free</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 10,001 & up to Tk. 25,000 (half yearly)</td>
                                                <td>Tk. 100 + VAT</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 25,001 & up to Tk. 2,00,000 (half yearly)</td>
                                                <td>Tk. 200 + VAT</td>
                                            </tr>
                                            <tr>
                                                <td>Tk. 2,00,001 & up to Tk. 1,000,000 (12/2)</td>
                                                <td>Tk. 250 + VAT</td>
                                            </tr>
                                            <tr>
                                                <td>Avg balance above Tk 1,000,000 (half yearly)</td>
                                                <td>Tk. 300 + VAT</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Closing of Account</strong></td>
                                                <td><strong>Tk. 200 + VAT</strong></td>
                                            </tr>

                                            <tr>
                                                <td colSpan="2" className="text-center"><strong className="text-danger">Saving
                                                    Account (Student)</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Account Maintenance Fee</td>
                                                <td>Free</td>
                                            </tr>
                                            <tr>
                                                <td>Debit Card</td>
                                                <td>Free</td>
                                            </tr>
                                            <tr>
                                                <td>Closing of Account</td>
                                                <td>Nill</td>
                                            </tr>


                                            </tbody>


                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/*Branch Locations*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>Branch & Uposhakha</h3>
                                </div>
                                <div className="g-post-area">
                                    <div className="g-post-location-map">

                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0329648985908!2d90.36333111536355!3d23.817426792128586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c12f59299f25%3A0xaa32408fc8bbcdaa!2sIFIC%20Bank%20Limited!5e0!3m2!1sen!2sbd!4v1671425770100!5m2!1sen!2sbd"
                                            width="100%" height="400" style={{border: 0}} allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade">
                                        </iframe>

                                        <div className="g-post-location-form">

                                            <form action="">
                                                <div className="form-group">
                                                    <label htmlFor="g-b-district">Your District</label>
                                                    <select name="" id="g-b-district" className="form-control"
                                                            placeholder="select">
                                                        <option value="">District Name</option>
                                                        <option value="">District Name</option>
                                                        <option value="">District Name</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="g-b-district">Your City</label>
                                                    <select name="" id="g-b-district" className="form-control">
                                                        <option value="">City</option>
                                                        <option value="">City</option>
                                                        <option value="">City</option>
                                                        <option value="">City</option>
                                                    </select>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Thanks Giving Page*/}
                            <div className="g-post d-none">
                                <div className="g-post-area">
                                    <div className="g-thanks-area">
                                        <div className="g-thanks-meta text-center">
                                            <img className="img-fluid my-3" src={thanksSvg} alt="thanks-giving"/>
                                            <h4>
                                                Thank You!
                                            </h4>
                                            <p>To use our banking services</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Product Feedbacks*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>Feedback (Product)</h3>
                                </div>
                                <div className="g-post-area">
                                    <div className="g-product-feedback">
                                        <form action="">

                                            <div className="form-group mb-3">
                                                <label htmlFor="d-date">Name <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="text" name="" id="d-date" className="form-control"
                                                       placeholder="Your Name" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="l-amount">Mobile / Email <sup
                                                    className="bi bi-asterisk"></sup></label>
                                                <input type="email" name="" id="l-amount" className="form-control"
                                                       placeholder="mail@mail.com" required/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="">Select Product <sup className="bi bi-asterisk"></sup></label>
                                                <select name="" id="" className="form-control">
                                                    <option value="">Product One</option>
                                                    <option value="">Product Two</option>
                                                    <option value="">Product Three</option>
                                                </select>
                                            </div>
                                            <div className="form-group mb-3">
                                                <textarea name="" id="" cols="30" rows="10"
                                                          className="form-control"></textarea>
                                            </div>
                                            <div className="g-btn-group text-center">
                                                <button type="submit" className="btn px-4 btn-danger">Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/*Bank Debit/Credit Cards*/}
                            <div className="g-post d-none">
                                <div className="g-post-title">
                                    <h3>Cards</h3>
                                </div>
                                <div className="g-post-area">
                                    {this.state.showFirstDiv ? (
                                        <div className="g-bank-cards-main ">
                                            <figure className="g-single-card">
                                                <img className="img-fluid" src={sohozVisaPlatinum} alt=""/>
                                                <figcaption>
                                                    <CardNumber number="1234567845868998"/>
                                                    <span className="g-card-expire">
                                                   <span>12</span> / <span>2030</span>
                                               </span>
                                                    <span className="g-card-name">
                                                    MR <span>name</span> <span>surname</span>
                                                </span>
                                                </figcaption>
                                            </figure>
                                            <button className="btn btn-outline-success btn-sm" onClick={this.toggleDivs}>
                                                <i className="bi bi-credit-card-2-front-fill"></i> Back Side</button>
                                        </div>
                                    ) : (<div className="g-bank-cards-back">
                                        <figure className="g-single-card">
                                            <img className="img-fluid" src={cardBack} alt=""/>
                                            <figcaption>
                                                <span className="g-card-cvc">
                                                   <span className="g-cvc">4566</span>
                                                </span>
                                            </figcaption>
                                        </figure>
                                        <button className="btn btn-outline-success btn-sm" onClick={this.toggleDivs}><i
                                            className="bi bi-credit-card"></i> Front Side</button>
                                    </div>)}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default Content;
