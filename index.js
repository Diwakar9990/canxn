import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import JobsController from './src/controller/jobs.controller.js';
import UserController from './src/controller/users.controller.js';
import { validateRequest } from './src/middleware/jobForm.middleware.js'
import { validateUser } from './src/middleware/users.middleware.js';
import session from "express-session";
import { auth } from './src/middleware/auth.middleware.js';
import { uploadFile } from './src/middleware/fileupload.middleware.js';
import cookieParser from 'cookie-parser';

const JobsCont = new JobsController();
const userCont = new UserController();
const app = express();

// setup view engine settings
app.use(cookieParser());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.set("view engine", "ejs") // .ejs view pages will automatically convert into HTML pages
app.set("views", path.join(path.resolve(), 'src', 'views'))
app.use(ejsLayouts) // Used for Layout page for integration with ejsLayouts module;
app.use(express.urlencoded({ extended: true })); // Used to Get the form Data;
app.use(express.static('public')); // Used for easy access to the public folder;



// all jobs related routes

app.get('/index', JobsCont.fetchJobs)
app.get('/jobDetails/:id', JobsCont.fetchJobDetails)
app.get('/addJobs', JobsCont.getAddJob)
app.get('/updateJob/:id', JobsCont.getUpdateJob)
app.get('/applyJob/:id', JobsCont.applyJob)
app.post('/index', validateRequest, JobsCont.postAddJob)
app.post('/updateJob', validateRequest, JobsCont.postUpdateJob)
app.post('/deleteJobPost/:id', JobsCont.postDeleteJob)
app.post('/newIndex', uploadFile.single('docUrl'), JobsCont.postApplyJob)
app.post('/search', JobsCont.postSearch)


// all user related routes

app.get('/', userCont.getLanding)
app.get('/register', userCont.getRegistrationPage)
app.get('/login', userCont.getLoginPage)
app.get('/logout', userCont.logout)
app.post('/register', validateUser, userCont.postRegistration)
app.post('/login', userCont.postLogin)

app.listen(5000, () => {
    console.log('server is listening on port 5000')
});