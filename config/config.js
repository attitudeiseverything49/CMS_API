module.exports = {
    HOST: "localhost",
    USERNAME: "sa",
    PASSWORD: "root",
    DB: "cms",
    dialect:"mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}