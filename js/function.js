/*** functions used for simple caculator ***/

/**
 * selectId - acquire id
 *
 * @param  {string} ele   name of id
 * @returns {HTMLElement} the acquired id
 */
function selectId(ele) {
  return document.getElementById(ele);
}

/**
 * selectClass - acquire class
 *
 * @param  {string} ele   name of class
 * @returns {HTMLElement} the acquired classes
 */
function selectClass(ele) {
  return document.getElementsByClassName(ele);
}

/**
 * selectELement - acquire element
 *
 * @param  {HTMLElement} ele input the tag, id or class
 * @returns {HTMLElement}    the acquired element
 */
function selectELement(ele) {
  return document.querySelector(ele);
}

/**
 * hasClass - check the class existed or not
 *
 * @param  {HTMLElement} ele1 input an css tag, id or class
 * @param  {HTMLElement} ele2 input an css tag, id or class
 * @returns {boolean}         finding result as bool value
 */
function hasClass(ele1, ele2) {
  return selectELement(ele1).classList.contains(ele2);
}

/**
 * displaySetting - main display setting
 *
 * @param  {object} ele   input the variable name of main display
 * @param  {string} str   input any string
 * @param  {string} color input a picked color
 * @returns {undefined}   undefined
 */
function displaySetting(ele, str, color) {
  ele.innerText = str;
  ele.style.color = color;
}

/**
 * opDisplaySetting - operator display setting
 *
 * @param  {object} ele   input the variable name of operator display
 * @param  {string} state input the state of none/ block
 * @param  {string} str   input any string
 * @param  {string} color input a picked color
 * @returns {undefined}   undefined
 */
function opDisplaySetting(ele, state, str, color) {
  ele.style.display = state;
  ele.innerText = str;
  ele.style.color = color;
}

/**
 * powerSetting - power button setting
 *
 * @param  {HTMLElement} ele input the tag, id or class
 * @param  {string} str      input an on/ off string
 * @returns {undefined}      undefined
 */
function powerSetting(ele, str) {
  selectELement(ele).className = str;
  selectELement(ele).innerText = str;
}

/**
 * getValue - return values for operation used
 *
 * @param  {string} op  selected from '+' '-' '*' '/'
 * @param  {string} str input a string contains digits
 * @returns {number}    values converted form string
 */
function getValue(op, str) {
  var val;
  var results = {
    '+': val = Number(str.slice(0, -1)),
    '-': val = Number(str.slice(0, -1)),
    '*': val = Number(str.slice(0, -1)),
    '/': val = Number(str.slice(0, -1)),
    '=': val = Number(str.slice(0, -1))
  };
  return results[op];
}

/**
 * operation - caculation
 *
 * @param  {string} op   selected from '+' '-' '*' '/'
 * @param  {number} val1 first input number
 * @param  {number} val2 second input number
 * @returns {number}     final result after caculated
 */
function operation(op, val1, val2) {
  var operations = {
    '+': val1 + val2,
    '-': val1 - val2,
    '*': val1 * val2,
    '/': val1 / val2
  };
  return operations[op];
}

/**
 * displayResult - limit the length of result
 *
 * @param  {number} num the value of number after caculated
 * @returns {string}    the value of string for display used
 */
function displayResult(num) {
  var finalResult = num.toString();
  if (finalResult.length > 9)
    return finalResult.substring(0, 9);
  else
    return finalResult;
}

// testing
function testing() {
  if (ready)
    console.log('power on already');
  else
    console.log('turn it on');
  if (numStr === '')
    console.log('numStr is empty');
  else
    console.log('numStr is ' + numStr);
  if (operator === '')
    console.log('operator is empty');
  else
    console.log('operator is ' + operator);
  if (opCount === '')
    console.log('opCount is empty');
  else
    console.log('opCount is ' + opCount);
  if (value1 === null)
    console.log('value1 is null');
  else
    console.log('value1 is ' + value1);
  if (value2 === null)
    console.log('value2 is null');
  else
    console.log('value2 is ' + value2);
  if (result === null)
    console.log('result is null');
  else
    console.log('result is ' + result);
  if (except1)
    console.log('except1 exist');
  if (except2)
    console.log('except2 exist');
}
