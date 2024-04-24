#!/bin/bash

bitcoind -daemon 

echo ""
echo "getblockchaininfo:"
bitcoin-cli -rpcconnect=127.0.0.1 -rpcport=8332 -rpcuser='baklosan' -rpcpassword='Ua2xhPcTZAEys04HbbPgnNSz' getblockchaininfo
