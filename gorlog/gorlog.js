const AUTHOR_INFO = {
    'Gordon Kamer': {'link': 'https://gkamer8.github.io', 'socials': {'twitter': 'https://x.com/gkamer8'}}
}

const SOCIAL_ICONS = {
    'twitter': '/gorlog/x-icon.png'
}

function addHeading(){
    // Get the title from the <title> tag
    const titleElement = document.querySelector('title');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
    
    // Get the description from the og:description meta tag
    const descriptionMeta = document.querySelector('meta[property="og:description"]');
    const description = descriptionMeta ? descriptionMeta.getAttribute('content') : '';
    
    // Get the author from the og:author meta tag
    const authorMeta = document.querySelector('meta[property="og:article:author"]');
    const author = authorMeta ? authorMeta.getAttribute('content') : '';

    // Create the heading structure
    const heading = document.createElement('h3');
    heading.textContent = title;
    
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;
    
    const authorBlock = document.createElement('p')
    if (author) {
        authorBlock.id = "author-block"

        const byText = document.createTextNode('By ');
        authorBlock.appendChild(byText);
        
        // Check if author exists in AUTHOR_INFO
        if (AUTHOR_INFO[author]) {
            // Create linked author name
            const authorLink = document.createElement('a');
            authorLink.href = AUTHOR_INFO[author].link;
            authorLink.textContent = author;
            authorBlock.appendChild(authorLink);
            
            // Add social icons if they exist
            if (AUTHOR_INFO[author].socials) {
                const spacer = document.createElement('div')
                spacer.style.flex = '1'
                authorBlock.appendChild(spacer)
                for (const [socialName, socialUrl] of Object.entries(AUTHOR_INFO[author].socials)) {
                    if (SOCIAL_ICONS[socialName]) {
                        const socialLink = document.createElement('a');
                        socialLink.href = socialUrl;
                        
                        const socialIcon = document.createElement('img');
                        socialIcon.src = SOCIAL_ICONS[socialName];
                        socialIcon.alt = socialName;
                        socialIcon.className = "social-icon"
                        
                        socialLink.appendChild(socialIcon);
                        authorBlock.appendChild(socialLink);
                    }
                }
            }
        }
        else {
            // Just display author name without linking
            const authorText = document.createTextNode(author);
            authorBlock.appendChild(authorText);
        }
    }

    const divider = document.createElement('hr')
    
    // Find the inner container and prepend the heading elements
    const centeredContainer = document.getElementById('centered-container');
    if (centeredContainer) {
        centeredContainer.insertBefore(heading, centeredContainer.firstChild);
        centeredContainer.insertBefore(descriptionParagraph, heading.nextSibling);
        centeredContainer.insertBefore(authorBlock, descriptionParagraph.nextSibling);
        centeredContainer.insertBefore(divider, authorBlock.nextSibling);
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
