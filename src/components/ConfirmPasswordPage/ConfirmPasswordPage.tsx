import React, { useEffect, useState } from 'react';
import SimpleButton from '../SimpleButton/SimpleButton';
import './ConfirmPasswordPage.scss';

function ConfirmPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userName, setUserName] = useState('');

  const getUserProfileInfo = () => {
    // API Photo d'utilisateur et son nom. ( userName )
  };

  useEffect(() => {
    getUserProfileInfo();
  }, []);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // api + message de succès
    } else {
      setErrorMessage('Les mots de passe ne correspondent pas.');
    }
  };

  return (
    <section className="forget-psw-section">
      <div className="confirm-password-container">
        <h1 className="forget-psw-title"> Nouveau mot de passe:</h1>
        {errorMessage && <p className="error-message-psw">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="psw-forget"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="pswConfirm-forget"
              id="confirmPassword"
              placeholder="Confirmez le nouveau mot de passe"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <SimpleButton label="Envoyer" />
        </form>
      </div>
    </section>
  );
}

export default ConfirmPasswordPage;
