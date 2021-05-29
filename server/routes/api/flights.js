const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const Flight = require('../../models/Flight');
/*
router.get('/', async (req, res) => {

    try {
        const flights = await Flight.find();
        if (flights.length == 0) {
            return res.status(400).json({
                msg: 'There is no flights'
            });
        }
        res.json(flights);
    } catch (err) {
        res.status(500).send(err.msg);
    }
})

*/

router.get('/', async (req, res) => {
    try {
        for (const key in req.query) {
            console.log(key, req.query[key])
        }

        const flights = await Flight.find({
            from: req.query.from,
            to: req.query.to,
            departureDate: req.query.departure,
            arrivalDate: req.query.arrival
        });

        console.log('...flights found.....' + flights.length);
        if (flights.length == 0) {
            return res.status(400).json({
                msg: 'There is no flights'
            });
        }
        res.json(flights);
    } catch (err) {
        res.status(500).send(err.msg);
    }
})


// To post a new flight
router.post('/', [
    check('from', 'From is required')
        .not()
        .isEmpty(),
    check('to', 'To is required')
        .not()
        .isEmpty(),
    check('departureDate', 'Depurture Date is required')
        .not()
        .isEmpty(),
    check('arrivalDate', 'Arrival Date is required')
        .not()
        .isEmpty(),
    check('price', 'Price is required')
        .not()
        .isEmpty(),
    check('airlineName', 'Airline is required')
        .not()
        .isEmpty(),
    check('route', 'Route is required')
        .not()
        .isEmpty(),
    check('deal', 'Deal is required')
        .not()
        .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newFlight = new Flight({
            from: req.body.from,
            to: req.body.to,
            arrivalDate: req.body.arrivalDate,
            departureDate: req.body.departureDate,
            price: req.body.price,
            airlineName: req.body.airlineName,
            route: req.body.route,
            deal: req.body.deal
        });
        await newFlight.save();
        const flights = await Flight.find();
        if (flights.length == 0) {
            return res.status(400).json({
                msg: 'There is no flights'
            });
        }
        res.json(flights);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// remove flight
router.delete('/:flight_id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.flight_id);
        if (!flight) {
            return res.status(401).json({ msg: 'Flight Not Found !!' });
        }
        console.log('Removing Flight !!!');
        await flight.remove();
        res.json({ msg: 'Flight Removed' });
    } catch (err) {
        console.error(err.msg);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'flight not found'
            });
        }
        res.status(500).send('Server Error');
    }
})

module.exports = router;