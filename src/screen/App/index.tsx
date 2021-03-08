import React, { FC, useState } from 'react';
import { states } from '../../constant/states';
import { AppContainer, ViewContainer } from './style';
import STATE_TYPE from '../../declaration_types/State';
import InitialSteps from '../../component/InitialSteps';
import Direction from '../../component/Direction';

interface IPropTypes {}

const App: FC<IPropTypes> = () => {
  const [state, setState] = useState<STATE_TYPE>({ status: 'lost', points: 100 });

  const updateState = (e: any) => {
    setState(JSON.parse(e.target.value));
  };

  return (
    <AppContainer>
      <ViewContainer>
        <InitialSteps state={state} />
        <Direction state={state} />
      </ViewContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <select value={JSON.stringify(state)} onChange={updateState}>
          {states.map((stat) => {
            return <option value={JSON.stringify(stat)}>{stat.status}</option>;
          })}
        </select>
      </div>
    </AppContainer>
  );
};

export default App;
