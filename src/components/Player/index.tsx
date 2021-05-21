import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import {
  Container,
  ButtonStyled,
  Overlay,
  Inner,
  Close,
} from './styles/Player';

export const PlayerContext = createContext({
  showPlayer: false,
  setShowPlayer: (showPlayer: boolean) => {},
});

const Player = ({ children, ...restProps }: { children: any }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
};

Player.Video = function PlayerVideo({
  src,
  ...restProps
}: {
  src: string;
}): React.ReactPortal | null {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay
          onClick={() => setShowPlayer(false)}
          data-testid="player"
          {...restProps}
        >
          <Inner>
            <video id="netflix-player" controls>
              <source src={src} type="video/mp4" />
            </video>
            <Close />
          </Inner>
        </Overlay>,
        document.body,
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return (
    <ButtonStyled onClick={() => setShowPlayer(!showPlayer)} {...restProps}>
      Play
    </ButtonStyled>
  );
};

export default Player;
