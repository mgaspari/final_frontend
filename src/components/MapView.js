import React from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { todays_deals } from "../services/DealDayManager";
import MapDealPopup from "./MapDealPopup"
import AccordianMenu from "./AccordianMenu"
import AccordianDeals from "./AccordianDeals"
// const AnyReactComponent = ({ text }) => (
//
//     <div className="ui teal pointing below basic label">
//       {text}
//
//     </div>
//
// );

class MapView extends React.Component {
  static defaultProps = {
    center: { lat: 40.78, lng: -73.97 },
    zoom: 13
  };

  state = {
    marks: []
  };

  deals = df => {
    return this.props.deals.map((deal, index) => {
      var dealDate = new Date(`${deal.deal_day} 00:00`);
      var todaysDate = new Date();
      if (dealDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
        return (
          <MapDealPopup
            key={index}
            lat={deal.lat}
            lng={deal.lng}
            deal={deal}
          />
        );
      } else {
        return null;
      }
    });
  };

  centerDate = deals => {
    if (deals.length > 0) {
      let lastDeal = todays_deals(deals)[todays_deals.length - 1];
      if (lastDeal) {
        return { lat: lastDeal.lat, lng: lastDeal.lng };
      } else {
        return { lat: 40.78, lng: -73.97 };
      }
    } else {
      return { lat: 40.78, lng: -73.97 };
    }
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBgNdEooybAcpl-4I0GcDcxgFJVJGgy6K0",
          language: "en"
        }}
        center={this.centerDate(this.props.deals)}
        defaultZoom={this.props.zoom}
      >
        <AccordianMenu />
        <AccordianDeals/>
        {this.deals(this.props.deals)}
      </GoogleMapReact>
    );
  }
}
function mapStateToProps(state) {
  return { deals: state.manageDeals.deals };
}
export default connect(mapStateToProps)(MapView);
// const height = document.getElementById('1234abc').clientWidth; console.log(height)
