import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router()

let initWebRoutes = (app) => {

    router.get("/", homeController.getHomePage)

    router.get("/about", homeController.getAbout)
    router.get("/crud", homeController.getCRUD)

    router.post("/post-crud", homeController.postCRUD)
    router.get("/get-crud", homeController.displaygetCRUD)
    router.get("/edit-crud", homeController.getEditCRUD)
    router.post("/put-crud", homeController.putCRUD)
    router.get("/delete-crud", homeController.deleteCRUD)


    //API
    router.post("/api/login", userController.handleLogin)
    router.get("/api/get-all-user", userController.handleGetAllUser)
    router.post("/api/create-a-new-user", userController.handleCreateNewUser)
    router.put("/api/edit-user", userController.handleEditUser)
    router.delete("/api/delete-user", userController.handleDeleteUser)

    router.get("/api/allcode", userController.getAllCode)
    router.get("/api/province",userController.getProvince)
    router.get("/api/district",userController.getDistrict)


    return app.use("/", router)
}

module.exports = initWebRoutes