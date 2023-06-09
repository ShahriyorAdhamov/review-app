import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {signUserFail,signUserSuccess, signUserLoading, getPassword} from '../slice/auth'
import AuthService from '../services/auth'
import {ValidationError} from './validationError'
import {useNavigate} from 'react-router-dom'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const {isLogin, isLoading} = useSelector(state => state.auth)
	const navigate = useNavigate()

	const registerFunc = async e => {
		e.preventDefault()
    dispatch(signUserLoading())
		const user = {username, email, password}
		try {
			const response = await AuthService.userRegister(user)
      console.log(response)
			dispatch(signUserSuccess(response.user))
			navigate('/')
		} catch (error) {
      dispatch(signUserFail(error.response.data.errors))
		}


	}

	useEffect(() => {
		if (isLogin) {
			navigate('/')
		}
	}, [isLogin])



    return (
      <div className = "Register mt-5">
        <h2 className='mb-4'>Register</h2>
        <ValidationError/>
        <form action="" >
          <div className = ' register-inputs d-flex flex-column m-auto'>
            <input 
              type = "text"
              className='w-50 mx-auto form-control border border-primary mb-2'
              placeholder="никнейм"
              value={username}
              onChange={e => setUsername(e.target.value)}/>
              
            <input 
              type = "email" 
              className='w-50 mx-auto form-control border-primary mb-2' 
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}/>
            <input 
              type = "password" 
              className='w-50 mx-auto form-control border-primary mb-2'  
              placeholder="пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}/> 
            <button type = "submit" className='w-50 mx-auto btn btn-primary mb-2' disabled = {isLoading}  onClick={registerFunc}>
              register
            </button>
          </div>
            
        </form>
        
      </div>
    );
  }
  
  export default Register;