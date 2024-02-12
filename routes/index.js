
const express = require('express')
const router = express.Router()

const pool = require('../db.js')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})


router.get('/search', function (req, res) {
  console.log(req.query.q)

  let query = req.query.q
  query = query.replace(/[^a-zA-Z0-9]/g, '')


  try {
    const id = req.params.id
    const [player] = await.pool.promise().query('SELECT * FROM milton_player JOIN milton_stats ON milton_stats.player_id = milton_player.id WHERE milton_player.name LIKE "%query%";')
    res.render('stats.njk', {
      name: player.name
    })

  }
  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }



});

module.exports = router
