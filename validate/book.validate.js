module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push('Name is required');
  }
  if (!req.body.desc) {
    errors.push('Description is required');
  }
  if (errors.length) {
    res.render('books/create', {
      errors: errors,
      values: req.body
    });
    return;
  }
  res.locals.success = true;
  next();
};

module.exports.postViewEdit = (req, res, next) => {
   var errors = [];
  if (!req.body.name) {
    errors.push('New name is required');
  }
  if (errors.length) {
    res.render('books/edit', {
      id: req.params.id,
      errors: errors
    });
    return;
  }
  res.locals.success = true;
  next();
};