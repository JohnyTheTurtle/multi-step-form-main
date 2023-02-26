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