// console.log(' JavaScripts connneted');
//Faka Array
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
    //Jobs Pages updated
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

//toggole Clicked Button
const allButton = document.getElementById('all-btn');
const interviewButton = document.getElementById('interview-btn');
const rejectedButton = document.getElementById('rejected-btn');
// console.log(allButton, interviewButton, rejectedButton);

//Total JobCount
const totalJobs = allCards.children.length;
// console.log('Total Jobs', totalCount);

//Toggol Function
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
    calculate();  
}
// Main section Delegation.Sob bacca Gula ke dhorrar jonne i menn all elements ke dhorar jonne delegation korte hbe.
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
    //Interview list theke Rejected list remove
    rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName );
    // console.log(rejectedList);
    

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
    //Rejected List theke intervciew list remove
    interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName );
    
    if ( currentStatus == 'interview-btn' ){
        renderInterview();
        
    }
    calculate();

   }   
 
    //Delete btn. Eita ami sob theke beshi pera khaichi.
    // else if ( event.target.closest('.delete-btn') ){
    //     const card = event.target.closest('.company-card')
    //     // console.log(card);

    //     if (card){
    //         console.log(card);
            
    //          const companyName = card.querySelector('.company-name').innerText ;
    //         card.remove();

    //        const interviewLists = interviewList.filter( item => item.companyName != companyName);
    //         rejectedList = rejectedList.filter( item => item.companyName != companyName);
    //         calculate();  
    //         console.log(currentStatus);
    //         console.log(interviewLists);
    //         console.log(rejectedList);
    //         console.log(companyName);
            
            
            
                    
    //         if ( currentStatus === 'interview-btn' ){
    //             renderInterview ();     
    //         }
    //         else if ( currentStatus === 'interview-btn' ){
    //             renderRejected();               
    //         }
    //     }  
    // }
    else if (event.target.closest('.delete-btn')) {

    const card = event.target.closest('.company-card');
    if (!card) return;

    const companyName = card.querySelector('.company-name').innerText;

    card.remove();

    interviewList = interviewList.filter(
        item => item.companyName !== companyName
    );

    rejectedList = rejectedList.filter(
        item => item.companyName !== companyName
    );

    calculate();

    if (currentStatus === 'interview-btn') {
        renderInterview();
    }
    else if (currentStatus === 'reject-btn') {
        renderRejected();
    }
}
 })


    //Render section. 
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
        div.innerHTML = `
          <div class="my-5 company-card">
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
                            <button 
                                class="border interview-updated-btn border-[#10B981] rounded-md text-[#10B981] py-1 px-6 font-semibold">Interview</button>
                            <button 
                                class="border rejected-updated-btn border-[#EF4444] rounded-md text-[#EF4444] py-1 px-6 font-semibold">Rejected</button>
                        </div>
                    </div>
                    <div class="w-8 delete-btn h-8 rounded-[50%] border flex justify-center items-center border-[#EF4444] mt-6 ">
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
        div.innerHTML = `
          <div class="my-5 company-card">
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
                            <button 
                                class="border interview-updated-btn border-[#10B981] rounded-md text-[#10B981] py-1 px-6 font-semibold">Interview</button>
                            <button 
                                class="border rejected-updated-btn border-[#EF4444] rounded-md text-[#EF4444] py-1 px-6 font-semibold">Rejected</button>
                        </div>
                    </div>
                    <div class="w-8 delete-btn h-8 rounded-[50%] border flex justify-center items-center border-[#EF4444] mt-6 ">
                        <span><i class="fa-solid fa-trash-can w-4 text-[#64748B]"></i></span>
                    </div>
                </div>

            </div>
        `
        renderSection.appendChild(div);
    }
}
 
 


