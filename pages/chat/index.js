import {Fragment, useEffect, useRef, useState} from "react";


export default function chat() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const inputRef = useRef();

  const [offer, setOffer] = useState();
  const [answer, setAnswer] = useState();

  const [localConnection, setLocalConnection] = useState();
  const [localSignaling, setLocalSignaling] = useState();
  const [remoteSignaling, setRemoteSignaling] = useState();

  //const [localDescription, setLocalDescription] = useState();
  //const [remoteDescription, setRemoteDescription] = useState();

  function setLocalDescription() {
    localConnection.setLocalDescription(JSON.parse(inputRef.current.value)).then(e => console.log("Local Description setted"));
  }

  function setRemoteDescription() {
    const description = JSON.parse(inputRef.current.value);
    localConnection.setRemoteDescription(description).then(e => console.log("Remote Description setted"));
    /*if ( description.type === 'offer') {
      localConnection.createAnswer().then(e => setAnswer(e));
      localConnection.ondatachannel = e => {
        const remote = e.channel;
        remote.onmessage = e => console.log("Remote New Message");
        remote.onopen = e => console.log("Open");
        setLocalSignaling(remote);
      }
    }*/
  }

  function setOfferInput () {
    setOffer(JSON.parse(inputRef.current.value))
  }

  function setAnswerInput () {
    setAnswer(JSON.parse(inputRef.current.value))
  }

  function imOffer() {
    localConnection.onicecandidate = e =>  {
      console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
      console.log(JSON.stringify(localConnection.localDescription))
    }
    localConnection.oniceconnectionstatechange = e => console.log(e);
    localConnection.onconnectionstatechange = e => console.log(`OnConnectionStateChange ${JSON.stringify(e)}`);
    localConnection.onsignalingstatechange = e => console.log(`OnSignalingStateChange ${JSON.stringify(e)}`);

    const sendChannel = localConnection.createDataChannel("sendChannel");
    sendChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
    sendChannel.onopen = e => console.log("open!!!!");
    sendChannel.onclose = e => console.log("closed!!!!!!");


    localConnection.createOffer().then(o => localConnection.setLocalDescription(o) )
  }

  async function imAnswer() {

    localConnection.onicecandidate = e =>  {
      console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
      console.log(JSON.stringify(localConnection.localDescription) )
    }


    localConnection.ondatachannel= event => {

      const receiveChannel = event.channel;
      receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
      receiveChannel.onopen = e => console.log("open!!!!");
      receiveChannel.onclose =e => console.log("closed!!!!!!");
      localConnection.channel = receiveChannel;

    }

    localConnection.setRemoteDescription(offer).then(a=>console.log("done"))

//create answer
    localConnection.createAnswer().then(a => localConnection.setLocalDescription(a)).then(a=>
      console.log(JSON.stringify(localConnection.localDescription)))
  }

  function generateOffer() {
    const signaling = localConnection.createDataChannel("chat" ); // handles JSON.stringify/parse
    localConnection.createOffer().then(e => setOffer(e));
    signaling.onopen = e => console.log("Open");
    signaling.onmessage = e => console.log("New Message");
    setLocalSignaling(signaling);
  }

  useEffect(() =>  {
    const configuration = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
    const lc = new RTCPeerConnection();

    const constraints = {audio: true, video: true};
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;
    let localStream;

    async function loadLocalMedia() {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideo.srcObject = stream;
      localStream = stream;
    }


    setLocalConnection(lc);

    loadLocalMedia();
// send any ice candidates to the other peer
    console.log("log")
    /*
    lc.onicecandidate = e => console.log("Candidate" + JSON.stringify(e));
    lc.oniceconnectionstatechange = e => console.log(e);
    lc.onconnectionstatechange = e => console.log(`OnConnectionStateChange ${JSON.stringify(e)}`);
    lc.onsignalingstatechange = e => console.log(`OnSignalingStateChange ${JSON.stringify(e)}`);


*/
  },[])

  useEffect(() => console.log(localConnection));

  return (
    <Fragment>
      <h1>Realtime communication with WebRTC</h1>
      <video id="localVideo" autoPlay playsInline ref={localVideoRef} muted />
      <video id="remoteVideo" autoPlay playsInline ref={remoteVideoRef}/>

      <div>
        <h2>Offer</h2>
        <div>{!!offer && JSON.stringify(offer)}</div>
        <h2>Answer</h2>
        <div>{!!answer && JSON.stringify(answer)}</div>
        <div>
          <input type={"text"} ref={inputRef}/>
        </div>
        <button onClick={setLocalDescription}>Set Local</button>
        <button onClick={setRemoteDescription}>Set Remote</button>
        <button onClick={setOfferInput}>Set Offer</button>
        <button onClick={setAnswerInput}>Set Answer</button>
        <button onClick={generateOffer}>Generate Offer</button>
      </div>
      <div>
        <button onClick={imOffer}>Im Offer</button>
        <button onClick={imAnswer}>Im Answer</button>
      </div>
    </Fragment>
  )
}
