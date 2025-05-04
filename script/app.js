document.addEventListener("DOMContentLoaded", function () {
  const links = [
    ...document.querySelectorAll(".nav-links a"),
    document.querySelector(".contact-link")
  ].filter(Boolean);

  const dropdown = document.querySelector(".dropdown");
  const dropdownBtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  const contactDropdown = document.getElementById("contactDropdown");
  const contactBtn      = contactDropdown.querySelector(".dropbtn");
  const contactContent  = contactDropdown.querySelector(".dropdown-content");

  const programsContainer = document.getElementById("programsContainer");
  const programTitle = document.getElementById("programTitle");
  const programContent = document.getElementById("programContent");

    // Categories dropdown & active‐link highlight
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (link !== dropdownBtn) {
          dropdown.classList.remove("active");
          dropdownContent.style.display = "none";
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

      contactBtn.addEventListener('click', function (event) {
        event.preventDefault();

        contactDropdown.classList.toggle("active");
        closeDropdowns(contactBtn);

        if (contactDropdown.classList.contains("active")) {
          contactContent.style.display = "block";
        } else {
          contactContent.style.display = "none";
        }
    });

    // 10) Click outside to close dropdowns
    document.addEventListener('click', e => {
      if (!e.target.closest('.dropdown') && !e.target.closest('.dropbtn')) {
        closeDropdowns();
      }
    });

    // Show College Programs
    const collegeBtn = document.getElementById("collegeProgramsBtn");
    if (collegeBtn) {
        collegeBtn.addEventListener("click", function () {
            programTitle.textContent = "College Programs";

            programContent.innerHTML = `
              <div class="program-block">
                <h3>Information Technology</h3>
                <ul>
                  <li>BS in Information Technology (BSIT)</li>
                  <li>BS in Computer Science (BSCS)</li>
                  <li>BS in Information Systems (BSIS)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Business and Management</h3>
                <ul>
                  <li>BS in Business Administration (BSBA)</li>
                  <li>BS in Accountancy (BSA)</li>
                  <li>BS in Accounting Information System (BSAIS)</li>
                  <li>BS in Management Accounting (BSMA)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Hospitality Management</h3>
                <ul>
                  <li>BS in Hospitality Management (BSHM)</li>
                  <li>BS in Culinary Management (BSCM)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Tourism Management</h3>
                <ul>
                  <li>BS in Tourism Management (BSTM)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Engineering</h3>
                <ul>
                  <li>BS in Computer Engineering (BSCpE)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Arts and Sciences</h3>
                <ul>
                  <li>BA in Communication (BACOMM)</li>
                  <li>Bachelor of Multimedia Arts (BMMA)</li>
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
            programTitle.textContent = "Senior High School";

            programContent.innerHTML = `
              <div class="program-block">
                <h3>Academic Track</h3>
                <ul>
                  <li>Science, Technology, Engineering, and Mathematics (STEM)</li>
                  <li>Humanities and Social Sciences (HUMSS)</li>
                  <li>General Academic</li>
                  <li>Accountancy, Business and Management (ABM)</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>Technical-Vocational-Livelihood Track</h3>
                <h3>ICT | Information and Communications Technology</h3>
                <ul>
                  <li>Computer and Communications Technology</li>
                  <li>Digital Arts</li>
                  <li>IT in Mobile App and Web Development</li>
                </ul>
              </div>
              <div class="program-block">
                <h3>HE | Home Economics</h3>
                <ul>
                  <li>Tourism Operations</li>
                  <li>Restaurant and Cafe Operations</li>
                  <li>Culinary Arts</li>
                </ul>
              </div>
            `;

            programsContainer.style.display = "block";
        });
    }
});
