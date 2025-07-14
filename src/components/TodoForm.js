import React, { useState, useEffect } from 'react';

function TodoForm({ onAddTask, isEditing, taskBeingEdited, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  // Update form fields when editing
  useEffect(() => {
    if (isEditing && taskBeingEdited) {
      setTitle(taskBeingEdited.title);
      setDescription(taskBeingEdited.description);
      setPriority(taskBeingEdited.priority);
    } else {
      // Reset form when not editing
      setTitle('');
      setDescription('');
      setPriority('');
    }
  }, [isEditing, taskBeingEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !priority.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority: priority.trim()
    });

    // Reset form after adding/updating
    if (!isEditing) {
      setTitle('');
      setDescription('');
      setPriority('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('');
    onCancelEdit();
  };

  return (
    <div className="input-container">
      <h3>My To-Do List</h3>
      <form onSubmit={handleSubmit}>
        <span>Title:</span>
        <input
          type="text"
          className="input-task"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span>Description:</span>
        <input
          type="text"
          className="input-task"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="input-task"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="form-buttons">
          <button
            type="submit"
            className="add-btn"
            style={{ backgroundColor: isEditing ? '#f57c00' : '#4e6688' }}
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TodoForm; 