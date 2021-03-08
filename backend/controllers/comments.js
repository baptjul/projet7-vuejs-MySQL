const db = require('../dbconfig');

exports.getComments = (req, res) => {
    const id = [req.params.id]
    const sql = `SELECT idcomments, content, time_comment, posts_idposts, user_iduser, iduser, username, profile_picture
    FROM comments INNER JOIN user ON iduser = comments.user_iduser WHERE comments.posts_idposts = ? ORDER BY time_comment DESC;`
    db.query(sql, id, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json(result);
    })
};

exports.createComment = (req, res) => {
    const data = req.body
    const values = [data.content, data.idposts, data.iduser]
    const sql = "INSERT INTO comments (content, time_comment, posts_idposts, user_iduser) VALUES (?, CURRENT_TIMESTAMP(), ?, ?);"
    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json("Comment created");
    })
};

exports.deleteComment = (req, res) => {
    const value = req.params.id
    const sql = "DELETE FROM comments WHERE idcomments = ?;"
    db.query(sql, value, (error, result) => {
        if (error) {
            return res.status(401).json(error);
        }
        return res.status(200).json(result);
    });
}