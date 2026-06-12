const router = require("express").Router();
const Lead = require("../models/Lead");

router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lead);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted"
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;