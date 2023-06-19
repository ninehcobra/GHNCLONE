import userService from "../services/userService"


let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id //ALL,id
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users: users,

    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    else {
        let message = await userService.deleteUser(req.body.id)
        return res.status(200).json(message)
    }
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get all code error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getProvince = async (req, res) => {
    try {
        let data = await userService.getProvinceService();
        return res.status(200).json(data)

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getDistrict = async (req, res) => {
    try {
        let data = await userService.getDistrictService(req.query.provinceId);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleCreateNewWarehouse = async (req, res) => {
    let message = await userService.createNewWarehouse(req.body);
    console.log(message);
    return res.status(200).json(message)
}

let getFee = async (req, res) => {
    try {
        let data = await userService.getFeeService();
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get fee error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleCreateOrder = async (req, res) => {
    try {
        let message = await userService.createOrder(req.body);
        return res.status(200).json(message)

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetUserOrder = async (req, res) => {
    try {
        let data = await userService.getUserOrderService(req.query);
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get User order error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetOrderReception = async (req, res) => {
    try {
        let data = await userService.getUserOrderReceptionService();
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get order reception error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleUpdateProductStatus = async (req, res) => {
    try {
        let message = await userService.updateProductStatus(req.body);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetOrderHistory = async (req, res) => {
    try {
        let data = await userService.getOrderHistory(req.query.id);
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get order reception error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetAddressName = async (req, res) => {
    try {
        let data = await userService.getAddressName(req.query.id);
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get Address name error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetWarehouse = async (req, res) => {
    try {
        let data = await userService.getWarehouse();
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get Warehouse error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetNearestWarehouse = async (req, res) => {
    try {
        let data = await userService.getNearestWarehouse(req.query);
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get nearest Warehouse error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetProvinceByDistrict = async (req, res) => {
    try {
        let data = await userService.getProvinceByDistrict(req.query.id);
        return res.status(200).json(data)
    } catch (error) {
        console.log("Get province by district error:", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleSaveNew = async (req, res) => {
    try {
        let message = await userService.saveNew(req.body);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetNew = async (req, res) => {
    try {
        let message = await userService.getNew(req.query);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetNewById = async (req, res) => {
    try {
        let message = await userService.getNewById(req.query);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    getProvince: getProvince,
    getDistrict: getDistrict,
    handleCreateNewWarehouse: handleCreateNewWarehouse,
    getFee: getFee,
    handleCreateOrder: handleCreateOrder,
    handleGetUserOrder: handleGetUserOrder,
    handleGetOrderReception: handleGetOrderReception,
    handleUpdateProductStatus: handleUpdateProductStatus,
    handleGetOrderHistory: handleGetOrderHistory,
    handleGetAddressName: handleGetAddressName,
    handleGetWarehouse: handleGetWarehouse,
    handleGetNearestWarehouse: handleGetNearestWarehouse,
    handleGetProvinceByDistrict: handleGetProvinceByDistrict,
    handleSaveNew: handleSaveNew,
    handleGetNew: handleGetNew,
    handleGetNewById: handleGetNewById
}