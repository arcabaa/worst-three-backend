const express = require('express')
const { getMatchesRequest } = require('../utils/axiosWithHeaders')

const router = express.Router()

// https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=50

router.post('/', async (req, res) => {
	try {
		const getMatches = await getMatchesRequest.get(
			`lol/match/v5/matches/by-puuid/${req.body.puuid}/ids?start=0&count=50`
		);

		res.status(200).json({ matches: getMatches.data })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'server error' })
	}
})
 
module.exports = router;