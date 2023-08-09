const express = require('express')
const { getMatchesRequest } = require('../utils/axiosWithHeaders')

const router = express.Router()

// https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}
// ex match id: NA1_4728888000

router.post('/', async (req, res) => {
	try {
		const summonerKDAMap = new Map()
		let KDresults = []

		for (let i = 0; i < req.body.matches.length; i++) {
			const matchData = await getMatchesRequest(`/lol/match/v5/matches/${req.body.matches[i]}`)

			matchData.data.info.participants.forEach(participant => {
				if (participant.puuid === req.body.puuid) {
					if (summonerKDAMap.has(participant.championName)) {
						// add to kills and deaths
						const summonerKDA = summonerKDAMap.get(participant.championName)
						const updatedSummonerKDA = [summonerKDA[0] += participant.kills, summonerKDA[1] += participant.deaths, summonerKDA[2] += participant.assists]

						summonerKDAMap.set(participant.championName, updatedSummonerKDA)
					} else {
						summonerKDAMap.set(participant.championName, [participant.kills, participant.deaths, participant.assists])
					}
				}
			})
			
			// so we don't get rate limited..
			setTimeout(() => { }, 250)
		}

		for (let [key, value] of summonerKDAMap) {
			const kills = value[0]
			const deaths = value[1]
			const assists = value[2]
			const finalKD = ((kills + assists) / deaths).toFixed(2)

			KDresults.push([key, Number(finalKD)])
		}

		KDresults.sort((a, b) => a[1] - b[1])
		let results = [KDresults[0], KDresults[1], KDresults[2]]
		res.status(200).json({ results })

	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'server error' })
	}
})
 
module.exports = router;