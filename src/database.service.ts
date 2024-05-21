import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: sql.ConnectionPool;

  constructor(private configService: ConfigService) { }

  async onModuleInit() {
    // await this.connect();
  }

  public async connect() {
    const dbConfig = this.configService.get('database');
    console.log('dbconfig', dbConfig)
    try {
      this.pool = await sql.connect(dbConfig);
      console.log('Connected to the database.');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
    return this.pool;
  }

  async getUserByUsername(username: string): Promise<any> {
    try {
      const pool = await this.connect();
      const result = await pool.request()
      .input('username', sql.VarChar, username)
      .execute('dbo.LoginValidateAdminByUsername');

      console.log("recordset[0]:", result.recordset[0]);

      return result.recordset[0]; // Assuming username is unique, so only one record is expected

    } catch (error) {
      throw new Error('Error retrieving user from database: ' + error.message);
    } finally {
      await this.pool.close(); // Make sure to release the connection back to the pool
    }
  }

}
