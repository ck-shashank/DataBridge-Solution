import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { Pool } = pg;

async function checkConnection() {
    console.log('--- Database Connection Check ---');
    console.log('Testing Neon Connection...');
    
    if (!process.env.DATABASE_URL) {
        console.log('❌ DATABASE_URL not found in .env');
    } else {
        const poolNeon = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5000
        });

        try {
            const res = await poolNeon.query('SELECT NOW()');
            console.log('✅ Neon Connected at:', res.rows[0].now);
            
            const tables = await poolNeon.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
            console.log('Found tables:', tables.rows.map(r => r.table_name).join(', ') || '(none)');
        } catch (err) {
            console.log('❌ Neon Connection Failed:', err.message);
            if (err.message.includes('ENOTFOUND')) {
                console.log('👉 Hint: The hostname could not be resolved. Check if there is a typo in the URL or if the project exists in Neon.');
            }
        } finally {
            await poolNeon.end();
        }
    }

    console.log('\nTesting Local Postgres Connection...');
    const poolLocal = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'databridge',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        connectionTimeoutMillis: 5000
    });

    try {
        const res = await poolLocal.query('SELECT NOW()');
        console.log('✅ Local Connected at:', res.rows[0].now);
        
        const tables = await poolLocal.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Found tables:', tables.rows.map(r => r.table_name).join(', ') || '(none)');
    } catch (err) {
        console.log('❌ Local Connection Failed:', err.message);
    } finally {
        await poolLocal.end();
    }
}

checkConnection();
