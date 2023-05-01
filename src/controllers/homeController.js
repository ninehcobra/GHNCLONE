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

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD

}