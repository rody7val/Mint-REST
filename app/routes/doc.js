var config = require('../../config');
var path = require('path');

// Controllers
var accessController = require('../controllers/access_controller');

module.exports = function (app, express) {

    var doc = express.Router();

    /**
     * Public dir
     */
    doc.use(express.static(path.join(config.dir + '/app/routes/doc')))

    /**
     * Documentation apidoc view
     */
    doc.get('/', accessController.apidoc);

    /**
     * Returning the API.
     */
    return doc;
};
