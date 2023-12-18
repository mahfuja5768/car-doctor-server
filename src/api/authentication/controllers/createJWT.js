const generateToken = require("../../../utils/generateToken");

const createJWT = async (req, res, next) => {
  const user = req.body;
  const token = generateToken(user);
  res.send({ token });
};

module.exports = createJWT;
