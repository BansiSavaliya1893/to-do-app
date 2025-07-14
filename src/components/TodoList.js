import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  return (
    <div className="todo-list">
      <table border="1" width="100%" className="task-table">
        <thead>
          <tr>
            <th>Check</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="list-items">
          {tasks.map((task, index) => (
            <TodoItem
              key={`${task.title}-${task.description}-${task.priority}-${index}`}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList; 