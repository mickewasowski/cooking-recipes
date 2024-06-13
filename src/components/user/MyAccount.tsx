import React, { useEffect, useState } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { validateInputValue } from './utils';
import { fetchUserEdit } from '../../store/user/user.thunk';

function MyAccount() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IRootState) => getCurrentUser(state.user));
  const [userInfo, setUserInfo] = useState({
    email: currentUser?.email ?? '',
    fullName: currentUser?.fullName ?? '',
    password: '',
    newPassword: ''
  });
  const [userInfoErrors, setUserInfoErrors] = useState({
    email: false,
    fullName: false,
    password: false,
    newPassword: false
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    const { email, fullName, password, newPassword } = userInfoErrors;
    const isDisabled = !!(email || fullName || password || newPassword);
    setIsSubmitDisabled(isDisabled);
  }, [userInfoErrors]);

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, password: '', newPassword: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name: type } = e.target;
    const isValid = validateInputValue(value, type);

    if (!isValid || (type === 'newPassword' && userInfo.password !== value)) {
      setUserInfoErrors({ ...userInfoErrors, [type]: !isValid });
      return;
    }

    setUserInfoErrors({ ...userInfoErrors, [type]: !isValid });
    setUserInfo({ ...userInfo, [type]: value });
  };

  const handleUpdateUser = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isSubmitDisabled && currentUser && userInfo.password) {
      const data = {
        email: userInfo.email,
        fullName: userInfo.fullName,
        password: userInfo.password,
        ...(userInfo.newPassword && {newPassword: userInfo.newPassword})
      };
      dispatch(fetchUserEdit({ ...data, token: currentUser.token }));
    }
  }

  return (
    <div className='account-settings-container'>
      <div className='settings-heading'>
        <h1>Settings</h1>
      </div>
      <div className='settings-body'>
        {/* <div className='settings-menu'>
          <p className='active'>User settings</p>
        </div> */}
        <div className='user-settings'>
          <p>When updating any of the fields bellow the password field is always required. Please enter your current password in the password field prior to changing the new password.
            Only fill the information you want to change.
          </p>
          <form onSubmit={handleUpdateUser}>
            <div>
              <label>Fullname:</label>
              <input defaultValue={currentUser?.fullName} type='text' name='fullName' className={userInfoErrors.fullName ? 'error' : ''} onChange={handleChange}/>
            </div>
            <div>
              <label>Email:</label>
              <input disabled defaultValue={currentUser?.email} type='email' name='email' className={userInfoErrors.email ? 'error' : ''} /> 
              {/* //onChange={handleChange} */}
            </div>
            <div id='password-container'>
              <label>Password: *</label>
              <input type='password' name='password' className={userInfoErrors.password ? 'error' : ''} onChange={handleChange}/>
              {
                userInfoErrors.password
                ? (
                  <p id='passwordDescription'>Password must be between 6 and 16 characters! Must contain uppercase and lowercase characters! Must contain at least one number and one special character.</p>
                )
                : null
              }
            </div>
            <div>
              <label>New password:</label>
              <input type='password' name='newPassword' className={userInfoErrors.newPassword ? 'error' : ''} onChange={handleChange}/>
            </div>
            <div className='buttons'>
              <button className='clear-btn' onClick={handleCancel}>Cancel</button>
              <button className='submit-btn' type='submit' disabled={isSubmitDisabled}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const EnhancedComponent = isAuth(MyAccount);

export default EnhancedComponent;
