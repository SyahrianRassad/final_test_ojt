
const schedule = require("node-schedule");
const model = require('../models/index');
const nodemailer = require('nodemailer');
const createTransporter = require('./emailTransporter');
const db = require('./database')

async function PengingatHRD(){
    const Pengingat = schedule.scheduleJob('0 0 * * *', async function(){
        // 0 0 * * *
        let transporter = await createTransporter();
    
        //get data yang belum di approved / rejected 
        const r_request = await model.reimburtment.findAll({where: {request_status: "pending"}})
        const o_request = await model.overtime.findAll({where: {request_status: "pending"}})
    
        //get
        let emailList = []
        let emailHR = await model.user.findAll({
            attributes: ['email'],
            where: {role_id: 1}
        })
    
        emailHR.map(item =>{
            emailList.push(item.dataValues.email)
        })
    
    
        if (r_request.length > 0 || o_request.length > 0) {
            //send email
            let linkEmail = []
            for (let i = 0; i < emailList.length; i++) {
                let info = await transporter.sendMail({
                    from: "aplication",
                    to: emailList[i],
                    subject: "Pengingat Request",
                    text: "Terdapat data request yang belum di approve",
                });
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        } else {
            console.log("tidak ada nilai");
        }

        //menambahkan absensi
        const dataUser = await model.user.findAll({attributes: ['id_user']})

        dataUser.map(async(item)=>{
            console.log()
            
            const newData = {
                user_id : item.dataValues.id_user,
                date: new Date
            }

            await model.attendance.create(newData)
            .then((result)=>{
                console.log("berhasil menambahkan " + result)
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    })
}


module.exports = PengingatHRD;