"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
dotenv_1.default.config();
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PWD:', process.env.DB_PWD);
console.log('DB_SERVER:', process.env.DB_SERVER);
console.log('DB_NAME:', process.env.DB_NAME);
exports.sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000 // Corrected typo
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
mssql_1.default.connect(exports.sqlConfig)
    .then(() => {
    console.log('Connected to SQL Server');
})
    .catch((err) => {
    console.error('Database connection failed:', err);
});
exports.default = exports.sqlConfig;
