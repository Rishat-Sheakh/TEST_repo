// Cursor tracking effect
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  
  // Orb tracking effect
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, i) => {
    const speed = 0.02 + i * 0.005;
    const moveX = (e.clientX - window.innerWidth / 2) * speed;
    const moveY = (e.clientY - window.innerHeight / 2) * speed;
    orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Particle generation
function createParticles() {
  const floatingBg = document.querySelector('.floating-bg');
  if (!floatingBg) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.background = `rgba(${Math.random() > 0.5 ? '0,217,255' : '30,213,243'},${Math.random() * 0.5 + 0.3})`;
    particle.style.animation = `particleFloat ${Math.random() * 20 + 15}s infinite ease-in-out`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    floatingBg.appendChild(particle);
  }
}

// Add particle float animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8}); opacity: 0.8; }
    50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1); opacity: 0.5; }
    75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8}); opacity: 0.8; }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', createParticles);

// Small helper: smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  })
});

// Load projects from projects.json and render into #projects-grid
async function loadProjects(){
  try{
    const res = await fetch('projects.json');
    if(!res.ok) throw new Error('Failed to fetch projects.json');
    const projects = await res.json();
    const container = document.getElementById('projects-grid');
    if(!container) return;
    container.innerHTML = '';
    projects.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'card';
      const linkAttrs = p.link && p.link.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title} image" style="width:100%;border-radius:6px;margin-bottom:10px">
        <h4>${p.title}</h4>
        <p>${p.description} <a href="${p.link}"${linkAttrs}>View</a></p>
      `;
      container.appendChild(card);
    });
  }catch(err){
    console.error(err);
    const container = document.getElementById('projects-grid');
    if(container) container.innerHTML = '<p style="color:var(--muted)">Unable to load projects.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
