import { Link } from 'react-router-dom';
import { actionGetProfil, selectUser } from '../../features/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { useEffect } from 'react';
import { actionFetchUserPlaylists } from '../../features/playlistSlice';
import { isoDateToFrench } from '../../utils/utils';
import './ProfilUserPage.scss';

function UserProfilePage() {
  const user = useAppSelector(selectUser);
  const hasFetchUserPlaylists = useAppSelector((state) => state.playlist.hasFetchUserPlaylists);
  const playlists = useAppSelector((state) => state.playlist.userPlaylists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionGetProfil());
    if (!hasFetchUserPlaylists) dispatch(actionFetchUserPlaylists());
  }, [dispatch]);

  // fake information for tested if no logged
  const fakeUser = {
    logged: true,
    lastname: 'Wonderland',
    firstname: 'Alice',
    birthdate: '20/02/2000',
    email: 'alice.wonderland@lapinblanc.com',
    subscriptionDate: '11/12/2023',
    commentCount: 42,
    ratingCount: 103,
  };

  const displayUser = user.logged ? user : fakeUser;

  return (
    <div className="user-profile">
      <section className="infos-section">
        {displayUser.logged && <h2 className="welcome-message">Bienvenue, {displayUser.firstname}</h2>}
        <h1 className="infosProfil-title">Informations personnelles</h1>
        {displayUser.logged ? (
          <div className="profile-details">
            <p className="profileDetail">
              <span className="bold-text">Nom:</span> {displayUser.lastname}
            </p>
            <p className="profileDetail">
              <span className="bold-text">Prénom:</span> {displayUser.firstname}
            </p>
            <p className="profileDetail">
              <span className="bold-text">Date de naissance:</span> {isoDateToFrench(displayUser.birthdate)}
            </p>
            <p className="profileDetail">
              <span className="bold-text">Date d'inscription:</span>{' '}
              {displayUser.subscriptionDate && isoDateToFrench(displayUser.subscriptionDate)}
            </p>
            <br />
            <p className="profileDetail">
              <span className="bold-text">Nombre de commentaires:</span> {displayUser.commentCount}
            </p>
            <p className="profileDetail">
              <span className="bold-text">Nombre de notes émises:</span> {displayUser.ratingCount}
            </p>
            <p className="profileDetail">
              <span className="bold-text">Nombre de playlists:</span>{' '}
              <Link to="/playlist">
                {playlists.length ? `${playlists.length} playlist${playlists.length > 1 ? 's' : ''}` : 'Aucune'}
              </Link>
            </p>
          </div>
        ) : (
          <p>Aucune information utilisateur disponible</p>
        )}
        <hr className="separator" />
        <h1 className="profileSecurite-Title">Sécurité</h1>
        {displayUser.logged ? (
          <div className="securite-details">
            <p className="profileDetail">
              <span className="bold-text">Email:</span> {displayUser.email}
            </p>
            <p className="profileDetail">
              <span className="bold-text">Votre mot de passe </span>
              n'est pas visible par mesure de sécurité. Pour le changer, cliquez{' '}
              <Link to="/changer-mot-de-passe">ici</Link>.
            </p>
          </div>
        ) : (
          <p>Aucune information utilisateur disponible</p>
        )}
      </section>
    </div>
  );
}

export default UserProfilePage;
