import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log("Loading tasks from localStorage:", savedTasks);
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

  const addTask = (newTask) => {
    if (isEditing && taskBeingEdited) {
      // Update existing task
      setTasks(prevTasks => 
        prevTasks.map(task => 
          (task.title === taskBeingEdited.title &&
           task.description === taskBeingEdited.description &&
           task.priority === taskBeingEdited.priority) 
            ? { ...task, ...newTask }
            : task
        )
      );
      setIsEditing(false);
      setTaskBeingEdited(null);
    } else {
      // Add new task
      setTasks(prevTasks => [...prevTasks, { ...newTask, completed: false }]);
    }
  };

  const toggleTaskCompletion = (taskToToggle, isCompleted) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        (task.title === taskToToggle.title &&
         task.description === taskToToggle.description &&
         task.priority === taskToToggle.priority)
          ? { ...task, completed: isCompleted }
          : task
      )
    );
  };

  const deleteTask = (taskToDelete) => {
    setTasks(prevTasks => 
      prevTasks.filter(task => 
        !(task.title === taskToDelete.title &&
          task.description === taskToDelete.description &&
          task.priority === taskToDelete.priority)
      )
    );
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setTaskBeingEdited(task);
  };

  // Debug function to check localStorage
  const debugLocalStorage = () => {
    console.log("=== DEBUG INFO ===");
    console.log("Current tasks state:", tasks);
    console.log("Is initialized:", isInitialized);
    console.log("localStorage content:", localStorage.getItem("tasks"));
    console.log("localStorage keys:", Object.keys(localStorage));
    console.log("Parsed localStorage:", JSON.parse(localStorage.getItem("tasks") || "[]"));
    console.log("=== END DEBUG ===");
  };

  // Test localStorage functionality
  const testLocalStorage = () => {
    console.log("Testing localStorage...");
    const testData = [{ title: "Test Task", description: "Test Description", priority: "High", completed: false }];
    localStorage.setItem("test", JSON.stringify(testData));
    const retrieved = JSON.parse(localStorage.getItem("test"));
    console.log("Test data saved and retrieved:", retrieved);
    localStorage.removeItem("test");
    console.log("localStorage test completed successfully!");
  };

  return (
    <div className="container">
      <TodoForm 
        onAddTask={addTask}
        isEditing={isEditing}
        taskBeingEdited={taskBeingEdited}
      />
      <TodoList 
        tasks={tasks}
        onToggleTask={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={startEditing}
      />
    </div>
  );
}

export default App; 