// NOTE: This is experimental.

THREE.GamepadControls = function (object) {
  // See standard gamepad mapping: http://www.w3.org/TR/2015/WD-gamepad-20150414/#remapping
  var padButtons = {
    "LEFT_TOP": 6,
    "RIGHT_TOP": 7,
    "SELECT": 8,
    "D_PAD_DOWN": 13,
    "D_PAD_RIGHT": 15,
    "D_PAD_LEFT": 14,
    "D_PAD_UP": 12
  };
  
  var padAxes = {
    "LEFT_THUMB_HORIZONTAL": 0,
    "LEFT_THUMB_VERTICAL": 1,
    "RIGHT_THUMB_HORIZONTAL": 2,
    "RIGHT_THUMB_VERTICAL": 3
  };
  
  var actions = {
    "ROTATE": "rotation",
    "MOVE": "position"
  };
  
  var directions = {
    "X": "x",
    "Y": "y",
    "Z": "z"
  };
  
  this.update = function() {};
  
  reset();
  
  function reset() {
    object.position.set(0, 0, -30);
    lookAtOrigin();
  }
  
  function lookAtOrigin() {
    object.lookAt(new THREE.Vector3(0, 0, 0));
  }

  if (navigator.getGamepads || !!navigator.webkitGetGamepads || !!navigator.webkitGamepads) {
    if ('ongamepadconnected' in window) {
      window.addEventListener('gamepadconnected', startGamepadPolling);
    } else {
      startGamepadPolling();
    }
  }

  var gamepadPollingStarted = false;

  function startGamepadPolling() {
    if (!gamepadPollingStarted) {
      gamepadPollingStarted = true;
      checkGamepad();
    }
  }

  function checkGamepad() {    
    var gamepads = (navigator.getGamepads && navigator.getGamepads()) || (navigator.webkitGetGamepads && navigator.webkitGetGamepads());

    for (var i = 0; i < gamepads.length; ++i) {
      var pad = gamepads[i];

      if (pad) {
        if (pad.buttons[padButtons.SELECT].pressed) {
          reset();
        }
        
        checkButton(pad, padButtons.D_PAD_DOWN, actions.MOVE, directions.Y, true);
        checkButton(pad, padButtons.D_PAD_UP, actions.MOVE, directions.Y);
        checkButton(pad, padButtons.D_PAD_LEFT, actions.MOVE, directions.X, true);
        checkButton(pad, padButtons.D_PAD_RIGHT, actions.MOVE, directions.X);
        checkButton(pad, padButtons.LEFT_TOP, actions.ROTATE, directions.Z, true, 0.04);
        checkButton(pad, padButtons.RIGHT_TOP, actions.ROTATE, directions.Z, false, 0.04);
        
        checkAxis(pad, padAxes.LEFT_THUMB_HORIZONTAL, actions.ROTATE, directions.Y);
        checkAxis(pad, padAxes.LEFT_THUMB_VERTICAL, actions.ROTATE, directions.X, true);
        checkAxis(pad, padAxes.RIGHT_THUMB_VERTICAL, actions.MOVE, directions.Z, false, 1);
      }
    }

    window.requestAnimationFrame(checkGamepad);
  }

  function checkButton(pad, buttonId, action, positionAxis, invert, factor) {
    var button = pad.buttons[buttonId];
    
    if (button.pressed) {
      object[action][positionAxis] += 0.5 * (factor || 1) * (invert ? -1 : 1); 
    }
  }

  function checkAxis(pad, axisId, action, positionAxis, invert, factor) {
    var axisValue = pad.axes[axisId];
    
    if (Math.abs(axisValue) > 0.1) {
      object[action][positionAxis] += axisValue * (factor || 0.01) * (invert ? -1 : 1);
    }
  }
};