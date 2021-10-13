export class myEvents{

    handleKeydown(event){

    }
    
    handleMouseEvent(event){
        //alert(event.offsetX + "  "  + event.offsetY);
        if(event.target.nodeName == "CANVAS"){
            var varX = event.offsetX;
            var varY = event.offsetY-20;
            varX = varX-varX%boxSize;
            varY = varY-varY%boxSize;
            //let tempTower = new Tower(varX,varY);
            //towerArray.push(tempTower);
            //ctx.drawImage(towerImg,varX ,varY,40,40);
        }
        // ctx.fillStyle = "#00aaff";
        // ctx.fillRect(event.offsetX,event.offsetY,10,10);
        console.log(event);
    }
}




