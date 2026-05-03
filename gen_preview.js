const fs = require('fs');
const projects = JSON.parse(fs.readFileSync('/tmp/api_projects.json', 'utf8'));

const cats = { all: projects.length, fullstack: 0, 'big-frontend': 0, 'mini-frontend': 0 };
projects.forEach(p => { if (cats[p.category] !== undefined) cats[p.category]++; });

let filterBtns = '';
['all', 'fullstack', 'big-frontend', 'mini-frontend'].forEach(f => {
  const label = f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ');
  filterBtns += `<button class="filter-btn" data-filter="${f}" onclick="render('${f}')">${label} <span class="count">${cats[f]}</span></button>`;
});

let cards = '';
projects.forEach(p => {
  const catLabel = p.category.charAt(0).toUpperCase() + p.category.slice(1).replace('-', ' ');
  const techs = p.techStack.split(',').slice(0, 4).map(t => `<span class="tech">${t.trim()}</span>`).join('');
  cards += `
    <div class="card" data-category="${p.category}">
      <div class="card-img">
        ${p.imageUrl ? `<img src="http://127.0.0.1:5000${p.imageUrl}" onerror="this.parentElement.innerHTML='<div class=placeholder>${p.title.charAt(0)}</div>'">` : ''}
      </div>
      <div class="card-body">
        <div class="card-header">
          <div class="card-title">${p.title}</div>
          <span class="badge badge-${p.category}">${catLabel}</span>
        </div>
        <div class="card-desc">${p.description}</div>
        <div class="card-techs">${techs}</div>
      </div>
    </div>`;
});

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Portfolio Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: #050505; color: #e5e5e5; padding: 40px 20px; }
.container { max-width: 1100px; margin: 0 auto; }
h2 { text-align: center; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
h2 span { color: #7c3aed; }
.subtitle { text-align: center; color: #666; margin-bottom: 32px; font-size: 15px; }
.filter-bar { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; justify-content: center; }
.filter-btn { padding: 6px 18px; border-radius: 20px; border: 1px solid #333; background: transparent; color: #999; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s; }
.filter-btn:hover { border-color: #7c3aed; color: #ccc; }
.filter-btn.active { background: #4b2bab; color: white; border-color: #4b2bab; }
.count { font-size: 10px; margin-left: 4px; opacity: 0.7; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.card { border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; background: #0a0a0a; transition: all 0.3s; }
.card:hover { border-color: #333; transform: translateY(-2px); }
.card-img { height: 176px; background: #111; overflow: hidden; position: relative; }
.card-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px; color: #1a1a1a; font-weight: 700; }
.card-body { padding: 16px; }
.card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.card-title { font-weight: 700; font-size: 16px; line-height: 1.3; }
.badge { display: inline-block; padding: 2px 10px; border-radius: 10px; font-size: 10px; font-weight: 600; white-space: nowrap; flex-shrink: 0; }
.badge-fullstack { background: rgba(75,43,171,0.15); color: #9b85e8; }
.badge-big-frontend { background: rgba(59,130,246,0.15); color: #93c5fd; }
.badge-mini-frontend { background: rgba(34,197,94,0.15); color: #86efac; }
.card-desc { color: #777; font-size: 13px; line-height: 1.5; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-techs { display: flex; flex-wrap: wrap; gap: 4px; }
.tech { padding: 2px 8px; border-radius: 6px; background: #151515; color: #888; font-size: 11px; }
.empty { text-align: center; color: #444; padding: 60px 0; font-size: 16px; grid-column: 1 / -1; }
</style>
</head><body>
<div class="container">
  <h2>My <span>Projects</span></h2>
  <p class="subtitle">A showcase of my recent work and side projects</p>
  <div class="filter-bar">${filterBtns}</div>
  <div class="grid" id="grid">${cards}</div>
</div>
<script>
function render(filter) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });
  let count = 0;
  document.querySelectorAll('.card').forEach(c => {
    const show = filter === 'all' || c.dataset.category === filter;
    c.style.display = show ? '' : 'none';
    if (show) count++;
  });
  const grid = document.getElementById('grid');
  const existing = grid.querySelector('.empty');
  if (existing) existing.remove();
  if (count === 0) {
    const div = document.createElement('div');
    div.className = 'empty';
    div.textContent = 'No projects found in this category.';
    grid.appendChild(div);
  }
}
</script>
</body></html>`;

fs.writeFileSync('/home/z/my-project/download/portfolio-preview.html', html);
console.log('Preview saved');
console.log('Categories:', JSON.stringify(cats));
