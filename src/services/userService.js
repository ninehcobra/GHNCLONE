import db from "../models"
import bcrypt from 'bcryptjs';


var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord)

        } catch (error) {
            reject(error)
        }

    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: {
                        email: email
                    }
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK'

                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password"
                    }
                }
                else {
                    userData.errCode = 2
                    userData.errMessage = "user is not found"
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in system. Please try other email`
            }
            resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: email } }
            )
            if (user) {
                resolve(true)
            }
            resolve(false)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: ' Your email is already exist! Please try another email!!!'
                })
            }
            else {

                //create
                let hashPassWordFormBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFormBcrypt,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleid,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }



        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`
                })
            }
            else {
                await db.User.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    message: 'The user is deleted'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleid || !data.gender || !data.phonenumber) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstname
                user.lastName = data.lastname
                user.address = data.address
                user.roleId = data.roleid
                user.gender = data.gender
                user.phoneNumber = data.phonenumber
                if (data.image) {
                    user.image = data.image
                }

                await user.save()

                resolve({
                    errCode: 0,
                    message: "Update user succeed!!!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "User not found"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            }
            else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: type }
                });
                res.errCode = 0;
                res.data = allcode
                resolve(res)
            }


        } catch (error) {
            reject(error)
        }
    })
}

let getProvinceService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Province.findAll()
            let res = {}
            res.errCode = 0;
            res.data = data
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

let getDistrictService = (provinceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!provinceId) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            }
            else {
                let res = {}
                let allcode = await db.District.findAll({
                    where: { provinceId: provinceId }
                });
                res.errCode = 0;
                res.data = allcode
                resolve(res)
            }


        } catch (error) {
            reject(error)
        }
    })
}

let getProvinceName = async (id) => {
    let districtData = await db.District.findOne({ where: { id: id } })
    let provinceData = await db.Province.findOne({ where: { id: districtData.provinceId } })
    let res = {
        districtName: districtData.name,
        provinceName: provinceData.name
    }
    return res
}

let createNewWarehouse = (data) => {
    return new Promise(async (resolve, reject) => {
        let name = await getProvinceName(data.districtId)
        try {
            await db.Warehouse.create({
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber,
                districtName: name.districtName,
                provinceName: name.provinceName,
                addressCoordinate: data.addressCoordinate
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })




        } catch (error) {
            reject(error)
        }
    })
}

let getFeeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let fee = await db.Fee.findAll();
            res.errCode = 0;
            res.data = fee
            resolve(res)

        } catch (error) {
            reject(error)
        }
    })
}

let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //create
            if (data.userId) {
                let order = await db.Order.create({
                    userId: data.userId,
                    takeName: data.takeName,
                    takeAddress: data.takeAddress,
                    takePhone: data.takePhone,
                    takeProvince: data.takeProvince,
                    takeDistrict: data.takeDistrict,
                    takeTime: data.takeTime,
                    receivePhone: data.receivePhone,
                    receiverName: data.receiverName,
                    receiverAddress: data.receiverAddress,
                    receiveProvince: data.receiveProvince,
                    receiveDistrict: data.receiveDistrict,
                    arrProduct: data.arrProduct,
                    imagePackage: data.imagePackage,
                    totalWeight: data.totalWeight,
                    CODCost: data.CODCost,
                    totalCost: data.totalCost,
                    note: data.note,
                    noteOption: data.noteOption,
                    payOption: data.payOption,
                    fee: data.fee,
                    status: 'S2'
                })
                const orderId = order.dataValues.id;

                let History = await db.History.create({
                    orderId: orderId,
                    orderStatus: "Chưa tiếp nhận"
                })
                console.log(History)
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
            else resolve({
                errCode: 1,
                message: 'Missing parameters'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getUserOrderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter!'
                })
            } else {

                let data = await db.User.findAll({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['password', 'image', 'id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId', 'positionId', 'createdAt', 'updatedAt']
                    },
                    include: [
                        { model: db.Order, attributes: { exclude: 'imagePackage' } }
                    ],
                    raw: true,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(e)
        }
    })
}

let getUserOrderReceptionService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let order = await db.Order.findAll({
                where: {
                    status: 'S2'
                }
            });
            res.errCode = 0;
            res.data = order
            resolve(res)

        } catch (error) {
            reject(error)
        }
    })
}

let updateProductStatus = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (data.orderId && data.orderStatus) {
                let status = await db.Allcode.findOne({
                    where: {
                        key: data.orderStatus
                    }
                })
                await db.History.create({
                    orderId: data.orderId,
                    orderStatus: status.valueVi
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Missing parameters'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getOrderHistory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let order = await db.History.findAll({
                where: {
                    orderId: id
                }
            });
            if (order.length > 0) {
                res.errCode = 0;
                res.data = order

                resolve(res)
            }
            else resolve({
                errCode: 1,
                message: 'Wrong Order Id'
            })

        } catch (error) {
            reject(error)
        }
    })
}
let getAddressName = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await getProvinceName(id)

            resolve(res)

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    getProvinceService: getProvinceService,
    getDistrictService: getDistrictService,
    createNewWarehouse: createNewWarehouse,
    getFeeService: getFeeService,
    createOrder: createOrder,
    getUserOrderService: getUserOrderService,
    getUserOrderReceptionService: getUserOrderReceptionService,
    updateProductStatus: updateProductStatus,
    getOrderHistory: getOrderHistory,
    getAddressName: getAddressName
}