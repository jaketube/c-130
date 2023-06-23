song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song1 = loadSound("song3.mp3");
    song2 = loadSound("song2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#040e40");
    stroke("#040e40");

    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();

    if(scoreRightWrist > 0.2) 
    { circle(rightWristX,rightWristY,20);
         song2.stop();
          if(song1Status == false)
           { song1.play(); document.getElementById("song").innerHTML = "song1 song" }
         } if(scoreLeftWrist > 0.2) {
             circle(leftWristX,leftWristY,20); song1.stop();
             if(song2Status == false) { song2.play(); document.getElementById("song").innerHTML = "song2" }
    }
}

function modelLoaded()
{
    console.log("posenet appears! :O");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist: " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreRightWrist: " + scoreRightWrist);

        //scoreLeftWrist = scoreLeftWrist * 10;

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftWristX + "+201x3^4 " + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightwristx = " + rightWristX + "+201x3^4 " + "rightWristY = " + rightWristY);
    }
}