import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';

// Validates the user’s email address
// Manages focus and uses appropriate focus styles
// Uses appropriate, semantic elements
// Provides a baseline accessible user experience





class frontEnd extends React.Component {


  state = { 
    emailAddress: ''
  }

  onChange = (e) => {
    this.setState({ emailAddress: e.target.value})
  }

  render() {
    return (
      <Card>
        <Typography>Sign up for the latest updates</Typography>
        <CardContent>
          <TextField 
            variant="outlined"
            label="Email address"
            value={email}
            onChange={this.handleChange}
            fullWidth
          />

        </CardContent>

      </Card>
    
    )
  }

}
export default frontEnd
