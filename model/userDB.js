import { pool } from "../config/db.js"

const getUsers = async () => {
  try {
    let [rows] = await pool.query(`SELECT * FROM employeeinfo`)
    return rows
  } catch (error) {
    return 'err'
  }
}

const postUser = async (name,email,password,username) => {
  try {
    await pool.query(`INSERT INTO employeeinfo (name,email,password,username) VALUES (?,?,?,?);`,[name,email,password,username])       
  } catch (error) {
    return 'err'
  }
}

const deleteEmployee = async (name) => {
  try {
    await pool.query(`DELETE FROM employeeinfo WHERE name = ?;`,[name])
  } catch (error) {
    console.error(error)
  }
}

const postemployee = async (name,position,department,salary,employmentHistory,contact) => {
  try {
    await pool.query(`INSERT INTO employeeinfo (name,position,department,salary,employmentHistory,contact) VALUES (?,?,?,?,?,?);`,[name,position,department,salary,employmentHistory,contact])       
  } catch (error) {
    return error
  }
}

const fetchEmployeesCard = async () => { 
  try {
    let [rows] = await pool.query(`SELECT * FROM employeeinfo;`)
    return rows
  } catch (error) {
    return error
  }
}

export const getUserByUsername = async (username) => {
  try {
    let [rows] = await pool.query(`SELECT * FROM employeeinfo WHERE username = ?;`, [username])
    if (rows.length === 0) return null
    return rows[0]  // single user object
  } catch (error) {
    console.error('DB error in getUserByUsername:', error)
    return null
  }
}

const fetchEmployeespayslip = async () => { 
  try {
    let [rows] = await pool.query(`SELECT * FROM payroll_data;`)
    return rows 
  } catch (error) {
    return error
  }
}

const fetchAttendance = async () => {
  try {
    let [rows] = await pool.query(`SELECT e.name AS employee,
      MAX(CASE WHEN a.attendance_date = '2025-07-25' THEN a.status ELSE '-' END) AS "2025-07-25",
      MAX(CASE WHEN a.attendance_date = '2025-07-26' THEN a.status ELSE '-' END) AS "2025-07-26",
      MAX(CASE WHEN a.attendance_date = '2025-07-27' THEN a.status ELSE '-' END) AS "2025-07-27",
      MAX(CASE WHEN a.attendance_date = '2025-07-28' THEN a.status ELSE '-' END) AS "2025-07-28",
      MAX(CASE WHEN a.attendance_date = '2025-07-29' THEN a.status ELSE '-' END) AS "2025-07-29"
      FROM employees e LEFT JOIN attendance a ON e.id = a.employee_id GROUP BY e.name ORDER BY e.name;`)
    return rows
  } catch (error) {
    return error
  }
}

const fetchLeaveRequests = async () => {
  try {
    let [rows] = await pool.query(`SELECT * FROM leave_requests`)
    return rows
  } catch (error) {
    return error
  }
}

const leaveForm = async (name, type, startDate, endDate, reason, status) => {
  try {
    await pool.query(
      `INSERT INTO leave_requests (name, type, startDate, endDate, reason, status) VALUES (?, ?, ?, ?, ?, ?);`,
      [name, type, startDate, endDate, reason, status]
    )
  } catch (error) {
    console.error("Error inserting leave request:", error);
    return 'err';
  }
}

const updateLeaveStatus = async (id, status) => {
  try {
    await pool.query(
      'UPDATE leave_requests SET status = ? WHERE id = ?',
      [status, id]
    )
  } catch (error) {
    console.error('DB error in updateLeaveStatus:', error)
    throw error
  }
}

const getUsername = async (username) => {
  try {
    let [rows] = await pool.query(`SELECT password FROM employeeinfo WHERE username = ?;`, [username])
    if (rows.length === 0) return null
    return rows[0].password  // hashed password
  } catch (error) {
    console.error(error)
    return null
  }    
}

export {
  getUsers,
  postUser,
  getUsername,
  leaveForm,
  updateLeaveStatus,
  fetchLeaveRequests,
  fetchAttendance,
  fetchEmployeesCard,
  postemployee,
  deleteEmployee,
  fetchEmployeespayslip
}
