const Pet = require("../models/Pet");

class SearchController {
  async index(req, res) {
    const { latitude, longitude } = req.body;

    const pets = await Pet.find({
      especie,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ pets });
  }
}

module.exports = new SearchController();
