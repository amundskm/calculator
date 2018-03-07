// psuedo code //
//initial expression is blank
let expression = '';



function checkPara(str){
    JSON.stringify(str);
    //console.log(typeof str);

    let leftParaPos = str.indexOf('(');
    let rightParaPos = str.lastIndexOf(')');

/* While there are any '(' in the expression, grab the
string between the first set of (). Create function so it
is recursive */
    while(leftParaPos != -1){
        //console.log(str.slice(leftParaPos + 1, rightParaPos));
        let partAns = checkPara(str.slice(leftParaPos + 1, rightParaPos))
        //console.log(partAns);
        str = str.replace(str.slice(leftParaPos, rightParaPos+1), partAns)
        //console.log(str);
        leftParaPos =str.indexOf('(');
    }

    
/*while there are any operators in the string, call functions
in the correct operational order to solve the expression
multiplication, division, addition, subtraction. return a
single number as the expression. */
    while( str.indexOf('x') != -1){
        let checkMultFirst = /((\d+)?(\.)?(\d+))(?=x)/;
        let firstNum = str.match(checkMultFirst);
        //console.log(firstNum)
        let checkMultSecond = /(?<=x)((\d+)?(\.)?(\d+))/;
        let secondNum = str.match(checkMultSecond);
        //console.log(secondNum)
        let ansMult = multiply(firstNum[0], secondNum[0]);
        str = str.replace(firstNum[0] + 'x' + secondNum[0], ansMult);
        //console.log(str);
    }

    while( str.indexOf('÷') != -1){
        //console.log(str);
        //console.log(str.indexOf('÷'));
        let checkDivFirst = /((\d+)?(\.)?(\d+))(?=÷)/;
        let firstNum = str.match(checkDivFirst);
        //console.log(firstNum)
        let checkDivSecond = /(?<=÷)((\d+)?(\.)?(\d+))/;
        let secondNum = str.match(checkDivSecond);
        //console.log(secondNum)
        let ansDiv = divide(firstNum[0], secondNum[0]);
        str = str.replace(firstNum[0] + '÷' + secondNum[0], ansDiv);
        
    }

    while( str.indexOf('+') != -1){
        let checkAddFirst = /((\d+)?(\.)?(\d+))(?=\+)/;
        let firstNum = str.match(checkAddFirst);
        //console.log(firstNum)
        let checkAddSecond = /(?<=\+)((\d+)?(\.)?(\d+))/;
        let secondNum = str.match(checkAddSecond);
        //console.log(secondNum)
        let ansAdd = add(firstNum[0], secondNum[0]);
        str = str.replace(firstNum[0] + '+' + secondNum[0], ansAdd);
        //console.log(str);
    }

    while( str.indexOf('-') != -1){
        let checkSubFirst = /((\d+)?(\.)?(\d+))(?=-)/;
        let firstNum = str.match(checkSubFirst);
        if (firstNum === null){
            break;
        }
        console.log(firstNum)
        let checkSubSecond = /(?<=-)((\d+)?(\.)?(\d+))/;
        let secondNum = str.match(checkSubSecond);
        console.log(secondNum)
        let ansSub = subtract(firstNum[0], secondNum[0]);
        str = str.replace(firstNum[0] + '-' + secondNum[0], ansSub);
        //console.log(str);
}

console.log('return' + str);
return str

}
// create event listener for enter
const enterListener = document.querySelector('#buttonEnter');
enterListener.addEventListener('click', function(e){
    let para = document.createElement("p");
    let node = document.createTextNode(expression + "=");
    para.appendChild(node);
    let hist = document.getElementById("history");
    hist.appendChild(para);
    expression = addMultiple(expression)
    ans = checkPara(expression);
    let ansPara = document.createElement("p");
    let ansNode = document.createTextNode(ans);
    ansPara.appendChild(ansNode);
    hist.appendChild(ansPara);
    ansPara.style.textAlign = "right";
    para.style.textAlign = "left";

    expression = ans;
    const showText = document.querySelector("#expression p");
    showText.textContent = expression;
    
})

// Create  event listeners for operators and numbers
const buttonListener = document.querySelectorAll('.buttonCalc');
const showText = document.querySelector("#expression p");
buttonListener.forEach(buttonListener => {
    buttonListener.addEventListener('click', function(e){
        expression += buttonListener.textContent;
        showText.textContent = expression;
    })
})

// create event listener for clear
const clearListener = document.querySelector('#buttonClear');
clearListener.addEventListener('click', function(e){
    expression = "";
    showText.textContent = "";

});

/*// create event listener for clear
const clearAllListener = document.querySelector('#buttonClearAll');
clearAllListener.addEventListener('click', function(e){
    expression ="";
    showText.textContent = "";
    let parent = document.getElementById("history");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
})
*/

function addMultiple(str){
/* Check if there is any numbers in front of '(' without
multiplication symbol, or behind ')', add muliplication. 
Example: (4+2)2 -> (4+2)x2 */
    let leftParaPos = str.indexOf('('); 
    let rightParaPos = str.lastIndexOf(')');
   // console.log(leftParaPos);
    //console.log(rightParaPos);
    //console.log(str[leftParaPos -1]);
    if (leftParaPos != -1){
        if(Number(str[leftParaPos -1]) >= 0){
            str = str.slice(0, leftParaPos) + 'x' + str.slice(leftParaPos, str.length + 1)
            console.log(str);
            debugger;
        }   
        console.log(str[rightParaPos + 1]);
        if(Number(str[rightParaPos + 1]) >= 0){
            str = str.slice(0, rightParaPos + 1) + 'x' + str.slice(rightParaPos + 1, str.length)
            console.log(str);
            debugger;
        }
    }
    return str;
}
function add (first, second) {
	return Number(first) + Number(second);
}

function subtract (first, second) {
	return Number(first) - Number(second);
}

function multiply (first, second) {
	return Number(first) * Number(second);
}

function divide (first, second) {
	return Number(first) / Number(second);
}
