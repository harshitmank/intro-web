let photoDiv=document.querySelector('#photo');
let photoUploadInput=document.querySelector("#photo-upload");
let downloadDiv=document.querySelector("#download");


photoDiv.addEventListener('click',function(){
    photoUploadInput.click();
});

photoUploadInput.addEventListener("change",function(e){
    let fileObj=e.target.files[0];
    let filePath=URL.createObjectURL(fileObj);
    let img=document.createElement('img');
    img.setAttribute('src',filePath);
    img.classList.add('sticky-image')
    addSticky(img);
})

// if want background white-->
// downloadDiv.addEventListener('click', function () {
//     // save current state
//     ctx.save();

//     // draw white background
//     ctx.globalCompositeOperation = "destination-over";
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     let imagePath = canvas.toDataURL("image/jpeg");

//     // restore canvas
//     ctx.restore();

//     let aTag = document.createElement('a');
//     aTag.download = 'canvas.jpg';
//     aTag.href = imagePath;
//     aTag.click();
// });

downloadDiv.addEventListener("click" , function(){
    let imagePath = canvas.toDataURL("image/jpg");
    console.log(imagePath);
    // <a href="" download="canvas.jpg"></a> 
    let aTag = document.createElement("a");
    aTag.download = "canvas.jpg";
    aTag.href = imagePath;
    aTag.click();
})