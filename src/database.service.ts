import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: sql.ConnectionPool;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  private async connect() {
    const dbConfig = this.configService.get('database');
    console.log('dbconfig',dbConfig)
    try {
      this.pool = await sql.connect(dbConfig);
      console.log('Connected to the database.');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async query(query: string) {
    try {
      const result = await this.pool.request().query(query);
      console.log('result',result)
      return result.recordset;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
}
