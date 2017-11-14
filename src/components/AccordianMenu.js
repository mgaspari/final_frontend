import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import AddressForm from "./AddressForm"

export default class AccordianMenu extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion styled>
        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Create a deal
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <AddressForm/>
        </Accordion.Content>
      </Accordion>
    )
  }
}
