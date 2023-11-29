const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const app = express();

const users = [];

let uniqueID = 0;

const userScheme = Joi.object({
    firstName: Joi.string().min(2).required(),
    secondName: Joi.string().min(2).required(),
    age: Joi.number().min(0).max(150).required(),
    city: Joi.string().min(3)
})


app.use(express.json())

app.get('/users', (req, res) => {
    const pathUsers = path.join(__dirname, 'users.json');
    const usersData = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));

    res.send({usersData});
});

//в данном случает создаются пользователи, но только с одиаковм id 

app.post('/users', (req, res) => {
    const pathUsers = path.join(__dirname, 'users.json');
    const usersData = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));

    uniqueID += 1;
    
    usersData.push({
        id: uniqueID,
        ...req.body
    });

    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(usersData, null, 2));

    res.send({id: uniqueID});
});

//в данном случаесоздается только одного пользователя
/*
app.post('/users', (req, res) => {
    uniqueID += 1;
    users.push({
        id: uniqueID,
        ...req.body
    });

    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
    
    res.send({id: uniqueID});
});
*/
app.put('/users/:id', (req, res) => {
    const pathUsers = path.join(__dirname, 'users.json');
    const usersData = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));

    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(404).send({error: result.error.details})
    }

    const userId = +req.params.id;

    const user = usersData.find((user) => user.id === userId);

    if(user) {
       const {firstName, secondName, age, city} = req.body;

       user.firstName = firstName,
       user.secondName = secondName,
       user.age = age,
       user.city = city

       fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(usersData, null, 2));

       res.send({user})
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.get('/users/:id', (req, res) => {
    const pathUsers = path.join(__dirname, 'users.json');
    const usersData = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));

    const userId = +req.params.id;
    const user = usersData.find((user) => user.id === userId);

    if(user) {
       res.send({user})
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.delete('/users/:id', (req, res) => {
    const pathUsers = path.join(__dirname, 'users.json');
    const usersData = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));

    const userId = +req.params.id;
    const user = usersData.find((user) => user.id === userId);

    if(user) {
        const usrIndex = users.indexOf(user);
        usersData.splice(usrIndex, 1);

        fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(usersData, null, 2));
        
        res.send({user})
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.listen(3000);