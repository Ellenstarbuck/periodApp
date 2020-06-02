import React, { useState } from 'react'
import axios from 'axios'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import CircularIndeterminate from '../common/CircularIndeterminate'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import { green, purple } from '@material-ui/core/colors';
import Popover from '@material-ui/core/Popover';
import Image from '../assets/9219.jpg'

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#F50D57',
    backgroundColor: 'white',
    '&:visited': {
      backgroundColor: '#970F0E',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#970F0E',
      color: 'white',
    },
  },
}))(Button);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    margin: theme.spacing(1),
  },
  // backgroundPicture: {
  //   backgroundImage: `url(${Image})`,
  //   backgroundSize: 'contain'
  // },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  mainText: {
    margin: theme.spacing(3),
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto'
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formFun: {
    border: '1px solid #970F0E',
    padding: theme.spacing(3, 5, 2)
  },
  popoverFun: {
    padding: theme.spacing(3, 5, 2),
    color: '#F50D57',
    border: '30px',
  }
}));



const Home = () => {

  const classes = useStyles();
  const [data, setData] = useState({
    dateOfPeriod: new Date(), 
    daysOfPeriod: 5, 
    cycleLength: 28,
  })
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [nextPeriod, setNextPeriod] = useState(null)
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [showPeriod, setShowPeriod] = useState(false)
  const [showNextPeriod, setShowNextPeriod] = useState(false)

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

  // const toggleSubmit = () => {
  //   setShowNextPeriod(!showNextPeriod)
    
  // }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  return (
    <div className="hero-body">
      <div className={classes.root}>
        <CssBaseline />
        <Grid container 
          direction="column"
          justify="center"
          alignItems="center"      
          spacing={4}
          
        >
      <main className={classes.layout}>    
      {/* <Grid item xs={8} className={classes.mainText}> 
        <Typography component="h1" variant="h5" color="secondary" align='center'>PERIODS!</Typography>
      </Grid> */}
      
      
      <ColorButton
      type="submit"
      variant="contained" 
      onClick={togglePeriod}
      >
      <Typography component="h1" variant="h5" className={classes.mainText}>When's your next period due?</Typography>
      </ColorButton>
      <br />
      <br />
      <br />
      <Paper>
      { showPeriod === true ? <div>  
    <form onSubmit={handleSubmit} className={classes.formFun}>
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
    <br />
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
        <br />
        <br />
      <ColorButton
            className={classes.submit}
            aria-describedby={id}
            type="submit"
            variant="outlined"
            color="secondary"
            size="medium"
            fullWidth
            disabled={disabled}
            onClick={handleClick}
          >
            
            { disabled ? "Submitting" : "Submit" }
          </ColorButton> 
        </form>
        <div>
          <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >     
            <Typography component="h5"className={classes.popoverFun}>Your next period is due on {nextPeriod}</Typography>
            </Popover>
        </div> 
        </div> : null
        }
        </Paper>
        </main>
        {/* { errors && (
          <div>
            <h1>An error occured, please reload the page</h1>
          </div>
        )}
        <CircularIndeterminate 
          loading={loading}
        /> */}
        </Grid>

      </div>
      </div>
    )
  


}



export default Home




