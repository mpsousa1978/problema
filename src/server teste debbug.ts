import express from "express";

const app = express();

app.use(express.json()); //para receber expres: ex request.body,request.param


app.get("/",(request,response)=>{
    return response.json({message:"heloe world"});
})

app.post("/courses",(request,response)=>{
    const {name} = request.body;
    return response.json({name});
});

app.listen(3333,() => console.log("server is running!"))
