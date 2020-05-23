import React, {useState} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularIndeterminate from '../common/CircularIndeterminate'
import Auth from '../lib/Auth';
import { useHistory } from 'react-router-dom';

const Login = () => {

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
    <form onSubmit={handleSubmit}>
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
        <Button
        type='submit'
        variant="contained"
        color="primary"
        disabled={disabled}
          >
        { disabled ? "Registering" : "Register" }
        </Button>
        <CircularIndeterminate
         loading={loading} 
        />
       </form> 
  )

}


export default Login
