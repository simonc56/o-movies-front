import { BiError } from 'react-icons/bi';
import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <main className="notFoundPage">
      <BiError className="errorIcon" />
      <div>
        <h2>Erreur 404</h2>
        <p>Page introuvable</p>
      </div>
    </main>
  );
}

export default NotFoundPage;
