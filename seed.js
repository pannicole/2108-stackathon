const { User, Post, db } = require("./server/db/database")

const users = [{
  username: "nicole"
}, {
  username: "devin"
}, {
  username: "andrea"
}, {
  username: "ricky"
}]

const posts = [ {
  description: "hungry"
}, {
  description: "sleepy"
}, {
  description: "happy"
}, {
  description: "coffee"
}
]

const seed = async() => {
  await db.sync({ force: true });
  const [nicole, devin, andrea, ricky] = await Promise.all( users.map( (user) => User.create(user)))

  const [post , post2, post3, post4] = await Promise.all( posts.map( (post) => Post.create(post)))
}

seed().then( ()=> {
  console.log("seeding success");
  db.close();
})
