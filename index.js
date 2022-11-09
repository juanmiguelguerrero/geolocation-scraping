const express = require('express')
const server = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const addressScraper = require('./scraper.js')

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())

server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

server.post("/", async (req, res) => {
	
	let query = req.body.query
	console.log(query)

	if (!query) {
		res.json({ message: "URL parameter not received"})
	} else {
		let result = await addressScraper(query)
		res.json(result)
	}
})

server.listen(port, () => {
	console.log(`Server listening at ${port}`)
})