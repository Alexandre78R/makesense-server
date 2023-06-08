const router = require('express').Router();
const userRouter = require("./users.routes.js");
const tagRouter = require("./tags.routes.js");
const jobRouter = require("./jobs.routes.js")
const roleRouter = require("./roles.routes.js");
const alertRouter = require("./alerts.routes.js");
const avisRouter = require("./avis.routes.js");

router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/alerts', alertRouter);
router.use('/avis', avisRouter);
router.use('/jobs', jobRouter);
router.use('/tags', tagRouter);

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;