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
    router.get("/api/province", userController.getProvince)
    router.get("/api/get-province-id", userController.handlegetProvinceId)

    router.get("/api/district", userController.getDistrict)
    router.get("/api/get-province-by-district", userController.handleGetProvinceByDistrict)

    router.delete("/api/delete-warehouse", userController.handleDeleteWarehouse)
    router.post("/api/create-warehouse", userController.handleCreateNewWarehouse)
    router.put("/api/edit-warehouse", userController.handleEditWarehouse)




    router.get("/api/fee", userController.getFee)
    router.post("/api/create-order", userController.handleCreateOrder)

    router.get("/api/get-user-order", userController.handleGetUserOrder)

    router.get("/api/get-order-reception", userController.handleGetOrderReception)

    router.post("/api/update-product-status", userController.handleUpdateProductStatus)
    router.get("/api/get-order-history", userController.handleGetOrderHistory)

    router.get("/api/get-address-name", userController.handleGetAddressName)

    router.get("/api/get-warehouse", userController.handleGetWarehouse)

    router.get("/api/get-nearest-warehouse", userController.handleGetNearestWarehouse)

    router.post("/api/save-new", userController.handleSaveNew)

    router.get("/api/get-new", userController.handleGetNew)

    router.get("/api/get-new-by-id", userController.handleGetNewById)







    return app.use("/", router)
}

module.exports = initWebRoutes