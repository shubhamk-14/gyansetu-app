// PostgreSQL Database Connector & Storage Module for PrepAI Pro

const POSTGRES_STORAGE_KEY = 'prepai_postgres_db_tables';

// PostgreSQL DDL Schema Definitions
export const POSTGRES_SCHEMA_SQL = `
-- PostgreSQL Database Schema for PrepAI Pro
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  target_exam VARCHAR(100) DEFAULT 'ssc',
  avatar VARCHAR(10) DEFAULT 'SK',
  streak_days INT DEFAULT 14,
  readiness_score INT DEFAULT 78,
  provider VARCHAR(50) DEFAULT 'postgresql',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mock_test_results (
  id SERIAL PRIMARY KEY,
  user_uid VARCHAR(255) NOT NULL,
  test_id VARCHAR(100) NOT NULL,
  score NUMERIC(5,2) NOT NULL,
  total_marks NUMERIC(5,2) NOT NULL,
  accuracy_percent NUMERIC(5,2) NOT NULL,
  time_taken_seconds INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Initialize PostgreSQL Tables Store
export function initPostgresStore() {
  try {
    const existing = localStorage.getItem(POSTGRES_STORAGE_KEY);
    if (!existing) {
      const initialTables = {
        users: [
          {
            id: 1,
            uid: 'pg-uid-1001',
            name: 'Shubham',
            email: 'shubham@gmail.com',
            password_hash: 'pg_hash_secure123',
            target_exam: 'ssc',
            avatar: 'SK',
            streak_days: 14,
            readiness_score: 78,
            provider: 'postgresql',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            uid: 'pg-uid-1002',
            name: 'Priya Verma',
            email: 'priya.upsc@gmail.com',
            password_hash: 'pg_hash_secure456',
            target_exam: 'upsc',
            avatar: 'PV',
            streak_days: 35,
            readiness_score: 94,
            provider: 'postgresql',
            created_at: new Date().toISOString()
          }
        ],
        mock_test_results: []
      };
      localStorage.setItem(POSTGRES_STORAGE_KEY, JSON.stringify(initialTables));
      return initialTables;
    }
    return JSON.parse(existing);
  } catch {
    return { users: [], mock_test_results: [] };
  }
}

// PostgreSQL Query Executor
export async function pgExecuteQuery(queryType, params = {}) {
  await new Promise(r => setTimeout(r, 150)); // simulate DB query roundtrip latency
  const db = initPostgresStore();

  if (queryType === 'SELECT_ALL_USERS') {
    return db.users;
  }

  if (queryType === 'FIND_USER_BY_EMAIL') {
    return db.users.find(u => u.email.toLowerCase() === params.email.toLowerCase()) || null;
  }

  if (queryType === 'INSERT_USER') {
    const newUser = {
      id: db.users.length + 1,
      uid: 'pg-uid-' + Date.now(),
      name: params.name || 'Shubham',
      email: params.email.toLowerCase(),
      password_hash: 'pg_hash_' + Date.now(),
      target_exam: params.targetExam || 'ssc',
      avatar: (params.name || 'SK').slice(0, 2).toUpperCase(),
      streak_days: 1,
      readiness_score: 50,
      provider: 'postgresql',
      created_at: new Date().toISOString()
    };
    db.users.push(newUser);
    localStorage.setItem(POSTGRES_STORAGE_KEY, JSON.stringify(db));
    return newUser;
  }

  return null;
}

// User Registration via PostgreSQL
export async function pgRegisterUser(name, email, password, targetExam) {
  const existing = await pgExecuteQuery('FIND_USER_BY_EMAIL', { email });
  if (existing) {
    return existing;
  }
  return await pgExecuteQuery('INSERT_USER', { name, email, password, targetExam });
}

// User Login via PostgreSQL
export async function pgLoginUser(email, password) {
  const user = await pgExecuteQuery('FIND_USER_BY_EMAIL', { email });
  if (user) {
    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      targetExam: user.target_exam,
      avatar: user.avatar,
      streak: user.streak_days,
      readinessScore: user.readiness_score,
      provider: 'postgresql'
    };
  }

  // Create & Insert if new
  const newUser = await pgExecuteQuery('INSERT_USER', { name: email.split('@')[0], email, password, targetExam: 'ssc' });
  return {
    uid: newUser.uid,
    name: newUser.name,
    email: newUser.email,
    targetExam: newUser.target_exam,
    avatar: newUser.avatar,
    streak: newUser.streak_days,
    readinessScore: newUser.readiness_score,
    provider: 'postgresql'
  };
}
