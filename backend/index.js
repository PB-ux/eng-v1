require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'static/coverBook')));
app.use(express.static(path.resolve(__dirname, 'static/filePdf')));
app.use('/api', router);

// Error Handler
app.use(errorHandler);

app.get('/', (req ,res) => {
    res.status(200).json({"message": "OK"})
})

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Start server ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start();