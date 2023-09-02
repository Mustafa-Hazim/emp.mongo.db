import { Router } from "express";

import {addEmp, getAllEmps, getEmpBySalary} from "../controllers/emp.js";

const router  = Router()

router.post('/user', addEmp)
router.get('/', getAllEmps)
router.get('/find/salary', getEmpBySalary)

export  default router 