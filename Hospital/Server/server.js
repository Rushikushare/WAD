import App from "./App.js";
 import cloudinary from 'cloudinary';


 cloudinary.v2.config({
    cloud_name:"dokoo11t3",
    api_key:"849166822167194",
    api_secret:"_ch5P9woLkq-5ZSEgEajiE08Zs0",

 })

App.listen(4000,()=>{
console.log("Server Strated on port 4000");
});
