const canvas = document.getElementById('pixel_canvas'),
  createButton = document.getElementById('submit'),
  clearButton = document.getElementById('reset'),
  plus = document.getElementsByClassName('plus'),
  minus = document.getElementsByClassName('minus'),
  eraser = document.getElementById('eraser'),
  buttons = document.getElementsByTagName('button');

let eraseMode = false;

// making grid function
makeGrid = () =>{
  let gridWidth = document.getElementById('gridWidth').value,
  gridHeight = document.getElementById('gridHeight').value;
  for (let row = 0; row < gridHeight; row++) {
    const row = document.createElement('tr');
    canvas.appendChild(row)
    for (let col = 0; col < gridWidth; col++) {
      const cell = document.createElement('td')
      row.appendChild(cell);
    }
  }
};

// prevent submitting while clicking on buttons
Array.from(buttons).forEach(button=> {
  button.addEventListener('click', event=>{
    event.preventDefault()
  })
});
function subtract(event, modifier){
  let oldValue = parseInt(event.target.parentNode.querySelector('input[type=number]').value);
  if(oldValue > 0){
    event.target.parentNode.querySelector('input[type=number]').value = oldValue - modifier;
  }
}

function adding(event, modifier){
  let oldValue = parseInt(event.target.parentNode.querySelector('input[type=number]').value);
  if (oldValue < 100){
    event.target.parentNode.querySelector('input[type=number]').value = oldValue + modifier
  }
}

// empty element handler
emptyCanvas = () =>{
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
};

// create grid handler
createButton.addEventListener('click', (event)=>{
  event.preventDefault();
  emptyCanvas();
  makeGrid();
});

clearButton.addEventListener('click',_=>{
  let cells = document.getElementsByTagName('td');
  Array.from(cells).map(cell=> {
    cell.style.backgroundColor = '';
  });
});

// draw "coloring cells"
draw = () =>{
  let down = false;
  canvas.addEventListener('mousedown', function(e) {
    let color = document.getElementById('color').value;
    down = true;
    if(eraseMode === false){
      e.target.style.backgroundColor = color;
    }else{
      e.target.style.backgroundColor = '';
    }
    canvas.addEventListener('mouseup', _=>{
      down = false;
    })
    canvas.addEventListener('mousemove', (e)=>{
      if (down && e.target.tagName === 'TD' && eraseMode === false) {
        e.target.style.backgroundColor = color;
      }
    })
    canvas.addEventListener('mousemove', (e)=>{
      if (down && e.target.tagName === 'TD' && eraseMode === true) {
        e.target.style.backgroundColor = '';
      }
    })
  });
};

eraser.addEventListener('click', _=>{
  eraseMode = !eraseMode;
  if(eraseMode){
    eraser.style.border = '1px solid #ccc'
  }else {
    eraser.style.border = ''
  }
})

makeGrid();
draw();
