const express = require('express')
const getSummonerRoute = require('./routes/getSummoner')
const getMatchesRoute = require('./routes/getMatches')
const getMatchDataRoute = require('./routes/getMatchData')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')

app.use(express.json())
app.use(cors({
	origin: 'http://localhost:3000'
}));

app.get('/test', (req, res) => {
	res.status(200).json({ message: "API working!" })
})

// localhost:4000/summoner/:summoner (:summoner: <users summoner name>)
app.use('/summoner', getSummonerRoute)

// localhost:4000/matches (req.body requirements: { puuid: "" })
app.use('/matches', getMatchesRoute)

// localhost:4000/matchData (req.body requirements: { matches: [], puuid: "" })
app.use('/matchData', getMatchDataRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))