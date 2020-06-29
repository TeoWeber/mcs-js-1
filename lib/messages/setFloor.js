'use strict';

const MCSMessage = require('./MCSMessage');
const C = require('../constants');

class setFloor extends MCSMessage {
  constructor(roomId, floorId) {
    super(C.SET_FLOOR);
    this.body.roomId = roomId;
    this.body.floorId = floorId;
  }
}

module.exports = setFloor;
