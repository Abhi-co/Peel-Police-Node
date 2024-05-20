import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import * as mssql from 'mssql';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class StudentsService {

    private pool: mssql.ConnectionPool;

    constructor(private readonly databaseService:DatabaseService) {}


    async getAllUsers(): Promise<any[]> {
        try {
          const pool = await this.databaseService.connect();
          const result = await pool.request().query('SELECT * FROM dbo.AdminMasterUser');
          return result.recordset;
        } catch (error) {
          throw new Error('Error retrieving users from database: ' + error.message);
        }
      }

    //   async getUserByUsername(username: string): Promise<any> {
    //     try {
    //       const pool = await this.pool.connect();
    //       const result = await pool.request().input('username', sql.VarChar, username).query('SELECT * FROM dbo.AdminMasterUser WHERE userName = @username');
    //       console.log("recordset[0]:",result.recordset[0]);
    
    //       return result.recordset[0]; // Assuming username is unique, so only one record is expected
    
    //     } catch (error) {
    //       throw new Error('Error retrieving user from database: ' + error.message);
    //     } finally {
    //       await this.pool.close(); // Make sure to release the connection back to the pool
    //     }
    //   }


}
