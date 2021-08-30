const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/phylum', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO phylum (phylum_name, kingdom_id) VALUES (?,?)', // Requete SQL
            [req.body.phylum_name, req.body.kingdom_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/phylum', function (req, res, next) {
        db.query(
            'SELECT * FROM phylum ORDER BY phylum_id',
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

    router.delete('/phylum/:id', function (req, res, next) {
        db.query(
            'DELETE FROM phylum WHERE phylum_id=?',
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