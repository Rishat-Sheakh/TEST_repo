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
