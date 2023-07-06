const { sequelize } = require("../config/db_connection");
const { Customer } = require("./customer");

sequelize.sync({force: true}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})