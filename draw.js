// import Chart from 'chart.js/auto';

const expected = document.querySelector("#expected")
const computed = document.querySelector("#computed")
const error = document.querySelector("#error")

// let data = null


var squareArea = canvas.width * canvas.height;
var circleRadius = 250;

var squarePointsCount = 0;
var circlePointsCount = 0;

clearCanvas();
drawCircle(0, 0, circleRadius);
    
function makeIteration() {

    for(var i = 0; i < 100; ++i) {
      
         // random coordinates from range -150 to +150
      let pointX = randomPoint(canvas.width);
      let pointY = randomPoint(canvas.height);
      
        if (checkBoundaries(circleRadius, pointX, pointY)) {
            drawPoint(pointX, pointY, 'red');

            circlePointsCount += 1;
        } else {
            drawPoint(pointX, pointY, 'silver');
        }

        squarePointsCount += 1;

    }

    let randomPointsProportion = circlePointsCount / squarePointsCount;
    
    let computatedCircleArea = randomPointsProportion * squareArea;
    let computatedPI = computatedCircleArea / (circleRadius * circleRadius);

    let computationError = Math.abs(Math.PI - computatedPI);	

    expected.textContent = Math.PI
    computed.textContent = computatedPI
    error.textContent = computationError

    //update chart data
    addData(chartObject,'',computatedPI)

}

const init = (iterations) => {

  if(iterations<=0){
    alert('Enter iteration count more than 0')
    return
  }
  
  for(i=0 ; i < (iterations/100) ;i++){
    setTimeout(makeIteration, 200);
  }
}

initBtn.addEventListener('click',()=>{
  clearCanvas()
  drawCircle(0, 0, circleRadius);
  removeData(chartObject)
  init(document.querySelector('#iteration-count').value)

})

resetBtn.addEventListener('click',()=>{
  location.reload()
})

