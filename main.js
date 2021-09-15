const app = require('./server')
const { db } = require('./server/db/database')

db.sync({force: true}).then(function() {
  app.listen(8080, ()=> console.log('Server started on port 8080'))
})
