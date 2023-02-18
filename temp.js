const stu = require("./src/dummy/students.json")
const batch = require("./src/dummy/batches.json")
const f = require("./src/dummy/faculty.json")
const pro = require("./src/dummy/projects.json")
const fa = require("./src/dummy/fa.json")
// console.log(fa);
const fs = require('fs')

const rem = []
fa.forEach(s=>{
   const res =  f.find(b=>b.faculty_id.toString()===s.faculty_id)
   if(res){
    rem.push(s)
   }
})
fs.writeFileSync('./src/dummy/fa.json',JSON.stringify(rem))
console.log('res', rem)
