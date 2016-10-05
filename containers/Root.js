import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { UserActions } from '../actions/'
import configureLocalization from '../localization/localization'
import RouterContainer from './RouterContainer'

class Root extends React.Component {

  componentDidMount() {

    const { dispatch, localization, appliedLocale } = this.props

    configureLocalization(appliedLocale).then( (localization) => {
      dispatch ( UserActions.changeLocalization(localization) )
    })
  }

  render() {

    const { history, path } = this.props
    const { localization } = this.props

    if (localization.locale == null) return null

    return (
      <IntlProvider locale={localization.locale} messages={localization.messages}>
        <RouterContainer path={path} history={history}/>
      </IntlProvider>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    localization: state.userReducer.localization,
    appliedLocale: state.userReducer.appliedLocale
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
