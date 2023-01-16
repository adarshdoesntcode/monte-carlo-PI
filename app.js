const canvas = document.querySelector("#hits-canvas")
const chart = document.querySelector('#chart-canvas');
const initBtn = document.querySelector('#init-btn');
const resetBtn = document.querySelector('#reset-btn');


let context = canvas.getContext('2d')

let xCenter = canvas.width / 2;
let yCenter = canvas.height / 2;

//Generate random point
const randomPoint = (range) =>{
  return range * (Math.random() - 0.5);
}

const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const checkBoundaries = (circleRadius, pointX, pointY) => {
  var pointRadius = Math.sqrt(pointX * pointX + pointY * pointY);
    if (pointRadius <= circleRadius) {
      return true;
    }
    return false;
}

const drawPoint = (x, y, color) => {

  var tmpX = Math.round(xCenter + x - 1);
  var tmpY = Math.round(yCenter + y - 1);

  context.strokeStyle = '#fff';
  context.fillStyle = color || '#000';

  context.fillRect(tmpX, tmpY, 2, 2);
};


const drawCircle = (x, y, radius) => {

  var tmpX = Math.round(xCenter + x);
  var tmpY = Math.round(yCenter + y);

  context.lineWidth = 1.4;
  context.strokeStyle = '#ff0000';
  context.fillStyle = '#fff';
  
  context.beginPath();
  context.arc(tmpX, tmpY, radius, 0, 2 * Math.PI);
  context.stroke();
};

let chartObject = new Chart(chart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'computed value of PI',
      data: [],
      borderWidth: 2
    },{
      label: 'expected value of PI',
      data: [Math.PI],
      borderWidth: 2
    }]
  },

  options: {
    pointStyle:false,
    animation : false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display:false
      }
      },
      x: {
        beginAtZero: true,
        grid: {
          display:false
      }
      }
    }
  }
});

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  chart.data.datasets[1].data.push(Math.PI);


  // chart.data.datasets.data.push(label);

  chart.update();
}

function removeData(chart) {
  chart.data.labels.length = 0;
  chart.data.datasets.forEach((dataset) => {
      dataset.data.length = 0 ;
  });
  chart.update();
}