import db from "../models"
import bcrypt from 'bcryptjs';
import { sendSimpleEmail } from "../services/emailService"
import { Sequelize } from "sequelize";

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
                if (password) {
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
                    userData.errCode = 1
                    userData.errMessage = "Missing parameters"
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
                if (users) {
                    users.errCode = 0
                }
                else {
                    users.errCode = 1
                }
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
                if (users) {
                    users.errCode = 0
                }
                else {
                    users.errCode = 1
                }
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
                    image: data.image,
                    districtId: data.districtId
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
            if (id) {
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

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleid || !data.gender || !data.phonenumber) {
                resolve({
                    errCode: 1,
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
                if (data.districtId) {
                    user.districtId = data.districtId
                }

                await user.save()

                resolve({
                    errCode: 0,
                    message: "Update user succeed!!!"
                })
            }
            else {
                resolve({
                    errCode: 2,
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

                if (allcode !== {}) {
                    res.errCode = 0;
                    res.data = allcode
                }
                else {
                    res.errCode = 2;
                    res.data = allcode
                }
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
                    status: 'S2',
                    warehouseId: data.warehouseId
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

let getUserOrderService = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!info.id && !info.status) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter!'
                })
            } else {


                let data = await db.User.findAll({
                    where: {
                        id: info.id
                    },
                    attributes: {
                        exclude: ['password', 'image', 'id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId', 'positionId', 'createdAt', 'updatedAt', 'districId']
                    },
                    include: [
                        {
                            model: db.Order, where: {
                                status: info.status,
                                createdAt: {
                                    [Sequelize.Op.between]: [info.startDate, info.endDate]
                                }
                            }, attributes: { exclude: 'imagePackage' }
                        }
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
            reject(error)
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

let getWarehouse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // await sendSimpleEmail('ttbexinhtt2903@gmail.com')
            if (id) {
                let res = {}
                let warehouse = []


                if (id === 'All') { warehouse = await db.Warehouse.findAll(); }
                else {
                    let name = await getProvinceName(id)
                    warehouse = await db.Warehouse.findAll(
                        {
                            where: {
                                districtName: name.districtName
                            }
                        }
                    );
                }
                res.errCode = 0;
                res.data = warehouse
                resolve(res)
            }

            else {
                resolve({
                    errCode: 1,
                    message: 'missing parameters'
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}

let getNearestWarehouse = (orderCoordinates) => {
    return new Promise(async (resolve, reject) => {
        try {

            const withinRadius = []; // Danh sách các kho hàng trong vòng bán kính
            const maxDistance = 20; // Khoảng cách tối đa (20km)

            let warehouse = await db.Warehouse.findAll();

            // Tính toán khoảng cách từ đơn hàng đến các kho hàng
            if (orderCoordinates.lat && orderCoordinates.lng) {
                warehouse.forEach(warehouse => {
                    const { lat, lng } = JSON.parse(warehouse.addressCoordinate);
                    const distance = calculateDistance(orderCoordinates.lat, orderCoordinates.lng, lat, lng);

                    let id = warehouse.id
                    if (distance <= maxDistance) {
                        withinRadius.push({ id, distance });
                    }

                });

                if (withinRadius.length === 0) {
                    resolve({
                        errCode: 1,
                        message: "No warehouse near there"
                    }) // Không có kho hàng trong vòng bán kính
                }

                // Sắp xếp theo khoảng cách từ nhỏ đến lớn
                withinRadius.sort((a, b) => a.distance - b.distance);

                // Lấy kho hàng gần nhất
                const nearestWarehouse = withinRadius[0].id;



                resolve({
                    errCode: 0,
                    warehouseId: nearestWarehouse
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

let getProvinceByDistrict = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let district = await db.District.findOne({
                where: {
                    id: id
                }
            });

            res.errCode = 0;
            res.provinceId = district.provinceId
            resolve(res)

        } catch (error) {
            reject(error)
        }
    })
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Bán kính trái đất (đơn vị: kilômét)

    // Đổi độ sang radian
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Độ chênh lệch giữa hai tọa độ
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    // Áp dụng công thức Haversine
    const a =
        Math.sin(latDiff / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
}

// Hàm chuyển đổi độ sang radian
function toRadians(degree) {
    return (degree * Math.PI) / 180;
}

let saveNew = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contentHTML || !data.contentMarkdown || !data.header) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameters"
                })
            }
            else {
                await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    header: data.header
                })

                resolve({
                    errCode: 0,
                    errMessage: 'save new success',
                    data: '?'
                })
            }
        } catch (e) {

        }
    })
}

let getNew = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.limit) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameters"
                })
            }
            else {
                let limit = parseInt(data.limit)
                let res = await db.Markdown.findAll({
                    limit: limit,
                })

                resolve({
                    data: res,
                    errCode: 0,
                    errMessage: 'get data success'
                })
            }
        } catch (e) {

        }
    })
}

let getNewById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameters"
                })
            }
            else {
                let id = parseInt(data.id)
                let res = await db.Markdown.findOne({
                    where: {
                        id: id
                    }
                })

                resolve({
                    data: res,
                    errCode: 0,
                    errMessage: 'get data success'
                })
            }
        } catch (e) {

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
    getAddressName: getAddressName,
    getWarehouse: getWarehouse,
    getNearestWarehouse: getNearestWarehouse,
    getProvinceByDistrict: getProvinceByDistrict,
    saveNew: saveNew,
    getNew: getNew,
    getNewById: getNewById
}