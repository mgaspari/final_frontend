import React from "react"
import MapView from "./MapView"
import AccordianMenu from "./AccordianMenu"
class Home extends React.Component{
  render(){
    return(
      <div>
      <div style={{width: "700px", height: "700px"}}>
        <MapView />
      </div>
      <AccordianMenu/>
      </div>
    )
  }
}
export default Home
