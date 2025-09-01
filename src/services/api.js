import { API_CONFIG, ERROR_MESSAGES } from '../constants'

const API_BASE_URL = API_CONFIG.BASE_URL;

// Função auxiliar para fazer requisições HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`🌐 Fazendo requisição para: ${url}`);
    console.log(`📋 Configuração da requisição:`, config);
    const response = await fetch(url, config);
    
    if (!response.ok) {
      console.error(`❌ Erro na resposta: ${response.status} - ${response.statusText}`);
      if (response.status === 404) {
        throw new Error(ERROR_MESSAGES.API_NOT_FOUND);
      }
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }
    
    // Para DELETE requests, não tentar fazer parse do JSON
    if (options.method === 'DELETE') {
      return { success: true };
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Erro de conexão com a API:', error);
      throw new Error(ERROR_MESSAGES.CONNECTION_ERROR);
    }
    console.error('API Error:', error);
    throw error;
  }
};

// Serviço de Tarefas
export const taskService = {
  // Buscar todas as tarefas
  async getAllTasks() {
    const tasks = await apiRequest('/tasks');
    // Converter o formato do backend para o formato do frontend
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      group: task.group || 'Trabalho', // Usar o grupo da API se disponível
      time: task.time || '', // Usar o tempo da API se disponível
      priority: task.priority || 'medium', // Usar a prioridade da API se disponível
      date: new Date(task.createdAt),
      status: task.completed ? 'completed' : 'pending',
      completed: task.completed
    }));
  },

  // Criar nova tarefa
  async createTask(taskData) {
    const newTask = await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: taskData.title,
        group: taskData.group,
        time: taskData.time,
        priority: taskData.priority,
        date: taskData.date
      }),
    });
    
    return {
      id: newTask.id,
      title: newTask.title,
      group: newTask.group || taskData.group || 'Trabalho',
      time: newTask.time || taskData.time || '',
      priority: newTask.priority || taskData.priority || 'medium',
      date: new Date(newTask.createdAt || taskData.date),
      status: 'pending',
      completed: false
    };
  },

  // Deletar tarefa
  async deleteTask(id) {
    return await apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // Atualizar status da tarefa
  async updateTaskStatus(id, status) {
    const updatedTask = await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: status,
        completed: status === 'completed'
      }),
    });
    
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      group: updatedTask.group || 'Trabalho',
      time: updatedTask.time || '',
      priority: updatedTask.priority || 'medium',
      date: new Date(updatedTask.createdAt || updatedTask.date),
      status: updatedTask.status || (updatedTask.completed ? 'completed' : 'pending'),
      completed: updatedTask.completed
    };
  }
};

// Serviço de Grupos
export const groupService = {
  // Buscar todos os grupos
  async getAllGroups() {
    return await apiRequest('/groups');
  },

  // Criar novo grupo
  async createGroup(groupData) {
    return await apiRequest('/groups', {
      method: 'POST',
      body: JSON.stringify({
        name: groupData.name,
        color: groupData.color
      }),
    });
  },

  // Atualizar grupo
  async updateGroup(id, groupData) {
    return await apiRequest(`/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: groupData.name,
        color: groupData.color
      }),
    });
  },

  // Deletar grupo
  async deleteGroup(id) {
    return await apiRequest(`/groups/${id}`, {
      method: 'DELETE',
    });
  }
};

export default taskService;
