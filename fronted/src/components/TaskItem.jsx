import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete, onToggleCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    onUpdate(task.id, {
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-textarea"
            rows="3"
          />
          <div className="edit-actions">
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Creada: {formatDate(task.createdAt)}
              </span>
              {task.updatedAt !== task.createdAt && (
                <span className="task-date">
                  Actualizada: {formatDate(task.updatedAt)}
                </span>
              )}
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={() => onToggleCompletion(task.id, task.completed)}
              className={`complete-btn ${task.completed ? 'completed' : ''}`}
              title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
            >
              {task.completed ? '↶' : '✓'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="Editar tarea"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="delete-btn"
              title="Eliminar tarea"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;