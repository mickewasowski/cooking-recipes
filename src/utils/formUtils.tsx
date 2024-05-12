import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerStart, signInWithEmail } from '../store/user/user.action';
import { FormEvents } from '../utils/eventEmitterTypes';
import { emitter } from "../App";

const ALL_FIELDS_REQUIRED_MSG = 'All fields are required!';
const INVALID_EMAIL = 'The email you provided is invalid!';
const PASSWORDS_DONT_MATCH = 'The passwords entered do not match.';

export const RegisterHeader = () => {
    return (
        <>
            <h2>Create new Account</h2>
            <p>Already registered? <Link to='/login'>Login</Link></p>
        </>
    )
}

export const RegisterForm = () => {
    const dispatcher = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { fullname, email, password, confPassword } = event.target.elements;
        if (!fullname.value || !email.value || !password.value || !confPassword.value) {
            emitter.emit(FormEvents.AllFieldsRequired, { message: ALL_FIELDS_REQUIRED_MSG, type: 'alert' });
            return;
        }
        if (!isValidEmail(email.value)) {
            emitter.emit(FormEvents.InvalidEmail, { message: INVALID_EMAIL, type: 'alert' });
            return;
        }
        if (password.value !== confPassword.value) {
            emitter.emit(FormEvents.PasswordsDontMatch, { message: PASSWORDS_DONT_MATCH, type: 'alert' });
            return;
        }

        dispatcher(registerStart({ email: email.value, fullName: fullname.value, password: password.value }));
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
        }}>
            <label>Please enter your name</label>
            <input type='text' id="fullname"/>
            <label>Please enter your email</label>
            <input type='email' id="email"/>
            <label>Please enter your password</label>
            <input type='password' id="password"/>
            <label>Please confirm your password</label>
            <input type='password' id="confPassword"/>
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

export const LoginForm = () => {

    const dispatcher = useDispatch();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        if (!email.value || !password.value) {
            emitter.emit(FormEvents.AllFieldsRequired, { message: ALL_FIELDS_REQUIRED_MSG, type: 'alert' });
            return;
        }
        if (!isValidEmail(email.value)) {
            emitter.emit(FormEvents.InvalidEmail, { message: INVALID_EMAIL, type: 'alert' });
            return;
        }

        dispatcher(signInWithEmail({ email: email.value, password: password.value }));
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
        }}>
            <label>Please enter your email</label>
            <input type='email' id="email"/>
            <label>Please enter your password</label>
            <input type='password' id="password"/>
            <input type='submit' value="Login"/>
        </form>
    )
}

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
