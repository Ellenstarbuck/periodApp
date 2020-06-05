import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'
import CircularIndeterminate from '../common/CircularIndeterminate'
import PeriodCard from '../components/PeriodCard'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import {MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import { Badge } from "@material-ui/core";
import moment from 'moment'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";



const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#970F0E',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: '#970F0E',
        color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: 'black',
      },
      daySelected: {
        backgroundColor: '#D01617',
      },
      dayDisabled: {
        color: '#E53935',
      },
      current: {
        color: '#E53935',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#E53935',
      },
    },
  },
});


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
    padding: '2px',
    color: 'white',
    backgroundColor: '#970F0E',
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


const PeriodIndex = () => {

  const classes = useStyles();

  const[data, setData] = useState([])
  const[userName, setUserName] = useState([])
  const[periodDate, setPeriodDate] = useState([])
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [date, changeDate] = useState(new Date());
  const [selected, setIsSelected] = useState()
 

  useEffect(() => {
    const fetchPeriods= async() => {
      setLoading(true)
      try {
        const res = await axios.get('api/periods' , {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        
        const newSymptoms = res.data.createdPeriods 
        setData(newSymptoms)
        setUserName(res.data)
        const newDate = res.data.createdPeriods.map(period => {
          return period.date
        })
        const newNewDate = newDate.map(date => {
          return moment(date).format('YYYYMMDD')
        })
        setPeriodDate(newNewDate)
        
      } catch (err) {
        setErrors(err.res.data.errors)
        
      }
      setLoading(false)
    } 
    fetchPeriods()
  }, [])

  
 

  
  if (!data) return null
  return(
    <div className='hero-body'>
       <div className={classes.root}>
        <CssBaseline />
        <Grid container 
          direction="column"
          justify="center"
          alignItems="center"      
          spacing={4}
          
        >
      <main className={classes.layout}> 
      <Paper className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.mainText}>{userName.username}: Period Profile</Typography>
      </Paper>
      <br />
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              value={date}
              onChange={changeDate}
              renderDay={(date, selectedDate, isInCurrentMonth, dayComponent ) => {
                const isSelected = isInCurrentMonth && periodDate.includes(moment(date).format('YYYYMMDD'))
                  return <Badge badgeContent={isSelected ? "🔴" : undefined}>{dayComponent}</Badge>
              }}
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              KeyboardButtonProps={{
                'aria-label': 'change date',
            
              }}
            />
          </Grid>
    </MuiPickersUtilsProvider>
    </ThemeProvider>   
    <br />
    <br /> 
       {data.map(element => {
         if (moment(date).format('YYYYMMDD') === moment(element.date).format('YYYYMMDD')) {
          return <Paper className={classes.paper}>
          <PeriodCard 
           key={element._id} { ...element } ColorButton={ColorButton} mainText={classes.mainText}/>
          </Paper>
         } 
      })}       
     
      <CircularIndeterminate 
          loading={loading}
        />
      { errors && (
        <div>
          <h1>Oh no something went wrong</h1>
        </div>  
      )}
        </main>
      </Grid>
      </div>
    </div>
  )

}

export default PeriodIndex