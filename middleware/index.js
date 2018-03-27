function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {
      return res.redirect('/');
    }
    // return res.redirect('/');
    return next();
  }
  
  function requireLogin(req, res, next) {
    if(req.session && req.session.userId) {
      return next();  
    } else {
      var err = new Error('You must be logged in to view this page');
      err.status = 401;
      return next(err);
    }
  }
  
  
  // We need to set session environment so that the Facebook Login is not shown in the local or development env.
  function setEnv(req, res, next) {
    req.session.environment = process.env.NODE_ENV;
    return next();
  };
  
  module.exports.loggedOut = loggedOut;
  module.exports.requireLogin = requireLogin;
  module.exports.setEnv = setEnv;
  