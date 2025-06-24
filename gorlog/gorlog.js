function addHeading(){
    // Get the title from the <title> tag
    const titleElement = document.querySelector('title');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
    
    // Get the description from the og:description meta tag
    const descriptionMeta = document.querySelector('meta[property="og:description"]');
    const description = descriptionMeta ? descriptionMeta.getAttribute('content') : '';
    
    // Create the heading structure
    const heading = document.createElement('h3');
    heading.textContent = title;
    
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;

    const divider = document.createElement('hr')
    
    // Find the inner container and prepend the heading elements
    const centeredContainer = document.getElementById('centered-container');
    if (centeredContainer) {
        centeredContainer.insertBefore(heading, centeredContainer.firstChild);
        centeredContainer.insertBefore(descriptionParagraph, heading.nextSibling);
        centeredContainer.insertBefore(divider, descriptionParagraph.nextSibling);
    }
}

function wrapContent(){
    const body = document.body;
    const bodyContent = body.innerHTML;
    
    // Create the container structure
    const container = document.createElement('div');
    container.id = 'container';
    
    const centeredContainer = document.createElement('div');
    centeredContainer.id = 'centered-container';

    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';
    
    // Set the body content inside the inner-container
    contentContainer.innerHTML = bodyContent;
    
    // Clear the body and add the new structure
    body.innerHTML = '';
    centeredContainer.appendChild(contentContainer);
    container.appendChild(centeredContainer);
    body.appendChild(container);
}

document.addEventListener('DOMContentLoaded', function() {
    wrapContent();
    addHeading();
});
