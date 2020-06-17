import React from 'react';
import { Container } from 'reactstrap';

function Word(props) {
  let value = '0%';
  let classes = "mx-auto shadow-lg text-center py-2 px-0 rounded-lg";
  let transition = 'none';
  let bgColor = 'red';

  console.log(props.isCorrect);

  if (props.isAnswered) {
    transition = '1.5s';
    value = '100%';
    if (props.isAnswered && !props.isCorrect) {
      classes = classes.concat(' alert alert-danger');
    } else if (props.isAnswered && props.isCorrect) {
      classes = classes.concat(' alert alert-success');
      bgColor = 'green';
    };
  }

  const progreStyle = {
    height: '1px',
    width: value,
    margin: '5px 0 -8px 0',
    transition: transition,
    backgroundColor: bgColor
  }

  return (
    <Container className={classes} style={{ overflow: "hidden" }}>
      <div>{props.word}</div>
      <div style={progreStyle}></div>
    </Container>
  )
}

export default Word;