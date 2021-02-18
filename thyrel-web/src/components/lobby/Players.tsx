import React from 'react';
import { useRoomContext } from '../../hooks/RoomProvider';
import Box from '../../styles/Box';
import PlayerCount from '../room/PlayerCount';
import PlayerCardList from './PlayerCardList';

export default function Players() {
  const { players } = useRoomContext();
  return (
    <Box flexDirection="column" alignItems="flex-end">
      <Box pr={8}>
        <PlayerCount count={players?.length || 0} max={12} />
      </Box>
      <PlayerCardList players={players} isKickable />
    </Box>
  );
}