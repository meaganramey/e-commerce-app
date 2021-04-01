import React from 'react'


function Login (props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleLogin = () => {

    }

    const handleChange = (e) => {
        inputName = e.target.name
        inputValue = e.target.value
        setFormData((state) => ({...state, [inputName]: inputValue}))
    }

    return (
        <>
        <form id="login-form" onSubmit={handleLogin}>
            <label htmlFor='email'>Email</label>
            <input
                autoFocus
                type='text'
                value={formData.email}
                name='email'
                onChange={handleChange}
                required
                />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                value={formData.password}
                name='password'
                onChange={handleChange}
                required
                />
            <button type='submit'>Login</button>
        </form>
        </>
    )
}

export default Login