import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../lib/superbase-client';

export default function ArtikelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); 
  const [judulEdit, setJudulEdit] = useState('');
  const [isiEdit, setIsiEdit] = useState('');


     const handleUpdate = async (e) => {
        e.preventDefault();
        const { error } = await supabase
          .from('artikel')
          .update({ judul: judulEdit, isi: isiEdit })
          .eq('id', id);

          if(!error){
            alert('Artikel berhasil diperbarui!');
            fetchArtikel(); 
            setEditMode(false);
          } else {
            alert('Gagal memperbarui artikel:', error.message);
          }
    }
    const fetchArtikel = async () => {
      const { data, error } = await supabase
        .from('artikel')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Gagal memuat artikel:', error);
        navigate('/artikel');
        return;
      }

      setArtikel(data);
      setJudulEdit(data.judul);
      setIsiEdit(data.isi);
      setLoading(false);
    };
  useEffect(() => {  
    fetchArtikel();
  }, [id, navigate]);
  if (loading) return <div style={styles.loading}>Memuat artikel...</div>;

  return (
    <div style={styles.container}>
      <article style={styles.article}>
        {editMode ?(
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={judulEdit}
                    onChange={(e) => setJudulEdit(e.target.value)}
                    placeholder="Judul Artikel"
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                />
                <textarea
                    value={isiEdit}
                    onChange={(e) => setIsiEdit(e.target.value)}
                    rows={10}
                    placeholder="Isi Artikel"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                /> 
                <button type="submit" style={{ ...styles.backButton, marginTop: '1rem', background: '#10b981', color: '#fff' }}>
                Simpan Perubahan
                </button>
            </form>
        ):(
            <>
        <h1 style={styles.title}>{artikel.judul}</h1>
        <p style={styles.date}>
          {new Date(artikel.tanggal_publikasi).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div style={styles.content}>
          {artikel.isi.split('\n').map((para, i) => (
            <p key={i} style={styles.paragraph}>
              {para}
            </p>
          ))}
        </div>
        </>
        )}
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ← Kembali ke daftar artikel
        </button>
        <button onClick={() => setEditMode(!editMode)}
          style={{ ...styles.backButton, background: '#eab308', color: '#fff', marginTop: 20}}>
          {editMode ? 'Batalkan Edit' : 'Edit Artikel'}
        </button>
      </article>
    </div>
  );
}

const styles = {
    
  container: {
    width: '100%',
    padding: '2rem 1rem',
    background: '#f9fafb',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  article: {
    width:'100%',
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '700px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  date: {
    fontSize: '0.9rem',
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  content: {
    width: '100%',
    fontSize: '1.05rem',
    lineHeight: '1.75',
    color: '#374151',
    marginBottom: '2rem',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  paragraph: {
    marginBottom: '1rem',
    textAlign: 'justify',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  backButton: {
    backgroundColor: '#e5e7eb',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    color: '#1f2937',
    fontWeight: '500',
    margin: '1rem 1rem',
    transition: 'background-color 0.2s',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
    color: '#6b7280',
  },
};
