import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart } from '../../store/user/user.action';
import { getSuccessMessage } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import './Register.styles.scss';

type ErrorsType = {
    email?: string;
    fullName?: string;
    confirmPassword?: string;
}

function RegistrationForm() {
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
      <div id='overlay'></div>
      <header>
        <h2>Online Food World</h2>
      </header>
      <main>
        <section className='form-section'>
          <h2>Sign Up!</h2>
          <form onSubmit={handleSubmit}>
            <label>Fullname</label>
            <input type='text' onChange={(e) => setFullName(e.target.value)}/>
            <label>Email</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)}/>
            <input type='submit' value="Register"/>
          </form>
        </section>
      </main>
    </div>
  );
}

export default RegistrationForm;
