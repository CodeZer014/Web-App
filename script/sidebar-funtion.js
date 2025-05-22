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

        const mapHotspotsContainer = document.getElementById('mapHotspotsContainer');
        mapHotspotsContainer.innerHTML = '';

        // Define hotspots per level
        const mapHotspots = {
          BASEMENT: [
            { top: '455px', left: '489px', title: 'Parking', sceneId: 'basement', location: 'basement' },
            { top: '297px', left: '243px', title: 'Canteen', sceneId: 'canteenEntranceBasement', location: 'basement' }
          ],
          'FLR 1': [
            { top: '475px', left: '273px', title: 'Lobby', sceneId: 'lobbyMain', location: 'lobby' },
            { top: '479px', left: '485px', title: 'Computer Laboratory 1', sceneId: 'computerLab1', location: 'lobby' },
            { top: '475px', left: '690px', title: 'Computer Laboratory 2', sceneId: 'computerLab2', location: 'lobby' },
            { top: '251px', left: '644px', title: 'Kitchen', sceneId: 'kitchen', location: 'lobby' },
            { top: '530px', left: '88px', title: 'Stairs', sceneId: 'floor2Stairs', location: 'lobby' }
          ],
          'FLR 2': [
            { top: '552px', left: '89px', title: 'Stairs', sceneId: 'floor3Stairs', location: 'floor2' },
            { top: '332px', left: '378px', title: 'Clinic', sceneId: 'clinic', location: 'floor2' },
            { top: '310px', left: '695px', title: 'AVR', sceneId: 'AVR', location: 'floor2' },
            { top: '215px', left: '695px', title: 'Mock Hotel', sceneId: 'mockHotel', location: 'floor2' },
            { top: '502px', left: '614px', title: 'Library', sceneId: 'library', location: 'floor2' }
          ],
          'FLR 3': [
            { top: '228px', left: '263px', title: 'Room 302', sceneId: 'Room302', location: 'floor3' },
            { top: '295px', left: '263px', title: 'Room 304', sceneId: 'Room304', location: 'floor3' },
            { top: '425px', left: '269px', title: 'Room 306', sceneId: 'Room306', location: 'floor3' },
            { top: '497px', left: '269px', title: 'Room 308', sceneId: 'Room308', location: 'floor3' },
            { top: '200px', left: '671px', title: 'Room 301', sceneId: 'Room301', location: 'floor3' },
            { top: '293px', left: '671px', title: 'Room 303', sceneId: 'Room303', location: 'floor3' },
            { top: '370px', left: '671px', title: 'Room 305', sceneId: 'Room305', location: 'floor3' },
            { top: '440px', left: '671px', title: 'Room 307', sceneId: 'Room307', location: 'floor3' },
            { top: '510px', left: '671px', title: 'Room 309', sceneId: 'Room309', location: 'floor3' },
            { top: '488px', left: '118px', title: 'Stairs', sceneId: 'floor4Stairs', location: 'floor3' },
          ],
          'FLR 4': [
            { top: '215px', left: '292px', title: 'Speech Lab', sceneId: 'SpeechLab', location: 'floor4' },
            { top: '294px', left: '292px', title: 'OSA', sceneId: 'Room304', location: 'floor4' },
            { top: '410px', left: '297px', title: 'Aquarium', sceneId: 'Aquarium', location: 'floor4' },
            { top: '490px', left: '297px', title: 'Room 402', sceneId: 'Room402', location: 'floor4' },
            { top: '185px', left: '705px', title: 'Room 407', sceneId: 'Room405-407', location: 'floor4' },
            { top: '265px', left: '705px', title: 'Room 405', sceneId: 'Room405-407', location: 'floor4' },
            { top: '355px', left: '705px', title: 'Computer Laboratory 3', sceneId: 'ComLab3', location: 'floor4' },
            { top: '430px', left: '705px', title: 'Room 403A', sceneId: 'Room403', location: 'floor4' },
            { top: '495px', left: '705px', title: 'Room 401', sceneId: 'Room401', location: 'floor4' },
            { top: '498px', left: '145px', title: 'Stairs', sceneId: 'gymStairs', location: 'floor4' },
          ],
          'FLR 5': [
            { top: '479px', left: '165px', title: 'Stairs', sceneId: 'gymStairs', location: 'floor4' },
            { top: '420px', left: '355px', title: 'Elevated Bleacher', sceneId: 'elevatedBleacher', location: 'gym' },
            { top: '348px', left: '623px', title: 'Court', sceneId: 'gymCenter', location: 'gym' }
          ]
        };

        const levelKey = level.replace(/\s+/g, '').replace('FLR', 'FLR ').trim();
        (mapHotspots[levelKey] || []).forEach(hs => {
          const el = document.createElement('div');
          el.classList.add('map-hotspot', 'camera-hotspot');
          el.title = hs.title;
          el.style.position = 'absolute';
          el.style.top = hs.top;
          el.style.left = hs.left;
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.cursor = 'pointer';

          el.addEventListener('click', () => {
            document.getElementById('virtualTourBtn').click();
            setTimeout(() => {
              document.getElementById('locationSelect').value = hs.location;
              document.getElementById('locationSelect').dispatchEvent(new Event('change'));
              setTimeout(() => {
                document.getElementById('sceneSelect').value = hs.sceneId;
                document.getElementById('sceneSelect').dispatchEvent(new Event('change'));
              }, 300);
            }, 300);
          });

          mapHotspotsContainer.appendChild(el);
        });

  
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
  