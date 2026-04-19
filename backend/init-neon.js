import { query } from './src/config/db.js';
import fs from 'fs';
import path from 'path';
import pool from './src/config/db.js';

async function initialize() {
    console.log('Connecting to Neon database...');
    const sqlPath = path.join(process.cwd(), 'database.sql');
    try {
        const sql = fs.readFileSync(sqlPath, 'utf8');
        console.log('Running schema...');
        // Execute the entire SQL script
        // Note: pg doesn't support multiple statements in one query easily with parameters, 
        // but for a raw schema string it usually works if they are separated by semicolons.
        await query(sql);
        console.log('✓ Neon Database schema initialized successfully');
    } catch (err) {
        console.error('Initialization failed:', err.message);
    } finally {
        await pool.end();
    }
}

initialize();
