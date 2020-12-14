const joi = require('joi');
const fs = require('fs');
const db = require('../dbconfig');

exports.createPost = (req, res, next) => {
    let data = req.body
    let commentPicture = '';
    if (req.body.image) {
        let commentPicture = `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } else {
        let commentPicture = 'NULL'
    }
    let sql = `INSERT INTO posts (text_content, time_post, post_picture, user_iduser, user_username) VALUES ("${data.post}", "NOW()", "${commentPicture}", "${}", "${}");` // ??????????
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Post created");
    })
};

exports.getPost = (req, res, next) => {
    let sql = `SELECT * FROM posts ORDER BY time_post ASC;`
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Posts recovered");
    })
};

exports.getPostUser = (req, res, next) => {
    let datetime = fullDate();
    let sql = `SELECT * FROM posts WHERe (userid = ${req.params.id}) AND (TIMESTAMPDIFF(NOW(), time_post) AS time_since_post ) ORDER BY time_post ASC LIMIT 50;`
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("User Posts recovered");
    })
};

exports.deletePost = (req, res) => {
    let sql = `DELETE FROM posts WHERE idposts = ${req.body._id};` // ??????????
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(401).json("database not connected !");
        }
        const filename = result.imageUrl.split('/images/posts/')[1];
        fs.unlink(`images/${filename}`, () => {
            res.status(200).json("Post deleted");
        })
    });
}

exports.createComment = (req, res, next) => {
    let data = req.body
    let sql = `INSERT INTO comments (content, time_comment, posts_idposts, user_iduser, user_username) VALUES ("${data.comment}", "NOW()", "${}", "${}", "${}");` // ???????????
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Comment created");
    })
};

exports.deleteComment = (req, res) => {
    let sql = `DELETE FROM comments WHERE idcomments = ${req.params.id};`
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(401).json("database not connected !");
        }
        const filename = result.imageUrl.split('/images/user/')[1];
        fs.unlink(`images/${filename}`, () => {
            res.status(200).json("Comment deleted");
        })
    });
}