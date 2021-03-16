import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {

	  add: async (req, res, next) => {
			try {
				req.body.password = await bcrypt.hash(req.body.password, 10);
				const reg = await models.User.create(req.body);
				res.status(200).json(reg);
			} catch (e) {
				res.status(500).send({
					message: "Ocurrió un error",
				});
				next(e);
			}
  },

  register: async (req, res, next) => {
		const reg0 = await models.User.countDocuments();

		if (reg0 == 0){
			try {
				req.body.password = await bcrypt.hash(req.body.password, 10);
				const reg = await models.User.create(req.body);
				res.status(200).json(reg);
			} catch (e) {
				res.status(500).send({
					message: "Ocurrió un error",
				});
				next(e);
			}
		} else {
			res.status(500).send({
				message: "Sistema instalado, operación no permitida",
			});
		}
  },

  query: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "El registro no existe",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  remove: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  
  login: async (req, res, next) => {
    try {
      let user = await models.User.findOne({
        email: req.body.email,
        active: true,
      });
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id, user.role, user.email);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(404).send({
            message: "Password incorrecto",
          });
        }
      } else {
        res.status(404).send({
          message: "No existe el usuario",
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
};
