import { Link } from 'react-router-dom';
import { useGetUserPlaylistsQuery } from '../../features/playlistApiSlice';
import { useGetProfileQuery } from '../../features/settingsApiSlice';
import { isoDateToFrench } from '../../utils/utils';
import './ProfilUserPage.scss';

function UserProfilePage() {
  const { data: playlists, isLoading: playlistsAreLoading } = useGetUserPlaylistsQuery();
  const { data: profil, isLoading: profilIsLoading } = useGetProfileQuery();

  // fake information for tested if no logged
  const fakeUser = {
    id: 0,
    firstname: 'Alice',
    lastname: 'Wonderland',
    email: 'alice.wonderland@lapinblanc.com',
    birthdate: '2024-05-14',
    created_at: '2024-05-14',
    count_review: 42,
    count_rating: 103,
  };

  const displayUser = profilIsLoading || !profil ? fakeUser : profil;

  return (
    <div className="user-profile">
      <section className="infos-section">
        <h2 className="welcome-message">Bienvenue, {displayUser.firstname}</h2>
        <h1 className="infosProfil-title">Informations personnelles</h1>

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
            {displayUser.created_at && isoDateToFrench(displayUser.created_at)}
          </p>
          <br />
          <p className="profileDetail">
            <span className="bold-text">Nombre de commentaires:</span> {displayUser.count_review}
          </p>
          <p className="profileDetail">
            <span className="bold-text">Nombre de notes émises:</span> {displayUser.count_rating}
          </p>
          {!playlistsAreLoading && playlists && (
            <p className="profileDetail">
              <span className="bold-text">Nombre de playlists:</span>{' '}
              <Link to="/playlist">
                {playlists.length ? `${playlists.length} playlist${playlists.length > 1 ? 's' : ''}` : 'Aucune'}
              </Link>
            </p>
          )}
        </div>
        <hr className="separator" />
        <h1 className="profileSecurite-Title">Sécurité</h1>

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
      </section>
    </div>
  );
}

export default UserProfilePage;
