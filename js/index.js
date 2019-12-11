(function() {
  window.onload = function() {
    var powerBtn = selectId('power');
    var display = selectId('main');
    var opDisplay = selectId('operator');
    var btns = selectClass('btn');
    var ready,
      numStr,
      operator,
      opCount,
      value1,
      value2,
      result,
      except1,
      except2;


    /*** power ***/

    // power - text
    powerBtn.addEventListener('mouseover', function() {
      if (hasClass('span', 'off'))
        this.innerText = 'off';
      else
        this.innerText = 'on';
    }, false); // end mouseover

    powerBtn.addEventListener('mouseout', function() {
      this.innerText = '';
    }, false); // end mouseout

    // power - on/off
    powerBtn.addEventListener('click', function() {
      if (this.innerText === 'off') {
        this.removeAttribute('title');
        powerSetting('#power', 'on');
        displaySetting(display, 'wellcome', '#e8e8e0');
        setTimeout(function() {
          displaySetting(display, '0', '#a5a6ac');
        }, 300);
        selectELement('#button-area').classList.remove('tooltip');
        ready = true;
        numStr = '';
        operator = '';
        opCount = '';
        value1 = null;
        value2 = null;
        result = null;
        except1 = false;
        except2 = false;
      } else {
        this.setAttribute('title', 'power button');
        opDisplaySetting(opDisplay, 'none');
        powerSetting('#power', 'off');
        displaySetting(display, 'bye', '#e8e8e0');
        setTimeout(function() {
          displaySetting(display, '', '');
        }, 300);
        selectELement('#button-area').classList.add('tooltip');
        ready = false;
      } // end if-else
    }, false); // end click
    /*** end power ***/


    /*** main ***/
    /*
     * - limitation
     * - digit
     * - clear
     * - operation
     * - values
     * - result
     *
     * */
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {

        /*** limitation - power on ***/
        if (ready) {

          /*** digit ***/
          numStr += this.innerText;
          display.innerText = numStr;

          // digit - maxiam
          if (numStr.length > 9) {
            opDisplaySetting(opDisplay, 'none');
            displaySetting(display, 'error', '#e8e8e0');
            setTimeout(function() {
              displaySetting(display, '0', '#a5a6ac');
            }, 300);
            numStr = '';
          } // end if

          // digit - limitation
          if (Boolean(numStr.match(/^0[1-9]+/))) {
            displaySetting(display, numStr.slice(1), '#a5a6ac');
            numStr = numStr.slice(1);
          } else if (Boolean(numStr.match(/^0{1,}/))) {
            displaySetting(display, '0', '#e8e8e0');
            setTimeout(function() {
              displaySetting(display, '0', '#a5a6ac');
            }, 100);
          } // end if-else-if
          /*** end digit ***/


          /*** clear ***/
          if (numStr.endsWith('C')) {
            opDisplaySetting(opDisplay, 'none');
            displaySetting(display, 'clear', '#e8e8e0');
            setTimeout(function() {
              displaySetting(display, '0', '#a5a6ac');
            }, 100);
            numStr = '';
            operator = '';
            opCount = '';
            value1 = null;
            value2 = null;
            result = null;
            except1 = false;
            except2 = false;
          } // end if
          /*** end clear ***/


          /*** operation ***/
          operator = numStr.match(/[\+\-\*\/\=]/);

          if (operator) {
            opDisplaySetting(opDisplay, 'block', operator, '#e8e8e0');
            displaySetting(display, numStr.slice(0, -1), '#e8e8e0');
            setTimeout(function() {
              displaySetting(display, '0', '#a5a6ac');
            }, 100);
          } // end if
          /*** end operation ***/


          /*** values ***/
          if (Boolean(numStr.match(/[\+\-\*\/]/))) {
            value1 = getValue(operator, numStr);
            if (value1 === 0)
              except1 = true;
            if (result) {
              value1 = result;
              value2 = null;
              result = null;
            } // end if
            opCount = operator;
            numStr = '';
          } // end if

          if (Boolean(numStr.match(/\=/))) {
            if (result === null)
              value2 = getValue(operator, numStr);
            if (value2 === 0)
              except2 = true;
            numStr = '';
          } // end if
          /*** end values ***/


          // /*** result ***/
          if (opCount) {

            // result - operation
            if (operator && value1 && value2 || operator && except1 && value2 || operator && value1 && except2) {
              result = operation(opCount, value1, value2);
              displaySetting(display, displayResult(result), '#e8e8e0');
              setTimeout(function() {
                displaySetting(display, displayResult(result), '#a5a6ac');
              }, 100);
            } // end if

            // result - exception1
            if (operator && except1 && except2) {
              result = operation(opCount, value1, value2);
              displaySetting(display, '0', '#e8e8e0');
              setTimeout(function() {
                displaySetting(display, '0', '#a5a6ac');
              }, 100);
              value1 = null;
              value2 = null;
              result = null;
              except1 = false;
              except2 = false;
            } // end if

            // result - exception2
            if (result) {
              if (!operator) {
                opDisplaySetting(opDisplay, 'none');
                operator = '';
                opCount = '';
                value1 = null;
                value2 = null;
                result = null;
                except1 = false;
                except2 = false;
              } // end if
            }

          } else {

            // result - exception3
            if (!operator) {
              opDisplaySetting(opDisplay, 'none');
              operator = '';
              opCount = '';
              value1 = null;
              value2 = null;
              result = null;
              except1 = false;
              except2 = false;
            } // end if

            // result - exception4
            if (value1 === null && result === null && value2) {
              displaySetting(display, value2, '#e8e8e0');
              setTimeout(function() {
                displaySetting(display, value2, '#a5a6ac');
              }, 100);
              operator = '';
              opCount = '';
              except1 = false;
              except2 = false;
            } else {
              opDisplaySetting(opDisplay, 'none');
              operator = '';
              opCount = '';
              except1 = false;
              except2 = false;
            } // end if-else
          } // end if-else - result
          // /*** end result ***/

        } // end if - power on
        /*** end limitation ***/

      }, false); // end click - main
    } // end for - main
    /*** end main ***/


    // testing
    // function testing() {
    //   if (ready)
    //     console.log('power on already');
    //   else
    //     console.log('turn it on');
    //   if (numStr === '')
    //     console.log('numStr is empty');
    //   else
    //     console.log('numStr is ' + numStr);
    //   if (operator === '')
    //     console.log('operator is empty');
    //   else
    //     console.log('operator is ' + operator);
    //   if (opCount === '')
    //     console.log('opCount is empty');
    //   else
    //     console.log('opCount is ' + opCount);
    //   if (value1 === null)
    //     console.log('value1 is null');
    //   else
    //     console.log('value1 is ' + value1);
    //   if (value2 === null)
    //     console.log('value2 is null');
    //   else
    //     console.log('value2 is ' + value2);
    //   if (result === null)
    //     console.log('result is null');
    //   else
    //     console.log('result is ' + result);
    //   if (except1)
    //     console.log('except1 exist');
    //   if (except2)
    //     console.log('except2 exist');
    // } // end testing

  }; //end onload
}()); // end IIFE
