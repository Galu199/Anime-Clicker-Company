//variables
var game_window = document.getElementById("game");
var nav_window = document.getElementById("nav");
var id_desk = 0;
var money = 0;
var cost = 0;

//objects
function positionDesk(){
    var that = this;
    this.id = ++id_desk;
    this.image= "url(images/"+this.id+".jpg)";
    this.income = 0.1;
    this.level = 1;
    this.div = document.createElement("div");
    this.div.classList.add("positionDesk");
    this.div.classList.add("bounce");
    that.div.classList.add("click");
    this.div.style.backgroundImage=this.image;
    this.div.style.backgroundSize="cover";
    this.create = function (){
        game_window.appendChild(this.div); 
    }
    this.clicked = function (){
        money+=that.income;
        refresh();
    }
    this.div.addEventListener("click",this.clicked)
}

//adding desks
/*for (let i = 0; i < 1; i+=1) {
    //console.log(i);
    let desk = new positionDesk();
    desk.create();
}*/

//refresh navigation
function refresh(){
    nav_window.innerHTML="<button onclick='mode()'>Mode</button>"
    let view=money;
    let notation=0;
    view=parseFloat(money).toFixed(3);
    while(view>=1000){
        view/=1000;
        notation+=3;
        view=parseFloat(view).toFixed(3);
    }
    nav_window.innerHTML+=
        "money = "+view+"e"+notation;
    if(money >= cost){
        nav_window.innerHTML+="<button onclick='buy()'>buy</button>";
    }
}
refresh();

//function for buying more girls
var list = [];
function buy(){
    let desk = new positionDesk();
    if(list.length>0){
        desk.income += list[list.length-1].income*1.9;
    }
    desk.create();
    money-=cost;
    cost+=1+cost;
    list.push(desk);
    refresh();
}

//change background color
function mode(){
    let s = game_window.style.backgroundColor;
    if(s=="white"){
        game_window.style.backgroundColor="black";
    }else{
        game_window.style.backgroundColor="white";
    }
    
}




