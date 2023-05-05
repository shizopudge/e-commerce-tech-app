const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express();
const router = require('./router.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static/users'))
app.use(express.static('static/products'))
app.use(fileUpload({}));
app.use('/api', router);

const PORT = process.env.PORT || 5050

async function startServer() {
    try {
        app.listen(PORT, () => {console.log(`Server is running on PORT ${PORT}`)});
    } catch (error) {
        console.log(error);
    }
}

startServer();


