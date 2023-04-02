import './Login.css';
import { useState, useEffect } from 'react';
import auth from '../../API/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const initialState = { email: '', password: '' }
    const [ loginData, setLoginData ] = useState(initialState)
    const { email, password } = loginData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await auth.login(loginData);
        if(res && res.status === 200){
            alert(res.data.message);
            localStorage.setItem('authToken', res.data.token)
            navigate('/')
            window.location.reload();
        }else{
            alert('Invalid Credentials')
        }
    }

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

  return (
    <>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
                <input type="submit" value="Sign In" />
            </form>
        </div>
    </>
  )
}

export default Login

{/* <div class="container">
		<form action="" method="POST">
			<h2>Sign Up</h2>
			<label for="name">Name:</label>
			<input type="text" id="name" name="name" required>
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" required>
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" required>
			<label for="confirm_password">Confirm Password:</label>
			<input type="password" id="confirm_password" name="confirm_password" required>
			<input type="submit" value="Sign Up">
		</form>
	</div> */}