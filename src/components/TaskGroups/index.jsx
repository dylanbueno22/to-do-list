import { useState } from "react";
import "./TaskGroups.css";

const TaskGroups = ({ groups, selectedGroup, onSelectGroup, onAddTaskToGroup }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedGroupForAdd, setSelectedGroupForAdd] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        time: '',
        priority: 'medium',
        date: new Date().toISOString().split('T')[0] // Data atual como padrão
    });

    const handleAddTaskToGroup = (group) => {
        setSelectedGroupForAdd(group);
        setShowAddForm(true);
    };

    const handleSubmitTask = () => {
        if (newTask.title.trim() && selectedGroupForAdd) {
            onAddTaskToGroup({
                ...newTask,
                group: selectedGroupForAdd.name,
                date: new Date(newTask.date),
                completed: false
            });
            setNewTask({ 
                title: '', 
                time: '', 
                priority: 'medium',
                date: new Date().toISOString().split('T')[0]
            });
            setShowAddForm(false);
            setSelectedGroupForAdd(null);
        }
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setSelectedGroupForAdd(null);
        setNewTask({ 
            title: '', 
            time: '', 
            priority: 'medium',
            date: new Date().toISOString().split('T')[0]
        });
    };
    
    return (
        <div className="task-groups">
            <h2 className="section-title">Grupos de Tarefas</h2>
            
            {/* Lista de Grupos */}
            <div className="groups-list">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className={`group-card ${selectedGroup?.id === group.id ? 'selected' : ''}`}
                    >
                        <div className="group-color-bar" style={{ backgroundColor: group.color }}></div>
                        <div className="group-content">
                            <h3 className="group-name">{group.name}</h3>
                            <span className="group-count">{group.taskCount} tarefas</span>
                        </div>
                        <div className="group-actions">
                            <button 
                                className="group-select-btn"
                                onClick={() => onSelectGroup(group)}
                                title={`Ver tarefas de ${group.name}`}
                            >
                                👁️
                            </button>
                            <button 
                                className="group-add-btn"
                                onClick={() => handleAddTaskToGroup(group)}
                                title={`Adicionar tarefa a ${group.name}`}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulário para adicionar tarefa ao grupo */}
            {showAddForm && selectedGroupForAdd && (
                <div className="add-to-group-form">
                    <div className="form-header">
                        <h3>Adicionar Tarefa a {selectedGroupForAdd.name}</h3>
                        <button className="close-btn" onClick={handleCancel}>×</button>
                    </div>
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
                        <button className="btn" onClick={handleSubmitTask}>
                            Adicionar
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskGroups;