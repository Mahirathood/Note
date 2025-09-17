async function fetchNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  return notes;
}

function renderNotes(notes) {
  const list = document.getElementById('notes-list');
  list.innerHTML = '';
  if (!notes.length) {
    list.innerHTML = '<p class="small">No notes yet.</p>';
    return;
  }
  notes.forEach(n => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <h3>${escapeHtml(n.title)}</h3>
      <div class="small">${new Date(n.createdAt).toLocaleString()}</div>
      <p>${escapeHtml(n.content)}</p>
      <div class="actions">
        <button class="btn-link" data-id="${n._id}" data-action="edit">Edit</button>
        <button class="btn-link btn-danger" data-id="${n._id}" data-action="delete">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');
}

async function loadAndRender() {
  const notes = await fetchNotes();
  renderNotes(notes);
}

document.getElementById('note-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('note-title').value.trim();
  const content = document.getElementById('note-content').value.trim();
  if (!title) return alert('Title is required');
  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ title, content })
  });
  document.getElementById('note-title').value = '';
  document.getElementById('note-content').value = '';
  await loadAndRender();
});

document.getElementById('notes-list').addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === 'delete') {
    if (!confirm('Delete this note?')) return;
    await fetch('/api/notes/' + id, { method: 'DELETE' });
    await loadAndRender();
  } else if (action === 'edit') {
    const title = prompt('New title');
    if (title === null) return;
    const content = prompt('New content (leave blank to keep)');
    await fetch('/api/notes/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    await loadAndRender();
  }
});

// initial load
loadAndRender();
