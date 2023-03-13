const model = require('../models/index')
const {db} = require('../config/database')
const { Op } = require("sequelize");

module.exports = {
    getAllMenu : async(req,res)=>{
        let data = []
        await db.query("select * from announcement order by date desc")
        .then((result)=>{
            for(let i = 0;i < 5;i++){
                if(result[0].length < 5 && result[0].length > i){
                    data.push(result[0][i])
                }
            }

            if(result > 0){
                res.status(200).json({
                    message: 'Get Data Passed',
                    data: data
                })
            }else{
                res.status(200).json({
                    message: "Data Not Found",
                    data: data
                })
            }
        })
        .catch (error => {
            console.log(error)
            res.status(404).json({
                message: error
            })
        })
    },

    getById : async(req,res)=>{
        const id = req.params.id
        await model.announcement.findAll({where: {id_announcement : id}})
        .then((result)=>{
            if(result > 0){
                res.status(200).json({
                    message: 'Get Data Passed',
                    data: result
                })
            }else{
                res.status(200).json({
                    message: "Data Not Found",
                    data: result
                })
            }
        })
        .catch (error => {
            console.log(error)
            res.status(404).json({
                message: error
            })
        })
    },

    addAnnouncement : async (req,res)=>{
        const newData = {
            thumbnail : req.body.thumbnail,
            content : req.body.content,
            date: req.body.date,
            user_id: req.body.user_id
        }
        await model.announcement.create(newData)
        .then((result)=>{
            res.status(201).json({
                message: 'Data baru telah ditambahkan',
                data: result,
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({
                message: err
            })
        })
    },

    editAnnouncement : async (req,res)=>{
        const id = req.params.id
        const newData = {
            content : req.body.content,
            user_id: req.body.user_id
        }
        await model.announcement.update(newData, {where: {id_announcement: id}})
        .then((result)=>{
            res.status(201).json({
                message: `Data dengan id ${id} telah diupdate`,
                data: newData
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({
                message: err
            })
        })
    },

    deleteAnnouncement : async (req,res)=>{
        const id = req.params.id
        await model.announcement.destroy({where: {id_announcement: id}})
        .then((result)=>{
            res.status(201).json({
                message: `Data dengan id ${id} telah dihapus`,
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({
                message: err
            })
        })
    },
}