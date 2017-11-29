import React, { Component } from "react";
import { Accordion } from "semantic-ui-react";
import DealCard from "./DealCard";
import { connect } from "react-redux";
import {
  todays_deals,
  future_deals,
  past_deals
} from "../services/DealDayManager";
import { grow, shrink } from "../actions/menus";

//THIS IS WHAT TO DO NEXT
//Need to find a way to dynamically create these panels
//Then deal with the cards

const tempPan = [
  { title: "Level 1A", content: "Level 1A Contents" },
  { title: "Level 1B", content: "Level 1B Contents" }
];

class AccordianDeals extends Component {
  state = { activeIndex: null };
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  formatted_panels = typeOfDeals => {
    console.log(this);

    if (this.props.deals) {
      let filteredDeals = typeOfDeals(this.props.deals);
      return filteredDeals.map(deal => {
        return {
          title: deal.title,
          content:
            "Title: " +
            deal.title +
            "\n" +
            "Date: " +
            deal.deal_day +
            "\n" +
            "Location: " +
            deal.address +
            "\n" +
            "Details: " +
            deal.description
        };
      });
    } else {
      return tempPan;
    }
  };

  handleWidth = event => {
    if (this.props.width === "100px") {
      this.props.grow();
    } else if (this.props.width === "400px") {
      this.props.shrink();
    }
  };

  render() {
    const { activeIndex } = this.state;
    const level1Panels = [
      { title: "Level 1A", content: "Level 1A Contents" },
      { title: "Level 1B", content: "Level 1B Contents" }
    ];

    function handleAccordianClick(event){
      event.stopPropagation()
    }

    const Level1Content = (
      <div>
        <Accordion.Accordion
          exclusive={false}
          style={{ whiteSpace: "pre-wrap" }}
          panels={this.formatted_panels(todays_deals)}
          onClick={handleAccordianClick}
          exclusive={true}
        />
      </div>
    );

    const level2Panels = [
      { title: "Level 2A", content: "Level 2A Contents" },
      { title: "Level 2B", content: "Level 2B Contents" }
    ];

    const Level2Content = (
      <div>
        <Accordion.Accordion
          style={{ whiteSpace: "pre-wrap" }}
          panels={this.formatted_panels(future_deals)}
          onClick={handleAccordianClick}
          exclusive={true}
        />
      </div>
    );

    const Level3Content = (
      <div>
        <Accordion.Accordion
          style={{ whiteSpace: "pre-wrap" }}
          panels={this.formatted_panels(past_deals)}
          onClick={handleAccordianClick}
          exclusive={true}
        />
      </div>
    );

    function handleTest() {
      console.log("dsklfajsdlk");
    }
    const rootPanels = [
      {
        title: "Today's Deals",
        content: { content: Level1Content, key: "content-1" }
      },
      {
        title: "Future Deals",
        content: { content: Level2Content, key: "content-2" }
      },
      {
        title: "Past Deals",
        content: {
          content: Level3Content,
          key: "content-3",
          onClick: handleTest()
        }
      }
    ];
    return (
      <Accordion
        className="accordians"
        exclusive={false}
        defaultActiveIndex={0}
        panels={rootPanels}
        style={{
          position: "relative",
          top: "10px",
          width: `${this.props.width}`
        }}
        onClick={this.handleWidth.bind(this)}
        styled
      />
    );
  }
}

function mapStateToProps(state) {
  return { deals: state.manageDeals.deals, width: state.manageMenus.width };
}

export default connect(mapStateToProps, {
  todays_deals,
  future_deals,
  past_deals,
  grow,
  shrink
})(AccordianDeals);

{
  /* <div id="dealScroll">

</div>  */
}
