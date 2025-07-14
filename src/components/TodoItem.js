import React from 'react';

function TodoItem({ task, onToggleTask, onDeleteTask, onEditTask }) {
  const handleCheckboxChange = (e) => {
    onToggleTask(task, e.target.checked);
  };

  const handleEdit = () => {
    onEditTask(task);
  };

  const handleDelete = () => {
    onDeleteTask(task);
  };

  return (
    <tr className={task.completed ? 'completed' : ''}>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        <p>{task.title}</p>
      </td>
      <td>
        <p>{task.description}</p>
      </td>
      <td>
        <p>{task.priority}</p>
      </td>
      <td>
        <i
          className="fa-solid fa-pen-to-square edit-btn"
          onClick={handleEdit}
          style={{ cursor: 'pointer' }}
        />
        <i
          className="fa-solid fa-trash delete-btn"
          onClick={handleDelete}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
}

export default TodoItem; 