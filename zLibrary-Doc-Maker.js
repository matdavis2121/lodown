/* ----------------------SECTION 1. FORMAT TEXTAREA DESCRIPTION CODE--------------------------------*/ 
// 1a. MAIN FUNCTION - RAN with onclick-event for FORMATFUNCTION button
//7 console.logs
/////////////////////////////////////////////////////////////////// 
//boolean wasn't global at first NOW it is
var paramDesc1Boolean1 = false;
var paramDesc2Boolean2 = false;
var paramDesc3Boolean3 = false;

var returnDesc1Boolean = false;

function updateAfterCode(){
                            /* ---ALL VARS-----*/ 
var funcNametx = document.getElementById("func-name-textarea").value
var funcDesctx = document.getElementById("func-desc-text-a").value

var paramName1 = document.getElementById("paramName1").value
var paramType1 = document.getElementById("paramType1").value
var paramDesc1 = document.getElementById("paramDesc1").value

var paramName2 = document.getElementById("paramName2").value
var paramType2 = document.getElementById("paramType2").value
var paramDesc2 = document.getElementById("paramDesc2").value

var paramName3 = document.getElementById("paramName3").value
var paramType3 = document.getElementById("paramType3").value
var paramDesc3 = document.getElementById("paramDesc3").value

var returnDesc = document.getElementById("returnDesc").value
var returnType = document.getElementById("returnType").value
var pastedCode = document.getElementById("pasted-code").value
var thereturnSyntax;

                /* ---TEXTAREA TOO LONG? BREAK IT DOWN!-----*/
var eachLine60char_result; 
var DescriptionCheckers = [funcDesctx, paramDesc1, paramDesc2, paramDesc3, returnDesc].forEach(function(v,i,a){
  if(v && v.length > 60 && v === funcDesctx){funcDesctx = cleaner(v, 60);}
  else if(v && v.length > 34 && v === paramDesc1){paramDesc1Boolean1 = true; paramDesc1 = cleaner(v, 34);}
  else if(v && v.length > 34 && v === paramDesc2){paramDesc2Boolean2 = true; paramDesc2 = cleaner(v, 34);}
  else if(v && v.length > 34 && v === paramDesc3){paramDesc3Boolean3 = true; paramDesc3 = cleaner(v, 34);}
  else if(v && v.length > 34 && v === returnDesc){returnDesc1Boolean = true; returnDesc = cleaner(v, 34);}
});  
  
function cleaner(bigText, textLimit){  
  if(bigText.length > textLimit){
    eachLine60char_result = charLimit_AddSpace(bigText);    
    
    //CREATING: new bigtext by reassigning it to the reduced array(eachLine60char_result)
    bigText = eachLine60char_result.reduce(function(previous, element, i){      
      return previous + "\r" + " * " + element
    })
    return bigText
  }
}
    
                        /* ---STEP BY STEP FORMAT STRING-----*/
  //1. 062517-0315am -- need to turn the whole param line into a variable-DONE-"06/25/2017 17:35:16"
  //that way I can call multiple params
  //2. Will need to build an entire process around creating new params incase more
  //than 3 are needed
  if(returnType === "None" || returnType === "Select Return Type"){
    thereturnSyntax = 
      " * return@ {" + "NONE" + "}" + ": " + returnDesc + "\r";      
  } else {
    thereturnSyntax = 
      " * return@ {" + returnType + "}" + ": " + returnDesc + "\r"
  };
  
  var theparam3Syntax3
  var theparam2Syntax2
  
  var theparam1Syntax1 = 
      " * param@ {" + paramType1 + "} " + paramName1 + ": " + paramDesc1 + "\r"
    
    //DOES PARAMETER DESC2 HAVE A VALUE? NO? WE DONT WANT I!
    if(paramDesc2){
      theparam2Syntax2 = 
          " * param@ {" + paramType2 + "} " + paramName2 + ": " + paramDesc2 + "\r" 
    } else {theparam2Syntax2 = "";}
     
    //DOES PARAMETER DESC3 HAVE A VALUE? NO? WE DONT WANT I!
    if(paramDesc3){
      theparam3Syntax3 = 
          " * param@ {" + paramType3 + "} " + paramName3 + ": " + paramDesc3 + "\r" 
    } else {theparam3Syntax3 = "";}


  var formatted =
      "/** \r" +
      " * " + funcNametx + ": " + funcDesctx + "\r" +
      " * \r" +
      theparam1Syntax1 +
      theparam2Syntax2 +
      theparam3Syntax3 +
      " * \r" +
      thereturnSyntax +
      " */" + "\r" + pastedCode + "\r" +
      "module.exports." + funcNametx + " = " + funcNametx + ";"
      
  console.log("1. -" +formatted)
  
/*DOM MANIPULATION - 1.INSERT TEXT 2.SCROLL TO CODE*/   
  document.getElementById("code-result-textarea").value = formatted  
  window.scrollTo(0, 1059)
  return formatted;  
} //END OF: 1. UPDATEAFTERCODE

////////////////////////////////////////////////////////////////////////////////////
//1b. FORMAT TEXTAREA FUNCTION - Limits each line to 60 characters--ends line with a Wspace
//1b. Parameter Description is limited to 34 char on the 1st line
function charLimit_AddSpace(fullString){

console.log("2. -CHARTLIMIT START")  
console.log("3. -" + fullString)  
var strBreak;  
var lastWhiteSpaceIndex;  
var afterLastWhiteSpace1;
var remainingChars
var lengthDividedby74
var breakResult = [];
var textLimit2

return lineBreaker_array(fullString)
//1b-Section: 1
  //FUNCTION: lineBreaker_array - Logic for limiting character to 60 for MULTIPLE LINES
  //Initially had textLimit2 set to 34 for parameter Desc but it was too short
    ////////////////////////////////////////
    function lineBreaker_array(fullString){
    console.log("4a -LINBREAKERSTART")
    
    if(paramDesc1Boolean1 || returnDesc1Boolean || paramDesc2Boolean2 || paramDesc3Boolean3){      
      textLimit2 = 60
      strBreak = fullString.slice(0, 34)
      lastWhiteSpaceIndex = strBreak.lastIndexOf(" ")
      afterLastWhiteSpace1 = strBreak.slice(0, lastWhiteSpaceIndex + 1)
      breakResult.push(afterLastWhiteSpace1)
      remainingChars = fullString.slice(afterLastWhiteSpace1.length)
          
      
    } else if(fullString.length > 60){    
      //A. BREAK STRING AT LENGTH OF 60, ONLY AFTER LAST WHITE SPACE
      textLimit2 = 60
      strBreak = fullString.slice(0, 60)
      //Argument 2 for the slice method
      lastWhiteSpaceIndex = strBreak.lastIndexOf(" ")
    
      //LINE 1. 1st new str, all chars BEFORE last whitespace BUT including that WHITE SPACE
      afterLastWhiteSpace1 = strBreak.slice(0, lastWhiteSpaceIndex + 1)
      remainingChars = fullString.slice(afterLastWhiteSpace1.length)
    
      //Push both limited String + remaingChars into Result Array, return array
      breakResult.push(afterLastWhiteSpace1)    
     
    } // END OF: IF - 1B-SECTION 1
/*-----------------START OF LOOP/SECTION-----------------------*/              
console.log("5. -" + breakResult);      
    if(remainingChars.length){
      for(var i = 1; i < remainingChars.length + 10; i++){   
      console.log("5a. - ENTERED THE FOR LOOP");
        
        if(remainingChars.length > textLimit2){
          console.log("6. -LOOP IF STARTED")
          strBreak = remainingChars.slice(0, textLimit2)
          lastWhiteSpaceIndex = strBreak.lastIndexOf(" ")
          afterLastWhiteSpace1 = strBreak.slice(0, lastWhiteSpaceIndex + 1)
          remainingChars = remainingChars.slice(afterLastWhiteSpace1.length)
          
          //afterLastWhiteSpace1 = new limited string with WhiteSpace at end
          breakResult[i] = afterLastWhiteSpace1;         
          
        } else if(remainingChars.length < textLimit2 && remainingChars.indexOf(" ") === remainingChars.lastIndexOf(" ")) {          
          breakResult.push(remainingChars);
          break;          
        } else if (remainingChars.length < textLimit2){
            strBreak = remainingChars.slice(0, textLimit2)
            lastWhiteSpaceIndex = strBreak.lastIndexOf(" ")
            afterLastWhiteSpace1 = strBreak.slice(0, lastWhiteSpaceIndex + 1)
            remainingChars = remainingChars.slice(afterLastWhiteSpace1.length)
          
            breakResult[i] = afterLastWhiteSpace1
        }                  
      } //END OF : FOR LOOP
    }  //END OF : IF before FOR LOOP
      
      /* concat last 2 elements if both are SHORT IN LENGTH*/   
/* STILL need to account for random linebreaks but so far, works great*/       
      if(breakResult[breakResult.length - 1].length < 15 && breakResult[breakResult.length - 2].length < 45){
        console.log("7. -COMBINE LAST 2 ELEMENTS IF SHORT START")
        
        breakResult[breakResult.length - 2] = breakResult[breakResult.length - 2] + breakResult[breakResult.length - 1]; 
        breakResult.pop()        
        return breakResult
      } else{return breakResult}
    } // END OF: FUNCTION - LINEBREAKER  
}


/* --------------------SECTION 2. CLEARING ALL TEXTAREAS ----------------*/ 
function clearAll(){
  var funcNametx = document.getElementById("func-name-textarea")
  var funcDesctx = document.getElementById("func-desc-text-a")
  
  var paramName1 = document.getElementById("paramName1")
  var paramType1 = document.getElementById("paramType1")
  var paramDesc1 = document.getElementById("paramDesc1")
  
  var paramName2 = document.getElementById("paramName2")
  var paramType2 = document.getElementById("paramType2")
  var paramDesc2 = document.getElementById("paramDesc2")

  var paramName3 = document.getElementById("paramName3")
  var paramType3 = document.getElementById("paramType3")
  var paramDesc3 = document.getElementById("paramDesc3")
  
  var returnDesc = document.getElementById("returnDesc")
  var returnType = document.getElementById("returnType")
  var pastedCode = document.getElementById("pasted-code")
  var finalCode = document.getElementById("code-result-textarea")
  
  var nada = ""
  funcNametx.value = nada
  funcDesctx.value = nada
  
  paramName1.value = nada
  paramType1.value = "Select Parameter Type"
  paramDesc1.value = nada

  paramName2.value = nada
  paramType2.value = "Select Parameter Type"
  paramDesc2.value = nada
  
  paramName3.value = nada
  paramType3.value = "Select Parameter Type"
  paramDesc3.value = nada

  returnDesc.value = nada
  returnType.value = "Select Return Type"
  pastedCode.value = nada
  finalCode.value = nada
  
/* --------------DOM MANIPULATION-----------------*/   
  window.scrollTo(0, 0)
  funcNametx.focus()
  return "All completed"
}
/* --------------------SECTION 3. COPY NEW FORMATTED CODE TO CLIPBOARD----------------*/ 