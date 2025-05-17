const Notes = require("./models/note.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Save the URL the user was trying to access
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to do this!");
        return res.redirect("/signup"); 
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    try {
        const note = await Notes.findById(id);
        if (!note) {
            req.flash("error", "Note not found!");
            return res.redirect("/notes");
        }
        if (!note.owner.equals(req.user._id)) {
            req.flash("error", "You do not have permission!");
            return res.redirect("/notes");
        }
        next();
    } catch (err) {
        console.error("Error checking note ownership:", err);
        req.flash("error", "Something went wrong.");
        return res.redirect("/notes");
    }
};
