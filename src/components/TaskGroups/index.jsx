import { useState } from "react";
import "./TaskGroups.css";
import { getInitialDate, getStartOfWeek, getEndOfWeek, isInCurrentWeek } from '../../utils/dateUtils';

const TaskGroups = ({ 
    groups, 
    selectedGroup, 
    onSelectGroup, 
    onAddTaskToGroup, 
    onAddGroup, 
    onUpdateGroup, 
    onDeleteGroup, 
    loading 
}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddGroupForm, setShowAddGroupForm] = useState(false);
    const [showEditGroupForm, setShowEditGroupForm] = useState(false);
    const [selectedGroupForAdd, setSelectedGroupForAdd] = useState(null);
    const [editingGroup, setEditingGroup] = useState(null);
    
    const [newTask, setNewTask] = useState({
        title: '',
        time: '',
        priority: 'medium',
        date: getInitialDate()
    });

    const [newGroup, setNewGroup] = useState({
        name: '',
        color: '#3B82F6'
    });

    const [editGroup, setEditGroup] = useState({
        name: '',
        color: '#3B82F6'
    });

    const handleDateChange = (e) => {
        const selectedDate = e.target.value
        
        if (!isInCurrentWeek(selectedDate)) {
            setNewTask({...newTask, date: getInitialDate()})
            alert('Só é possível agendar tarefas na semana atual (segunda a domingo).')
            return
        }
        
        setNewTask({...newTask, date: selectedDate})
    }

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
                date: getInitialDate()
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
            date: getInitialDate()
        });
    };

    // Funções para gerenciar grupos
    const handleAddGroup = () => {
        setShowAddGroupForm(true);
        setNewGroup({ name: '', color: '#3B82F6' });
    };

    const handleSubmitGroup = () => {
        if (newGroup.name.trim()) {
            onAddGroup(newGroup);
            setNewGroup({ name: '', color: '#3B82F6' });
            setShowAddGroupForm(false);
        }
    };

    const handleEditGroup = (group) => {
        setEditingGroup(group);
        setEditGroup({ name: group.name, color: group.color });
        setShowEditGroupForm(true);
    };

    const handleUpdateGroup = () => {
        if (editGroup.name.trim() && editingGroup) {
            onUpdateGroup(editingGroup.id, editGroup);
            setShowEditGroupForm(false);
            setEditingGroup(null);
            setEditGroup({ name: '', color: '#3B82F6' });
        }
    };

    const handleDeleteGroup = (group) => {
        onDeleteGroup(group.id);
    };

    const handleCancelGroup = () => {
        setShowAddGroupForm(false);
        setShowEditGroupForm(false);
        setEditingGroup(null);
        setNewGroup({ name: '', color: '#3B82F6' });
        setEditGroup({ name: '', color: '#3B82F6' });
    };
    
    return (
        <div className="task-groups">
            <div className="section-header">
                <h2 className="section-title">Grupos de Tarefas</h2>
                <button 
                    className="btn add-group-btn"
                    onClick={handleAddGroup}
                    title="Criar novo grupo"
                >
                    + Novo Grupo
                </button>
            </div>
            
            {/* Mensagem informativa sobre modo offline */}
            <div className="offline-notice" style={{
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                marginBottom: '12px',
                border: '1px solid #F59E0B'
            }}>
                💡 <strong>Modo Offline:</strong> Grupos são salvos localmente. Implemente os endpoints de grupos na API para sincronização completa.
            </div>

            {loading ? (
                <div className="loading-groups">
                    <p>Carregando grupos...</p>
                </div>
            ) : (
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
                                <button 
                                    className="group-edit-btn"
                                    onClick={() => handleEditGroup(group)}
                                    title={`Editar ${group.name}`}
                                >
                                    ✏️
                                </button>
                                <button 
                                    className="group-delete-btn"
                                    onClick={() => handleDeleteGroup(group)}
                                    title={`Deletar ${group.name}`}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
                    <div className="date-input-section">
                                                 <input
                             type="date"
                             className="input"
                             value={newTask.date}
                             min={getStartOfWeek(new Date()).toISOString().split('T')[0]}
                             max={getEndOfWeek(new Date()).toISOString().split('T')[0]}
                             onChange={handleDateChange}
                         />
                         <small className="date-info">
                             Semana atual: {getStartOfWeek(new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} a {getEndOfWeek(new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} (incluindo fim de semana)
                         </small>
                    </div>
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

            {/* Formulário para adicionar novo grupo */}
            {showAddGroupForm && (
                <div className="add-group-form">
                    <div className="form-header">
                        <h3>Criar Novo Grupo</h3>
                        <button className="close-btn" onClick={handleCancelGroup}>×</button>
                    </div>
                    <input
                        type="text"
                        className="input"
                        placeholder="Nome do grupo"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    />
                    <input
                        type="color"
                        className="input color-input"
                        value={newGroup.color}
                        onChange={(e) => setNewGroup({...newGroup, color: e.target.value})}
                        title="Escolher cor do grupo"
                    />
                    <div className="form-actions">
                        <button className="btn" onClick={handleSubmitGroup}>
                            Criar Grupo
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancelGroup}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Formulário para editar grupo */}
            {showEditGroupForm && editingGroup && (
                <div className="edit-group-form">
                    <div className="form-header">
                        <h3>Editar Grupo</h3>
                        <button className="close-btn" onClick={handleCancelGroup}>×</button>
                    </div>
                    <input
                        type="text"
                        className="input"
                        placeholder="Nome do grupo"
                        value={editGroup.name}
                        onChange={(e) => setEditGroup({...editGroup, name: e.target.value})}
                    />
                    <input
                        type="color"
                        className="input color-input"
                        value={editGroup.color}
                        onChange={(e) => setEditGroup({...editGroup, color: e.target.value})}
                        title="Escolher cor do grupo"
                    />
                    <div className="form-actions">
                        <button className="btn" onClick={handleUpdateGroup}>
                            Atualizar Grupo
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancelGroup}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskGroups;