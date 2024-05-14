import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>2024 O'movies.inc. All rights reserved.</p>
        <Link to="/contact" className="footer-link">
          Contact{' '}
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
