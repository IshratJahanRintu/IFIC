import React from 'react'

export default function CardElement(props) {
    const visaBusiness = process.env.PUBLIC_URL + "/image/cards/visa-business.png";
    const amarVisaSignature = process.env.PUBLIC_URL + "/image/cards/amar-visa-signature.png";
    const sohozVisaPlatinum = process.env.PUBLIC_URL + "/image/cards/sohoz-visa-platinum.png";
    const sohozVisaSignature = process.env.PUBLIC_URL + "/image/cards/sohoz-visa-signature.png";
    const visaPlatinum = process.env.PUBLIC_URL + "/image/cards/visa-platinum.png";
    const visaSignature = process.env.PUBLIC_URL + "/image/cards/visa-signature.png";
    const cardBack = process.env.PUBLIC_URL + "/image/cards/cards-back.png";
    const amarBack = process.env.PUBLIC_URL + "/image/cards/amar-back.png";
    const amarVisaPlatinum = process.env.PUBLIC_URL + "/image/cards/amarvisa-platinum.png";
    const {card_type,expir_date,key,person_name,state,value} = props.content;
    function formatCardNumber(cardNumber) {
        const regex = /(\d{4})(\s?)/g;
        return cardNumber.replace(regex, '$1 ');
    }
    
    function CardNumber(props) {
        const {number} = props;
        const formattedNumber = formatCardNumber(number);
        return <span className="card-no">{formattedNumber}</span>;
    }

    function ExpireDate() {
        const formattedDate = expir_date.split('.').join(' / ');
        return (<span  className="g-card-expire"> {formattedDate} </span>)
    }
    
    return (
        <div className="g-bank-cards-main ">
            <figure className="g-single-card">
                <img className="img-fluid" src={amarVisaPlatinum} alt=""/>
                <figcaption>
                    <CardNumber number={value}/>
                    <ExpireDate />
                    <span className="g-card-name">
                        {person_name}
                    </span>
                </figcaption>
            </figure>
        </div>
    )
}
