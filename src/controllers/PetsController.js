const Pet = require("../models/Pet");

class PetsController {
  async index(req, res) {
    try {
      const pets = await Pet.find();

      return res.send(pets);
    } catch (err) {
      return res.status(400).send({ error: "Error on get pets" });
    }
  }

  async create(req, res) {
    const {
      species,
      gender,
      breed,
      size,
      photo,
      puppy,
      rescued,
      condition,
      latitude,
      longitude,
    } = req.body;

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    try {
      let pet = await Pet.create({
        species,
        gender,
        breed,
        size,
        photo,
        puppy,
        rescued,
        condition,
        location,
      });

      return res.send({ pet, user: req.userId });
    } catch (err) {
      return res.status(400).send({ error: "Error on create pet" });
    }
  }
}

module.exports = new PetsController();
