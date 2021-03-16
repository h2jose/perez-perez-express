import models from '../models';
export default {
	add: async (req, res, next) => {
		try {
			const reg = await models.Car.create(req.body);
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
			const reg = await models.Car.findOne({ _id: req.query._id });
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
			let valor = req.query.valor;
			const reg = await models.Car.find({});
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
			const reg = await models.Car.findByIdAndUpdate({ 
				_id: req.body._id }, 
				{ 
					customer: req.body.customer, 
					number: req.body.number, 
					marca: req.body.marca, 
					modelo: req.body.modelo, 
					anno: req.body.anno, 
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
			const reg = await models.Car.findByIdAndDelete({ _id: req.body._id });
			res.status(200).json(reg);
		} catch (e) {
			res.status(500).send({
				message: 'Ocurrió un error'
			});
			next(e);
		}
	},

}
