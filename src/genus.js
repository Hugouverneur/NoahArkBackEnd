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
            'SELECT * FROM genus g JOIN familys f ON g.family_id = f.family_id JOIN orders o ON f.order_id = o.order_id JOIN class c ON o.class_id = c.class_id JOIN phylums p ON c.phylum_id = p.phylum_id JOIN kingdoms k ON p.kingdom_id = k.kingdom_id ORDER BY g.genus_name',
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