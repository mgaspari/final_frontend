import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ImageHandler from "./ImageHandler"
import {createDeal} from "../actions/deals"
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import Alert from 'react-s-alert';

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'Deal Address...',
      lat: 0,
      lng: 0,
      title: "Deal Title...",
      date: "",
      description: "Deal Description...",
      img_link: ""
   }
    this.onChange = (address) => this.setState({ address })
  }

  handleClick = (event) => {
    if (event.keyCode === 13){
      alert("Press submit!")
    }
  }

  successAlert = () => {
    Alert.success('Deal Created', {
      position: 'top-right',
      effect: 'scale',
      beep: false,
      timeout: 5000
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.successAlert()
    this.props.handleActiveIndex()
    this.props.changeWidth()

    geocodeByAddress(this.state.address)
      .then(results => {
        this.setState({
          address: results[0].formatted_address
        })

        return getLatLng(results[0])})
      .then(latLng =>{ this.setState({
        lat: latLng.lat,
        lng: latLng.lng
      }, () => this.props.createDeal(this.state));})
      .catch(error => console.error('Error', error))
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleDate = (event) => {
    this.setState({
      date: event.target.value
    })
  }

  handleDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  handleImage = (link) => {
    this.setState({
      img_link: link
    })
  }

  selectText = (event) => {
    event.target.select()
  }

  isFilled = (state) => {
    return (state.address !== 'Deal Address...' && state.address !== '' && state.date !== '' && state.description !== 'Deal Description...' && state.description !== '' && state.img_link != '')
  }

handleFormClick = (event) => {
  event.stopPropagation()
}

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <form className="ui form" onSubmit={this.handleFormSubmit} onKeyDown={this.handleClick} onClick={this.handleFormClick}>
      <div className="field" onClick={this.selectText}>
        <label>Location</label>
        <PlacesAutocomplete inputProps={inputProps} />
      </div>
      <div className="field" onClick={this.selectText}>
      <label>Title</label>
        <input type="text" value={this.state.title} onChange={this.handleTitle}/>
      </div>
      <div className="field">
      <label>Date</label>
        <input type="date" value={this.state.date} onChange={this.handleDate}/>
      </div>
      <div className="field" onClick={this.selectText}>
      <label>Description</label>
        <textarea value={this.state.description} onChange={this.handleDescription}></textarea>
      </div>
      <div className="field">
      <label>Image</label>
        <ImageHandler setPicture={this.handleImage}/>
      </div>
        {this.isFilled(this.state) ? <button type="submit" className="ui teal button">Submit</button> : <button className="ui disabled button" disabled="" role="button" tabIndex="-1">Submit</button>}
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {deals: state.manageDeals.deals}
}

export default connect(mapStateToProps, {createDeal})(AddressForm)
