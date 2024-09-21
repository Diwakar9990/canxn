import UserModel from "../model/users.model.js";
const User = new UserModel();


export default class UserController {
    getLanding(req, res) {
        res.render('landing');
    };
    getLoginPage(req, res) {
        res.render('userLogin', { errorMessage: null });
    };
    getRegistrationPage(req, res) {
        res.render('userRegister', { errorMessage: null });
    };
    postRegistration(req, res) {
        console.log(req.body);
        User.addNewUser(req.body);
        res.render('userLogin', { errorMessage: null });
    }
    postLogin(req, res) {
        const { email, password } = req.body;
        const isAuth = User.authUser(email, password);
        if (isAuth.success == 'true') {
            req.session.userEmail = req.body.email;
            console.log(req.session.userEmail);
            res.redirect('/index');
        }
        else {
            res.render('userLogin', { errorMessage: 'Invalid username or password' });
        }
    }
    logout(req, res) {
        req.session = null;
        console.log(req.session.userEmail)
        res.redirect('/');
    }

}

