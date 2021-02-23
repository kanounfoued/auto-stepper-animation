import React, { FC, useState } from 'react';
import { states, STATE_TYPE } from '../../constant/states';
import { AppContainer, ViewContainer } from './style';
interface IPropTypes {}

const App: FC<IPropTypes> = () => {
  const [state, setState] = useState<STATE_TYPE>({ status: 'qualified', points: 10 });

  const updateState = (state: STATE_TYPE) => {
    setState(state);
  };

  return (
    <AppContainer>
      <ViewContainer>App</ViewContainer>
    </AppContainer>
  );
};

export default App;
