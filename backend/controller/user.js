const model = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "#$*&%^&@#($(@";

function hasPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  getAllUser: async (req, res) => {
    await model.user
      .findAll()
      .then((result) => {
        if (result > 0) {
          res.status(200).json({
            message: "Get Data Passed",
            data: result,
          });
        } else {
          res.status(200).json({
            message: "Data Not Found",
            data: result,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({
          message: error,
        });
      });
  },

  addUser: async (req, res) => {
    const profile = {
      name: req.body.name,
      birthdate: Date.parse(req.body.birthdate),
      genre: req.body.genre,
      age: req.body.age
    }
    await model.profile
      .create(profile)
      .then(async(result) => {
        const newData = {
          role_id: req.body.role_id,
          email: req.body.email,
          password: hasPassword(req.body.password),
          profile_id: result.id_profile
        };
        await model.user
          .create(newData)
          .then((result2) => {
            res.status(201).json({
              message: `Data Baru Telah ditambahkan`,
              data: result,
              profile: result2
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
              message: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({
          message: err,
        });
      });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(402).json({ message: "email dan password wajib diisi" });

    await model.user
      .findAll({ where: { email: email } })
      .then((result) => {
        const user = result[0];

        if (typeof result === "undefined")
          return res.status(401).json({ message: "user tidak ditemukan" });

        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401).json({ message: "email atau password tidak sesuai" });
        } else {
          const token = jwt.sign({ result }, secret);
          res.status(200).json({
            message: "Login berhasil",
            token,
            user: result,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({
          message: err,
        });
      });
  },

  getProfile : async(req,res)=>{
    const id = req.params.id
    await model.profile.findAll({where: {id_profile : id}})
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
};
