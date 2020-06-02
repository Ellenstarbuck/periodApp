import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/Auth'


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
    this.props.history.push('/')
  }

 
 

  render() {
    const { navbarOpen } = this.state 
    
    const style = {
      color: '#F50D57',
      fontSize: '24px'
    }  

    const buttonStyle = {
      color: '#F50D57',
      fontSize: '20px'
    }  




    return (
      <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
        </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
          <div className='navbar-start'>
            <div className='navbar-item'><Link to="/"><h1 style={style}>HOME</h1></Link></div>
          </div>
          <div className="navbar-end">

              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register"><div className="button" style={buttonStyle}>REGISTER </div></Link>}
             
             {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login"> <div className="button" style={buttonStyle}>LOGIN</div></Link>}
              
              
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/periods"> <div className="button"style={buttonStyle}>MY PERIODS </div></Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/periods/new"> <div className="button"style={buttonStyle}>ADD NEW PERIOD </div></Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item" style={buttonStyle}>LOGOUT</a>}
          </div>
      </div>
      </div>
      </nav>
    )
  }
}



export default withRouter(Nav)