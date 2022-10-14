function admin(req, res, next) {
  if (!req.user.roles.includes("admin"))
    return res.status(403).send({
      success: false,
      error: "Forbidden action.",
    });

  next();
}

function editor(req, res, next) {
  if (!req.user.roles.includes("editor"))
    return res.status(403).send({
      success: false,
      error: "Forbidden action.",
    });

  next();
}

function viewer(req, res, next) {
  if (!req.user.roles.includes("viewer"))
    return res.status(403).send({
      success: false,
      error: "Forbidden action.",
    });

  next();
}

module.exports = { admin, editor, viewer };
