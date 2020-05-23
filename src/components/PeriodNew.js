import React, { useState } from 'react'
import axios from 'axios'
import PeriodForm from './PeriodForm'
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import Auth from '../lib/Auth'


const PeriodNew = () => {


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
    <div>
      <PeriodForm date={data.date} symptoms={data.symptoms} loading={loading} disabled={disabled} handleChange={handleChange} handleSubmit={handleSubmit} handleDateChange={handleDateChange}/>
      
    </div>
  )

}



export default PeriodNew
