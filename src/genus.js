const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/genus', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO genus (genus_name, family_id) VALUES (?,?)', // Requete SQL
            [req.body.genus_name, req.body.family_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/genus', function (req, res, next) {
        db.query(
            'SELECT * FROM genus ORDER BY genus_id',
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

    router.delete('/genus/:id', function (req, res, next) {
        db.query(
            'DELETE FROM genus WHERE genus_id=?',
            [req.params.genus_id],
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