// Please don't change the pre-written code
// Import the necessary modules here

export const auth = (req, res, next) => {
    // Write your code here
    if (req.session.userEmail) {
        console.log(req.session.userEmail + ' auth Middleware');
        next();
    }
    else {
        res.render("msgPage", { message: "Login first to access secure pages" });
    }
};
