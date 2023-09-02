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
