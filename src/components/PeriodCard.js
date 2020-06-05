import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import ScheduleIcon from '@material-ui/icons/ScheduleOutlined';
import OpacityIcon from '@material-ui/icons/Opacity';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HealingIcon from '@material-ui/icons/Healing';
import AirlineSeatLegroomExtraIcon from '@material-ui/icons/AirlineSeatLegroomExtra';
import DiscFullIcon from '@material-ui/icons/DiscFull';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const PeriodCard = ({ date, symptoms, _id, ColorButton, mainText }) => (
  

  <div key={_id}>
    <Typography component="h1" variant="h5" className={mainText}>Symptoms</Typography>
    <Typography component="h1" variant="h6" className={mainText}><ScheduleIcon /> Date: { (moment(date)).format(('MM-DD-YYYY')) }</Typography>
        {symptoms.bleeding && (
        <Typography component="h2" variant="h6"className={mainText}><OpacityIcon/> Bleeding: {symptoms.bleeding}</Typography>
        )}
        { symptoms.cramps && (
          <Typography component="h2" variant="h6" className={mainText}><HealingIcon /> Cramps: {symptoms.cramps}</Typography> 
        )}
        { symptoms.boobs && (
          <Typography component="h2" variant="h6" className={mainText}> <DiscFullIcon/> Boobs: {symptoms.boobs}</Typography>
        )}
        { symptoms.mood && (
          <Typography component="h2" variant="h6" className={mainText}><MoodBadIcon /> Mood: {symptoms.mood}</Typography> 
        )}
        { symptoms.sex && (
          <Typography component="h2" variant="h6" className={mainText}><FavoriteBorderIcon/> Horny?: {symptoms.sex}</Typography>
        )}
        { symptoms.foodCravings && (
          <Typography component="h2" variant="h6" className={mainText}><FastfoodIcon /> Food Cravings: {symptoms.foodCravings}</Typography> 
        )}
        { symptoms.energy && (
          <Typography component="h2" variant="h6" className={mainText}><BatteryCharging60Icon/> Energy: {symptoms.energy}</Typography>
        )}
        { symptoms.poops && (
          <Typography component="h2" variant="h6" className={mainText}> <AirlineSeatLegroomExtraIcon/> Poops: {symptoms.poops}</Typography>
        )}    
        { symptoms.bloats && (
          <Typography component="h2" variant="h6" className={mainText}><BeachAccessIcon/> Bloats: {symptoms.bloats}</Typography>
        )}
        <Link to={`/periods/${_id}/edit`}><ColorButton
        type='submit'
        variant="outlined"
        color="secondary"
        size="medium"
        fullWidth>Edit</ColorButton></Link>      

  </div>



)

export default PeriodCard 