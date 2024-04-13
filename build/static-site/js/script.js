var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Variable to store the selected treatment
  let selectedTreatment = '';

  // Get all the links with the class 'boka'
  let links = document.querySelectorAll('.boka');

  // Add a click event listener to each link
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      // Prevent the default action of the link
      event.preventDefault();
      
      // Get the value of the 'data-value' attribute of the clicked link
      selectedTreatment = this.getAttribute('data-value');

      // Log the selected treatment (for demonstration)
      console.log('Selected treatment:', selectedTreatment);

      // You can now use the selectedTreatment variable to access the chosen treatment value

      // Store data
      sessionStorage.setItem('selectedTreatment', selectedTreatment);
      
       // Allow the link to proceed to its original destination after capturing the data
       setTimeout(function() {
        window.location.href = link.getAttribute('href');
      }, 0);
    });
  });
});



