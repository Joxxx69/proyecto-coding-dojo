const controllers = require('../controllers/auth.controller');
const Authenticate = require('../auth/jwt.auth');

module.exports = function(app){
    app.post('/api/register', controllers.Register);
    app.post('/api/login', controllers.Login);
    app.get('/api/getAll',controllers.getAll);
}


  

