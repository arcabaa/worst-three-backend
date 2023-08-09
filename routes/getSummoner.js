const express = require('express')
const { getSummonerRequest } = require('../utils/axiosWithHeaders')

const router = express.Router()

router.get('/:summoner', async (req, res) => {
	try {
		const getSummoner = await getSummonerRequest.get(
			`/lol/summoner/v4/summoners/by-name/${req.params.summoner}`
		);

		res.status(200).json({ puuid: getSummoner.data.puuid })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'server error' })
	}
})
 
module.exports = router;