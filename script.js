document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector("#movie-list ul");
  const forms = document.forms;

  // Delete and Edit movies
  list.addEventListener("click", function (e) {
    // Delete functionality
    if (e.target.className === 'delete') {
      const li = e.target.closest('.movie-item');
      if (li) {
        li.remove();
      }
    }

    // Edit functionality
    if (e.target.className === 'edit') {
      const li = e.target.closest('.movie-item');
      const nameSpan = li.querySelector('.name');
      const currentName = nameSpan.textContent.trim();

      // Create an input for editing
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentName;
      input.className = 'edit-input';
      input.style.minWidth = '150px';

      // Replace span with input
      nameSpan.replaceWith(input);
      input.focus();

      // Commit edit function
      const commitEdit = () => {
        const newName = input.value.trim() || currentName;
        const newNameSpan = document.createElement('span');
        newNameSpan.className = 'name';
        newNameSpan.textContent = newName;
        input.replaceWith(newNameSpan);
        
        // Remove event listeners to prevent memory leaks
        input.removeEventListener('keydown', handleKeyDown);
        input.removeEventListener('blur', commitEdit);
      };

      // Handle keyboard events
      const handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
          commitEdit();
        } else if (ev.key === 'Escape') {
          input.value = currentName;
          commitEdit();
        }
      };

      input.addEventListener('keydown', handleKeyDown);
      input.addEventListener('blur', commitEdit);
    }
  });

  // Add movie functionality
  const addMovieForm = forms['add-movie'];
  addMovieForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const input = addMovieForm.querySelector('input[type="text"]');
    const value = input.value.trim();

    // Check if the input is empty
    if (!value) {
      alert("Please enter a movie name!");
      return;
    }

    // Create the list item with proper structure (EXACTLY like the HTML)
    const li = document.createElement('li');
    li.className = 'movie-item';

    const movieName = document.createElement('span');
    movieName.className = 'name';
    movieName.textContent = value;

    const actions = document.createElement('span');
    actions.className = 'actions';

    const editBtn = document.createElement('span');
    editBtn.className = 'edit';
    editBtn.textContent = 'edit';

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';

    
    const space = document.createTextNode(' ');

    // Assemble the structure exactly like the original HTML
    actions.appendChild(editBtn);
    actions.appendChild(space); // Add the space between buttons
    actions.appendChild(deleteBtn);
    
    li.appendChild(movieName);
    li.appendChild(actions);
    
    list.appendChild(li);

    // Reset the form
    addMovieForm.reset();
  });
});