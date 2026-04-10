// Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if(window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  const bt = document.getElementById('back-top');
  if(window.scrollY > 500) bt.classList.add('visible'); else bt.classList.remove('visible');
});

// Mobile menu
function toggleMobile(){
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
}
function closeMobile(){
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.remove('open');
  hamburger.classList.remove('open');
}

// Hero slider
let slideIdx = 0;
const slides = document.querySelectorAll('.hero-slide');
setInterval(()=>{
  slides[slideIdx].classList.remove('active');
  slideIdx = (slideIdx + 1) % slides.length;
  slides[slideIdx].classList.add('active');
}, 5000);

// Admin
function openAdmin(e){ e.preventDefault(); document.getElementById('admin-panel').classList.add('open'); }
function closeAdmin(){ document.getElementById('admin-panel').classList.remove('open'); }

function doLogin(){
  const u = document.getElementById('admin-user').value;
  const p = document.getElementById('admin-pass').value;
  if(u === 'admin' && p === 'sahaya2008'){
    document.getElementById('admin-login').style.display='none';
    document.getElementById('admin-dashboard').style.display='block';
    loadAdminLists();
  } else {
    document.getElementById('login-err').style.display='block';
  }
}

function switchTab(id, btn){
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// Data store
let teamData = {
  founder: [
    { name:'President', role:'Club Founder', img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', type:'founder', quote:'"At SAHAYA, we believe that every child deserves an opportunity to learn, grow, and achieve their dreams. Through our collective efforts and unwavering commitment, we are creating a brighter future for underprivileged children. Together, we can make a real difference in their lives."' }
  ],
  board: [
    { name:'Vice President', role:'Student, HITAM', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', type:'board' },
    { name:'General Secretary', role:'Student, HITAM', img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80', type:'board' },
    { name:'Treasurer', role:'Student, HITAM', img:'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&q=80', type:'board' }
  ],
  committee: [
    { name:'PR & Communications', role:'Working Committee Member', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', type:'committee' },
    { name:'Coordinators', role:'Working Committee Member', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', type:'committee' },
    { name:'Documentation', role:'Working Committee Member', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80', type:'committee' },
    { name:'Events Manager', role:'Working Committee Member', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', type:'committee' }
  ]
};
let eventsData = [
  { title:'Annual Education Drive 2025', date:'2025-03-15', desc:'Distribution of books, stationery and supplies.', loc:'HITAM Campus', time:'10:00' },
  { title:'Career Guidance Workshop', date:'2025-03-22', desc:'Empowering 9th & 10th class students.', loc:'Govt. High School', time:'09:00' },
  { title:'Orphanage Fun Day', date:'2025-04-05', desc:'A day of games and joy for children.', loc:'Orphanage, Hyderabad', time:'11:00' }
];
let galleryData = [
  { url:'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800', caption:'Sahaya Event' },
  { url:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500', caption:'Education Drive' },
  { url:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500', caption:'Food Drive' },
  { url:'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500', caption:'Outreach' },
  { url:'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500', caption:'Community' }
];
let programsData = [
  { title:'Holistic Development', cat:'Development', desc:'Enabling all-round development through LifeSkills improvement, Science Fairs, Sahaya Art World, and Sahaya Sports.', img:'images/holistic-development.jpeg' },
  { title:'Sweecha', cat:'Events', desc:'Organising events on various occasions to ignite kids\' interest and increase awareness in the community.', img:'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80' },
  { title:'My Library', cat:'Education', desc:'Installing the habit of reading and expanding the horizons of learning through accessible book collections and reading initiatives.', img:'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&q=80' },
  { title:'Field Trips', cat:'Outreach', desc:'Enflaming the passion to seek knowledge and dream big through educational excursions and experiential learning activities.', img:'images/field-trips-group.jpg' }
];

// Load messages from localStorage
let messagesData = JSON.parse(localStorage.getItem('sahayaMessages')) || [];

function loadAdminLists(){
  renderAdminEvents();
  renderAdminGallery();
  renderAdminTeam();
  renderAdminPrograms();
  renderAdminMessages();
  renderTeamPage();
  renderProgramsSection();
}

function renderAdminEvents(){
  const list = document.getElementById('admin-events-list');
  list.innerHTML = eventsData.map((e,i) => `
    <div class="admin-list-item">
      <span>${e.title} — ${e.date}</span>
      <button onclick="deleteEvent(${i})">Delete</button>
    </div>`).join('');
}

function renderAdminGallery(){
  const list = document.getElementById('admin-gallery-list');
  list.innerHTML = galleryData.map((g,i) => `
    <div class="admin-list-item">
      <span>${g.caption || g.url.slice(0,50)+'...'}</span>
      <button onclick="deleteGallery(${i})">Delete</button>
    </div>`).join('');
}

function addEvent(){
  const t = document.getElementById('ev-title').value;
  const d = document.getElementById('ev-date').value;
  const desc = document.getElementById('ev-desc').value;
  const loc = document.getElementById('ev-loc').value;
  const time = document.getElementById('ev-time').value;
  if(!t || !d) return;
  eventsData.push({title:t, date:d, desc, loc, time});
  renderEventsSection();
  renderAdminEvents();
  showSuccess('ev-success');
  document.getElementById('ev-title').value='';
  document.getElementById('ev-date').value='';
  document.getElementById('ev-desc').value='';
  document.getElementById('ev-loc').value='';
  document.getElementById('ev-time').value='';
}

function deleteEvent(i){
  eventsData.splice(i,1);
  renderEventsSection();
  renderAdminEvents();
}

function renderEventsSection(){
  const grid = document.getElementById('events-grid');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  grid.innerHTML = eventsData.map(e => {
    const dt = new Date(e.date);
    return `<div class="event-card">
      <div class="event-date">
        <div class="day">${String(dt.getDate()).padStart(2,'0')}</div>
        <div class="month">${months[dt.getMonth()]}</div>
      </div>
      <div class="event-info">
        <h4>${e.title}</h4>
        <p>${e.desc}</p>
        <div class="ev-meta">
          <span class="ev-chip">📍 ${e.loc}</span>
          <span class="ev-chip">⏰ ${e.time}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function addGalleryImage(){
  const url = document.getElementById('gal-url').value;
  const caption = document.getElementById('gal-caption').value;
  if(!url) return;
  galleryData.push({url, caption});
  renderGallerySection();
  renderAdminGallery();
  showSuccess('gal-success');
  document.getElementById('gal-url').value='';
  document.getElementById('gal-caption').value='';
}

function deleteGallery(i){
  galleryData.splice(i,1);
  renderGallerySection();
  renderAdminGallery();
}

function renderGallerySection(){
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = galleryData.map((g,i) => `
    <div class="gallery-item ${i===0?'featured':''}" onclick="openLightbox('${g.url}')">
      <img src="${g.url}" alt="${g.caption || 'Gallery'}"/>
      <div class="gallery-overlay">⊕</div>
    </div>`).join('');
}

function renderAdminTeam(){
  const list = document.getElementById('admin-team-list');
  const allMembers = [...teamData.founder, ...teamData.board, ...teamData.committee];
  list.innerHTML = allMembers.map((t,i) => `
    <div class="admin-list-item">
      <span>${t.name} — ${t.role} (${t.type})</span>
      <button onclick="deleteTeamMember('${t.type}', ${teamData[t.type].indexOf(t)})">Delete</button>
    </div>`).join('');
}

function renderTeamPage(){
  // Render Founder
  const founderGrid = document.getElementById('founder-grid');
  if(founderGrid) {
    founderGrid.innerHTML = teamData.founder.map(t => `<div class="founder-card">
      <div class="founder-img-wrap">
        <img class="founder-img" src="${t.img}" alt="${t.name}"/>
      </div>
      <div class="founder-quote">
        <div class="founder-quote-text">${t.quote || 'Leading with vision and compassion.'}</div>
      </div>
      <div class="team-info">
        <h4>${t.name}</h4>
        <p>${t.role}</p>
      </div>
    </div>`).join('');
  }
  
  // Render Board Members
  const boardGrid = document.getElementById('board-grid');
  if(boardGrid) {
    boardGrid.innerHTML = teamData.board.map(t => `<div class="team-card">
      <div class="team-img-wrap">
        <img class="team-img" src="${t.img}" alt="${t.name}"/>
        <div class="team-gradient"></div>
      </div>
      <div class="team-info">
        <h4>${t.name}</h4>
        <p>${t.role}</p>
      </div>
    </div>`).join('');
  }
  
  // Render Working Committee
  const committeeGrid = document.getElementById('committee-grid');
  if(committeeGrid) {
    committeeGrid.innerHTML = teamData.committee.map(t => `<div class="team-card">
      <div class="team-img-wrap">
        <img class="team-img" src="${t.img}" alt="${t.name}"/>
        <div class="team-gradient"></div>
      </div>
      <div class="team-info">
        <h4>${t.name}</h4>
        <p>${t.role}</p>
      </div>
    </div>`).join('');
  }
}

function addTeamMember(){
  const name = document.getElementById('team-name').value;
  const role = document.getElementById('team-role').value;
  const img = document.getElementById('team-img').value;
  const quote = document.getElementById('team-quote').value;
  const type = document.getElementById('team-type').value || 'committee';
  if(!name || !role) return;
  teamData[type].push({name, role, img: img || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', type, quote});
  renderTeamPage();
  renderAdminTeam();
  showSuccess('team-success');
  document.getElementById('team-name').value='';
  document.getElementById('team-role').value='';
  document.getElementById('team-img').value='';
  document.getElementById('team-quote').value='';
}

function deleteTeamMember(type, i){
  teamData[type].splice(i,1);
  renderTeamPage();
  renderAdminTeam();
}

function updateStats(){
  const years = document.getElementById('stat-years').value;
  const children = document.getElementById('stat-children').value;
  const events = document.getElementById('stat-events').value;
  const volunteers = document.getElementById('stat-volunteers').value;
  const nums = document.querySelectorAll('.stat-number');
  const fmt = v => v ? `${v}<span>+</span>` : null;
  if(years && nums[0]) nums[0].innerHTML = fmt(years);
  if(children && nums[1]) nums[1].innerHTML = fmt(children);
  if(events && nums[2]) nums[2].innerHTML = fmt(events);
  if(volunteers && nums[3]) nums[3].innerHTML = fmt(volunteers);
  showSuccess('stat-success');
}

function addProgram(){
  const title = document.getElementById('prog-title').value;
  const cat = document.getElementById('prog-cat').value;
  const desc = document.getElementById('prog-desc').value;
  const img = document.getElementById('prog-img').value;
  if(!title || !desc) return;
  programsData.push({title, cat, desc, img: img || 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=500'});
  renderProgramsSection();
  renderAdminPrograms();
  showSuccess('prog-success');
  document.getElementById('prog-title').value='';
  document.getElementById('prog-cat').value='Education';
  document.getElementById('prog-desc').value='';
  document.getElementById('prog-img').value='';
}

function deleteProgram(i){
  programsData.splice(i,1);
  renderProgramsSection();
  renderAdminPrograms();
}

function editProgram(i){
  const prog = programsData[i];
  document.getElementById('prog-title').value = prog.title;
  document.getElementById('prog-cat').value = prog.cat;
  document.getElementById('prog-desc').value = prog.desc;
  document.getElementById('prog-img').value = prog.img;
  deleteProgram(i);
  document.getElementById('prog-title').focus();
}

function renderAdminPrograms(){
  const list = document.getElementById('admin-programs-list');
  list.innerHTML = programsData.map((p,i) => `
    <div class="admin-list-item">
      <span>${p.title} (${p.cat})</span>
      <div style="display:flex; gap:8px;">
        <button onclick="editProgram(${i})" style="background:#f0a500; color:white; padding:6px 12px; border:none; border-radius:5px; cursor:pointer;">Edit</button>
        <button onclick="deleteProgram(${i})">Delete</button>
      </div>
    </div>`).join('');
}

function renderProgramsSection(){
  const grid = document.getElementById('programs-grid');
  grid.innerHTML = programsData.map(p => `
    <div class="program-card">
      <div class="program-img-wrap">
        <img class="program-img" src="${p.img}" alt="${p.title}"/>
      </div>
      <div class="program-body">
        <span class="program-tag">${p.cat}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    </div>`).join('');
}

function showSuccess(id){
  const el = document.getElementById(id);
  el.style.display='block';
  setTimeout(()=>el.style.display='none', 3000);
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3500);
}

function openLightbox(src){
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }

// Animate on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
}, {threshold:0.15});

document.querySelectorAll('.mission-card,.program-card,.event-card,.team-card').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(30px)';
  el.style.transition='opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Stats counter animation
function animateStatNumbers(){
  const statsBar = document.querySelector('.stats-bar');
  if(!statsBar) return;
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !entry.target.classList.contains('animated')){
        entry.target.classList.add('animated');
        const statItems = entry.target.querySelectorAll('.stat-number');
        
        statItems.forEach(item => {
          const text = item.textContent;
          const numStr = text.replace(/[^0-9]/g, '');
          const finalNum = parseInt(numStr);
          
          if(!isNaN(finalNum)){
            let currentNum = 0;
            const increment = Math.ceil(finalNum / 40);
            const interval = setInterval(() => {
              currentNum += increment;
              if(currentNum >= finalNum) {
                currentNum = finalNum;
                clearInterval(interval);
              }
              item.textContent = currentNum + (text.includes('+') ? '+' : '');
            }, 30);
          }
        });
      }
    });
  }, {threshold: 0.3});
  
  statsObserver.observe(statsBar);
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', animateStatNumbers);

// Initialize team page if it exists
if(document.getElementById('founder-grid')){
  renderTeamPage();
}

// Initialize programs on page load
if(document.getElementById('programs-grid')){
  renderProgramsSection();
}

// Contact Form Handling
function submitContactForm(){
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  // Validation
  if(!name || !email || !subject || !message){
    showToast('Please fill in all fields!');
    return;
  }

  // Strict email validation
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(email)){
    showToast('Please enter a valid email address!');
    return;
  }

  // Check for common invalid patterns
  if(email.includes('..') || email.startsWith('.') || email.endsWith('.') || 
     email.includes('_@') || email.includes('-@') || email.includes('.@')){
    showToast('Please enter a valid email address!');
    return;
  }

  // Check email domain (basic check for TLD)
  const domain = email.split('@')[1];
  if(!domain || domain.length < 3){
    showToast('Please enter a valid email domain!');
    return;
  }

  // Create message object with timestamp
  const newMessage = {
    id: Date.now(),
    name: name,
    email: email,
    subject: subject,
    message: message,
    date: new Date().toLocaleString()
  };

  // Add to messages array
  messagesData.push(newMessage);

  // Save to localStorage
  localStorage.setItem('sahayaMessages', JSON.stringify(messagesData));

  // Clear form
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-subject').value = '';
  document.getElementById('contact-message').value = '';

  // Show success message
  showToast('✓ Message sent! We will get back to you soon.');
}

// Admin Messages Rendering
function renderAdminMessages(){
  const list = document.getElementById('admin-messages-list');
  
  if(messagesData.length === 0){
    list.innerHTML = '<p style="text-align:center; color:#aaa; padding:20px;">No messages yet</p>';
    return;
  }

  list.innerHTML = messagesData.map((msg, i) => `
    <div class="admin-list-item" style="flex-direction: column; align-items: flex-start; gap: 8px; border-left: 4px solid #0a2a5e; padding-left: 12px;">
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h5 style="margin: 0; color: #0a2a5e;">${msg.name}</h5>
          <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #7a8ab0;">${msg.email}</p>
          <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: #7a8ab0;"><strong>Subject:</strong> ${msg.subject}</p>
          <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: #999;">${msg.date}</p>
        </div>
        <button onclick="deleteMessage(${i})" style="background: #ff6b7a; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.82rem;">Delete</button>
      </div>
      <p style="margin: 8px 0 0 0; padding: 8px; background: #f5f7fa; border-radius: 4px; width: 100%; color: #333; font-size: 0.9rem;">${msg.message}</p>
    </div>
  `).join('');
}

// Delete Message
function deleteMessage(index){
  if(confirm('Delete this message?')){
    messagesData.splice(index, 1);
    localStorage.setItem('sahayaMessages', JSON.stringify(messagesData));
    renderAdminMessages();
    showToast('Message deleted');
  }
}

// Clear All Messages
function clearAllMessages(){
  if(confirm('Are you sure? This will delete all messages permanently!')){
    messagesData = [];
    localStorage.setItem('sahayaMessages', JSON.stringify(messagesData));
    renderAdminMessages();
    showToast('All messages cleared');
  }
}
