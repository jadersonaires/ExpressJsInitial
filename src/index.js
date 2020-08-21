const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())
const uuid = require('uuid');
const arrToString = require('./utils/arrayToString');

const repositories = [];

app.get('/repositories', (req, res) => {
    return res.json(repositories);
});

app.post('/repositories', (req, res) => {
    const { title, url, techs, likes } = req.body

    const arrTechs = arrToString(techs);
    const repository = {
        id: uuid.v4(),
        title,
        url,
        techs: arrTechs,
        likes
    }

    repositories.push(repository);
    return res.status(200).json(repository);
});

app.post('/repositories/:id/like', (req, res) => {

    const { id } = req.params;
    const repositorySearch = repositories.find(repository => repository.id === id);
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
    var likeIncrement = repositorySearch.likes + 1;
    const repository = {
        id: repositorySearch.id,
        title: repositorySearch.title,
        url: repositorySearch.url,
        techs: repositorySearch.techs,
        likes: likeIncrement
    }

    repositories[repositoryIndex] = repository;
    return res.json(repository);
});

app.put('/repositories/:id', (req, res) => {
    const { id } = req.params;
    const { title, url, techs, likes } = req.body;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if (repositoryIndex < 0) {
        return res.status(400).json({ 'error': 'Not fount...' });
    }

    const arrTechs = arrToString(techs);
    const repository = {
        id,
        title,
        url,
        techs: arrTechs,
        likes
    }

    repositories[repositoryIndex] = repository;
    return res.json(repository);
});

app.delete('/repositories/:id', (req, res) => {
    const { id } = req.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if (repositoryIndex < 0) {
        return res.status(400).json({ 'error': 'Not fount...' });
    }

    repositories.splice(repositoryIndex, 1);
    return res.status(204).send();
})

app.listen(3001, () => {
    console.log('backend online... ');
});