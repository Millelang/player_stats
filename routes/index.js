
const express = require('express')
const router = express.Router()

const pool = require('../db.js')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})


router.get('/stats', async function (req, res) {

  
  let query = req.query.searchQueryInput
  if (query) {
    query = query.replace(/[^a-zA-Z0-9]/g, '')
    try {
      const [player] = await pool.promise().query(`
      SELECT * FROM milton_player 
      JOIN milton_stats 
      ON milton_stats.player_id = milton_player.id WHERE milton_player.name LIKE "%${query}%"
      LIMIT 1`)
     res.render('stats.njk', { player: player[0], title: 'Stats' })
      console.log(player)
    }
    catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  } else {
    res.send('No query provided')
  }
});

module.exports = router
