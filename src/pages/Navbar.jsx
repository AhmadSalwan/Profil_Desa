import './styles/Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Desa Abbokongang</h1>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/profil">Profil</Link></li>
          <li><Link to="/infografis">Artikel</Link></li>
          <li><Link to="/about">Tentang</Link></li>
        </ul>
      </div>
    </nav>
  );
}
