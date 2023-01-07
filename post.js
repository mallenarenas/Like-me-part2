const pool = require("./singletonPatern").getInstance();

const getDate = async () => {
    try{
        const result = await pool.query("SELECT NOW()")
    } catch(e){
        console.error(`Error al obtener la fecha actual: ${e.message}`)
    }
    }
getDate()

const addPost = async (title, img, description, likes) => {
    const query = "INSERT INTO posts (id, title, img, description, likes) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *"
    const values = [title, img, description, likes]
    try{
        const result = await pool.query(query, values)
    }
    catch (e) {
            console.log('error al insertar datos en tabla posts: ', e.code, e.message)
            throw new Error(e)
          }
}


const getPosts = async () => {
    SQLquery = {
        text: "SELECT * FROM posts ORDER BY id"
    };
    try {
    const result = await pool.query(SQLquery)
    return result.rows;
    } catch (e) {
        console.log(
          "error al obtener datos en tabla posts: ",
          e.code,
          e.message
        );
        throw new Error(e);
      }
    };

const updateLikes = async (likes, id) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2"
    const values = [likes, id]
    const {rowCount} = await pool.query(consulta, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se consiguió ningún post con este id" }
        }
    }

const deletePost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
    }
module.exports = { addPost, getPosts, updateLikes, deletePost }