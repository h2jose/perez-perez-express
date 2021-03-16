import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Customer.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Customer.findOne({ _id: req.query._id });
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

  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Customer.find({})
        .select({
          _id: 1,
          dni: 1,
          name: 1,
          email: 1,
          address: 1,
          phone: 1,
          notes: 1,
          active: 1,
        })
        .sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const reg = await models.Customer.findByIdAndUpdate(
        { _id: req.body._id },
        {
          dni: req.body.dni,
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
          notes: req.body.notes
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Customer.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

};
