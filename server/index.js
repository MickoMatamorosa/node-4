const express = require('express');
const massive = require('massive');
const { register, login } = require('./controllers/user');
const protect = require('./protect');

massive({
    host: 'localhost',
    port: 5432,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db',
}).then(db => {
    const app = express();
  
    app.set('db', db);
  
    app.use(express.json());

    // Users
    app.post('/api/register', register);
    app.post('/api/login', login);

    // Protection
    app.get('/api/protected/data', protect);
  
    const PORT = 3002;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
});