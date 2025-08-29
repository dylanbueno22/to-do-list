# 🚀 DEPLOY AGORA - To-Do List

## ⚡ **PASSO A PASSO RÁPIDO**

### **1. Preparar o Repositório**
```bash
# Commitar todas as mudanças
git add .
git commit -m "Preparando deploy no Vercel"
git push origin main
```

### **2. Deploy no Vercel**

1. **Acesse:** https://vercel.com
2. **Login com GitHub**
3. **Clique "New Project"**
4. **Selecione repositório:** `to-do-list`
5. **Configure:**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Adicione variável de ambiente:**
   - Nome: `VITE_API_URL`
   - Valor: `https://seu-backend.railway.app`
7. **Clique "Deploy"**

### **3. Configurar Backend**

**No seu backend, atualize CORS:**
```javascript
app.use(cors({
  origin: [
    'https://to-do-list-xyz.vercel.app', // URL do Vercel
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### **4. Testar**

1. Acesse a URL do Vercel
2. Crie uma tarefa
3. Atualize o status
4. Verifique se funciona

---

## 📋 **CHECKLIST FINAL**

- [ ] Repositório no GitHub
- [ ] Build funcionando (`npm run build`)
- [ ] Vercel conectado ao GitHub
- [ ] Variável `VITE_API_URL` configurada
- [ ] Backend com CORS atualizado
- [ ] Teste de funcionalidade

---

## 🎯 **URLs Importantes**

- **Vercel:** https://vercel.com
- **Railway:** https://railway.app
- **GitHub:** https://github.com

---

## 🚨 **Se algo der errado:**

1. **Verifique os logs do Vercel**
2. **Confirme se o backend está rodando**
3. **Teste a API diretamente**
4. **Verifique as variáveis de ambiente**

---

## 🎉 **SUCESSO!**

Seu To-Do List estará online em:
`https://to-do-list-[seu-usuario].vercel.app`

**Compartilhe o projeto!** 🚀
