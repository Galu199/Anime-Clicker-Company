var game = document.getElementById("game");
var menu = document.getElementById("menu");

var ID_intiger = 0;
var money = 0;
var cost_of_new_block = 0;

var list = [];
var big_image_on = false;

//OBJECT Block
function block(){
    let that = this;
    this.id = ++ID_intiger;
    this.on = false;
    this.value = 0;
    this.income = this.id;
    this.cost = 5+this.id;
    this.htmlBlock = document.createElement("div");
    this.htmlBlock.classList.add("block");
    this.htmlBlock.classList.add("bounce");
    this.htmlBlock.classList.add("click");
    this.image="none";
    this.width=0;
    this.height=0;
    this.create = function (){
        //console.log("create");
        game.appendChild(that.htmlBlock);
        addBackground(that);
        that.htmlBlock.addEventListener("click",this.click);
    }
    this.show = function(){
        //console.log("show");
        that.htmlBlock.innerHTML = "<span>"+Math.floor(that.value*100)/100+" $"+"</span>";
        that.htmlBlock.innerHTML += "<span>"+that.income+" $/s "+"</span>";
        that.htmlBlock.innerHTML += "<span>"+"cost "+that.cost+" $"+"</span>";
        if(money >= that.cost){
            that.htmlBlock.style.background = "green";
            let upgrade_button = new button("upgrade");
            upgrade_button.create(that.htmlBlock);
            upgrade_button.htmlBlock.addEventListener("click",function(){
                money -= that.cost;
                that.cost =   Math.floor((that.cost   *(1.01+(0.02*that.id)))*100)/100;
                that.income = Math.floor((that.income *(1.02+(0.001*that.id)))*100)/100;
            });
        }else{
            that.htmlBlock.style.backgroundImage = "url('"+ that.image +")";
            that.htmlBlock.style.backgroundSize = "100% 100%";
            if(big_image_on == true){
                let image = new Image();
                image.src = that.image;
                that.width = image.width;
                that.height = image.height;
                that.htmlBlock.style.width = that.width+"px ";
                that.htmlBlock.style.height = that.height+"px ";
            }else{
                that.htmlBlock.style.width = 256+"px ";
                that.htmlBlock.style.height = 256+"px ";
            }
        }
        if(that.on==false){
            that.htmlBlock.style.background = "red";
            that.htmlBlock.style.width = 256+"px ";
            that.htmlBlock.style.height = 256+"px ";
        }
    }
    this.work = function(){
        //console.log("work");
        that.value += that.income;
        that.show();
    }
    this.start = function(){
        //console.log("start");
        setInterval(that.work, 1000);
    }
    this.click = function(){
        //console.log("click");
        if(that.on == false){
            that.start();
            that.on = true;
        }else{
            money += that.value;
            that.value = 0;
        }
        that.show();
        refresh();
    }
    this.show();
}

//OBJECT Button
function button(name){
    this.htmlBlock = document.createElement("button");
    this.htmlBlock.classList.add("button");
    this.htmlBlock.innerHTML = name;
    this.create_menu = function (){
        menu.appendChild(this.htmlBlock); 
    }
    this.create = function(there){
        there.appendChild(this.htmlBlock);
    }
}

// add block to list
function addBlock(){
    list.push(new block());
    list[list.length-1].create();
}

//PROGRAM

let addButton = new button("Add block");
addButton.htmlBlock.addEventListener("click",function(){
    if(money >= cost_of_new_block){
        money -= cost_of_new_block;
        cost_of_new_block=1+cost_of_new_block*3;
        addBlock();
        refresh();
    }
});
money_block = document.createElement("div");
cost_block = document.createElement("div");

menu.appendChild(cost_block);
addButton.create_menu();
menu.appendChild(money_block);

function refresh(){
    money_block.innerHTML = Math.floor(money*100)/100 + " $";
    cost_block.innerHTML  = "-"+Math.floor(cost_of_new_block*100)/100 + " $";
    if(money>=cost_of_new_block){
        addButton.htmlBlock.style.backgroundColor="green";
    }else{
        addButton.htmlBlock.style.backgroundColor="";
    }
}
refresh();

function addBackground(there){
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
        tags: "anime girl",
        tagmode: "any",
        format: "json"
    },
    function(data) {
        var rnd = Math.floor(Math.random() * data.items.length);
        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
        there.image = image_src;
        //there.style.backgroundImage = "url('" + image_src + "')";
        //$('#content').css('background-image', "url('" + image_src + "')");
    });
}

//setInterval(refresh, 25);
// for(let i=0;i<list.length;i++){ 
// }