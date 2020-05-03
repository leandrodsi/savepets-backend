const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const AuthController = require("./controllers/authController");
const PetsController = require("./controllers/PetsController");

const Image = require("./models/Image");

const authMiddleware = require("./middlewares/auth");

routes.post("/register", AuthController.register);
routes.post("/authenticate", AuthController.authenticate);

routes.use(authMiddleware);

routes.get("/images", async (req, res) => {
  const images = await Image.find();

  return res.json(images);
});

routes.post(
  "/images",
  multer(multerConfig).single("file"),
  async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const image = await Image.create({
      name,
      size,
      key,
      url,
    });

    return res.json(image);
  }
);

routes.delete("/images/:id", async (req, res) => {
  const image = await Image.findById(req.params.id);

  await image.remove();

  return res.send();
});

routes.get("/pets", PetsController.index);
routes.post("/pets", PetsController.create);

module.exports = routes;
