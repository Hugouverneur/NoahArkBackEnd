const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/class', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO class (class_name, phylum_id) VALUES (?,?)', // Requete SQL
            [req.body.class_name, req.body.phylum_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/class', function (req, res, next) {
        db.query(
            'SELECT * FROM class c JOIN phylums p ON c.phylum_id = p.phylum_id JOIN kingdoms k ON p.kingdom_id = k.kingdom_id ORDER BY class_name',
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

    router.delete('/class/:id', function (req, res, next) {
        db.query(
            'DELETE FROM class WHERE class_id=?',
            [req.params.class_id],
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