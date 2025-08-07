import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Surat from './pages/Surat'
import Artikel from './pages/Artikel'
import Addartikel from './pages/Addartikel'
import  ArtikelDetail  from './pages/ArtikelDetail';
import EditArtikel from './pages/EditArtikel';
import Home from './pages/Home'
import Navbar  from './pages/Navbar'
// import './App.css'


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/surat" element={<Surat />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/tambah" element={<Addartikel />} />
        <Route path="/artikel/:id" element={<ArtikelDetail />} />
        <Route path="/artikel/edit/:id" element={<EditArtikel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
