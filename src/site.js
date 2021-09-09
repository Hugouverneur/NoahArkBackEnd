const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/site', (req, res, next) => {
        db.query(
            'INSERT INTO sites (site_city, site_country) VALUES (?,?)', // Requete SQL
            [req.body.site_city, req.body.site_country], // Données qui remplaceront les ?. /!\ Bien vérifier que le nom des clés correspond à ce qui est envoyé coté front
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

    router.get('/site', function (req, res, next) {
        db.query(
            'SELECT * FROM sites ORDER BY site_city',
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

    router.delete('/site/:id', function (req, res, next) {
        db.query(
            'DELETE FROM site WHERE site_id=?',
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