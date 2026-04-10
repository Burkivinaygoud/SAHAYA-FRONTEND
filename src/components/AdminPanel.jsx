import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function AdminPanel({ open, onClose }) {
  const {
    addEvent, deleteEvent, updateEvent, eventsData,
    addGalleryImage, deleteGalleryImage, updateGalleryImage, galleryData,
    addProgram, deleteProgram, updateProgram, programsData,
    addProgramDone, deleteProgramDone, updateProgramDone, programsDoneData,
    addTeamMember, deleteTeamMember, updateTeamMember, teamData,
    messagesData, deleteMessage, clearAllMessages,
    updateStats, stats,
  } = useContext(DataContext);

  const [activeTab, setActiveTab] = useState('events');
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Event state
  const [eventForm, setEventForm] = useState({ title: '', date: '', desc: '', loc: '', time: '' });
  // Gallery state
  const [galleryForm, setGalleryForm] = useState({ url: '', caption: '' });
  // Program state
  const [programForm, setProgramForm] = useState({ title: '', cat: 'Education', desc: '', img: '' });
  // Programs Done state
  const [programDoneForm, setProgramDoneForm] = useState({ title: '', description: '', photos: [], date: '' });
  // Team state
  const [teamForm, setTeamForm] = useState({ name: '', role: '', img: '', type: 'committee', quote: '' });
  // Stats state
  const [statsForm, setStatsForm] = useState({ years: '', children: '', events: '', volunteers: '' });

  // Edit index states
  const [editEventIdx, setEditEventIdx] = useState(null);
  const [editGalleryIdx, setEditGalleryIdx] = useState(null);
  const [editProgramIdx, setEditProgramIdx] = useState(null);
  const [editProgramDoneIdx, setEditProgramDoneIdx] = useState(null);
  const [editTeamInfo, setEditTeamInfo] = useState(null);

  const readFile = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

  const handleGalleryFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await readFile(file);
    setGalleryForm({ ...galleryForm, url: base64 });
  };

  const handleProgramFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await readFile(file);
    setProgramForm({ ...programForm, img: base64 });
  };

  const handleTeamFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await readFile(file);
    setTeamForm({ ...teamForm, img: base64 });
  };

  const handleProgramsDoneFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const base64s = await Promise.all(files.map(readFile));
    setProgramDoneForm({ ...programDoneForm, photos: [...programDoneForm.photos, ...base64s] });
  };

  const handleLogin = () => {
    if (loginData.user === 'admin' && loginData.pass === 'sahaya2008') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const doLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ user: '', pass: '' });
    setLoginError(false);
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date) return;
    addEvent(eventForm);
    setEventForm({ title: '', date: '', desc: '', loc: '', time: '' });
    showSuccess('Event added successfully!');
  };

  const handleAddGallery = () => {
    if (!galleryForm.url) return;
    addGalleryImage(galleryForm);
    setGalleryForm({ url: '', caption: '' });
    showSuccess('Image added to gallery!');
    // reset file input
    const fi = document.getElementById('gallery-file-input');
    if (fi) fi.value = '';
  };

  const handleAddProgram = () => {
    if (!programForm.title || !programForm.desc) return;
    addProgram(programForm);
    setProgramForm({ title: '', cat: 'Education', desc: '', img: '' });
    showSuccess('Program added!');
    const fi = document.getElementById('program-file-input');
    if (fi) fi.value = '';
  };

  const handleRemovePhotoFromProgramDone = (index) => {
    const updatedPhotos = programDoneForm.photos.filter((_, i) => i !== index);
    setProgramDoneForm({ ...programDoneForm, photos: updatedPhotos });
  };

  const handleAddProgramDone = () => {
    if (!programDoneForm.title || !programDoneForm.description || !programDoneForm.date || programDoneForm.photos.length === 0) return;
    addProgramDone({ title: programDoneForm.title, description: programDoneForm.description, photos: programDoneForm.photos, date: programDoneForm.date });
    setProgramDoneForm({ title: '', description: '', photos: [], date: '' });
    showSuccess('Program completed record added!');
    const fi = document.getElementById('programdone-file-input');
    if (fi) fi.value = '';
  };

  const handleAddTeamMember = () => {
    if (!teamForm.name || !teamForm.role) return;
    addTeamMember(teamForm);
    setTeamForm({ name: '', role: '', img: '', type: 'committee', quote: '' });
    showSuccess('Team member added!');
    const fi = document.getElementById('team-file-input');
    if (fi) fi.value = '';
  };

  const handleUpdateStats = () => {
    updateStats({
      years: parseInt(statsForm.years) || stats.years,
      children: parseInt(statsForm.children) || stats.children,
      events: parseInt(statsForm.events) || stats.events,
      volunteers: parseInt(statsForm.volunteers) || stats.volunteers,
    });
    setStatsForm({ years: '', children: '', events: '', volunteers: '' });
    showSuccess('Stats updated!');
  };

  // Edit: Events
  const startEditEvent = (i) => { setEditEventIdx(i); setEventForm({ ...eventsData[i] }); };
  const cancelEditEvent = () => { setEditEventIdx(null); setEventForm({ title: '', date: '', desc: '', loc: '', time: '' }); };
  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.date) return;
    updateEvent(editEventIdx, eventForm);
    cancelEditEvent();
    showSuccess('Event updated!');
  };

  // Edit: Gallery
  const startEditGallery = (i) => { setEditGalleryIdx(i); setGalleryForm({ ...galleryData[i] }); };
  const cancelEditGallery = () => { setEditGalleryIdx(null); setGalleryForm({ url: '', caption: '' }); const fi = document.getElementById('gallery-file-input'); if (fi) fi.value = ''; };
  const handleSaveGallery = () => {
    if (!galleryForm.url) return;
    updateGalleryImage(editGalleryIdx, galleryForm);
    cancelEditGallery();
    showSuccess('Image updated!');
  };

  // Edit: Programs
  const startEditProgram = (i) => { setEditProgramIdx(i); setProgramForm({ ...programsData[i] }); };
  const cancelEditProgram = () => { setEditProgramIdx(null); setProgramForm({ title: '', cat: 'Education', desc: '', img: '' }); const fi = document.getElementById('program-file-input'); if (fi) fi.value = ''; };
  const handleSaveProgram = () => {
    if (!programForm.title || !programForm.desc) return;
    updateProgram(editProgramIdx, programForm);
    cancelEditProgram();
    showSuccess('Program updated!');
  };

  // Edit: Programs Done
  const startEditProgramDone = (i) => {
    const p = programsDoneData[i];
    setEditProgramDoneIdx(i);
    setProgramDoneForm({ title: p.title, description: p.description, photos: p.photos || [], date: p.date || '' });
  };
  const cancelEditProgramDone = () => { setEditProgramDoneIdx(null); setProgramDoneForm({ title: '', description: '', photos: [], date: '' }); const fi = document.getElementById('programdone-file-input'); if (fi) fi.value = ''; };
  const handleSaveProgramDone = () => {
    if (!programDoneForm.title || !programDoneForm.description) return;
    updateProgramDone(editProgramDoneIdx, { title: programDoneForm.title, description: programDoneForm.description, photos: programDoneForm.photos, date: programDoneForm.date });
    cancelEditProgramDone();
    showSuccess('Program updated!');
  };

  // Edit: Team
  const startEditTeamMember = (type, idx) => { setEditTeamInfo({ type, idx }); setTeamForm({ ...teamData[type][idx] }); };
  const cancelEditTeamMember = () => { setEditTeamInfo(null); setTeamForm({ name: '', role: '', img: '', type: 'committee', quote: '' }); const fi = document.getElementById('team-file-input'); if (fi) fi.value = ''; };
  const handleSaveTeamMember = () => {
    if (!teamForm.name || !teamForm.role) return;
    updateTeamMember(editTeamInfo.type, editTeamInfo.idx, teamForm);
    cancelEditTeamMember();
    showSuccess('Team member updated!');
  };

  if (!open) return null;

  return (
    <div id="admin-panel" className="open">
      <div className="admin-header">
        <h2>⚙️ Admin Panel</h2>
        <button className="admin-close" onClick={onClose}>✕</button>
      </div>

      {!isLoggedIn ? (
        <div id="admin-login" style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <h3 style={{ color: 'white', fontFamily: 'Cormorant Garamond,serif', fontSize: '1.8rem', marginBottom: '8px' }}>Admin Login</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: '28px' }}>Enter credentials to manage the website</p>
            <div className="admin-input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="admin"
                value={loginData.user}
                onChange={(e) => setLoginData({ ...loginData, user: e.target.value })}
              />
            </div>
            <div className="admin-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.pass}
                onChange={(e) => setLoginData({ ...loginData, pass: e.target.value })}
              />
            </div>
            <button className="admin-btn" style={{ width: '100%', marginTop: '8px' }} onClick={handleLogin}>Login →</button>
            {loginError && <p style={{ color: '#ff6b7a', fontSize: '0.82rem', marginTop: '10px' }}>Invalid credentials. Try admin / sahaya2008</p>}
          </div>
        </div>
      ) : (
        <div className="admin-body">
          <div className="admin-tabs">
            <button className={`admin-tab ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>📅 Events</button>
            <button className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>🖼️ Gallery</button>
            <button className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>📊 Stats</button>
            <button className={`admin-tab ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>📋 Programs</button>
            <button className={`admin-tab ${activeTab === 'programsDone' ? 'active' : ''}`} onClick={() => setActiveTab('programsDone')}>✓ Programs Done</button>
            <button className={`admin-tab ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>👥 Team</button>
            <button className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>💬 Messages</button>
            <button className="admin-btn" style={{ marginLeft: 'auto' }} onClick={doLogout}>Logout</button>
          </div>

          {activeTab === 'events' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>{editEventIdx !== null ? 'Edit Event' : 'Add Upcoming Event'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-input-group">
                    <label>Event Title</label>
                    <input type="text" placeholder="Event name" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
                  </div>
                  <div className="admin-input-group">
                    <label>Date</label>
                    <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                  </div>
                </div>
                <div className="admin-input-group">
                  <label>Description</label>
                  <textarea placeholder="Short description..." value={eventForm.desc} onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })}></textarea>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-input-group">
                    <label>Location</label>
                    <input type="text" placeholder="e.g. HITAM Campus" value={eventForm.loc} onChange={(e) => setEventForm({ ...eventForm, loc: e.target.value })} />
                  </div>
                  <div className="admin-input-group">
                    <label>Time</label>
                    <input type="time" value={eventForm.time} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} />
                  </div>
                </div>
                {editEventIdx !== null ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn" onClick={handleSaveEvent}>Save Changes</button>
                    <button className="admin-btn" style={{ background: '#666' }} onClick={cancelEditEvent}>Cancel</button>
                  </div>
                ) : (
                  <button className="admin-btn" onClick={handleAddEvent}>Add Event</button>
                )}
                {successMsg && <div className="admin-success" style={{ display: 'block' }}>✓ {successMsg}</div>}
              </div>
              <div className="admin-card">
                <h3>Current Events</h3>
                <div className="admin-list">
                  {eventsData.map((e, i) => (
                    <div key={i} className="admin-list-item">
                      <span>{e.title} — {e.date}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => startEditEvent(i)}>Edit</button>
                        <button onClick={() => deleteEvent(i)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>{editGalleryIdx !== null ? 'Edit Gallery Image' : 'Add Gallery Image'}</h3>
                <div className="admin-input-group">
                  <label>{editGalleryIdx !== null ? 'Replace Photo (optional)' : 'Upload Photo'}</label>
                  <input id="gallery-file-input" type="file" accept="image/*" onChange={handleGalleryFileChange} />
                  {galleryForm.url && <img src={galleryForm.url} alt="preview" style={{ marginTop: '8px', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }} />}
                </div>
                <div className="admin-input-group">
                  <label>Caption (optional)</label>
                  <input type="text" placeholder="Image description..." value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} />
                </div>
                {editGalleryIdx !== null ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn" onClick={handleSaveGallery}>Save Changes</button>
                    <button className="admin-btn" style={{ background: '#666' }} onClick={cancelEditGallery}>Cancel</button>
                  </div>
                ) : (
                  <button className="admin-btn" onClick={handleAddGallery}>Add to Gallery</button>
                )}
                {successMsg && <div className="admin-success" style={{ display: 'block' }}>✓ {successMsg}</div>}
              </div>
              <div className="admin-card">
                <h3>Gallery Items</h3>
                <div className="admin-list">
                  {galleryData.map((g, i) => (
                    <div key={i} className="admin-list-item">
                      <img src={g.url} alt={g.caption} style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px', marginRight: '8px', flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{g.caption || `Image ${i + 1}`}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => startEditGallery(i)}>Edit</button>
                        <button onClick={() => deleteGalleryImage(i)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>Update Impact Numbers</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-input-group">
                    <label>Years of Service</label>
                    <input type="number" placeholder={stats.years} value={statsForm.years} onChange={(e) => setStatsForm({ ...statsForm, years: e.target.value })} />
                  </div>
                  <div className="admin-input-group">
                    <label>Children Impacted</label>
                    <input type="number" placeholder={stats.children} value={statsForm.children} onChange={(e) => setStatsForm({ ...statsForm, children: e.target.value })} />
                  </div>
                  <div className="admin-input-group">
                    <label>Events Conducted</label>
                    <input type="number" placeholder={stats.events} value={statsForm.events} onChange={(e) => setStatsForm({ ...statsForm, events: e.target.value })} />
                  </div>
                  <div className="admin-input-group">
                    <label>Volunteers</label>
                    <input type="number" placeholder={stats.volunteers} value={statsForm.volunteers} onChange={(e) => setStatsForm({ ...statsForm, volunteers: e.target.value })} />
                  </div>
                </div>
                <button className="admin-btn" onClick={handleUpdateStats}>Update Stats</button>
                {successMsg && <div className="admin-success" style={{ display: 'block' }}>✓ {successMsg}</div>}
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>{editProgramIdx !== null ? 'Edit Program' : 'Add Program'}</h3>
                <div className="admin-input-group">
                  <label>Program Title</label>
                  <input type="text" placeholder="Program name" value={programForm.title} onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })} />
                </div>
                <div className="admin-input-group">
                  <label>Category</label>
                  <select value={programForm.cat} onChange={(e) => setProgramForm({ ...programForm, cat: e.target.value })}>
                    <option>Education</option>
                    <option>Community</option>
                    <option>Outreach</option>
                    <option>Health</option>
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Description</label>
                  <textarea placeholder="Program description..." value={programForm.desc} onChange={(e) => setProgramForm({ ...programForm, desc: e.target.value })}></textarea>
                </div>
                <div className="admin-input-group">
                  <label>Upload Photo</label>
                  <input id="program-file-input" type="file" accept="image/*" onChange={handleProgramFileChange} />
                  {programForm.img && <img src={programForm.img} alt="preview" style={{ marginTop: '8px', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }} />}
                </div>
                {editProgramIdx !== null ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn" onClick={handleSaveProgram}>Save Changes</button>
                    <button className="admin-btn" style={{ background: '#666' }} onClick={cancelEditProgram}>Cancel</button>
                  </div>
                ) : (
                  <button className="admin-btn" onClick={handleAddProgram}>Add Program</button>
                )}
                {successMsg && <div className="admin-success" style={{ display: 'block' }}>✓ {successMsg}</div>}
              </div>
              <div className="admin-card">
                <h3>Current Programs</h3>
                <div className="admin-list">
                  {programsData.map((p, i) => (
                    <div key={i} className="admin-list-item">
                      <span>{p.title} ({p.cat})</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => startEditProgram(i)}>Edit</button>
                        <button onClick={() => deleteProgram(i)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>{editTeamInfo ? 'Edit Team Member' : 'Add Team Member'}</h3>
                <div className="admin-input-group">
                  <label>Team Category</label>
                  <select value={teamForm.type} disabled={!!editTeamInfo} onChange={(e) => setTeamForm({ ...teamForm, type: e.target.value })}>
                    <option value="founder">Founder</option>
                    <option value="committee">Working Committee</option>
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Member Name</label>
                  <input type="text" placeholder="Full name" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} />
                </div>
                <div className="admin-input-group">
                  <label>Role/Position</label>
                  <input type="text" placeholder="e.g. President, Vice President" value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} />
                </div>
                <div className="admin-input-group">
                  <label>Upload Photo</label>
                  <input id="team-file-input" type="file" accept="image/*" onChange={handleTeamFileChange} />
                  {teamForm.img && <img src={teamForm.img} alt="preview" style={{ marginTop: '8px', width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />}
                </div>
                <div className="admin-input-group">
                  <label>Quote/Message (for founder, optional)</label>
                  <textarea placeholder="Inspirational quote or message..." value={teamForm.quote} onChange={(e) => setTeamForm({ ...teamForm, quote: e.target.value })}></textarea>
                </div>
                {editTeamInfo ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn" onClick={handleSaveTeamMember}>Save Changes</button>
                    <button className="admin-btn" style={{ background: '#666' }} onClick={cancelEditTeamMember}>Cancel</button>
                  </div>
                ) : (
                  <button className="admin-btn" onClick={handleAddTeamMember}>Add Team Member</button>
                )}
                {successMsg && <div className="admin-success" style={{ display: 'block' }}>✓ {successMsg}</div>}
              </div>
              <div className="admin-card">
                <h3>Current Team Members</h3>
                {['founder', 'committee'].map((type) => (
                  teamData[type] && teamData[type].length > 0 && (
                    <div key={type} style={{ marginBottom: '16px' }}>
                      <h4 style={{ textTransform: 'capitalize', marginBottom: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
                        {type === 'committee' ? 'Working Committee' : type}
                      </h4>
                      <div className="admin-list">
                        {teamData[type].map((m, i) => (
                          <div key={i} className="admin-list-item">
                            {m.img && <img src={m.img} alt={m.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px', flexShrink: 0 }} />}
                            <span style={{ flex: 1 }}>{m.name} — {m.role}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => startEditTeamMember(type, i)}>Edit</button>
                              <button onClick={() => deleteTeamMember(type, i)}>Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {activeTab === 'programsDone' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>{editProgramDoneIdx !== null ? 'Edit Completed Program' : 'Add Completed Program'}</h3>
                <div className="admin-input-group">
                  <label>Program Title</label>
                  <input type="text" placeholder="e.g. School Supply Drive" value={programDoneForm.title} onChange={(e) => setProgramDoneForm({ ...programDoneForm, title: e.target.value })} />
                </div>
                <div className="admin-input-group">
                  <label>Description</label>
                  <textarea placeholder="Describe what was accomplished..." value={programDoneForm.description} onChange={(e) => setProgramDoneForm({ ...programDoneForm, description: e.target.value })}></textarea>
                </div>
                <div className="admin-input-group">
                  <label>Upload Photos (can select multiple)</label>
                  <input id="programdone-file-input" type="file" accept="image/*" multiple onChange={handleProgramsDoneFilesChange} />
                </div>
                {programDoneForm.photos.length > 0 && (
                  <div className="admin-input-group">
                    <label>Photos Added ({programDoneForm.photos.length})</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                      {programDoneForm.photos.map((photo, idx) => (
                        <div key={idx} style={{ position: 'relative', cursor: 'pointer' }}>
                          <img src={photo} alt={`Photo ${idx + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                          <button onClick={() => handleRemovePhotoFromProgramDone(idx)} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff6b7a', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px' }}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="admin-input-group">
                  <label>Completion Date</label>
                  <input type="date" value={programDoneForm.date} onChange={(e) => setProgramDoneForm({ ...programDoneForm, date: e.target.value })} />
                </div>
                {editProgramDoneIdx !== null ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn" onClick={handleSaveProgramDone}>Save Changes</button>
                    <button className="admin-btn" style={{ background: '#666' }} onClick={cancelEditProgramDone}>Cancel</button>
                  </div>
                ) : (
                  <button className="admin-btn" onClick={handleAddProgramDone} disabled={programDoneForm.photos.length === 0}>Add Program</button>
                )}
                {successMsg && <div className="admin-success" style={{ display: 'block' }}>✓ {successMsg}</div>}
              </div>
              <div className="admin-card">
                <h3>Completed Programs</h3>
                <div className="admin-list">
                  {programsDoneData.map((p, i) => (
                    <div key={i} className="admin-list-item">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{p.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>📸 {p.photos ? p.photos.length : 1} photo{p.photos && p.photos.length !== 1 ? 's' : ''}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => startEditProgramDone(i)}>Edit</button>
                        <button onClick={() => deleteProgramDone(i)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="admin-section active">
              <div className="admin-card">
                <h3>Contact Form Messages</h3>
                <div style={{ marginBottom: '16px' }}>
                  <button className="admin-btn" style={{ background: '#ff6b7a' }} onClick={() => {
                    if (confirm('Are you sure? This will delete all messages permanently!')) clearAllMessages();
                  }}>Clear All Messages</button>
                </div>
                <div className="admin-list">
                  {messagesData.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>No messages yet</p>
                  ) : (
                    messagesData.map((msg, i) => (
                      <div key={i} className="admin-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px', borderLeft: '4px solid #0a2a5e', paddingLeft: '12px' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h5 style={{ margin: '0', color: '#0a2a5e' }}>{msg.name}</h5>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#7a8ab0' }}>{msg.email}</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#7a8ab0' }}><strong>Subject:</strong> {msg.subject}</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#999' }}>{msg.date}</p>
                          </div>
                          <button style={{ background: '#ff6b7a', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem' }} onClick={() => deleteMessage(i)}>Delete</button>
                        </div>
                        <p style={{ margin: '8px 0 0 0', padding: '8px', background: '#f5f7fa', borderRadius: '4px', width: '100%', color: '#333', fontSize: '0.9rem' }}>{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
