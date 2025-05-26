document.addEventListener("DOMContentLoaded", () => {
  const vtBtn        = document.getElementById('virtualTourBtn');
  const vtPanel      = document.getElementById('virtualTourPanel');
  const closeVT      = document.getElementById('closeVT');
  const locationSelect = document.getElementById('locationSelect');
  const sceneSelect    = document.getElementById('sceneSelect');
  let viewer;

  const locations = {
    // BASEMENT
    basement: [
      {
        id: 'basement', title: 'Basement View', panorama: '../routes/basement/Parking.jpg',
        hotSpots: [
          { pitch: -5, yaw: -10, type: 'scene', text: 'Go to Canteen', sceneId: 'canteenEntranceBasement', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: 215, type: 'scene', text: 'Go to Lobby', sceneId: 'lobbyMain', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'canteenEntranceBasement', title: 'Canteen Entrance', panorama: '../routes/basement/Canteen_1.jpg',
        hotSpots: [
          { pitch: -5, yaw: 70, type: 'scene', text: 'Go Back', sceneId: 'basement', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
        ]
      }
    ],

    // LOBBY
    lobby: [
      {
        id: 'lobbyMain', title: 'Main Lobby View', panorama: '../routes/lobby/1.jpg',
        hotSpots: [
          { pitch: -5, yaw: 250, type: 'info', text: 'Reception Desk' },
          { pitch: -3, yaw: 190, type: 'scene', text: 'Go to Basement', sceneId: 'basement', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: -5, yaw: -43, type: 'scene', text: 'Go to Left Corner', sceneId: 'lobbyLeftCorner', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: -5, yaw: 35,  type: 'scene', text: 'Go to Right Corner', sceneId: 'lobbyRightCorner', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'lobbyLeftCorner', title: 'Lobby Left Corner', panorama: '../routes/lobby/2.jpg',
        hotSpots: [
          { pitch: 12, yaw: 175, type: 'scene', text:'Go to Floor 2 Stairs', sceneId:'floor2Stairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-10, yaw: 80,  type: 'scene', text:'Back to Lobby', sceneId:'lobbyMain', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'lobbyRightCorner', title: 'Lobby Right Corner', panorama: '../routes/lobby/3.jpg',
        hotSpots: [
          { pitch:-5, yaw:264, type:'scene', text:'Back to Lobby', sceneId:'lobbyMain', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-5, yaw:-70,type:'scene', text:'Go to Hallway', sceneId:'hallway', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 25, yaw: 180, type: 'info', text: 'Computer Laboratory 1\nTotal Computers: 40 PC' },
          { pitch:0, yaw:180,type:'scene', text:'Go to Computer Laboratory 1', sceneId:'computerLab1', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 20, yaw: 125, type: 'info', text: 'Computer Laboratory 2\nTotal Computers: 40 PC\n Instructor: Sir James' },
          { pitch:0, yaw:125,type:'scene', text:'Go to Computer Laboratory 2', sceneId:'computerLab2', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'hallway', title: 'Hallway View', panorama: '../routes/lobby/4.jpg',
        hotSpots: [
          { pitch:-5, yaw:275, type:'scene', text:'Back to Lobby', sceneId:'lobbyMain', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-5, yaw:-255, type:'scene', text:'Go to Kitchen', sceneId:'kitchen', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'kitchen', title: 'Kitchen View', panorama: '../routes/lobby/kitchen.jpg',
        hotSpots: [
          { pitch:-5, yaw:140, type:'scene', text:'Back to Hallway', sceneId:'hallway', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
        ]
      },
      { 
        id: 'computerLab1', title: 'Computer Lab 1', panorama: '../routes/lobby/computerLab.jpg',
        hotSpots: [
          { pitch:0, yaw:0,type:'scene', text:'Exit', sceneId:'lobbyRightCorner', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      { 
        id: 'computerLab2', title: 'Computer Lab 2', panorama: '../routes/lobby/computerLab2.jpg',
        hotSpots: [
          { pitch:0, yaw:180,type:'scene', text:'Exit', sceneId:'lobbyRightCorner', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor2Stairs', title: 'Floor 2 Stairs', panorama: '../routes/lobby/stairs to floor 2/1.jpg',
        hotSpots: [
          { pitch:5, yaw:375, type:'scene', text:'Go Up', sceneId:'floor2', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-23, yaw:350, type:'scene', text:'Go Down', sceneId:'lobbyLeftCorner', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // FLOOR 2
    floor2: [
      {
        id: 'floor2', title: 'Floor 2 View', panorama: '../routes/lobby/stairs to floor 2/2.jpg',
        hotSpots: [
          { pitch:-15, yaw:260, type:'scene', text:'Go to Floor 2 Main Hallway', sceneId:'floor2Hall', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-30, yaw:345, type:'scene', text:'Go to Floor 2 Stairs', sceneId:'floor2Stairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw:375, type:'scene', text:'Go to Floor 3 Stairs', sceneId:'floor3Stairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor2Hall', title: 'Floor 2 Hallway', panorama: '../routes/floor 2/1.jpg',
        hotSpots: [
          { pitch:0, yaw:175, type:'scene', text:'Corridor', sceneId:'Corridor', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:0, yaw:155, type:'scene', text:'Go Left', sceneId:'Hallway', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:0, yaw:84, type:'scene', text:'Go to Clinic', sceneId:'clinic', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:0, yaw:0,   type:'scene', text:'Back to Stairs', sceneId:'floor2', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Corridor', title: 'Floor 2 Corridor', panorama: '../routes/floor 2/3.jpg',
        hotSpots: [
          { pitch:-3, yaw:-93, type:'scene', text:'Back to Hall', sceneId:'floor2Hall', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-3, yaw:-80, type:'scene', text:'Go Right', sceneId:'Hallway', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 8, yaw: -70, type: 'info', text: 'AVR\n40 Students Capacity\nProjector\nWhite Board' },
          { pitch:3, yaw:-70, type:'scene', text:'Go to AVR', sceneId:'AVR', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: -130, type: 'info', text: 'Library\n40 Students Capacity\n White Board\nProjector\nBooks' },
          { pitch:-3, yaw:-130, type:'scene', text:'Go to Library', sceneId:'library', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Hallway', title: 'Floor 2 Hallway Part 2', panorama: '../routes/floor 2/4.jpg',
        hotSpots: [
          { pitch:-5, yaw:-85, type:'scene', text:'Back to Hall', sceneId:'floor2Hall', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-3, yaw:85, type:'scene', text:'Another Corridor', sceneId:'anotherHallway', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 8, yaw:112, type: 'info', text: 'Mock Hotel\nbeds, mirror, cabinet, tables, and shelve' },
          { pitch:-3, yaw:112, type:'scene', text:'Go to Mock Hotel', sceneId:'mockHotel', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'anotherHallway', title: 'Another Corridor', panorama: '../routes/floor 2/5.jpg',
        hotSpots: [
          { pitch:-5, yaw:-80, type:'scene', text:'Back to Hallway', sceneId:'Hallway', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'library', title: 'Library', panorama: '../routes/floor 2/Library.jpg',
        hotSpots: [
          { pitch:-5, yaw:-170, type:'scene', text:'Back to Corridor', sceneId:'Corridor', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'clinic', title: 'Clinic', panorama: '../routes/floor 2/CLINIC.jpg',
        hotSpots: [
          { pitch:-5, yaw:-280, type:'scene', text:'Back to Hallway', sceneId:'floor2Hall', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'AVR', title: 'AVR', panorama: '../routes/floor 2/AVR.jpg',
        hotSpots: [
          { pitch:5, yaw:-195, type:'scene', text:'Back to Corridor', sceneId:'Corridor', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'mockHotel', title: 'Mock Hotel', panorama: '../routes/floor 2/mock_hotel.jpg',
        hotSpots: [
          { pitch:-5, yaw:-118, type:'scene', text:'Back to Hallway', sceneId:'Hallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor3Stairs', title: 'Floor 3 Stairs', panorama: '../routes/floor 2/stairs to floor 3/STAIR 1.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go Up', sceneId:'floor3', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor2', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // FLOOR 3
    floor3: [
      {
        id: 'floor3', title: 'Floor 3 View', panorama: '../routes/floor 3/1.jpg',
        hotSpots: [
          { pitch:-9, yaw:76, type:'scene', text:'Go Down', sceneId:'floor3Stairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:1, yaw:78, type:'scene', text:'Go Up', sceneId:'floor4Stairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-20, yaw:-85, type:'scene', text:'Go to Middle Hallway', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor3MiddleHallway', title: 'Floor 3 Middle Hallway', panorama: '../routes/floor 3/3.jpg',
        hotSpots: [
          { pitch:-10, yaw:-83, type:'scene', text:'Go to Left Hallway', sceneId:'floor3LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-20, yaw: 187, type:'scene', text:'Back to Floor 3 Landing', sceneId:'floor3', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 8, yaw: 293, type: 'info', text: 'Room 303\n40 Students Capacity\n Glass Board\nAir Conditioned' },
          { pitch: 0, yaw: 293, type:'scene', text:'Go to Room 303', sceneId:'Room303', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 9, yaw: 255, type: 'info', text: 'Room 304 \n30 Students Capacity\nGlass Board\nAir Conditioned ' },
          { pitch: 0, yaw:255, type:'scene', text:'Go to Room 304', sceneId:'Room304', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 35, yaw: 380, type: 'info', text: 'Room 305' },
          { pitch: 0, yaw:380, type:'scene', text:'Go to Room 305', sceneId:'Room305', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor3LeftHallway', title: 'Floor 3 Left Hallway', panorama: '../routes/floor 3/2.jpg',
        hotSpots: [
          { pitch: 35, yaw: 72, type: 'info', text: 'Room 301\n40 Students Capacity\n Glass Board\nAir Conditioned' },
          { pitch:10, yaw:72, type:'scene', text:'Go to Room 301', sceneId:'Room301', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-9, yaw:173, type:'scene', text:'Go to Middle Hallway', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room301', title: 'Room 301', panorama: '../routes/floor 3/301.jpg',
        hotSpots: [
          { pitch:-5, yaw:98, type:'scene', text:'Exit', sceneId:'floor3LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room303', title: 'Room 303', panorama: '../routes/floor 3/303.jpg',
        hotSpots: [
          { pitch:-5, yaw:98, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room304', title: 'Room 304', panorama: '../routes/floor 3/304.jpg',
        hotSpots: [
          { pitch:-5, yaw:-8, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room305', title: 'Room 305', panorama: '../routes/floor 3/305.jpg',
        hotSpots: [
          { pitch:-5, yaw:-8, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room306', title: 'Room 306', panorama: '../routes/floor 3/306.jpg',
        hotSpots: [
          { pitch:-5, yaw:-35, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room307', title: 'Room 307', panorama: '../routes/floor 3/307.jpg',
        hotSpots: [
          { pitch:-5, yaw:150, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room309', title: 'Room 309', panorama: '../routes/floor 3/309.jpg',
        hotSpots: [
          { pitch:-5, yaw:-50, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4Stairs', title: 'Floor 4 Stairs', panorama: '../routes/floor 3/stairs to floor 4/STAIR 1.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go Up', sceneId:'floor4', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor3', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // FLOOR 4
    floor4: [
      {
        id: 'floor4', title: 'Floor 4 View', panorama: '../routes/floor 3/stairs to floor 4/STAIR 2.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go to Gym Stairs', sceneId:'gymStairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor4Stairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-15, yaw: 180, type:'scene', text:'Go to Main Hallway', sceneId:'floor4MainHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4MainHallway', title: 'Floor 4 Main Hallway', panorama: '../routes/floor 4/1.jpg',
        hotSpots: [
          { pitch:-30, yaw:75, type:'scene', text:'Go Back', sceneId:'floor4', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-10, yaw:0, type:'scene', text:'Go to Hallway', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4MiddleHallway', title: 'Floor 4 Middle Hallway', panorama: '../routes/floor 4/2.jpg',
        hotSpots: [
          { pitch:-10, yaw:5, type:'scene', text:'Go Back to Main Hallway', sceneId:'floor4MainHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-5, yaw:95, type:'scene', text:'Go to Left Hallway', sceneId:'floor4LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-10, yaw:-80, type:'scene', text:'Go to Right Hallway', sceneId:'floor4RightHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: -47, type: 'info', text: 'Aquarium\n30 Students Capacity\n Smart TV\nWhite Board\nAir Conditioning' },
          { pitch:-10, yaw:-47, type:'scene', text:'Go to Aquarium', sceneId:'Aquarium', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: 30, type: 'info', text: 'Speech Laboratory\n30 Students Capacity\nWhite Board\nProjector\nAir Conditioning' },
          { pitch:-10, yaw:30, type:'scene', text:'Go to Speech Lab', sceneId:'SpeechLab', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 35, yaw: 200, type: 'info', text: 'Computer Laboratory 3\n40 Students Capacity\nWhite Board\nSmart TV\nAir Conditioning' },
          { pitch: 0, yaw:200, type:'scene', text:'Go to Com Lab 3', sceneId:'ComLab3', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4LeftHallway', title: 'Floor 4 Left Hallway', panorama: '../routes/floor 4/4.jpg',
        hotSpots: [
          { pitch:-12, yaw:-86, type:'scene', text:'Go Back to Middle Hallway', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
        ]
      },
      {
        id: 'floor4RightHallway', title: 'Floor 4 Right Hallway', panorama: '../routes/floor 4/3.jpg',
        hotSpots: [
          { pitch:-10, yaw:205, type:'scene', text:'Go Back to Middle Hallway', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 20, yaw: 50, type: 'info', text: 'Room 402\n40 Students Capacity\nGlass Board\nSmart TV\nAir Conditioning' },
          { pitch:-5, yaw:51, type:'scene', text:'Go to Room 402', sceneId:'Room402', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room401', title: 'Room 401', panorama: '../routes/floor 4/401.jpg',
        hotSpots: [
          { pitch:-5, yaw:80, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room402', title: 'Room 402', panorama: '../routes/floor 4/402.jpg',
        hotSpots: [
          { pitch:-5, yaw:-150, type:'scene', text:'Exit', sceneId:'floor4RightHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room403', title: 'Room 403', panorama: '../routes/floor 4/403.jpg',
        hotSpots: [
          { pitch:-5, yaw:160, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room405-407', title: 'Room 405 to 407', panorama: '../routes/floor 4/405-407.jpg',
        hotSpots: [
          { pitch:-5, yaw:-140, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Aquarium', title: 'AQUARIUM', panorama: '../routes/floor 4/AQUARIUM.jpg',
        hotSpots: [
          { pitch:-5, yaw:-150, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'SpeechLab', title: 'SPEECH LABORATORY', panorama: '../routes/floor 4/SPEECH LAB.jpg',
        hotSpots: [
          { pitch:-2, yaw:120, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'ComLab3', title: 'Computer Laboratory 3', panorama: '../routes/floor 4/COM_LAB 3.jpg',
        hotSpots: [
          { pitch:-5, yaw:-30, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'gymStairs', title: 'Gym Stairs', panorama: '../routes/floor 4/stairs to gym/STAIR 1.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go Up', sceneId:'gymEntrance', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor4', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // GYM
    gym: [
      {
        id: 'gymEntrance', title: 'Gym Entrance', panorama: '../routes/gym/1.jpg',
        hotSpots: [
          { pitch:-5, yaw:230, type:'scene', text:'Go to Gym Center', sceneId:'gymCenter', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-33, yaw: 333, type:'scene', text:'Go Down', sceneId:'gymStairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'gymCenter', title: 'Gym Center', panorama: '../routes/gym/2.jpg',
        hotSpots: [
          { pitch:-5, yaw:263, type:'scene', text:'Back to Gym Entrance', sceneId:'gymEntrance', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:13, yaw:280, type:'scene', text:'Go to Elevated Bleacher', sceneId:'elevatedBleacher', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'elevatedBleacher', title: 'Elevated Bleacher', panorama: '../routes/gym/3.jpg',
        hotSpots: [
          { pitch:-23, yaw:-8, type:'scene', text:'Back to Gym Center', sceneId:'gymCenter', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      }
    ]
  };
  
  const sceneToLocation = {};
  Object.entries(locations).forEach(([locKey, scenes]) => {
    scenes.forEach(sc => {
      sceneToLocation[sc.id] = locKey;
    });
  });

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
          showControls: false,
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
            hotSpots:  sc.hotSpots,
          };
        });
      }

      // Initialize Pannellum
      viewer = pannellum.viewer('streetViewPanorama', pannellumConfig);

      twemoji.parse(document.querySelector('#streetViewPanorama'), {
        folder: 'svg',
        ext: '.svg'
      });

      viewer.on('scenechange', () => {
        const current = viewer.getScene();
        const locKey  = sceneToLocation[current];

        if (locationSelect.value !== locKey) {
          locationSelect.value = locKey;
          populateScenes(locKey);
        }

        sceneSelect.value = current;
      });

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
