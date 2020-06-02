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


const PeriodIndex = () => {

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
    <div>
      <h1>{userName.username}: Period Profile</h1>
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
    <br />
    <br /> 
       {data.map(element => {
         if (moment(date).format('YYYYMMDD') === moment(element.date).format('YYYYMMDD')) {
           return <PeriodCard key={element._id} { ...element }/>
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
    

    </div>
  )

}

export default PeriodIndex