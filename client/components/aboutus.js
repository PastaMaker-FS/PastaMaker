import React from 'react'
import {connect} from 'react-redux'

export const AboutUs = (props) => {

  console.log("This is Prop", props)
  return (
    <div>
      <h1>WELCOME!!!!</h1>
    </div>
  )
}


const mapStoreToProps = state => {
  return {
    abouts: state.abouts
  }
}



export default connect(mapStoreToProps)(AboutUs)
