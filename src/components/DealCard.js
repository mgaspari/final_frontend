import React from "react"

function DealCard(props){
  return(
    <div class="ui card">
      <img class="ui image" src={props.deal.img_link} />
      <div class="content">
        <div class="header">{props.deal.deal_day}</div>
        <div class="meta">
          <span class="date">{props.deal.address}</span>
        </div>
        <div class="description">{props.deal.description}</div>
      </div>
      <div class="extra content">
        <a>
    <i aria-hidden="true" class="user icon"></i>22 Friends</a>
      </div>
    </div>
  )
}

export default DealCard
