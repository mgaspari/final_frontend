import React from "react"
import MapView from "./MapView"
import {loadDeals} from "../actions/deals"
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import AccordianMenu from "./AccordianMenu"
import AccordianDeals from "./AccordianDeals"

class Home extends React.Component{
  componentDidMount(){
    this.props.loadDeals()
  }
  render(){
    return(
      <div>
      <div style={{width: "1280px", height: "850px"}}>
        <MapView />
      </div>
  </div>
    )
  }
}
export default connect(null, { loadDeals })(Home)
