const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Desenvolvimento local
    'https://to-do-list-ccly9i1a2-dylanbueno22s-projects.vercel.app', // Frontend Vercel
    'https://to-do-list-nzepzy0gb-dylanbueno22s-projects.vercel.app', // Outro frontend Vercel
    'https://to-do-list-8oqr7uk16-dylanbueno22s-projects.vercel.app', // Outro frontend Vercel
    'https://to-do-list-m3jj96kgo-dylanbueno22s-projects.vercel.app', // Outro frontend Vercel
    'https://to-do-list-ccly9i1a2-dylanbueno22s-projects.vercel.app' // Outro frontend Vercel
  ],
  credentials: true
}));
app.use(express.json());

// Dados de exemplo
let tasks = [
  {
    id: 1,
    title: "Estudar React",
    group: "Estudos",
    time: "2h",
    priority: "high",
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Fazer exercícios",
    group: "Treino",
    time: "1h",
    priority: "medium",
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let groups = [
  { id: 1, name: "Estudos", color: "#3B82F6" },
  { id: 2, name: "Trabalho", color: "#10B981" },
  { id: 3, name: "Treino", color: "#F59E0B" }
];

// Rotas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    ...req.body,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id == id);
  
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id != id);
  res.json({ success: true });
});

app.get('/groups', (req, res) => {
  res.json(groups);
});

app.post('/groups', (req, res) => {
  const newGroup = {
    id: groups.length + 1,
    ...req.body
  };
  groups.push(newGroup);
  res.json(newGroup);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:5173`);
});
