document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-links a");
    const dropdown = document.querySelector(".dropdown");
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    const programsContainer = document.getElementById("programsContainer");
    const programTitle = document.getElementById("programTitle");
    const programContent = document.getElementById("programContent");

    // Categories dropdown
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            if (link !== dropdownBtn) {
                dropdown.classList.remove("active");
                dropdownContent.style.display = "none";
  
                const programsContainer = document.getElementById("programsContainer");
                if (programsContainer) {
                    programsContainer.style.display = "none";
                }
            }
    
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Sidebar toggle
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    } else {
        console.error("Sidebar or Toggle Button not found.");
    }

    // Toggle the dropdown on click
    dropdownBtn.addEventListener('click', function (event) {
        event.preventDefault();

        dropdown.classList.toggle("active");

        if (dropdown.classList.contains("active")) {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    });

    // Show College Programs
    const collegeBtn = document.getElementById("collegeProgramsBtn");
    if (collegeBtn) {
        collegeBtn.addEventListener("click", function () {
            programTitle.textContent = "College Programs";

            programContent.innerHTML = `
              <div class="program-block">
                <h3>Information Technology (IT)</h3>
                <ul>
                  <li>BS in Information Technology (BSIT)</li>
                  <li>BS in Computer Science (BSCS)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Business and Management</h3>
                <ul>
                  <li>BS in Business Administration</li>
                  <li>BS in Accountancy</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Hospitality and Tourism</h3>
                <ul>
                  <li>BS in Hospitality Management</li>
                  <li>BS in Tourism Management</li>
                </ul>
              </div>
            `;

            programsContainer.style.display = "block";
        });
    }

    // Show Senior High School Programs
    const shsBtn = document.getElementById("shsProgramsBtn");
    if (shsBtn) {
        shsBtn.addEventListener("click", function () {
            programTitle.textContent = "Senior High School Programs";

            programContent.innerHTML = `
              <div class="program-block">
                <h3>Academic Track</h3>
                <ul>
                  <li>STEM (Science, Technology, Engineering, and Math)</li>
                  <li>ABM (Accountancy, Business and Management)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Technical-Vocational-Livelihood (TVL) Track</h3>
                <ul>
                  <li>ICT (Information and Communications Technology)</li>
                  <li>Home Economics</li>
                </ul>
              </div>
            `;

            programsContainer.style.display = "block";
        });
    }
});
