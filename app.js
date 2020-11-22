const Joi = require('joi'); //class //joi@13.1.0
const express = require('express');
const app = express();



const port = app.get('port') || 3000;
app.listen(port,()=> console.log('listing to port ' ,port));

app.use(express.json());

const courses = [
    {id:1,name:'one'},
    {id:2,name:'two'},
    {id:3,name:'three'}
];

app.get('/',(req,res)=>{
res.send('Hello world');
});

app.get('/courses',(req,res)=>{
   // res.send([1,2,3,4,5]);
   res.send(courses);
});

 app.get('/courses/:id',(req,res)=>{
    //res.send(req.params.id);
   const course=  courses.find(c=> c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('the course id not found');
   res.send(course);
  });

  app.get('/:year/:month',(req,res)=>{
    res.send(req.params);
   // res.send(req.query); link?sortBy=name
  });

  app.post('/courses',(req,res)=>{
    //   if(!req.body.name || req.body.name.length <3){
    //       //400 bad request
    //       res.status(400).send('Name requrid and must not be less than 4');
    //       return;
    //   }
    const {error} = validateCourse(req.body);
    
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id : courses.length +1,
        name : req.body.name,
    };
    courses.push(course);
    res.send(course);
  });

  app.put('/courses/:id',(req,res)=>{
    const course=  courses.find(c=> c.id === parseInt(req.params.id)); //where in dart or firstWhere 
    if(!course) return res.status(404).send('the course id not found');
     //   const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); //result.error , validate = {valid , error} . we made a destructure.
    
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);

  });
  
  app.delete('/deleteCourse/:id',(req,res)=>{
    const course=  courses.find(c=> c.id === parseInt(req.params.id)); //where in dart or firstWhere 
    if(!course) return res.status(404).send('the course id not found'); // === {return ;} , return make me exit that func ..

    const index = courses.indexOf(course);
    courses.splice(index,1); // remove one obj from our list
  });

  function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);
  }