import React, { Component } from 'react'
import { Accordion} from 'semantic-ui-react'
import DealCard from './DealCard'
import {connect} from 'react-redux'
import {todays_deals, future_deals, past_deals} from "../services/DealDayManager"

//THIS IS WHAT TO DO NEXT
//Need to find a way to dynamically create these panels
//Then deal with the cards

const tempPan = [
  { title: 'Level 1A', content: 'Level 1A Contents' },
  { title: 'Level 1B', content: 'Level 1B Contents' },
]

 class AccordianDeals extends Component {
  state = { activeIndex: null }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

formatted_panels = (typeOfDeals) => {
    console.log(this)

    if (this.props.deals){
      let filteredDeals = typeOfDeals(this.props.deals)
      return filteredDeals.map((deal) => {
        return {title: deal.title, content: "Title: " + deal.title + "\n" + "Date: " + deal.deal_day + "\n" + "Location: " + deal.address + "\n" + "Details: " + deal.description}
      })
    } else {
      return tempPan
    }
  }

  render() {
    const { activeIndex } = this.state
    const level1Panels = [
  { title: 'Level 1A', content: 'Level 1A Contents' },
  { title: 'Level 1B', content: 'Level 1B Contents' },
]

const Level1Content = (
  <div>
    <Accordion.Accordion exclusive={false} style={{whiteSpace: "pre-wrap"}} panels={this.formatted_panels(todays_deals)} />
  </div>
)

const level2Panels = [
  { title: 'Level 2A', content: 'Level 2A Contents' },
  { title: 'Level 2B', content: 'Level 2B Contents' },
]

const Level2Content = (
  <div>
    <Accordion.Accordion style={{whiteSpace: "pre-wrap"}} panels={this.formatted_panels(future_deals)} />
  </div>
)

const Level3Content = (
  <div>
    <Accordion.Accordion style={{whiteSpace: "pre-wrap"}} panels={this.formatted_panels(past_deals)} />
  </div>
)

    const rootPanels = [
  { title: 'Today\'s Deals', content: { content: Level1Content, key: 'content-1' } },
  { title: 'Future Deals', content: { content: Level2Content, key: 'content-2' } },
  { title: 'Past Deals', content: { content: Level3Content, key: 'content-3' } }
]
    return (
      <Accordion exclusive={false} defaultActiveIndex={0} panels={rootPanels} styled />
    )
  }
}

function mapStateToProps(state) {

  return {deals: state.manageDeals.deals}
}

export default connect(mapStateToProps, { todays_deals, future_deals, past_deals })(AccordianDeals)


{/* <div id="dealScroll">

</div>  */}
