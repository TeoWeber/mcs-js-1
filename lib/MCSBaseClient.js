'use strict';

if (typeof WebSocket === 'undefined') {
  var ws = require('ws');
} else {
  var ws = WebSocket;
}

const MCSReceiver = require('./messages/MCSReceiver');
const MCSSender = require('./messages/MCSSender');
const MCSBase = require('./MCSBase');

/**
 * This class handles basic functionality for the MCS client
 * @extends {module:mcs-js.MCSBase} MCSBase
 * @memberof module:mcs-js
 * @fires {@link module:mcs-js#event:open open}
 */
class MCSBaseClient extends MCSBase {
/**
 * Create a basic MCS client
 * @param {external:WebSocket} [ws] An existent WebSocket connection
 */
  constructor (ws) {
    super();
    this._setupConnection(ws);
  }

  /**
   * Send message over the existing connection
   * @param  {module:mcs-js.MCSMessage} message The current message
   */
  send(message) {
    this._sender.sendMessage(message);
  }

  /**
   * Creates a new WebSocket connection
   * @param  {String} uri The WebSocket URI of the Media Control Server
   */
  createConnection(uri) {
    var websocket = new ws(uri);
    this._setupConnection(websocket);
  }

  /**
   * Close current WebSocket connection
   */
  closeConnection() {
    var _self = this;
    if (_self._ws) {
      _self._ws.close();
    }
  }

  _setupConnection(ws) {
    var _self = this;
    if (ws && typeof(ws) === 'object') {
      if (ws.readyState === ws.OPEN) {
        _self._initReceivers(ws);
      } else {
        ws.addEventListener('open', function () {
          _self._initReceivers(ws);
        });

        ws.addEventListener('close', () => {
          _self.emit('close');
        });
      }
      _self._ws = ws;
    }
  }

  _initReceivers (client) {
    var _self = this;
    _self._initReceiver(client);
    _self._initSender(client);
    _self.emit('open');
  }

  _initReceiver(client) {
    var _self = this;
    var receiver = new MCSReceiver(client);

    receiver.on('api', function (name, args) {
      _self.emit(name, args);
    });
  }

  _initSender(client) {
    this._sender = new MCSSender(client);
  }
}

module.exports = MCSBaseClient;
