const router = require('express').Router()

//Import du modèle schéma note
const Note = require('../../models/note')

//Equivalent à function findNotes(){ }
findNotes = () => {
	return new Promise((resolve, reject) =>{
		Note.find((error, notes) => {
			if (error){
				reject(error)
			}else{
				resolve(notes)
			}
		})
	})
}

//récupérer une note
router.route('/')
	.get((req, res) =>{
		findNotes()
			.then((notes) => res.send(notes))
			.catch((error) => res.status(500).send(error))
	})
	.post((req, res) =>{
		console.log('body', req.body)
		const title = req.body.title
		const description = req.body.description

		//On test la data
		if (!title){
			res.status(500).send('Le titre est manquant')
		}else if(!description){
			res.status(500).send('La description est manquante')
		}else{
			//Data OK
			const note = new Note()
			note.title = title
			note.description = description
			//On ajoute la note a la db
			note.save((error, notes) =>{
				// //On traite les erreurs
				// if (error){
				// 	return res.status(500).send(error)
				// }
				// Note.find((error, notes) => {
				// 	if (error){
				// 		return res.status(500).send(error)
				// 	}
				// 	return res.send(notes)
				// })
				findNotes()
					.then((notes) => res.send(notes))
					.catch((error) => res.status(500).send(error))
			})
		}
	})
	.delete((req, res) => { // Suppression d'un élément par son ID
		// On récupère l'ID de la note à supprimer
		const id = req.body.id
		if (!id) {
			res.status(500).send('L\'id est manquant')
		} else {
			Note.findByIdAndDelete(id,  (err, notes) => {
				if (err){
					console.log(err)
				}
				else{
					findNotes()
						.then((notes) => res.send(notes))
						.catch((error) => res.status(500).send(error))
				}
			});

		}
	})
	.put((req, res) => { // Mise à jour d'un élément par son ID
		// On récupère l'ID de la note à mettre à jour
		const id = req.body.id
		if (!id) {
			return res.status(500).send('L\'id est manquant')
		} else {
			//On créer le nouvel objet et on test également les valeurs pour ne pas les changer à default
			var _note = {}
			if (req.body.description) _note.description = req.body.description
			if (req.body.title) _note.title = req.body.title
			if (req.body.isEnabled !== undefined && req.body.isEnabled !== null) _note.isEnabled = req.body.isEnabled
			if (req.body.isFavorite !== undefined && req.body.isFavorite !== null) _note.isFavorite = req.body.isFavorite

			Note.findByIdAndUpdate(id, _note, {useFindAndModify:true},  (error, notes) => {
				if (error){
					console.log(error)
				}
				else{
					findNotes()
						.then((notes) => res.send(notes))
						.catch((error) => res.status(500).send(error))
				}
			})
		}
	})


module.exports = router
