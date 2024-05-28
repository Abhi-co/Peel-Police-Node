import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import * as mssql from 'mssql';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class StudentsService {

    private pool: mssql.ConnectionPool;

    constructor(private readonly databaseService: DatabaseService) { }

    async getAllUsers(): Promise<any[]> {
        try {
            const pool = await this.databaseService.connect();
            const result = await pool.request().execute('dbo.GetAllAdmins');
            return result.recordset;
        } catch (error) {
            throw new Error('Error retrieving users from database: ' + error.message);
        }
    }
}
