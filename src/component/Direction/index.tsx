import React, { FC, useState, useEffect } from 'react';
import Stick from '../Stick';
import STATE_TYPE from '../../declaration_types/State';
import { DirectionContainer, UpStick, DownStick, CenterStick } from './style';
import { successStick, problemStick, lostStick } from './mock';
import ProgressSteps from '../ProgressStep';
const SUCCESS_STATUS = ['interested', 'win', 'billsAccused', 'billsPaid', 'activated'];

export interface IPropTypes {
  state: STATE_TYPE;
}

const Direction: FC<IPropTypes> = (props) => {
  const { state } = props;

  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isProblem, setProblem] = useState<boolean>(false);
  const [isLost, setLost] = useState<boolean>(false);

  useEffect(() => {
    setSuccess(SUCCESS_STATUS.includes(state.status));
    setProblem(state.status === 'problem');
    setLost(state.status === 'lost');
  }, [state.status]);

  return (
    <DirectionContainer data-testid="direction-container">
      <UpStick isActive={isSuccess} style={{ width: '100px' }}>
        <Stick stick={successStick} active={isSuccess} style={{ width: 100 }} />
      </UpStick>
      <ProgressSteps isSuccess={isSuccess} state={state} />

      <CenterStick isActive={isProblem} style={{ width: '80px' }}>
        <Stick stick={problemStick} active={isProblem} style={{ width: 80 }} />
      </CenterStick>

      <DownStick isActive={isLost} style={{ width: '100px' }}>
        <Stick stick={lostStick} active={isLost} style={{ width: 100 }} />
      </DownStick>
    </DirectionContainer>
  );
};

export default Direction;
