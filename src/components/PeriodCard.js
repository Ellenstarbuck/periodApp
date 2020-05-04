import React from 'react'
import { Link } from 'react-router-dom'



const PeriodCard = ({ date, symptoms, _id }) => (

  <div key={_id}>
    <Link to={`/periods/${_id}`}>
      <h1>{date}</h1>
      <h1>{symptoms}</h1>


    </Link>
  </div>



)

export default PeriodCard 