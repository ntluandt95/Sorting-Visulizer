"use strict";
var btn_generate = document.getElementById("btn_generate");
var inputSize = document.getElementById("input_size");
var margin_size;
var btnBubble = document.getElementById("btnBubble");
var btnSelection = document.getElementById("btnSelection");
var inputSpeed = document.getElementById("speed");
var speed = 0;
var input_size = inputSize.value;
inputSpeed.addEventListener("change", () => {
    speed = 500 / inputSpeed.value;
})

inputSize.addEventListener("change",()=>{
    input_size = inputSize.value;
})

var initSpeed = 0;
btn_generate.addEventListener("click", generateArray);

var cont = document.getElementById("array_container");

var divsList = [];
var div_sizes = [];
generateArray();
function generateArray() {
    
    cont.innerHTML = "";
    for (var i = 0; i < input_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inputSize.max - inputSize.min)) + 10;
        divsList[i] = document.createElement("div");
        cont.appendChild(divsList[i]);
        margin_size = 0.1;
        divsList[i].style = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / input_size - 2* margin_size) + "%; height:" + (div_sizes[i]) + "%;";
    }
    
}
function swap(a, b) {

    // setTimeout(() => {
    //     temp = div_sizes[a];
    //     div_sizes[a] = div_sizes[b];
    //     div_sizes[b] = temp;
    //     divUpdate(divsList[a], div_sizes[a], "yellow");
    //     divUpdate(divsList[b], div_sizes[b], "yellow");
    //     divUpdate(divsList[a], div_sizes[a], "blue");
    //     divUpdate(divsList[b], div_sizes[b], "blue");
    // }, speed += 10);
    divUpdate(divsList[a], div_sizes[a], "yellow");
    temp = div_sizes[a];
    div_sizes[a] = div_sizes[b];
    div_sizes[b] = temp;
    divUpdate(divsList[a], div_sizes[a], "red");
    divUpdate(divsList[b], div_sizes[b], "red");



}


function divUpdate(element, height, color) {
    // element.style = " margin:0% " + margin_size + "%; width:" + (100 / input_size.value - (2 * margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
    window.setTimeout(
        () => {
            element.style = " margin:0% " + margin_size + "%; width:" + (100 / input_size - 2* margin_size) + "%; height:" + height + "%; background-color:" + color + ";";
        }, initSpeed += speed);
}



btnBubble.addEventListener("click", () => {
    for (let i = 0; i < input_size; i++) {
        for (let j = 0; j < input_size - i - 1; j++) {
            divUpdate(divsList[j], div_sizes[j], "yellow");

            if (div_sizes[j] > div_sizes[j + 1]) {

                divUpdate(divsList[j], div_sizes[j], "red");
                divUpdate(divsList[j + 1], div_sizes[j + 1], "red");
                // swap(j, j + 1);
                var temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                divUpdate(divsList[j], div_sizes[j], "red");
                divUpdate(divsList[j + 1], div_sizes[j + 1], "red");

            }
            divUpdate(divsList[j], div_sizes[j], "blue");
            divUpdate(divsList[j + 1], div_sizes[j + 1], "green");

            //console.log(div_sizes);
        }

    }
    divUpdate(divsList[0], div_sizes[0], "green");
})

// btnSelection.addEventListener("click", () => {
//     for (let i = 0; i < div_sizes.length; i++) {
//         for (let j = 0; j < div_sizes.length - i - 1; j++) {
//             divUpdate(divsList[j], div_sizes[j], "yellow");

//             if (div_sizes[j] > div_sizes[j + 1]) {

//                 divUpdate(divsList[j], div_sizes[j], "red");
//                 divUpdate(divsList[j+1], div_sizes[j+1], "red");
//                 // swap(j, j + 1);
//                 var temp = div_sizes[j];
//                 div_sizes[j] = div_sizes[j+1];
//                 div_sizes[j+1] = temp;

//                 divUpdate(divsList[j], div_sizes[j], "red");
//                 divUpdate(divsList[j+1], div_sizes[j+1], "red");

//             }
//             divUpdate(divsList[j], div_sizes[j], "blue");
//             divUpdate(divsList[j+1], div_sizes[j+1], "green");


//         }

//     }
//     divUpdate(divsList[0], div_sizes[0], "green");
// })

btnSelection.addEventListener("click", () => {
    // divUpdate(divsList[0],div_sizes[0],"yellow");
    for (let i = 0; i < input_size - 1; i++) {

        divUpdate(divsList[i], div_sizes[i], "yellow");
        var minIndex = i;
        for (let j = i + 1; j < input_size; j++) {
            divUpdate(divsList[minIndex], div_sizes[minIndex], "yellow");
            
            if (div_sizes[minIndex] > div_sizes[j]) {
          
                divUpdate(divsList[minIndex], div_sizes[minIndex], "blue");
                minIndex = j;

            }




        }
        //console.log("Before"+div_sizes[i]+ " " + div_sizes[minIndex]+" "+minIndex);
        var temp = div_sizes[i];
        div_sizes[i] = div_sizes[minIndex];
        div_sizes[minIndex] = temp;
        //console.log("After"+div_sizes[i]+ " " + div_sizes[minIndex]+" "+minIndex);
        divUpdate(divsList[i], div_sizes[i], "red");
        divUpdate(divsList[minIndex], div_sizes[minIndex], "red");

        divUpdate(divsList[i], div_sizes[i], "green");
    }
})