import { Router } from "express";

import {addEmp, byEmail, byName, getAllEmps, getEmpBySalary} from "../controllers/emp.js";

const router  = Router()

router.post('/user', addEmp)
router.get('/', getAllEmps)
router.get('/find/salary', getEmpBySalary)
router.get('/find/name', byName)
router.get('/find/email', byEmail)

export  default router 