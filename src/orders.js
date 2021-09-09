const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/orders', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO orders (order_name, class_id) VALUES (?,?)', // Requete SQL
            [req.body.order_name, req.body.class_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/orders', function (req, res, next) {
        db.query(
            'SELECT * FROM orders o JOIN class c ON o.class_id = c.class_id JOIN phylums p ON c.phylum_id = p.phylum_id JOIN kingdoms k ON p.kingdom_id = k.kingdom_id ORDER BY o.order_name',
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

    router.delete('/orders/:id', function (req, res, next) {
        db.query(
            'DELETE FROM orders WHERE order_id=?',
            [req.params.order_id],
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