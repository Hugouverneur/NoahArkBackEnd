const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/spicies', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO spicies (spicies_name, genus_id) VALUES (?,?)', // Requete SQL
            [req.body.spicies_name, req.body.genus_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/spicies', function (req, res, next) {
        db.query(
            'SELECT * FROM spicies ORDER BY spicies_id',
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

    router.delete('/spicies/:id', function (req, res, next) {
        db.query(
            'DELETE FROM spicies WHERE spicies_id=?',
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