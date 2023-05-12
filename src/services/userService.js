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
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleid,
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
            if (!data.id) {
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

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}