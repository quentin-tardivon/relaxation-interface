// create web audio api context
var AudioContext = window.AudioContext || window.webkitAudioContext
var audioCtx = new AudioContext()

// create Oscillator and gain node
var gainNode = audioCtx.createGain()
gainNode.gain.value = 0
var gainNode2 = audioCtx.createGain()
gainNode2.gain.value = 0

var merger = audioCtx.createChannelMerger()
merger.connect(audioCtx.destination)

function getData() {
  source = audioCtx.createBufferSource()
  request = new XMLHttpRequest()

  request.open('GET', 'sounds/ocean.mp3', true)

  request.responseType = 'arraybuffer'


  request.onload = function() {
    var audioData = request.response

    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer
        songLength = buffer.duration
        source.buffer = myBuffer
        source.connect(gainNode)
        gainNode.connect(audioCtx.destination)
        source.loop = true
        source.start(0)
      },

      function(e){"Error with decoding audio data" + e.err})
  }

  request.send()
}

function getData2() {
  source2 = audioCtx.createBufferSource()
  request2 = new XMLHttpRequest()

  request2.open('GET', 'sounds/forest.mp3', true)

  request2.responseType = 'arraybuffer'


  request2.onload = function() {
    var audioData = request2.response

    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer
        songLength2 = buffer.duration
        source2.buffer = myBuffer
        source2.connect(gainNode2)
        gainNode2.connect(audioCtx.destination)
        source2.loop = true
        source2.start(0)
      },

      function(e){"Error with decoding audio data" + e.err})
  }

  request2.send()
}

getData()
getData2()




interact('.draggable')
.draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener
})

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

  // update sound volume
  let gainVal = x / window.innerWidth 
  let gainVal2 = y / window.innerHeight
  gainNode.gain.value = gainVal
  gainNode2.gain.value = gainVal2
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

function toggleFullScreen() {
  var doc = window.document
  var docEl = doc.documentElement

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  }
  else {
    cancelFullScreen.call(doc)
  }
}

interact('.tap-target')
.on('doubletap', function (event) {
  toggleFullScreen()
  event.preventDefault()
})



