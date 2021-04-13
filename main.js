"use strict";
var btn_generate = document.getElementById("btn_generate");
var inputSize = document.getElementById("input_size");
var margin_size;
var btnBubble = document.getElementById("btnBubble");
var btnSelection = document.getElementById("btnSelection");
var btnInsertion = document.getElementById("btnInsertion");
var btnMerge = document.getElementById("btnMerge");
var btnQuick = document.getElementById("btnQuick");
var btnHeap = document.getElementById("btnHeap");

var inputSpeed = document.getElementById("speed");
var speed = 500 / inputSpeed.value;
var input_size = inputSize.value;
inputSpeed.addEventListener("change", () => {
    speed = 500 / inputSpeed.value;
})
console.log(speed);
inputSize.addEventListener("change", () => {
    input_size = inputSize.value;
    generateArray();
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
        divsList[i].style = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / input_size - 2 * margin_size) + "%; height:" + (div_sizes[i]) + "%;";
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
            element.style = " margin:0% " + margin_size + "%; width:" + (100 / input_size - 2 * margin_size) + "%; height:" + height + "%; background-color:" + color + ";";
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

        var temp = div_sizes[i];
        div_sizes[i] = div_sizes[minIndex];
        div_sizes[minIndex] = temp;

        divUpdate(divsList[i], div_sizes[i], "red");
        divUpdate(divsList[minIndex], div_sizes[minIndex], "red");

        divUpdate(divsList[i], div_sizes[i], "green");
    }
    divUpdate(divsList[input_size - 1], div_sizes[input_size - 1], "green");
})

btnInsertion.addEventListener("click", () => {

    var i, j, key;
    for (let i = 0; i < input_size; i++) {
        key = div_sizes[i];
        divUpdate(divsList[i], div_sizes[i], "yellow");
        j = i - 1;
        while (j >= 0 && div_sizes[j] > key) {
            divUpdate(divsList[j], div_sizes[j], "red");
            divUpdate(divsList[j + 1], div_sizes[j + 1], "red");
            div_sizes[j + 1] = div_sizes[j];
            divUpdate(divsList[j], div_sizes[j], "red");
            divUpdate(divsList[j + 1], div_sizes[j + 1], "red");
            divUpdate(divsList[j], div_sizes[j], "blue");
            if (j == (i - 1)) {
                divUpdate(divsList[j + 1], div_sizes[j + 1], "yellow");
            }
            else {
                divUpdate(divsList[j + 1], div_sizes[j + 1], "blue");
            }
            j = j - 1;
        }
        div_sizes[j + 1] = key;
        for (let index = 0; index < i; index++) {
            divUpdate(divsList[index], div_sizes[index], "green");

        }

    }
})

btnMerge.addEventListener("click", () => {
    mergeSort(0, input_size - 1);
});

function merge(l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;


    var L = [];
    var R = [];
    for (let i = 0; i < n1; i++) {
        L[i] = div_sizes[l + i];
    }

    for (let j = 0; j < n2; j++) {
        R[j] = div_sizes[m + 1 + j];
    }

    console.log(L);
    console.log(R);
    var i = 0;
    var j = 0;
    var k = l;


    while (i < n1 && j < n2) {
        //console.log("k:"+k+"i:"+i+"j:"+j);
        if (L[i] <= R[j]) {
            div_sizes[k] = L[i];
            divUpdate(divsList[k], div_sizes[k], "green");

            i++;
        }
        else {
            div_sizes[k] = R[j];
            divUpdate(divsList[k], div_sizes[k], "green");
            j++;
        }
        k++;
    }

    while (i < n1) {
        div_sizes[k] = L[i];
        divUpdate(divsList[k], div_sizes[k], "green");
        i++;
        k++;
    }
    while (j < n2) {
        div_sizes[k] = R[j];
        divUpdate(divsList[k], div_sizes[k], "green");
        j++;
        k++;
    }
}

function mergeSort(l, r) {
    if (l >= r) {
        return;
        console.log(div_sizes);
    }
    var m = Math.floor(l + (r - l) / 2);
    divUpdate(divsList[l], div_sizes[l], "yellow");
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
}


btnQuick.addEventListener("click", () => {
    
    quickSort(0, input_size-1);
    
})

function quickSort(low, high) {
    if (low < high) {
        var pi = partition(low, high);
        quickSort(low, pi - 1);
        quickSort(pi + 1, high);
    }
}

function partition(low, high) {
    var pivot = div_sizes[low];
    divUpdate(divsList[low], div_sizes[low], "yellow");
    var i = low + 1;
    for (let j = low+1; j <= high; j++) {
        if (div_sizes[j] < pivot) {
            divUpdate(divsList[j], div_sizes[j], "yellow");
            divUpdate(divsList[i], div_sizes[i], "red");
            divUpdate(divsList[j], div_sizes[j], "red");

            
            var temp = div_sizes[i];
            div_sizes[i] = div_sizes[j];
            div_sizes[j] = temp;

            divUpdate(divsList[i], div_sizes[i], "red");
            divUpdate(divsList[j], div_sizes[j], "red");
            divUpdate(divsList[i], div_sizes[i], "blue");
            divUpdate(divsList[j], div_sizes[j], "blue");
            i++;
        }
        
    }
    divUpdate(divsList[low], div_sizes[low], "red");
    divUpdate(divsList[i-1], div_sizes[i-1], "red");

    var temp = div_sizes[i-1];
    div_sizes[i-1] = div_sizes[low];
    div_sizes[low] = temp;

    divUpdate(divsList[low], div_sizes[low], "red");
    divUpdate(divsList[i-1], div_sizes[i-1], "red");

    for(let t = low; t<=i;t++){
        divUpdate(divsList[t], div_sizes[t], "green");
    
    }
    return i-1;
}

btnHeap.addEventListener("click", () => {
    heap_sort();
})

function swap(i,j)
{
    divUpdate(divsList[i],div_sizes[i],"red");//Color update
    divUpdate(divsList[j],div_sizes[j],"red");//Color update

    var temp=div_sizes[i];
    div_sizes[i]=div_sizes[j];
    div_sizes[j]=temp;

    divUpdate(divsList[i],div_sizes[i],"red");//Height update
    divUpdate(divsList[j],div_sizes[j],"red");//Height update

    divUpdate(divsList[i],div_sizes[i],"blue");//Color update
    divUpdate(divsList[j],div_sizes[j],"blue");//Color update
}

function max_heapify(n,i)
{
    var largest=i;
    var l=2*i+1;
    var r=2*i+2;

    if(l<n && div_sizes[l]>div_sizes[largest])
    {
        if(largest!=i)
        {
            divUpdate(divsList[largest],div_sizes[largest],"blue");//Color update
        }

        largest=l;

        divUpdate(divsList[largest],div_sizes[largest],"red");//Color update
    }

    if(r<n && div_sizes[r]>div_sizes[largest])
    {
        if(largest!=i)
        {
            divUpdate(divsList[largest],div_sizes[largest],"blue");//Color update
        }

        largest=r;

        divUpdate(divsList[largest],div_sizes[largest],"red");//Color update
    }

    if(largest!=i)
    {
        swap(i,largest);

        max_heapify(n,largest);
    }
}

function heap_sort()
{
    for(var i=Math.floor(input_size/2)-1;i>=0;i--)
    {
        max_heapify(input_size,i);
    }

    for(var i=input_size-1;i>0;i--)
    {
        swap(0,i);
        divUpdate(divsList[i],div_sizes[i],"green");//Color update
        divUpdate(divsList[i],div_sizes[i],"yellow");//Color update

        max_heapify(i,0);

        divUpdate(divsList[i],div_sizes[i],"blue");//Color update
        divUpdate(divsList[i],div_sizes[i],"green");//Color update
    }
    divUpdate(divsList[i],div_sizes[i],"green");//Color update
}