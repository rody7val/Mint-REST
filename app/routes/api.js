var Story = require('../models/story');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

// Controllers
var userController = require('../controllers/user_controller');

module.exports = function (app, express) {

    var api = express.Router();

    /**
     * Create new user and save in database.
     */
    api.post('/signup', userController.signup);

    /**
     * Get all users from the database.
     */
    api.get('/users', userController.getAll);

    /**
     * Taking username and password.
     * Creating a new login.
     */
    api.post('/login', userController.login);

    /**
     * Get all user stories from server..
     */
    api.get('/stories', function (req, res) {
        Story.find({'publishStatus': 1}, function (err, stories) {
            if (err) {
                res.send(err);
                return
            }
            res.json(stories);
        });
    });

    /**
     * Get specific story details from server
     * with provided story id.
     */
    api.get('/story', function (req, res) {
        Story.find({_id: req.param('id')}, function (err, story) {
            if (err) {
                res.send(err);
                return
            }
            res.json(story);
        });
    });

    /**
     * Removing the selected story
     * from server.
     */
    api.get('/remove_story', function (req, res) {
        Story.remove({_id: req.param('id')}, function (err) {
            if (err) {
                res.send(err);
                return
            }
            res.json({message: "Successfuly removed", type: "success"});
        });
    });

    /**
     * Search all the stories and return data that matches with
     * provided query and criteria.
     **/
    api.get('/search_story', function (req, res) {
        Story.find({$and: [{'content': new RegExp(req.param('query'), 'i')}, {'publishStatus': 1}]}, function (err, stories) {
            if (err) {
                res.send(err);
                return
            }
            res.json(stories);
        });
    });

    /**
     * Search stories according to the given category.
     */
    api.get('/search_story_by_category', function (req, res) {
        Story.find({$and: [{category: req.param('category')}, {'publishStatus': 1}]}, function (err, stories) {
            if (err) {
                res.send(err);
                return
            }
            res.json(stories);
        });
    });

    /**
     * Search with the username and check if there is a user available or not.
     **/
    api.get('/searchUserWithEmail', userController.searchUserWithEmail);

    /**
     * Check logged status in order to
     * give permission to following links.
     */
    api.use(function (req, res, next) {
        console.log("Somebody logged into system");
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        // Check if token exists.
        if (token) {
            jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    res.status(403).send({success: false, message: "Failed to authenticate"});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({success: false, message: "No valid token provided"});
        }
    });

    /**
     * Create new story.
     */
    api.post('/story', function (req, res) {
        var story = new Story({
            owner: req.decoded._id,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            publishStatus: req.body.publishStatus
        });
        story.save(function (err) {
            if (err) {
                res.status(500).send(err);
                return
            }
            res.json({message: "New Story Created", type: "success", code: 200});
        });
    });

    /**
     * Get all user stories from server with registered user id..
     */
    api.get('/story_of_user', function (req, res) {
        Story.find({owner: req.decoded._id}, function (err, stories) {
            if (err) {
                res.send(err);
                return
            }
            res.json(stories);
        });
    });

    /**
     * Getting about logged user.
     */
    api.get('/me', userController.me);

    /**
     * Update story model with data from req.
     **/
    api.post('/update_story', function (req, res) {
        var story = {
            owner: req.decoded._id,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            publishStatus: req.body.publishStatus
        };
        console.log("Story : ", story);
        Story.findOneAndUpdate({'_id': req.body.storyId}, story, function (err) {
            if (err) {
                res.status(500).send(err);
                return
            }
            res.json({message: "Story updated successfully"});
        });
    });

    /**
     * Returning the API.
     */
    return api;
};
