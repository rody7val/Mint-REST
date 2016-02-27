var Story = require('../models/story');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

// Controllers
var userController = require('../controllers/user_controller');
var storyController = require('../controllers/story_controller');

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
    api.get('/stories', storyController.getAll);

    /**
     * Get specific story details from server
     * with provided story id.
     */
    api.get('/story', storyController.story);

    /**
     * Removing the selected story
     * from server.
     */
    api.get('/remove_story', storyController.remove_story);

    /**
     * Search all the stories and return data that matches with
     * provided query and criteria.
     **/
    api.get('/search_story', storyController.search_story);

    /**
     * Search stories according to the given category.
     */
    api.get('/search_story_by_category', storyController.search_story_by_category);

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
    api.post('/story', storyController.new);

    /**
     * Get all user stories from server with registered user id..
     */
    api.get('/story_of_user', storyController.story_of_user);

    /**
     * Getting about logged user.
     */
    api.get('/me', userController.me);

    /**
     * Update story model with data from req.
     **/
    api.post('/update_story', storyController.update_story);

    /**
     * Returning the API.
     */
    return api;
};
