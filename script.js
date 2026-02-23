const noteInput = document.getElementById('noteInput');
const notesTableBody = document.getElementById('notesTableBody');
const emptyStateRow = document.getElementById('emptyStateRow');

const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleString();
};

const removeEmptyState = () => {
  if (emptyStateRow && emptyStateRow.parentNode) {
    emptyStateRow.remove();
  }
};

const addNoteRow = (text) => {
  removeEmptyState();

  const row = document.createElement('tr');

  const noteCell = document.createElement('td');
  const editableNote = document.createElement('div');
  editableNote.className = 'editable-note';
  editableNote.contentEditable = 'true';
  editableNote.spellcheck = true;
  editableNote.textContent = text;
  editableNote.setAttribute('aria-label', 'Editable note');
  noteCell.appendChild(editableNote);

  const timestampCell = document.createElement('td');
  timestampCell.className = 'timestamp';
  timestampCell.textContent = getTimestamp();

  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    row.remove();
    if (notesTableBody.children.length === 0) {
      notesTableBody.appendChild(emptyStateRow);
    }
  });

  actionCell.appendChild(deleteButton);

  row.appendChild(noteCell);
  row.appendChild(timestampCell);
  row.appendChild(actionCell);

  notesTableBody.appendChild(row);
};

noteInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' || event.shiftKey) {
    return;
  }

  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    return;
  }

  addNoteRow(text);
  noteInput.value = '';
});
