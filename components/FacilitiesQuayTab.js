import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import TicketMachine from '../static/icons/facilities/TicketMachine'
import BusShelter from '../static/icons/facilities/BusShelter'
import Divider from 'material-ui/Divider'
import ToolTipIcon from './ToolTipIcon'
import MdWc from 'material-ui/svg-icons/notification/wc'
import WaitingRoom from '../static/icons/facilities/WaitingRoom'
import BikeParking from '../static/icons/facilities/BikeParking'
import TextField from 'material-ui/TextField'
import MdMore from 'material-ui/svg-icons/navigation/more-vert'
import MdLess from 'material-ui/svg-icons/navigation/expand-less'
import FlatButton from 'material-ui/FlatButton'
import StairsIcon from '../static/icons/accessibility/Stairs'
import EnclosedIcon from '../static/icons/facilities/Enclosed'
import Heated from '../static/icons/facilities/Heated'
import equipmentHelpers from '../modelUtils/equipmentHelpers'

class FacilitiesQuayTab extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ticketMachine: equipmentHelpers.getTicketMachineState(props.quay),
      busShelter: equipmentHelpers.getShelterEquipmentState(props.quay),
      bikeParking: equipmentHelpers.getCycleStorageEquipment(props.quay),
      waitingRoom: equipmentHelpers.getWaitingRoomState(props.quay),
      WC: equipmentHelpers.getSanitaryEquiptmentState(props.quay),
      expandedIndex: -1
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      ticketMachine: equipmentHelpers.getTicketMachineState(props.quay),
      busShelter: equipmentHelpers.getShelterEquipmentState(props.quay),
      bikeParking: equipmentHelpers.getCycleStorageEquipment(props.quay),
      waitingRoom: equipmentHelpers.getWaitingRoomState(props.quay),
      WC: equipmentHelpers.getSanitaryEquiptmentState(props.quay),
    })
  }


  handleExpandIndex(value) {
    this.setState({
      expandedIndex: value
    })
  }

  handleCollapseIndex(value) {
    this.setState({
      expandedIndex: -1
    })
  }

  render() {

    const { intl, disabled } = this.props
    const { formatMessage } = intl
    const { ticketMachine, busShelter, WC, waitingRoom, bikeParking, expandedIndex } = this.state

    return (
      <div style={{padding: 10}}>
        <div style={{marginTop: 10}}>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <Checkbox
              checked={ticketMachine}
              checkedIcon={<TicketMachine />}
              uncheckedIcon={<TicketMachine style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
              label={ ticketMachine ? formatMessage({id: 'ticketMachine'}) : formatMessage({id: 'ticketMachine_no'}) }
              labelStyle={{fontSize: '0.8em'}}
              style={{width: '80%'}}
              onCheck={(e,v) => { if (!disabled) this.setState({ticketMachine: v})}}
            />
            <ToolTipIcon title={formatMessage({id: 'ticketMachine_stop_hint'})}/>
          </div>
          { expandedIndex === 0
            ?
            <div>
              <TextField
                hintText={formatMessage({id: 'number_of_ticket_machines'})}
                type="number"
                disabled={disabled}
                onChange={(event, value) => { console.log(value)}}
                min="0"
                fullWidth={true}
                floatingLabelText={formatMessage({id: 'number_of_ticket_machines'})}
              />
            </div>
            : null
          }
          <div style={{textAlign: 'center', marginBottom: 5}}>
            { expandedIndex === 0
              ? <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdLess style={{height: 16, width: 16}}/>}
                onClick={() => this.handleCollapseIndex(0)}
              />
              :
              <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdMore style={{height: 16, width: 16}}/>}
                onClick={() => this.handleExpandIndex(0)}
              />
            }
          </div>
          <Divider style={{marginTop: 10, marginBottom: 10}}/>
        </div>
        <div style={{marginTop: 10}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Checkbox
              checked={busShelter}
              checkedIcon={<BusShelter />}
              uncheckedIcon={<BusShelter style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
              label={ busShelter ? formatMessage({id: 'busShelter'}) : formatMessage({id: 'busShelter_no'}) }
              labelStyle={{fontSize: '0.8em'}}
              style={{width: '80%'}}
              onCheck={(e,v) => { if (!disabled) this.setState({busShelter: v})} }
            />
            <ToolTipIcon title={formatMessage({id: 'busShelter_stop_hint'})}/>
          </div>
          { expandedIndex === 1
            ?
            <div>
              <TextField
                hintText={formatMessage({id: 'number_of_seats'})}
                type="number"
                onChange={(event, value) => { console.log(value)}}
                min="0"
                fullWidth={true}
                floatingLabelText={formatMessage({id: 'number_of_seats'})}
              />
              <div style={{display: 'block'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                  <Checkbox
                    defaultChecked={false}
                    checkedIcon={<StairsIcon />}
                    style={{width: 'auto'}}
                    label={ busShelter ? formatMessage({id: 'step_free_access'}) : formatMessage({id: 'step_free_access_no'}) }
                    uncheckedIcon={<StairsIcon style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
                    labelStyle={{fontSize: '0.8em'}}
                  />
                  <Checkbox
                    defaultChecked={false}
                    checkedIcon={<EnclosedIcon />}
                    uncheckedIcon={<EnclosedIcon style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
                    label={ busShelter ? formatMessage({id: 'enclosed'}) : formatMessage({id: 'enclosed_no'}) }
                    labelStyle={{fontSize: '0.8em'}}
                    style={{width: 'auto'}}
                  />
                </div>
              </div>
            </div>
            : null
          }
          <div style={{textAlign: 'center', marginBottom: 5}}>
            { expandedIndex === 1
              ? <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdLess style={{height: 16, width: 16}}/>}
                onClick={() => this.handleCollapseIndex(1)}
              />
              :
              <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdMore style={{height: 16, width: 16}}/>}
                onClick={() => this.handleExpandIndex(1)}
              />
            }
          </div>
          <Divider style={{marginTop: 10, marginBottom: 10}}/>
        </div>
        <div style={{marginTop: 10}}>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <Checkbox
              checked={WC}
              checkedIcon={<MdWc />}
              uncheckedIcon={<MdWc style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
              label={ WC ? formatMessage({id: 'wc'}) : formatMessage({id: 'wc_no'}) }
              labelStyle={{fontSize: '0.8em'}}
              style={{width: '80%'}}
              onCheck={(e,v) => { if (!disabled) this.setState({WC: v})} }
            />
            <ToolTipIcon title={formatMessage({id: 'wc_stop_hint'})}/>
          </div>
          <div style={{textAlign: 'center', marginBottom: 5}}>
            { expandedIndex === 2
              ? <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdLess style={{height: 16, width: 16}}/>}
                onClick={() => this.handleCollapseIndex(2)}
              />
              :
              <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdMore style={{height: 16, width: 16}}/>}
                onClick={() => this.handleExpandIndex(2)}
              />
            }
          </div>
          <Divider style={{marginTop: 10, marginBottom: 10}}/>
        </div>
        <div style={{marginTop: 10}}>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <Checkbox
              checked={waitingRoom}
              checkedIcon={<WaitingRoom />}
              uncheckedIcon={<WaitingRoom style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
              label={ waitingRoom ? formatMessage({id: 'waiting_room'}) : formatMessage({id: 'waiting_room_no'}) }
              labelStyle={{fontSize: '0.8em'}}
              style={{width: '80%'}}
              onCheck={(e,v) => { if (!disabled) this.setState({waitingRoom: v})} }
            />
            <ToolTipIcon title={formatMessage({id: 'waitingroom_stop_hint'})}/>
          </div>
          { expandedIndex === 3
            ?
            <div>
              <TextField
                hintText={formatMessage({id: 'number_of_seats'})}
                type="number"
                disabled={disabled}
                onChange={(event, value) => { console.log(value)}}
                min="0"
                fullWidth={true}
                floatingLabelText={formatMessage({id: 'number_of_seats'})}
              />
              <div style={{display: 'block'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                  <Checkbox
                    defaultChecked={false}
                    checkedIcon={<StairsIcon />}
                    style={{width: 'auto'}}
                    label={ busShelter ? formatMessage({id: 'step_free_access'}) : formatMessage({id: 'step_free_access_no'}) }
                    uncheckedIcon={<StairsIcon style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
                    labelStyle={{fontSize: '0.8em'}}
                  />
                  <Checkbox
                    defaultChecked={false}
                    checkedIcon={<Heated/>}
                    uncheckedIcon={<Heated style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
                    label={ busShelter ? formatMessage({id: 'heating'}) : formatMessage({id: 'heating_no'}) }
                    labelStyle={{fontSize: '0.8em'}}
                    style={{width: 'auto'}}
                  />
                </div>
              </div>
            </div>
            : null
          }
          <div style={{textAlign: 'center', marginBottom: 5}}>
            { expandedIndex === 3
              ? <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdLess style={{height: 16, width: 16}}/>}
                onClick={() => this.handleCollapseIndex(3)}
              />
              :
              <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdMore style={{height: 16, width: 16}}/>}
                onClick={() => this.handleExpandIndex(3)}
              />
            }
          </div>
          <Divider style={{marginTop: 10, marginBottom: 10}}/>
        </div>
        <div style={{marginTop: 10}}>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <Checkbox
              checked={bikeParking}
              checkedIcon={<BikeParking />}
              uncheckedIcon={<BikeParking style={{fill: '#8c8c8c', opacity: '0.8'}}  />}
              label={ bikeParking ? formatMessage({id: 'bike_parking'}) : formatMessage({id: 'bike_parking_no'}) }
              labelStyle={{fontSize: '0.8em'}}
              style={{width: '80%'}}
              onCheck={(e,v) => { if (!disabled) this.setState({bikeParking: v})} }
            />
            <ToolTipIcon title={formatMessage({id: 'bike_parking_hint'})}/>
          </div>
          { expandedIndex === 4
            ?
            <div>
              <TextField
                hintText={formatMessage({id: 'number_of_seats'})}
                type="number"
                disabled={disabled}
                onChange={(event, value) => { console.log(value)}}
                min="0"
                fullWidth={true}
                floatingLabelText={formatMessage({id: 'number_of_seats'})}
              />
            </div>
            : null
          }
          <div style={{textAlign: 'center', marginBottom: 5}}>
            { expandedIndex === 4
              ? <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdLess style={{height: 16, width: 16}}/>}
                onClick={() => this.handleCollapseIndex(4)}
              />
              :
              <FlatButton
                style={{height: 20, minWidth: 20, width: 20}}
                icon={<MdMore style={{height: 16, width: 16}}/>}
                onClick={() => this.handleExpandIndex(4)}
              />
            }
          </div>
          <Divider style={{marginTop: 10, marginBottom: 0}}/>
        </div>
      </div>
    )
  }
}

export default FacilitiesQuayTab