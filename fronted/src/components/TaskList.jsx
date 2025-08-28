import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleCompletion }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay tareas registradas</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </div>
  );
};

export default TaskList;