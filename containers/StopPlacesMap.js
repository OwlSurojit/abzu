import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import LeafLetMap from '../components/LeafLetMap'
import AjaxCreator from '../actions/AjaxCreator'

class StopPlacesMap extends React.Component {

  handleClick() {
    console.log("map clicked")
  }

  handleDragEnd() {
    console.log("handleDragEnd fired!")
  }

  render() {

    const { position, markers, zoom } = this.props

    console.log("StopPlacesMap", markers)

    const lmapStyle = {
      height: "800px",
      width: "100%",
      border: "2px solid #eee"
    }

    return (
      <LeafLetMap
        position={position}
        markers={markers}
        zoom={zoom}
        lmapStyle={lmapStyle}
        onClick={this.handleClick}
        handleDragEnd={this.handleDragEnd}
        />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    position: state.stopPlacesReducer.centerPosition,
    markers: state.stopPlacesReducer.activeMarkers,
    zoom: state.stopPlacesReducer.zoom,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StopPlacesMap)
