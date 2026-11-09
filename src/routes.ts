import { Router } from "express";
//Controller
import { getUsers, createUser, patchUser, deleteUser } from "./controllers/userController";
import { getPost, createPost, deletePost } from "./controllers/postController";
//Middleware
import { validateCreateUser, validatePatchUser, validateDeleteUser } from "./middleware/validationUser"
import { validateCreatePost, validateDeletePost } from "./middleware/validationPost"
// import { validateCreatePost, validatePatchPost, validateDeletePost } from "./middleware/validationPost"

const router = Router();

//User
router.get("/users", getUsers);
router.post("/users", validateCreateUser, createUser);
router.patch("/users/:id", validatePatchUser, patchUser);
router.delete("/users/:id", validateDeleteUser, deleteUser);
//Post
router.get("/posts", getPost);
router.post("/posts", validateCreatePost, createPost);
// router.patch("/posts/:id", validatePatchUser, patchUser);
router.delete("/posts/:id", validateDeletePost, deletePost);



export default router;

