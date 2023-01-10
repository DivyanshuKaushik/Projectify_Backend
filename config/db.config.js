export default {
  HOST: "my-db.coxxd2ftt8rh.ap-south-1.rds.amazonaws.com",
  PORT: 3306,
  USER: "admin",
  PASSWORD: "projectifydb",
  DB: "projectifydb",
  ssl: "Amazon RDS",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// export default {
//   HOST: "localhost",
//   PORT: 3306,
//   USER: "root",
//   PASSWORD: "rishitshivesh",
//   DB: "newprojectify",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
