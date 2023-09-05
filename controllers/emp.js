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
    emp.birthDay = new Date(...prepareDate(req.body.birthDay));
    const result = await emp.save()
    res.send(result)
}

function prepareDate(d) {
    d = d.split("."); //Split the string
    return [d[0], d[1] - 1, d[2]]; //Return as an array with y,m,d sequence
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

export const byJobTitle = async (req, res) => {
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

// in this functions we will qeuery the mongodb one time to get all the search parameter with out the salary orpertor and the birthdat
export const search = async (req, res) => {
    // init variables
    let fname, lname, email, jobtitle, country

    // extract the post request body data
    fname = req.body.fname
    lname = req.body.lname
    email = req.body.email
    jobtitle = req.body.jobtitle
    country = req.body.country

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mognodb
    let fnameRegex;
    if (!fname || fname.length == 0) fnameRegex = '.*'
    else fnameRegex = `.*${fname}.*`


    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let lnameRegex;
    if (!lname || lname.length == 0) lnameRegex = '.*'
    else lnameRegex = `.*${lname}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let emailRegex;
    if (!email || email.length == 0) emailRegex = '.*'
    else emailRegex = `.*${email}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let jobtitleRegex;
    if (!jobtitle || jobtitle.length == 0) jobtitleRegex = '.*'
    else jobtitleRegex = `.*${jobtitle}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let countryRegex = ''
    if (!country || country.length == 0) countryRegex = '.*'
    else countryRegex = `.*${country}.*`

    // query mongo db with the regexes
    const result = await Employe.find({
        fname: { $regex: fnameRegex, $options: 'i' },
        lname: { $regex: lnameRegex, $options: 'i' },
        email: { $regex: emailRegex, $options: 'i' },
        jobTitle: { $regex: jobtitleRegex, $options: 'i' },
        country: { $regex: countryRegex, $options: 'i' },
    })

    // return res: 
    res.send(result)
}
// in this function will query mongo one time with salary operator
// with out the birthday
export const searchWithSalary = async (req, res) => {
    let fname, lname, email, jobtitle, country, salary, salaryop
    // extract the post request data
    fname = req.body.fname
    lname = req.body.lname
    email = req.body.email
    jobtitle = req.body.jobtitle
    country = req.body.country
    salaryop = req.body.salaryop
    salary = parseInt(req.body.salary)

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let fnameRegex;
    if (!fname || fname.length == 0) fnameRegex = '.*'
    else fnameRegex = `.*${fname}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let lnameRegex;
    if (!lname || lname.length == 0) lnameRegex = '.*'
    else lnameRegex = `.*${lname}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let emailRegex;
    if (!email || email.length == 0) emailRegex = '.*'
    else emailRegex = `.*${email}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let jobtitleRegex;
    if (!jobtitle || jobtitle.length == 0) jobtitleRegex = '.*'
    else jobtitleRegex = `.*${jobtitle}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let countryRegex = ''
    if (!country || country.length == 0) countryRegex = '.*'
    else countryRegex = `.*${country}.*`

    let result
    // check if the operator is salary more than value or less than
    salaryop == 'more' ?
        result = await Employe.find({
            fname: { $regex: fnameRegex, $options: 'i' },
            lname: { $regex: lnameRegex, $options: 'i' },
            email: { $regex: emailRegex, $options: 'i' },
            jobTitle: { $regex: jobtitleRegex, $options: 'i' },
            country: { $regex: countryRegex, $options: 'i' },
            salary: { $gte: salary }
            // next lines the operation is less than salary value
        }) : result = await Employe.find({
            fname: { $regex: fnameRegex, $options: 'i' },
            lname: { $regex: lnameRegex, $options: 'i' },
            email: { $regex: emailRegex, $options: 'i' },
            jobTitle: { $regex: jobtitleRegex, $options: 'i' },
            country: { $regex: countryRegex, $options: 'i' },
            salary: { $lte: salary }
        });

    // return res: 
    res.send(result)
}
// in this function will query mongo one time with birthday and salary:
export const magicSearch = async (req, res) => {
    let fname, lname, email, jobtitle, country, salary, salaryop, year, month, day
    // extract the post request data
    fname = req.body.fname
    lname = req.body.lname
    email = req.body.email
    jobtitle = req.body.jobtitle
    country = req.body.country
    salaryop = req.body.salaryop
    salary = parseInt(req.body.salary)
    year = req.body.birthday.slice(0, 4)
    month = req.body.birthday.slice(5, 7)
    day = req.body.birthday.slice(8, 10)

    const date = new Date(year, parseInt(month) - 1, day)
    let birthDay = 0;
    if (date) birthDay = date.getTime()
    console.log(date, birthDay)

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let fnameRegex;
    if (!fname || fname.length == 0) fnameRegex = '.*'
    else fnameRegex = `.*${fname}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let lnameRegex;
    if (!lname || lname.length == 0) lnameRegex = '.*'
    else lnameRegex = `.*${lname}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let emailRegex;
    if (!email || email.length == 0) emailRegex = '.*'
    else emailRegex = `.*${email}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let jobtitleRegex;
    if (!jobtitle || jobtitle.length == 0) jobtitleRegex = '.*'
    else jobtitleRegex = `.*${jobtitle}.*`

    // create the regex for the mongo db query where any count of chars if not spicified or spicified queryed chats this will used in the query of mongodb
    let countryRegex = ''
    if (!country || country.length == 0) countryRegex = '.*'
    else countryRegex = `.*${country}.*`

    let result
    // check if the operator is salary more than value or less than
    salaryop == 'more' ?
        result = await Employe.find({
            fname: { $regex: fnameRegex, $options: 'i' },
            lname: { $regex: lnameRegex, $options: 'i' },
            email: { $regex: emailRegex, $options: 'i' },
            jobTitle: { $regex: jobtitleRegex, $options: 'i' },
            country: { $regex: countryRegex, $options: 'i' },
            salary: { $gte: salary },
            birthDay: { $gte: new Date(year, month, day) }
            // next lines the operation is less than salary value
        }) : salaryop == 'less' ? result = await Employe.find({
            fname: { $regex: fnameRegex, $options: 'i' },
            lname: { $regex: lnameRegex, $options: 'i' },
            email: { $regex: emailRegex, $options: 'i' },
            jobTitle: { $regex: jobtitleRegex, $options: 'i' },
            country: { $regex: countryRegex, $options: 'i' },
            salary: { $lte: salary }
            // if there is birthday provided
        }) : birthDay > 0 ? result = await Employe.find({
            fname: { $regex: fnameRegex, $options: 'i' },
            lname: { $regex: lnameRegex, $options: 'i' },
            email: { $regex: emailRegex, $options: 'i' },
            jobTitle: { $regex: jobtitleRegex, $options: 'i' },
            country: { $regex: countryRegex, $options: 'i' },
            birthDay
            // if no birthday provided and no salary operations 
        }) : result = await Employe.find({
            fname: { $regex: fnameRegex, $options: 'i' },
            lname: { $regex: lnameRegex, $options: 'i' },
            email: { $regex: emailRegex, $options: 'i' },
            jobTitle: { $regex: jobtitleRegex, $options: 'i' },
            country: { $regex: countryRegex, $options: 'i' },
        })

    // return res: 
    res.send(result)
}


export const deleteEmp = async (req, res) => {
    try {
        const result = await Employe.findByIdAndRemove(req.query.id)
        res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const editEmp = async (req, res) => {
    try {
        // get the emp from the dsatabasea
        const emp = await Employe.findById(req.body.id).exec();
        // if there is no emp with this id
        if (!emp) return res.status(404).send('The employee with the given ID was not found.');

        // init the salary to update if avalible
        req.body.salary ? req.body.salary = parseInt(req.body.salary) : null;
        // init the birthday if available
        req.body.birthDay ? req.body.birthDay = new Date(req.body.birthDay).getTime() : null;

        // update the employe
        const updatedEmployee = await Employe.updateOne({ _id: req.body.id }, { $set: req.body }).exec();

        // send request back
        res.send(emp);

    } catch (error) {
        return res.send(error)
    }
}