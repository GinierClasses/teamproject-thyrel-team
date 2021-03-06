import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function DevNav() {
  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <h1>You're in DevNav</h1>
      {/* With react-router-dom it's not a good practive do don't use
          <Link /> but Rsuits alredy render a link */}
      <NavLink to="/">Dev nav</NavLink>
      <NavLink to="/r/start">Go Room Start</NavLink>
      <NavLink to="/r/write">Go Room Write</NavLink>
      <NavLink to="/r/draw">Go Room Draw</NavLink>
      <NavLink to="/r/lobby">Go Room Lobby</NavLink>
      <NavLink to="/r">Go Room</NavLink>
      <NavLink to="/home">Go home</NavLink>
      <NavLink to="/t">Go to TESTS pages</NavLink>
    </Box>
  );
}

function NavLink({ to, children }: any) {
  return (
    <Box
      p={1}
      bgcolor="background.default"
      m={1}
      borderRadius={2}
      border={1}
      borderColor="primary.main">
      <Link to={to} style={{ color: 'white' }}>
        {children}
      </Link>
    </Box>
  );
}
