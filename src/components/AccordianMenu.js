import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import AddressForm from "./AddressForm"
import { connect } from "react-redux";
import {grow, shrink} from "../actions/menus"

class AccordianMenu extends Component {
  state = {
    activeIndex: 0
   }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.changeWidth()
    this.setState({ activeIndex: newIndex })
  }

  changeWidth = (event) => {
    if(this.props.width === "100px"){
      this.props.grow()
    }
    else if (this.props.width === "400px") {
      this.props.shrink()
    }
  }

  handleActiveIndex = () => {
    this.setState({
      activeIndex: 0
    })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion styled className="accordians" style={{zIndex: 100, position: "relative", top: "10px", width:`${this.props.width}`}}  >
        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick} style={{color: "teal"}}>
          <Icon name='dropdown' />
          Create a deal
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <AddressForm changeWidth={this.changeWidth} handleActiveIndex={this.handleActiveIndex} />
        </Accordion.Content>
      </Accordion>
    )
  }
}

function mapStateToProps(state) {
  return {width: state.manageMenus.width}
}

export default connect(mapStateToProps, { grow, shrink })(AccordianMenu)
