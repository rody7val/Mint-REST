var Story = require('../models/story');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

// Controllers
var userController = require('../controllers/user_controller');
var storyController = require('../controllers/story_controller');
var accessController = require('../controllers/access_controller');

module.exports = function (app, express) {

    var api = express.Router();

    /**
     * @api {post} /signup Crear nuevo Usuario
     * @apiName NevoUsuario
     * @apiGroup Usuario
     * @apiVersion 1.0.0
     *
     * @apiParam {String} name Nombre de la persona.
     * @apiParam {String} username Nombre de Usuario.
     * @apiParam {String} email Direccion de email.
     * @apiParam {String} password Contrseña de Usuario.    
     *
     * @apiSuccess {String} message Mensaje de exito
     * @apiSuccess {String} token Nuevo token de session
     * @apiSuccess {String} id Id de Usuario
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
     * Create new story.
     */
    api.post('/story', accessController.confirmToken, storyController.new);

    /**
     * Get all user stories from server with registered user id..
     */
    api.get('/story_of_user', accessController.confirmToken, storyController.story_of_user);

    /**
     * Getting about logged user.
     */
    api.get('/me', accessController.confirmToken, userController.me);

    /**
     * Update story model with data from req.
     **/
    api.post('/update_story', accessController.confirmToken, storyController.update_story);

    /**
     * Returning the API.
     */
    return api;
};
