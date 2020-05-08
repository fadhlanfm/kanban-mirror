const { Task, User } = require('../models')
const { getUserData } = require('../helpers/token')

class TaskController {
    static getAll (req, res, next) {
        const UserId = getUserData(req.headers.access_token).id

        Task.findAll({ include: User })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getById (req, res, next) {
        const id = Number(req.params.id)

        Task.findOne({ where: { id } })
        .then(data => {
            if (!data) {
                throw { messages: [`Task id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json(data)
            }
        })
        .catch(next)
    }

    static create (req, res, next) {
        const { title, category } = req.body
        const UserId = getUserData(req.headers.access_token).id
        const newTask = {
            title,
            category,
            UserId
        }

        Task.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static delete (req, res, next) {
        const id = Number(req.params.id)
        
        Task.destroy({ where: { id } })
        .then(data => {
            if (!data) {
                throw { messages: [`Task id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json({ message: `Task id ${id} has been deleted` })
            }
        })
        .catch(next)
    }

    static update (req, res, next) {
        const id = Number(req.params.id)
        const { title, category } = req.body
        const updates = { title, category }

        Task.update(updates, { where: { id } })
        .then(data => {
            if (!data) {
                throw { messages: [`Task id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json({ message: `Task id ${id} has been updated` })
            }
        })
        .catch(next)
    }
}

module.exports = TaskController