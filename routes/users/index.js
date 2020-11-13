const router = require('express').Router()

const User = require('../../models/user')

findUsers = () => {
	return new Promise((resolve, reject) =>{
		User.find((error, users) => {
			if (error){
				reject(error)
			}else{
				resolve(users)
			}
		})
	})
}

router.route('/')
.get((req, res) =>{
	findUsers()
		.then(users => res.send(users))
		.catch((error) => res.status(500).send(error))
})
router.route('/register') //<URL>:<PORT>/users/register
	.post((req, res) => {
		const firstname = req.body.firstname
		const lastname = req.body.lastname
		const email= req.body.email
		const password= req.body.password
		const phone= req.body.phone
	})

module.exports = router
