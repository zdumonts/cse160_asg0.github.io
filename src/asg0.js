// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);        
    
  handleDrawEvent();
}

function handleDrawEvent() {
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);        
  const v1 = new Vector3([0, 0, 0]);
  const v2 = new Vector3([0, 0, 0]);
  v1.elements[0] = document.getElementById("x1").value;
  v1.elements[1] = document.getElementById("y1").value;
  v2.elements[0] = document.getElementById("x2").value;
  v2.elements[1] = document.getElementById("y2").value;

  drawVector(v1, "red");
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);        
  const v1 = new Vector3([0, 0, 0]);
  const v2 = new Vector3([0, 0, 0]);
  v1.elements[0] = document.getElementById("x1").value;
  v1.elements[1] = document.getElementById("y1").value;
  v2.elements[0] = document.getElementById("x2").value;
  v2.elements[1] = document.getElementById("y2").value;

  drawVector(v1, "red");
  drawVector(v2, "blue");

  // Do operation
  const op = document.getElementById("pet-select").value;
  const scalar = document.getElementById("scalar").value;
  const v3 = new Vector3([0,0,0]);
  const v4 = new Vector3([0,0,0]);

  if (op == "add") {
    v3.set(v1.add(v2));
    drawVector(v3, "green");
  } else if (op == "sub") {
    v3.set(v1.sub(v2));
    drawVector(v3, "green");
  } else if (op == "mul") {
    v3.set(v1.mul(scalar));
    v4.set(v2.mul(scalar));
    drawVector(v3, "green");
    drawVector(v4, "green");
  } else if (op == "div") {
    v3.set(v1.div(scalar));
    v4.set(v2.div(scalar));
    drawVector(v3, "green");
    drawVector(v4, "green");
  } else if (op == "mag") {
    let m = v1.magnitude();
    let m2 = v2.magnitude();
    console.log("Magnitude v1: ", m);
    console.log("Magnitude v2: ", m2);
  } else if (op == "norm") {
    v3.set(v1.normalize());
    v4.set(v2.normalize());
    drawVector(v3, "green");
    drawVector(v4, "green");
  } else if (op == "angle") {
    let angle = angleBetween(v1, v2);
    console.log("Angle: ", angle);
  } else if (op == "area") {
    let area = areaTriangle(v1, v2);
    console.log("Area of the triangle: ", area);
  }
}

function drawVector(v, color) {
    let cx = canvas.width/2;
    let cy = canvas.height/2;
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 20 * v.elements[0], 
      cy - 20 * v.elements[1]);
    ctx.stroke();
  }

function angleBetween(v1, v2) {
  let d = Vector3.dot(v1, v2);
  let f = d / v1.magnitude();
  f /= v2.magnitude();
  
  return Math.acos(f) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
  let c = Vector3.cross(v1, v2);
  let area = c.magnitude() / 2;
  return area;
}
