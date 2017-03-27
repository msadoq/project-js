// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    userName: (data.userName !== null && typeof data.userName !== 'undefined')
      ? { value: data.userName }
      : null,
    serverName: (data.serverName !== null && typeof data.serverName !== 'undefined')
      ? { value: data.serverName }
      : null,
    terminalId: (data.terminalId !== null && typeof data.terminalId !== 'undefined')
      ? { value: data.terminalId }
      : null,
    genericAccount: (data.genericAccount !== null && typeof data.genericAccount !== 'undefined')
      ? { value: data.genericAccount }
      : null,
    loginTime: (data.loginTime !== null && typeof data.loginTime !== 'undefined')
      ? { value: data.loginTime }
      : null,
    authID: (data.authID !== null && typeof data.authID !== 'undefined')
      ? { value: data.authID }
      : null,
  }),
  decode: data => ({
    userName: (data.userName !== null && typeof data.userName !== 'undefined')
      ? { type: 'string', value: data.userName.value }
      : undefined,
    serverName: (data.serverName !== null && typeof data.serverName !== 'undefined')
      ? { type: 'string', value: data.serverName.value }
      : undefined,
    terminalId: (data.terminalId !== null && typeof data.terminalId !== 'undefined')
      ? { type: 'string', value: data.terminalId.value }
      : undefined,
    genericAccount: (data.genericAccount !== null && typeof data.genericAccount !== 'undefined')
      ? { type: 'string', value: data.genericAccount.value }
      : undefined,
    loginTime: (data.loginTime !== null && typeof data.loginTime !== 'undefined')
      ? { type: 'time', value: data.loginTime.value.toNumber() }
      : undefined,
    authID: (data.authID !== null && typeof data.authID !== 'undefined')
      ? { type: 'blob', value: data.authID.value.toBuffer() }
      : undefined,
    referenceTimestamp: (data.loginTime !== null && typeof data.loginTime !== 'undefined')
        ? { type: 'time', value: data.loginTime.value.toNumber() }
        : undefined,
  }),
};

