import { connect } from 'react-redux';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { StopPlaceActions, UserActions } from '../actions/';
import stopTypes from '../models/stopTypes';
import { injectIntl } from 'react-intl';
import ConfirmDialog from '../components/ConfirmDialog';
import EditStopBoxTabs from './EditStopBoxTabs';
import { Tabs, Tab } from 'material-ui/Tabs';
import StopPlaceDetails from '../components/StopPlaceDetails';
import { withApollo } from 'react-apollo';
import mapToMutationVariables from '../modelUtils/mapToQueryVariables';
import {
  mutateStopPlace,
  mutatePathLink,
  mutateParking
} from '../graphql/Mutations';
import { stopPlaceAndPathLinkByVersion } from '../graphql/Queries';
import * as types from '../actions/Types';
import EditStopAdditional from './EditStopAdditional';
import MdUndo from 'material-ui/svg-icons/content/undo';
import MdSave from 'material-ui/svg-icons/content/save';
import MdBack from 'material-ui/svg-icons/navigation/arrow-back';
import MdLess from 'material-ui/svg-icons/navigation/expand-less';
import Divider from 'material-ui/Divider';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SaveDialog from '../components/SaveDialog';
import MergeStopDialog from '../components/MergeStopDialog';
import MergeQuaysDialog from '../components/MergeQuaysDialog';
import { MutationErrorCodes } from '../models/ErrorCodes';
import DeleteQuayDialog from '../components/DeleteQuayDialog';
import {
  deleteQuay,
  getStopPlaceVersions,
  deleteStopPlace,
  mergeQuays,
  getStopPlaceWithAll,
  mergeQuaysFromStop,
  moveQuaysToStop,
  getNeighbourStops,
} from '../graphql/Actions';
import IconButton from 'material-ui/IconButton';
import MdDelete from 'material-ui/svg-icons/action/delete-forever';
import DeleteStopPlaceDialog from '../components/DeleteStopPlaceDialog';
import MoveQuayDialog from '../components/MoveQuayDialog';

class EditStopGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogOpen: false,
      saveDialogOpen: false,
      errorMessage: '',
      versionsOpen: false
    };
  }

  handleSave() {
    this.setState({
      saveDialogOpen: true,
      errorMessage: ''
    });
  }

  handleCloseMergeStopDialog() {
    this.props.dispatch(UserActions.hideMergeStopDialog());
  }

  handleCloseMergeQuaysDialog() {
    this.props.dispatch(UserActions.hideMergeQuaysDialog());
  }

  handleCloseDeleteQuay() {
    this.props.dispatch(UserActions.hideDeleteQuayDialog());
  }

  handleCloseDeleteStop() {
    this.props.dispatch(UserActions.hideDeleteStopDialog());
  }

  handleCloseMoveQuay() {
    this.props.dispatch(UserActions.cancelMoveQuay());
  }

  handleSaveSuccess(stopPlaceId) {
    const { client, dispatch } = this.props;

    this.setState({
      saveDialogOpen: false
    });

    getStopPlaceVersions(client, stopPlaceId).then(() => {
      dispatch(UserActions.navigateTo('/edit/', stopPlaceId));
      dispatch(
        UserActions.openSnackbar(types.SNACKBAR_MESSAGE_SAVED, types.SUCCESS)
      );
    });
  }

  handleSaveError(errorCode) {
    this.props.dispatch(
      UserActions.openSnackbar(types.SNACKBAR_MESSAGE_FAILED, types.ERROR)
    );
    this.setState({
      errorMessage: errorCode
    });
  }

  handleMergeQuaysFromStop() {
    const { stopPlace, mergeSource, client, dispatch, activeMap } = this.props;

    mergeQuaysFromStop(client, mergeSource.id, stopPlace.id).then(result => {
      dispatch(
        UserActions.openSnackbar(types.SNACKBAR_MESSAGE_SAVED, types.SUCCESS)
      );
      getStopPlaceWithAll(client, stopPlace.id).then( () => {
        if (activeMap) {
          getNeighbourStops(client, stopPlace.id, activeMap.getBounds());
        }
      });
    });
    this.handleCloseMergeStopDialog();
  }

  handleMergeQuays() {
    const { mergingQuay, client, stopPlace, dispatch } = this.props;

    mergeQuays(
      client,
      stopPlace.id,
      mergingQuay.fromQuayId,
      mergingQuay.toQuayId
    ).then(result => {
      dispatch(
        UserActions.openSnackbar(types.SNACKBAR_MESSAGE_SAVED, types.SUCCESS)
      );
      this.handleCloseMergeQuaysDialog();
      getStopPlaceWithAll(client, stopPlace.id);
    });
  }

  handleDeleteQuay() {
    const { client, deletingQuay, dispatch, stopPlace } = this.props;
    deleteQuay(client, deletingQuay).then(response => {
      dispatch(UserActions.hideDeleteQuayDialog());
      getStopPlaceWithAll(client, stopPlace.id).then(response => {
        dispatch(
          UserActions.openSnackbar(types.SNACKBAR_MESSAGE_SAVED, types.SUCCESS)
        );
      });
    });
  }

  handleMoveQuay() {
    const { client, movingQuay, dispatch, stopPlace } = this.props;
    moveQuaysToStop(client, stopPlace.id, movingQuay).then(response => {
      dispatch(UserActions.cancelMoveQuay());
      getStopPlaceWithAll(client, stopPlace.id);
    });
  };

  handleDeleteStop() {
    const { client, stopPlace, dispatch } = this.props;
    deleteStopPlace(client, stopPlace.id)
      .then(response => {
        dispatch(UserActions.hideDeleteStopDialog());
        if (response.data.deleteStopPlace) {
          dispatch(UserActions.navigateToMainAfterDelete());
        } else {
          UserActions.openSnackbar(types.SNACKBAR_MESSAGE_SAVED, types.ERROR);
        }
      })
      .catch(err => {
        dispatch(UserActions.hideDeleteStopDialog());
        UserActions.openSnackbar(types.SNACKBAR_MESSAGE_SAVED, types.ERROR);
      });
  }

  handleSaveAllEntities(userInput) {
    const { stopPlace, pathLink, originalPathLink } = this.props;
    const stopPlaceVariables = mapToMutationVariables.mapStopToVariables(
      stopPlace,
      userInput
    );
    const shouldMutateParking = !!(
      stopPlace.parking && stopPlace.parking.length
    );
    const pathLinkVariables = mapToMutationVariables.mapPathLinkToVariables(
      pathLink
    );

    const shouldMutatePathLinks = !!(
      pathLinkVariables.length &&
      JSON.stringify(pathLink) !== JSON.stringify(originalPathLink)
    );

    let id = null;

    const { client } = this.props;

    client
      .mutate({ variables: stopPlaceVariables, mutation: mutateStopPlace })
      .then(result => {
        if (result.data.mutateStopPlace[0].id) {
          id = result.data.mutateStopPlace[0].id;
        }
      })
      .then(() => {
        if (!shouldMutateParking && !shouldMutatePathLinks) {
          this.handleSaveSuccess(id);
        } else {
          const parkingVariables = mapToMutationVariables.mapParkingToVariables(
            stopPlace.parking,
            stopPlace.id || id
          );

          if (shouldMutatePathLinks) {
            client
              .mutate({
                variables: { PathLink: pathLinkVariables },
                mutation: mutatePathLink
              })
              .then(() => {
                if (shouldMutateParking) {
                  client
                    .mutate({
                      variables: { Parking: parkingVariables },
                      mutation: mutateParking
                    })
                    .then(result => {
                      this.handleSaveSuccess(id);
                    })
                    .catch(err => {
                      this.handleSaveError(MutationErrorCodes.ERROR_PARKING);
                    });
                } else {
                  this.handleSaveSuccess(id);
                }
              })
              .catch(err => {
                this.handleSaveError(MutationErrorCodes.ERROR_PATH_LINKS);
              });
          } else if (shouldMutateParking) {
            client
              .mutate({
                variables: { Parking: parkingVariables },
                mutation: mutateParking
              })
              .then(result => {
                this.handleSaveSuccess(id);
              })
              .catch(err => {
                this.handleSaveError(MutationErrorCodes.ERROR_PARKING);
              });
          }
        }
      })
      .catch(err => {
        this.handleSaveError(MutationErrorCodes.ERROR_STOP_PLACE);
      });
  }

  handleGoBack() {
    this.props.dispatch(UserActions.navigateTo('/', ''));
  }

  handleDiscardChanges() {
    this.setState({
      confirmDialogOpen: false
    });
    this.props.dispatch(StopPlaceActions.discardChangesForEditingStop());
  }

  handleSlideChange(value) {
    this.props.dispatch(UserActions.changeElementTypeTab(value));
  }

  showMoreStopPlace() {
    this.props.dispatch(UserActions.showEditStopAdditional());
  }

  showLessStopPlace = () => {
    this.props.dispatch(UserActions.hideEditStopAdditional());
  };

  handleDialogClose() {
    this.setState({
      confirmDialogOpen: false,
      allowPathLinkAdjustmentsDialog: false,
      saveDialogOpen: false
    });
  }

  handleTouchTapVersions = event => {
    event.preventDefault();
    this.setState({
      versionsOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleLoadVersion = ({ id, version }) => {
    this.setState({
      versionsOpen: false
    });

    const { client } = this.props;

    client.query({
      fetchPolicy: 'network-only',
      query: stopPlaceAndPathLinkByVersion,
      variables: {
        id: id,
        version: version
      }
    });
  };

  getTitleText = (stopPlace, formatMessage) => {
    return stopPlace && stopPlace.id
      ? `${stopPlace.name}, ${stopPlace.parentTopographicPlace} (${stopPlace.id})`
      : formatMessage({ id: 'new_stop_title' });
  };

  getQuayItemName = (locale, stopPlace) => {
    stopTypes[locale].forEach(stopType => {
      if (stopType.value === stopPlace.stopPlaceType) {
        return stopType.quayItemName;
      }
    });
  };

  render() {
    const {
      stopPlace,
      stopHasBeenModified,
      activeElementTab,
      intl,
      showEditStopAdditional,
      versions,
      disabled,
      mergeStopDialogOpen
    } = this.props;
    const { formatMessage, locale } = intl;

    if (!stopPlace) return null;

    const translations = {
      name: formatMessage({ id: 'name' }),
      publicCode: formatMessage({ id: 'publicCode' }),
      description: formatMessage({ id: 'description' }),
      unsaved: formatMessage({ id: 'unsaved' }),
      undefined: formatMessage({ id: 'undefined' }),
      none: formatMessage({ id: 'none_no' }),
      quays: formatMessage({ id: 'quays' }),
      pathJunctions: formatMessage({ id: 'pathJunctions' }),
      entrances: formatMessage({ id: 'entrances' }),
      quayItemName: this.getQuayItemName(locale, stopPlace),
      capacity: formatMessage({ id: 'total_capacity' }),
      parkAndRide: formatMessage({ id: 'parking' }),
      bikeParking: formatMessage({ id: 'bike_parking' }),
      unknown: formatMessage({ id: 'uknown_parking_type' }),
      elements: formatMessage({ id: 'elements' }),
      versions: formatMessage({ id: 'versions' }),
      validBetween: formatMessage({ id: 'valid_between' })
    };

    const stopPlaceLabel = this.getTitleText(stopPlace, formatMessage);

    const style = {
      border: '1px solid #511E12',
      background: '#fff',
      width: 405,
      marginTop: 1,
      position: 'absolute',
      zIndex: 999,
      marginLeft: 2
    };

    const scrollable = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      width: '100%',
      height: '78vh',
      position: 'relative',
      display: 'block',
      marginTop: 2
    };

    const stopBoxBar = {
      color: '#fff',
      background: 'rgb(39, 58, 70)',
      fontSize: 12,
      padding: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    };

    const tabStyle = { color: '#000', fontSize: 10, fontWeight: 600 };

    return (
      <div style={style}>
        <div style={stopBoxBar}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            <MdBack
              color="#fff"
              style={{
                cursor: 'pointer',
                marginRight: 2,
                transform: 'scale(0.8)'
              }}
              onClick={this.handleGoBack.bind(this)}
            />
            <div>{stopPlaceLabel}</div>
          </div>
          <FlatButton
            label={translations.versions}
            disabled={!versions.length}
            labelStyle={{
              color: '#fff',
              fontSize: 10,
              borderBottom: '1px dotted #fff',
              color: '#fff',
              padding: 0
            }}
            style={{ margin: 0, zIndex: 999 }}
            onTouchTap={this.handleTouchTapVersions}
          />
          <Popover
            open={this.state.versionsOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={() => this.setState({ versionsOpen: false })}
            animation={PopoverAnimationVertical}
          >
            <Menu menuItemStyle={{ fontSize: 12 }} autoWidth={true}>
              {versions.map((version, i) =>
                <MenuItem
                  key={'version' + i}
                  primaryText={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: 8, fontWeight: 600 }}>
                          {version.version}
                        </div>
                        <div>{version.name}</div>
                      </div>
                      <div style={{ marginTop: -10 }}>
                        {version.versionComment || ''}
                      </div>
                    </div>
                  }
                  secondaryText={
                    <div
                      style={{ transform: 'translateY(-14px)' }}
                    >{`${version.fromDate || 'N/A'} - ${version.toDate ||
                      'N/A'}`}</div>
                  }
                  onTouchTap={() => this.handleLoadVersion(version)}
                />
              )}
            </Menu>
          </Popover>
        </div>
        <div style={scrollable}>
          <div style={{ padding: '10 5' }}>
            <StopPlaceDetails
              disabled={disabled}
              intl={intl}
              expanded={showEditStopAdditional}
              showLessStopPlace={this.showLessStopPlace.bind(this)}
              showMoreStopPlace={this.showMoreStopPlace.bind(this)}
            />
            {showEditStopAdditional
              ? <EditStopAdditional disabled={disabled} />
              : null}
            <div style={{ textAlign: 'center', marginBottom: 5 }}>
              {showEditStopAdditional
                ? <FlatButton
                    icon={<MdLess />}
                    onClick={() => this.showLessStopPlace()}
                  />
                : <FlatButton
                    label={formatMessage({ id: 'more' })}
                    labelStyle={{ fontSize: 12 }}
                    onClick={() => this.showMoreStopPlace()}
                  />}
            </div>
            <Divider inset={true} />
            <Tabs
              onChange={this.handleSlideChange.bind(this)}
              value={activeElementTab}
              tabItemContainerStyle={{ backgroundColor: '#fff' }}
            >
              <Tab
                style={tabStyle}
                label={`${formatMessage({ id: 'quays' })} (${stopPlace.quays
                  .length})`}
                value={0}
              />
              <Tab
                style={tabStyle}
                label={`${formatMessage({ id: 'navigation' })} (${stopPlace
                  .pathJunctions.length + stopPlace.entrances.length})`}
                value={1}
              />
              <Tab
                style={tabStyle}
                label={`${formatMessage({ id: 'parking_general' })} (${stopPlace
                  .parking.length})`}
                value={2}
              />
            </Tabs>
            <EditStopBoxTabs
              disabled={disabled}
              activeStopPlace={stopPlace}
              itemTranslation={translations}
            />
          </div>
          <ConfirmDialog
            open={this.state.confirmDialogOpen}
            handleClose={() => {
              this.handleDialogClose();
            }}
            handleConfirm={() => {
              this.handleDiscardChanges();
            }}
            messagesById={{
              title: 'discard_changes_title',
              body: 'discard_changes_body',
              confirm: 'discard_changes_confirm',
              cancel: 'discard_changes_cancel'
            }}
            intl={intl}
          />
          {this.state.saveDialogOpen && !disabled
            ? <SaveDialog
                open={this.state.saveDialogOpen}
                handleClose={() => {
                  this.handleDialogClose();
                }}
                handleConfirm={this.handleSaveAllEntities.bind(this)}
                errorMessage={this.state.errorMessage}
                intl={intl}
              />
            : null}
          <MergeStopDialog
            open={mergeStopDialogOpen}
            handleClose={this.handleCloseMergeStopDialog.bind(this)}
            handleConfirm={this.handleMergeQuaysFromStop.bind(this)}
            intl={intl}
            sourceElement={this.props.mergeSource}
            targetElement={{
              id: stopPlace.id,
              name: stopPlace.name
            }}
          />
          <MergeQuaysDialog
            open={this.props.mergingQuayDialogOpen}
            handleClose={this.handleCloseMergeQuaysDialog.bind(this)}
            handleConfirm={this.handleMergeQuays.bind(this)}
            intl={intl}
            mergingQuays={this.props.mergingQuay}
          />
          <DeleteQuayDialog
            open={this.props.deleteQuayDialogOpen}
            handleClose={this.handleCloseDeleteQuay.bind(this)}
            handleConfirm={this.handleDeleteQuay.bind(this)}
            intl={intl}
            deletingQuay={this.props.deletingQuay}
          />
          <DeleteStopPlaceDialog
            open={this.props.deleteStopDialogOpen}
            handleClose={this.handleCloseDeleteStop.bind(this)}
            handleConfirm={this.handleDeleteStop.bind(this)}
            intl={intl}
            stopPlace={stopPlace}
          />
          <MoveQuayDialog
            open={this.props.moveQuayDialogOpen}
            handleClose={this.handleCloseMoveQuay.bind(this)}
            handleConfirm={this.handleMoveQuay.bind(this)}
            intl={intl}
            stopPlaceId={stopPlace.id}
            quayId={this.props.movingQuay}
          />
        </div>
        <div
          style={{
            border: '1px solid #efeeef',
            textAlign: 'right',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <FlatButton
            icon={<MdUndo />}
            disabled={!stopHasBeenModified}
            label={formatMessage({ id: 'undo_changes' })}
            style={{ margin: '8 5', zIndex: 999 }}
            labelStyle={{ fontSize: '0.8em' }}
            onClick={() => {
              this.setState({ confirmDialogOpen: true });
            }}
          />
          <IconButton
            disabled={disabled || stopPlace.isNewStop}
            onClick={() => {
              this.props.dispatch(UserActions.requestDeleteStopPlace());
            }}
          >
            <MdDelete />
          </IconButton>
          <FlatButton
            icon={<MdSave />}
            disabled={disabled || !stopHasBeenModified}
            label={formatMessage({ id: 'save_new_version' })}
            style={{ margin: '8 5', zIndex: 999 }}
            labelStyle={{ fontSize: '0.8em' }}
            onClick={this.handleSave.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stopPlace: state.stopPlace.current,
  mergeStopDialogOpen: state.stopPlace.mergeStopDialog
    ? state.stopPlace.mergeStopDialog.isOpen
    : false,
  mergeSource: state.stopPlace.mergeStopDialog,
  pathLink: state.stopPlace.pathLink,
  stopHasBeenModified: state.stopPlace.stopHasBeenModified,
  isMultiPolylinesEnabled: state.stopPlace.enablePolylines,
  activeElementTab: state.user.activeElementTab,
  showEditQuayAdditional: state.user.showEditQuayAdditional,
  showEditStopAdditional: state.user.showEditStopAdditional,
  mergingQuay: state.mapUtils.mergingQuay,
  mergingQuayDialogOpen: state.mapUtils.mergingQuayDialogOpen,
  deleteQuayDialogOpen: state.mapUtils.deleteQuayDialogOpen,
  deleteStopDialogOpen: state.mapUtils.deleteStopDialogOpen,
  deletingQuay: state.mapUtils.deletingQuay,
  versions: state.stopPlace.versions,
  originalPathLink: state.stopPlace.originalPathLink,
  moveQuayDialogOpen: state.mapUtils.moveQuayDialogOpen,
  movingQuay: state.mapUtils.movingQuay,
  activeMap: state.mapUtils.activeMap
});

export default withApollo(
  injectIntl(connect(mapStateToProps)(EditStopGeneral))
);
