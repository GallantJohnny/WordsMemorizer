import React from 'react';
import { Container } from 'reactstrap';

function ScoreIndicator(props) {
  let bgColor = props.isCorrect ? "green" : "red";
  bgColor = props.isAsked ? bgColor : "grey"
  const circleStyle = {
    height: "15px",
    width: "15px",
    backgroundColor: bgColor
  }
  return (
    <Container>
      <div className="rounded-circle shadow mx-auto" style={circleStyle}></div>
    </Container>
  );
}

export default ScoreIndicator;