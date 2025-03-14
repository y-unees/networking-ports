const portListElement = document.getElementById('port-list');

async function fetchPortData() {
    try {
        const response = await fetch('/ports.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayPorts(data);
    } catch (error) {
        console.error('Error fetching or processing the data:', error);
    }
}

function displayPorts(data) {
    data.ports.forEach(port => {
        // Create the port item div
        const portItem = document.createElement('div');
        portItem.classList.add('port-item');
        portItem.innerText = `${port.port}(${port.name})`;

        // Create the description div (outside of the portItem)
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('port-description');
        descriptionElement.innerHTML = `<p>Name : ${port.name}</p>
                                        <p>Protocol : ${port.protocol}</p>
                                        <p>${port.description}</p>`;
        descriptionElement.style.display = 'none'; // Hide description by default

        // Append the portItem and the description to the list
        portListElement.appendChild(portItem);
        portListElement.appendChild(descriptionElement);

        // Add event listener to portItem (only this area will toggle the description)
        portItem.addEventListener('click', () => {
            // Hide all descriptions except the current one
            document.querySelectorAll('.port-item').forEach(item => {
                if (item !== portItem) {
                    item.classList.remove('clicked');
                    const description = item.nextElementSibling; // Get the description next to this item
                    if (description && description.classList.contains('port-description')) {
                        description.style.display = 'none';
                    }
                }
            });

            // Toggle the visibility of the description
            const description = portItem.nextElementSibling; // Get the description next to this item
            if (description && description.classList.contains('port-description')) {
                if (description.style.display === 'none' || !description.style.display) {
                    portItem.classList.add('clicked'); 
                    description.style.display = 'block';
                } else {
                    portItem.classList.remove('clicked'); 
                    description.style.display = 'none';
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchPortData);
