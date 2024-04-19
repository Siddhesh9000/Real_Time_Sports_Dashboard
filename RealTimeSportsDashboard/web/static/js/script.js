document.addEventListener('DOMContentLoaded', () => {
    fetchLastEvents('133602');
});

function fetchLastEvents(teamId) {
    fetch(`/api/last-events/${teamId}`)
    .then(response => response.json())
    .then(data => {
        const eventsDiv = document.getElementById('scores');
        eventsDiv.innerHTML = ''; 
        if (data && data.results && data.results.length > 0) {
            data.results.forEach((event, index) => {
                const collapseId = `collapse-${index}`;
                const eventContainer = document.createElement('div');
                eventContainer.classList.add('accordion-item');
                const expanded = index === 0 ? 'true' : 'false'; // Only expand the first item
                const showClass = index === 0 ? 'show' : ''; // Add 'show' class only to the first item
                eventContainer.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#${collapseId}" aria-expanded="${expanded}" aria-controls="${collapseId}">
                                    ${event.strEvent}
                                </button>
                            </h5>
                        </div>
                        <div id="${collapseId}" class="collapse ${showClass}" aria-labelledby="heading${index}" data-parent="#scores">
                            <div class="card-body">
                                <p>Result: ${event.intHomeScore} - ${event.intAwayScore}</p>
                                <p>Date: ${event.dateEvent}</p>
                                <p>Time: ${event.strTime}</p>
                                <p>Venue: ${event.strVenue}</p>
                            </div>
                        </div>
                    </div>
                `;
                eventsDiv.appendChild(eventContainer);
            });
        } else {
            eventsDiv.innerHTML = 'No recent events available.';
        }
    })
    .catch(error => {
        console.error('Error fetching last events:', error);
        document.getElementById('scores').innerHTML = 'Failed to load last events.';
    });
}

document.getElementById('sidebarToggle').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var isOpen = sidebar.style.width === '250px' || sidebar.style.width === '';
    
    if (isOpen) {
        sidebar.style.width = '0';
        this.style.left = '0'; // Arrow stays at the screen's edge
        document.querySelector('.content').style.marginLeft = '0';
        this.classList.remove('sidebar-open');
        this.classList.add('sidebar-closed'); // Add class for closed state
    } else {
        sidebar.style.width = '250px';
        this.style.left = '250px'; // Move button back with the sidebar
        document.querySelector('.content').style.marginLeft = '250px';
        this.classList.remove('sidebar-closed'); // Remove class for closed state
        this.classList.add('sidebar-open');
    }
});
