import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import { StopPlaceActions, AssessmentActions, EquipmentActions } from '../actions/'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location'
import TicketMachine from '../static/icons/facilities/TicketMachine'
import BusShelter from '../static/icons/facilities/BusShelter'
import { injectIntl } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import stopTypes from '../models/stopTypes'
import Divider from 'material-ui/Divider'
import MdError from 'material-ui/svg-icons/alert/error'
import ImportedId from './ImportedId'
import MdLess from 'material-ui/svg-icons/navigation/expand-less'
import EditQuayAdditional from '../containers/EditQuayAdditional'
import WheelChairPopover from './WheelChairPopover'
import StepFreePopover from './StepFreePopover'
import { getIn } from '../utils/'
import equipmentHelpers from '../modelUtils/equipmentHelpers'
import Sign512 from '../static/icons/512Sign'

class QuayItem extends React.Component {
  static PropTypes = {
    publicCode: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired,
    quay: PropTypes.object.isRequired,
    handleRemoveQuay: PropTypes.func.isRequired,
    handleLocateOnMap: PropTypes.func.isRequired,
    handleToggleCollapse: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      additionalExpanded: false
    }
  }

  handleDescriptionChange = (event) => {
    const { dispatch, index } = this.props
    dispatch(StopPlaceActions.changeElementDescription(index, event.target.value, 'quay'))
  }

  handlePublicCodeChange = (event) => {
    const { dispatch, index } = this.props
    dispatch(StopPlaceActions.changePublicCodeName(index, event.target.value, 'quay'))
  }

  handlePrivateCodeChange = (event) => {
    const { dispatch, index } = this.props
    dispatch(StopPlaceActions.changePrivateCodeName(index, event.target.value, 'quay'))
  }

  showMoreOptionsForQuay = expanded => {
    this.setState({additionalExpanded: expanded})
  }

  handleWheelChairChange(value) {
    const { index, dispatch } = this.props
    dispatch(AssessmentActions.setQuayWheelchairAccess(value, index))
  }

  handleStepFreeChange(value) {
    const { index, dispatch } = this.props
    dispatch(AssessmentActions.setQuayStepFreeAccess(value, index))
  }

  handleTicketMachineChange(value) {
    const { dispatch, disabled, index } = this.props
    if (!disabled) {
      dispatch(EquipmentActions.updateTicketMachineState(value, 'quay', index))
    }
  }

  handleBusShelterChange(value) {
    const { dispatch, disabled, index } = this.props
    if (!disabled) {
      dispatch(EquipmentActions.updateShelterEquipmentState(value, 'quay', index))
    }
  }

  handleChange512Sign(value) {
    const { dispatch, disabled, index } = this.props
    if (!disabled) {
      dispatch(EquipmentActions.update512SignState(value, 'quay', index))
    }
  }

  render() {

    const { quay, publicCode, expanded, index, handleToggleCollapse, intl, stopPlaceType, disabled } = this.props
    const { formatMessage, locale } = intl
    const { additionalExpanded } = this.state

    const wheelchairAccess = getIn(quay, ['accessibilityAssessment', 'limitations', 'wheelchairAccess'], 'UNKNOWN')
    const stepFreeAccess = getIn(quay, ['accessibilityAssessment', 'limitations', 'stepFreeAccess'], 'UNKNOWN')
    const ticketMachine = equipmentHelpers.getTicketMachineState(quay)
    const busShelter = equipmentHelpers.getShelterEquipmentState(quay)
    const sign512 = equipmentHelpers.get512SignEquipment(quay)

    let quayItemName = null

    stopTypes[locale].forEach(  stopType => {
      if (stopType.value === stopPlaceType) {
        quayItemName = stopType.quayItemName
      }
    })

    const translations = {
      name: formatMessage({id: 'name'}),
      publicCode: formatMessage({id: 'publicCode'}),
      description: formatMessage({id: 'description'}),
      unsaved: formatMessage({id: 'unsaved'}),
      undefined: formatMessage({id: 'undefined'}),
      none: formatMessage({id: 'none_no'}),
      quays: formatMessage({id: 'quays'}),
      pathJunctions: formatMessage({id: 'pathJunctions'}),
      entrances: formatMessage({id: 'entrances'}),
      stepFreeAccess: formatMessage({id: 'step_free_access'}),
      noStepFreeAccess: formatMessage({id: 'step_free_access_no'}),
      wheelchairAccess: formatMessage({id: 'wheelchairAccess'}),
      noWheelchairAccess: formatMessage({id: 'wheelchairAccess_no'}),
      ticketMachine: formatMessage({id: 'ticketMachine'}),
      noTicketMachine: formatMessage({id: 'ticketMachine_no'}),
      busShelter: formatMessage({id: 'busShelter'}),
      noBusShelter: formatMessage({id: 'busShelter_no'}),
      quayItemName: formatMessage({id: quayItemName || 'name'}),
      quayMissingLocation: formatMessage({id: 'quay_is_missing_location'}),
      localReference: formatMessage({id: 'local_reference'}),
      privateCode: formatMessage({id: 'privateCode'})
    }


    const removeStyle = {
      textAlign: 'right',
      width: '100%',
      paddingBottom: 0,
    }

    const locationStyle = {
      marginRight: 5,
      height: 16,
      width: 16,
    }

    const quayTitlePrefix = `${translations.quayItemName ? translations.quayItemName : ''} `
    const quayTitleSuffix = `${publicCode || ''}`
    const idTitle = `${quay.id||'?'}`

    return (

      <div>
        <div className="tabItem">
          <div style={{float: "flex", alignItems: 'center', width: "95%", marginTop: 10, padding: 5}}>
            {  quay.location
               ? <MapsMyLocation style={locationStyle} onClick={() => this.props.handleLocateOnMap(quay.location)}/>
              :  <div className="tooltip" style={{display: 'inline-block'}}>
                   <span className="tooltipText"> { translations.quayMissingLocation }</span>
                   <MdError style={{ ...locationStyle, color: '#bb271c'}}/>
                 </div>
            }
            <div style={{display: 'inline-block', verticalAlign: 'middle'}} onClick={() => handleToggleCollapse(index, 'quay')}>
              <span style={{color: '#2196F3', textTransform: 'capitalize'}}>
                { quayTitlePrefix + quayTitleSuffix }
              </span>
              <span style={{fontSize: '0.8em', marginLeft: 5, fontWeight: 600, color: '#464545'}}> { idTitle } </span>
            </div>
            { !expanded
              ? <NavigationExpandMore
                  onClick={() => handleToggleCollapse(index, 'quay')}
                  style={{float: "right"}}
                />
              : <NavigationExpandLess
                  onClick={() => handleToggleCollapse(index, 'quay')}
                  style={{float: "right"}}
                />
             }
          </div>
        </div>
       { !expanded ? null
       : <div>
           <ImportedId text={translations.localReference} id={quay.importedId} />
           <TextField
             hintText={translations.publicCode}
             floatingLabelText={translations.publicCode}
             disabled={disabled}
             defaultValue={quay.publicCode}
             style={{width: "95%", marginTop: -10}}
             onChange={e => typeof e.target.value === 'string' && this.handlePublicCodeChange(e)}
           />
           <TextField
             hintText={translations.privateCode}
             floatingLabelText={translations.privateCode}
             disabled={disabled}
             defaultValue={quay.privateCode}
             style={{width: "95%", marginTop: -10}}
             onChange={e => typeof e.target.value === 'string' && this.handlePrivateCodeChange(e)}
           />
          <TextField
            hintText={translations.description}
            disabled={disabled}
            floatingLabelText={translations.description}
            defaultValue={quay.description}
            style={{width: "95%", marginTop: -10}}
            onChange={e => typeof e.target.value === 'string' && this.handleDescriptionChange(e)}
          />
           { !additionalExpanded ?
             <div style={{marginTop: 10, marginBottom: 5, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
               <WheelChairPopover
                 disabled={disabled}
                 intl={intl} wheelchairAccess={wheelchairAccess} handleChange={this.handleWheelChairChange.bind(this)}/>
               <StepFreePopover intl={intl} disabled={disabled} stepFreeAccess={stepFreeAccess} handleChange={this.handleStepFreeChange.bind(this)}/>
               <Checkbox
                 checkedIcon={<TicketMachine />}
                 disabled={disabled}
                 uncheckedIcon={<TicketMachine style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
                 style={{width: 'auto'}}
                 checked={ticketMachine}
                 onCheck={(e,v) => { this.handleTicketMachineChange(v) } }
               />
               <Checkbox
                 checkedIcon={<BusShelter />}
                 disabled={disabled}
                 uncheckedIcon={<BusShelter style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
                 style={{width: 'auto'}}
                 checked={busShelter}
                 onCheck={(e,v) => { this.handleBusShelterChange(v) } }
               />
               <Checkbox
                 checkedIcon={<Sign512 style={{transform: 'scale(1) translateY(-12px) translateX(-12px)'}}/>}
                 disabled={disabled}
                 uncheckedIcon={<Sign512 style={{transform: 'scale(1) translateY(-12px) translateX(-12px)', fill: '#8c8c8c', opacity: '0.8'}}  />}
                 style={{width: 'auto'}}
                 checked={sign512}
                 onCheck={(e,v) => { this.handleChange512Sign(v) } }
               />
           </div>
             : null
           }
           <div style={{textAlign: 'center', width: '100%'}}>
             { additionalExpanded
               ? <FlatButton icon={<MdLess/>} onClick={() => this.showMoreOptionsForQuay(false)} />
               : <FlatButton label={formatMessage({id: 'more'})} onClick={() => this.showMoreOptionsForQuay(true)} />
             }
             { additionalExpanded
               ? <EditQuayAdditional quay={quay} index={index} disabled={disabled}/>
               : null
             }
           </div>
           <div style={removeStyle}>
             <IconButton
               disabled={disabled}
               iconClassName="material-icons"
               onClick={this.props.handleRemoveQuay}
             >
               delete
             </IconButton>
           </div>
        </div>
        }
        <Divider inset={true} style={{marginTop: 2}}/>
      </div>
    )
  }
}

export default injectIntl(connect(null)(QuayItem))
