let mongoose = require('mongoose');
let morgan = require("morgan");
let express = require('express');
let app = express();
let Task = require('./models/task');
let Developer = require('./models/developer');
let bodyParser = require("body-parser");
let url = 'mongodb://localhost:27017/week6';

app.use(morgan('common'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static('img'));
app.use(express.static('css'));
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(url, function(err){
    if(err){
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected!!!');
});

app.get('/',function(req,res){
    res.render('index.html');
});

app.get('/listtasks',function(req,res){
    Task.find({},function(err, docs){
        res.render('listtasks.html',{db: docs});
    })
});

app.get('/addtask',function(req,res){
    res.render('addtask.html');
});

app.get('/insertdeveloper',function(req,res){
    res.render('insertdeveloper.html');
});

app.get('/listdevelopers',function(req,res){
    Developer.find({},function(err, docs){
        res.render('listdevelopers.html',{db: docs});
    })
});

app.get('/update',function(req,res){
    res.render('update.html');
});

app.get('/delete',function(req,res){
    res.render('delete.html');
});


app.post('/data',function(req,res){
    res.render('addtask.html');
});

app.post('/data2',function(req,res){
    res.render('insertdeveloper.html');
});

app.post('/data3',function(req,res){
    Task.find({},function(err, docs){
        res.render('listtasks.html',{db: docs});
    })
});

app.post('/data4',function(req,res){
    Developer.find({},function(err, docs){
        res.render('listdevelopers.html',{db: docs});
    })
});

app.post('/data5',function(req,res){
    res.render('delete.html');
});

app.post('/data6',function(req,res){
    res.render('update.html');
});


app.post('/addtask',function(req,res){
    let detail = req.body;
    let name = detail.taskName;
    let assign = detail.assignTo;
    let date =detail.dueDate;
    let status = detail.taskStatus;
    let des = detail.taskDescription;
    let task = new Task({
        _id: new mongoose.Types.ObjectId(),
        taskName: name,
        assignTo: assign,
        dueDate: date,
        taskStatus:status,
        taskDescription: des
    });
    task.save(function(err){
        if(err) console.log(err);
        else console.log("Task saved!!!");
    })
    res.redirect('/listtasks');
});

app.post('/insertdeveloper',function(req,res){
    let detail = req.body;
    let developer = new Developer({
        name: {
            firstName: detail.firstName,
            lastName: detail.lastName
        },
        level: detail.level,
        address: {
            State: detail.State,
            Suburb: detail.Suburb,
            Street: detail.Street,
            Unit: detail.Unit
        }
    });
    developer.save(function(err){
        if(err) console.log(err);
        else console.log("Developer saved!!!");
    });
    res.redirect('/listtasks');
});

app.post('/updateTask',function(req,res){
    
    let id = req.body.id;
    let status = req.body.newStatus;
    Task.updateOne({_id: id},{$set:{taskStatus: status}},function(err,doc){
        if(err){
            console.log(err);
        }
    });
    res.redirect('/listtasks'); 
});

app.post('/deleteTask',function(req,res){
    let id = req.body.id;
    Task.deleteOne({_id: id},function(err,docs){
        if(err){
            console.log(err);
        }
    });
});

app.post('/deleteAll',function(req,res){
    Task.deleteMany({},function(err,doc){
        if(err){
            console.log(err);
        }
    });
});

app.listen(8080);