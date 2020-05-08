import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'
import CircularIndeterminate from '../common/CircularIndeterminate'
import PeriodCard from '../components/PeriodCard'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


const PeriodIndex = () => {

  const[data, setData] = useState([])
  const[userName, setUserName] = useState([])
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [date, changeDate] = useState(new Date());
 

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
      <h1>{userName.username}</h1>
      { data.map(period => <PeriodCard key={period._id} { ...period }/>)}
      <CircularIndeterminate 
          loading={loading}
        />
      { errors && (
        <div>
          <h1>Oh no something went wrong</h1>
        </div>  
      )}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              value={date}
              onChange={changeDate}
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              // label="Start date of last period"
              // name="dateOfPeriod"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
    </MuiPickersUtilsProvider>

    </div>
  )

}

export default PeriodIndex