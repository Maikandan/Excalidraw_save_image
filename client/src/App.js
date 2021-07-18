import React, { useState, useRef } from "react";
import Excalidraw, {
  exportToBlob
} from "@excalidraw/excalidraw";
import InitialData from "./initialData";

import "./styles.scss";
import initialData from "./initialData";

export default function App() {
  const excalidrawRef = useRef(null);

  const axios = require('axios');

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
 
  var isThisFirstRun = true;

  var old;

  function handleChange(event){
    if (event.handled !== true) 
        {
            event.handled = true;

                if(isThisFirstRun){
                  old = event;
                }
    
                if (isThisFirstRun || JSON.stringify(old) !== JSON.stringify(event)){
                  old = event;
                  isThisFirstRun = false;

                  setInterval(async () => {
                    const blob = await exportToBlob({
                      elements: excalidrawRef.current.getSceneElements(),
                      mimeType: "image/jpeg",
                      appState: {
                        ...initialData.appState
                      }
                    });
      
                    var newBlob = window.URL.createObjectURL(blob);
      
                    var slicedBlob = newBlob.slice(27);
      
                    var imageBlob = new File([blob], `${slicedBlob}.jpg`);
      
                    const formData = new FormData();
                    formData.append('photo', imageBlob);
      
                    const config = {
                      headers: {
                        'content-type': 'multipart/form-data',
                      },
                    };
      
                    const url = "http://localhost:9000/user/upload";
      
                    axios.post(url, formData, config).then((response) => {
                      console.log("Image Uploaded Successfully");
                    })
                    .catch((err) => {
                      console.log('err', err);
                    });
                  }, 10000)

                  return
                } else {
                  isThisFirstRun = false;
                  return
                }
        }
    
  }

  const updateScene = () => {
    const sceneData = {
      elements: [
        {
          type: "rectangle",
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: "oDVXy8D6rom3H1-LLH2-f",
          fillStyle: "hachure",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: "#c92a2a",
          backgroundColor: "transparent",
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
        },
      ],
      appState: {
        viewBackgroundColor: "#edf2ff",
      },
    };
    excalidrawRef.current.updateScene(sceneData);
  };

  return (
    <div className="App">
      <h1> Excalidraw Example</h1>
      <div className="button-wrapper">
        <button className="update-scene" onClick={updateScene}>
          Update Scene
        </button>
        <button
          className="reset-scene"
          onClick={() => {
            excalidrawRef.current.resetScene();
          }}
        >
          Reset Scene
        </button>
        <label>
          <input
            type="checkbox"
            checked={viewModeEnabled}
            onChange={() => setViewModeEnabled(!viewModeEnabled)}
          />
          View mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={zenModeEnabled}
            onChange={() => setZenModeEnabled(!zenModeEnabled)}
          />
          Zen mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={gridModeEnabled}
            onChange={() => setGridModeEnabled(!gridModeEnabled)}
          />
          Grid mode
        </label>
      </div>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          initialData={InitialData}
          onChange={handleChange}
          onCollabButtonClick={() =>
            window.alert("You clicked on collab button")
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
        />
      </div>
    </div>
  );
}