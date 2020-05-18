import React, {useState} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularIndeterminate from '../common/CircularIndeterminate'
import { useHistory } from 'react-router-dom';

const Register = () => {

 const [data, setData] = useState({
  username: '', 
  email: '', 
  password: '',
  passwordConfirmation: ''
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
      await axios.post('/api/register', data)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
    setDisabled(false)
    setLoading(false)
  }




  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        label="Username"
        value={data.username}
        name="username"
        fullWidth
        onChange={handleChange}
        />
        { errors.username && (
          <h1>`${errors.username}`</h1>
        )}
        <br />
        <br />
        <br />
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
        type='password'
        value={data.password}
        name="password"
        fullWidth
        onChange={handleChange}
        />
        { errors.password && (
          <h1>`${errors.password}`</h1>
        )}
        <br />
        <br />
        <br />
        <TextField
        variant="outlined"
        type='password'
        label="Password Confirmation"
        value={data.passwordConfirmation}
        name="passwordConfirmation"
        fullWidth
        onChange={handleChange}
        />
        { errors.passwordConfirmation && (
          <h1>`${errors.passwordConfirmation}`</h1>
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
            Register
        { disabled ? "Registering" : "Register" }
        </Button>
        <CircularIndeterminate
         loading={loading} 

        />
    </form>
) 
}

export default Register

