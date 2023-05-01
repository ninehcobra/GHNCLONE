import bcrypt from 'bcryptjs';
import db from '../models/index'
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
            var hashPassWord = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassWord)

        } catch (error) {
            reject(error)
        }

    })
}

module.exports = {
    createNewUser: createNewUser
}