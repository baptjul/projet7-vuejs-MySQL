const fs = require('fs');
const db = require('../dbconfig');

exports.createPost = (req, res, next) => {
    let data = req.body
    let postPicture = '';
    console.log(data)
    console.log(req.file)
    if (req.file) {
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
    let sql = `SELECT idposts, text_content, image_content, time_post, user_iduser, iduser, username, profile_picture,
    (SELECT COUNT(likes) AS postLikes FROM likes WHERE likes.posts_idposts = idposts) Likes,
    (SELECT COUNT(dislikes) AS postDisLikes FROM likes WHERE likes.posts_idposts = idposts) Dislikes,
    (SELECT COUNT(idcomments) AS NbComments FROM comments WHERE comments.posts_idposts = idposts) Comments
    FROM posts INNER JOIN user ON iduser = posts.user_iduser ORDER BY time_post DESC;`
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result);
    })
};

exports.getUserPost = (req, res, next) => {
    let id = [req.params.id]
    let sql = `SELECT idposts, text_content, image_content, time_post, user_iduser, iduser, username, profile_picture,
    (SELECT COUNT(likes) AS postLikes FROM likes WHERE likes.posts_idposts = idposts) Likes,
    (SELECT COUNT(dislikes) AS postDisLikes FROM likes WHERE likes.posts_idposts = idposts) Dislikes,
    (SELECT COUNT(idcomments) AS NbComments FROM comments WHERE comments.posts_idposts = idposts) Comments
    FROM posts INNER JOIN user ON iduser = posts.user_iduser WHERE iduser = ? ORDER BY time_post DESC;`
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
    let sql = "DELETE FROM posts WHERE idposts = ?;"
    db.query(checkPost, value, (error, result) => {
        if (error) {
            return res.status(401).json(error, "database not connected !");
        } if (result[0].image_content) {
            const filename = result[0].image_content.split('/images/posts/')[1];
            fs.unlink(`images/posts/${filename}`, (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                }
            })
        }
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
    const idpost = req.params.idpost
    let value = [idpost, iduser]
    let sql = `SELECT * FROM likes WHERE likes.posts_idposts = ? AND likes.user_iduser = ?`
    db.query(sql, value, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result);
    })
};

exports.likeAndDislikePosts = (req, res, next) => {
    const postid = req.params.id
    const userid = req.body.iduser;
    const like = req.body.likes
    const data = [like, userid, postid]
    let sql = `CALL likeAction(?, ?, ?)`
    db.query(sql, data, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        console.log('like action')
        return res.status(200).json(result);
    })
};
