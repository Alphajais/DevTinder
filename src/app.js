
// this will test the get method
// app.get("/user",(req,res)=>{
//   res.send('firstName=atul,lastName=sharma,age=25');  
// })
// app.use('/test', (req, res) => {
//   res.send('Test route is working');
// });
// app.use('/test1', (req, res) => {
//   res.send('Test route is  not working');
// });
// // this will test the post method
// app.post("/user",(req,res)=>{
//   res.send('User data received');   
// });
// // this will test all http methods
// app.use("/user", (req, res, next) => {
//    res.send("this is user route");
//   next();
// },
// (req,res)=>{
//   res.send("this is atul server route");
// }
//
// Ensure database connection is established
// const { adminAuth } = require("./middleware/auth");
// const { userAuth } = require("./middleware/auth");

// // Admin Routes
// app.use('/admin/alluser', adminAuth, (req, res) => {
//   res.send('This is the admin all user route 001');
// });

// app.use('/admin/deleteuser', adminAuth, (req, res) => {
//   res.send('delete user route'); 
// });

// // User Routes
// app.use('/user/alluser', userAuth, (req, res) => {
//   res.send('This is the user all user route 001');
// });

const express = require('express');
const app = express();
 const connectdb = require('./config/database'); 
const User = require('./models/user');

app.use(express.json()); 
// Middleware to parse JSON request bodies
// Middleware to log request details
app.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send('User created successfully');
  } catch (err) {
    console.error("Error saving user:", err); // ← Add this
    res.status(500).send('Internal Server Error');
  }
});

//find user of single email
app.get('/user', async (req, res) => {
  const userEmail = req.body.email; // use req.query for GET
  try {
    const users = await User.find({ email: userEmail }); 
    if (users.length === 0) {
      return res.status(404).send('User not found');
    }   
    else{
      res.json(users);
    }
 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// find all users in database using get method {};
app.get('/feed',async(req,res)=>{
try{
  const users = await User.find({}); // find the user in dsatabase 
  res.send(users);
} 
catch(err){
  res.status(500).send('Internal Server Error');  
}
});

app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate MongoDB ObjectId forma
    const user = await User.findById(userId);
res.send(user);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } 
  
});
app.patch('/user', async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const allowedUpdates = ['firstName', 'lastName', 'age', 'photoUrl', 'userId', 'skills'];
    const isValidUpdate = Object.keys(data).every((key) => allowedUpdates.includes(key));
    if(data.skills.length > 3){
      return res.status(400).send('Skills cannot exceed 3 items');
    }

    if (!isValidUpdate) {
      return res.status(400).send('Invalid update attributes');
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



 connectdb().then(() => {
  console.log('Database connected successfully');
app.listen(3000, () => {
  console.log('Server is running on port 3000');    
});
}).catch(err => {
  console.error('Database connection error:', err);
});

