import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MdChecked from 'material-ui/svg-icons/navigation/check'
import Logo from '../static/logo/logo_entur.png'
import MdAccount from 'material-ui/svg-icons/action/account-circle'
import MdLanguage from 'material-ui/svg-icons/action/language'

const Header = ({handleNavigateToMain, text, setLanguage, locale, handleLogOut, username}) =>{

  const { title, language, norwegian, english, logOut } = text

  return (

      <AppBar
        title={title}
        showMenuIconButton={true}
        iconElementLeft={
            <img src={Logo} style={{width: 40, height: 'auto', cursor: 'pointer'}} onClick={() => handleNavigateToMain()}/>
        }
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText={language}
              rightIcon={<ArrowDropRight />}
              leftIcon={<MdLanguage color="#41c0c4"/>}
              style={{fontSize: 12, padding: 0}}
              menuItems={[
                <MenuItem
                  style={{fontSize: 12, padding: 0}}
                  onClick={() => setLanguage('nb')}
                  insetChildren
                  primaryText={norwegian}
                  leftIcon={getLeftIcon(locale, 'nb')}
                />,
                <MenuItem
                  style={{fontSize: 12, padding: 0}}
                  onClick={() => setLanguage('en')}
                  insetChildren
                  primaryText={english}
                  leftIcon={getLeftIcon(locale, 'en')}
                />,
              ]}
             />
            <MenuItem
              leftIcon={<MdAccount color="#41c0c4"/>}
              primaryText={`${logOut} ${username}`}
              onClick={() => handleLogOut()}
              style={{fontSize: 12, padding: 0}}
            />
          </IconMenu>
        }
      />
)}

const getLeftIcon =(locale, value) => {
  if (locale === value) {
    return <MdChecked color="green" />
  }
  return null
}

export default Header
