const model = require('../models/index');
const {db} = require('../config/database')
const { Op } = require("sequelize");
const nodemailer = require('nodemailer')
const createTransporter = require('../config/emailTransporter')
require('dotenv').config();

module.exports = {
    getAllOvertime : async(req,res)=>{
        console.log("masuk")
        await db.query("select o.id_overtime, p.name, o.over_time, u.email, r.role, o.request_status from overtime o join user u on o.user_id = u.id_user join profile p on p.id_profile = u.profile_id join role r on r.id_role = u.role_id")
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
        await db.query(`select o.id_overtime, p.name, o.over_time, u.email, r.role, o.request_status from overtime o join user u on o.user_id = u.id_user join profile p on p.id_profile = u.profile_id join role r on r.id_role = u.role_id where o.user_id = ${id}`)
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

    addOvertime : async (req,res)=>{
        let transporter = await createTransporter();
        const newData = {
            user_id : req.body.user_id,
            over_time: req.body.over_time
        }

        await model.overtime.create(newData)
        .then(async(result)=>{
            //get user email
            let emailList = []
            
            let emailHR = await model.user.findAll({
                attributes: ['email'],
                where: {role_id: 1}
            })
            
            let emailUser = await model.user.findAll({
                attributes: ['email'],
                where: {id_user: req.body.user_id}
            })

            emailHR.map(item =>{
                emailList.push(item.dataValues.email)
            })

            //send email
            let linkEmail = []
            for (let i = 0; i < emailList.length; i++) {
                let info = await transporter.sendMail({
                from: emailUser[0].dataValues.email,
                to: emailList[i],
                subject: "Request Overtime",
                text: "Saya karyawan ingin merequest overtime",
                });
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                linkEmail.push(nodemailer.getTestMessageUrl(info))
            }

            res.status(201).json({
                message: 'Data baru telah ditambahkan',
                data: result,
                email: linkEmail
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({
                message: err
            })
        })
    },

    approveOvertimeRequest : async (req,res)=>{
        let transporter = await createTransporter();
        const {
            id_user,
            id_overtime
        } = req.body
        
        await db.query(`UPDATE overtime SET request_status='allowed' WHERE id_overtime = ${id_overtime}`)
        .then(async(result)=>{
            //get email from database
            let emailHR = await model.user.findOne({
                attributes: ['email'],
                where: {id_user: id_user}
            })
            let emailUser = await db.query(`SELECT u.email from user u join overtime o on u.id_user = o.user_id where id_overtime = ${id_overtime}`)


            //send email
            let info = await transporter.sendMail({
                from: emailHR.dataValues.email,
                to: emailUser[0][0].email,
                subject: "Approved request",
                text: "Saya HR mengizinkan untuk melakukan overtime",
            });
                res.status(201).json({
                    message: `Request dengan id ${id_overtime} telah diapprove`,
                    linkEmal: nodemailer.getTestMessageUrl(info)
                })
            })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({
                message: err
            })
        })
    },

    rejectOvertimeRequest : async (req,res)=>{
        let transporter = await createTransporter();
        const {
            id_user,
            id_overtime
        } = req.body
        
        await db.query(`UPDATE overtime SET request_status='denied' WHERE id_overtime = ${id_overtime}`)
        .then(async(result)=>{
            //get email from database
            let emailHR = await model.user.findOne({
                attributes: ['email'],
                where: {id_user: id_user}
            })
            let emailUser = await db.query(`SELECT u.email from user u join overtime o on u.id_user = o.user_id where id_overtime = ${id_overtime}`)


            //send email
            let info = await transporter.sendMail({
                from: emailHR.dataValues.email,
                to: emailUser[0][0].email,
                subject: "Rejected request",
                text: "Saya HR tidak mengizinkan untuk melakukan overtime",
            });
                res.status(201).json({
                    message: `Request dengan id ${id_overtime} telah direject`,
                    linkEmal: nodemailer.getTestMessageUrl(info)
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