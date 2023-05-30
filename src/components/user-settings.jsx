import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AuthService from '../services/auth'
import axios from '../services/api'
import userUpdatedInfo from '../slice/auth.js'
import { userLogout} from '../slice/auth'
import {useNavigate} from 'react-router-dom'





function UserSettings() {
	  const navigate = useNavigate();
    const dispatch = useDispatch();
    let {user} = useSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('') 


    useEffect(() => {
      AuthService.getUser().then((res) => {
        setUsername(res.user.username);
        setEmail(res.user.email);

      })
    }, [])

    const updatedData = async (e, user) => {
      e.preventDefault()
      const data = {username, email};
      try{    
          await AuthService.editUser(data);
          dispatch(userUpdatedInfo({...user, username, email}))
      } catch(err) {
        console.log(err)
      }
    }
    const logoutHandler = () => {
      dispatch(userLogout());
      localStorage.removeItem('token');
      navigate('/login');
    }


  return (
    <div className='container d-flex flex-column'>
      <form>
        <div>

          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" 
              className='d-inline w-50 form-control border border-primary mb-2'
            value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email}
              className='w-50  form-control border border-primary mb-2 d-inline' onChange={e => setEmail(e.target.value)}/>
          </div>
          <button onClick={(e) => updatedData(e, user)}>ok</button>
        </div>
        <button className='btn btn-outline-danger mt-5' onClick={logoutHandler}>
					Logout
				</button>
      </form>
    </div>
  )
}

export default UserSettings