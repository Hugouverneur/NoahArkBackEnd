const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/room', (req, res, next) => {
        db.query(
            'INSERT INTO rooms (room_name, brightness_value, temperature_value, humidity_value, room_capacity, storage_id) VALUES (?,?,?,?,?,?)', // Requete SQL
            [req.body.room_name, req.body.brightness_value, req.body.temperature_value, req.body.humidity_value, req.body.room_capacity, req.body.storage_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/room/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM rooms WHERE storage_id =? ORDER BY room_id',
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

    router.delete('/room/:id', function (req, res, next) {
        db.query(
            'DELETE FROM room WHERE room_id=?',
            [req.params.room_id],
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