var mongoose=require('mongoose');
//Cloud mongodb için aşağıdaki adresi cloud adresiyle değiştirin.
//var dbURI="mongodb+srv://sinan:sinan@cluster0.4or9sis.mongodb.net/mekanbul"
//var dbURI="mongodb://localhost/mekanbul";
var dbURI="mongodb+srv://palazemre1:Emre1234@cluster1.bco8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
mongoose.connect(dbURI);
mongoose.connection.on("connected",function(){
    console.log(dbURI+" adresine bağlandı");
});
mongoose.connection.on("disconnected",function(){
    console.log(dbURI+" bağlantısı koptu");
});

process.on("SIGINT",function(){
    mongoose.connection.close();
    console.log("Bağlantı kapatıldı");
    process.exit(0);
});
require("./venue");