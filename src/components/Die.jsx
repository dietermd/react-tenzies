import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  return (
    <div className="die-face" style={style} onClick={props.holdDie}>
      <h2 className="die-value">{props.value}</h2>
    </div>
  )
}