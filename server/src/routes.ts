import express from 'express';
import {celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from '../config/multer';

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController';

// padrões metodos: index(listagem), show( exibir um único registro), create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);

const pointController = new PointsController();
const itemsController = new ItemsController();



routes.get('/items', itemsController.index);

// validação 
routes.post('/points', upload.single('image'), celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
}, {
    abortEarly: false
}) 
,pointController.create);

routes.get('/points', pointController.index);
routes.get('/points/:id',pointController.show);

export default routes;