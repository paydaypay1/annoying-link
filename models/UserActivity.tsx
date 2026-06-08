// Defines DB interface methods for data model UserActivity
import DB from '../config/db.tsx';

export async function createUserActivity(){
  const sql = 'INSERT INTO userActivity (name, email) VALUES (?, ?)';
  const values = ['John Doe', 'john@example.com'];

  DB.dbExecute(sql, values);
}

