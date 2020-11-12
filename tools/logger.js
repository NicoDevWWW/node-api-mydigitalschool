const loggerMiddleware = (req, res, next) => {
	if (req){
		console.info(
				`Requête ${req.method} recue de ${req.ip} à destinantion de ${req.url}`
		)
	}
	// if (res){
	// 	console.info(
	// 		`Response ${res}`
	// 	)
	// }
	// //Je passe simplement à la suite !
	next()
}

module.exports = Logger = loggerMiddleware
