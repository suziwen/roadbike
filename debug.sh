#!/bin/bash
npm run clean
node --inspect-brk --no-lazy ~/.nvm/versions/node/v8.9.1/bin/gatsby develop
