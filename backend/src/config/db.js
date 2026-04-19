import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

/**
 * PostgreSQL Connection Pool Configuration
 * Uses environment variables for secure credential management
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('neon.tech')
let initStatus = 'pending'
let initError = null
let initPromise = null

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'databridge',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000, // Increase to 30s to allow Neon wake-up
    ssl: isProduction ? { rejectUnauthorized: false } : false
})

/**
 * Automatically initializes the database schema if needed.
 * Includes retry logic and wake-up ping to handle Neon "Compute is transitioning" state.
 */
export const initializeDatabase = async (retries = 6, delay = 10000) => {
    initPromise = (async () => {
        try {
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const sqlPath = path.resolve(__dirname, '../../database.sql');
            
            if (!fs.existsSync(sqlPath)) {
                console.warn(`⚠️ database.sql not found at ${sqlPath}`);
                initStatus = 'file_not_found';
                return;
            }

            const sql = fs.readFileSync(sqlPath, 'utf8')

            // Step 1: Wake-up Ping
            for (let i = 0; i < retries; i++) {
                try {
                    console.log(`Wake-up Ping (Attempt ${i + 1}/${retries})...`);
                    await pool.query('SELECT 1');
                    console.log('✓ Database is awake');
                    break;
                } catch (err) {
                    const isRecoverable = err.message.includes('transitioning') || 
                                         err.message.includes('not ready') || 
                                         err.message.includes('timeout') ||
                                         err.message.includes('terminated');

                    if (isRecoverable && i < retries - 1) {
                        console.log(`⏳ Waiting for Neon to wake up (${err.message})... retrying in ${delay / 1000}s`);
                        await new Promise(res => setTimeout(res, delay));
                    } else {
                        throw err; // Give up and move to catch block
                    }
                }
            }

            // Step 2: Run Initialization
            console.log('Running initialization script...');
            await pool.query(sql);
            console.log('✓ Database schema initialized successfully');
            initStatus = 'success';
            
        } catch (e) {
            initStatus = 'error';
            initError = e.message;
            console.error('❌ Database initialization failed:', e.message);
        }
    })();
    return initPromise;
}

/**
 * Get the initialization promise
 */
export const getInitPromise = () => initPromise;

/**
 * Get initialization status for health check
 */
export const getInitStatus = () => ({ status: initStatus, error: initError })

// Test database connection
pool.on('connect', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('✓ Connected to PostgreSQL database')
    }
})

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    if (process.env.NODE_ENV === 'production') {
        // In production, we don't want to crash the whole process for an idle error if possible
        // but Vercel will handle instance restarts.
    } else {
        process.exit(-1)
    }
})

/**
 * Execute a query with parameters
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export const query = (text, params) => pool.query(text, params)

export default pool
