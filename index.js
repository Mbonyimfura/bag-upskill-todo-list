// const form= document.querySelector('form');
// const str1= document.getElementById('str1')
// const str2= document.getElementById('str2')

// form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//    if(!(str1.value.length>=5 && str1.value.length<=8 & str2.value.length>=5 && str2.value.length<=8)){
//     alert('bad request')
//    }

  
// })
const increment= document.querySelector('.increment')
const decrement= document.querySelector('.decrement')
const answer= document.querySelector('.answer');
 
let counter=0;
const incrementCounter=()=>{
 counter=counter+1;
 answer.textContent=counter
}
const decrementCounter=()=>{
    counter=counter-1;
    answer.textContent=counter
   }
 increment.addEventListener('click',incrementCounter);
 decrement.addEventListener('click', decrementCounter)
