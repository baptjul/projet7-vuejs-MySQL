const joi = require('joi');
const fs = require('fs');
const db = require('../dbconfig');

const { Comments } = require('../models/Comments');


exports.getComments = (req, res, next) => {
    let id = [req.body.idposts]
    let sql = "CALL getComments(?)"
    db.query(sql, id, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Comment created");
    })
};

exports.createComment = (req, res, next) => {
    let data = req.body
    let values = [data.comment, NOW(), data.idposts, data.iduser]
    let sql = "CALL createComment(?, ?, ?, ?);"
    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(400).json("error")
        }
        res.status(200).json("Comment created");
    })
};

exports.deleteComment = (req, res) => {
    let value = req.params.id
    let sql = "CALL deleteComment(?);"
    db.query(sql, value, (error, result) => {
        if (error) {
            return res.status(401).json("database not connected !");
        }
        const filename = result.imageUrl.split('/images/user/')[1];
        fs.unlink(`images/${filename}`, () => {
            res.status(200).json("Comment deleted");
        })
    });
}


exports.likeAndDislikeComments = (req, res, next) => {
    const commentid = req.body.idcomments;
    const userid = req.body.iduser;
    const data = [commentid, userid]
    const dataRemoved = [0, commentid, userid]
    const dataAdded = [1, commentid, userid]
    switch (req.body.like) {
        case 0:
            let sql = "SELECT * FROM likes WHERE likes.comments_idcomments = ? AND likes.user_iduser = ? ;"
            db.query(sql, data, (error, result) => {
                if (error) {
                    return res.status(401).json("database not connected !");
                }
                if (result.like === 1 && result.dislike === 0) {
                    let connection = "UPDATE likes SET likes = ? WHERE likes.comments_idcomments = ? AND likes.user_iduser = ?;"
                    db.query(connection, dataRemoved, (error, result) => {
                        res.status(200).json("like remove");
                    })
                } else if (result.dislike === 1 && result.like === 0) {
                    let connection = "UPDATE likes SET dislikes = ? WHERE likes.comments_idcomments = ? AND likes.user_iduser = ?;"
                    db.query(connection, dataRemoved, (error, result) => {
                        res.status(200).json("like remove");
                    })
                }
            })
            break;
        case 1:
            let updateLike = "UPDATE likes SET likes = ? WHERE likes.comments_idcomments = ? AND likes.user_iduser = ?;"
            db.query(updateLike, dataAdded, (error, result) => {
                if (error) {
                    return res.status(401).json("database not connected !");
                }
                res.status(200).json("posts liked");
            });
            break;
        case -1:
            let updateDislike = "UPDATE likes SET dislikes = ? WHERE likes.comments_idcomments = ? AND likes.user_iduser = ?;"
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