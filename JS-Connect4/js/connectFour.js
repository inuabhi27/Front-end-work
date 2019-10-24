var toEndGame = 0;
function players(num, turn, count) 
{
    this.name = askName(num, turn);
    //this.birthday = getBirthday(this.name);
    //for now just keep turn as true to automatically set the first user as first player.
    this.turn = turn;
    this.count = count; 
    this.toEndGame = toEndGame;
    //this.age = getBirthday(player);
} 

function askName(num) 
{
    return name = prompt("Player " + num + " name: ");
}
//Ask USER for their birthday. Not finished.
function getBirthday(player)
{
    var birthday = prompt(player + ", please enter your date of birth: ");
    
   var regex3 =  /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/
   
   var regex = /[A-Z][a-z]{2}[.-]\d{1,2}[,.-]\d{2,4}/g; //for mmm dd yyyy/yy
   var regex1 = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2},\s+\d{2,4}/g;
   var found = birthday.match(regex);
   var str = birthday.match(regex);
   //var f1 = found.split(".");
   //alert(found);
    if(found)
    {
      alert("true");
      var arr = birthday.split(".");
      alert("Month: " + arr[0]);
      var arr2 = arr[1].split(",");
      alert("Day: " + arr2[0]);
      alert("Year: " + arr2[1]);
      var d = new Date(arr2[1],arr[0], arr2[0]); //year, month, date.
      var d1 = Date.parse(d);
      
      //var getAge = Date.now() - d1.getTime();
      var cur = new Date();
      var diff = cur-d1;
      var age = Math.floor(diff/31557600000);
      alert("age: " + age);
     
    }
   

   return 1;

    

}



function makeGrid(p1, p2) //make the actual board.
{
   
    var body = document.getElementsByTagName("body")[0];
    var rows = new Array('0', '1', '2', '3', '4', '5', '6');
    var cols = new Array('', 'A', 'B', 'C', 'D', 'E', 'F', 'G');
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "myTable"); //name of the table. 
    var tblBody = document.createElement("tbody");
   
    
    for(var i =0; i < rows.length; i++)
    {
      // creates a table row
      var row = document.createElement("tr");
      row.setAttribute("id", rows[i]);
      //for (var j = 0; j < 2; j++) 
      for(var j = 0; j < cols.length; j++)
      {
        
        var cell = document.createElement("td");
        cell.setAttribute("id", cols[j]+rows[i]);
        
        if (i == 0 && j == 0) {
            var cellText = document.createTextNode(" ");
        }
        else if (i == 0 && j > 0) 
        {
            var cellText = document.createTextNode(cols[j]);
            cell.className = 'label';  
            cell.addEventListener("click", function() { tableEvents(p1, p2, this.id); });  
        }
        else if (j == 0 && i > 0) 
        {
            var cellText = document.createTextNode(rows[i]);
            cell.className = 'label';
        }
        else
        {
            var img = document.createElement('img');
            img.src = "white-circle.png";
            img.height = 95; //making the image bigger.
            var cellText = img;
            
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblBody.appendChild(row);
      }
    }
   
    
    tbl.appendChild(tblBody);
    
    body.appendChild(tbl);
   
    tbl.setAttribute("border", "2");
    
    displayScore(p1, p2);
    
    
  }

  function getToken(player) //returns the number of tokens left. 
  {
    return player.count;
  }
  function setToken(player, num) //forget for now.
  {
    player.count = num;
  }
  
  function displayScore(p1, p2)
  {
    var p1Statement = p1.name + "'s tokens: ";
    var p2Statement = p2.name + "'s tokens: ";
    var p1Tokens = getToken(p1);
    var p2Tokens = getToken(p2);
    document.write('<p id = "jstext">' + p1Statement + "<br>" + p1Tokens + '</p>'); //player 1
    document.write('<p id = "jstext2">' + p2Statement + "<br>" + p2Tokens + '</p>'); //player 2
  }

  function newScore(p1,p2)
  {
    var p1Statement = p1.name + "'s tokens: ";
    var p2Statement = p2.name + "'s tokens: ";
    var p1Tokens = getToken(p1);
    var p2Tokens = getToken(p2);
    document.getElementById("jstext").innerHTML = p1Statement + "<br>" + p1Tokens;
    document.getElementById("jstext2").innerHTML = p2Statement + "<br>" + p2Tokens;
  }
  function newP1Score(p1, p2)
  {
    var p1Statement = p1.name + "'s tokens: ";
    var countNum = getToken(p1);
    countNum = countNum-1;
    setToken(p1, countNum);
    var p1Tokens = getToken(p1);
    document.getElementById("jstext").innerHTML = p1Statement + "<br>" + p1Tokens;
    
    
    if(p1.toEndGame == 1 || p2.toEndGame == 1)
    {
        alert = function() {};
    }
    
    else
    {
        setTimeout(function()
        {
            //alert("this is end game: " + p1.toEndGame);
            if(p1.toEndGame == 1)
            {
                alert = function() {};
            }
            alert("Click to begin " + p2.name + "'s turn.");
        }, 120)
    } 
    
    
  }
  function newP2Score(p2, p1)
  {
    
    var p2Statement = p2.name + "'s tokens: ";
    var countNum1 = getToken(p2);
    countNum1 = countNum1-1;
    setToken(p2, countNum1);
    var p2Tokens = getToken(p2);
    document.getElementById("jstext2").innerHTML = p2Statement + "<br>" + p2Tokens;
    
    if(p2.toEndGame == 1 || p1.toEndGame == 1)
    {
        alert = function() {};
    }
    else
    {
        setTimeout(function()
        {
            if(p2.toEndGame == 1)
            {
                alert = function() {};
            }
            alert("Click to begin " + p1.name + "'s turn.");
        }, 120)
    }
    
    
  }
  
  
  
  var check;
  
  function tableEvents(p1, p2, id)
  {
    var myTable = document.getElementById('myTable');
    var x = 2; //serves as temp id.
    
    
    if(id == "A0") //if id is at A
    {
        x = 1; //as the column number will be 1.
        
        
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            //alert("check for col 1: " + check);
            if(check == 1)
            {
                if(p1.turn == true)
                {
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                }
               
                
                else if(p1.turn == false)
                {
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2, p1);
                    p1.turn = true;
                    newP2Score(p2, p1);
                    break;
                }   
                
            }
            
           
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }
        
        
       
    }

    else if(id == "B0")
    {
        x = 2; //col number
       
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            
            if(check == 1)
            {
                if(p1.turn == true)
                {
                    
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                    
                }
                else if(p1.turn == false)
                {
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2, p1);
                    p1.turn = true;
                    newP2Score(p2, p1);
                    break;
                }   
            }
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }
    }
    else if(id == "C0")
    {
        x = 3; //col number
        
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            
            if(check == 1)
            {
                if(p1.turn == true)
                {
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                    
                }
                else if(p1.turn == false)
                {
                    //alert("Click ok to begin " + p2.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2, p1);
                    p1.turn = true;
                    newP2Score(p2, p1);
                    break;
                }   
            }
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }
    }
    else if(id == "D0")
    {
        x = 4;   
        
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            
            if(check == 1)
            {
                if(p1.turn == true)
                {
                    //alert("Click ok to begin " + p1.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                    
                }
                else if(p1.turn == false)
                {
                    //alert("Click ok to begin " + p2.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2, p1);
                    p1.turn = true;
                    newP2Score(p2, p1);
                    break;
                }   
            }
            
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }
    }
    else if(id == "E0")
    {
        x = 5;
        
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            
            if(check == 1)
            {
                if(p1.turn == true)
                {
                    //alert("Click ok to begin " + p1.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                    
                }
                else if(p1.turn == false)
                {
                    //alert("Click ok to begin " + p2.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2,p1);
                    p1.turn = true;
                    newP2Score(p2,p1);
                    break;
                }   
            }
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }
    }
    else if(id == "F0")
    {
        x = 6; 
        
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            
            if(check == 1)
            {
                if(p1.turn == true)
                {
                    //alert("Click ok to begin " + p1.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                    
                }
                else if(p1.turn == false)
                {
                    //alert("Click ok to begin " + p2.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2, p1);
                    p1.turn = true;
                    newP2Score(p2, p1);
                    break;
                }   
            }
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }
    }
    else if(id == "G0")
    {
        x = 7;
        
        for(var i = 6; i >= 1; i--)
        {
            check = isEmpty(p1, p1, id, i, x);
            
            if(check == 1)
            {
                if(p1.turn == true)
                {
                   //alert("Click ok to begin " + p1.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="red-circle.png" height="95" />';
                    //newP1Score(p1, p2);
                    p1.turn = false;
                    newP1Score(p1, p2);
                    break;
                    
                }
                else if(p1.turn == false)
                {
                    //alert("Click ok to begin " + p2.name + "'s turn.");
                    myTable.rows[i].cells[x].innerHTML = '<img src="black-circle.png" height="95" />';
                    //newP2Score(p2, p1);
                    p1.turn = true;
                    newP2Score(p2, p1);
                    break;
                }   
            }
        }
        if(check == 0)
        {
            alert("This column is full!!");
        }

        

        
        
    }
    
    
    checkWin();
    
   
  }
  
  function isEmpty(p1, p2, id, rowNumber, colNumber)
  {
    
    var myTable = document.getElementById('myTable');
    var str = false;
    
    
    //var source = myTable.rows[6].cells[1].innerHTML;
    var source = myTable.rows[rowNumber].cells[colNumber].innerHTML;
    
    var str = source.includes("white-circle.png");
    
    //return str;
    if(str)
    {
        return 1;
    }
    else
    {
        return 0;
    }

  }
  
  var playerWin = true;
  
  
  function displayWin(player)
  {
      
      if(playerWin)
      {
          
            var timeSee = document.getElementById("timer").innerHTML; //time when won.
            alert("Congratulations!! " + player.name + " won in " + timeSee + " hr/min/sec.");
            var fields = timeSee.split(":");
            var hour = fields[0];
            var min = fields[1];
            var sec = fields[2];
            
            var hrToSec = hour * 3600; // hour * 3600 seconds. since 3600 sec = 1 hr. 
            var minToSec = min * 60; //min * 60 seconds. Since 60 sec = 1 min.
            var totalSeconds = hrToSec + minToSec + sec; // combine everything to get a total in seconds. 
        
            
            if (localStorage.length <= 10) 
            {
                localStorage.setItem(player.name, parseInt(totalSeconds, 10));
            }
            
           
            var str = ""; 
            var count = 0;
            var list = new Array(10);
            document.write("Top List: ");
            document.write("<br>");
            for (var i = 0; i < localStorage.length; i++) 
            {
                var s = localStorage.key(i);
                var d = localStorage.getItem(localStorage.key(i));
                str = str + "(" + (++count) + ") " + s + " : " + d + "\n\n";
            }
            document.write(str);
            document.write("<br>");
            document.write("<br>");

            
           
            var button = document.createElement("button");
            button.innerHTML = "NEW GAME";
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(button);
            button.addEventListener("click", function(){
                beginGame()
            });
            playerWin = false;
      }
     
  }
  
  
 
 
  function beginGame()
  {
      location.reload();
      
  }
  
  
  
  function checkWin()
  {
      //horizontal
      
      var myTable = document.getElementById('myTable');
      
      for(var i = 1; i <= 2; i++) //to win horizontally you need a length of 4 long so we'll check the first three rows, 0,1,and 2
      {
        if(i == 1) //player 1.
        {
            //coming this far. 
            
            for(var col = 1; col <=4; col++)
            {
                for(var row = 1; row <=6; row++)
                {
                    var str = myTable.rows[row].cells[col].innerHTML.includes("red-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row].cells[col+1].innerHTML.includes("red-circle.png");
                        var str3 = myTable.rows[row].cells[col+2].innerHTML.includes("red-circle.png");
                        var str4 = myTable.rows[row].cells[col+3].innerHTML.includes("red-circle.png");
                        if(str2 && str3 && str4)
                        {
                            p1.toEndGame = 1;
                            displayWin(p1);
                            break;
                        }
                    }
                    
                }
               
            }
            

        }
        else if(i == 2) //initially it was just an if statement but i changed it to else if. 
        {
           
            
            
            for(var col = 1; col <=4; col++)
            {
                for(var row = 1; row <=6; row++)
                {
                    var str = myTable.rows[row].cells[col].innerHTML.includes("black-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row].cells[col+1].innerHTML.includes("black-circle.png");
                        var str3 = myTable.rows[row].cells[col+2].innerHTML.includes("black-circle.png");
                        var str4 = myTable.rows[row].cells[col+3].innerHTML.includes("black-circle.png");
                        
                        if(str2 && str3 && str4) //win                  
                        {
                            p2.toEndGame = 1;
                            displayWin(p2);
                            
                            break;
                        }
                       
                        
                    }
                }
            }
        }
        
      }
      
      
      
      
      //vertical win.
      for(var i = 1; i <= 2; i++)
      {
        if(i == 1)
        {
            for(var col = 1; col <= 7; col++)
            {
                for(var row = 1; row <= 3; row++)
                {

                    var str = myTable.rows[row].cells[col].innerHTML.includes("red-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row+1].cells[col].innerHTML.includes("red-circle.png");
                        var str3 = myTable.rows[row+2].cells[col].innerHTML.includes("red-circle.png");
                        var str4 = myTable.rows[row+3].cells[col].innerHTML.includes("red-circle.png");
                        
                        
                        if(str2 && str3 && str4)
                        {
                            p1.toEndGame = 1;
                            //alert(p1.name + " Wins!!");
                            displayWin(p1);
                            
                            break;
                        }
                        
                        
                    }
                  }
            }
        }
        else if(i == 2)
        {
            for(var col = 1; col <= 7; col++)
            {
                for(var row = 1; row <= 3; row++)
                {

                    var str = myTable.rows[row].cells[col].innerHTML.includes("black-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row+1].cells[col].innerHTML.includes("black-circle.png");
                        var str3 = myTable.rows[row+2].cells[col].innerHTML.includes("black-circle.png");
                        var str4 = myTable.rows[row+3].cells[col].innerHTML.includes("black-circle.png");
                        
                        
                        if(str2 && str3 && str4)
                        {
                            p2.toEndGame = 1;
                            //alert(p2.name + " Wins!!");
                            displayWin(p2);
                            
                            break;
                        }
                        
                       
                    }
                }
            }

        }
      }
    

    //diagonal win.
    for(var i = 1; i <= 2; i++)
    {
        if(i == 1)
        {
            for(var col = 1; col <= 4; col++)
            {
                for(var row = 4; row <= 6; row++)
                {
                    var str = myTable.rows[row].cells[col].innerHTML.includes("red-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row-1].cells[col+1].innerHTML.includes("red-circle.png");
                        var str3 = myTable.rows[row-2].cells[col+2].innerHTML.includes("red-circle.png");
                        var str4 = myTable.rows[row-3].cells[col+3].innerHTML.includes("red-circle.png");
                        if(str2 && str3 && str4) //could make a condition here stating if one is false then we just need one more token. 
                        {
                            p1.toEndGame = 1;
                            //alert(p1.name + " Wins!!");
                            displayWin(p1);
                            
                            break;
                        }
                    }
                }
            }

        }
        else if(i ==2)
        {
            for(var col = 1; col <= 4; col++)
            {
                for(var row = 4; row <= 6; row++)
                {
                    var str = myTable.rows[row].cells[col].innerHTML.includes("black-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row-1].cells[col+1].innerHTML.includes("black-circle.png");
                        var str3 = myTable.rows[row-2].cells[col+2].innerHTML.includes("black-circle.png");
                        var str4 = myTable.rows[row-3].cells[col+3].innerHTML.includes("black-circle.png");
                        if(str2 && str3 && str4)
                        {
                            p2.toEndGame = 1;
                            //alert(p2.name + " Wins!!");
                            displayWin(p2);
                            
                            break;
                        }
                    }
                }
            }

        }
    }

    for(var i = 1; i <=2; i++)
    {
        if(i == 1) //player one.
        {
            for(var col = 1; col <= 4; col++)
            {
                for(var row = 1; row <= 3; row++)
                {
                    var str = myTable.rows[row].cells[col].innerHTML.includes("red-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row+1].cells[col+1].innerHTML.includes("red-circle.png");
                        var str3 = myTable.rows[row+2].cells[col+2].innerHTML.includes("red-circle.png");
                        var str4 = myTable.rows[row+3].cells[col+3].innerHTML.includes("red-circle.png");
                        if(str2 && str3 && str4) //could make a condition here stating if one is false then we just need one more token. 
                        {
                            p1.toEndGame = 1;
                            displayWin(p1);
                           
                            break;
                        }
                    }
                }
            }

        }
        else if(i ==2) //player 2.
        {
            for(var col = 1; col <= 4; col++)
            {
                for(var row = 1; row <= 3; row++)
                {
                    var str = myTable.rows[row].cells[col].innerHTML.includes("black-circle.png");
                    if(str)
                    {
                        var str2 = myTable.rows[row+1].cells[col+1].innerHTML.includes("black-circle.png");
                        var str3 = myTable.rows[row+2].cells[col+2].innerHTML.includes("black-circle.png");
                        var str4 = myTable.rows[row+3].cells[col+3].innerHTML.includes("black-circle.png");
                        if(str2 && str3 && str4)
                        {
                            p2.toEndGame = 1;
                            displayWin(p2);
                            
                            break;
                        }
                    }
                }
            }

        }
    }
  }

  