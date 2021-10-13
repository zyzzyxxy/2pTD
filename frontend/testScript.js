let testCanvas22 = document.getElementById('testCanvas2').getContext('2d');

let mImg = new Image();
mImg.onload = function(){
    testCanvas22.drawImage(mImg,100*Math.random(),100*Math.random(),20,20);
}
mImg.src = "../resources/tower_round.png";


