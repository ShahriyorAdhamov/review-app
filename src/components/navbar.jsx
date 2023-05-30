import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { userLogout} from '../slice/auth'

import ThemeButton from '../ui/theme-button'

const Navbar = () => {
	const {isLogin, user} = useSelector(state => state.auth)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
	const btnInfo = document.querySelector('.user__info__button')



	return (
		<div className='d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3'>
			<Link to={'/'}>
				<img src='ghgh' alt='img' />
			</Link>

			<nav className='d-inline-flex mt-2 mt-md-0 ms-md-auto'>
				<ThemeButton/>
				{isLogin? (
					<>
						<Link className='me-3 py-2  text-decoration-none' to={'/create-article'}>
							create article
						</Link>
						<Link to={'/user-settings'}>
							<button className='user__info__button'>
								user
							</button>
						</Link>
						<p className='me-3 py-2 m-0  text-decoration-none'>{user.username}</p>
						<div>
							{/* <button className='btn btn-outline-danger' onClick={logoutHandler}>
								Logout
							</button> */}
						</div>
						
					</>
				) : (
					<>
						<Link className='me-3 py-2  text-decoration-none' to={'/login'}>
							Login
						</Link>
						<Link className='me-3 py-2  text-decoration-none' to={'/register'}>
							Register
						</Link>
					</>
				)}
			</nav>
		</div>
	)
}

export default Navbar
