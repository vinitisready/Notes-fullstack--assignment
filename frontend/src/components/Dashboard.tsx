import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notesAPI } from '../services/api';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getNotes();
      setNotes(response.data);
    } catch (err: any) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      const response = await notesAPI.createNote(newNote);
      setNotes([...notes, response.data]);
      setNewNote({ title: '', content: '' });
      setShowCreateForm(false);
      setError('');
    } catch (err: any) {
      setError('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    setLoading(true);
    try {
      await notesAPI.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err: any) {
      setError('Failed to delete note');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <span className="logo-text">Dashboard</span>
        </div>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="welcome-card">
        <h2 className="welcome-title">Welcome, {user?.name}!</h2>
        <p className="welcome-email">Email: {user?.email}</p>
      </div>

      <button 
        className="primary-button"
        onClick={() => setShowCreateForm(!showCreateForm)}
        style={{ marginBottom: '1rem' }}
      >
        Create Note
      </button>

      {showCreateForm && (
        <div className="welcome-card" style={{ marginBottom: '1rem' }}>
          <form onSubmit={handleCreateNote}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="form-input"
                placeholder="Note content"
                rows={4}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                required
                style={{ resize: 'vertical' }}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </button>
              <button 
                type="button" 
                className="primary-button" 
                onClick={() => setShowCreateForm(false)}
                style={{ background: '#6b7280' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="notes-section">
        <h3 className="notes-title">Notes</h3>
        
        {loading && <p>Loading...</p>}
        
        {notes.length === 0 && !loading ? (
          <p style={{ color: '#6b7280' }}>No notes yet. Create your first note!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <div>
                <div className="note-title">{note.title}</div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {note.content.substring(0, 100)}
                  {note.content.length > 100 ? '...' : ''}
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteNote(note._id)}
                disabled={loading}
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;