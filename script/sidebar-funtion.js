document.addEventListener("DOMContentLoaded", () => {
    const panel      = document.getElementById('mapPanel');
    const titleEl    = document.getElementById('mapPanelTitle');
    const imgEl      = document.getElementById('mapPanelImage');
    const buttons    = document.querySelectorAll('.sidebar-btn');
    let   currentBtn = null;
    const arrowWidth = 10;
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle off if clicking the same button
        if (btn === currentBtn) {
          panel.style.display = 'none';
          btn.classList.remove('active');
          currentBtn = null;
          return;
        }
  
        // Clear previous state active
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBtn = btn;
  
        // Set the panel content
        const level = btn.textContent.trim().toUpperCase();
        titleEl.textContent = btn.textContent.trim();
        imgEl.src = `images/maps/${level}.png`;
        imgEl.alt = `${btn.textContent.trim()} map`;
  
        panel.style.visibility = 'hidden';
        panel.style.display    = 'block';
  
        const btnRect   = btn.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
  
        // Vertically center the panel button
        const topPos = btnRect.top + window.scrollY
                       + (btnRect.height  / 2)
                       - (panelRect.height / 2);
  
        // Horizontally place the panel to left of the button
        const leftPos = btnRect.left 
                        - panelRect.width 
                        - arrowWidth;

        panel.style.top       = `${topPos}px`;
        panel.style.left      = `${leftPos}px`;
        panel.style.visibility= 'visible';
      });
    });
  
    // When click outside, close the panel
    document.addEventListener('click', e => {
      if (
        panel.style.display === 'block' &&
        !panel.contains(e.target) &&
        ![...buttons].some(b => b.contains(e.target))
      ) {
        panel.style.display = 'none';
        buttons.forEach(b => b.classList.remove('active'));
        currentBtn = null;
      }
    });
  });
  
