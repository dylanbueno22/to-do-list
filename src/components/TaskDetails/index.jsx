import { useState } from 'react'
import './TaskDetails.css'

const TaskDetails = ({ tasks, selectedGroup, onDeleteTask, onAddTask, onClearAll, onUpdateTaskStatus }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    group: '',
    time: '',
    priority: 'medium',
    date: new Date().toISOString().split('T')[0] // Data atual como padrão
  })

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAddTask({
        ...newTask,
        date: new Date(newTask.date),
        completed: false
      })
      setNewTask({ 
        title: '', 
        group: '', 
        time: '', 
        priority: 'medium',
        date: new Date().toISOString().split('T')[0]
      })
      setShowAddTaskForm(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444'
      case 'medium': return '#F97316'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981'
      case 'in-progress': return '#F59E0B'
      case 'pending': return '#6B7280'
      default: return '#6B7280'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Concluída'
      case 'in-progress': return 'Em Produção'
      case 'pending': return 'Pendente'
      default: return 'Pendente'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✓'
      case 'in-progress': return '⚡'
      case 'pending': return '○'
      default: return '○'
    }
  }

  // Agrupar tarefas por dia
  const groupTasksByDay = (tasks) => {
    const grouped = {}
    
    tasks.forEach(task => {
      const taskDate = new Date(task.date)
      const dayKey = taskDate.toDateString()
      const dayName = taskDate.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short' 
      })
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = {
          date: taskDate,
          dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
          tasks: []
        }
      }
      grouped[dayKey].tasks.push(task)
    })
    
    // Ordenar por data
    return Object.values(grouped).sort((a, b) => a.date - b.date)
  }

  // Filtrar tarefas por grupo selecionado
  const filteredTasks = selectedGroup 
    ? tasks.filter(task => task.group === selectedGroup.name)
    : tasks;

  const groupedTasks = groupTasksByDay(filteredTasks)



  return (
    <div className="task-details">
                     <div className="header">
          <h2 className="section-title">
            {selectedGroup ? `Tarefas de ${selectedGroup.name}` : 'Tarefas da Semana'}
          </h2>
         <div className="header-actions">
           <button 
             className="btn add-task-btn"
             onClick={() => setShowAddTaskForm(true)}
           >
             + Nova Tarefa
           </button>
           {tasks.length > 0 && (
             <button 
               className="btn btn-secondary clear-btn"
               onClick={onClearAll}
               title="Limpar todas as tarefas"
             >
               🗑️ Limpar
             </button>
           )}
         </div>
       </div>

      {/* Formulário para adicionar tarefa */}
      {showAddTaskForm && (
        <div className="add-task-form card">
          <h3>Adicionar Nova Tarefa</h3>
          <input
            type="text"
            className="input"
            placeholder="Título da tarefa"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
          />
                     <input
             type="text"
             className="input"
             placeholder="Grupo (ex: Reuniões, Viagem)"
             value={newTask.group}
             onChange={(e) => setNewTask({...newTask, group: e.target.value})}
           />
                     <input
             type="text"
             className="input"
             placeholder="Horário (ex: 10:00 - 12:00)"
             value={newTask.time}
             onChange={(e) => setNewTask({...newTask, time: e.target.value})}
           />
           <input
             type="date"
             className="input"
             value={newTask.date}
             onChange={(e) => setNewTask({...newTask, date: e.target.value})}
           />
          <select
            className="input"
            value={newTask.priority}
            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
          >
            <option value="low">Baixa Prioridade</option>
            <option value="medium">Média Prioridade</option>
            <option value="high">Alta Prioridade</option>
          </select>
          <div className="form-actions">
            <button className="btn" onClick={handleAddTask}>
              Adicionar
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowAddTaskForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Tarefas */}
      <div className="tasks-list">
        {groupedTasks.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma tarefa para esta semana</p>
            <button 
              className="btn"
              onClick={() => setShowAddTaskForm(true)}
            >
              Criar primeira tarefa
            </button>
          </div>
        ) : (
          groupedTasks.map((dayGroup) => (
            <div key={dayGroup.date.toISOString()} className="day-group">
              <div className="day-header">
                <h3 className="day-title">{dayGroup.dayName}</h3>
                <span className="day-task-count">{dayGroup.tasks.length} tarefa{dayGroup.tasks.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="day-tasks">
                {dayGroup.tasks.map((task) => {
                  const taskStatus = task.status || (task.completed ? 'completed' : 'pending')
                  return (
                    <div key={task.id} className={`task-card card task-${taskStatus}`}>
                      <div className="task-header">
                        <div className="task-info">
                          <div 
                            className="priority-indicator"
                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                          ></div>
                          <div className="task-content">
                            <h3 className="task-title">{task.title}</h3>
                            <p className="task-group">{task.group}</p>
                            <p className="task-time">{task.time}</p>
                            <div className="task-status">
                              <span 
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(taskStatus) }}
                              >
                                {getStatusIcon(taskStatus)} {getStatusText(taskStatus)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="task-actions">
                          <div className="status-buttons">
                            <button 
                              className={`status-btn ${taskStatus === 'pending' ? 'active' : ''}`}
                              onClick={() => onUpdateTaskStatus(task.id, 'pending')}
                              title="Marcar como Pendente"
                            >
                              ○
                            </button>
                            <button 
                              className={`status-btn ${taskStatus === 'in-progress' ? 'active' : ''}`}
                              onClick={() => onUpdateTaskStatus(task.id, 'in-progress')}
                              title="Marcar como Em Produção"
                            >
                              ⚡
                            </button>
                            <button 
                              className={`status-btn ${taskStatus === 'completed' ? 'active' : ''}`}
                              onClick={() => onUpdateTaskStatus(task.id, 'completed')}
                              title="Marcar como Concluída"
                            >
                              ✓
                            </button>
                          </div>
                          <button 
                            className="delete-btn"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Progresso */}
      {filteredTasks.length > 0 && (
        <div className="progress-card card">
          <h3>
            {selectedGroup ? `Progresso de ${selectedGroup.name}` : 'Progresso da Semana'}
          </h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${(filteredTasks.filter(t => (t.status === 'completed' || t.completed)).length / filteredTasks.length) * 100}%` 
              }}
            ></div>
          </div>
          <p className="progress-text">
            {filteredTasks.filter(t => (t.status === 'completed' || t.completed)).length} de {filteredTasks.length} tarefas concluídas
          </p>
        </div>
      )}
    </div>
  )
}

export default TaskDetails
