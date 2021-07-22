module.exports.fizz_get = (req, res) => {
    res.render('fizz',{user:req.user});
};

module.exports.buzz_get = (req, res) => {
    res.render('buzz',{user:req.user});
};

module.exports.stl_get = (req, res) => {
    res.render('stl',{user:req.user});
};