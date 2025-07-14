import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load tasks from localStorage on component mount
  useEffect(() => {
    try {
      let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      // Assign an id to any task missing one
      let changed = false;
      savedTasks = savedTasks.map(task => {
        if (!task.id) {
          changed = true;
          return { ...task, id: Date.now().toString() + Math.random().toString(36).slice(2) };
        }
        return task;
      });
      if (changed) {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
      }
      setTasks(savedTasks);
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      setTasks([]);
      setIsInitialized(true);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't save during initial load
    
    try {
      console.log("Saving tasks to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Tasks saved successfully");
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks, isInitialized]);

  // CREATE - Add new task
  const addTask = (newTask) => {
    if (isEditing && taskBeingEdited) {
      // UPDATE - Update existing task
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskBeingEdited.id
            ? { ...task, ...newTask }
            : task
        )
      );
      setIsEditing(false);
      setTaskBeingEdited(null);
    } else {
      // CREATE - Add new task with unique ID
      const taskWithId = {
        ...newTask,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks(prevTasks => [...prevTasks, taskWithId]);
    }
  };

  // READ - Get task by ID
  const getTaskById = (id) => {
    return tasks.find(task => task.id === id);
  };

  // UPDATE - Toggle task completion
  const toggleTaskCompletion = (taskId, isCompleted) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId
          ? { ...task, completed: isCompleted }
          : task
      )
    );
  };

  // UPDATE - Update task
  const updateTask = (taskId, updatedData) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId
          ? { ...task, ...updatedData, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // DELETE - Delete task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.filter(task => task.id !== taskId)
    );
  };

  // Start editing a task
  const startEditing = (task) => {
    setIsEditing(true);
    setTaskBeingEdited(task);
  };

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setTaskBeingEdited(null);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Clear all tasks
  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  // Get statistics
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getStats();

  return (
    <div className="container">
      <TodoForm 
        onAddTask={addTask}
        isEditing={isEditing}
        taskBeingEdited={taskBeingEdited}
        onCancelEdit={cancelEditing}
      />
      {/* Removed statistics and action buttons here */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <TodoList 
            tasks={tasks}
            onToggleTask={toggleTaskCompletion}
            onDeleteTask={deleteTask}
            onEditTask={startEditing}
            onUpdateTask={updateTask}
            getTaskById={getTaskById}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App; 