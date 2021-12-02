import React, { useState } from 'react';
// Import the specific PicovoiceWorkerFactory for the spoken language used: in this case, English (en).
import { PicovoiceWorkerFactory } from '@picovoice/picovoice-web-en-worker';
import { usePicovoice } from '@picovoice/picovoice-web-react';
// import { PROCOMMANDS_CONTEXT } from '../../../../picovoice/ProCommands_context';
// import { ONE_OH_ONE_64 } from '../../../../picovoice/one_oh_one_64';

const RHN_CONTEXT_BASE64 = ""; /* Base64 representation of English-language `.rhn` file, omitted for brevity */

function VoiceWidget () {
  const [keywordDetections, setKeywordDetections] = useState([]);
  const [inference, setInference] = useState(null);

  const inferenceEventHandler = (rhinoInference) => {
    console.log(rhinoInference);
    setInference(rhinoInference);
  };

  const keywordEventHandler = (porcupineKeywordLabel) => {
    console.log(porcupineKeywordLabel);
    setKeywordDetections((x) => [...x, porcupineKeywordLabel]);
  };

  const {
    isLoaded,
    // isListening,
    isError,
    // errorMessage,
    // start,
    // resume,
    // pause,
    engine,
    errorMessage
  } = usePicovoice(
    PicovoiceWorkerFactory,
    {
      // "Picovoice" is one of the builtin wake words, so we merely need to ask for it by name.
      // To use a custom wake word, you supply the `.ppn` files in base64 and provide a label for it.
      porcupineKeyword: 'Picovoice',
      // porcupineKeyword: { base64: ONE_OH_ONE_64 },
      rhinoContext: { base64: RHN_CONTEXT_BASE64 },
      start: true
    },
    keywordEventHandler,
    inferenceEventHandler
  );

  return (
    <div className="voice-widget" style={{ minWidth: '500px', fontSize: '10px' }}>
      <span>Engine: {engine} | is loaded: {isLoaded ? 'yes' : 'no'} | is error: {isError ? 'yes' : 'no'} {errorMessage}</span>
      <br/>
      <span>Keyword Detections:</span>
      {keywordDetections.length > 0 && (
        <>
          {keywordDetections.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </>
      )}
      <br />
      <span>Latest Inference:</span>
      {JSON.stringify(inference)}
    </div>
  );
}
export default VoiceWidget;
