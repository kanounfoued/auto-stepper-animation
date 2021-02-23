import styled from 'styled-components';

export const CircleContainer = styled.div`
  margin: 0 6px;
  position: relative;
`;

export const StyledCircle = styled.div`
  height: 30px;
  width: 30px;
  background-color: #b2bec3;
  border-radius: 50%;
  position: relative;

  & span {
    position: absolute;
    left: -72%;
    top: 40px;
    max-width: 72px;
    width: 72px;
    font-size: 12px;
    text-align: center;
  }
`;

export const AnimatedCircle = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  transform: ${(props) => (props.isActive ? 'scale(1)' : 'scale(0)')};
  transform-origin: center;
  transition: transform 200ms ease ${(props) => props.delay}s;
  background-image: linear-gradient(90deg, ${(props) => props.startColor} 24%, ${(props) => props.endColor} 72%);
`;
