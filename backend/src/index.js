const express=require("express");
const app=express();
const mongoose=require("mongoose");
const { clerkMiddleware }=require("@clerk/express");
const fileUpload=require("express-fileupload");
const path=require("path");
const cors=require("cors");


const authRoutes=require("./routes/auth_routes.js");
const adminRoutes=require("./routes/admin_routes.js");
const songRoutes=require("./routes/song_routes.js");
const albumRoutes=require("./routes/album_routes.js");
const statRoutes=require("./routes/stats_routes.js");
const {PORT,LOCAL_URI}=require("../config.js");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
// app.use(clerkMiddleware());
app.use(fileUpload({ 
    useTempFiles:true, 
    tempFileDir:path.join(__dirname,"temp"),
    createParentPath:true,
    limits:{
        fileSize:10*1024*1024 //10 MB max file size
    }
}))

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statRoutes);
app.use("/*",(req,res)=>res.json({error:"path not found"}));

mongoose.connect(LOCAL_URI).catch(err=>console.log("Error in mongooose.connect",err));
app.listen(PORT,(e)=>{
    if(e)
    console.log("Error in starting server",e)
    else
    console.log(`server is running on port ${PORT}`);
})