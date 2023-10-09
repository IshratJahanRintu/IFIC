import React from 'react'
import CardElement from '../../Components/Elements/Inputs/CardElement';

export default function Card(props) {
  const cardContentInfo = props.cardContent.buttonItems;
  
  function CardElementList(){
    let cardItems = [];
    for (let counter = 0; counter < cardContentInfo.length; counter++) {
        cardItems.push(<CardElement content={cardContentInfo[counter]}   />)
    }
    return cardItems;
  }
  return (
    <div className="g-post">
        <div className="g-post-area">
            <CardElementList />
        </div>
    </div>
  )
}
