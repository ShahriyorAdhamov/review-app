import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {signUserFail,signUserLoading,signUserSuccess} from '../slice/auth'
import AuthService from '../services/auth'
import {ValidationError} from './validationError'
import {useNavigate} from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const {loggedIn, isLoading} = useSelector(state => state.auth)
	const navigate = useNavigate()

	const loginFunc = async e => {
		e.preventDefault()
    dispatch(signUserLoading)
		const user = {email, password}
		try {
			const response = await AuthService.userLogin(user);
			dispatch(signUserSuccess(response.user));
			navigate('/')
		} catch (error) {
			dispatch(signUserFail(error.response.data.errors));
		}
	}

	useEffect(() => {
		if (loggedIn) {
			navigate('/');
		}
	}, [loggedIn])
  
    return (
      <div className = "Login mt-5">
        <h2 className='mb-4'>Login</h2>
        <ValidationError/>
        <form action="" onSubmit={loginFunc} >
          <div className = ' login-inputs d-flex flex-column m-auto'>
            <input 
              type = "email" 
              className='form-control border-primary mb-2' 
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}/>
            <input 
              type = "password" 
              className='form-control border-primary mb-2'  
              placeholder="пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}/> 
            <button type = "submit" className='btn btn-primary mb-2' disabled = {isLoading}>
              {isLoading? 'Loading...' : 'Login'}
            </button>
          </div>
            
        </form>
        
      </div>
    );
}
export default Login;