export default {
  HOST: "projectify.cbmcsk5cno8t.us-west-1.rds.amazonaws.com",
  PORT: 3306,
  USER: "admin",
  PASSWORD: "sqladmin",
  DB: "projectifydb",
  ssl: "Amazon RDS",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 70000,
    idle: 10000,
  },
};

// export default {
//   HOST: "localhost",
//   PORT: 3306,
//   USER: "root",
//   PASSWORD: "password",
//   DB: "projectify",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
