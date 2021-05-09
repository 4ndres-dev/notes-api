const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors);
app.use(express.json());

let notes = [
	{
		id: 1,
		content: 'blablattttt',
		date: 'hoy,'
	},
	{
		id: 2,
		content: 'EEEE',
		date: 'hoy,'
	},
	{
		id: 3,
		content: 'RRR',
		date: 'hoy,'
	}
];

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(notes));
// })

app.get('/', (request, response) => {
	response.send('<h1>App Note</h1>');
});

app.get('/api/notes', (request, response) => {
	response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	const note = notes.find(note => note.id === id);

	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);
	response.status(204).end();
});

app.post('/api/notes', (request, response) => {
	const note = request.body;

	const ids = notes.map(note => note.id);
	const maxId = Math.max(...ids);

	const newNote = {
		id: maxId + 1,
		content: note.content,
		important: typeof note.important !== 'undefined' ? note.important : false,
		date: new Date().toISOString()

	};

	notes = [...notes, newNote];

	response.status(201).json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Iniciando el servidor en el puerto ${PORT}`);
});
