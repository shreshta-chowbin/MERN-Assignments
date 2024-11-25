const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const multer=require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })
  
  const app=express();
  app.use(cors());
  app.use('/uploads', express.static('uploads'));


  app.delete("/delete/:email",async(req,res)=>{
    console.log(req.params);
    // return res.json(["Dummy delete data"]);
    try
    {
        let i=req.params.i;
        let result=await EmployeeDetails.deleteMany({email:req.params.email});
        console.log(result);

        if(result.deletedCount>0)
        {
            return res.json({status:"Success",mes:"Successfully deleted employee"});
        }
        else
        {
            return res.json({status:"ERROR",mes:"Employee not found(Execution err)"});
        }
    }
    catch(err)
    {
        res.json({status:"ERROR",mes:"Unable to delete employee data",error:err});
    }
  });

  
  app.post("/employee",upload.single("profilePic"),async(req,res)=>{

    // return res.json(["dummy employee data"]);
    console.log(res.body);

    try
    {
        let employee=new EmployeeDetails({
            name:req.body.name,
            email:req.body.email,
            mobileNo:req.body.mobileNo,
            designation:req.body.designation,
            gender:req.body.gender,
            courses:req.body.courses,
            profilePic:req.file.path,
            date:req.body.date,
        });

        await employee.save();
        return res.json({status:"Success",mes:"Successfully Created Employee"});
    }
    catch(err)
    {
        return res.json({status:"ERROR",mes:"Unable To Create Employee",error:err});
    } 
});



app.put("/editEmployee",upload.single("profilePic"),async(req,res)=>{

    // return res.json(["Dummmy edit data"]);
    console.log(req.body);

    try
    {
        await EmployeeDetails.updateMany({email:req.body.email},{name:req.body.name});
        await EmployeeDetails.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo});
        await EmployeeDetails.updateMany({email:req.body.email},{designation:req.body.designation});
        await EmployeeDetails.updateMany({email:req.body.email},{profilePic:req.file.path});
        await EmployeeDetails.updateMany({email:req.body.email},{gender:req.body.gender});
        await EmployeeDetails.updateMany({email:req.body.email},{courses:req.body.courses});
        await EmployeeDetails.updateMany({email:req.body.email},{date:res.body.date});
        return res.json({status:"Success",mes:"Succesfully updated employee data"});
    }
    catch(err)
    {
        return res.json({status:"ERROR",mes:"Unable to update employee data",error:err});
    }
});


app.get("/employeeData",async(req,res)=>{

    let employeeArr=await EmployeeDetails.find().sort("name");
    res.json(employeeArr);
});

app.listen(1234,()=>{
    console.log("Listening to the port 1234")
});

let employeeDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        validate: {
            validator: function(v) {
              return /^[A-Za-z]{3,20}([ ][A-Za-z]{3,20})*$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
          },
          required: [true, 'Employee Name required'],
    },
    email:{
        type:String,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email id!`
          },
          required: [true, 'Employee Email ID required'],
    },
    mobileNo:{
        type:String,
        validate: {
            validator: function(v) {
              return /^[6-9]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
          },
          required: [true, 'Employee Mobile Number required'],
    },
    designation:{
        type:String,
        enum: ['HR', 'Manager' ,'Sales'],
          required: [true, 'Employee Designation required'],
    },
    gender:{
        type:String,
        lowercase:true,
        // enum:["male","female"],
          required: [true, 'Employee Gender required'],
    },
    courses:{
        type:String,
        // enum:["MCA","BCA","BSC"],
        required: [true, 'Employee Course required'],
    },
    profilePic:{
        type:String,
        required: [true, 'Employee Image required'],
    },
    date:{
        type:String,
        require: [true, 'Creation date required'],
    },
});

let EmployeeDetails=new mongoose.model("EmployeeDetails",employeeDetailsSchema,"Employee_Details");

let connectToMongoDB=async()=>{
    try
    {
        await mongoose.connect("mongodb+srv://shreshtachowbin:shreshtachowbin@brnmern.3uhkw.mongodb.net/InternShip_Assignment?retryWrites=true&w=majority&appName=BRNMERN");
        console.log("Succesfully connected to MongoDB");
        // let employeeData=await EmployeeDetails.find();
        // console.log(employeeData);
    }
    catch(err)
    {
        console.log("Unable to connect to MongoDB");
        console.log(err);
    }
};

connectToMongoDB();