import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerStart, signInWithEmail } from '../store/user/user.action';
import { FormEvents } from '../utils/eventEmitterTypes';
import { emitter } from "../App";
import { useRef, useState } from "react";
import classNames from 'classnames';

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
    const dispatcher = useDispatch();
    const passRef = useRef(null);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [confPassError, setConfPassError] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

        dispatcher(registerStart({ email: email.value, fullName: fullname.value, password: password.value }));
    }

    const onBlur = (event) => {
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
            <label>Please enter your name</label>
            {
                nameError
                ? <p id="errorMsg">Name must be at least 3 characters!</p>
                : null
            }
            <input className={nameError ? classes : ''} type='text' id="fullname" onBlur={onBlur}/>
            <label>Please enter your email</label>
            {
                emailError
                ? <p id="errorMsg">Invalid email address!</p>
                : null
            }
            <input className={emailError ? classes : ''} type='email' id="email" onBlur={onBlur}/>
            <label>Please enter your password</label>
            {
                passError
                ? <p id="errorMsg">Password must be at least 8 characters!</p>
                : null
            }
            <input ref={passRef} className={passError ? classes : ''} type='password' id="password" onBlur={onBlur}/>
            <label>Please confirm your password</label>
            {
                confPassError
                ? <p id="errorMsg">Passwords must match!</p>
                : null
            }
            <input className={confPassError ? classes : ''} type='password' id="confPassword" onBlur={onBlur}/>
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

        dispatcher(signInWithEmail({ email: email.value, password: password.value }));
    }

    const onBlur = (event) => {
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
            <label>Please enter your email</label>
            {
                emailError
                ? <p id="errorMsg">Invalid email address!</p>
                : null
            }
            <input className={emailError ? classes : ''} onBlur={onBlur} type='email' id="email"/>
            <label>Please enter your password</label>
            {
                passError
                ? <p id="errorMsg">Password must be at least 8 characters!</p>
                : null
            }
            <input className={passError ? classes: ''} onBlur={onBlur} type='password' id="password"/>
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
