const form = document.getElementById('incidentForm');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    // Emit the report to the server via socket.io
    const reportData = { location, description };
    socket.emit('incidentReport', reportData);

    alert('Incident report submitted successfully!');
    form.reset(); // Clear the form fields
});

// Dynamically set the user ID
const userId = 'example_user_id'; // Replace this with actual user ID dynamically
const socket = io('http://localhost:4000', { query: { id: userId } });
const video = document.getElementById('video');
let localStream;
let peerConnection;
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }; // STUN server

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
        localStream = stream;
        video.srcObject = localStream;

        // Log the active state of the stream
        console.log('Local stream initialized:', localStream.active);

        // Start peer connection when the user clicks the start stream button
        document.getElementById('startStream').addEventListener('click', () => {
            startLiveStream();
        });
    })
    .catch((error) => {
        console.error('Error accessing media devices:', error);
    });


function startLiveStream() {
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log('Sending ICE candidate to admin');
            socket.emit('iceCandidate', {
                candidate: event.candidate,
                target: 'admin_user_id',
                source: userId
            });
        }
    };

    // Handle incoming signals from the admin
    socket.on('signal', (data) => {
        if (data.source === 'admin_user_id') {
            console.log('Received signal from admin');
            peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal))
                .catch(error => console.error('Error setting remote description from admin:', error));
        }
    });

    // Handle incoming ICE candidates from the admin
    socket.on('iceCandidate', (data) => {
        if (data.source === 'admin_user_id') {
            console.log('Received ICE candidate from admin');
            peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
                .catch(error => console.error('Error adding received ice candidate from admin:', error));
        }
    });


    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
        console.log('Track:', track.kind, 'Enabled:', track.enabled, 'Muted:', track.muted);
    });

    // Emit the start live stream event
    // const data = {
    //     userId: userId,
    //     location: 'FUTO Main Gate',
    //     description: 'Robbery in progress'
    // };
    // socket.emit('startLiveStream', data);

    // Create the offer and handle signaling
    peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
            console.log('Sending offer to admin');
            socket.emit('signal', { signal: peerConnection.localDescription, target: 'admin_user_id', source: userId });
        })
        .catch(error => console.error('Error creating offer:', error));
}

function stopPeerConnection() {
    if (peerConnection) {
        // Stop all senders' tracks
        peerConnection.getSenders().forEach((sender) => {
            if (sender.track) {
                sender.track.stop(); // Stop the media track
            }
        });

        // Close the peer connection
        peerConnection.close();
        peerConnection = null; // Reset the peer connection for future streams
        console.log("Peer connection closed and reset.");
    }
}

// document.getElementById('stopStream').addEventListener('click', () => {
//     stopPeerConnection()
//     if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//     }

//     // Emit stop live stream and trigger upload
//     const stopStreamData = {
//         userId: userId,
//         location: 'FUTO Main Gate',
//         description: 'Robbery in progress',  // Example data
//     };
//     socket.emit('stopLiveStream', stopStreamData);
// });


// Function to capture media stream as a Blob and send to the server
function captureAndUploadStream() {
    // Check if localStream is defined and active
    if (localStream && localStream.active) {
        const mediaRecorder = new MediaRecorder(localStream);
        const chunks = [];

        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = function () {
            const videoBlob = new Blob(chunks, { type: 'video/webm' });
            const formData = new FormData();
            formData.append('video', videoBlob, 'livestream.webm');

            fetch('http://localhost:4000/uploadVideoStream', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Video uploaded successfully:', data);
                })
                .catch(error => {
                    console.error('Error uploading video:', error);
                });
        };

        // Start recording and stop after 10 seconds for testing (this can be modified)
        mediaRecorder.start();
        setTimeout(() => {
            mediaRecorder.stop();
        }, 10000);
    } else {
        console.error("Local stream is not active or invalid. Check if getUserMedia was successful.");
        console.log("localStream:", localStream); // Log the localStream status
    }
}


document.getElementById('stopStream').addEventListener('click', () => {
    stopPeerConnection();
    captureAndUploadStream(); // Call the capture and upload function when stopping the stream
});