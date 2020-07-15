var db = require("../db");
module.exports.addToCart = (req, res, next) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirectt("/books");
    return;
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();

  // db.get("sessions")
  //   .find({ id: sessionId })
  //   .set("cart." + bookId, count + 1)
  //   .write();
  var itemCount = 0;
  var matchedSessionId = db
    .get("sessions")
    .find({ id: sessionId })
    .value().cart;
  
  // console.log(matchedSessionId);
  for (var key in matchedSessionId) {
    itemCount = itemCount + matchedSessionId[key];
  }
  console.log(itemCount, "controller js");
  // console.log(db.get("sessions").value());
  next();
};
