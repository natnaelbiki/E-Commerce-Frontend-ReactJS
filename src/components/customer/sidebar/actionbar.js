import PropTypes from 'prop-types';
import {bubble as Menu} from 'react-burger-menu'
import Alert from 'react-bootstrap/Alert';
import NotifItem from './notifItem.js'

const ActionBar=({notifications, token, updateNotifications, isVisible, handleClose})=>{
  var styles = {
  
  bmMenuWrap: {
    //padding: '1% 1% 0 0',
    paddingTop: '5%',
    position: 'fixed',
    height: '85%'
  },
  bmMenu: {
    background: '#373a47',
    width: '100%',
    //padding: '2% 2% 2% 2%',
    fontSize: '1.15em',
    paddingBottom: '10%',
  },
  bmMorphShape: {
    //fill: '#373a47'
  },
  bmItemList: {
    //color: '#b8b7ad',
    padding: '1% 1% 15% 2%'
  },
  bmItem: {
    display: 'flex-inline'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.7)'
  }
}

  return (
    <Menu onClose={handleClose} styles={ styles} isOpen={isVisible} >   
    { notifications.map(item=>
      <Alert>
      <NotifItem item={item} token={token} updateNotifications={updateNotifications}/>
      </Alert>
    )}
     </Menu>          
    )

}
ActionBar.propTypes = {
  notifications: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  isVisible: PropTypes.func.isRequired
}
export default ActionBar;