'use strict';

const MCSMessage = require('./MCSMessage');
const C = require('../constants');

class layoutChanged extends MCSMessage {
  constructor(roomId, layoutId, params) {
    super(C.LAYOUT_CHANGED, null, params);
    this.body.roomId = roomId;
    this.body.layoutId = layoutId;
  }
}

module.exports = layoutChanged;
