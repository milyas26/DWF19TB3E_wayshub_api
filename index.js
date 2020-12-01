const express = require('express')

const app = express()

const routerv1 = require('./src/routes/index')

app.use(express.json())

app.use('/api/v1', routerv1)

app.listen(5000, () => console.log(`This server listening on port 5000`))
