const fs = require('fs');
const db = require('../dbconfig');

exports.createPost = (req, res, next) => {
    let data = req.body
    let postPicture = '';
    if (data.image) {
        postPicture = `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } else {
        postPicture = null
    }
    let values = [data.post, postPicture, data.iduser]
    let sql = "INSERT INTO posts (text_content, image_content, time_post, user_iduser) VALUES (?, ?, CURRENT_TIMESTAMP(), ?);"
    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json("Post created");
    })
};

exports.getPost = (req, res, next) => {
    let sql = `CALL getPosts`
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result);
    })
};

exports.getUserPost = (req, res, next) => {
    let id = [req.params.id]
    let sql = `CALL getPostUser(?)`
    db.query(sql, id, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result);
    })
};

exports.deletePost = (req, res) => {
    const id = req.params.id
    let value = [id]
    let checkPost = "SELECT idposts, image_content FROM posts WHERE idposts = ?"
    db.query(checkPost, value, (error, result) => {
        if (error) {
            return res.status(401).json(error, "database not connected !");
        } if (result[0].image_content !== null || '') {
            const filename = result[0].image_content.split('/images/posts/')[1];
            fs.unlink(`images/${filename}`)
        }
        let sql = "DELETE FROM posts WHERE idposts = ?;"
        db.query(sql, value, (error, result) => {
            if (error) {
                return res.status(401).json(error, "database not connected !");
            }
            console.log('message supprimé')
            return res.status(200).json(result);
        });
    });
}

exports.likeOnPost = (req, res, next) => {
    const iduser = req.params.iduser
    const idpost = req.params.idposts
    let value = [idpost, iduser]
    let sql = `SELECT * FROM likes WHERE likes.post_idposts = ? AND likes.user_iduser = ?`
    db.query(sql, value, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result);
    })
};

exports.likeAndDislikePosts = (req, res, next) => {
    const postid = req.body.idpost
    const userid = req.body.iduser;
    const data = [postid, userid]
    const dataRemoved = [0, postid, userid]
    const dataAdded = [1, postid, userid]
    switch (req.body.like) {
        case 0:
            let sql = "SELECT * FROM likes WHERE likes.posts_idposts = ? AND likes.user_iduser = ?;"
            db.query(sql, data, (error, result) => {
                if (error) {
                    return res.status(401).json(error, "database not connected !");
                }
                if ((result[0].like === 1 || result[0].dislike === 1) && result[0].dislike === 0) {
                    let connection = "DELETE FROM likes WHERE likes.posts_idposts = ? AND likes.user_iduser = ?;"
                    db.query(connection, dataRemoved, (error, result) => {
                        if (error) {
                            return res.status(401).json(error);
                        }
                        console.log("removed like or dislike")
                        return res.status(200).json(result);
                    })
                }
            })
            break;
        case 1:
            let updateLike = "INSERT INTO likes (likes, posts_idposts, user_iduser) VALUES (?, ?, ?);"
            db.query(updateLike, dataAdded, (error, result) => {
                if (error) {
                    return res.status(401).json(error);
                }
                console.log("liked")
                return res.status(200).json(result);
            });
            break;
        case -1:
            let updateDislike = "INSERT INTO likes (dislikes, posts_idposts, user_iduser) VALUES (?, ?, ?);"
            db.query(updateDislike, dataAdded, (error, result) => {
                if (error) {
                    return res.status(401).json(error);
                }
                console.log("disliked")
                return res.status(200).json(result);
            });
            break;
        default:
            throw { error: "failed operation" };
    }
}
