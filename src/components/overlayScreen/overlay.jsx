import React from "react";
import { useState } from "react";
import './overlay.css'



function Overlay({alertFlag, alertMessage, setAlertFlag}){
    // const {alertFlag, alertMessage} = this.props
    return(
        alertFlag && (
            <div className="alert-overlay">
            <div className="overlay-content">
                <p>{alertMessage}</p>
                <button onClick={() => setAlertFlag(false)}>Close</button>
            </div>
            </div>
        )
    )
}

export default Overlay;