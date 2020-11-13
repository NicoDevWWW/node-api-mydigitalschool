require('dotenv').config()
const express = require('express')
//module pour décoder les datas accéder au body de la requête
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Logger = require('./tools/logger')

const app = express()
const port = process.env.PORT || 3000

var router = express.Router()

//init connection base
const mongoURL = process.env.MONGO_URL + '?retryWrites=true&w=majority'
//init parametres db
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
//connect db with mongoose
mongoose.connect(mongoURL, dbOptions, error =>{
	if (error){
		throw error
	}
})

//Passage en mode debug
mongoose.set('debug', true)

const db = mongoose.connection
//Listener d'erreurs
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'))
//Listener ecoute
db.once('open', () =>{
	console.info('Connexion à la base : OK')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(Logger)

app.use(router)

app.use('/', require('./routes'))
app.use('/notes', require('./routes/notes'))
app.use('/users', require('./routes/users'))

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
