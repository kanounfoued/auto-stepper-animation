import styled from 'styled-components';
import { StyledStick } from '../Stick/style';

export const DirectionContainer = styled.div`
  position: relative;
`;

export const UpStick = styled(StyledStick)`
  transform: translate(-30px, -45px) rotateZ(90deg);
  & #stick-4 {
    transform-origin: right center;
  }
`;

export const DownStick = styled(StyledStick)`
  transform: translate(-30px, 45px) rotateZ(270deg);
  & #stick-6 {
    transform-origin: right center;
  }
`;

export const CenterStick = styled(StyledStick)``;
