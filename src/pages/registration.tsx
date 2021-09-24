import RegistrationForm from "../components/registration-form";
import styles from './login.module.css';

export const RegistrationPage = () => {
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.content }>
        <RegistrationForm />
      </div>
    </div>
  )
}