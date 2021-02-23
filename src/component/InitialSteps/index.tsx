import React, { FC } from 'react';
import Stick from '../Stick';
import Circle from '../Circle';
import STATE_TYPE from '../../declaration_types/State';
import { InitialStepContainer } from './style';
import { mockData } from './mock';

interface IPropTypes {
  state: STATE_TYPE;
}

const InitialSteps: FC<IPropTypes> = (props) => {
  const { state } = props;

  return (
    <InitialStepContainer>
      {mockData.map((shape, index) => {
        let startColor = shape.startColor;
        let endColor = shape.endColor;
        let active = true;

        if (shape.points > state.points) {
          startColor = '#b2bec3';
          endColor = '#b2bec3';
          active = false;
        }

        if (shape.type === 'circle') {
          return <Circle key={index} circle={{ ...shape, startColor, endColor }} active={active} />;
        } else if (shape.type === 'stick') {
          return <Stick key={index} stick={{ ...shape, startColor, endColor }} active={active} />;
        }
      })}
    </InitialStepContainer>
  );
};

export default InitialSteps;
