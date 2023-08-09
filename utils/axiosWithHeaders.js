const axios = require('axios')
require('dotenv').config()

const getSummonerRequest = axios.create({
  headers: {
    "X-Riot-Token": process.env.AUTH_TOKEN,
  },
  baseURL: "https://na1.api.riotgames.com",
});

const getMatchesRequest = axios.create({
	headers: {
		"X-Riot-Token": process.env.AUTH_TOKEN,
	},
	baseURL: "https://americas.api.riotgames.com"
})

module.exports = { getSummonerRequest, getMatchesRequest }