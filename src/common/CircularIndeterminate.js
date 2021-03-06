import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularIndeterminate = ({loading}) => {
  
  const classes = useStyles();

  return (
  <div>
    {loading && (
      <div className={classes.root}>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div>
    )}
  </div>
  )


}

export default CircularIndeterminate