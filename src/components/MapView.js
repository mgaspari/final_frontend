import React from "react"
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux'
import {todays_deals} from "../services/DealDayManager"
const AnyReactComponent = ({ text }) => <div className="field" style={{position: 'absolute', width: "62px", height: "45px", left: "-31px", top: "-26px"}}><div className="ui teal pointing below basic label">{text}<button onClick={()=>{ console.log("hi")}}>Deal</button></div></div>;

class MapView extends React.Component{
  static defaultProps = {
    center: {lat: 40.78, lng: -73.97},
    zoom: 13
  };

  state = {
    marks: []
  }

  handleClick = (event) => {
    this.setState({
      marks: [...this.state.marks, {lat: event.lat, lng: event.lng} ]
    }, () => console.log(this.state.marks))

  }

  deals = (df) => {

    return this.props.deals.map((deal, index) => {

      var dealDate = new Date(`${deal.deal_day} 00:00`)
      var todaysDate = new Date()
      if (dealDate.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)){
        return <AnyReactComponent key={index} lat={deal.lat} lng={deal.lng} text={deal.title} />
      }
      else{
        return null
      }

    })
  }

  markers = (df) => {
    if(this.state.marks.length > 0){
      return this.state.marks.map((mark, index) => {
        return <AnyReactComponent key={index} lat={mark.lat}
        lng={mark.lng}
        text={'Here'} />
      })
    }
    else{
      return null
    }
  }

  centerDate = (deals) => {
    if(deals.length > 0){
    let firstDeal = todays_deals(deals)[0]
    if(firstDeal){
      return {lat: firstDeal.lat, lng: firstDeal.lng}
    } else{
      return {lat: 40.78, lng: -73.97}
    }

  }
    else{
      return {lat: 40.78, lng: -73.97}
    }
  }

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: "",
          language: 'en'}}
        onClick={this.handleClick.bind(this)}
        center={this.centerDate(this.props.deals)}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
        {this.markers(this.state.markers)}
        {this.deals(this.props.deals)}
      </GoogleMapReact>
    );
  }
}
function mapStateToProps(state) {
  return {deals: state.manageDeals.deals}
}
export default connect(mapStateToProps)(MapView)
// const height = document.getElementById('1234abc').clientWidth; console.log(height)
