import jwt from "jsonwebtoken";
import models from "../models";

async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.User.findOne({ _id: __id, active: true });
  if (user) {
    const token = jwt.sign({ _id: __id }, "hyuIokT789056Hui05432", {
      expiresIn: "1d",
    });
    return { token, role: user.role };
  } else {
    return false;
  }
}

export default {
  encode: async (_id, role, email) => {
    const token = jwt.sign({ _id: _id, role: role, email: email }, "hyuIokT789056Hui05432", {
      expiresIn: "1d",
    });
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, "hyuIokT789056Hui05432");
      const user = await models.User.findOne({ _id });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  },
};
