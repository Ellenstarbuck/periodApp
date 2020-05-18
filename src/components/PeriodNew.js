import React, { useState } from 'react'
import axios from 'axios'
import PeriodForm from './PeriodForm'


const[data, setData] = useState({
  date: '',
  symptoms: [
    {
      bleeding: '',
      cramps: '',
      boobs: '',
      mood: '',
      sex: '',
      foodCravings: '',
      energy: '',
      poops: '',
      bloats: ''

    }
  ]
})
const[periodDate, setPeriodDate] = useState([])
const [errors, setErrors] = useState(false)
const [loading, setLoading] = useState(false)
const [date, changeDate] = useState(new Date());
const [disabled, setDisabled] = useState(false)



const handleChange = (e) => {
  setData({ ...data, [e.target.name] : e.target.value })
} 

const history = useHistory()

const handleSubmit = async e => {
  e.preventDefault()
  setDisabled(true)
  setLoading(true)
  try {
    await axios.post('/api/periods', data)
    history.push(`/periods/${res.data.id}`)
  } catch (err) {
    setErrors(err.response.data.errors)
  }
  setDisabled(false)
  setLoading(false)
}


return (
  <div>
    <PeriodForm data={data} handleChange={handleChange} handleSubmit={handleSubmit}/>
  </div>
)

export default PeriodNew
