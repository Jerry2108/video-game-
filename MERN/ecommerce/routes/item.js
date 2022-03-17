import { Router } from "express";
import {
  getItems,
  postItem,
  deleteItem,
  updateItem,
  postItemImage
} from "../controllers/itemController.js";
import multer from "multer";
//create a storage where the destination of those images uploaded by
//sellers will be stored in our code.
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  //add back the extension. This configuration allows us to specifiy the name
  //of the file in db
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

//create an upload parameter for multer
//This middleware will allow us to create a property file for req.file and this
//value will be created in the response object to send data to mongoDB

const upload = multer({
  storage: storage
})
/*const upload = multer({
  dest: "client/public/assets/uploads/images",
});*/
//console.log(upload);
const itemRouter = Router();
itemRouter.get("/items", getItems);
itemRouter.post("/item/image", upload.single('image'), postItemImage);
itemRouter.post("/item", postItem);
itemRouter.delete("/item/:id", deleteItem);
itemRouter.put("/item/:id", updateItem);

export default itemRouter;
