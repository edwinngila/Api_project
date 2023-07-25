const express=require('express');
require('./helpers/mysql.init');
require('dotenv').config();
const sequelize=require('./helpers/mysql.init')
sequelize.sync()

const app = express();
app.use(express.json())
const userRoutes=require('./routes/user.routes')

app.use('/user',userRoutes);

app.use((req,res,next)=>{
    const err = new Error('not found');
    err.status=404
    next(err)
})
app.use((err,req,res,next)=>{
    res.status(err.status||500)
    res.send({
        error:{
            status:err.status||500,
            message:err.message
        }
    })
})

app.listen(process.env.port||5000,()=>{console.log(`you are now listening to port http://localhost:${process.env.port}`)})