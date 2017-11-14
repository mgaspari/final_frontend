import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ImageHandler from "./ImageHandler"
import {createDeal} from "../actions/deals"
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'San Francisco, CA',
      lat: 0,
      lng: 0,
      title: "",
      date: "",
      description: "",
      img_link: ""
   }
    this.onChange = (address) => this.setState({ address })
  }

  handleClick = (event) => {
    if (event.keyCode === 13){
      alert("Press submit!")
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => {console.log(results[0].formatted_address);
        this.setState({
          address: results[0].formatted_address
        })
          return getLatLng(results[0])})
      .then(latLng =>{ this.setState({
        lat: latLng.lat,
        lng: latLng.lng
      }, () => this.props.createDeal(this.state)); console.log('Success', latLng)})
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


  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <form className="ui form" onSubmit={this.handleFormSubmit} onKeyDown={this.handleClick}>
      <div className="field">
        <label>Location</label>
        <PlacesAutocomplete inputProps={inputProps} />
      </div>
      <div className="field">
      <label>Title</label>
        <input type="text" value={this.state.title} onChange={this.handleTitle}/>
      </div>
      <div className="field">
      <label>Date</label>
        <input type="date" value={this.state.date} onChange={this.handleDate}/>
      </div>
      <div className="field">
      <label>Description</label>
        <textarea value={this.state.description} onChange={this.handleDescription}></textarea>
      </div>
      <div className="field">
      <label>Image</label>
        <ImageHandler setPicture={this.handleImage}/>
      </div>
        <button type="submit" className="ui teal button">Submit</button>
      </form>
    )
  }
}

function mapStateToProps(state) {

  return {deals: state.manageDeals.deals}
}

export default connect(mapStateToProps, {createDeal})(AddressForm)
