const classes = [
    {name: 1,subName: "A", Subject: ["Matemáticas", "Física", "Programación", "Tecnología"], alumns: ["645e6bd1b658895bb3ea1715", "645e6bd1b658895bb3ea1716", "645e6bd1b658895bb3ea1717", "645e6bd1b658895bb3ea1718"]},
    {name: 1,subName: "B", Subject: ["Matemáticas", "Física", "Programación", "Tecnología"], alumns: ["645e70d729c60855e9b9c90a", "645e70d729c60855e9b9c90b", "645e70d729c60855e9b9c90c", "645e70d729c60855e9b9c90d"]},
    {name: 2,subName: "A", Subject: ["Biología", "Química", "Educación física", "Tecnología"]},
    {name: 2,subName: "B", Subject: ["Biología", "Química", "Educación física", "Tecnología"]},
    {name: 3,subName: "A", Subject: ["Química", "física", "programación", "Biología"]},
    {name: 3,subName: "B", Subject: ["Química", "física", "programación", "Biología"]},
    {name: 4,subName: "A", Subject: ["Biología", "Física", "Química", "Tecnología"]},
    {name: 4,subName: "B", Subject: ["Biología", "Física", "Química", "Tecnología"]},
]

const alumns =[
    {firstName: "Juan", lastName: "Bolsón", class: "1 A"},
    {firstName: "Pedro", lastName: "Skywalker", class: "1 A"},
    {firstName: "Jorge", lastName: "Vader", class: "1 A"},
    {firstName: "Jesús", lastName: "González", class: "1 A"},
    {firstName: "Jonathan", lastName: "Benítez", class: "2 A"},
    {firstName: "Maisha", lastName: "Ramírez", class: "2 A"},
    {firstName: "Jorge", lastName: "Ruiz", class: "2 A"},
    {firstName: "Carol", lastName: "Pérez", class: "2 A"},
    {firstName: "Jorge", lastName: "González", class:"2 A"},
    {firstName: "Ana", lastName: "Pérez", class: []},
    {firstName: "Rosa", lastName: "Navarro", class: []},
    {firstName: "Andrea", lastName: "Ramírez", class: []},
    {firstName: "Frodo", lastName: "Benítez", class: []},
    {firstName: "Ana", lastName: "Ruiz", class: []},
    {firstName: "Andrea", lastName: "Navarro", class: []},
    {firstName: "Frodo", lastName: "Bolsón", class: []},
    {firstName: "Jonathan", lastName: "Ruiz", class: []},
    {firstName: "Pedro", lastName: "Bolsón", class: []},
    {firstName: "Frodo", lastName: "Vader", class: []},
    {firstName: "Carol", lastName: "Ruiz", class: []},
    {firstName: "Rosa", lastName: "Pérez", class: []},
    {firstName: "Frodo", lastName: "Navarro", class: []},
    {firstName: "Ana", lastName: "Benítez", class: []},
    {firstName: "Pedro", lastName: "Ramírez", class: []},
    {firstName: "Jesús", lastName: "Navarro", class: []},
    {firstName: "Rosa", lastName: "Skywalker", class: []},
]

const professors = [
    {
    email: "jesus@jesus.com", 
    password: "Patata99", 
    firstName: "Jesús", 
    lastName: "Ruiz", 
    rol:['professor', 'tutor'],
    admin: false,
    class: [],
  },
  {
    email: "maisha@maisha.com", 
    password: "Patata99", 
    firstName: "Maisha", 
    lastName: "Fumanal",  
    rol:['professor'],
    admin: true,
    class: [],
  },
  {
    email: "jorge@jorge.com", 
    password: "Patata99", 
    firstName: "Jorge", 
    lastName: "Berrizbeitia", 
    rol:['professor'],
    admin: true,
    class: [],
  }
]

const mongoose = require('mongoose');
const User = require('../models/User.model');
const Class = require('../models/Class.model');
const Alumn = require('../models/Alumn.model');

require('../db/index');

// User.insertMany(professors)
// .then(()=>{
// console.log('Usuarios metidos en base de dato')
// })
// .catch(err => console.log(err))

Class.insertMany([classes[1]])
.then(()=>{
console.log('Clases metidos en base de dato')
})
.catch(err => console.log(err))

// Alumn.insertMany([alumns[4], alumns[5], alumns[6], alumns[7]])
// .then(()=>{
// console.log('Alumnos metidos en base de dato')
// mongoose.connection.close();
// })
// .catch(err => console.log(err))



