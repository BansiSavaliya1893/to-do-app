import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TodoItem({ task, index, onToggleTask, onDeleteTask, onEditTask, onUpdateTask, getTaskById }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleCheckboxChange = (e) => {
    onToggleTask(task.id, e.target.checked);
  };

  const handleEdit = () => {
    onEditTask(task);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff6b6b';
      case 'Medium': return '#feca57';
      case 'Low': return '#48dbfb';
      default: return '#c8d6e5';
    }
  };

  return (
    <tr 
      ref={setNodeRef}
      style={style}
      className={`${task.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
    >
      <td className="drag-handle">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
        <span
          className="drag-icon"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
        >
          ⋮⋮
        </span>
      </td>
      <td>
        <p className={task.completed ? 'completed-text' : ''}>{task.title}</p>
      </td>
      <td>
        <p className={task.completed ? 'completed-text' : ''}>{task.description}</p>
      </td>
      <td>
        <span 
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
      </td>
      <td>
        <small className="date-text">
          {formatDate(task.createdAt)}
        </small>
      </td>
      <td className="actions-cell">
        <i
          className="fa-solid fa-pen-to-square edit-btn"
          onClick={handleEdit}
          title="Edit task"
        />
        <i
          className="fa-solid fa-trash delete-btn"
          onClick={handleDelete}
          title="Delete task"
        />
      </td>
    </tr>
  );
}

export default TodoItem; 