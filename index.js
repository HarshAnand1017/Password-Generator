const inputSlider=document.querySelector("[data-length-slider]");
const lengthdisplay=document.querySelector("[data-lengthNumber]");
const passworddisplay=document.querySelector("[data-passwordDisplay]");
const copymsg=document.querySelector("[data-copyMsg]");
const copyBtn=document.querySelector("[data-copy]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberscheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#symbol");
const indicator=document.querySelector("[data-Indicator]");
const generatebtn=document.querySelector(".generate-button");
const allcheckbox=document.querySelector("input[type=checkbox]");
const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/'
let password="";
let passwordlength=10;
let checkcount=1;
//set strength color to grey
setindicator("#ccc");
handleslider();
function handleslider(){
    inputSlider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
    const max=inputSlider.max;
    const min=inputSlider.min;
    inputSlider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%";
}
function setindicator(color){
    indicator.style.backgroundColor=color;

}
function getrandom(min,max){
   return Math.floor(Math.random() *(max-min))+min;
}
function generatenumber(){
   return  getrandom(0,9);
}
function generateLowercase(){
   return  String.fromCharCode(getrandom(97,123));
}
function generateUppercase(){
    return  String.fromCharCode(getrandom(65,91));
 }
 function generatesymbol(){
    const randomno=getrandom(0,symbols.length);
    return symbols.charAt(randomno);
 }
 function calcStrength(){
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassymbol=false;

    if(uppercaseCheck.checked){
        hasupper=true;
    }
    if(lowercaseCheck.checked){
        haslower=true;
    }
    if(numberscheck.checked){
        hasnum=true;
    }
    if(symbolscheck.checked){
        hassymbol=true;
    }
    if(hasupper && haslower &&(hasnum||hassymbol) && passwordlength>=8){
        setindicator("#0f0");
    }
    else if((haslower || hasupper) && (hasnum || hassymbol) && passwordlength>=6 ){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
 }
 async function copycontent(){
    try{
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="failed";
    }
    copymsg.classList.add("active");
    setTimeout(function(){
        copymsg.classList.remove("active");
    },2000);
 }
 inputSlider.addEventListener('input',function(event){
    passwordlength=event.target.value;
    handleslider();
 });
 copyBtn.addEventListener('click',function(){
    if(passworddisplay.value){
        copycontent();
    }
 });

 function shufflePassword(array){
    for(let i=array.length-1;i>=0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;

 }
 function handleCheckboxchange(){
    checkcount=0;
   // allcheckbox.forEach((checkbox)=> {
      //  if(checkbox.checked){
       //     checkcount++;
       // }
   // });
   for(let i=0;i<allcheckbox.length;i++){
    if(checkbox.checked){
        checkcount++;
    }
   }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    
 }
for(let i=0;i<allcheckbox.length;i++){
    checkbox.addEventListener('change',handleCheckboxchange);
}
 generatebtn.addEventListener('click',()=>{
    if(checkcount==0){
        return;
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    password="";
    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numberscheck.checked){
        funcArr.push(generatenumber);
    }
    if(symbolscheck.checked){
        funcArr.push(generatesymbol);
    }
    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    console.log("compusory addition done");
    //remaining addition
    for(let i=0;i<passwordlength-funcArr.length;i++){
        let randindex=getrandom(0,funcArr.length);
        console.log("randomindex"+i);
        password+=funcArr[randindex]();
    }
    console.log("remaining addition done");
    password=shufflePassword(Array.from(password));
    console.log("password shuffling  done");
    passworddisplay.value=password;
    console.log("password done");
    calcStrength();
    

 });

