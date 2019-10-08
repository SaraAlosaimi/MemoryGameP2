/*-------var declration ---------*/
        const allcards = document.querySelectorAll(".card");
        let iconlabel =[];//save icon card in this array
        let card; 
        let cardHasBeenOpend=[];
        let movesNum=0 ;
        let starsNum=3;
        let timerNum;
        let Finaltime;
        let interval;
/*-------------------------------*/


//flip down all card when page load
function closedCard()
    {
           allcards.forEach(card =>
            { 
                //remove all class to clos the card 
                card.classList.remove("open");
                card.classList.remove("show");
                card.classList.remove("match");
               
               let child = card.children[0];
               iconlabel.push(child.className);
               card.addEventListener("click", clickedCard );
            });
    }
 /*-------------------------------*/
function clickedCard()
    {
         //updated cardHasBeenOpend() day:9-10-2019 //note(1)
        //first check if card has been open 
         if(this.classList.contains("show"))
            {
                 return;
                 //do nothing just to solve double click problem  in same card to be match
            }
         //end 
        //only  allow 2 card to open to compare if match or not 
        if(cardHasBeenOpend.length < 2 )
            {
                this.classList.toggle("open");//open card 
                this.classList.toggle("show");//show icon of card  
        //to save card that opened in cardHasBeenOpend array
                cardHasBeenOpend.push(this);
                    if(cardHasBeenOpend.length == 2)  
                        {
                            setTimeout(matched,200);
                            // call function matched() , set time 200ms
                        }
                        runTimer();//????
                }    
    }
    /*-------------------------------*/
// incres stars number that depends on moves number  
function incresMove()
    {
        movesNum+=1;


        if(movesNum <=12 )
            {
                starsNum=3;
            }
        else if(movesNum <=20)
            {
                starsNum=2;
            }
        else
            {
                starsNum=1;
            }

        updateMoveNumeber();
    }
    /*-------------------------------*/ 
function updateMoveNumeber()//change name to updateMovesAndStars()
    {
        //first willupdate moves nombers
        const moveClass=document.querySelector(".moves");
        moveClass.innerText=movesNum;

        //parent class
        const starClass=document.querySelector(".stars")
        starClass.innerHTML = "";//delet exist star 

        for(let i=0; i<starsNum;i++)
            {
                let starsNum="<li><i class='fa fa-star'></i></li>" 
                starClass.innerHTML+= starsNum;
            }
    }
   /*-------------------------------*/
function ShowWinDiv()
    {
        let windiv = document.getElementById("winDiv");
        //get last moves num  
        let dialogWinNum=document.querySelector("#get-moves-num");
        dialogWinNum.innerHTML="Number of Moves : "+movesNum;
        //get last time 
        let dialogTime=document.querySelector("#get-time")
        dialogTime.innerHTML="Time : "+Finaltime;
        //get your level 
        let dialogLevel = document.querySelector("#get-level-num")
        dialogLevel.innerHTML="Your Level : "+starsNum;
        //show the win box to user
        windiv.showModal();  
        StopTimer();//when the box apper timer will stop
    }
    /*-------------------------------*/
function hideWinDiv()
    {
        startGame();
        let windiv = document.getElementById("winDiv");
        windiv.close();
    }
    /*-------------------------------*/
function matched()//this function check if card is match or not and what happen in each case
    {
            // check the number of cards 
            if(cardHasBeenOpend.length == 2)
            {
                //create varaible to save card index in   
                let firstCard = cardHasBeenOpend[0];
                let SecCard = cardHasBeenOpend[1];
                //get className of each card
                let firstCardClass = firstCard.children[0].className;
                let SecCardClass = SecCard.children[0].className;
                
                    // if card matche
                    if(firstCardClass == SecCardClass ) 
                        {
                            //console.log("green cards");
                            firstCard.classList.add("match");
                            SecCard.classList.add("match");
                            //cardHasBeenOpend = []; 
                        }
                    // if card not mmatch closed the card 
                    else{
                        firstCard.className="card";
                        SecCard.className="card";
                        }
                    //clear array to match another two cards
                        cardHasBeenOpend = [];
                    // if user clicked on two cards moves number will be incres by one each time either cards matched or not 
                    incresMove();

                //this part will show the win box to the user
                const reminaignCard =document.querySelectorAll(".card:not(.match)");
                // if user match all the card after that dialog win apper 
                if(reminaignCard.length == 0)
                    {
                        ShowWinDiv();
                    }
            }
    }
    /*-------------------------------*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(allcards)
    {
        var currentIndex = iconlabel.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) 
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = iconlabel[currentIndex];
            iconlabel[currentIndex] = iconlabel[randomIndex];
            iconlabel[randomIndex] = temporaryValue;
        }
        return iconlabel;
    }
    /*-------------------------------*/   
//use shuffle function to randomize the cards      
function shuffleCard()
    {
         iconlabel = shuffle(iconlabel);
         let i = 0 ;
         allcards.forEach(card =>
            {
                let child = card.children[0];
                child.className=iconlabel[i]
                i++;
            });

    }
    /*-------------------------------*/
function incresMoves()
    {
        let counter=+1;
        document.getElementsByClassName(".moves").innerHTML=counter;
    }
    /*-------------------------------*/
function runTimer()
    {
        let second=0;
        let secondZero="";
        let minute=0;
        if(!interval)
        {
            interval = setInterval(function()
                {
                    second++;
                    //turns to minute
                        if(second == 60)
                            {
                                minute++;
                                second=0;
                            }
                        //turns to hour
                        if(minute == 60)
                            {
                                hour++;
                                minute=0;
                            }
                        if(second<10)//check if sec less than 10 will apper zero before number <<just for styling 
                            {
                                secondZero="0"+second;
                            }
                        else
                            {
                            secondZero=second;
                            }
            let timerNum=document.querySelector(".timer");
            Finaltime = timerNum.innerHTML=minute+":"+secondZero;  

                },1000);
        }
        
    }
   /*-------------------------------*/
function StopTimer()
    {
        clearInterval(interval);
        interval= null;
    }

function startGame()
    {
        StopTimer();//should clear timer before game staring agan
        runTimer();
        movesNum=0;
        Finaltime=0;//update note(2)
        starsNum=3;
        iconlabel=[];//clears array when game start again 
        //iconlabel=[];
        //StopTimer();
        
        closedCard();
        matched();
        shuffleCard();
        incresMoves();
        updateMoveNumeber();

    }
   /*-------------------------------*/
window.onload = startGame();//whene page load call this function 


