const Sequelize=require('sequelize');
require('dotenv').config();
const sequelize=new Sequelize(
    process.env.data_base,
    process.env.user,
    process.env.password,
    {
        dialect:'mysql'
});
sequelize.authenticate().then(
    ()=>{
        console.log("connection is successful");
    }
).catch(
    async(err)=>{
        console.log(`your connection was not successful`,err)
    }
);
module.exports=sequelize;