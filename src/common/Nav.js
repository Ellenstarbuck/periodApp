import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/Auth'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

class Nav extends React.Component {
  //attaching booleon value to nav bar to give control over what sections the user can see depending on whether
  //they have a token or not
  state = { navbarOpen: false }
  // const classes = useStyles()

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  //everytime the page re-renders we want it to check - are we on the same page or have we moved?
  //need to ask the nav bar what the props were on a previous render.
  //component did mount gets that as an argument
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      //see where i currently am on every re-render.
      this.setState({ navbarOpen: false })
      //need a condition - if the two above are NOT the same then please close nav bar
    }
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/home')
  }

 

  render() {
    const { navbarOpen } = this.state 
    
    return (
      <div className={root}>
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon 
            />
          </IconButton>
          <Typography variant="h6">
          <Link to="/">Home</Link>
          </Typography>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/periods">My Periods</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/periods/new">Add New Period</Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
          </div>
          </Toolbar>
          </AppBar>
      </div>
    )
  }
}



export default withRouter(Nav)