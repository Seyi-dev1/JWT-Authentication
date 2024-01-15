const showData = (req, res) => {
  return res
    .status(200)
    .send(`You're in the private territory of ${req.currentUser.email}`);
};

module.exports = showData;
