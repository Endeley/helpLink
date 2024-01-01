//
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorHnadler.js');

const connectDB = require('./config/db');

//  connect to database
connectDB();
//

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//

app.get('/', (req, res) => {
    res.status(201).json({ message: 'Welcome to HelpLink Support desk' });
});
// Routes

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketsRoutes'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
