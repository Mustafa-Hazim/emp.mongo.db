import { Router } from "express";

import {addEmp, byEmail, byName, deleteEmp, editEmp, getAllEmps, getEmpBySalary, magicSearch, search, searchWithSalary} from "../controllers/emp.js";

const router  = Router()

router.post('/user', addEmp)
router.get('/', getAllEmps)
router.get('/find/salary', getEmpBySalary)
router.get('/find/name', byName)
router.get('/find/email', byEmail)
router.post('/find', search)
router.post('/find/andSalary', searchWithSalary)
router.post('/find/magic', magicSearch)
router.delete('/user', deleteEmp)
router.patch('/user', editEmp)

export  default router 