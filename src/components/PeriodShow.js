import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PeriodForm from './PeriodForm'
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import Auth from '../lib/Auth'
import { useParams} from "react-router"

const PeriodShow = () => {


  const [data, setData] = useState(null)
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const periodId = useParams()

  useEffect(() => {
    const fetchPeriods= async() => {
      setLoading(true)
      try {
        const res = await axios.get(`api/periods/${periodId}`)
        console.log(res.data)
        setData(res.data)   
      } catch (err) {
        setErrors(err.res.data.errors)
      }
      setLoading(false)
    } 
    fetchPeriods()
  }, [])

  return(
    <h1>what</h1>
  ) 







}

export default PeriodShow 