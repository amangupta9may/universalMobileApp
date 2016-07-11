import {Router} from 'express';

const index = Router();

class Car{
  //engine:string;//var dec
  constructor(public engine:string){
    this.engine = engine;
  }
  
  start(){
    return 'Engine Started '+ this.engine;
  }
  
  
}

index.get('/', function(req, res){
  //res.render('index', { title: 'index'});
  //document.title ="Sajal";
  console.log("check");
  
  var car= new Car("V8");
  //car.start();
  res.send(car.start());
});

/* GET Quick Start. */
index.get('/quickstart', function(req, res, next) {
  res.render('quickstart');
});

export default index;
