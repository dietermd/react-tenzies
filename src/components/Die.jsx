import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  const pips = Array(props.value).fill(<span className="die-pip"></span>)

  return (
    <div className="die-face" style={style} onClick={props.holdDie}>
      {pips}
    </div>
  )
}