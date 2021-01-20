

    const itemClassName = "carousel__photo";
    const items = document.getElementsByClassName(itemClassName);
    let totalItems = items.length;
    let slide = 0;
    let moving = true;

    //Set classes
    function setInitialClasses(){
        //Targets the previous, current and next items
        //This assumes there are at least three items

        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }

    //Set event listeners
    function setEventListeners(){
        let next = document.getElementsByClassName("carousel__button--next")[0];
        let prev = document.getElementsByClassName("carousel__button--prev")[0];

        next.addEventListener("click", moveNext);
        prev.addEventListener("click", movePrev);
    }

    //Next navigation handler
    function moveNext(){
        //Check if moving
        if(!moving){
            //If its the last slide, reset to 0, else + 1
            if(slide === (totalItems -1)){
                slide = 0;
            } else {
                slide++;
            }

            //Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    //Previous navigation handler
    function movePrev(){
        //Check if moving
        if(!moving){
            //If its the first slide, set as the last slide, else -1
            if(slide === 0){
                slide = (totalItems - 1);
            } else {
                slide--;
            }

            //Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    function disableInteraction(){
        //Set moving to true for the same duration as our transition
        //(0.5s == 500ms)

        moving = true;

        //Set timeout runs its function once after given time
        setTimeout(function(){
            moving = false;
        }, 500);
    }

    function moveCarouselTo(slide){
        //Check if carousel is moving, if not allow interaction
        if(!moving){
            //Temporarily disable interactivity
            disableInteraction();

            //Update the old asjacent slides with new ones
            let newPrevious = slide - 1;
            let newNext = slide + 1;
            let oldPrevious = slide - 2;
            let oldNext = slide + 2;

            //Test if carousel has more than three items
            if((totalItems -1) > 3){
                //Checks and updates if the new slides are out of bounds
                if(newPrevious <= 0){
                    oldPrevious = (totalItems -1);
                } else if(newNext >= (totalItems -1)){
                    oldNext = 0;
                }

                //Checks and updates if slide is at te beginning/end
                if(slide === 0) {
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems -2);
                    oldNext = (slide + 1);
                } else if(slide === (totalItems -1)){
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                //Now we have worked out where we are and where we are going we can trigger transitions by adding/removing classes

                //Reset old next/prev elements to default classes
                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;

                //Add new classes
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";
            }
        }
    }

    function initCarousel(){
        setInitialClasses();
        setEventListeners();

        //Set moving to false so the carousel becomes interactive
        moving = false;
    }

    initCarousel();