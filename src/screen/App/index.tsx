import React, { FC, useState } from 'react';
import { states } from '../../constant/states';
import { AppContainer, ViewContainer } from './style';
import STATE_TYPE from '../../declaration_types/State';
import InitialSteps from '../../component/InitialSteps';
import Direction from '../../component/Direction';

interface IPropTypes {}

const App: FC<IPropTypes> = () => {
  const [state, setState] = useState<STATE_TYPE>({ status: 'lost', points: 100 });

  const updateState = (state: STATE_TYPE) => {
    setState(state);
  };

  return (
    <AppContainer>
      <ViewContainer>
        <InitialSteps state={state} />
        <Direction state={state} />
      </ViewContainer>
    </AppContainer>
  );
};

export default App;
