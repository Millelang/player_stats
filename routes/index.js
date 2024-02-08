const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

router.get('/search', function (req, res) {
  console.log(req.query.q)
  
  /*
  SELECT * FROM milton_players
  JOIN milton_platers ON milton_stats.player_id = milton_player.id
  WHERE milton_players.name LIKE "%QUERY%";
  */

 // let query = req.query.q
//  query = query.replace(/[^a-zA-Z0-9]/g, '')

  //res.render('search.njk', { title: 'Search', query: query })
  res.render('search.njk', { title: 'Search' })
})


module.exports = router
