const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/species', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO species (species_name, genus_id) VALUES (?,?)', // Requete SQL
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

    router.get('/species', function (req, res, next) {
        db.query(
            'SELECT * FROM species s JOIN genus g ON s.genus_id = g.genus_id JOIN familys f ON g.family_id = f.family_id JOIN orders o ON f.order_id = o.order_id JOIN class c ON o.class_id = c.class_id JOIN phylums p ON c.phylum_id = p.phylum_id JOIN kingdoms k ON p.kingdom_id = k.kingdom_id ORDER BY s.species_name',
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

    router.delete('/species/:id', function (req, res, next) {
        db.query(
            'DELETE FROM species WHERE species_id=?',
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