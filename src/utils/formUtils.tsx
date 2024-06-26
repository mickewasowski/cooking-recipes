import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FormEvents } from '../utils/eventEmitterTypes';
import { emitter } from "../App";
import { useRef, useState } from "react";
import classNames from 'classnames';
import { fetchEmailSignIn, fetchUserRegister } from "../store/user/user.thunk";

const ALL_FIELDS_REQUIRED_MSG = 'All fields are required!';
const INVALID_EMAIL = 'The email you provided is invalid!';
const PASSWORDS_DONT_MATCH = 'The passwords entered do not match.';

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;;

export const RegisterHeader = () => {
    return (
        <>
            <h2>Create new Account</h2>
            <p>Already registered? <Link to='/login'>Login</Link></p>
        </>
    )
}

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const passRef = useRef(null);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [confPassError, setConfPassError] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { fullname, email, password, confPassword } = event.target.elements;
        if (!fullname.value || !email.value || !password.value || !confPassword.value) {
            //emitter.emit(FormEvents.AllFieldsRequired, { message: ALL_FIELDS_REQUIRED_MSG, type: 'alert' });
            return;
        }
        if (!isValidEmail(email.value)) {
            //emitter.emit(FormEvents.InvalidEmail, { message: INVALID_EMAIL, type: 'alert' });
            return;
        }
        if (password.value !== confPassword.value) {
            //emitter.emit(FormEvents.PasswordsDontMatch, { message: PASSWORDS_DONT_MATCH, type: 'alert' });
            return;
        }

        const result = await dispatcher(fetchUserRegister({ email: email.value, fullName: fullname.value, password: password.value }));
        if (result.payload.success) {
            navigate('/login');
        }
    }

    const handleChange = (event) => {
        const inputValue = event.target.value;
        switch (event.target.id) {
            case 'fullname': {
                if (!isValidName(inputValue)) {
                    setNameError(true);
                } else {
                    if (nameError) {
                        setNameError(false);
                    }
                }
                break;
            }
            case 'email': {
                if (!isValidEmail(inputValue)) {
                    setEmailError(true);
                } else {
                    if (emailError) {
                        setEmailError(false);
                    }
                }
                break;
            }
            case 'password': {
                if (!isValidPassword(inputValue)) {
                    setPassError(true);
                } else {
                    if (passError) {
                        setPassError(false);
                    }
                }
                break;
            }
            case 'confPassword': {
                if (!inputValue || passRef?.current?.value !== inputValue) {
                    setConfPassError(true);
                } else {
                    if (confPassError) {
                        setConfPassError(false);
                    }
                }
                break;
            }
        }
    }

    const classes = classNames({
        inputErrorOutline: true,
    });

    const isSubmitDisabled = !!(nameError || passError || emailError || confPassError);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
        }}>
            <label>
                Please enter your name
                {
                    nameError
                    ? <p id="errorMsg">Name must be at least 3 characters!</p>
                    : null
                }
            </label>
            <input className={nameError ? classes : ''} type='text' id="fullname" onChange={handleChange}/>
            <label>
                Please enter your email
                {
                    emailError
                    ? <p id="errorMsg">Invalid email address!</p>
                    : null
                }
            </label>
            <input className={emailError ? classes : ''} type='email' id="email" onChange={handleChange}/>
            <label>
                Please enter your password
                {
                    passError
                    ? <p id="errorMsg">Password must be at least 8 characters!</p>
                    : null
                }
            </label>
            <input ref={passRef} className={passError ? classes : ''} type='password' id="password" onChange={handleChange}/>
            <label>
                Please confirm your password
                {
                    confPassError
                    ? <p id="errorMsg">Passwords must match!</p>
                    : null
                }
            </label>
            <input className={confPassError ? classes : ''} type='password' id="confPassword" onChange={handleChange}/>
            <input className={isSubmitDisabled ? 'greySubmitBtn' : ''} disabled={isSubmitDisabled} type='submit' value="Register"/>
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
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    
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

        dispatcher(fetchEmailSignIn({ email: email.value, password: password.value }));
    }

    const handleChange = (event) => {
        const inputValue = event.target.value;
        switch (event.target.id) {
            case 'email': {
                if (!isValidEmail(inputValue)) {
                    setEmailError(true);
                } else {
                    if (emailError) {
                        setEmailError(false);
                    }
                }
                break;
            }
            case 'password': {
                if (!isValidPassword(inputValue)) {
                    setPassError(true);
                } else {
                    if (passError) {
                        setPassError(false);
                    }
                }
                break;
            }
        }
    }

    const classes = classNames({
        inputErrorOutline: true,
    });

    const isSubmitDisabled = !!(emailError || passError);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
        }}>
            <label>
                Please enter your email
                {
                    emailError
                    ? <p id="errorMsg">Invalid email address!</p>
                    : null
                }
            </label>
            <input className={emailError ? classes : ''} onChange={handleChange} type='email' id="email"/>
            <label>
                Please enter your password
                {
                    passError
                    ? <p id="errorMsg">Password must be at least 8 characters!</p>
                    : null
                }
            </label>
            <input className={passError ? classes: ''} onChange={handleChange} type='password' id="password"/>
            <input className={isSubmitDisabled ? 'greySubmitBtn' : ''} disabled={isSubmitDisabled} type='submit' value="Login"/>
        </form>
    )
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidName = (fullname: string) => {
    if (!fullname || fullname.length < MIN_NAME_LENGTH || hasNumber(fullname)) {
        return false;
    }
    return true;
}
const isValidPassword = (password: string) => {
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
        return false;
    }
    return true;
}
const hasNumber = (input: string) => /\d/.test(input);
