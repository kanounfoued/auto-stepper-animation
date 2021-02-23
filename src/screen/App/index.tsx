import React, { FC, useState } from 'react';
import { states } from '../../constant/states';
import { AppContainer, ViewContainer } from './style';
import STATE_TYPE from '../../declaration_types/State';
import InitialSteps from '../../component/InitialSteps';

interface IPropTypes {}

const App: FC<IPropTypes> = () => {
  const [state, setState] = useState<STATE_TYPE>({ status: 'businessProposal', points: 40 });

  const updateState = (state: STATE_TYPE) => {
    setState(state);
  };

  return (
    <AppContainer>
      <ViewContainer>
        <InitialSteps state={state} />
      </ViewContainer>
    </AppContainer>
  );
};

export default App;
