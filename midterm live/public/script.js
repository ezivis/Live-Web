window.addEventListener('load', function() {
    // The video element on the page to display the webcam
    let video = document.getElementById('thevideo');

    // Constraints - what do we want?
    let constraints = { audio: false, video: true }

    // Prompt the user for permission, get the stream
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        /* Use the stream */
        
        // Attach to our video object
        video.srcObject = stream;
        
        // Wait for the stream to load enough to play
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) {
        /* Handle the error */
        alert(err);  
    });
});
     

// $("#counter").text(count);
// //update display

// timer = setTimeout(update, 1000);
// //this allows for 'clearTimeout' if needed

// function update()
// {
//     if (count > 0)
//     {
//        $("#counter").text(--count);
//        timer = setTimeout(update, 1000);
//     }
//     else
//     {
//         alert("Done!!!");
//     }
// }
var counter = 15;

setInterval(function (){
    counter = counter -1;

    if(counter >=0){
        id = document.getElementById("count");
        id.innerHTML = counter;
    }

    if(counter == 0){
        id.innerHTML = "Time Out!!";
        submit.style.display = "inline-block";
    }
},1000);
