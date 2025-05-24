const express = require('express');
const app = express();
// this will test the get method
app.get("/user",(req,res)=>{
  res.send('firstName=atul,lastName=sharma,age=25');  
})
// this will test the post method
app.post("/user",(req,res)=>{
  res.send('User data received');   
});
// this will test all htpp methods
app.use('/test', (req, res) => {
  res.send('Test route is working');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');    
}); 