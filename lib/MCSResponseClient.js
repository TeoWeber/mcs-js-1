'use strict';

const MCSBaseClient = require('./MCSBaseClient');

const JoinedMessage = require('./messages/joined');
const LeftMessage = require('./messages/left');
const PublishedAndSubscribed = require('./messages/publishedAndSubscribed');
const UnpublishedAndUnsubscribed = require('./messages/unpublishedAndUnsubscribed');
const RoomsList = require('./messages/roomsList');
const UsersList = require('./messages/usersList');
const UserMedias = require('./messages/userMedias');
const UserJoined = require('./messages/userJoined');
const UserLeft = require('./messages/userLeft');
const Muted = require('./messages/muted');
const Unmuted = require('./messages/unmuted');
const StartTalkingMessage = require('./messages/startTalking');
const StopTalkingMessage = require('./messages/stopTalking');
const MediaConnected = require('./messages/mediaConnected');
const MediaDisconnected = require('./messages/mediaDisconnected');
const VolumeChanged = require('./messages/volumeChanged');
const Connected = require('./messages/connected');
const Disconnected = require('./messages/disconnected');
const Published = require('./messages/published');
const Unpublished = require('./messages/unpublished');
const Subscribed = require('./messages/subscribed');
const Unsubscribed = require('./messages/unsubscribed');
const IceCandidateAdded = require('./messages/iceCandidateAdded');
const OnIceCandidate = require('./messages/onIceCandidate');
const MediaState = require('./messages/mediaState');
const RoomCreated = require('./messages/roomCreated');
const RoomDestroyed = require('./messages/roomDestroyed');
const LayoutChanged = require('./messages/layoutChanged');
const ConferenceFloorChanged = require('./messages/conferenceFloorChanged');
const ContentFloorChanged = require('./messages/contentFloorChanged');
const ConferenceFloor = require('./messages/conferenceFloor');
const ContentFloor = require('./messages/contentFloor');
const RecordingStarted = require('./messages/recordingStarted');
const RecordingStopped = require('./messages/recordingStopped');
const ErrorMessage = require('./messages/error');
const CurrentStrategy = require('./messages/currentStrategy');
const DTMFSent = require('./messages/dtmfSent');
const DTMFReceived = require('./messages/dtmfReceived');
const SubscribedTo = require('./messages/subscribedTo');
const KeyframeRequested = require('./messages/keyframeRequested');
const KeyframeNeeded = require('./messages/keyframeNeeded');
const BitrateChange = require('./messages/bitrateChange');
const GetMediasResponse =  require('./messages/getMediasResponse');

/**
 * This class represents a client in server's context. It is used to
 * send/receive data from a single client
 * @extends module:mcs-js.MCSBaseClient
 * @memberof module:mcs-js
 * @fires {@link module:mcs-js#event:join join}
 */
class MCSResponseClient extends MCSBaseClient {
  /**
   * Create a client for the Media Control Server given an existent connection
   * @param {external:WebSocket} [ws] An existent WebSocket connection
   */
  constructor(ws) {
    super(ws);
    this._id = ws && ws.req && ws.req.headers ?
      ws.req.headers['sec-websocket-key'] : null;
  }

  /**
   * Return the current client's ID
   * @return {String} The id of this client
   */
  get id() {
    return this._id;
  }

  /**
   * {@link module:mcs-js#event:join Join} response for MCS room
   * @param  {String} userId The id of the user
   */
  joined(userId, params) {
    if (!userId || typeof (userId) !== 'string') {
      throw (new Error('invalid userId'));
    }

    const message = new JoinedMessage(userId, params);

    if (message) {
      this.send(message);
    }
  }

  /**
   * {@link module:mcs-js#event:leave Leave} response for MCS room
   */
  left(userId, params) {
    const message = new LeftMessage(userId, params);

    if (message) {
      this.send(message);
    }
  }

  /**
   * {@link module:mcs-js#event:publishAndSubscribe PublishAndSubscribe}
   *  response for MCS room
   * @param  {String} mediaId The media's unique id in media server's context
   * @param  {String} sdp The Session Descriptor for this media session
   */
  publishedAndSubscribed(mediaId, descriptor, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }

    if (!descriptor || typeof (descriptor) !== 'string') {
      throw new Error('Error : Invalid SDP');
    }

    var pubedAndSubedMessage = new PublishedAndSubscribed(mediaId, descriptor, params);
    if (pubedAndSubedMessage) {
      this.send(pubedAndSubedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:unpublishedAndUnsubscribed
   *  UnpublishAndUnsubscribe} response for MCS room
   */
  unpublishedAndUnsubscribed() {
    var unpubedAndUnsubedMessage = new UnpublishedAndUnsubscribed();
    if (unpubedAndUnsubedMessage) {
      this.send(unpubedAndUnsubedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:getRooms GetRooms} response for MCS room
   *  @param  {Array<Object>} rooms An array of roomIds regarding open rooms
   */
  roomsList(roomsList, params) {
    if (!roomsList || typeof roomsList !== 'object') {
      throw new Error('Error: Invalid rooms list object');
    }

    const roomsListMessage = new RoomsList(roomsList, params);
    if (roomsListMessage) {
      this.send(roomsListMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:getUsers GetUsers} response for MCS room
   *  @param  {Array<Object>} usersList The user objects of the room in the MCS
   */
  usersList(usersList, params) {
    if (!usersList || typeof usersList !== 'object') {
      throw new Error('Error: Invalid users list object');
    }

    let usersListMessage = new UsersList(usersList, params);
    if (usersListMessage) {
      this.send(usersListMessage);
    }
  }

   /**
   * {@link module:mcs-js#event:getUserMedias GetUserMedias} response for MCS room
   *  @param  {Array<Object>} userMedias The media objects of the user in the MCS
   */
  userMedias(userMedias, params) {
    if (!userMedias || typeof userMedias !== 'object') {
      throw new Error('Error: Invalid user medias object');
    }

    let userMediasMessage = new UserMedias(userMedias, params);
    if (userMediasMessage) {
      this.send(userMediasMessage);
    }
  }

  /**
   * @param  {Object} user The user object that joined the mcs
   */
  userJoined(roomId, user) {
    if (!roomId || typeof roomId !== 'string') {
      throw new Error('Error: Invalid user joined roomId');
    }

    if (!user || typeof user !== 'object') {
      throw new Error('Error: Invalid user joined object');
    }

    let userJoinedMessage = new UserJoined(roomId, user);
    if (userJoinedMessage) {
      this.send(userJoinedMessage);
    }
  }

  /**
   * @param  {Object} user The user object that left the mcs
   */
  userLeft(roomId, user) {
    if (!roomId || typeof roomId !== 'string') {
      throw new Error('Error: Invalid user left roomId');
    }

    if (!user || typeof user !== 'string') {
      throw new Error('Error: Invalid user left string');
    }

    let userLeftMessage = new UserLeft(roomId, user);
    if (userLeftMessage) {
      this.send(userLeftMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:mute Mute} response for MCS room
   * @param  {String} mediaId The id of the media that has been muted
   */
  muted(mediaId) {
    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Error: Invalid muted mediaId');
    }

    let mutedMessage = new Muted(mediaId);
    if (mutedMessage) {
      this.send(mutedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:unmute Unmute} response for MCS room
   * @param  {String} mediaId The id of the media that has been unmuted
   */
  unmuted(mediaId) {
    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Error: Invalid unmuted mediaId');
    }

    let unmutedMessage = new Unmuted(mediaId);
    if (unmutedMessage) {
      this.send(unmutedMessage);
    }
  }

  startTalking (room, user, mediaId) {
    if (!room || typeof(room) !== 'string') {
      throw new Error('Error : invalid room');
    }

    if (!user || typeof(user) !== 'string') {
      throw new Error('Error : invalid user');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    const message =
        new StartTalkingMessage(room, user, mediaId);

    if (message) {
      this.send(message);
    }
  }

  stopTalking (room, user, mediaId) {
    if (!room || typeof(room) !== 'string') {
      throw new Error('Error : invalid room');
    }

    if (!user || typeof(user) !== 'string') {
      throw new Error('Error : invalid user');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    const message =
        new StopTalkingMessage(room, user, mediaId);

    if (message) {
      this.send(message);
    }
  }

  /**
   * @param  {String} mediaId The id of the media connected
   * @param  {String} userId The id of the user that has the media
   * @param  {String} name name of the media
   * @param  {Boolean} muted mute state of the media (true/false)
   * @param  {String} flowType type of flow in the media (AUDIO/VIDEO)
   * @param  {String} flowDirection direction of the flow in the media (SENDONLY/RECVONLY/SENDRECV)
   */
  mediaConnected(roomId, media) {
    if (!roomId || typeof (roomId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }


    let mediaConnectedMessage = new MediaConnected(roomId, media);
    if (mediaConnectedMessage) {
      this.send(mediaConnectedMessage);
    }
  }

  /**
  @param  {String} mediaId The id of the media that disconnected
   */
  mediaDisconnected(roomId, mediaId) {
    if (!roomId || typeof (roomId) !== 'string') {
      throw new Error('Error : Invalid room ID');
    }

    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }

    let mediaDisconnectedMessage = new MediaDisconnected(roomId, mediaId);
    if (mediaDisconnectedMessage) {
      this.send(mediaDisconnectedMessage);
    }
  }

   /**
   * {@link module:mcs-js#event:setVolume SetVolume} response for MCS room
   * @param  {String} mediaId The id of the related media
   * @param  {Number} volume New volume of the media
   */
  volumeChanged(mediaId, volume) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }
    if (volume === null || typeof (volume) !== 'number') {
      throw new Error('Error : Invalid volume');
    }

    let volumeChangedMessage = new VolumeChanged(mediaId, volume);
    if (volumeChangedMessage) {
      this.send(volumeChangedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:connect Connect} response for MCS room
   *  @param  {String} sourceId Id of the media source connection
   *  @param  {Array<String>} sinkIds Id of one or more media sinks of the connection
   */
  connected(sourceId, sinkIds) {
    if (!sourceId || typeof (sourceId) !== 'string') {
      throw new Error('Error : Invalid Source Media ID');
    }
    if (sinkIds === null || typeof (sinkIds) !== 'object') {
      throw new Error('Error : Invalid Sink Media IDs');
    }
    sinkIds.forEach(sinkId => {
      if (sinkId === null || typeof (sinkId) !== 'string') {
        throw new Error('Error : Invalid Sink Media ID');
      }
    });

    let connectedMessage = new Connected(sourceId, sinkIds);
    if (connectedMessage) {
      this.send(connectedMessage);
    }
  }

    /**
   * {@link module:mcs-js#event:disconnect Disconnect} response for MCS room
   *  @param  {String} sourceId Id of the media source connection
   *  @param  {Array<String>} sinkIds Id of one or more media sinks of the connection
   */
  disconnected(sourceId, sinkIds) {
    if (!sourceId || typeof (sourceId) !== 'string') {
      throw new Error('Error : Invalid Source Media ID');
    }
    if (sinkIds === null || typeof (sinkIds) !== 'object') {
      throw new Error('Error : Invalid Sink Media IDs');
    }
    sinkIds.forEach(sinkId => {
      if (sinkId === null || typeof (sinkId) !== 'string') {
        throw new Error('Error : Invalid Sink Media ID');
      }
    });

    let disconnectedMessage = new Disconnected(sourceId, sinkIds);
    if (disconnectedMessage) {
      this.send(disconnectedMessage);
    }
  }

  // TODO docs
  published(mediaId, descriptor, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }

    const message = new Published(mediaId, descriptor, params);
    if (message) {
      this.send(message);
    }
  }

  // TODO docs
  unpublished(userId, mediaId, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }

    if (!userId || typeof (userId) !== 'string') {
      throw new Error('Error : Invalid User ID');
    }

    const message = new Unpublished(userId, mediaId, params);
    if (message) {
      this.send(message);
    }
  }

  // TODO docs
  subscribed(mediaId, descriptor, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }

    const message = new Subscribed(mediaId, descriptor, params);
    if (message) {
      this.send(message);
    }
  }

  // TODO docs
  unsubscribed(userId, mediaId, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw new Error('Error : Invalid Media ID');
    }

    if (!userId || typeof (userId) !== 'string') {
      throw new Error('Error : Invalid User ID');
    }

    const message = new Unsubscribed(userId, mediaId, params);
    if (message) {
      this.send(message);
    }
  }

  /*
   * TODO docs
   */
  iceCandidateAdded (mediaId, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw (new Error('invalid mediaId'));
    }

    const message = new IceCandidateAdded(mediaId, params);
    if (message) {
      this.send(message);
    }
  }

  /*
   * TODO docs
   */
  onIceCandidate (mediaId, candidate, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw (new Error('invalid mediaId'));
    }

    if(!candidate || typeof candidate !== 'object') {
      throw (new Error('invalid ICE candidate '  + typeof candidate));
    }

    const message = new OnIceCandidate(mediaId, candidate, params);

    if (message) {
      this.send(message);
    }
  }

  /*
   * TODO docs
   */
  mediaState (mediaId, state, params) {
    if (!mediaId || typeof (mediaId) !== 'string') {
      throw (new Error('invalid mediaId'));
    }

    if(!state || typeof state !== 'object') {
      throw (new Error('invalid media state'  + typeof state));
    }

    const message = new MediaState(mediaId, state);

    if (message) {
      this.send(message);
    }
  }

  /*
   * TODO docs
   */
  roomCreated (room) {
    if (!room || typeof (room) !== 'string') {
      throw (new Error('invalid room info'));
    }
    const message = new RoomCreated(room);

    if (message) {
      this.send(message);
    }
  }

  /*
   * TODO docs
   */
  roomDestroyed (roomId) {
    if (!roomId || typeof (roomId) !== 'string') {
      throw (new Error('invalid roomId'));
    }

    const message = new RoomDestroyed(roomId);

    if (message) {
      this.send(message);
    }
  }

  /*
   * @param {String} roomId
   * @param {object} params
   */
  conferenceFloorChanged (roomId, params = {}) {
    const { floor, previousFloor } = params;

    if (!roomId || typeof (roomId) !== 'string') {
      throw (new Error('invalid roomId'));
    }

    if (floor && typeof (floor) !== 'object') {
      throw (new Error('invalid floor media'));
    }

    if (previousFloor && typeof (previousFloor) !== 'object') {
      throw (new Error('invalid previousFloor'));
    }

    const message = new ConferenceFloorChanged(roomId, floor, previousFloor, params);

    if (message) {
      this.send(message);
    }
  }

  /**
   * @param {String} roomId
   * @param {object} params
   */
  contentFloorChanged (roomId, params = {}) {
    const { floor, previousFloor } = params;

    if (!roomId || typeof (roomId) !== 'string') {
      throw (new Error('invalid roomId'));
    }

    if (floor && typeof (floor) !== 'object') {
      throw (new Error('invalid floor media'));
    }

    if (previousFloor && typeof (previousFloor) !== 'object') {
      throw (new Error('invalid previousFloor'));
    }

    const message = new ContentFloorChanged(roomId, floor, previousFloor, params);

    if (message) {
      this.send(message);
    }
  }

  /**
   * @param {String} roomId
   * @param {object} params
   */
  conferenceFloor(roomId, params) {
    const { floor, previousFloor } = params;

    if (!roomId || typeof (roomId) !== 'string') {
      throw (new Error('invalid roomId'));
    }

    if (floor && typeof (floor) !== 'object') {
      throw (new Error('invalid floor media'));
    }

    if (previousFloor && typeof (previousFloor) !== 'object') {
      throw (new Error('invalid previousFloor'));
    }

    const message = new ConferenceFloor(roomId, floor, previousFloor, params);
    if (message) {
      this.send(message);
    }
  }

  /**
   * @param {String} roomId
   * @param {object} params
   */
  contentFloor (roomId, params) {
    const { floor, previousFloor } = params;

    if (!roomId || typeof (roomId) !== 'string') {
      throw (new Error('invalid roomId'));
    }

    if (floor && typeof (floor) !== 'object') {
      throw (new Error('invalid floor media'));
    }

    if (previousFloor && typeof (previousFloor) !== 'object') {
      throw (new Error('invalid previousFloor'));
    }

    const message = new ContentFloor(roomId, floor, previousFloor, params);

    if (message) {
      this.send(message);
    }
  }

  /**
   * @param {String} recordingId The media ID of the recording session
   * @param {object} params Additional optional parameters
   */
  recordingStarted(recordingId, params) {
    if (!recordingId || typeof (recordingId) !== 'string') {
      throw new Error('Error : Invalid recording ID');
    }

    const message = new RecordingStarted(recordingId, params);
    if (message) {
      this.send(message);
    }
  }

  /**
   * @param {String} recordingId The media ID of the recording session
   * @param {object} params Additional optional parameters
   */
  recordingStopped(recordingId, params) {
    if (!recordingId || typeof (recordingId) !== 'string') {
      throw new Error('Error : Invalid recording ID');
    }

    const message = new RecordingStopped(recordingId, params);
    if (message) {
      this.send(message);
    }
  }

  /**
   * @param  {String} identifier The id of the object to which the strategy relates to
   * @param  {String} strategy Active strategy for the identifier object
   */
  currentStrategy (identifier, strategy, params) {
    if (!identifier || typeof (identifier) !== 'string') {
      throw (new Error('invalid identifier'));
    }

    if (!strategy || typeof (strategy) !== 'string') {
      throw (new Error('invalid strategy'));
    }

    const message = new CurrentStrategy(identifier, strategy);

    if (message) {
      this.send(message);
    }
  }

  /**
   * @param  {String} mediaId The mediaId of the object to which the DTMF tone was sent
   * @param  {Number} tone DTMF tone sent to mediaId
   */
  dtmfSent (mediaId, tone, params) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    if (!tone || (typeof tone !== 'number' && typeof tone !== 'string')) {
      throw new Error('Error: invalid tone');
    }

    const message = new DTMFSent(mediaId, tone, params);

    if (message) {
      return this.send(message);
    }
  }

  /**
   * @param  {String} mediaId The mediaId of the object which received a DTMF tone
   * @param  {Number} tone DTMF tone received by mediaId
   */
  dtmfReceived (mediaId, tone, params) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    if (!tone || (typeof tone !== 'number' && typeof tone !== 'string')) {
      throw new Error('Error: invalid tone');
    }

    const message = new DTMFReceived(mediaId, tone, params);

    if (message) {
      return this.send(message);
    }
  }

  /**
   * @param  {String} mediaId The mediaId to listen for source media changes
   * @param  {Object} sourceMediaInfo A media info object of the new source media
   */
  subscribedTo (mediaId, sourceMediaInfo) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    if (!sourceMediaInfo || typeof (sourceMediaInfo) !== 'object') {
      throw new Error('Error: invalid sourceMediaInfo');
    }

    const message = new SubscribedTo(mediaId, sourceMediaInfo);

    if (message) {
      return this.send(message);
    }
  }

  /**
   * @param  {String} mediaId The mediaId to listen for keyframe requests
   */
  keyframeNeeded (mediaId) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    const message = new KeyframeNeeded(mediaId);

    if (message) {
      return this.send(message);
    }
  }

  /**
   * @param  {String} mediaId The mediaId to which a keyframe was requested.
   */
  keyframeRequested (mediaId) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    const message = new KeyframeRequested(mediaId);

    if (message) {
      return this.send(message);
    }
  }

  /**
   * TODO docs
   */
  bitrateChange (mediaSessionId, suggestedBitrates, descriptor) {
    if (!mediaSessionId || typeof(mediaSessionId) !== 'string') {
      throw new Error('Error : invalid mediaSessionId');
    }

    const message = new BitrateChange(mediaSessionId, suggestedBitrates, descriptor);

    if (message) {
      return this.send(message);
    }
  }

  /**
   * TODO docs
   */
  getMediasResponse (medias, options) {
    if (!medias || typeof medias !== 'object') {
      throw new Error('Error: Invalid user medias object');
    }

    const message = new GetMediasResponse(medias, options);
    if (message) {
      this.send(message);
    }
  }

  /**
   * @param {String} roomId
   * @param {object} params
   */
  layoutChanged (roomId, layoutId, params) {
    if (!roomId || typeof (roomId) !== 'string') {
      throw (new Error('invalid roomId'));
    }

    if (typeof (layoutId) !== 'number') {
      throw (new Error('invalid layoutId'));
    }

    const message = new LayoutChanged(roomId, layoutId, params);

    if (message) {
      this.send(message);
    }
  }

  /*
   * TODO docs
   */
  error (response, params) {
    if (!response || typeof (response) !== 'object') {
      throw (new Error('invalid error response'));
    }

    const message = new ErrorMessage(response, params);

    if (message) {
      this.send(message);
    }
  }

}

/**
 * @ignore
 */
MCSResponseClient.prototype.send; // jshint ignore:line

/**
 * @ignore
 */
MCSResponseClient.prototype.createConnection; // jshint ignore:line

module.exports = MCSResponseClient;
