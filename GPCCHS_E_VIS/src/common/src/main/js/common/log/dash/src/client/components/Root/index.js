import React from 'react';
import io from 'socket.io-client';

import MemoryUsage from '../MemUsage';
import LoopLatency from '../LoopLatency';
import Logs from '../Log';

const socket = io.connect(':8888');

export default () => (
  <div>
    <h1>Dashboard</h1>
    <MemoryUsage socket={socket} />
    <LoopLatency socket={socket} />
    <Logs socket={socket} />
  </div>
);
