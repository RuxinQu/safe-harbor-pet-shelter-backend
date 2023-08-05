const router = require("express").Router();
const petRoutes = require("./petController");
const adminRoutes = require("./adminController");

router.use("/api/pets", petRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
