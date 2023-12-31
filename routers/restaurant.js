const {
  registerRestaurant,
  getCities,
  getRestaurantOfCity,
  getRestaurant,
  addFood,
  getFoodsOfRestaurant,
  getFoodById,
  deleteItem,
  getOrder,
  getAllItem,
  getAllRestaurant,
  getRestaurantById,
  getMenuOfARestaurant,
} = require("../controllers/restaurant");
const { validedUser } = require("../middleware/userValidation");
const singleUpload = require("../middleware/multer");
const checkImageUpload = require("../middleware/fileUpload");

const Router = require("express").Router;
const router = Router();

router.get("/get-all-item", getAllItem);
router.get("/all-restaurant", getAllRestaurant);
router.post("/register", validedUser, registerRestaurant);
router.get("/cities", getCities);
router.get("/:city/all", getRestaurantOfCity);
router.get("/restaurant/:id", getRestaurantById);
router.get("/restaurant/items/:id", getMenuOfARestaurant);

router.post(
  "/restaurant/add/food",
  validedUser,
  singleUpload,
  checkImageUpload,
  addFood
);

router.post("/item/delete", validedUser, deleteItem);
router.get("/restaurant/:restaurant_id/foods", getFoodsOfRestaurant);
router.get("/food/items/:food_id", getFoodById);
router.get("/all-orders", validedUser, getOrder);

module.exports = router;
