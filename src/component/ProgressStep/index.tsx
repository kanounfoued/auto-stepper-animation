import React, { FC } from 'react';
import Stick from '../Stick';
import Circle from '../Circle';
import STATE_TYPE from '../../declaration_types/State';
import { ProgressStepContainer } from './style';
import { mockData } from './mock';

export interface IPropTypes {
  state: STATE_TYPE;
  isSuccess: boolean;
}

const ProgressSteps: FC<IPropTypes> = (props) => {
  const { state, isSuccess } = props;

  return (
    <ProgressStepContainer data-testid="progress-step-container">
      {mockData.map((shape, index) => {
        let startColor = shape.startColor;
        let endColor = shape.endColor;
        let active = true;

        if (!isSuccess || shape.points > state.points) {
          startColor = '#b2bec3';
          endColor = '#b2bec3';
          active = false;
        }

        if (shape.type === 'stick') {
          return <Stick key={index} style={shape.style} stick={{ ...shape, startColor, endColor }} active={active} />;
        }
        return <Circle key={index} circle={{ ...shape, startColor, endColor }} active={active} />;
      })}
    </ProgressStepContainer>
  );
};

export default ProgressSteps;
