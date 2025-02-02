'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../base/values');  /* jshint ignore:line */

var MediaRecordingList;
var MediaRecordingPage;
var MediaRecordingInstance;
var MediaRecordingContext;

/* jshint ignore:start */
/**
 * Initialize the MediaRecordingList
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @constructor Twilio.Media.V1.MediaRecordingList
 *
 * @param {Twilio.Media.V1} version - Version of the resource
 */
/* jshint ignore:end */
MediaRecordingList = function MediaRecordingList(version) {
  /* jshint ignore:start */
  /**
   * @function mediaRecording
   * @memberof Twilio.Media.V1#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Media.V1.MediaRecordingContext}
   */
  /* jshint ignore:end */
  function MediaRecordingListInstance(sid) {
    return MediaRecordingListInstance.get(sid);
  }

  MediaRecordingListInstance._version = version;
  // Path Solution
  MediaRecordingListInstance._solution = {};
  MediaRecordingListInstance._uri = `/MediaRecordings`;
  /* jshint ignore:start */
  /**
   * Streams MediaRecordingInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function each
   * @memberof Twilio.Media.V1.MediaRecordingList#
   *
   * @param {object} [opts] - Options for request
   * @param {media_recording.order} [opts.order] - The sort order of the list
   * @param {media_recording.status} [opts.status] - Status to filter by
   * @param {string} [opts.processorSid] - MediaProcessor to filter by
   * @param {string} [opts.sourceSid] - Source SID to filter by
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  MediaRecordingListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          callback(instance, onComplete);
        });

        if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        } else {
          onComplete();
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * Lists MediaRecordingInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Media.V1.MediaRecordingList#
   *
   * @param {object} [opts] - Options for request
   * @param {media_recording.order} [opts.order] - The sort order of the list
   * @param {media_recording.status} [opts.status] - Status to filter by
   * @param {string} [opts.processorSid] - MediaProcessor to filter by
   * @param {string} [opts.sourceSid] - Source SID to filter by
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MediaRecordingListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of MediaRecordingInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Media.V1.MediaRecordingList#
   *
   * @param {object} [opts] - Options for request
   * @param {media_recording.order} [opts.order] - The sort order of the list
   * @param {media_recording.status} [opts.status] - Status to filter by
   * @param {string} [opts.processorSid] - MediaProcessor to filter by
   * @param {string} [opts.sourceSid] - Source SID to filter by
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MediaRecordingListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Order': _.get(opts, 'order'),
      'Status': _.get(opts, 'status'),
      'ProcessorSid': _.get(opts, 'processorSid'),
      'SourceSid': _.get(opts, 'sourceSid'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new MediaRecordingPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of MediaRecordingInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Media.V1.MediaRecordingList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MediaRecordingListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new MediaRecordingPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a media_recording
   *
   * @function get
   * @memberof Twilio.Media.V1.MediaRecordingList#
   *
   * @param {string} sid - The SID that identifies the resource to fetch
   *
   * @returns {Twilio.Media.V1.MediaRecordingContext}
   */
  /* jshint ignore:end */
  MediaRecordingListInstance.get = function get(sid) {
    return new MediaRecordingContext(this._version, sid);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Media.V1.MediaRecordingList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  MediaRecordingListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  MediaRecordingListInstance[util.inspect.custom] = function inspect(depth,
      options) {
    return util.inspect(this.toJSON(), options);
  };

  return MediaRecordingListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the MediaRecordingPage
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @constructor Twilio.Media.V1.MediaRecordingPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {MediaRecordingSolution} solution - Path solution
 *
 * @returns MediaRecordingPage
 */
/* jshint ignore:end */
MediaRecordingPage = function MediaRecordingPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(MediaRecordingPage.prototype, Page.prototype);
MediaRecordingPage.prototype.constructor = MediaRecordingPage;

/* jshint ignore:start */
/**
 * Build an instance of MediaRecordingInstance
 *
 * @function getInstance
 * @memberof Twilio.Media.V1.MediaRecordingPage#
 *
 * @param {MediaRecordingPayload} payload - Payload response from the API
 *
 * @returns MediaRecordingInstance
 */
/* jshint ignore:end */
MediaRecordingPage.prototype.getInstance = function getInstance(payload) {
  return new MediaRecordingInstance(this._version, payload);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Media.V1.MediaRecordingPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
MediaRecordingPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

MediaRecordingPage.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the MediaRecordingContext
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @constructor Twilio.Media.V1.MediaRecordingInstance
 *
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {number} bitrate - The bitrate of the media
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {Date} dateUpdated -
 *          The ISO 8601 date and time in GMT when the resource was last updated
 * @property {number} duration - The duration of the MediaRecording
 * @property {media_recording.format} format - The format of the MediaRecording
 * @property {string} links - The URLs of related resources
 * @property {string} processorSid - The SID of the MediaProcessor
 * @property {string} resolution - The dimensions of the video image in pixels
 * @property {string} sourceSid -
 *          The SID of the resource that generated the original media
 * @property {string} sid - The unique string that identifies the resource
 * @property {number} mediaSize - The size of the recording media
 * @property {media_recording.status} status - The status of the MediaRecording
 * @property {string} statusCallback -
 *          The URL to which Twilio will send MediaRecording event updates
 * @property {string} statusCallbackMethod -
 *          The HTTP method Twilio should use to call the `status_callback` URL
 * @property {string} url - The absolute URL of the resource
 *
 * @param {V1} version - Version of the resource
 * @param {MediaRecordingPayload} payload - The instance payload
 * @param {sid} sid - The SID that identifies the resource to fetch
 */
/* jshint ignore:end */
MediaRecordingInstance = function MediaRecordingInstance(version, payload, sid)
                                                          {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.bitrate = deserialize.integer(payload.bitrate); // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.duration = deserialize.integer(payload.duration); // jshint ignore:line
  this.format = payload.format; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line
  this.processorSid = payload.processor_sid; // jshint ignore:line
  this.resolution = payload.resolution; // jshint ignore:line
  this.sourceSid = payload.source_sid; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.mediaSize = deserialize.integer(payload.media_size); // jshint ignore:line
  this.status = payload.status; // jshint ignore:line
  this.statusCallback = payload.status_callback; // jshint ignore:line
  this.statusCallbackMethod = payload.status_callback_method; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {sid: sid || this.sid, };
};

Object.defineProperty(MediaRecordingInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new MediaRecordingContext(this._version, this._solution.sid);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * remove a MediaRecordingInstance
 *
 * @function remove
 * @memberof Twilio.Media.V1.MediaRecordingInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MediaRecordingInstance
 */
/* jshint ignore:end */
MediaRecordingInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * fetch a MediaRecordingInstance
 *
 * @function fetch
 * @memberof Twilio.Media.V1.MediaRecordingInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MediaRecordingInstance
 */
/* jshint ignore:end */
MediaRecordingInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Media.V1.MediaRecordingInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
MediaRecordingInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

MediaRecordingInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the MediaRecordingContext
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @constructor Twilio.Media.V1.MediaRecordingContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} sid - The SID that identifies the resource to fetch
 */
/* jshint ignore:end */
MediaRecordingContext = function MediaRecordingContext(version, sid) {
  this._version = version;

  // Path Solution
  this._solution = {sid: sid, };
  this._uri = `/MediaRecordings/${sid}`;
};

/* jshint ignore:start */
/**
 * remove a MediaRecordingInstance
 *
 * @function remove
 * @memberof Twilio.Media.V1.MediaRecordingContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MediaRecordingInstance
 */
/* jshint ignore:end */
MediaRecordingContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({uri: this._uri, method: 'DELETE'});

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * fetch a MediaRecordingInstance
 *
 * @function fetch
 * @memberof Twilio.Media.V1.MediaRecordingContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MediaRecordingInstance
 */
/* jshint ignore:end */
MediaRecordingContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new MediaRecordingInstance(this._version, payload, this._solution.sid));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Media.V1.MediaRecordingContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
MediaRecordingContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

MediaRecordingContext.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  MediaRecordingList: MediaRecordingList,
  MediaRecordingPage: MediaRecordingPage,
  MediaRecordingInstance: MediaRecordingInstance,
  MediaRecordingContext: MediaRecordingContext
};
