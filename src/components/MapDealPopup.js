import React from "react"

let MapDealPopup = (props) => {
  return(
    <div className="ui teal pointing below basic label" style={{flex: 1, width: 200, alignItems: 'center', zIndex: -10}}>
      <img style={{left: "38%"}} className="ui big circular image" src={props.deal.img_link} />
      <h5>{props.deal.title}</h5>
      <p>{props.deal.description.length > 120 ? `${props.deal.description.substring(0,120)}...` : props.deal.description}</p>

    </div>
  )
}

export default MapDealPopup
