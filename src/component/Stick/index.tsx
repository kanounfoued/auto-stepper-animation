import React, { useState, useEffect, FC } from 'react';
import STICK_TYPE from '../../declaration_types/Stick';
import { StyledStick, AnimatedStick } from './style';

interface IPropTypes {
  stick: STICK_TYPE;
  active: boolean;
  style?: {
    width: string;
  };
}

const Stick: FC<IPropTypes> = (props) => {
  const { stick, active, style = {} } = props;

  const [isActive, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(active);
  }, [active]);

  return (
    <StyledStick style={style}>
      <AnimatedStick startColor={stick.startColor} endColor={stick.endColor} isActive={isActive} delay={stick.delay} />
    </StyledStick>
  );
};

export default Stick;
