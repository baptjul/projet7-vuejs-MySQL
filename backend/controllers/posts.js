const joi = require('joi');
const fs = require('fs');
const db = require('../dbconfig');

const { Posts } = require('../models/Posts');

exports.createPost = (req, res, next) => {
    let data = req.body
    let commentPicture = '';
    if (data.image) {
        commentPicture = `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } else {
        commentPicture = 'NULL'
    }
    let values = [data.post, commentPicture, NOW(), data.iduser]
    let sql = "CALL createPost(?, ?, ?, ?);"
    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Post created");
    })
};

exports.getPost = (req, res, next) => {
    let sql = `CALL getPosts`
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Posts recovered");
    })
    next()
};

exports.getUserPost = (req, res, next) => {
    let id = [req.params.id]
    let sql = `CALL getUserPosts(?)`
    db.query(sql, id, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Posts recovered");
    })
    next()
};

exports.deletePost = (req, res) => {
    const id = req.body._id
    let value = [id]
    let sql = "CALL deletePost(?);"
    db.query(sql, value, (error, result) => {
        if (error) {
            return res.status(401).json("database not connected !");
        }
        const filename = result.imageUrl.split('/images/posts/')[1];
        fs.unlink(`images/${filename}`, () => {
            res.status(200).json("Post deleted");
        })
    });
}

exports.likeAndDislikePosts = (req, res, next) => {
    const postid = req.body.idposts;
    const userid = req.body.iduser;
    const data = [postid, userid]
    const dataRemoved = [0, postid, userid]
    const dataAdded = [1, postid, userid]
    switch (req.body.like) {
        case 0:
            let sql = "CALL getlike(?, ?);"
            db.query(sql, data, (error, result) => {
                if (error) {
                    return res.status(401).json("database not connected !");
                }
                if (result.like === 1 && result.dislike === 0) {
                    let connection = "UPDATE likes SET likes = ? WHERE likes.posts_idposts = ? AND likes.user_iduser = ?;"
                    db.query(connection, dataRemoved, (error, result) => {
                        res.status(200).json("like remove");
                    })
                } else if (result.dislike === 1 && result.like === 0) {
                    let connection = "UPDATE likes SET dislikes = ? WHERE likes.posts_idposts = ? AND likes.user_iduser = ?;"
                    db.query(connection, dataRemoved, (error, result) => {
                        res.status(200).json("like remove");
                    })
                }
            })
            break;
        case 1:
            let updateLike = "UPDATE likes SET likes = ? WHERE likes.posts_idposts = ? AND likes.user_iduser = ?;"
            db.query(updateLike, dataAdded, (error, result) => {
                if (error) {
                    return res.status(401).json("database not connected !");
                }
                res.status(200).json("posts liked");
            });
            break;
        case -1:
            let updateDislike = "UPDATE likes SET dislikes = ? WHERE likes.posts_idposts = ? AND likes.user_iduser = ?;"
            db.query(updateDislike, dataAdded, (error, result) => {
                if (error) {
                    return res.status(401).json("database not connected !");
                }
                res.status(200).json("posts disliked");
            });
            break;
        default:
            throw { error: "failed operation" };
    }
}
