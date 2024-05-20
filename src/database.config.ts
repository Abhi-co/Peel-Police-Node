// database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port:1433,
  // driver:'msnodesqlv8',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
}));





// export const dbConfig = {
//     user: 'peelpoliceuser',
//     password: 'Welcome@1',
//     server: '4.213.88.159',
//     database: 'PeelPolice',
//     options: {
//         encrypt: true, // For Azure users
//         trustServerCertificate: true,
    
//     }
// };