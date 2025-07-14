import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onToggleTask, onDeleteTask, onEditTask, onUpdateTask, getTaskById }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet!</h3>
        <p>Add your first task to get started.</p>
      </div>
    );
  }

  // Debug: Log when rendering TodoList and handlers
  console.log('Rendering TodoList. onToggleTask:', onToggleTask, 'onDeleteTask:', onDeleteTask);

  return (
    <div className="todo-list">
      <table border="1" width="100%" className="task-table">
        <thead>
          <tr>
            <th>Check</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="list-items">
          {tasks.map((task, index) => (
            <TodoItem
              key={task.id}
              task={task}
              index={index}
              onToggleTask={(id, checked) => { console.log('onToggleTask called for', id, checked); onToggleTask(id, checked); }}
              onDeleteTask={(id) => { console.log('onDeleteTask called for', id); onDeleteTask(id); }}
              onEditTask={onEditTask}
              onUpdateTask={onUpdateTask}
              getTaskById={getTaskById}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList; 