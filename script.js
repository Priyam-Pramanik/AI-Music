left_wrist_score = 0;
right_wrist_score = 0;
song_status = "";
song2_status = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;

function preload(){
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}

function setup(){
    canvas = createCanvas(550,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0 , 550, 500);
    fill('#FF0000');
    stroke('#FF0000');
    song_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if (left_wrist_score > 0.2){
        circle(left_wristX, left_wristY, 20);
        song2.stop();
        
        if (song_status = "False"){
            song1.play();
            document.getElementById("song_name").innerHTML = "Song name - Harry Potter Remix";
        }
    }
    if (right_wrist_score > 0.2){
        circle(right_wristX, right_wristY, 20);
        song1.stop();
        
        if (song2_status = "False"){
            song2.play();
            document.getElementById("song_name").innerHTML = "Song name - Peter Pan";
        }
    }


}
 function modelLoaded(){
    console.log("Model is loaded.");
 }

function gotPoses(results){
    if(results.length > 0){
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + left_wristX + "Left wrist Y = " + left_wristY);
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + right_wristX + "Right wrist Y = " + right_wristY);
        left_wrist_score = results[0].pose.keypoints[9].score;
        console.log("Left wrist score = " + left_wrist_score);
        right_wrist_score = results[0].pose.keypoints[10].score;
        console.log("Right wrist score = " + right_wrist_score);
    }

}
