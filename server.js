const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = 'players.json';

// Charger les joueurs depuis le fichier (si existe)
let players = [];
if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  players = JSON.parse(data);
}

// Sauvegarder les joueurs dans le fichier
function savePlayers() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(players, null, 2));
}

app.get('/players', (req, res) => {
  res.json(players);
});

app.post('/join', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  
  players.push({ name, score: 0 });
  savePlayers(); // Sauvegarde dans le fichier
  
  res.json({ message: 'Player joined', players });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
