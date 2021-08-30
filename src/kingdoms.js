const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/kingdoms', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO kingdoms (kingdom_name) VALUES (?)', // Requete SQL
            [req.body.kingdom_name], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/kingdoms', function (req, res, next) {
        db.query(
            'SELECT * FROM kingdoms ORDER BY kingdom_id',
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

    router.delete('/kingdoms/:id', function (req, res, next) {
        db.query(
            'DELETE FROM kingdoms WHERE kingdom_id=?',
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