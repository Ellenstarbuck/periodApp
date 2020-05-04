import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Auth from '../lib/Auth'
import CircularIndeterminate from '../common/CircularIndeterminate'

const PeriodIndex = () => {

  const[createdPeriod, setCreatedPeriod] = useState([])
  const[userName, setUserName] = useState([])
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)
 

  useEffect(() => {
    const fetchPeriods= async() => {
      setLoading(true)
      try {
        const res = await axios.get('api/periods' , {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        console.log(res)
        console.log(res.data.createdPeriods)
        setUserName(res.data)
        setCreatedPeriod(res.data.createdPeriods)
      } catch (err) {
        setErrors(err.res.data.errors)
        
      }
      setLoading(false)
    } 
    fetchPeriods()
  }, [])

  const periodDateSet = () => {
    if (createdPeriod) {
      const result = moment(period.date).format('MM-DD-YYYY')
      console.log(result)
    }
    }

    

  return(
    <div>
      <h1>{userName.username}</h1> 
          {createdPeriod.map(period => {
          return <div key={period._id}>
            
              <h1>{period.date}</h1>
            
                 
             </div>
      })}

      {/* { createdPeriod.map(period => <PeriodCard key={period._id} { ...period }/>)} */}
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