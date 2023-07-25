const Sequelize=require('sequelize')
const sequelize=require('../helpers/mysql.init');
const User=sequelize.define('User',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userName:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    password:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    roll:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
        defaultValue:'user'
    }
});
module.exports=User;
