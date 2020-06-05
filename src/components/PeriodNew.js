import React, { useState } from 'react'
import axios from 'axios'
import PeriodForm from './PeriodForm'
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import Auth from '../lib/Auth'
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

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
    padding: theme.spacing(3, 5, 2),
    color: 'white',
    backgroundColor: '#970F0E',
    
  }
}));

const PeriodNew = () => {

  const classes = useStyles();
  const[data, setData] = useState({
    date: new Date(),
        symptoms: {
        bleeding: "",
        cramps: "",
        boobs: "",
        mood: "",
        sex: "",
        foodCravings: "",
        energy: "",
        poops: "",
        bloats: "",
    },
    user: ''
  }
  )

  
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  
  
  const handleDateChange = (date) => {
    const result = date.toISOString()
    setData({ ...data, date: result })
  }
  
  const handleChange = (e) => {
    const newSymptoms = { ...data.symptoms, [e.target.name] : e.target.value }
    setData({ ...data, symptoms: newSymptoms })
  } 
  
  const history = useHistory()

  
  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)
    setLoading(true)
    console.log(data)
    try {
      const res = await axios.post('/api/periods', data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      history.push('/periods')
    } catch (err) {
      console.log(data)
      console.log(err)
      setErrors(err.response.data.errors)
    }
    setDisabled(false)
    setLoading(false)
  }
  
  
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
    <Paper className={classes.formFun}>
      <PeriodForm 
        date={data.date} 
        symptoms={data.symptoms} 
        ColorButton={ColorButton} 
        loading={loading} 
        disabled={disabled} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        handleDateChange={handleDateChange}
        mainText={classes.mainText}
        />
     </Paper> 
     </main>
     </Grid>
     </div>> 
    </div>
  )

}



export default PeriodNew
