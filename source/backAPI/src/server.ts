import app from "./app";

const port:number = 3000;
app.listen(port,()=>{
    console.log(`App running on http://127.0.0.1:${port}`);
})