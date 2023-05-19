
# [Profycloud](https://profycloud.adaptable.app)

![Profycloud](https://github.com/JesusR-91/Proyect-2/blob/main/public/images/english-version.png?raw=true)

## Description:
It is a database management application that is initially oriented to schools but can be extrapolated to all types of companies.

### User Stories:

- 404: I've no memories of this place.
- 500: Their taking the server to Isengard!
- Login: In this window you have the option to register or log in.
- Sign up: Here you have the fields to register or if you are already registered you have a link to the login page.
- Home: In addition to the navigation bar at the top, there is a search bar to find classes or students and a history of comments that have been posted to the students you teach.
- Profile: This area shows your profile picture, name and e-mail, the classes you belong to and you have the option to edit your user name.
- Edit Profile: When editing your user you have options to edit the above mentioned fields.
- Class Screen: On the user when you click on one of the classes you will see the list of students and their respective teachers. 
- Edit Student: If you enter one of the students you have a photo of him/her and his/her personal data, you can also add comments or if you are a tutor of that student you can modify his/her data or even delete him/her.
- Classes: If you go to the classes tab you have a list of all the classes you teach and their respective students.
- Admin: In the admin tab you have 2 options which are as follows:
    - Index: You have two cards, one with all the users (teachers) which you can edit and delete and also what kind of tutor you want me to be, and another one with all the classes where you can do the same as with the users but you also have a button to create more of them.
    - New class: You have the option to add the teachers and what name you want the class to have.

### Backlog Functionalities
We wanted to have implemented a more optimised student search engine as right now you have to put the exact name and also connect it with an API that allows that when a comment is posted to X student an email is sent to the tutor.


### Technologies Used
- Handlebars
- JavaScript
- HTML
- CSS
- Cloudinary
- MongoDB
    - Mongoose
- Express
- Adaptable
- GitHub

### Models
- ## Alumn:
    - firstName: String,
    - lastName: String,
    - image: {
      -type: String,
        - default: "/images/logo.png",},
     - classroom: String,
     - contactEmail: String,
     - contactPerson: String,
     - contactPhone: Number,

- ## Class
     - name: Number,
     - subName: String,
     - alumns: [
        - { type: Schema.Types.ObjectId,
            - ref: "Alumn"}]

- ## Comments
    - comment: String,
    - madeBy: {
      - type: Schema.Types.ObjectId,
      - ref: "User",},
    - madeTo: {
      - type: Schema.Types.ObjectId,
      - ref: "Alumn",}
    - { timestamps: true,}

- ## User
    - email: {
      - type: String,
      - required: true,
      - unique: true,
      - lowercase: true,
      - trim: true,},
    - password: {
      - type: String,
      - required: true,
    - },
    - firstName: String,
    - lastName: String,
    - image: {
        - type: String,
        - default: "/images/logo.png",},
    - rol: {
        - type: [String],
        - enum: ["professor", "tutor"],
         - default: "professor",},
    - tutorClass: {
        - type: Schema.Types.ObjectId,
        - ref: "Class",},
    - admin: {
        - type: Boolean,
        - default: false,},
    - class: [
      - {
        - type: Schema.Types.ObjectId,
        - ref: "Class",},],},
  - {
        - timestamps: true,}


# Links

[Jesús Ruiz](https://github.com/JesusR-91)
[![LinkedIn](https://github.com/JesusR-91/Proyect-2/blob/main/public/images/linkedin%20(1).png?raw=true)](https://www.linkedin.com/in/jes%C3%BAs-manuel-ruiz-ja%C3%A9n-24714472/)

[Maisha Fumanal Navarro](https://github.com/MaishaFN)
[![LinkedIn](https://github.com/JesusR-91/Proyect-2/blob/main/public/images/linkedin%20(1).png?raw=true)](https://www.linkedin.com/in/maishafn/)