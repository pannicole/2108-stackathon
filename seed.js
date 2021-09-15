const { User, Post, db } = require("./server/db/database")

const users = [{
  username: "nicole",
  password: "npw"
}, {
  username: "devin",
  password: "dpw"
}, {
  username: "andrea",
  password: "apw"
}, {
  username: "ricky",
  password: "rpw"
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

  await nicole.addPost(post)
  await devin.addPost(post2)
  await andrea.addPost(post3)
  await ricky.addPost(post4)
}

seed().then( ()=> {
  console.log("seeding success");
  db.close();
})
