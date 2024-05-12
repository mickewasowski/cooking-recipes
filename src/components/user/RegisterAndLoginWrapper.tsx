import {
  RegisterHeader,
  RegisterForm,
  LoginHeader,
  LoginForm,
} from '../../utils/formUtils';

type IProps = {
  isRegister: boolean;
}

/**
 * Wrapper component for Register and Login pages.
 * @param {boolean} isRegister if true the register page will render, if false login page will render
 * @returns {JSX.Element}
 */
function RegisterAndLoginWrapper({ isRegister }: IProps): JSX.Element {
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
