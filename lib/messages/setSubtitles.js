'use strict';

const MCSMessage = require('./MCSMessage');
const C = require('../constants');

class setSubtitles extends MCSMessage {
  constructor(roomId, subtStatus) {
    super(C.SET_SUBTITLES);
    this.body.roomId = roomId;
    this.body.subtStatus = subtStatus;
  }
}

module.exports = setSubtitles;
