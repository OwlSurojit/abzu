import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import Checkbox from 'material-ui/Checkbox'


class SaveDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  componentWillUnmount() {
    this.setState(this.getInitialState)
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }

  getInitialState() {
    const now = new Date()
    return {
      timeFrom: now,
      timeTo: null,
      dateFrom: now,
      dateTo: null,
      expiraryExpanded: false
    }
  }

  handleSave() {
    const { handleConfirm } = this.props
    const { expiraryExpanded, timeFrom, timeTo, dateFrom, dateTo } = this.state
    let validBetween = {
      dateFrom: dateFrom,
      timeFrom: timeFrom
    }
    if (expiraryExpanded) {
      validBetween.dateTo = dateTo
      validBetween.timeTo = timeTo
    }
    handleConfirm(JSON.parse(JSON.stringify(validBetween)))
  }

  render() {

    const { open, intl, handleClose } = this.props
    const { formatMessage } = intl
    const { timeFrom, timeTo, dateFrom, dateTo, expiraryExpanded } = this.state

    const now = new Date()

    const translations = {
      use: formatMessage({id: 'use'}),
      confirm: formatMessage({id: 'confirm'}),
      cancel: formatMessage({id: 'cancel'}),
      date: formatMessage({id: 'date'}),
      time: formatMessage({id: 'time'}),
      title: formatMessage({id: 'save_dialog_title'}),
      message_from: formatMessage({id: 'save_dialog_message_from'}),
      message_to: formatMessage({id: 'save_dialog_message_to'}),
      note: formatMessage({id: 'save_dialog_note'}),
      error: formatMessage({id: 'save_dialog_to_is_before_from'}),
      do_you_want_to_specify_expirary: formatMessage({id: 'do_you_want_to_specify_expirary'})
    }

    const toDateIsBeforeFromDate = (dateTo != null && dateFrom != null && expiraryExpanded)
      ? new Date(dateTo) < new Date(dateFrom) : false

    const actions = [
      <FlatButton
        label={translations.cancel}
        primary={true}
        onTouchTap={handleClose}
      />,
      <FlatButton
        label={translations.confirm}
        primary={true}
        keyboardFocused={true}
        disabled={toDateIsBeforeFromDate}
        onTouchTap={() => this.handleSave()}
      />,
    ]

    return (
      <Dialog
        title={translations.title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={() => { handleClose() }}
        contentStyle={{width: '40%', minWidth: '40%', margin: 'auto'}}
      >
        <div>{ translations.message_from }</div>
        <div style={{marginTop: 15, textAlign: 'center'}}>
          <DatePicker
            hintText={translations.date}
            cancelLabel={translations.cancel}
            okLabel={translations.use}
            autoOk
            mode="landscape"
            minDate={now}
            value={dateFrom}
            textFieldStyle={{width: '80%'}}
            onChange={(event, value) => { this.setState({dateFrom: value})}}
          />
          <TimePicker
            format="24hr"
            cancelLabel={translations.cancel}
            hintText={translations.time}
            value={timeFrom}
            okLabel={translations.use}
            autoOk
            textFieldStyle={{width: '80%'}}
            onChange={(event, value) => { this.setState({timeFrom: new Date(new Date(value).setSeconds(0))}) }}
          />
        </div>
        <div style={{fontSize: 12, textAlign: 'center', marginTop: 10}}>{ translations.note }</div>
        <Checkbox
          checked={expiraryExpanded}
          label={translations.do_you_want_to_specify_expirary}
          onCheck={(event, checked) => { this.setState({expiraryExpanded: checked})}}
          style={{marginTop: 10}}
        />
        { expiraryExpanded ?
          <div>
            <div style={{marginTop: 20}}>{ translations.message_to }</div>
            <div style={{marginTop: 15, textAlign: 'center'}}>
              <DatePicker
                hintText={translations.date}
                cancelLabel={translations.cancel}
                okLabel={translations.use}
                autoOk
                mode="landscape"
                minDate={dateFrom ? new Date(dateFrom) : now}
                value={dateTo}
                textFieldStyle={{width: '80%', border: toDateIsBeforeFromDate ? '1px solid #ff0d0d' : 'none'}}
                onChange={(event, value) => { this.setState({dateTo: value})}}
              />
              <div style={{fontSize: 10, color: 'rgb(244, 67, 54)'}}>{ toDateIsBeforeFromDate ? translations.error : '' }</div>
              <TimePicker
                format="24hr"
                cancelLabel={translations.cancel}
                hintText={translations.time}
                value={timeTo}
                okLabel={translations.use}
                textFieldStyle={{width: '80%'}}
                onChange={(event, value) => { this.setState({timeTo: new Date(new Date(value).setSeconds(0))}) }}
              />
            </div>
          </div>
          : null
        }
      </Dialog>
    )
  }
}

export default SaveDialog