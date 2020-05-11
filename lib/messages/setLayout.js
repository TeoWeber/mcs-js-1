'use strict';

const MCSMessage = require('./MCSMessage');
const C = require('../constants');

class setLayout extends MCSMessage {
  constructor(roomId, layoutId) {
    super(C.SET_LAYOUT);
    this.body.roomId = roomId
    this.body.layoutId = layoutId;
  }
}

module.exports = setLayout;
