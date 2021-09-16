const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/storage', (req, res, next) => {
        db.query(
            'INSERT INTO storages (storage_numberofroom, site_id) VALUES (?,?)', // Requete SQL
            [req.body.storage_numberofroom, req.body.site_id], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/storage/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM storages WHERE site_id =? ORDER BY storage_id',
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

    router.delete('/storage/:id', function (req, res, next) {
        db.query(
            'DELETE FROM storage WHERE storage_id=?',
            [req.params.storage_id],
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