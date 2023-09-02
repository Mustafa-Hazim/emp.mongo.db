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

export const byName = async (req, res) => {
    // extract the search keyword:
    const firstName = req.query.firstName
    const lastName = req.query.lastName
    // check if there fist and last names
    if (!firstName && !lastName) return res.status(400).send("missed the names")

    let result;
    // if the first and last name are availble
    if (firstName && lastName) {
        // using the regex /zero or more chars, value, zero or more chars/
        result = await Employe.find({
            fname: { $regex: `.*${firstName}.*`, $options: 'i' },
            lname: { $regex: `.*${lastName}.*`, $options: 'i' }
        })
        // case the first name are only availble
    } else if (firstName) {
        // using the regex /zero or more chars, value, zero or more chars/
        result = await Employe.find({
            fname: { $regex: `.*${firstName}.*`, $options: 'i' },
        })
        // case the last name are only availble
    } else if (lastName) {
        result = await Employe.find({
            // using the regex /zero or more chars, value, zero or more chars/
            lname: { $regex: `.*${lastName}.*`, $options: 'i' }
        })
    }

    // send the resposne back
    res.send(result)
}

export const byEmail = async (req, res) => {
    // extract the search keyword:
    const email = req.query.email
    // check if there is email
    if (!email) return res.status(400).send("missed the email")

    let result;
    
    result = await Employe.find({
        // using the regex /zero or more chars, value, zero or more chars/
        email: { $regex: `.*${email}.*`, $options: 'i' }
    })

    // send the resposne back
    res.send(result)
}