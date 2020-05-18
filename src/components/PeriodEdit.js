import React, { useState } from 'react'
import axios from 'axios'
import PeriodCard from './PeriodCard'
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router"
import Button from '@material-ui/core/Button';

const PeriodEdit = () => {


  const [data, setData] = useState({
    Symptoms: [], 
    date: '', 
  })
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)


  const periodId = useParams()
  const history = useHistory()
  
  const handleDelete = async() => {
    try {
      await axios.delete(`/api/periods/${periodId}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      history.push('/periods')
    } catch (err) {
      history.push('/notfound')
    }
  }

  
  return(



    <Button variant="contained" onClick={handleDelete}>Delete Period</Button>
  )

}

export default PeriodEdit


