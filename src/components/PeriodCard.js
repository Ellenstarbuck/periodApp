import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'


const PeriodCard = ({ date, symptoms, _id }) => (

  <div key={_id}>
    <Link to={`/periods/${_id}`}>
    <h1>{ (moment(date)).format(('MM-DD-YYYY')) }</h1>
        {symptoms.bleeding && (
        <h1>Bleeding: {symptoms.bleeding}</h1>
        )}
        { symptoms.cramps && (
          <h1>Cramps:{symptoms.cramps}</h1> 
        )}
        { symptoms.boobs && (
          <h1>Boobs: {symptoms.boobs}</h1> 
        )}
        { symptoms.mood && (
          <h1>Mood: {symptoms.mood}</h1> 
        )}
        { symptoms.sex && (
          <h1>Sex: {symptoms.sex}</h1>
        )}
        { symptoms.foodCravings && (
          <h1>FoodCravings: {symptoms.foodCravings}</h1> 
        )}
        { symptoms.energy && (
          <h1>Energy: {symptoms.energy}</h1>
        )}
        { symptoms.poops && (
          <h1>Poops: {symptoms.poops}</h1>
        )}    
        { symptoms.bloats && (
          <h1>Bloats: {symptoms.bloats}</h1>
        )}    

    </Link>
  </div>



)

export default PeriodCard 