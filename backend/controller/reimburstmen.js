const model = require('../models/index');
const {db} = require('../config/database')
const { Op } = require("sequelize");
const nodemailer = require('nodemailer')
const createTransporter = require('../config/emailTransporter')
require('dotenv').config();

module.exports = {
    getAllReimburtmen : async(req,res)=>{
        console.log("masuk")
        await db.query(`select o.id_reimburtment, p.name, o.reimburtment, o.reason, u.email, r.role, o.request_status from reimburtment o join user u on o.user_id = u.id_user join profile p on p.id_profile = u.profile_id join role r on r.id_role = u.role_id`)
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
        await db.query(`select o.id_reimburtment, p.name, o.reimburtment, o.reason, u.email, r.role, o.request_status from reimburtment o join user u on o.user_id = u.id_user join profile p on p.id_profile = u.profile_id join role r on r.id_role = u.role_id where o.user_id = ${id}`)
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

    addReimburtment : async (req,res)=>{
        let transporter = await createTransporter();
        const newData = {
            user_id : req.body.user_id,
            reason: req.body.reason,
            reimburtment: req.body.reimburtment
        }

        await model.reimburtment.create(newData)
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
                    text: "Saya karyawan ingin merequest reimburtmen",
                });
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                linkEmail.push(nodemailer.getTestMessageUrl(info))
            }

            res.status(201).json({
                message: 'Request reimburtmen telah dikirim',
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

    approveReimburtmentRequest : async (req,res)=>{
        let transporter = await createTransporter();
        const {
            id_user,
            id_reimburtment
        } = req.body
        
        await db.query(`UPDATE reimburtment SET request_status='allowed' WHERE id_reimburtment = ${id_reimburtment}`)
        .then(async(result)=>{
            //get email from database
            let emailHR = await model.user.findOne({
                attributes: ['email'],
                where: {id_user: id_user}
            })
            let emailUser = await db.query(`SELECT u.email from user u join reimburtment o on u.id_user = o.user_id where id_reimburtment = ${id_reimburtment}`)


            //send email
            let info = await transporter.sendMail({
                from: emailHR.dataValues.email,
                to: emailUser[0][0].email,
                subject: "Approved request",
                text: "Saya HR mengizinkan untuk melakukan reimburtment",
            });
                res.status(201).json({
                    message: `Request dengan id ${id_reimburtment} telah diapprove`,
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

    rejectReimburtmentRequest : async (req,res)=>{
        let transporter = await createTransporter();
        const {
            id_user,
            id_reimburtment
        } = req.body
        
        await db.query(`UPDATE reimburtment SET request_status='denied' WHERE id_reimburtment = ${id_reimburtment}`)
        .then(async(result)=>{
            //get email from database
            let emailHR = await model.user.findOne({
                attributes: ['email'],
                where: {id_user: id_user}
            })
            let emailUser = await db.query(`SELECT u.email from user u join reimburtment o on u.id_user = o.user_id where id_reimburtment = ${id_reimburtment}`)


            //send email
            let info = await transporter.sendMail({
                from: emailHR.dataValues.email,
                to: emailUser[0][0].email,
                subject: "Rejected request",
                text: "Saya HR tidak mengizinkan untuk melakukan reimburtment",
            });
                res.status(201).json({
                    message: `Request reimburtment dengan id ${id_reimburtment} direject`,
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