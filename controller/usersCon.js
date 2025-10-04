import { hashPassword, comparePasswords, createToken } from '../Middleware/auth.js'
import {
  getUsers,
  postUser,
  leaveForm,
  updateLeaveStatus,
  getUsername,
  fetchLeaveRequests,
  fetchAttendance,
  fetchEmployeesCard,
  postemployee,
  deleteEmployee,
  fetchEmployeespayslip
} from "../model/userDB.js"

const getUsersCon = async (req,res) => {
  const users = await getUsers()
  res.json(users)
}

const postUsersCon = async(req,res) => {
  let {name,email,password,username} = req.body
  let hashP = await hashPassword(password)
  await postUser(name,email,hashP,username)
  res.json({
    message:'You have registered successfully'
  })
}

const updateLeaveStatusCon = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ message: 'Missing id or status' });
    await updateLeaveStatus(id, status);
    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error('Update leave status error:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

const deleteEmployeeCon = async (req, res) => {
  try {
    const { name } = req.params;
    await deleteEmployee(name);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
};

const fetchEmployeespayslipCon = async (req,res) => {
  res.json({
    data: await fetchEmployeespayslip()
  })
}

const postemployeeCon = async (req,res) => {
  let {name,position,department,salary,employmentHistory,contact} = req.body
  await postemployee(name,position,department,salary,employmentHistory,contact)
  res.json({
    message: 'Employee added successfully'
  })
}

const fetchEmployeesCardCon = async (req,res) => {
  res.json({
    data: await fetchEmployeesCard()
  })
}

const fetchAttendanceCon = async(req,res) => {
  res.json({
    data: await fetchAttendance()
  })  
}

const fetchLeaveRequestsCon = async(req,res) => {
  res.json({
    data: await fetchLeaveRequests()
  })
}

const postLeaveCon = async (req, res) => {
  try {
    const { name, type, startDate, endDate, reason } = req.body;
    const status = "Pending";
    await leaveForm(name, type, startDate, endDate, reason, status);

    res.json({ message: "Leave request submitted successfully" });
  } catch (err) {
    console.error("Server Error in postLeaveCon:", err);
    res.status(500).json({ error: "Server error while submitting leave request" });
  }
};

export {
  getUsersCon,
  postUsersCon,
  postLeaveCon,
  updateLeaveStatusCon,
  fetchLeaveRequestsCon,
  fetchAttendanceCon,
  fetchEmployeesCardCon,
  postemployeeCon,
  deleteEmployeeCon,
  fetchEmployeespayslipCon
}
