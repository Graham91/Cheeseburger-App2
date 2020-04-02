var express = require("express");
let handlebars = require("express-handlebars");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var ORM = require("../config/orm.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    ORM.showBurgers(function(data) {
      let hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
      });

});

router.post("/api/addburger", function(req, res) {
    
 ORM.AddBurger(req.body.name);
 
res.status(200).end();
});

router.put("/api/updateburger/:id", function(req, res) {
console.log(req.body.devoured);

ORM.devourBurger(req.params.id, req.body.devoured);

     res.status(200).end();

});

router.delete("/api/deleteburger/:id", function(req, res){
    let burgernamer = req.params.id;
    ORM.deleteBurger(burgernamer);
    res.status(200).end();

})

// Export routes for server.js to use.
module.exports = router;