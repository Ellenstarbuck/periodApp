import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PeriodForm from './PeriodForm'
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router"
import { matchPath} from "react-router"
import Auth from '../lib/Auth'

const PeriodEdit = () => {


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
  }
  )
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)


 
  
  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    const fetchPeriods= async() => {
      setLoading(true)
      
      try {
        const res = await axios.get(`/api/periods/${params.id}`)
        setData(res.data)   
      } catch (err) {
        setErrors(err.res.data.errors)
      }
      setLoading(false)
    } 
    fetchPeriods()
  }, [])

  const handleDateChange = (date) => {
    const result = date.toISOString()
    setData({ ...data, date: result })
  }
  
  const handleChange = (e) => {
    const newSymptoms = { ...data.symptoms, [e.target.name] : e.target.value }
    setData({ ...data, symptoms: newSymptoms })
  } 
  
 

  
  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)
    setLoading(true)
    try {
        await axios.put(`/api/periods/${params.id}`, data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      history.push(`/periods/`)
    } catch (err) {
      setErrors(err.data.errors)
    }
    setDisabled(false)
    setLoading(false)
  }
  
  
  return(
      <div>
        <PeriodForm date={data.date} symptoms={data.symptoms} loading={loading} disabled={disabled} handleChange={handleChange} handleSubmit={handleSubmit} handleDateChange={handleDateChange}/>
        
      </div>
    )
    

}

export default PeriodEdit


