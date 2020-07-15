var shortid = require("shortid");
var db = require("../db");

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var drop = (page - 1) * perPage;
  console.log(db.get('sessions').value(), 'start ')
  res.render("books/index", {
    books: db.get("books").value(),
    page: page,
    products: db
      .get("products")
      .drop(drop)
      .take(perPage)
      .value()
  });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.view = (req, res) => {
  var id = req.params.id;
  var matchedBook = db
    .get("books")
    .find({ id: id })
    .value();

  res.render("books/viewBook", {
    book: matchedBook
  });
};

module.exports.viewEdit = (req, res) => {
  res.render("books/edit", {
    id: req.params.id
  });
};

module.exports.viewDelete = (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();

  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};

module.exports.postViewEdit = (req, res) => {
  var newName = req.body.name;
  var id = req.params.id;

  db.get("books")
    .find({ id: id })
    .assign({ name: newName })
    .write();
  var matchedBook = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/viewBook", {
    book: matchedBook
  });
};
