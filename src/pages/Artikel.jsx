import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../lib/superbase-client';

export default function Artikel() {
  const [artikels, setArtikels] = useState([]);
  const navigate = useNavigate();

    const fetchData = async () => {
        const { data, error } = await supabase.from('artikel').select('*').order('tanggal_publikasi', { ascending: false });
     if (error) {
        console.error("Error memuat artikel:", error);
        alert("Gagal memuat data artikel.");
      } 
     else {
        console.log("Artikel berhasil dimuat:", data);
      }
      setArtikels(data);
    }

    useEffect(() => {
        fetchData()
    }, [])


  // Fungsi hapus artikel
  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus artikel ini?')) {
      const { error } = await supabase.from('artikel').delete().eq('id', id);
      if (!error) setArtikels(artikels.filter(a => a.id !== id));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: '#f3f4f6',
        boxSizing: 'border-box',
        padding: '32px 0'
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginBottom: 24,
          color: '#1f2937'
        }}>
          Daftar Artikel
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => navigate('/artikel/tambah')}
          >
            + Tambah Artikel
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {artikels.length === 0 ? (
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              textAlign: 'center',
              color: '#888',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              Belum ada artikel.
            </div>
          ) : (
            artikels.map(art => (
              <div
                key={art.id}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <Link to={`/artikel/${art.id}`} style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none' }}>
                    {art.judul}
                  </Link>
                  <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0 0' }}>
                    {art.tanggal_publikasi && new Date(art.tanggal_publikasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  <p style={{ color: '#4b5563', fontSize: 15, marginTop: 8, maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {art.isi}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => handleDelete(art.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
