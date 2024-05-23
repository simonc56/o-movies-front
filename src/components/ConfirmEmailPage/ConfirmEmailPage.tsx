import { Button } from '@mantine/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import './ConfirmEmailPage.scss';

function ConfirmEmailPage() {
  const [emailValue, setEmailValue] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ICI renvoi par mail la page nouveau mot de passe

    setEmailValue('');
  };

  return (
    <section className="forget-email-section">
      <div className="confirm-email-container">
        <h1 className="forget-email-title"> Mot de passe oublié ?</h1>
        <p className="email-text">
          {' '}
          Veuillez entrer votre adresse e-mail. <br /> Nous vous enverrons ensuite un e-mail contenant un lien de
          réinitialisation.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="email-input">
            <input
              type="email"
              className="email-psw-forget"
              placeholder="Votre E-mail"
              value={emailValue}
              onChange={handleEmailChange}
              required
            />
          </div>
          <Button autoContrast>Envoyer</Button>
        </form>
      </div>
    </section>
  );
}

export default ConfirmEmailPage;
