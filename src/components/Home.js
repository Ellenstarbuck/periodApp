import React, { useState } from 'react'
import axios from 'axios'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import CircularIndeterminate from '../common/CircularIndeterminate'

const Home = () => {


  const [data, setData] = useState({
    dateOfPeriod: new Date(), 
    daysOfPeriod: 5, 
    cycleLength: 28,
  })

  const [nextPeriod, setNextPeriod] = useState(null)
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [showPeriod, setShowPeriod] = useState(true)

  const handleDateChange = (date) => {
    const result = moment(date).format('MM-DD-YYYY')
    setData({ ...data, dateOfPeriod: result })
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setErrors(false)
    setDisabled(true)
    try {
      const res = await axios.post('/api/home', data)
      if (res.data.nextPeriod) {
      setNextPeriod(res.data.nextPeriod)
  }
    } catch (err) {
      setErrors(true)
    }
    setLoading(false)
    setDisabled(false)
  }

  const togglePeriod = () => {
    setShowPeriod(!showPeriod)
  }
  
  return (
    
    <>
      <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={togglePeriod}
      >
       Want to work out when your next period is due?
      </Button>
      { showPeriod === true ? <div>  
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
            disabled={disabled}
          >
            { disabled ? "Submitting" : "Submit" }
          </Button> 
        </form> 
        <div>
            <h1>Your next period is due on {nextPeriod}</h1>
        </div>
        </div> : null
        }
        { errors && (
          <div>
            <h1>An error occured, please reload the page</h1>
          </div>
        )}
        <CircularIndeterminate 
          loading={loading}
        />
      </>
    )
  


}



export default Home




