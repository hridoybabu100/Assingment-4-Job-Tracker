// console.log('connneted');
// Array
let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

//Total Count id
const totalCount = document.getElementById('total-count');
const totalInterviewCount = document.getElementById('total-interview-count');
const totalRejectedCount = document.getElementById('total-rejected-count');

//No jobs
const noJob = document.getElementById('jobs-available');
// console.log(noJob);
//Abailable Jobs
const abailableJobs = document.getElementById('jobsCount')
// console.log(abailableJobs);


//Total Cards
const allCards = document.getElementById('all-cards');
// console.log(allCards.children.length);

//Calculate Function
function calculate (){
    totalCount.innerText = allCards.children.length ;
    totalInterviewCount.innerText = interviewList.length ;
    totalRejectedCount.innerText = rejectedList.length ; 
    
    //Total Jobs Er Lenggth
    const totalJobs = allCards.children.length;
    // console.log(totalJobs);
    
    if ( currentStatus === 'interview-btn' ){
        abailableJobs.innerText = `${interviewList.length} of ${totalJobs}`
    }
    else if ( currentStatus === 'rejected-btn' ){
        abailableJobs.innerText = `${rejectedList.length} of ${totalJobs}`
    }
    else{
        abailableJobs.innerText = `${totalJobs} jobs`
    }
}

calculate();
//toggole Button
const allButton = document.getElementById('all-btn');
const interviewButton = document.getElementById('interview-btn');
const rejectedButton = document.getElementById('rejected-btn');

//Total JobCount
const totalJobs = allCards.children.length;
// console.log('Total Jobs', totalCount);

//Toggol Function
// console.log(allButton, interviewButton, rejectedButton);
function toggol (id){
    //add all bg & text
    allButton.classList.add('bg-gray-300', 'text-black')
    interviewButton.classList.add('bg-gray-300', 'text-black')
    rejectedButton.classList.add('bg-gray-300', 'text-black')

    //remove bg or text
    allButton.classList.remove('bg-black', 'text-white')
    interviewButton.classList.remove('bg-black', 'text-white')
    rejectedButton.classList.remove('bg-black', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)

    currentStatus = id
    console.log(currentStatus);
    // console.log(selected);
    //last update
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-black', 'text-white')

    if ( id == "interview-btn" ){
        allCards.classList.add('hidden')
        renderSection.classList.remove("hidden") 
        renderInterview ();  
    }
    else if ( id == 'all-btn'){
        allCards.classList.remove('hidden');
        renderSection.classList.add('hidden')
        noJob.classList.add('hidden')
    }
    else if ( id == 'rejected-btn'){
        allCards.classList.add('hidden')
        renderSection.classList.remove('hidden')
        renderRejected ();
    }
    // calculate ();
    
}
// Main section Delegation.
 const mianContainer = document.getElementById('container');
 mianContainer.addEventListener('click', function (event){
    // console.log(event.target.contains('interview-updated-btn'));
  
   if ( event.target.classList.contains('interview-updated-btn')) {
     const parentNode = event.target.parentNode.parentNode ;
    // console.log(parentNode);
    const companyName = parentNode.querySelector('.company-name').innerText ;
    const position = parentNode.querySelector('.position').innerText ;
    const salary = parentNode.querySelector('.salary').innerText ;
    const status = parentNode.querySelector('.status').innerText ;
    // console.log(companyName, position, salary, status);
    parentNode.querySelector('.status').innerText = 'Interview'

    const cardInfo = {
        companyName,
        position,
        salary,
        status : 'Interview'
    }
    const nameExit = interviewList.find( item => item.companyName == cardInfo.companyName );
    if ( !nameExit ){
        interviewList.push(cardInfo);
    }
    //remove the Tracker from the rejected list
    //  strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)
    rejectedList = rejectedList.filter( item => item.companyName != cardInfo.companyName );
    if ( currentStatus == 'rejected-btn' ){
        renderRejected ()
    }
    calculate();
    

   }
    else if ( event.target.classList.contains('rejected-updated-btn')) {
     const parentNode = event.target.parentNode.parentNode ;
    // console.log(parentNode);
    const companyName = parentNode.querySelector('.company-name').innerText ;
    const position = parentNode.querySelector('.position').innerText ;
    const salary = parentNode.querySelector('.salary').innerText ;
    const status = parentNode.querySelector('.status').innerText ;
    // console.log(companyName, position, salary, status);
    parentNode.querySelector('.status').innerText = 'Rejected'

    const cardInfo = {
        companyName,
        position,
        salary,
        status : 'Rejected'
    }
    const nameExit = rejectedList.find( item => item.companyName == cardInfo.companyName );
    if ( !nameExit ){
        rejectedList.push(cardInfo);
    }
    //remove the Tracker from the rejected list
    //  strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)
    interviewList = interviewList.filter( item => item.companyName != cardInfo.companyName );
    if ( currentStatus == 'rejected-btn' ){
        renderInterview ();
        
    }
    calculate();

   }   
    // else if(event.target.closest('.delete-btn')){

    //     const card = event.target.closest('.job-card');

    //     if(card){

    //         const shopName =
    //             card.querySelector('.mobile-shop, .Mobile-First-Corp').innerText;

    //         card.remove();

    //         IntervieCount = IntervieCount.filter(i=>i.mobileShop!==shopName);
    //         RejectedCount = RejectedCount.filter(i=>i.mobileShop!==shopName);

    //         calculateCount();

    //         if(currentStatusCount==='Interview-filter-btn') renderInterview();
    //         else if(currentStatusCount==='Rejected-filter-btn') renderrejected();
    //     }
    // } 
    //Delete btn
    else if ( event.target.closest('.delete-btn') ){
        const card = event.target.closest('.company-card')
        // console.log(card);
        if (card){
            const companyName = card.querySelector('.salary, .Mobile First Corp').innerText;
            card.remove();

            interviewList = interviewList.filter( item => item.salary !== companyName);
            rejectedList = rejectedList.filter( item => item.salary !== companyName);
            calculate();
            if ( currentStatus === 'interview-btn'){
                renderInterview ();
            }
            else if ( currentStatus === 'interview-btn'){
                renderRejected();
            }
        }
        
        
    }

 })


 //Render section
 const renderSection = document.getElementById('filter');
//  console.log(renderSection);
function renderInterview (){
    renderSection.innerHTML = " "
    if ( interviewList.length === 0 ){
        noJob.classList.remove('hidden');
       
    }
    else{
        noJob.classList.add('hidden');
    }

    for ( let interview of interviewList){
        const div = document.createElement('div');
        // div.className = 'bg-[#FFFFFF] rounded-md lg:flex justify-between p-2 lg:p-6'
        div.innerHTML = `
          <div class=" my-5 ">
                <div class=" bg-[#FFFFFF] rounded-md lg:flex justify-between p-2 lg:p-6">
                    <div class="space-y-5 ">
                        <div>
                            <p class="text-[#002C5C] font-bold company-name">${interview.companyName}</p>
                            <p class="text-[#64748B] position">React Native Developer</p>
                        </div>
                        <p class="text-[#64748B] salary">Remote • Full-time • $130,000 - $175,000</p>
                        <div>
                            <button class="text-[#002C5C] font-medium py-1 px-6 bg-[#EEF4FF] rounded-md status">${interview.status}</button>
                        </div>
                        <p class="description">Build cross-platform mobile applications using React Native. Work on products used by
                            millions of
                            users worldwide.</p>
                        <div>
                            <button id="interview-updated-btn"
                                class="border border-[#10B981] rounded-md text-[#10B981] py-1 px-6 font-semibold">Interview</button>
                            <button id="rejected-updated-btn"
                                class="border border-[#EF4444] rounded-md text-[#EF4444] py-1 px-6 font-semibold">Rejected</button>
                        </div>
                    </div>
                    <div class="w-8 h-8 rounded-[50%] border flex justify-center items-center border-[#EF4444] mt-6 ">
                        <span><i class="fa-solid fa-trash-can w-4 text-[#64748B]"></i></span>
                    </div>
                </div>

            </div>
        `
        renderSection.appendChild(div);
    }
}
function renderRejected (){
    renderSection.innerHTML = " "
    if ( rejectedList.length === 0 ){
        noJob.classList.remove('hidden');
       
    }
    else {
        noJob.classList.add('hidden')
      
    }

    for ( let rejected of rejectedList){
        const div = document.createElement('div');
        // div.className = 'bg-[#FFFFFF] rounded-md lg:flex justify-between p-2 lg:p-6'
        div.innerHTML = `
          <div class=" my-5 ">
                <div class=" bg-[#FFFFFF] rounded-md lg:flex justify-between p-2 lg:p-6">
                    <div class="space-y-5 ">
                        <div>
                            <p class="text-[#002C5C] font-bold company-name">${rejected.companyName}</p>
                            <p class="text-[#64748B] position">React Native Developer</p>
                        </div>
                        <p class="text-[#64748B] salary">Remote • Full-time • $130,000 - $175,000</p>
                        <div>
                            <button class="text-[#002C5C] font-medium py-1 px-6 bg-[#EEF4FF] rounded-md status">${rejected.status}</button>
                        </div>
                        <p class="description">Build cross-platform mobile applications using React Native. Work on products used by
                            millions of
                            users worldwide.</p>
                        <div>
                            <button id="interview-updated-btn"
                                class="border border-[#10B981] rounded-md text-[#10B981] py-1 px-6 font-semibold">Interview</button>
                            <button id="rejected-updated-btn"
                                class="border border-[#EF4444] rounded-md text-[#EF4444] py-1 px-6 font-semibold">Rejected</button>
                        </div>
                    </div>
                    <div class="w-8 h-8 rounded-[50%] border flex justify-center items-center border-[#EF4444] mt-6 ">
                        <span><i class="fa-solid fa-trash-can w-4 text-[#64748B]"></i></span>
                    </div>
                </div>

            </div>
        `
        renderSection.appendChild(div);
    }
}
 
 


