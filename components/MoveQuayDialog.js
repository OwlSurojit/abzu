import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MdCancel from 'material-ui/svg-icons/navigation/cancel';
import MdMerge from 'material-ui/svg-icons/editor/merge-type';
import MdWarning from 'material-ui/svg-icons/alert/warning';

class MoveQuayDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      changesUnderstood: false
    };
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  render() {
    const { open, intl, handleClose, handleConfirm, stopPlaceId, quayId, hasStopBeenModified } = this.props;
    const { formatMessage } = intl;
    const { changesUnderstood } = this.state;

    console.log(hasStopBeenModified)

    const translations = {
      confirm: formatMessage({ id: 'confirm' }),
      cancel: formatMessage({ id: 'cancel' }),
      title: formatMessage({ id: 'move_quay_title' }),
      info: formatMessage({ id: 'move_quay_info' }),
    };

    const fromVersionComment = `Flyttet ${quayId} til ${stopPlaceId}`;
    const toVersionComment = `Flyttet ${quayId} til ${stopPlaceId}`;

    const actions = [
      <FlatButton
        label={translations.cancel}
        onTouchTap={handleClose}
        icon={<MdCancel />}
      />,
      <FlatButton
        label={translations.confirm}
        disabled={false}
        onTouchTap={() => { handleConfirm(fromVersionComment,toVersionComment) }}
        primary={true}
        keyboardFocused={true}
        icon={<MdMerge />}
      />,
    ];

    return (
      <Dialog
        title={translations.title}
        actions={actions}
        modal={true}
        open={open}
        onRequestClose={() => {
          handleClose();
        }}
        contentStyle={{ width: '40%', minWidth: '40%', margin: 'auto' }}
      >
        <div>
          <div style={{ marginBottom: 10, color: '#000' }}>
            <span style={{fontWeight: 600}}>{ `${quayId} => ${stopPlaceId}` }</span>
          </div>
          <div style={{ marginLeft: 0, display: 'flex'}} >
            <div style={{marginTop: 0, marginRight: 5}}>
              <MdWarning color="orange"/>
            </div>
            <span>{translations.info}</span>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default MoveQuayDialog;
