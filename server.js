const { addPost, getPosts, updateLikes, deletePost, incrementLikes } = require('./post')
const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.listen(3000, console.log("SERVIDOR ENCENDIDO"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })

app.get("/posts", async (req, res) => {
const posts = await getPosts()
res.json(posts)
})

app.post("/posts", async (req, res) => {
    try{
    const {title, url, description } = req.body
    await addPost(title, url, description, 0)
    res.send("Post agregado con éxito")
    }
    catch (error) {
        const { code } = error
        if (code == "23502") {
        res.status(400)
        .send("Se ha violado la restricción NOT NULL en uno de los campos de la tabla")
        } else {
        res.status(500).send(error)
        }
        }
    })

app.put("/posts/:id", async (req, res) => {
    const { id } = req.params
    const { likes } = req.query
    try{
        await updateLikes(likes, id)
        res.send("Likes modificado con éxito")
    } catch ({ code, message }) {
        res.status(code).send(message)
        }
    })

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params
    try {
      await incrementLikes(id)
      res.send("Likes aumentados con éxito")
    } catch ({ code, message }) {
      res.status(code).send(message)
    }
  })

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    await deletePost(id)
    res.send("Post eliminado con éxito")
    })