import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/superbase-client'

export default function ArtikelTambah() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    judul: '',
    isi: '',
    tanggal_publikasi: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('artikel').insert([form])

    if (error) {
      alert('Gagal menambahkan artikel:', error.message)
    } else {
      alert('Artikel berhasil ditambahkan!')
      navigate('/artikel') // Kembali ke daftar artikel
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: 20 }}>
        Tambah Artikel Baru
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label>Judul</label>
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            required
            className="input"
            placeholder="Judul artikel"
          />
        </div>

        <div>
          <label>Tanggal Publikasi</label>
          <input
            type="date"
            name="tanggal_publikasi"
            value={form.tanggal_publikasi}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label>Isi</label>
          <textarea
            name="isi"
            value={form.isi}
            onChange={handleChange}
            required
            className="input"
            rows="6"
            placeholder="Isi lengkap artikel"
          />
        </div>

        <div>
          <button type="submit" disabled={loading} className="button bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}
