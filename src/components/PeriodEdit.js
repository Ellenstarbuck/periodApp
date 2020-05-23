import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PeriodForm from './PeriodForm'
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router"
import { matchPath} from "react-router"


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


  // const periodId = useParams()
  
  const history = useHistory()
  const periodId = match.params.id

  useEffect(() => {
    const fetchPeriods= async() => {
      setLoading(true)
      console.log(periodId)
      try {
        const res = await axios.get(`/api/periods/${periodId}`)
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
    console.log(data)
    try {
      const { data } = await axios.put(`/api/periods/${periodId}`, data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      history.push(`/periods/${data._id}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
    setDisabled(false)
    setLoading(false)
  }
  
  
  // const handleDelete = async() => {
  //   try {
  //     await axios.delete(`/api/periods/${periodId}/`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     history.push('/periods')
  //   } catch (err) {
  //     history.push('/notfound')
  //   }
  // }




  
  return(
      <div>
        <PeriodForm date={data.date} symptoms={data.symptoms} loading={loading} disabled={disabled} handleChange={handleChange} handleSubmit={handleSubmit} handleDateChange={handleDateChange}/>
        
      </div>
    )
    

}

export default PeriodEdit


