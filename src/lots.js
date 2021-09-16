const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/lot', (req, res, next) => {
        db.query(
            'INSERT INTO lots (species_id, room_id) VALUES (?,?)', // Requete SQL
            [req.body.species_id, req.body.room_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/lot/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM lots l JOIN species s ON l.species_id = s.species_id WHERE room_id =? ORDER BY lot_id',
            [req.params.id],
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

    router.put('/lot/:id', function (req, res, next) {
        db.query(
            'UPDATE lots SET room_id=? WHERE lot_id=?',
            [req.body.room_id, req.body.lot_id],
            (error) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.delete('/lot/:id', function (req, res, next) {
        db.query(
            'DELETE FROM lot WHERE lot_id=?',
            [req.params.lot_id],
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