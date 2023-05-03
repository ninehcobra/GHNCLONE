import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

        return res.render('homePage.ejs', { data: JSON.stringify(data) })
    } catch (error) {
        console.log(error)
    }

}

let getAbout = (req, res) => {
    return res.render('test/about.ejs')

}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('hello')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let displaygetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render("test/displayCRUD.ejs", {
        dataTable: data
    })

}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render('editCRUD.ejs', { userData: userData })

    }
    else {
        return res.send('user not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data)
    return res.render("test/displayCRUD.ejs", {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {

        await CRUDService.deleteUserById(id);
        return res.send("delete user success")
    }
    else {
        return res.send("user not found")
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD: displaygetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD

}