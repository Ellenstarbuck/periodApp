import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle'
import MenuItem from '@material-ui/core/MenuItem';
import arrow from './assets/arrow-right.svg'
import './fonts/Inter-Black.woff'
import './styles/main.css'
import { useHistory } from 'react-router-dom';
import { isNull } from 'lodash';


// Validates the user’s email address
// Manages focus and uses appropriate focus styles
// Uses appropriate, semantic elements
// Provides a baseline accessible user experience





class frontEnd extends React.Component {


  state = { 
    emailAddress: '',
    submit: false,
    submitBad: false
  }

  handleChange = (e) => {
    this.setState({ emailAddress: e.target.value, submitBad: false})
  }

  //if email box is empty then display input 'please enter a valid email address'
  //

  imageClick = () => {
    const valid = /\S+@\S+/
    if (valid.test(this.state.emailAddress)) {
      this.setState({ submit: true, submitBad: false })
    } else {
      this.setState({ submitBad: true})
    } 
  }

  render() 
  
  {
    const { emailAddress, submitBad, submit } = this.state 
    return (
      <div>
        <div>
        { submit ? (
            <Alert severity="success">
            <AlertTitle>Congrats</AlertTitle>
                You are pregnant!
              </Alert>
                      ) : (
              <Card>
            <h1 className='inputTitle'>HELLO MY NAME IS SUSIE 🤓</h1>
                <CardContent>
                  <TextField 
                    variant="outlined"
                    label="EMAIL ADDRESS"
                    value={emailAddress}
                    onChange={this.handleChange}
                    required
                    />
                  </CardContent>
                </Card>
                )
              }  
          </div>  
        <>  
        { submitBad ? (
          <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          You are a dream in the eye of a pig!
        </Alert>
        ) : null
      }
        </>
        <img src={arrow} className='hoverFun' onClick={this.imageClick}/>
        </div>    
    )
  }

}
export default frontEnd
