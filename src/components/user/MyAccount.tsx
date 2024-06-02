import React, { useState } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';
import { IRootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { editUserStart } from '../../store/user/user.action';

function MyAccount() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IRootState) => getCurrentUser(state.user));
  const [userInfo, setUserInfo] = useState({ email: currentUser?.email, fullName: currentUser?.fullName, password: null, newPassword: null });

  const handleCancel = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, password: null, newPassword: null });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(editUserStart({ ...userInfo, token: currentUser?.token }));
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
          <p>When updating any of the fields bellow the password field is always required.
            Only fill the information you want to change.
          </p>
          <form onSubmit={handleUpdateUser}>
            <div>
              <label>Fullname:</label>
              <input type='text' name='fullName' />
            </div>
            <div>
              <label>Email:</label>
              <input type='email' name='email' />
            </div>
            <div>
              <label>Password: *</label>
              <input type='password' name='password' />
            </div>
            <div>
              <label>New password:</label>
              <input type='password' name='newPassword' />
            </div>
            <div className='buttons'>
              <button className='clear-btn' onClick={handleCancel}>Cancel</button>
              <button className='submit-btn' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const EnhancedComponent = isAuth(MyAccount);

export default EnhancedComponent;
