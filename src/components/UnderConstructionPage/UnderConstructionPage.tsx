import { BiError } from 'react-icons/bi';
import './UnderConstructionPage.scss';

function UnderConstructionPage() {
  return (
    <main className="underConstructionPage">
      <BiError className="errorIcon2" />
      <div>
        <h2 className="constructionTitle">Page en construction</h2>
        <p className="constructionText">
          Chers compagnons O'clock, nous travaillons dur pour préparer quelque chose d'incroyable. <br />
          Revenez bientôt pour plus de mises à jour !
        </p>
      </div>
    </main>
  );
}

export default UnderConstructionPage;