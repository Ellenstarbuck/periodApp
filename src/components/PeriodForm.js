import React from 'react'
import TextField from '@material-ui/core/TextField';
import CircularIndeterminate from '../common/CircularIndeterminate'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl,
  InputLabel,
  Select,
 FormHelperText,
  Input} from "@material-ui/core"

const PeriodForm = ({ symptoms, date, handleChange, handleSubmit, handleDateChange, disabled, loading }) => (

  
    <form onSubmit={handleSubmit}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Period date"
              name="date"
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
    </MuiPickersUtilsProvider>
    <div className="field">
              <label className="label">Bleeding</label>
              <div className="select">
                <select name="bleeding" onChange={handleChange} value={symptoms.bleeding}>
                <option disabled value="">Pick a type</option>
                  <option value="spotting">Spotting</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="it\'s like when the lift doors open in The Shining">It's like when the lift doors open in The Shining</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Cramps</label>
              <div className="select">
                <select name="cramps" onChange={handleChange} value={symptoms.cramps}>
                <option disabled value="">Pick a type</option>
                  <option value="none">None</option>
                  <option value="a mild twinge">A mild twinge</option>
                  <option value="distracting but beareable">Distracting but beareable</option>
                  <option value="the worst">The worst</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Boobs</label>
              <div className="select">
                <select name="boobs" onChange={handleChange} value={symptoms.boobs}>
                <option disabled value="">Pick a type</option>
                  <option value="'they\'re okay, thanks for asking'">They're okay, thanks for asking</option>
                  <option value="so sore!">So sore</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Mood</label> 
              <div className="select">
                <select name="mood" onChange={handleChange} value={symptoms.mood}>
                <option disabled value="">Pick a type</option>
                  <option value='I will fight anyone who disagrees with me'>'I will fight anyone who disagrees with me'</option>
                  <option value="I would probably cry over spilt milk">'I would probably cry over spilt milk'</option>
                  <option value='normal, whatever that is'>Normal, whatever that is</option>
                  <option value="'pretty upbeat'">Pretty upbeat</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Horny?</label>
              <div className="select">
                <select name="sex" onChange={handleChange} value={symptoms.sex}> 
                <option disabled value="">Pick a type</option>
                  <option value="not really">Not Really</option>
                  <option value="no more then usual">No more than usual</option>
                  <option value="YES!">YES!</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Food Cravings</label>
              <div className="select">
                <select name="foodCravings" onChange={handleChange} value={symptoms.foodCravings}>
                <option disabled value="">Pick a type</option>
                  <option value="none">None</option>
                  <option value="all the carbs">All the carbs</option>
                  <option value="all the chocolate">All the chocolate</option>
                  <option value="I just want to eat the entire contents of the fridge">I just want to eat the entire contents of the fridge</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Energy</label>
              <div className="select">
                <select name="energy" onChange={handleChange} value={symptoms.energy}>
                <option disabled value="">Pick a type</option>
                  <option value="low">Low</option>
                  <option value="average">Average</option>
                  <option value="I could party">I could party</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Poops</label>
              <div className="select">
                <select name="Poops" onChange={handleChange} value={symptoms.poops}>
                <option disabled value="">Pick a type</option>
                  <option value="dashing to the toilet">Dashing to the toilet</option>
                  <option value="constipated">Constipated</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Bloats</label>
              <div className="select">
                <select name="bloats" onChange={handleChange} value={symptoms.bloats}>
                <option disabled value="">Pick a type</option>
                  <option value="farty">Farty</option>
                  <option value="nauseous">Nauseous</option>
                  <option value="bloated">Bloated</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>
            <Button
        type='submit'
        variant="contained"
        color="primary"
        disabled={disabled}
          >
        { disabled ? "Submitting" : "Submit" }
        </Button>
        <CircularIndeterminate
         loading={loading} 

        />
    </form>
  )



export default PeriodForm