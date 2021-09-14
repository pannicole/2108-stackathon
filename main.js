const app = require('./server')

const start = () => {
  app.listen(8080, ()=> console.log('Server started on port 8080'))
}

start()
