import './Calendar.css'

const Calendar = ({ selectedDate, onSelectDate, tasks }) => {

  const getWeekDays = () => {
    const today = new Date()
    const days = []
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getWeekDays()

  const getTasksForDay = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date)
      return taskDate.toDateString() === date.toDateString()
    })
  }

  const formatDay = (date) => {
    const day = date.getDate()
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const dayName = dayNames[date.getDay()]
    return `${day} ${dayName}`
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className="calendar">
      <h2 className="section-title">Calendário</h2>
      <div className="week-selector">
        {weekDays.map((day) => {
          const dayTasks = getTasksForDay(day)
          return (
            <button
              key={day.toISOString()}
              className={`day-btn ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
              onClick={() => onSelectDate(day)}
            >
              <span className="day-number">{day.getDate()}</span>
              <span className="day-name">{formatDay(day).split(' ')[1]}</span>
              {dayTasks.length > 0 && (
                <span className="task-indicator">{dayTasks.length}</span>
              )}
            </button>
          )
        })}
      </div>
      <div className="timeline-section">
        <h3>Agenda do Dia</h3>
        <div className="timeline">
          {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00','18:00','19:00','20:00'].map((time) => (
            <div key={time} className="timeline-slot">
              <div className="time-label">{time}</div>
              <div className="time-content">
                {getTasksForDay(selectedDate)
                  .filter(task => task.time && task.time.includes(time.split(':')[0]))
                  .map((task) => (
                    <div key={task.id} className="timeline-task">
                      <div className="task-time-range">{task.time}</div>
                      <div className="task-title">{task.title}</div>
                      <div className="task-group">{task.group}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="day-summary card">
        <h3>Resumo da Semana</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-number">{getTasksForDay(selectedDate).length}</span>
            <span className="stat-label">Tarefas</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {getTasksForDay(selectedDate).filter(t => (t.status === 'completed' || t.completed)).length}
            </span>
            <span className="stat-label">Concluídas</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {getTasksForDay(selectedDate).filter(t => t.priority === 'high').length}
            </span>
            <span className="stat-label">Prioridade Alta</span>
          </div>
        </div>
      </div>
      {getTasksForDay(selectedDate).length > 0 && (
        <div className="upcoming-tasks card">
          <h3>Próximas Tarefas da Semana</h3>
          <div className="upcoming-list">
            {getTasksForDay(selectedDate)
              .filter(task => !(task.status === 'completed' || task.completed))
              .slice(0, 3)
              .map((task) => (
                <div key={task.id} className="upcoming-task">
                  <div className="task-info">
                    <div className="task-title">{task.title}</div>
                    <div className="task-time">{task.time}</div>
                  </div>
                  <div className="task-priority">
                    <span className={`priority-dot priority-${task.priority}`}></span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
