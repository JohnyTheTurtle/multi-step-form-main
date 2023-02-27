function stepNavigation() {
    const allForms = document.querySelectorAll("input[type=submit]")
    allForms.forEach(a => a.addEventListener("click", () => {
        const formWidth = document.querySelectorAll("form")[0].offsetWidth
        const allForms = document.querySelectorAll(".all-forms form")
        if(a.value === "Next Step") {
            allForms.forEach(f => f.style.transform += `translateX(${-formWidth}px)`)
            const sidebarStepsNotActive = document.querySelectorAll(".step-number:not(.active)")
            sidebarStepsNotActive[0].classList.add("active")
        } else if(a.value === "Go Back") {
            allForms.forEach(f => f.style.transform += `translateX(${formWidth}px)`)
            const sidebarStepsActive = document.querySelectorAll(".active")
            sidebarStepsActive[sidebarStepsActive.length -1].classList.remove("active")
        }
        
    }))    
} 
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
                console.log(a.parentElement)
            } else if (!a.checked){
                a.parentElement.classList.remove("active-service")
                console.log(a.parentElement)
            }
        })
    )
}
activeService()