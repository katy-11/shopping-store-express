var shortid = require("shortid");
var db = require("../db");

module.exports.index = (req, res) => {
  var trans = db.get("transactions").value();
  var bookIdTrans = [];

  for (var i = 0; i < trans.length; i++) {
    if (bookIdTrans.indexOf(trans[i].bookId) === -1) {
      bookIdTrans.push(trans[i].bookId);
    }
  }
  var bookList = bookIdTrans.map(bookIdTran =>
    db
      .get("books")
      .find({ id: bookIdTran })
      .value()
  );
  res.render("transactions/index", {
    booksList: bookList
  });
};

module.exports.book = (req, res) => {
  var bookId = req.params.id;

  //check bookId in trans.bookId array
  var matchedBookIdTrans = db
    .get("transactions")
    .filter({ bookId: bookId })
    .value();

  //   get userId array
  var matchedUserIdTrans = matchedBookIdTrans.map(
    matchedBook => matchedBook.userId
  );

  // get transactionId array
  var matchedTransactionIdTrans = matchedBookIdTrans.map(
    matchedBook => matchedBook.id
  );

  //check returned or not returned
  var returnStatus = matchedBookIdTrans.map(matchedBookIdTran => {
    if (matchedBookIdTran.isComplete === true) {
      return "Returned";
    } else {
      return "Not returned";
    }
  });

  //get userId from trans
  var matchedUser = matchedUserIdTrans.map(matchedUserId =>
    db
      .get("users")
      .find({ id: matchedUserId })
      .value()
  );

  //return userName and age
  res.render("transactions/view", {
    users: matchedUser,
    returnStatus: returnStatus,
    transactionId: matchedTransactionIdTrans
  });
};

module.exports.bookComplete = (req, res) => {
  var tranId = req.params.id;
  var tranIdDb = db
    .get("transactions")
    .map("id")
    .value();
  if (tranIdDb.indexOf(tranId) === -1) {
    res.send("Page not found");
  }
  var returnStatus;
  var matchedIdTrans = db
    .get("transactions")
    .filter({ id: tranId })
    .value();
  if (matchedIdTrans[0].isComplete === true) {
    returnStatus = "returned";
  } else {
    returnStatus = "not returned";
  }
  res.render("transactions/returnStatus", {
    returnStatus: returnStatus
  });
};

module.exports.userTransaction = (req, res) => {
  var user = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();
  var matchedUser = db
    .get("transactions")
    .filter({ userId: req.signedCookies.userId })
    .value();
  var matchedBook = matchedUser.map(item => {
    return db
      .get("books")
      .find({ id: item.bookId })
      .value();
  });
  var returnStatus = matchedUser.map(item => {
    if (item.isComplete === true) {
      return "Returned";
    } else {
      return "Not returned";
    }
  });
  if (user.isAdmin === true) {
    res.redirect("/transactions");
  } else {
    res.render("transactions/eachUser", {
      booksList: matchedBook,
      returnStatus: returnStatus
    });
  }
};
module.exports.create = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
};
