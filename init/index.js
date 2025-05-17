const mongoose=require("mongoose");
const initData=require("./data");

const Note=require("../models/note.js");

// const mongoUrl='mongodb://127.0.0.1:27017/note';
// const dbUrl=process.env.ATLASDB_URL;

// main()
// .then(()=>{
//     console.log("connected to DB.");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(dbUrl);
// }

const initDB=async ()=>{
    await Note.deleteMany({});
     Note.insertMany(initData.data);
     console.log("Data was initialized.");
}
initDB();