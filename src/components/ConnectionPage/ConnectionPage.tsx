import { ChangeEvent, useState } from 'react';
import './ConnectionPage.scss';

function ConnectionPage() {
  const [emailValue, setEmailValue] = useState('');

  const [passwordValue, setPasswordValue] = useState('');

  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  }

  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  }

  return (<div>
    <h1>Connection</h1>
    <p>
     Connectez-vous pour accéder à votre espace personnel.
    </p>
    
    <form className="mail">
      <input type="email" placeholder="marie@hotmail.com" value={emailValue} onChange={emailChange} />
    </form>
    <form className="mdp">
      <input type="password" placeholder="Mot de passe" value={passwordValue} onChange={passwordChange} />
    </form>
  </div>

  )
}


export default ConnectionPage;

