//callback

// // function fun(a,b,next){
// //     next(a,b)
// // }
// // fun(1,2,next)
// // function next(a,b){
// //     console.log(a,b);
// // }


//callback hell


// function getData(data,getNextData){
//     setTimeout(function(){
//         console.log("data",data);
//         if(getNextData){
//             getNextData()
//         }
//     },2000)
// }

// getData(1,()=>{
//     getData(2,()=>{
//         getData(3)
//     })
// })




//promise


// function getData(data){
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             console.log(data);
//             res("success")
//             console.log("dataDone",data);
//         },2000)
//     })
// }

// let x=getData(1)
// x.then(()=>{
//     getData(2)
// }).catch((err)=>{
//     console.log(err);
// })

(function a(){
  console.log("vijay nimar")
})()