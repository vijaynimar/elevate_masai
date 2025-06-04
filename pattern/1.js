// *********
//  *******
//   *****
//    ***
//     *
//    ***
//   *****
//  *******
// *********


function sandGlass(n){
    
    for(let i=0;i<n;i++){
        let bag=""
        for(let j=0;j<n*2;j++){
            if(j>=i&&j<=(2*n)-i-2){
                bag+="*"
            }else{
                bag+=" "
            }
        }
        console.log(bag)
    }
     for(let i=n-2;i>=0;i--){
        let bag=""
        for(let j=0;j<n*2;j++){
            if(j>=i&&j<=(2*n)-i-2){
                bag+="*"
            }else{
                bag+=" "
            }
        }
        console.log(bag)
    }



}
// sandGlass(6)


// *   *
//  * *
//   *
//  * *
// *   *


function diagnols(n){
    for(let i=0;i<n;i++){
        let bag=""
        for(let j=0;j<n;j++){
            if(j==i||j==n-i-1){
                bag+="*"
            }else{
                bag+=" "
            }
        }
        console.log(bag);
    }
}
// diagnols(5)


//     A
//    ABA
//   ABCBA
//  ABCDCBA
// ABCDEDCBA


function alphabets(n){
let alphs="ABCDEFGHIJKLMNOPQRSTVWXYZ"
    for(let i=0;i<n;i++){
        let bag=""
        let k=0
        for(let j=0;j<n;j++){
            if(j>=n-i-1){
                bag+=alphs[k]
                k++
            }else{
                bag+=" "
            }
        }
        k=0
        console.log(bag);
    }


}
alphabets(5)

