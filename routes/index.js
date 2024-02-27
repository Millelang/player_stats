
const express = require('express')
const router = express.Router()

const pool = require('../db.js')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})


router.get('/newplayer', function (req, res) {
  res.render('newplayer.njk', {title: 'new player'})
})


router.post('/newplayer', async function (req, res) {
  const stats = req.body

  try {
    const [player] = await pool.promise().query('INSERT INTO milton_player (name) VALUES (?);', [stats.name])
    const [playerStats] = await pool.promise().query('INSERT INTO milton_stats (player_id, matches_played, wins, kills, deaths) VALUES (?, ?, ?, ?, ?);', [player.insertId, stats.matches_played, stats.wins, stats.kills, stats.deaths])
    res.render('newplayer.njk', { title: 'Post' })
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
router.get('/list', async function (req, res) {
  try { 
    const [players] = await pool.promise().query('SELECT * FROM milton_player')
    res.render('list.njk', { players: players, title: 'Players' })
    
  }
  catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
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


router.get('/statsform.njk'), function (req ,res) {
  res.render('statsform.njk')
 
}

router.get('/stats/:id/delete', async function (req, res) {
  try {
    const [result] = await pool.promise().query(
      `DELETE FROM milton_player WHERE id = ?`,
      [req.params.id]
    )
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
  try {
    const [result2] = await pool.promise().query(
      `DELETE FROM milton_stats WHERE player_id = ?`,
      [req.params.id]
    )
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


module.exports = router
