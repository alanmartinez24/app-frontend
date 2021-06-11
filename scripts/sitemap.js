
  const axios = require('axios')
  const router = require('../src/pages/sitemap-routes').default
  const Sitemap = require('react-router-sitemap').default
  require('../config/env')

  const { BACKEND_API, WEB_APP_URL } = process.env
  async function generateSitemap () {
    try {
      let users = (await axios.get(`${BACKEND_API}/levels/`)).data
      let collections = (await axios.get(`${BACKEND_API}/collections/`)).data
      let leaderboards = (await axios.get(`${BACKEND_API}/v1/lists/listInfo/`)).data
      let usersMap = []
      let collectionsMap = []
      let leaderboardsMap = []
      for (let leaderboard of leaderboards) {
        for (let category of leaderboard.categories) {
          leaderboardsMap.push({ site: 'site=' + leaderboard.location.name, subject: 'subject=' + leaderboard.subject.name, category: 'category=' + category.name })
}
      }
      for (let user of users) {
        if (user.username) usersMap.push({ username: user.username })
      }
      for (let collection of collections) {
        if (collection._id && collection.name) {
          collectionsMap.push({ name: collection.name, id: collection._id })
        }
      }
      const paramsConfig = {
        '/:username': usersMap,
        '/:username/analytics': usersMap,
        '/collections/:name/:id': collectionsMap,
        '/leaderboard?:site&:subject&:category': leaderboardsMap
      }
      return (
        new Sitemap(router)
            .applyParams(paramsConfig)
            .build(WEB_APP_URL)
            .save('./public/sitemap.xml')
      )
    } catch (e) {
      console.log(e)
    }
  }

  generateSitemap()
