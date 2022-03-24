let p5lm;
let video;
let myFace = [];
let partnerFace=[];
let words=["cat","smile","car","bird","heart","sun","star"]
let word;

function setup() {
  let repos = createCanvas(640, 480);
  repos.parent('sketch-holder');
    const video = createCapture(VIDEO);
    video.size(640, 480);

    const button = document.getElementById('submit');
    button.addEventListener('click',async event =>{
    repos.loadPixels();
    video.loadPixels();
    const image64 = repos.canvas.toDataURL();
    const image128 = video.canvas.toDataURL();
    const data = {image64,image128};
    const options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:JSON.stringify(data)
    }
    fetch('/api',options).then(response =>{
        console.log(response);
    });
  });
  p5lm = new p5LiveMedia(this, "DATA", null, "body-ewah-40");
  p5lm.on('data', gotPartnerFace);
  const facemesh = ml5.facemesh(video, modelLoaded);
  facemesh.on("predict", (results) => gotMyFace(results));
  video.hide();
  }

  function modelLoaded() {
    console.log("loaded");
  }
  
  function gotMyFace(results) {
    if (results.length === 0) return;
    // put the predictions in a global variable
    myFace = results;
    p5lm.send(JSON.stringify(myFace));
  }
  
  function gotPartnerFace(send, id) {
    partnerFace = JSON.parse(send);
  }

  function draw() {
    background(20,180,10,1);
    drawMyFace();
    drawPartnerFace();
    displayText();
  }
  
  function displayText(){
    //create a button
    push();
    fill(150);
    rect(230,30,30,30);
    fill(255);
    rect(30,30,200,30);
    fill(0)
    textSize(20)
    text("Draw a  "+ word,40,50);
    pop();
  }
  
  function mousePressed(){
    if (mouseX>230 && mouseX <260 && mouseY>30 && mouseY<60){
      word=random(words);
      //console.log("click")
      counter = 15;
      submit.style.display = "none";
      return word;
      }
  }
  
  function drawMyFace(){
    push();
    translate(width, 0);
    scale(-1, 1);
  
    // iterate through all the predictions — there will be one per detected face
    for (let i = 0; i < myFace.length; i++) {
      // get keypoints from annotations
   const nosetip = myFace[i].annotations.noseTip;
      // draw the points of the nosetip
      for (let a = 0; a < nosetip.length; a++) {
        const [x, y] = nosetip[a];
        noStroke();
        fill("red");
        ellipse(x,y,10);
      }
    }
    pop();
  }
  
  function drawPartnerFace(){
    push();
    translate(width, 0);
    scale(-1, 1);
  
    // iterate through all the predictions — there will be one per detected face
    for (let i = 0; i < partnerFace.length; i++) {
      // get keypoints from annotations
      const nosetip = partnerFace[i].annotations.noseTip;
  
      // draw the points of the nosetip
      for (let a = 0; a < nosetip.length; a++) {
        const [x, y] = nosetip[a];
        noStroke();
        fill("blue");
        ellipse(x,y,10);
      }
    }
    pop();
  }