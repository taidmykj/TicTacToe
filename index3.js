let gameBoard = board([1,2,3,4,5,6,7,8,9]);

function board(n) {
  let pg = [];
  for (let vals of n) {
    let m = vals % 2;
    
    if (m == 0) {
      pg.push(0);
    } else {
      pg.push(1);
    }
  }
  
  return pg;
}

function fillBoard(arrName, end) {
  let arr = (end == 1) ? [1,2,3,4,5,6,7,8,9] : [0,1,2,3,4,5,6,7,8];
  arrName.splice(0, arrName.length);
  
  for (let ints of arr) {
    if ((ints % 2) == 0) {
      arrName.push(0);
    } else {
      arrName.push(1);
    }
  }

  
  return arrName;
}


let playerX_arr = [];
let playerY_arr = [];

let setOne = new Set();
let setTwo = new Set();

//let cond1Set = new Set(); moveToSet(cond1Arr, cond1Set);


function checkBoolean(crtSet, playerArray, bool) {
  let arr = []; let sumOfTrue = 0; let sumOfFalse = 0;
  for (let position of playerArray) {
    
    if ( crtSet.has(position) ) {
      
      arr.push('true');
      
    }
    
    else {
      
      arr.push('false');
      
    }
    
  }
  
  for (let condition of arr) {
    
    if (condition === 'true') {
      
      sumOfTrue++;
      
    }
    
    else {
      
      sumOfFalse++;
      
    }
    
  }
  
  return (bool == true) ? sumOfTrue : sumOfFalse;
}

function bringCondition(pos) {
  
  function moveToSet(arrName, setName) {
    for (let values of arrName) {
      setName.add(values);
    }
    return setName;
  }
  
  let set1, set2, set3, set4, set5, set6, set7, set8;
  let arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8;
  
  set1 = new Set(); arr1 = [0,4,8];
  set2 = new Set(); arr2 = [2,4,6];
  set3 = new Set(); arr3 = [1,4,7];
  set4 = new Set(); arr4 = [3,4,5];
  set5 = new Set(); arr5 = [0,1,2];
  set6 = new Set(); arr6 = [6,7,8];
  set7 = new Set(); arr7 = [0,3,6];
  set8 = new Set(); arr8 = [2,5,8];
 
  switch (pos) {
    case 1: return moveToSet(arr1, set1);
      break;
    case 2: return moveToSet(arr2, set2);
      break;
    case 3: return moveToSet(arr3, set3);
      break;
    case 4: return moveToSet(arr4, set4);
      break;
    case 5: return moveToSet(arr5, set5);
      break;
    case 6: return moveToSet(arr6, set6);
      break;
    case 7: return moveToSet(arr7, set7);
      break;
    case 8: return moveToSet(arr8, set8);
      break;
  }
}

function cleanArr(arrName) {
  arrName.splice(0, arrName.length);
  
  return arrName;
}


function redo() {
  
  function cleanBoard(id) {
    document.getElementById(id).innerHTML = '';
    document.getElementById(id).style.backgroundColor = 'white';
  }
  
  for (let i = 0; i < 9; i++) {
    switch (i) {
      case 0: cleanBoard('zero');
      break;
      case 1: cleanBoard('one');
      break;
      case 2: cleanBoard('two');
      break;
      case 3: cleanBoard('three');
      break;
      case 4: cleanBoard('four');
      break;
      case 5: cleanBoard('five');
      break;
      case 6: cleanBoard('six');
      break;
      case 7: cleanBoard('sev');
      break;
      case 8: cleanBoard('eight');
      break;

    }
  }
  
 /* cleanArr(gameBoard);
  cleanArr(playerX_arr);
  cleanArr(playerY_arr);
  setOne.clear();
  setTwo.clear();*/
}

function doCleaning() {
  cleanArr(gameBoard);
  cleanArr(playerX_arr);
  cleanArr(playerY_arr);
  setOne.clear();
  setTwo.clear();
}

function restartButton() {
  document.getElementById('redo').innerHTML = '<button class="continue" onclick="redo()">Restart &#9851;</button>';
}

function play(position, id) {
  rmv();
    if (gameBoard.pop() == 1) {
                
        if (setTwo.has(parseInt(position)) || setOne.has(parseInt(position))) {
            alert('Board Already Occupied');
            gameBoard.push(1);
        }
        else {
          document.getElementById(id).innerHTML = 'X';
          document.getElementById(id).style.backgroundColor = 'tomato';
          setOne.add(parseInt(position));
          playerX_arr.push(parseInt(position));
          
          for (let i = 1; i < 9; i++) {
            if ( checkBoolean(bringCondition(i), playerX_arr, true) == 3) {
            //alert('Player X Wins');
            doCleaning();
            fillBoard(gameBoard, 0);
            setTimeout(redo, 1000);
              win('X', 'X', 'tomato');
          }
          }
          
        }
    }
    else if (gameBoard.length == 0) {
      doCleaning();
      fillBoard(gameBoard, 0);
      redo();
      //setTimeout(redo, 1000);
      //alert('All Occupied');
    }
    else {
      
        if (setOne.has(parseInt(position)) || setTwo.has(parseInt(position))) {
            alert('Board Already Occupied');
           gameBoard.push(0);
        }
        else {
          document.getElementById(id).innerHTML = 'O';
          document.getElementById(id).style.backgroundColor = 'lime';
          setTwo.add(parseInt(position));
          playerY_arr.push(parseInt(position));
          
          for (let i = 1; i < 9; i++) {
            if ( checkBoolean(bringCondition(i), playerY_arr, true) == 3) {
            //alert('Player O Wins');
            doCleaning();
            fillBoard(gameBoard, 1);
            setTimeout(redo, 1000);
              win('O', '0', 'red');
          }
          }
        }
    }
}

function win(emoji, typ, color) {
  document.getElementById('table').innerHTML = // `<button class="continue">PLAYER ${emoji} WON &#127942;</button>`;
  `<div class="congrats">
      <p class="msg">Congratulations<br>🥳✨✨🥳</p>
      <p class="mesg">Player <span style="color: ${color};" class="name">${typ}</span> won</p>
      <p class = "link"><a href="index.html">Go Home</a> </p>
    </div>`;
}

function rmv() {
  document.getElementById('win').innerHTML = '';
}