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
var speed = 0.1 / inputSpeed.value;
var input_size = inputSize.value;

inputSpeed.addEventListener("change", () => {
  speed = 0.1 / inputSpeed.value;
});

inputSize.addEventListener("change", () => {
  input_size = inputSize.value;
  generateArray();
});

var initSpeed = 0;
btn_generate.addEventListener("click", generateArrayAndRefresh);

var cont = document.getElementById("array_container");

var divsList = [];
var div_sizes = [];

generateArray();

function generateArrayAndRefresh() {
  location.reload();
  generateArray();
}

function generateArray() {
  cont.innerHTML = "";
  divsList = [];
  div_sizes = [];

  input_size = inputSize.value;

  for (var i = 0; i < input_size; i++) {
    div_sizes[i] =
      Math.floor(Math.random() * 0.5 * (inputSize.max - inputSize.min)) + 10;
    divsList[i] = document.createElement("div");
    cont.appendChild(divsList[i]);
    margin_size = 0.1;
    divsList[i].style =
      " margin:0% " +
      margin_size +
      "%; background-color:blue; width:" +
      (100 / input_size - 2 * margin_size) +
      "%; height:" +
      div_sizes[i] +
      "%;";
  }
}

function swap(a, b) {
  divUpdate(divsList[a], div_sizes[a], "yellow");
  temp = div_sizes[a];
  div_sizes[a] = div_sizes[b];
  div_sizes[b] = temp;
  divUpdate(divsList[a], div_sizes[a], "red");
  divUpdate(divsList[b], div_sizes[b], "red");
}

function divUpdate(element, height, color) {
  return new Promise((resolve) => {
    setTimeout(() => {
      element.style =
        " margin:0% " +
        margin_size +
        "%; width:" +
        (100 / input_size - 2 * margin_size) +
        "%; height:" +
        height +
        "%; background-color:" +
        color +
        ";";
      resolve();
    }, (initSpeed += speed));
  });
}

async function bubbleSort() {
  for (let i = 0; i < input_size; i++) {
    for (let j = 0; j < input_size - i - 1; j++) {
      await divUpdate(divsList[j], div_sizes[j], "yellow");

      if (div_sizes[j] > div_sizes[j + 1]) {
        await divUpdate(divsList[j], div_sizes[j], "red");
        await divUpdate(divsList[j + 1], div_sizes[j + 1], "red");

        var temp = div_sizes[j];
        div_sizes[j] = div_sizes[j + 1];
        div_sizes[j + 1] = temp;

        await divUpdate(divsList[j], div_sizes[j], "red");
        await divUpdate(divsList[j + 1], div_sizes[j + 1], "red");
      }
      await divUpdate(divsList[j], div_sizes[j], "blue");
      await divUpdate(divsList[j + 1], div_sizes[j + 1], "green");
    }
  }
  await divUpdate(divsList[0], div_sizes[0], "green");
}

btnBubble.addEventListener("click", async () => {
  await bubbleSort();
});

btnSelection.addEventListener("click", async () => {
  for (let i = 0; i < input_size - 1; i++) {
    await divUpdate(divsList[i], div_sizes[i], "yellow");
    var minIndex = i;
    for (let j = i + 1; j < input_size; j++) {
      await divUpdate(divsList[minIndex], div_sizes[minIndex], "yellow");

      if (div_sizes[minIndex] > div_sizes[j]) {
        await divUpdate(divsList[minIndex], div_sizes[minIndex], "blue");
        minIndex = j;
      }
    }

    var temp = div_sizes[i];
    div_sizes[i] = div_sizes[minIndex];
    div_sizes[minIndex] = temp;

    await divUpdate(divsList[i], div_sizes[i], "red");
    await divUpdate(divsList[minIndex], div_sizes[minIndex], "red");

    await divUpdate(divsList[i], div_sizes[i], "green");
  }
  await divUpdate(divsList[input_size - 1], div_sizes[input_size - 1], "green");
});

btnInsertion.addEventListener("click", async () => {
  for (let i = 0; i < input_size; i++) {
    let key = div_sizes[i];
    await divUpdate(divsList[i], div_sizes[i], "yellow");
    let j = i - 1;
    while (j >= 0 && div_sizes[j] > key) {
      await divUpdate(divsList[j], div_sizes[j], "red");
      await divUpdate(divsList[j + 1], div_sizes[j + 1], "red");
      div_sizes[j + 1] = div_sizes[j];
      await divUpdate(divsList[j], div_sizes[j], "red");
      await divUpdate(divsList[j + 1], div_sizes[j + 1], "red");
      await divUpdate(divsList[j], div_sizes[j], "blue");
      if (j == i - 1) {
        await divUpdate(divsList[j + 1], div_sizes[j + 1], "yellow");
      } else {
        await divUpdate(divsList[j + 1], div_sizes[j + 1], "blue");
      }
      j = j - 1;
    }
    div_sizes[j + 1] = key;
    for (let index = 0; index < i; index++) {
      await divUpdate(divsList[index], div_sizes[index], "green");
    }
  }
});

btnMerge.addEventListener("click", () => {
  mergeSort(0, input_size - 1);
});

async function merge(l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;
  let L = [];
  let R = [];

  for (let i = 0; i < n1; i++) {
    L[i] = div_sizes[l + i];
  }

  for (let j = 0; j < n2; j++) {
    R[j] = div_sizes[m + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      div_sizes[k] = L[i];
      await divUpdate(divsList[k], div_sizes[k], "green");
      i++;
    } else {
      div_sizes[k] = R[j];
      await divUpdate(divsList[k], div_sizes[k], "green");
      j++;
    }
    k++;
  }

  while (i < n1) {
    div_sizes[k] = L[i];
    await divUpdate(divsList[k], div_sizes[k], "green");
    i++;
    k++;
  }

  while (j < n2) {
    div_sizes[k] = R[j];
    await divUpdate(divsList[k], div_sizes[k], "green");
    j++;
    k++;
  }
}

async function mergeSort(l, r) {
  if (l >= r) {
    return;
  }
  let m = Math.floor(l + (r - l) / 2);
  await divUpdate(divsList[l], div_sizes[l], "yellow");
  await mergeSort(l, m);
  await mergeSort(m + 1, r);
  await merge(l, m, r);
}

btnQuick.addEventListener("click", () => {
  quickSort(0, input_size - 1);
});

async function quickSort(low, high) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  let pivot = div_sizes[low];
  await divUpdate(divsList[low], div_sizes[low], "yellow");
  let i = low + 1;
  for (let j = low + 1; j <= high; j++) {
    if (div_sizes[j] < pivot) {
      await divUpdate(divsList[j], div_sizes[j], "yellow");
      await divUpdate(divsList[i], div_sizes[i], "red");
      await divUpdate(divsList[j], div_sizes[j], "red");
      let temp = div_sizes[i];
      div_sizes[i] = div_sizes[j];
      div_sizes[j] = temp;
      await divUpdate(divsList[i], div_sizes[i], "red");
      await divUpdate(divsList[j], div_sizes[j], "red");
      await divUpdate(divsList[i], div_sizes[i], "blue");
      await divUpdate(divsList[j], div_sizes[j], "blue");
      i++;
    }
  }
  await divUpdate(divsList[low], div_sizes[low], "red");
  await divUpdate(divsList[i - 1], div_sizes[i - 1], "red");
  let temp = div_sizes[i - 1];
  div_sizes[i - 1] = div_sizes[low];
  div_sizes[low] = temp;
  await divUpdate(divsList[low], div_sizes[low], "red");
  await divUpdate(divsList[i - 1], div_sizes[i - 1], "red");
  for (let t = low; t <= i; t++) {
    await divUpdate(divsList[t], div_sizes[t], "green");
  }
  return i - 1;
}

btnHeap.addEventListener("click", () => {
  heap_sort();
});

function swap(i, j) {
  divUpdate(divsList[i], div_sizes[i], "red");
  divUpdate(divsList[j], div_sizes[j], "red");

  let temp = div_sizes[i];
  div_sizes[i] = div_sizes[j];
  div_sizes[j] = temp;

  divUpdate(divsList[i], div_sizes[i], "red");
  divUpdate(divsList[j], div_sizes[j], "red");

  divUpdate(divsList[i], div_sizes[i], "blue");
  divUpdate(divsList[j], div_sizes[j], "blue");
}

function max_heapify(n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && div_sizes[l] > div_sizes[largest]) {
    if (largest != i) {
      divUpdate(divsList[largest], div_sizes[largest], "blue");
    }

    largest = l;

    divUpdate(divsList[largest], div_sizes[largest], "red");
  }

  if (r < n && div_sizes[r] > div_sizes[largest]) {
    if (largest != i) {
      divUpdate(divsList[largest], div_sizes[largest], "blue");
    }

    largest = r;

    divUpdate(divsList[largest], div_sizes[largest], "red");
  }

  if (largest != i) {
    swap(i, largest);

    max_heapify(n, largest);
  }
}

async function heap_sort() {
  for (let i = Math.floor(input_size / 2) - 1; i >= 0; i--) {
    await max_heapify(input_size, i);
  }

  for (let i = input_size - 1; i > 0; i--) {
    swap(0, i);
    await divUpdate(divsList[i], div_sizes[i], "green");
    await divUpdate(divsList[i], div_sizes[i], "yellow");
    await max_heapify(i, 0);
    await divUpdate(divsList[i], div_sizes[i], "blue");
    await divUpdate(divsList[i], div_sizes[i], "green");
  }
  await divUpdate(divsList[0], div_sizes[0], "green");
}
