# 🚀 Deploy no Vercel - To-Do List

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Conta no Vercel
- ✅ Projeto funcionando localmente
- ✅ Build funcionando (`npm run build`)

---

## 🎯 **PASSO 1: Preparar o Repositório**

### **1.1 Verificar arquivos essenciais**

✅ `package.json` com script `build`
✅ `vite.config.js` configurado
✅ `vercel.json` criado
✅ Variáveis de ambiente configuradas

### **1.2 Commitar e fazer push**

```bash
git add .
git commit -m "Preparando para deploy no Vercel"
git push origin main
```

---

## 🎯 **PASSO 2: Deploy no Vercel**

### **2.1 Acessar Vercel**

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login com GitHub**
3. **Clique em "New Project"**

### **2.2 Importar Repositório**

1. **Selecione o repositório `to-do-list`**
2. **Clique em "Import"**
3. **Configure o projeto:**

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### **2.3 Configurar Variáveis de Ambiente**

Na seção **Environment Variables**, adicione:

```bash
VITE_API_URL=https://seu-backend.railway.app
```

**⚠️ IMPORTANTE:** Substitua `https://seu-backend.railway.app` pela URL real do seu backend.

### **2.4 Deploy**

1. **Clique em "Deploy"**
2. **Aguarde o build completar**
3. **Anote a URL gerada** (ex: `https://to-do-list-xyz.vercel.app`)

---

## 🎯 **PASSO 3: Configurar Backend**

### **3.1 Atualizar CORS no Backend**

No seu backend, atualize a configuração CORS:

```javascript
app.use(cors({
  origin: [
    'https://to-do-list-xyz.vercel.app', // URL do Vercel
    'http://localhost:5173' // Para desenvolvimento
  ],
  credentials: true
}));
```

### **3.2 Deploy do Backend (Railway)**

1. **Acesse [railway.app](https://railway.app)**
2. **Conecte seu GitHub**
3. **Deploy do repositório do backend**
4. **Configure variáveis de ambiente:**

```bash
DATABASE_URL=postgresql://...
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://to-do-list-xyz.vercel.app
```

---

## 🎯 **PASSO 4: Teste Final**

### **4.1 Checklist de Verificação**

- [ ] Frontend rodando no Vercel
- [ ] Backend rodando no Railway
- [ ] API conectando corretamente
- [ ] Tarefas sendo criadas
- [ ] Status sendo atualizado
- [ ] Grupos funcionando

### **4.2 Testes Manuais**

1. **Acesse a URL do Vercel**
2. **Crie uma nova tarefa**
3. **Atualize o status**
4. **Crie um novo grupo**
5. **Verifique se tudo persiste**

---

## 🔧 **Comandos Úteis**

### **Verificar Build Local:**
```bash
npm run build
npm run preview
```

### **Logs do Vercel:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Ver logs
vercel logs
```

---

## 🚨 **Problemas Comuns**

### **1. Build Failed**
- Verifique se `npm run build` funciona localmente
- Confirme se todas as dependências estão no `package.json`

### **2. API não conecta**
- Verifique se `VITE_API_URL` está configurada no Vercel
- Confirme se o backend está rodando
- Verifique se o CORS está configurado

### **3. Página em branco**
- Verifique os logs do Vercel
- Confirme se o `vercel.json` está correto

---

## 📞 **Suporte**

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel CLI:** [vercel.com/docs/cli](https://vercel.com/docs/cli)
- **Vite Deploy:** [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy)

---

## 🎉 **Próximos Passos**

Após o deploy bem-sucedido:

1. **Configurar domínio personalizado** (opcional)
2. **Configurar analytics** (opcional)
3. **Configurar monitoramento** (opcional)
4. **Compartilhar o projeto** 🚀
