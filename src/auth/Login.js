import React, {useState} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularIndeterminate from '../common/CircularIndeterminate'
import Auth from '../lib/Auth';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#F50D57',
    backgroundColor: 'white',
    '&:visited': {
      backgroundColor: '#970F0E',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#970F0E',
      color: 'white',
    },
  },
}))(Button);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    margin: theme.spacing(1),
  },
  // backgroundPicture: {
  //   backgroundImage: `url(${Image})`,
  //   backgroundSize: 'contain'
  // },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  mainText: {
    margin: theme.spacing(3),
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto'
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formFun: {
    border: '1px solid #970F0E',
    padding: theme.spacing(3, 5, 2)
  },
  popoverFun: {
    padding: theme.spacing(3, 5, 2),
    color: '#F50D57',
    border: '30px',
  }
}));



const Login = () => {

  const classes = useStyles();

  const [data, setData] = useState({
    email: '', 
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name] : e.target.value })
  }

  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)
    setLoading(true)
    try {
      const res = await axios.post('/api/login', data)
      Auth.setToken(res.data.token)
      history.push('/periods')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
    setLoading(false)
    setDisabled(false)

  }


  return(
    <div className="hero-body">
      <div className={classes.root}>
        <CssBaseline />
        <Grid container 
          direction="column"
          justify="center"
          alignItems="center"      
          spacing={4}
          
        >
      <main className={classes.layout}> 
    <Paper> 
    <form onSubmit={handleSubmit} className={classes.formFun}>
      <TextField
        variant="outlined"
        label="Email"
        value={data.email}
        name="email"
        fullWidth
        onChange={handleChange}
        />
        { errors.email && (
          <h1>`${errors.email}`</h1>
        )}
        <br />
        <br />
        <br />
        <TextField
        variant="outlined"
        label="Password"
        value={data.password}
        name="password"
        fullWidth
        onChange={handleChange}
        type="password"
        />
        { errors.password && (
          <h1>`${errors.password}`</h1>
        )}
        <br />
        <br />
        <br />
        <ColorButton
        type='submit'
        variant="outlined"
        color="secondary"
        size="medium"
        fullWidth
        disabled={disabled}
          >
        { disabled ? "Registering" : "Register" }
        </ColorButton>
        <CircularIndeterminate
         loading={loading} 
        />
       </form> 
       </Paper> 
       </main>
      </Grid>
      </div>
       </div>
  )

}


export default Login
