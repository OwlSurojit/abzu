/*
 *  Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at:

  https://joinup.ec.europa.eu/software/page/eupl

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the Licence for the specific language governing permissions and
limitations under the Licence. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

class VersionsPopover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null
    }
  }


  handleOpen(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleOnRequest(version) {
    this.setState({
      open: false
    });
    this.props.handleSelect(version);
  }

  render() {

    const { open, anchorEl } = this.state;
    const { versions, buttonLabel, disabled, hide } = this.props;

    if (hide) return null;

    return (

      <div>
        <FlatButton
          label={buttonLabel}
          disabled={disabled}
          labelStyle={{
            color: '#fff',
            fontSize: 10,
            borderBottom: '1px dotted #fff',
            color: '#fff',
            padding: 0
          }}
          style={{ margin: 0, zIndex: 999 }}
          onTouchTap={this.handleOpen.bind(this)}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={() => this.setState({open: false})}
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
                      {version.changedBy || 'N/A'}:
                      {' '}{version.versionComment || 'N/A'}
                    </div>
                  </div>
                }
                secondaryText={
                  <div
                    style={{ transform: 'translateY(-14px)' }}
                  >{`${version.fromDate || 'N/A'} - ${version.toDate ||
                  'N/A'}`}</div>
                }
                onTouchTap={() => this.handleOnRequest(version)}
              />
            )}
          </Menu>
        </Popover>

      </div>
    );
  }
}

VersionsPopover.propTypes = {
  versions: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  handleSelect: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default VersionsPopover;
