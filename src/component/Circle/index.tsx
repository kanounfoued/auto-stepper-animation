import React, { FC, useState, useEffect } from 'react';
import CIRCLE_TYPE from '../../declaration_types/Circle';
import { CircleContainer, StyledCircle, AnimatedCircle } from './style';

interface IPropTypes {
  circle: CIRCLE_TYPE;
  active: boolean;
}

const Circle: FC<IPropTypes> = (props) => {
  const { circle, active } = props;
  const [isActive, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(active);
  }, [active]);

  return (
    <CircleContainer>
      <StyledCircle>
        <AnimatedCircle
          delay={circle.delay}
          startColor={circle.startColor}
          endColor={circle.endColor}
          isActive={isActive}
        />
        <span>{circle.title}</span>
      </StyledCircle>
    </CircleContainer>
  );
};

export default Circle;
