import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PWD:', process.env.DB_PWD);
console.log('DB_SERVER:', process.env.DB_SERVER);
console.log('DB_NAME:', process.env.DB_NAME);


export const sqlConfig = {

    user: process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_NAME as string,
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

sql.connect(sqlConfig)
    .then(() => {
        console.log('Connected to SQL Server');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

export default sqlConfig;
