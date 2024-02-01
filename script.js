music_1 = "music.mp3";
music_2 = "music2.mp3";

function preload(){
    music_1 = loadSound("music.mp3");
    music_2 = loadSound("music2.mp3");
    left_wristX = 0;
    left_wristY = 0;
    right_wristX = 0;
   right_wristY = 0;

}
function setup(){
    canvas = createCanvas(500,600);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotposes);
}

function draw(){
    image(video, 0, 0 , 500, 600);
}
 function modelLoaded(){
    console.log("Model is loaded.");
 }

function gotposes(results){
    if(results.length > 0){
        left_wristX = results[0].pose.left_wristX.x;
        left_wristY = results[0].pose.left_wristY.y;
        console.log("Left wrist X = " + left_wristX + "Left wrist Y = " + left_wristY);
        right_wristX = results[0].pose.right_wristX.x;
        right_wristY = results[0].pose.right_wristY.y;
        console.log("Right wrist X = " + right_wristX + "Right wrist Y = " + right_wristY);

    }

}
