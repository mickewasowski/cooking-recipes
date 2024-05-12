import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart } from '../../store/user/user.action';
import { getSuccessMessage } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { Link } from 'react-router-dom';
import {
  RegisterHeader,
  RegisterForm,
  LoginHeader,
  LoginForm
} from './formUtils';

type ErrorsType = {
    email?: string;
    fullName?: string;
    confirmPassword?: string;
}

type IProps = {
  isRegister: boolean;
}

/**
 * Wrapper component for Register and Login pages.
 * @param {boolean} isRegister if true the register page will render, if false login page will render
 * @returns {JSX.Element}
 */
function RegisterAndLoginWrapper({ isRegister }: IProps): JSX.Element {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector((state: IRootState) => getSuccessMessage(state.user));
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ErrorsType>({});

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newErrors: ErrorsType = {};
    if (!isValidEmail(email)) newErrors.email = 'Invalid email address';
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle registration logic here
      dispatcher(registerStart({ email, fullName, password }));
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  }, [successMessage]);

  return (
    <div className='register-wrapper'>
      <div className='left-wrapper'>
        <h2>Online Food World</h2>
      </div>
      <section className='form-section'>
        <div className='form-heading'>
          {
            isRegister
            ? <RegisterHeader />
            : <LoginHeader />
          }
        </div>
        <div className='form-wrapper'>
          {
            isRegister
            ? <RegisterForm />
            : <LoginForm />
          }
        </div>
      </section>
    </div>
  );
}

export default RegisterAndLoginWrapper;
