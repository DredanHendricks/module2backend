import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

import {
    getUsersCon,
    postUsersCon,
    postLeaveCon,
    updateLeaveStatusCon,
    fetchLeaveRequestsCon,
    fetchAttendanceCon,
    fetchEmployeesCardCon,
    postemployeeCon,
    deleteEmployeeCon,
    fetchEmployeespayslipCon,
} from './controller/usersCon.js'

import { getUserByUsername } from './model/userDB.js'
import { comparePasswords, createToken } from './Middleware/auth.js'

config()
const app = express()
const PORT = process.env.PORT || 9090;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/users', getUsersCon)
app.post('/users', postUsersCon)
app.post('/hrstaff', postLeaveCon)
app.patch('/leave-requests/update-status', updateLeaveStatusCon)
app.get('/leave-requests', fetchLeaveRequestsCon)
app.get('/attendance', fetchAttendanceCon)
app.get('/employees', fetchEmployeesCardCon)
app.delete('/employee/:name', deleteEmployeeCon)
app.get('/payslip', fetchEmployeespayslipCon)
app.post('/employee', postemployeeCon)

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing username or password' })
    }

    const user = await getUserByUsername(username)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const valid = await comparePasswords(password, user.password)

    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = createToken(user.username)

    res.json({ token, user })

  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
  
