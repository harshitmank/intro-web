let allFilters=document.querySelector('.filter');
let ticketContainer=document.querySelector('.tickets-container');
let openModal=document.querySelector('.open-modal');
let closeModal=document.querySelector('.close-modal');

for(let i=0;i<allFilters.length;i++){
    allFilters[i].addEventListner("click",selectFilter);
}

let ticketModalOpen=false;
let isTextTyped=false;

openModal.addEventListener('click',openTicketModal);
closeModal.addEventListener('click',closeTicketModal);


function selectFilter(e){
    let filterSelected=e.target.classList[1];

    if(ticketContainer.classList.length>1){
        ticketContainer.classList.remove(ticketContainer.classList[1])
    }

    ticketContainer.classList.add(filterSelected);
}

function openTicketModal(e){
    if(ticketModalOpen){
        return;
    }
    let ticketModal=document.createElement('div');
    ticketModal.classList.add("ticket-modal");
    ticketModal.innerHTML=`<div class="ticket-text" spellcheck="false" contenteditable="true">Enter Your Text !!</div>
        <div class="ticket-filters">
            <div class="ticket-filter red selected-filter"></div>
            <div class="ticket-filter blue"></div>
            <div class="ticket-filter green"></div>
            <div class="ticket-filter yellow"></div>
            <div class="ticket-filter black"></div>
        </div>`;
    document.querySelector("body").append(ticketModal);
    ticketModalOpen=true;

    let ticketTextDiv= ticketModal.querySelector('.ticket-text');
    ticketTextDiv.addEventListener("keypress",handleKeyPress);

    let ticketFilters=ticketModal.querySelectorAll(".ticket-filter");
    for(let i=0;i<ticketFilters.length;i++){
        ticketFilters[i].addEventListener('click',function(e){
            if(e.target.classList.contains('selected-filter')){
                return;
            }
            document.querySelector('.selected-filter').classList.remove('selected-filter');
            e.target.classList.add('selected-filter');
        })
    }

}

function closeTicketModal(e){
    if(ticketModalOpen){
        document.querySelector(".ticket-modal").remove();
        ticketModalOpen=false;
    }
    isTextTyped=false;
}

function handleKeyPress(e){
    if(!isTextTyped){   
        isTextTyped=true;
        e.target.textContent="";
    }
}
