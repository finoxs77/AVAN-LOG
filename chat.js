let localStream;
let remoteStream;
let peerConnection;
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const startButton = document.getElementById("startCall");
const endButton = document.getElementById("endCall");
 <link rel="stylesheet" href="styles.css">
const constraints = {
  video: true,
  audio: true
};

// Function to start video call
startButton.onclick = async () => {
  try {
    // Request local video stream
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.srcObject = localStream;

    // Create peer connection for video call
    peerConnection = new RTCPeerConnection();

    // Add the local video stream tracks to the peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Set up peer connection to handle remote stream
    peerConnection.ontrack = event => {
      remoteStream = event.streams[0];
      remoteVideo.srcObject = remoteStream;
    };

    // Create offer and set local description
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Enable the end call button after starting the call
    startButton.disabled = true;
    endButton.disabled = false;

    console.log("Video call started");
  } catch (error) {
    console.error("Error starting video call:", error);
    alert('Failed to start video call: ' + error.message);
  }
};

// Function to end video call
endButton.onclick = () => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop());
    remoteVideo.srcObject = null;
  }
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  // Enable the start call button again and disable the end button
  startButton.disabled = false;
  endButton.disabled = true;

  console.log("Video call ended");
};

// Logout functionality
document.getElementById('logout').addEventListener('click', function() {
  localStorage.removeItem('username');
  window.location.href = 'login.html';  // Redirect to login page
});
