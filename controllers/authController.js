module.exports.logout_get = (req,res)=> {
    req.logout();
    res.redirect("/");
};