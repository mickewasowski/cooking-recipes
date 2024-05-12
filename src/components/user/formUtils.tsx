import { Link } from "react-router-dom"

export const RegisterHeader = () => {
    return (
        <>
            <h2>Create new Account</h2>
            <p>Already registered? <Link to='/login'>Login</Link></p>
        </>
    )
}

export const RegisterForm = (onChange, handleSubmit) => {
    return (
        <form onSubmit={handleSubmit}>
            <label>Please enter your name</label>
            <input type='text' onChange={onChange}/>
            <label>Please enter your email</label>
            <input type='email' onChange={onChange}/>
            <label>Please enter your password</label>
            <input type='password' onChange={onChange}/>
            <input type='submit' value="Register"/>
        </form>
    )
}

export const LoginHeader = () => {
    return (
        <>
            <h2>Sign in now</h2>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </>
    )
}

export const LoginForm = (onChange, handleSubmit) => {
    return (
        <form onSubmit={handleSubmit}>
            <label>Please enter your email</label>
            <input type='email' onChange={onChange}/>
            <label>Please enter your password</label>
            <input type='password' onChange={onChange}/>
            <input type='submit' value="Login"/>
        </form>
    )
}