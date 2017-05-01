// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

var mongoose   = require('mongoose');

mongoose.connect('mongodb://root:root@ds127341.mlab.com:27341/mydb',options);

var conn = mongoose.connection

conn.on('error', console.error.bind(console, 'connection error:'));

var Restaurant     = require('./app/models/restaurant');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!!!' });   
});

router.route('/restaurant')
.post(function(req, res) {
        http://localhost:8080/api/
        var restaurant = new Restaurant();      // create a new instance of the Restaurant model
        restaurant.name = req.body.name;  // set the restaurant's name (comes from the request)

        // save the restaurant and check for errors
        restaurant.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Restaurant created!' });
        });
        
    })
.get(function(req, res) {
    Restaurant.find(function(err, restaurants) {
        if (err)
            res.send(err);
        res.json(restaurants);
    });
});
router.route('/restaurant/:restaurant_id')

    // get the restaurant with that id (accessed at GET http://localhost:8080/api/restaurant/:restaurant_id)
    .get(function(req, res) {
        Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
            if (err)
                res.send(err);
            res.json(restaurant);
        });
    })
    .put(function(req, res) {

        // use our restaurant model to find the restaurant we want
        Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {

            if (err)
                res.send(err);

            restaurant.name = req.body.name;  // update the restaurants info

            // save the restaurant
            restaurant.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Restaurant updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Restaurant.remove({
            _id: req.params.restaurant_id
        }, function(err, restaurant) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });


    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('App running on localhost:' + port);




