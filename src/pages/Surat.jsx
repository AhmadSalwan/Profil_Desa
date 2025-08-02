import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Tambahkan import ini
import './styles/Dashboard.css'
import supabase from '../lib/superbase-client'

export default function Surat() {
    const [newSurat, setNewSurat] = useState({
        tanggal_surat: '',
        nomor_surat: '',
        perihal: '',
        keterangan: '',
        pengirim: '',
        file_url: ''
    })

    const [surat, setSurat] = useState([])
    const [editSurat, setEditSurat] = useState(null) // Untuk data yang diedit
    const [showEditModal, setShowEditModal] = useState(false) // Untuk menampilkan modal edit
    const [file, setFile] = useState (null) 

    const fetchSurat = async () => {
        const { error, data } = await supabase.from('Surat')
            .select("*")
            .order('created_at', { ascending: true })
        if (error) {
            console.error('Error fetching data:', error)
            return
        }
        setSurat(data)
    }

    useEffect(() => {
        fetchSurat()
    }, [])

    const handleFileChange = (e) =>{
        if(e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let fileUrl = null
        if(file){
            fileUrl = await uploadFile(file)
        }
        const { error } = await supabase
        .from('Surat')
        .insert( {...newSurat, file_url: fileUrl})
        .select()
        .single()
        if (error) {
            alert('Error inserting data: ' + error.message)
            return
        } else {
            alert('Data inserted successfully!')
            setNewSurat({
                tanggal_surat: '',
                nomor_surat: '',
                perihal: '',
                keterangan: '',
                pengirim: '',
                file_url: ''
            })
            fetchSurat()
        }
    }

    const deleteSurat = async (id) => {
        const { error } = await supabase.from('Surat').delete().eq('id', id)
        if (error) {
            alert('Error deleting data: ' + error.message)
            return
        }
        fetchSurat()
    }

    // Fungsi untuk membuka modal edit
    const openEditModal = (item) => {
        setEditSurat(item)
        setShowEditModal(true)
    }

    // Fungsi untuk update data surat
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { error } = await supabase.from('Surat')
            .update(editSurat)
            .eq('id', editSurat.id)
        if (error) {
            alert('Error updating data: ' + error.message)
            return
        }
        setShowEditModal(false)
        setEditSurat(null)
        fetchSurat()
    }

    const uploadFile = async (file) => {
        const filepath = `surat/${Date.now()}_${file.name}`
        const {error} = await supabase.storage
        .from('surat')
        .upload(filepath, file)

        if(error){
            alert('Error uploading file: ' + error.message)
            return null
        }

        const {data} = await supabase.storage.from('surat')
        .getPublicUrl(filepath)
        return data.publicUrl

    }

    return (
        <div className="page-bg" style={{ minHeight: '100vh', minWidth: '100vw', boxSizing: 'border-box', position: 'relative' }}>
            {/* Tombol kembali ke dashboard */}
            <Link
                to="/dashboard"
                style={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    background: '#64748b',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
            >
                ← Kembali ke Dashboard
            </Link>
            
            <form
                onSubmit={handleSubmit}
                className="card"
                style={{ marginBottom: 32, width: '100%', maxWidth: 480, color: "#000" }}
            >
                <h2 className="title">Form Arsip Surat</h2>
                <div>
                    <label>Tanggal Surat</label>
                    <input
                        type="date"
                        className="input"
                        onChange={e =>
                            setNewSurat((prev) => ({ ...prev, tanggal_surat: e.target.value }))}
                        value={newSurat.tanggal_surat}
                    />
                </div>
                <div>
                    <label>Nomor Surat</label>
                    <input
                        type="text"
                        className="input"
                        placeholder='Nomor Surat'
                        onChange={e =>
                            setNewSurat((prev) => ({ ...prev, nomor_surat: e.target.value }))}
                        value={newSurat.nomor_surat}
                    />
                </div>
                <div>
                    <label>Perihal</label>
                    <input
                        type="text"
                        className="input"
                        placeholder='Perihal Surat'
                        onChange={e => setNewSurat((prev) => ({ ...prev, perihal: e.target.value }))}
                        value={newSurat.perihal}
                    />
                </div>
                <div>
                    <label>Keterangan</label>
                    <input
                        type="text"
                        className="input"
                        placeholder='Keterangan Surat'
                        onChange={e => setNewSurat((prev) => ({ ...prev, keterangan: e.target.value }))}
                        value={newSurat.keterangan}
                    />
                </div>
                <div>
                    <label>Pengirim</label>
                    <input
                        type="text"
                        className="input"
                        placeholder='Pengirim Surat'
                        onChange={e => setNewSurat((prev) => ({ ...prev, pengirim: e.target.value }))}
                        value={newSurat.pengirim}
                    />
                </div>
                <div>
                    <label>File surat</label>
                    <input
                        type="file"
                        className="input"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="button">
                    Simpan
                </button>
            </form>

            <div className="card" style={{ width: '100%', maxWidth: 900, marginTop: 16 }}>
                <h2 className="title">Daftar Arsip Surat</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#000' }}>
                    <thead>
                        <tr style={{ background: '#f3f4f6', color: '#000' }}>
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Tanggal</th>
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Nomor</th>
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Perihal</th>
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Keterangan</th>
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Pengirim</th>
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>File</th> {/* Tambahkan ini */}
                            <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surat.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: 16 }}>
                                    Belum ada arsip surat.
                                </td>
                            </tr>
                        ) : (
                            surat.map((item, idx) => {
                                // Format tanggal: DD/MM/YYYY
                                let tgl = '';
                                if (item.tanggal_surat) {
                                    const d = new Date(item.tanggal_surat);
                                    tgl = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                }
                                return (
                                    <tr key={item.id || idx} style={{ color: '#000' }}>
                                        <td style={{ padding: 8, color: '#000' }}>{tgl}</td>
                                        <td style={{ padding: 8, color: '#000' }}>{item.nomor_surat}</td>
                                        <td style={{ padding: 8, color: '#000' }}>{item.perihal}</td>
                                        <td style={{ padding: 8, color: '#000' }}>{item.keterangan}</td>
                                        <td style={{ padding: 8, color: '#000' }}>{item.pengirim}</td>
                                        <td style={{ padding: 8, color: '#000' }}>
                                            {item.file_url ? (
                                                <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                                                    Lihat File
                                                </a>
                                            ) : (
                                                <span style={{ color: '#888' }}>-</span>
                                            )}
                                        </td>
                                        <td style={{ padding: 8 }}>
                                            <button
                                                className="button"
                                                style={{
                                                    background: '#16a34a',
                                                    color: '#fff',
                                                    padding: '6px 12px',
                                                    fontSize: '0.9rem',
                                                    marginRight: 8
                                                }}
                                                onClick={() => openEditModal(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="button"
                                                style={{
                                                    background: '#dc2626',
                                                    color: '#fff',
                                                    padding: '6px 12px',
                                                    fontSize: '0.9rem'
                                                }}
                                                onClick={() => deleteSurat(item.id)}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Edit Surat */}
            {showEditModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <form
                        className="card"
                        style={{ maxWidth: 400, width: '100%', position: 'relative' }}
                        onSubmit={handleUpdate}
                    >
                        <h2 className="title">Edit Surat</h2>
                        <div>
                            <label>Tanggal Surat</label>
                            <input
                                type="date"
                                className="input"
                                value={editSurat?.tanggal_surat || ''}
                                onChange={e =>
                                    setEditSurat((prev) => ({ ...prev, tanggal_surat: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Nomor Surat</label>
                            <input
                                type="text"
                                className="input"
                                value={editSurat?.nomor_surat || ''}
                                onChange={e =>
                                    setEditSurat((prev) => ({ ...prev, nomor_surat: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Perihal</label>
                            <input
                                type="text"
                                className="input"
                                value={editSurat?.perihal || ''}
                                onChange={e =>
                                    setEditSurat((prev) => ({ ...prev, perihal: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Keterangan</label>
                            <input
                                type="text"
                                className="input"
                                value={editSurat?.keterangan || ''}
                                onChange={e =>
                                    setEditSurat((prev) => ({ ...prev, keterangan: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Pengirim</label>
                            <input
                                type="text"
                                className="input"
                                value={editSurat?.pengirim || ''}
                                onChange={e =>
                                    setEditSurat((prev) => ({ ...prev, pengirim: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button type="submit" className="button" style={{ background: '#16a34a' }}>
                                Simpan Perubahan
                            </button>
                            <button
                                type="button"
                                className="button"
                                style={{ background: '#64748b' }}
                                onClick={() => setShowEditModal(false)}
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}