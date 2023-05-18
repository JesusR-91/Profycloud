const classes = [
    {name: 1,subName: "A", alumns:[] },
    {name: 1,subName: "B", alumns: [] },
    {name: 2,subName: "A",alumns: []},
    {name: 2,subName: "B",alumns: []},
    {name: 3,subName: "A",alumns: []},
    {name: 3,subName: "B",alumns: []},
]

const alumns =[
    {firstName: "Juan", lastName: "Bolsón", classroom: "1 A", contactEmail: "juanito@juanito.com", contactPerson: "Juanito", contactPhone: 888999777 },
    {firstName: "Pedro", lastName: "Skywalker", classroom: "1 A", contactEmail: "pedrito@pedrito.com", contactPerson: "Pedrito", contactPhone: 888999777 },
    {firstName: "Jorge", lastName: "Vader", classroom: "1 A", contactEmail: "jorgito@jorgito.com", contactPerson: "Jorgito", contactPhone: 888999777 },
    {firstName: "Jesús", lastName: "González", classroom: "1 A", contactEmail: "jesusito@jesusito.com", contactPerson: "Jesusito", contactPhone: 888999777 },
    {firstName: "Jonathan", lastName: "Benítez", classroom: "2 A", contactEmail: "jonathancito@jonathancito.com", contactPerson: "Jhonatancito", contactPhone: 888999777 },
    {firstName: "Maisha", lastName: "Ramírez", classroom: "2 A", contactEmail: "maishacito@maishacito.com", contactPerson: "Maishacito", contactPhone: 888999777},
    {firstName: "Jorge", lastName: "Ruiz", classroom: "2 A", contactEmail: "jorgito@jorgito.es", contactPerson: "Jorgito", contactPhone: 888999777},
    {firstName: "Carol", lastName: "Pérez", classroom: "2 A", contactEmail: "carolita@carolita.com", contactPerson: "Carolita", contactPhone: 888999777 },
    {firstName: "Jorge", lastName: "González", classroom:"2 A", contactEmail: "jorgecito@jorgecito.net", contactPerson: "Jorgecito", contactPhone: 888999777 },
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
const alumnsData = require('./alumn.json')

// console.log(alumnsData)

alumnsData.forEach(alumn =>{
  classes.forEach(clase => {
    if (alumn.classroom === `${clase.name} ${clase.subName}`){
      clase.alumns.push(alumn._id);
    }
  })
})

//  User.insertMany(professors)
//  .then(()=>{
//  console.log('Usuarios metidos en base de dato')
//  })
// .catch(err => console.log(err))
//  Class.insertMany(classes)
//  .then(()=>{
//  console.log('Clases metidos en base de dato')
//  })
//  .catch(err => console.log(err))

// Alumn.insertMany(alumnsData)
// .then(()=>{
// console.log('Alumnos metidos en base de dato')
// mongoose.connection.close();
// })
// .catch(err => console.log(err))



