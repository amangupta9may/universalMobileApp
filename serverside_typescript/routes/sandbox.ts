
import {Router} from 'express';
import sample from '../app_modules/sample';

const sandbox = Router();

sandbox.get('/', function(req, res, next) {
 // 
var t = new sample();
t.executeQuery();
//res.render('sandbox', { title: 'sandbox'});
res.send(JSON.stringify({ a: 1 }));
});

export default sandbox;