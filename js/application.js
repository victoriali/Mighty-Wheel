$(document).ready(function(){


  $(".addProbability").css(
    "width","100px"
  );

  $(".newItem-name").css(
    "width","80px"
  );

  $('.cancelButton').click(function(i) {
    i = $('.cancelButton').index(this);
    $($('.cancelButton').parent().parent()[i]).fadeOut("slow", function(){
        $($('.cancelButton').parent().parent()[i]).remove();
    });
  }); 

  var resultInput;

  $(document).on("click",".starRating",function(){
      resultInput = $(this).attr("value");
  });

  $('.createButton').click(function() {

    if($('.newItem-name').val() === ""){
        window.alert("Item name cannot be empty");
    }

    else{ 
        $('<div class="row"><div class="itemName col-xs-3 col-xs-offset-2">'+$('.newItem-name').val()+'</div><div class="itemInput col-xs-4">'+resultInput+'</div><div class="cancelInput col-xs-3"><button class="button newCancelButton">x</button></div></div>').prependTo($('#realList')).slideDown("slow");
        $('.newItem-name').val('');
        $('.addProbability').val('');
        $('.newCancelButton').click(function(i) {
            i = $('.newCancelButton').index(this);
            $($('.newCancelButton').parent().parent()[i]).fadeOut("slow", function(){
            $($('.newCancelButton').parent().parent()[i]).remove();
            });
        });
    }
  });

  $('.second').hide();
  $('.zeroWarning').hide();
  $(document).on("click","#readytoSpin",function(){
    draw();

    if($('.itemName').length < 3){
      $('.zeroWarning').show("slow");
    }

    else{
      $('.first').hide();
      $('.zeroWarning').hide();
      $('.second').show("slow");
    }
  });

  var startAngle = 0;
  var spinTimeout = null;
  
  // var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;
  
  var ctx;
  var spinAngleStart;

  var outsideRadius = 200;
  
  function draw() {
    drawRouletteWheel();
  }
  
  function drawRouletteWheel() {

    var colors = ["#CC0071", "#F80120","#F35B20", "#FB9A00", 
                  "#FFCC00", "#FEF200","#B8D430", "#3AB745", 
                  "#029990", "#3501CB","#2E2C75", "#673A7E"];

    var multColor = [];
      for (var i = 0; i <= (colors.length); i++){
        for (var j = 1; j <= (parseInt($($('.itemInput')[i]).text())); j++){
           var currentColor = colors[i];
           multColor.push(currentColor);
        }
      }

    var restaraunts = [];
      for (var i = 1; i < ($('.itemName').length); i++){
        for (var j = 1; j <= (parseInt($($('.itemInput')[i]).text())); j++){
           var currentElement = $($('.itemName')[i]).text();
           restaraunts.push(currentElement);
        }
      }

    var numberofItems = (restaraunts.length);

    // var numberofItems = ($('.itemInput').length) - 1;//!!!!!!!!!!!!!!!!!
    var arc = Math.PI / (numberofItems/2);//!!!!!!!!!!!!!!!!!!!!**************

    var canvas = document.getElementById("wheelcanvas");
      if (canvas.getContext) {
        // var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 80;
        var circleBorder = 208;
        
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);
        
        ctx.arc(220, 250, circleBorder, 0 , 2 * Math.PI, false);//outer grey circle i inserted
        ctx.fillStyle = "white";
        ctx.fill();
        
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 0;
        
        ctx.font = '15px Georgia';
        

        for(var i = 0; i < (numberofItems); i++) {//!!!!!!!!!!!!!!!!!!!!
          var angle = startAngle + i * arc ;
          ctx.fillStyle = multColor[i];
          
          ctx.beginPath();
          ctx.arc(220, 250, outsideRadius, angle, angle + arc, false);
          ctx.arc(220, 250, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();
          
          ctx.save();
          ctx.shadowOffsetX = 0; // shadow of character
          ctx.shadowOffsetY = 0; // shadow of character
          ctx.shadowBlur    = 0; // glow around the character
          ctx.shadowColor   = "rgb(220,220,220)";
          ctx.fillStyle = "black"; // font color
          ctx.translate(220 + Math.cos(angle + arc/ 2) * textRadius, 250 + Math.sin(angle + arc/ 2) * textRadius); //the word on the wheel
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          var text = restaraunts[i];
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();
        } 
      } 
      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(220 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(220 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(220 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(220 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(220 + 0, 250 - (outsideRadius - 20));
      ctx.lineTo(220 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(220 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(220 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
  }

  
  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 8 * 1000;
    rotateWheel();
  }
  
  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
  }
  

  function stopRotateWheel() {

     var restaraunts = [];
      for (var i = 1; i < ($('.itemName').length); i++){
        for (var j = 1; j <= (parseInt($($('.itemInput')[i]).text())); j++){
           var currentElement = $($('.itemName')[i]).text();
           restaraunts.push(currentElement);
        }
      }

    var numberofItems = (restaraunts.length);


    var arc = Math.PI / (numberofItems/2);//!!!!!!!!!!!!!!!!!!!!
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = '30px Georgia';
    var text = restaraunts[index];//this shows what the result is after rotation
    ctx.fillText(text, 220 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
  }
  
  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
  
  draw();
  
  $(document).on("click","#spinNow",function(){
      spin();
  });

  $(document).on("click","#returnFirst",function(){
      $('.second').hide();
      $('.first').show("slow");
  });

});
