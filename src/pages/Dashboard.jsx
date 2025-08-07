import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <style>
        {`
          .dashboard-bg {
            min-height: 100vh;
            background: #f3f4f6;
            padding: 24px;
            min-width: 100vw; 
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .dashboard-card {
            max-width: 480px;
            margin: 0 auto;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-radius: 16px;
            padding: 24px;
          }
          .dashboard-title {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 16px;
            color: #1f2937;
          }
          .dashboard-desc {
            margin-bottom: 24px;
            color: #4b5563;
          }
          .dashboard-link {
            display: block;
            text-align: center;
            font-weight: 600;
            padding: 12px 0;
            border-radius: 8px;
            color: #fff;
            margin-bottom: 12px;
            text-decoration: none;
            transition: background 0.2s;
          }
          .dashboard-link.surat {
            background: #2563eb;
          }
          .dashboard-link.surat:hover {
            background: #1d4ed8;
          }
          .dashboard-link.artikel {
            background: #16a34a;
          }
          .dashboard-link.artikel:hover {
            background: #15803d;
          }
          .dashboard-link.home {
            background: #64748b;
          }
          .dashboard-link.home:hover {
            background: #334155;
          }
        `}
      </style>
      <div className="dashboard-bg">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Selamat Datang di Dashboard Admin</h1>
          <p className="dashboard-desc">Pilih fitur yang ingin dikelola:</p>
          <Link to="/surat" className="dashboard-link surat">
            📁 Kelola Arsip Surat
          </Link>
          <Link to="/artikel" className="dashboard-link artikel">
            📰 Kelola Artikel
          </Link>
          <Link to="/home" className="dashboard-link home">
            🏠 Lihat Halaman Home Website
          </Link>
        </div>
      </div>
    </>
  )
}
