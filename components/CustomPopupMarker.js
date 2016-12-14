import React, { Component, PropTypes } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L, { divIcon } from 'leaflet'
import stopIcon from "../static/icons/stop-icon-2x.svg"
import ReactDOM from 'react-dom/server'
import { connect } from 'react-redux'
import compassIcon from "../static/icons/compass.png"
import { MapActions } from '../actions/'

class CustomPopupMarker extends React.Component {

  /* avoid rerendering markers if significant information to
     the marker in question has been changed */
  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.active !== nextProps.active) {
      return true
    }

    if (JSON.stringify(this.props.position) !== JSON.stringify(nextProps.position)) {
      return true
    }

    if (!nextProps.isQuay && ((this.props.stopType !== nextProps.stopType) || (this.props.children !== nextProps.children) ||
        (this.props.formattedStopType !== nextProps.formattedStopType))) {
      return true
    }

    if (this.props.isCreatingPolylines !== nextProps.isCreatingPolylines && nextProps.isQuay) {
      return true
    }

    if (this.props.compassBearing !== nextProps.compassBearing) {
      return true
    }

    return false
  }

  handleSetCompassBearing() {
    let value = prompt('Compass bearing, 0-360', this.props.compassBearing)

    if (value == null) return

    if (value => 0 && value <= 360) {
      this.props.dispatch(MapActions.changeQuayCompassBearing(this.props.markerIndex, value))
    } else {
      this.handleSetCompassBearing()
    }
  }

  render() {

    let { children, position, handleOnClick,
          handleDragEnd, isQuay, markerIndex, draggable,
          changeCoordinates, text, active, stopType, formattedStopType, handleUpdatePathLink, isCreatingPolylines, polylineStartQuay, compassBearing  } = this.props

    if (!children && !children.length) {
      children = text.untitled
    }

    let divIconBody = (
      <SuperIcon
        markerIndex={markerIndex}
        isQuay={isQuay}
        stopType={stopType}
        active={active}
        compassBearing={compassBearing}
        />
    )

    let divIconBodyMarkup = ReactDOM.renderToStaticMarkup(divIconBody)
    let pathLinkText = isCreatingPolylines ? 'Avslutt ganglenke her' : 'Opprett ganglenke'

    if (isQuay && isCreatingPolylines && polylineStartQuay.quayIndex == markerIndex) {
      pathLinkText = 'Avbryt ganglenke'
    }

    let icon = divIcon({html: divIconBodyMarkup})

    return (

      <Marker
        key={"key" + markerIndex}
        icon={icon}
        position={position}
        onDragend={(event) => { handleDragEnd(isQuay, markerIndex, event) }}
        draggable={draggable && active}
        >
        <Popup>
          <div>
            <span style={{fontWeight: 600, color: '#00bcd4', fontSize: '1.2em', cursor: 'pointer',
              marginBottom: 10, display: 'inline-block', width: '100%', textAlign: 'center', marginBottom: 15
            }}
            onClick={handleOnClick}
            >
              {children}
            </span>
            { isQuay
            ? <span
                style={{fontWeight: 600, textAlign: 'center', width: '100%', fontSize: '1.2em', marginTop: -2, display: 'inline-block', marginBottom: 5}}
              >{formattedStopType + " " + (markerIndex+1)}</span>
            : null
            }
            { !isQuay
              ? null
              : <div
                  style={{fontWeight: 600, marginBottom: 10, cursor: 'pointer', color: 'blue', width: '100%', display: 'inline-block', textAlign: 'center'}}
                  onClick={() => { handleUpdatePathLink(position, markerIndex) }}
                >{ pathLinkText } </div>
            }
            <div
              id={"pmPosition" + markerIndex}
              style={{display: 'block', cursor: 'pointer', width: 'auto', textAlign: 'center'}}
              onClick={() => changeCoordinates && changeCoordinates(isQuay, markerIndex, position)}
              >
              <span style={{display: 'inline-block', textAlign: 'center', borderBottom: '1px dotted black', }}>
                {position[0]}
              </span>
              <span style={{display: 'inline-block', marginLeft: 3, borderBottom: '1px dotted black'}}>
                {position[1]}
              </span>
            </div>
              { isQuay
                  ? <div onClick={this.handleSetCompassBearing.bind(this)}><img style={{width: 20, height: 20}} src={compassIcon}/></div>
                  : null
              }
          </div>
        </Popup>
      </Marker>
    )
  }
}


const getIconIdByModality = (type) => {

  const modalityMap = {
    'onstreetBus': 'bus-withoutBox',
    'onstreetTram' : 'tram-withoutBox',
    'railStation' : 'rail-withoutBox',
    'metroStation' : 'subway-withoutBox',
    'busStation': 'bus-withoutBox',
    'ferryStop' : 'ferry-withoutBox',
    'airport' : 'airplane-withoutBox',
    'harbourPort' : 'ferry-withoutBox',
    'liftStation': 'lift'
  }
  var iconId = modalityMap[type]

  return iconId || 'no-information'
}

class SuperIcon extends React.Component {

  render() {

    const { markerIndex, isQuay, stopType, active, compassBearing } = this.props
    const iconId = getIconIdByModality(stopType)
    const fillClass = (active && isQuay) ? "quay" : active ? "" : "neighbour-stop"

    return (
      <div id={'stop-marker-' + markerIndex }>
        { isQuay && typeof compassBearing !== 'undefined' ?
          <svg style={{width: 20, height: 20, marginLeft: -4, marginTop: -55, transform: `rotate(${compassBearing}deg)`}}>
            <use xlinkHref={config.endpointBase + 'static/icons/svg-sprite.svg#icon-icon_arrow-forward'} />
          </svg> : null }
        <svg className={'stop-marker-parent ' + fillClass}>
          <use xlinkHref={stopIcon + '#marker'}/>
        </svg>
        {isQuay
          ? <div className="q-marker">
              <div
                  style={{color: '#fff', marginRight: 1, fontSize: String(markerIndex+1).length > 1 ? '1em' : '1.2em'}}
                >
                Q<sub style={{color: '#fff'}}>{markerIndex+1}</sub>
              </div>
        </div>
          : <svg className='stop-marker-svg'>
              <use xlinkHref={config.endpointBase + 'static/icons/svg-sprite.svg#icon-icon_' + iconId} />
            </svg>
         }
      </div>
    )
  }

}
const mapStateToProps = (state, ownProps) => {

  return {
    isCreatingPolylines: state.editStopReducer.isCreatingPolylines,
    polylineStartQuay: state.editStopReducer.polylineStartQuay
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPopupMarker)
