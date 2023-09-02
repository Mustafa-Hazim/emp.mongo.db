import { Employe } from "../models/emp.js"

export const addEmp = async (req, res) => {
    if (
        !req.body.fname || !req.body.lname ||
        !req.body.email || !req.body.country ||
        !req.body.jobTitle || !req.body.birthDay ||
        !req.body.salary
    ) {
        return res.status(400).send('more deatils please')
    }

    const emp = new Employe(req.body)
    const result = await emp.save()
    res.send(result)
}


export const getAllEmps = async (req, res) => {
    res.send(await Employe.find())
}

export const getEmpBySalary = async (req, res) => {
    // check if there value to get more than
    if (!req.query.val)
        return res.status(400).send("salary val is missed")
    // convert the compare vallue to the integar value 
    const val = parseInt(req.query.val)
    // decide whice operator (more than / less than)
    if (req.query.opr == 'moreThan')
        return res.send(await Employe.find({ salary: { $gte: val } }))
    // check if there is a operator (more than / less than)
    if (req.query.opr == 'lessThan')
        return res.send(await Employe.find({ salary: { $lte: val } }))

    // default behivor return missed more deatils:
    res.send('missed more data')
}
