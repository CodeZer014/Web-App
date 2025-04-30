document.addEventListener("DOMContentLoaded", () => {
  const vtBtn        = document.getElementById('virtualTourBtn');
  const vtPanel      = document.getElementById('virtualTourPanel');
  const closeVT      = document.getElementById('closeVT');
  const locationSelect = document.getElementById('locationSelect');
  const sceneSelect    = document.getElementById('sceneSelect');
  let viewer;

  const locations = {
    // Lobby
    lobby: [
      { id: 'lobbyMain', title: 'Main Lobby View', panorama: '../routes/lobby/1.jpg',
        hotSpots: [
          {
            pitch:  -5,
            yaw:   250,
            type:   'info',
            text:   'Reception Desk',
          },
          {
            pitch:   -5,
            yaw:   -43,
            type:    'scene',
            text:    'Go to Left Lobby Corner',
            sceneId: 'lobbyLeftCorner',
            cssClass:'arrow-left',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          },
          {
            pitch:   -5,
            yaw:    35,
            type:    'scene',
            text:    'Go to Right Lobby Corner',
            sceneId: 'lobbyRightCorner',
            cssClass:'arrow-right',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          },
        ]
      },
      {id: 'lobbyLeftCorner', title: 'Lobby Left Corner View', panorama: '../routes/lobby/2.jpg',
        hotSpots: [
          {
            pitch:   -10,
            yaw:     80,
            type:    'scene',
            text:    'Back to Main Lobby',
            sceneId: 'lobbyMain',
            cssClass:'arrow-right',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
      { id: 'lobbyRightCorner', title: 'Lobby Right Corner View', panorama: '../routes/lobby/3.jpg',
        hotSpots: [
          {
            pitch:   -5,
            yaw:     264,
            type:    'scene',
            text:    'Back to Main Lobby',
            sceneId: 'lobbyMain',
            cssClass:'arrow-left',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          },
          {
            pitch:   -5,
            yaw:     -70,
            type:    'scene',
            text:    'Go to Hallway',
            sceneId: 'hallway',
            cssClass:'arrow-right',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
      { id: 'hallway', title: 'Hallway View', panorama: '../routes/lobby/4.jpg',
        hotSpots: [
          {
            pitch:   -5,
            yaw:     275,
            type:    'scene',
            text:    'Back to Main Lobby',
            sceneId: 'lobbyMain',
            cssClass:'arrow-right',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
      { id: 'computerLab', title: 'Computer Laboratory View', panorama: '../routes/lobby/computerLab.jpg' },

    ],

    // Gym
    gym: [
      { id: 'gymEntrance', title: 'Gym Entrance', panorama: '../routes/gym/1.jpg',
        hotSpots: [
          {
            pitch:  10,
            yaw:   -20,
            type:   'info',
            text:   'Check-in Desk',
          },
          {
            pitch:   0,
            yaw:   120,
            type:    'scene',
            text:    'Go to Gym Center',
            sceneId: 'gymCenter',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
      { id: 'gymCenter', title: 'Gym Center Floor', panorama: '../routes/gym/center.jpg',
        hotSpots: [
          {
            pitch:   -5,
            yaw:     90,
            type:    'scene',
            text:    'Back to Entrance',
            sceneId: 'gymEntrance',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      }
    ],

    // Floor 2
    floor2: [
      { id: 'floor2Hall', title: 'Floor 2 Hall', panorama: '../routes/floor 2/1.jpg',
        hotSpots: [
          {
            pitch:   0,
            yaw:     45,
            type:    'scene',
            text:    'Go to Office',
            sceneId: 'floor2Office',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
      { id: 'floor2Office', title: 'Floor 2 Office', panorama: '../routes/floor 2/2.jpg',
        hotSpots: [
          {
            pitch:   0,
            yaw:    -90,
            type:    'scene',
            text:    'Back to Hall',
            sceneId: 'floor3Hall',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
      { id: 'floor3Hall', title: 'Floor 2 Hall', panorama: '../routes/floor 2/3.jpg',
        hotSpots: [
          {
            pitch:   0,
            yaw:     45,
            type:    'scene',
            text:    'Go to Office',
            sceneId: 'floor2Office',
            targetYaw:   'same',
            targetPitch: 'same',
            targetHfov:  'same'
          }
        ]
      },
    ]
  };
  

  // Populate scene based on the current location
  function populateScenes(locationKey) {
    sceneSelect.innerHTML = '';
    locations[locationKey].forEach(scene => {
      const opt = document.createElement('option');
      opt.value = scene.id;
      opt.textContent = scene.title;
      sceneSelect.appendChild(opt);
    });
  }

  // When the location changes, repopulate the scenes and load the first scene
  locationSelect.addEventListener('change', () => {
    const loc = locationSelect.value;
    populateScenes(loc);
    if (viewer) {
      viewer.loadScene(locations[loc][0].id);
    }
  });

  // When the scene change, load the specific scene
  sceneSelect.addEventListener('change', () => {
    const sceneId = sceneSelect.value;
    if (viewer && sceneId) {
      viewer.loadScene(sceneId);
    }
  });

  vtBtn.addEventListener('click', e => {
    e.preventDefault();
    vtPanel.style.display = 'block';

    if (!vtPanel._loaded) {
      populateScenes(locationSelect.value);

      // Pannellum config
      const pannellumConfig = {
        default: {
          firstScene: locations[locationSelect.value][0].id,
          sceneFadeDuration: 800,
          autoLoad: true,
          showControls: true
        },
        scenes: {}
      };

      // Insert all scenes into the config
      for (const scenes of Object.values(locations)) {
        scenes.forEach(sc => {
          pannellumConfig.scenes[sc.id] = {
            title:     sc.title,
            type:      'equirectangular',
            panorama:  sc.panorama,
            hotSpots:  sc.hotSpots
          };
        });
      }

      // Initialize Pannellum
      viewer = pannellum.viewer('streetViewPanorama', pannellumConfig);
      vtPanel._loaded = true;
    }
  });

  closeVT.addEventListener('click', () => {
    vtPanel.style.display = 'none';
  });

  vtPanel.addEventListener('click', e => {
    if (e.target === vtPanel) {
      vtPanel.style.display = 'none';
    }
  });
});
