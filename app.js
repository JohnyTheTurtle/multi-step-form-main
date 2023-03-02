let selectedPriceArr = []
function stepNavigation() {
    const allFormsSubmits = document.querySelectorAll("input[type=submit]")
    allFormsSubmits.forEach(a => a.addEventListener("click", () => {
        const formWidth = document.querySelectorAll("form")[0].offsetWidth
        const allForms = document.querySelectorAll(".all-forms form")
        if(a.value === "Next Step" && a.parentElement.parentElement.querySelectorAll("input:invalid").length === 0) {
            allForms.forEach(f => f.style.transform += `translateX(${-formWidth}px)`)
            const sidebarStepsNotActive = document.querySelectorAll(".step-number:not(.active)")
            sidebarStepsNotActive[0].classList.add("active")
        } else if(a.value === "Go Back") {
            allForms.forEach(f => f.style.transform += `translateX(${formWidth}px)`)
            const sidebarStepsActive = document.querySelectorAll(".active")
            sidebarStepsActive[sidebarStepsActive.length -1].classList.remove("active")
        } else if(a.value === "Confirm") {
            allForms.forEach(f => f.style.transform += `translateX(${-formWidth}px)`)
        }
        
    }))    
} 
function navButtonCheck(){
    const step1Button = document.querySelector("#Step1 .navigation input")
    const step1InputFields = document.querySelectorAll("#Step1 input")
    step1InputFields.forEach(a => a.addEventListener("input", () => {
        const step1InvalidSteps = document.querySelectorAll("#Step1 input:invalid")
        if(step1InvalidSteps.length === 0){
            step1Button.classList.remove("blocked")
        } else {
            step1Button.classList.add("blocked")
        }
    }))
}   
navButtonCheck()
stepNavigation()
function timePlan() {
    const timePlanLabels = document.querySelectorAll(".time-plan label")
    const timePlan = document.querySelector(".time-plan input")
    const step2Label = document.querySelectorAll("#Step2 .inputs label:not(.time-plan label)")
    const step2Rate = document.querySelectorAll("#Step2 .rate")
    const step3gain = document.querySelectorAll("#Step3 .add-gain")
    timePlan.addEventListener('change', function() {
        if (this.checked) {
            timePlanLabels[0].classList.remove("active-time")
            timePlanLabels[1].classList.add("active-time")
            step2Rate[0].innerText = "$90/yr"
            step2Rate[1].innerText = "$120/yr"
            step2Rate[2].innerText = "$150/yr"
            const promo = document.createElement("p")
            promo.classList.add("promo")
            promo.innerText = "2 months free"
            step2Label.forEach(a => a.append(promo.cloneNode(true)))
            step3gain[0].innerText = "+$10/yr"
            step3gain[1].innerText = "+$20/yr"
            step3gain[2].innerText = "+$20/yr"
        } else {
            timePlanLabels[0].classList.add("active-time")
            timePlanLabels[1].classList.remove("active-time")
            step2Rate[0].innerText = "$9/mo"
            step2Rate[1].innerText = "$12/mo"
            step2Rate[2].innerText = "$15/mo"
            const promo = document.querySelectorAll(".promo")
            promo.forEach(a => a.remove())
            step3gain[0].innerText = "+$1/mo"
            step3gain[1].innerText = "+$2/mo"
            step3gain[2].innerText = "+$2/mo"
        }
      });
}
timePlan()
function activeService(){
    const services = document.querySelectorAll("#Step3 input")
    services.forEach(a => a.addEventListener('change', () => {
            if(a.checked){
                a.parentElement.classList.add("active-service")
            } else if (!a.checked){
                a.parentElement.classList.remove("active-service")
            }
        })
    )
}
activeService()

function generateSummaryPage() {
    const triggerSummary = document.querySelector("#Step3 input[value='Next Step']")
    const orderSummary = document.querySelector(".order-summary")
    triggerSummary.addEventListener("click", () => {
        //clear prev plan
        orderSummary.innerHTML = ""
        if(document.getElementById("selectedSummaryPrice")){
            document.getElementById("selectedSummaryPrice").remove()
        }
        selectedPriceArr = []
        //plan summary
        const plan = document.querySelector("#Step2 input[type='radio']:checked").value
        let planDuration = "Monthly"
        if(document.querySelector("#Step2 input[type='checkbox']").checked){
            planDuration = "Yearly"
        } 
        const planPriceID = document.querySelector("#Step2 input[type='radio']:checked").id
        const planPrice = document.querySelector(`label[for="${planPriceID}"]`).querySelector(".rate").innerText
        const planSummary = document.createElement("div")
        planSummary.classList.add("plan-Summary")
        const planSummaryTitle = document.createElement("h3")
        planSummaryTitle.innerText = plan + " (" + planDuration + ")" + "\n"
        const linkToStep2 = document.createElement("a")
        linkToStep2.innerText = "Change"
        linkToStep2.addEventListener("click", () => {
            const allForms = document.querySelectorAll(".all-forms form")
            const formWidth = document.querySelectorAll("form")[0].offsetWidth
            allForms.forEach(f => f.style.transform += `translateX(${2 *formWidth}px)`)
            const sidebarStepsActive = document.querySelectorAll(".active")
            sidebarStepsActive[2].classList.remove("active")
            sidebarStepsActive[3].classList.remove("active")
        })
        
        planSummaryTitle.append(linkToStep2)
        const planSummaryPrice = document.createElement("p")
        planSummaryPrice.classList.add("summary-price")
        planSummaryPrice.innerText = planPrice
        selectedPriceArr.push(planPrice)
        planSummary.append(planSummaryTitle, planSummaryPrice)
        //services
        const services = document.createElement("div")
        services.classList.add("services")
        const selectedServices = document.querySelectorAll("#Step3 input[type='checkbox']:checked")
        
        if(selectedServices.length !== 0){
            selectedServices.forEach(s => services.append(generateService(s.id)))
        }

        const selectedSummaryPrice = document.createElement("div")
        selectedSummaryPrice.id = "selectedSummaryPrice"
        const selectedSummaryPriceTitle = document.createElement("p")
        const selectedSummaryPriceDuration = planDuration.slice(0, -2).toLowerCase()
        selectedSummaryPriceTitle.innerText = `Total (per ${selectedSummaryPriceDuration})`
        const selectedSummaryPriceValue = document.createElement("p")
        let shortTimePlan = "/mo"
        if(planDuration==="Yearly"){
            shortTimePlan = "/yr"
        }
        selectedSummaryPriceValue.innerText = `$${calcTotalPrice()}`+ shortTimePlan
        selectedSummaryPrice.append(selectedSummaryPriceTitle, selectedSummaryPriceValue)

        orderSummary.append(planSummary, services)
        orderSummary.after(selectedSummaryPrice)
    })
    
}
generateSummaryPage()

function generateService(serviceID){
    const serviceLabel = document.querySelector(`label[for="${serviceID}"]`)
    const serviceLabelTitle = document.createElement("p")
    serviceLabelTitle.innerText = serviceLabel.querySelector("h3").innerText
    const serviceLabelPrice = document.createElement("p")
    serviceLabelPrice.innerText = serviceLabel.querySelector(".add-gain").innerText
    serviceLabelPrice.classList.add("summary-price")
    selectedPriceArr.push(serviceLabel.querySelector(".add-gain").innerText)
    const serviceContainer = document.createElement("div")
    serviceContainer.append(serviceLabelTitle, serviceLabelPrice)
    serviceContainer.classList.add("service-Container")
    return serviceContainer
}
function calcTotalPrice(){
    const finalPrice = selectedPriceArr.map(a => Number(a.replace(/\D/g,''))).reduce((a,b) => a + b)
    return finalPrice
}