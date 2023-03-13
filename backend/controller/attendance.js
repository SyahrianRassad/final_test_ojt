const model = require('../models/index')
const { Op } = require("sequelize");
const {db} = require('../config/database')
const sekarang = new Date()
const awal = new Date()
awal.setHours(00, 00, 00)

module.exports = {
    getAllAttendance : async(req,res)=>{
        console.log("masuk")
        await db.query("select a.id_attendance, a.check_in, a.check_in_time, a.check_out, a.check_out_time, a.date, p.name from attendance a join user u on a.user_id = u.id_user join profile p on p.id_profile = u.profile_id")
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

    getById : async(req,res)=>{
        const id = req.params.id
        await db.query(`select a.id_attendance, a.check_in, a.check_in_time, a.check_out, a.check_out_time, a.date, p.name from attendance a join user u on a.user_id = u.id_user join profile p on p.id_profile = u.profile_id where u.id_user = ${id}`)
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

    addAttendance : async (req,res)=>{
        const newData = {
            user_id : req.body.user_id,
            date: req.body.date
        }
        await model.attendance.create(newData)
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

    check_in : async (req,res)=>{
        const id = req.params.id
        const newData = {
            check_in : "true",
            check_in_time: new Date
        }
        const idA = await db.query(`select id_attendance from attendance where user_id = ${id} ORDER BY id_attendance DESC`)
        console.log(idA[0][0])

        //limit
        const limit = new Date()
        limit.setHours(07, 00, 00)

        if(Date.parse(sekarang) < Date.parse(limit) && Date.parse(sekarang) == Date.parse(awal) ){
            await model.attendance.update(newData, {where: {id_attendance: idA[0][0].id_attendance}})
            .then((result)=>{
                res.status(201).json({
                    message: `Absen anda telah diupdate`,
                    data: result
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(404).json({
                    message: err
                })
            })
        }else{
            res.send({
                message: "Anda tidak dapat Check in dikarenakan sudah melebihi jam 7 pagi atau sudah melaksanakan check in"
            })
        }
    },

    check_out : async (req,res)=>{
        const id = req.params.id
        const newData = {
            check_out : "true",
            check_out_time: new Date
        }
        const idA = await db.query(`select id_attendance from attendance where user_id = ${id} ORDER BY id_attendance DESC`)
        
        //limit
        const limit = new Date()
        limit.setHours(22, 00, 00)

        if(Date.parse(sekarang) < Date.parse(limit) && Date.parse(sekarang) == Date.parse(awal) ){
            await model.attendance.update(newData, {where: {id_attendance: idA[0][0].id_attendance}})
            .then((result)=>{
                res.status(201).json({
                    message: `Absen anda telah diupdate`,
                    data: result
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(404).json({
                    message: err
                })
            })
        }else{
            res.send({
                message: "Anda tidak dapat Check out dikarenakan sudah melebihi jam 22 malam atau sudah melaksanakan check out "
            })
        }
    },


    // deleteAnnouncement : async (req,res)=>{
    //     const id = req.params.id
    //     await model.announcement.destroy({where: {id_announcement: id}})
    //     .then((result)=>{
    //         res.status(201).json({
    //             message: `Data dengan id ${id} telah dihapus`,
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //         res.status(404).json({
    //             message: err
    //         })
    //     })
    // },
}