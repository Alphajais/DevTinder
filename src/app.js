const express = require('express');
const app = express();
app.use("/ ",(req,resp)=>{
    resp.send("hello hello");
})
 app.use("/test",(req,resp)=>{
    resp.send('Hello World');
 })

app.listen(3000, () => {
  console.log('Server is running on port 3000');    
}); 