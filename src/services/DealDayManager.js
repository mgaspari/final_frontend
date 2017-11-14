export function todays_deals(deals){
  return deals.filter((deal) => {
      var dealDate = new Date(`${deal.deal_day} 00:00`)
      var todaysDate = new Date()
    if (dealDate.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)){
      return deal
    }
  })
}

export function future_deals(deals){
  return deals.filter((deal) => {
      var dealDate = new Date(`${deal.deal_day} 00:00`)
      var todaysDate = new Date()
    if (dealDate.setHours(0,0,0,0) > todaysDate.setHours(0,0,0,0)){

      return deal
    }
  })
}

export function past_deals(deals){
  return deals.filter((deal) => {
      var dealDate = new Date(`${deal.deal_day} 00:00`)
      var todaysDate = new Date()
    if (dealDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)){
      return deal
    }
  })
}
