import React, { useState } from 'react'
import axios from 'axios'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment'

const Home = () => {


  const [data, setData] = useState({
    dateOfPeriod: new Date(), 
    daysOfPeriod: 5, 
    cycleLength: 28,
  })

  const [nextPeriod, setNextPeriod] = useState(null)
  


  const [errors, setErrors] = useState(null)


  //disabled
  //loading
  //erroralert

  const handleDateChange = (date) => {
    const result = moment(date).format('MM-DD-YYYY')
    console.log(result)
    setData({ ...data, dateOfPeriod: result })
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/home', data)
      if (res.data.nextPeriod) {
      setNextPeriod(res.data.nextPeriod)
  }
    } catch (err) {
      setErrors(err.response.data.errors)
    
    }
  }

  
  
  return (
    
    <>
    <form onSubmit={handleSubmit}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start date of last period"
              name="dateOfPeriod"
              value={data.dateOfPeriod}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
    </MuiPickersUtilsProvider>
    <TextField
        variant="outlined"
        label="How long has your your period lasted?"
        value={data.daysOfPeriod}
        name="daysOfPeriod"
        fullWidth
        onChange={handleChange}
        />
        <br />
        <br />
        <br />
    <TextField
        variant="outlined"
        label="How long is your cycle?"
        value={data.cycleLength}
        name="cycleLength"
        fullWidth
        onChange={handleChange}
        />  
      <Button
            type="submit"
            variant="contained"
            color="primary"
            label="Submit"
          >
            Submit
          </Button> 
        </form> 
       <form>
         <div>
            <h1>Your next period is due on {nextPeriod}</h1>
         </div>
      </form> 
      </>
    )
  


}



export default Home




