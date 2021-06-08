const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/users', (req, res, next) => {
        db.query(
            'INSERT INTO users (user_nom, user_prenom) VALUES (?,?)', // Requete SQL
            [req.body.user_nom, req.body.user_prenom], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.get('/users', function (req, res, next) {
        db.query(
            'SELECT * FROM users ORDER BY user_id',
            [10*(req.params.page || 0)],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('/users/:id', function (req, res, next) {
        db.query(
            'UPDATE users SET user_nom=?, user_prenom=?, WHERE user_id=?',
            [req.body.user_nom, req.body.user_prenom, req.params.user_id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.delete('/users/:id', function (req, res, next) {
        db.query(
            'DELETE FROM users WHERE user_id=?',
            [req.params.user_id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;