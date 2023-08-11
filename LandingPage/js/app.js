/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navigationList = document.getElementById('navbar__list')
let sections = document.querySelectorAll('section')
/**
 * End Global Variables

 * Begin Main Functions
 * 
*/

// Iterate over sections to get attributes for li an anchor tags
// Build the navigation menu dynamically
for (const section of sections) {
	// Extract data attributes from each section
    const sectionTitle = section.getAttribute('data-nav');
    const sectionLink = section.getAttribute('id');
    // Create list items and anchor links for each section
    const listItem = document.createElement('li');
    const listLink = document.createElement('a');
    // Set anchor link properties
    listLink.textContent = sectionTitle;
    listLink.setAttribute('href', '#' + sectionLink);
    listLink.setAttribute('class', 'menu__link');
    // Add click event listener for smooth scrolling
    listLink.addEventListener('click', function (event) {
        event.preventDefault();
        
        // Get the target section based on the clicked link's href
        const targetSectionId = this.getAttribute('href');
        const targetSection = document.querySelector(targetSectionId);
        // Scroll to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
    // Append anchor link to list item and list item to navigation list
    listItem.appendChild(listLink);
    navigationList.appendChild(listItem);
}

// Add class 'active' to section when near top of viewport
sections[0].classList.add('active-section');
navigationList.firstElementChild.firstElementChild.classList.add('active-section');

// Set sections as active using Intersection Observer
// Configure options for the Intersection Observer
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust threshold as needed
};
// Create an Intersection Observer to track active sections
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');
        const correspondingLink = document.querySelector(`[href="#${sectionId}"]`);
        // Add active class to the section and its corresponding link
        if (entry.isIntersecting) {
            entry.target.classList.add('active-section');
            correspondingLink.classList.add('active-section');
        } else {
        	// Remove active class from the section and its corresponding link
            entry.target.classList.remove('active-section');
            correspondingLink.classList.remove('active-section');
        }
    });
}, options);
// Observe each section to apply the active class when they're in view
sections.forEach(section => {
    observer.observe(section);
});