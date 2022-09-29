import PropTypes from 'prop-types';
import {bubble as Menu} from 'react-burger-menu'
import Alert from 'react-bootstrap/Alert';
import TransItem from './transitem.js'

const TransactionBar=({transactions, token, updateTransaction, isVisible, handleClose})=>{
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
    <Menu onClose={handleClose} styles={ styles} isOpen={isVisible}>   
    { transactions.map(item=>
      <Alert>
      <TransItem item={item} token={token} updateTransaction={updateTransaction}/>
      </Alert>
    )}
     </Menu>          
    )

}
TransactionBar.propTypes = {
  transactions: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  isVisible: PropTypes.func.isRequired
}
export default TransactionBar;