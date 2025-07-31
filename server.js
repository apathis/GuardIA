// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente
const express = require('express');
const cors = require('cors'); // Importa o cors para permitir requisições do frontend
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// Configuração do CORS para permitir que o frontend acesse o backend
app.use(cors());
app.use(express.json()); // Habilita o servidor a ler JSON

// Carrega a chave de API de forma segura
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint da nossa API de chat
app.post('/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ message: text });
    } catch (error) {
        console.error('Erro na API do Gemini:', error);
        res.status(500).json({ error: 'Erro ao gerar resposta da IA.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor GuardIA rodando em http://localhost:${port}`);
});