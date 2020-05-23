import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const PeriodCard = ({ date, symptoms, _id}) => (

  <div key={_id}>
    <Grid container direction="row" spacing={3} justify="flex-start" alignItems="flex-start">
      <Grid item xs={6} sm={4}>
      <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
    <h1>{ (moment(date)).format(('MM-DD-YYYY')) }</h1>
        {symptoms.bleeding && (
        <h1>Bleeding: {symptoms.bleeding}</h1>
        )}
        { symptoms.cramps && (
          <h1>Cramps: {symptoms.cramps}</h1> 
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
        <Link to={`/periods/${_id}/edit`}><Button variant="contained">Edit</Button></Link>
        
          </Box>
      </Grid>
    </Grid>        

  </div>



)

export default PeriodCard 