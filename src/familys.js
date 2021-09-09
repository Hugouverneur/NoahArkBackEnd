const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/familys', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO familys (family_name, order_id) VALUES (?,?)', // Requete SQL
            [req.body.family_name, req.body.order_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/familys', function (req, res, next) {
        db.query(
            'SELECT * FROM familys f JOIN orders o ON f.order_id = o.order_id JOIN class c ON o.class_id = c.class_id JOIN phylums p ON c.phylum_id = p.phylum_id JOIN kingdoms k ON p.kingdom_id = k.kingdom_id ORDER BY f.family_name',
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

    router.delete('/familys/:id', function (req, res, next) {
        db.query(
            'DELETE FROM familys WHERE family_id=?',
            [req.params.family_id],
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