const controller = require('../controllers/furniture.controllers');
const Authenticate = require('../auth/jwt.auth');

module.exports = function(app) {
    app.post('/api/registerfurniture', controller.registerfurniture);
    app.get('/api/furnitures' ,controller.getAll);
    app.put('/api/updateFurniture/:id', controller.updateFurniture)
    app.get('/api/photofurniture/:id',controller.photofurniture);
    app.get('/api/furniture/:id', controller.getOne);
    app.delete('/api/delete/:id', controller.oneDelete);
    app.get('/api/range/:gte/:lte/:categoryId', controller.priceFurniture);
    app.get('/api/searchName/:nameProduct', controller.SearchName);
}