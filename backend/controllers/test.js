
const listModel = require("../models/list");

exports.addList = async (req, res) => {
  const list = new listModel({ ...req.body });
  try {
    await list.save();
    res.send(list);
  } catch (err) {
    res.send(err);
  }
};
