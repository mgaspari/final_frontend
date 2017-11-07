import React from "react"
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux'

const AnyReactComponent = ({ text }) => <div className="field"><div className="ui teal pointing below basic label">{text}<button onClick={()=>{ console.log("hi")}}>Deal</button></div></div>;

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
      return <AnyReactComponent key={index} lat={deal.lat} lng={deal.lng} text={deal.title} />
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
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: "",
          language: 'en'}}
        onClick={this.handleClick.bind(this)}
        defaultCenter={this.props.center}
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
