import models from '../models';

export default {

	add: async (req, res, next) => {
		try {
			const reg = await models.Order.create(req.body);
			res.status(200).json(reg);
		} catch (e) {
			res.status(500).send({
				message: 'Ocurrió un error'
			});
			next(e);
		}
	},
	query: async (req, res, next) => {
		try {
			const reg = await models.Order.findOne({ _id: req.query._id })
				.populate('customer',{name:1})
				.populate('car',{number:1});
			if (!reg) {
				res.status(404).send({
					message: 'El registro no existe'
				});
			} else {
				res.status(200).json(reg);
			}
		} catch (e) {
			res.status(500).send({
				message: 'Ocurrió un error'
			});
			next(e);
		}
	},
	list: async (req, res, next) => {
		try {
			const reg = await models.Order.find({})
				.sort({'createdAt': -1})
				.populate('customer',{name:1})
				.populate('car',{number:1});
			res.status(200).json(reg);
		} catch (e) {
			res.status(500).send({
				message: 'Ocurrió un error'
			});
			next(e);
		}
	},
	update: async (req, res, next) => {
		try {
			const reg = await models.Order.findByIdAndUpdate(
				{ _id: req.body._id }, 
				{ 
					customer: req.body.customer, 
					car: req.body.car, 
					notes: req.body.notes, 
					status: req.body.status, 
					paid: req.body.paid, 
				});
			res.status(200).json(reg);
		} catch (e) {
			res.status(500).send({
				message: 'Ocurrió un error'
			});
			next(e);
		}
	},
	remove: async (req, res, next) => {
    try {
      const reg = await models.Order.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },


}
