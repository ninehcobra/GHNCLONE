import bcrypt from 'bcryptjs';
import db from '../models/index'
import e from 'express';
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('ok create a new use succeed')
        } catch (error) {
            reject(e)
        }
    })

    console.log(data)
    console.log(hashPassWordFormBcrypt)
}

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

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)

        } catch (error) {
            reject(error)
        }
    }
    )
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId }, raw: true })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }

    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstname
                user.lastName = data.lastname
                user.address = data.address

                await user.save()
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            }
            else {
                resolve()
            }
        } catch (error) {

        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                await user.destroy();
            }

            resolve()

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}