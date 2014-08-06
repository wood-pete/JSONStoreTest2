

/**
 * ================================================================= 
 * Source file taken from :: jsonstore.js
 * ================================================================= 
 */

/**
 * @license
 * Licensed Materials - Property of IBM
 * 5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*globals WLJQ, WL_, cordova, sjcl */

/**
 * JSONStore Modules
 */

'use strict';

/**
Provides a namespace function for WL
@private
**/
var WL = WL || {};

WL.namespace = function (ns_string) {
	var parts = ns_string.split('.'),
	parent = WL,
	i;

	if (parts[0] === "WL") {
		parts = parts.slice(1);
	}

	for (i = 0; i < parts.length; i += 1) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}

	return parent;
};

/**
Provides constants
@private
**/
WL.constant = (function () {

	'use strict';

	/**
		Error Codes - Make sure you update wl.geterrormessage.tests.js
			in QA/jsonstore if you change the error codes.
		@private
	*/
	var ERROR = [],
		UNKNOWN_FAILURE = -100,
		PERSISTENT_STORE_NOT_OPEN = -50,
		FIPS_ENABLEMENT_FAILURE = -40,
		INVALID_SEARCH_FIELD_TYPES = -12,
		OPERATION_FAILED_ON_SPECIFIC_DOCUMENT = -11,
		ACCEPT_CONDITION_FAILED = -10,
		OFFSET_WITHOUT_LIMIT = -9,
		INVALID_LIMIT_OR_OFFSET = -8,
		INVALID_USERNAME = -7,
		USERNAME_MISMATCH_DETECTED = -6,
		DESTROY_REMOVE_PERSISTENT_STORE_FAILED = -5,
		DESTROY_REMOVE_KEYS_FAILED = -4,
		INVALID_KEY_ON_PROVISION = -3,
		PROVISION_TABLE_SEARCH_FIELDS_MISMATCH = -2,
		PERSISTENT_STORE_FAILURE = -1,
		SUCCESS = 0,
		BAD_PARAMETER_EXPECTED_INT = 1,
		BAD_PARAMETER_EXPECTED_STRING = 2,
		BAD_PARAMETER_EXPECTED_FUNCTION = 3,
		BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING = 4,
		BAD_PARAMETER_EXPECTED_OBJECT = 5,
		BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT = 6,
		BAD_PARAMETER_EXPECTED_DOCUMENT = 7,
		FAILED_TO_GET_UNPUSHED_DOCUMENTS_FROM_DB = 8,
		NO_ADAPTER_LINKED_TO_COLLECTION = 9,
		BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS = 10,
		INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO = 11,
		ADAPTER_FAILURE = 12,
		BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ID = 13,
		CAN_NOT_REPLACE_DEFAULT_FUNCTIONS = 14,
		COULD_NOT_MARK_DOCUMENT_PUSHED = 15,
		COULD_NOT_GET_SECURE_KEY = 16,
		FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER = 17,
		FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER_INVALID_LOAD_OBJ = 18,
		INVALID_KEY_IN_LOAD_OBJECT = 19,
		UNDEFINED_PUSH_OPERATION = 20,
		INVALID_ADD_INDEX_KEY = 21,
		INVALID_SEARCH_FIELD = 22,
		ERROR_CLOSING_ALL = 23,
		ERROR_CHANGING_PASSWORD = 24,
		ERROR_DURING_DESTROY = 25,
		ERROR_CLEARING_COLLECTION = 26,
		INVALID_PARAMETER_FOR_FIND_BY_ID = 27;

	ERROR[UNKNOWN_FAILURE] = 'UNKNOWN_FAILURE';
	ERROR[PERSISTENT_STORE_NOT_OPEN] = 'PERSISTENT_STORE_NOT_OPEN';
	ERROR[FIPS_ENABLEMENT_FAILURE] = 'FIPS_ENABLEMENT_FAILURE';
	ERROR[INVALID_SEARCH_FIELD_TYPES] = 'INVALID_SEARCH_FIELD_TYPES';
	ERROR[OPERATION_FAILED_ON_SPECIFIC_DOCUMENT] = 'OPERATION_FAILED_ON_SPECIFIC_DOCUMENT';
	ERROR[ACCEPT_CONDITION_FAILED] = 'ACCEPT_CONDITION_FAILED';
	ERROR[OFFSET_WITHOUT_LIMIT] = 'OFFSET_WITHOUT_LIMIT';
	ERROR[INVALID_LIMIT_OR_OFFSET] = 'INVALID_LIMIT_OR_OFFSET';
	ERROR[INVALID_USERNAME] = 'INVALID_USERNAME';
	ERROR[USERNAME_MISMATCH_DETECTED] = 'USERNAME_MISMATCH_DETECTED';
	ERROR[DESTROY_REMOVE_PERSISTENT_STORE_FAILED] = 'DESTROY_REMOVE_PERSISTENT_STORE_FAILED';
	ERROR[DESTROY_REMOVE_KEYS_FAILED] = 'DESTROY_REMOVE_KEYS_FAILED';
	ERROR[INVALID_KEY_ON_PROVISION] = 'INVALID_KEY_ON_PROVISION';
	ERROR[PROVISION_TABLE_SEARCH_FIELDS_MISMATCH] = 'PROVISION_TABLE_SEARCH_FIELDS_MISMATCH';
	ERROR[PERSISTENT_STORE_FAILURE] = 'PERSISTENT_STORE_FAILURE';
	ERROR[SUCCESS] = 'SUCCESS';
	ERROR[BAD_PARAMETER_EXPECTED_INT] = 'BAD_PARAMETER_EXPECTED_INT';
	ERROR[BAD_PARAMETER_EXPECTED_STRING] = 'BAD_PARAMETER_EXPECTED_STRING';
	ERROR[BAD_PARAMETER_EXPECTED_FUNCTION] = 'BAD_PARAMETER_EXPECTED_FUNCTION';
	ERROR[BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING] = 'BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING';
	ERROR[BAD_PARAMETER_EXPECTED_OBJECT] = 'BAD_PARAMETER_EXPECTED_OBJECT';
	ERROR[BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT] = 'BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT';
	ERROR[BAD_PARAMETER_EXPECTED_DOCUMENT] = 'BAD_PARAMETER_EXPECTED_DOCUMENT';
	ERROR[FAILED_TO_GET_UNPUSHED_DOCUMENTS_FROM_DB] = 'FAILED_TO_GET_UNPUSHED_DOCUMENTS_FROM_DB';
	ERROR[NO_ADAPTER_LINKED_TO_COLLECTION] = 'NO_ADAPTER_LINKED_TO_COLLECTION';
	ERROR[BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS] = 'BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS';
	ERROR[INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO] = 'INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO';
	ERROR[ADAPTER_FAILURE] = 'ADAPTER_FAILURE';
	ERROR[BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ID] = 'BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ID';
	ERROR[CAN_NOT_REPLACE_DEFAULT_FUNCTIONS] = 'CAN_NOT_REPLACE_DEFAULT_FUNCTIONS';
	ERROR[COULD_NOT_MARK_DOCUMENT_PUSHED] = 'COULD_NOT_MARK_DOCUMENT_PUSHED';
	ERROR[COULD_NOT_GET_SECURE_KEY] = 'COULD_NOT_GET_SECURE_KEY';
	ERROR[FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER] = 'FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER';
	ERROR[FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER_INVALID_LOAD_OBJ] = 'FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER_INVALID_LOAD_OBJ';
	ERROR[INVALID_KEY_IN_LOAD_OBJECT] = 'INVALID_KEY_IN_LOAD_OBJECT';
	ERROR[UNDEFINED_PUSH_OPERATION] = 'UNDEFINED_PUSH_OPERATION';
	ERROR[INVALID_ADD_INDEX_KEY] = 'INVALID_ADD_INDEX_KEY';
	ERROR[INVALID_SEARCH_FIELD] = 'INVALID_SEARCH_FIELD';
	ERROR[ERROR_CLOSING_ALL] = 'ERROR_CLOSING_ALL';
	ERROR[ERROR_CHANGING_PASSWORD] = 'ERROR_CHANGING_PASSWORD';
	ERROR[ERROR_DURING_DESTROY] = 'ERROR_DURING_DESTROY';
	ERROR[ERROR_CLEARING_COLLECTION] = 'ERROR_CLEARING_COLLECTION';
	ERROR[INVALID_PARAMETER_FOR_FIND_BY_ID] = 'INVALID_PARAMETER_FOR_FIND_BY_ID';

	//public api
	return {
		PKG_NAME : 'wl.jsonstore',
		ID_KEY : '_id',
		JSON_DATA_KEY : 'json',
		OPERATION_KEY : '_operation',
		DEFAULT_USERNAME : 'jsonstore',
		DEFAULT_KEYCHAIN_USERNAME: 'jsonstorekey',
		DEFAULT_ANDROID_KEYCHAIN_ID: 'dpk',
		DELETED_KEY : '_deleted',
		DIRTY_KEY : '_dirty',
		OPERATION_DELETED : 'remove',
		METADATA_TAG : '#dgonz.metadata',
		KEYGEN_NOT_REQUIERED : 1,
		NOT_FOUND : 'Not found',
		ERROR : ERROR,

		//Exporting the error code contants
		UNKNOWN_FAILURE : UNKNOWN_FAILURE,
		PERSISTENT_STORE_NOT_OPEN : PERSISTENT_STORE_NOT_OPEN,
		FIPS_ENABLEMENT_FAILURE : FIPS_ENABLEMENT_FAILURE,
		INVALID_SEARCH_FIELD_TYPES : INVALID_SEARCH_FIELD_TYPES,
		OPERATION_FAILED_ON_SPECIFIC_DOCUMENT : OPERATION_FAILED_ON_SPECIFIC_DOCUMENT,
		ACCEPT_CONDITION_FAILED : ACCEPT_CONDITION_FAILED,
		OFFSET_WITHOUT_LIMIT : OFFSET_WITHOUT_LIMIT,
		INVALID_LIMIT_OR_OFFSET : INVALID_LIMIT_OR_OFFSET,
		INVALID_USERNAME : INVALID_USERNAME,
		USERNAME_MISMATCH_DETECTED : USERNAME_MISMATCH_DETECTED,
		DESTROY_REMOVE_PERSISTENT_STORE_FAILED : DESTROY_REMOVE_PERSISTENT_STORE_FAILED,
		DESTROY_REMOVE_KEYS_FAILED : DESTROY_REMOVE_KEYS_FAILED,
		INVALID_KEY_ON_PROVISION : INVALID_KEY_ON_PROVISION,
		PROVISION_TABLE_SEARCH_FIELDS_MISMATCH : PROVISION_TABLE_SEARCH_FIELDS_MISMATCH,
		PERSISTENT_STORE_FAILURE : PERSISTENT_STORE_FAILURE,
		SUCCESS : SUCCESS,
		BAD_PARAMETER_EXPECTED_INT : BAD_PARAMETER_EXPECTED_INT,
		BAD_PARAMETER_EXPECTED_STRING : BAD_PARAMETER_EXPECTED_STRING,
		BAD_PARAMETER_EXPECTED_FUNCTION : BAD_PARAMETER_EXPECTED_FUNCTION,
		BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING : BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING,
		BAD_PARAMETER_EXPECTED_OBJECT : BAD_PARAMETER_EXPECTED_OBJECT,
		BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT : BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT,
		BAD_PARAMETER_EXPECTED_DOCUMENT : BAD_PARAMETER_EXPECTED_DOCUMENT,
		FAILED_TO_GET_UNPUSHED_DOCUMENTS_FROM_DB : FAILED_TO_GET_UNPUSHED_DOCUMENTS_FROM_DB,
		NO_ADAPTER_LINKED_TO_COLLECTION : NO_ADAPTER_LINKED_TO_COLLECTION,
		BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS : BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS,
		INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO : INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO,
		ADAPTER_FAILURE : ADAPTER_FAILURE,
		BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ID : BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ID,
		CAN_NOT_REPLACE_DEFAULT_FUNCTIONS : CAN_NOT_REPLACE_DEFAULT_FUNCTIONS,
		COULD_NOT_MARK_DOCUMENT_PUSHED : COULD_NOT_MARK_DOCUMENT_PUSHED,
		COULD_NOT_GET_SECURE_KEY : COULD_NOT_GET_SECURE_KEY,
		FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER : FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER,
		FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER_INVALID_LOAD_OBJ : FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER_INVALID_LOAD_OBJ,
		INVALID_KEY_IN_LOAD_OBJECT : INVALID_KEY_IN_LOAD_OBJECT,
		UNDEFINED_PUSH_OPERATION : UNDEFINED_PUSH_OPERATION,
		INVALID_ADD_INDEX_KEY : INVALID_ADD_INDEX_KEY,
		INVALID_SEARCH_FIELD : INVALID_SEARCH_FIELD,
		ERROR_CLOSING_ALL : ERROR_CLOSING_ALL,
		ERROR_CHANGING_PASSWORD : ERROR_CHANGING_PASSWORD,
		ERROR_DURING_DESTROY : ERROR_DURING_DESTROY,
		ERROR_CLEARING_COLLECTION : ERROR_DURING_DESTROY,
		INVALID_PARAMETER_FOR_FIND_BY_ID : INVALID_PARAMETER_FOR_FIND_BY_ID
	};

})(); //end WL.constant

/**
Provides some validation methods
@private
**/
WL.check = (function(jQuery, underscore){

	'use strict';

	//Dependencies
	var constant = WL.constant,
		_ = underscore,
		$ = jQuery,

	//Support for isArray on older browsers
	isArray = Array.isArray || function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

	var __isArray = function (input) {
		return isArray(input);
	};

	//Add pick!
	var __filterPick = function(obj, keys, iterator, context) {
		var results = [];
		if (obj === null) {
			return results;
		}
		_.each(obj, function(value, index, list) {
			keys.unshift(value);
			if (iterator.call(context, value, index, list)) {
				results[results.length] = _.pick.apply(context, keys);
			}
		});
		return results;
	};

	//Constants
	var ALPHANUMERIC_REGEX = /^[a-z0-9]+$/i;

	/** Checks if a string is alphanumeric.
		@private
	*/
	var __isAlphaNumeric = function (string) {

		var result = ALPHANUMERIC_REGEX.exec(string);

		return (typeof string === 'string' && isArray(result) && result.length > 0 && result[0] === string);
	};

	/** Checks if input is an object.
		Note: __isObject([]) = false by default,
			if isArrayValid is true it returns true
		@private
	*/
	var __isObject = function (input, obj) {

		obj = obj || {};

		var isArrayValidType = obj.isArrayValid || false;

		if (typeof input === 'undefined' || typeof input !== 'object' || input === null) {
			return false;
		}

		if (isArray(input) && !isArrayValidType) {
			return false;
		}

		return true;
	};

	/** Checks if an object does not contain other objects or arrays.
		@private
	*/
	var __isSimpleObject = function (obj) {

		var key,
			hasOwn = Object.prototype.hasOwnProperty;

		if (!__isObject(obj)) {
			return false;
		}

		for (key in obj) {
			if (hasOwn.call(obj, key) && __isObject(obj[key], {isArrayValid: true}) || obj[key] === null) {
				return false;
			}
		}
		return true;
	};

	/** Private function to check if the array contains only objects and arrays.
		@private
	*/
	var __isArrayOfObjects = function (arr) {

		var i,
			len;

		if (!isArray(arr) || arr.length < 1) {
			return false;
		}

		for (i = 0, len = arr.length; i<len; i++) {
			if (!__isObject(arr[i])) {
				return false;
			}
		}

		return true;
	};

	/** Private function to check if an object contains duplicate keys, this will return true:
		{fn: 'carlos', fN: 'Carlos', Fn: 'clos', FN: 'carlitos'})
		@private
	*/
	var __containsDuplicateKeys = function (obj) {

		var i,
			len,
			keys = [],
			key,
			hasOwn = Object.prototype.hasOwnProperty;

		if(!__isObject(obj)){
			// fail the test, because it's not a valid object
			return true;
		}

		for (key in obj) {
			if(hasOwn.call(obj, key)){
				keys.push(key.toLowerCase());
			}
		}

		keys = keys.sort();

		//Guard against the {} case
		if (keys.length <= 0) {
			return false;
		}

		for (i = 0, len = keys.length; i < len - 1; i++) {
			if (keys[i + 1] === keys[i]) {
				return true;
			}
		}

		return false; //all green!
	};

	/** Checks if an object is a valid adapter.
		@private
	*/
	var __isValidAdapter = function (obj) {

		return __isObject(obj) &&
		typeof obj.name === 'string' &&
		obj.name.length > 0;
	};

	/** Checks if the input (num) is an integer.
		@private
	*/
	var __isInt = function (num) {

		return (typeof num === 'number' && parseFloat(num) === parseInt(num, 10) && !isNaN(num));
	};

	/** Checks if the input (arrray) are all integers.
		@private
	*/
	var __isArrayOfInts = function (intArr) {
		var i,
			len;

		if (!isArray(intArr) || intArr.length < 1) {
			return false;
		}

		for (i = 0, len = intArr.length; i<len; i++) {
			if (!__isInt(intArr[i])) {
				return false;
			}
		}

		return true;
	};

	/** Checks if the input (arrray) are all documents.
		@private
	*/
	var __isArrayOfDocuments = function (docArr) {
		var i,
			len;

		if (!isArray(docArr) || docArr.length < 1) {
			return false;
		}

		for (i = 0, len = docArr.length; i<len; i++) {
			if (!__isValidDocument(docArr[i])) {
				return false;
			}
		}

		return true;
	};

	/** Checks if the object passed is a valid document.
		Valid object: {_id: 0, json: {...}}
		@private
	*/
	var __isValidDocument = function (doc) {

		return (__isObject(doc) &&
			__isInt(Number(doc[constant.ID_KEY])) &&
			__isObject(doc[constant.JSON_DATA_KEY]));
	};

	/** Checks if func is a function
		@private
	*/
	var __isFunction = function (func) {
		return typeof func === 'function';
	};

	/** Checks if str is a string
		@private
	*/
	var __isString = function (str) {
		return typeof str === 'string';
	};

	/** Checks if input is undefined (or null)
		@private
	*/
	var __isUndefined = function (input) {
		return (typeof input === 'undefined' || input === null);
	};

	/** Checks if input is a boolean
		@private
	*/
	var __isBoolean = function (input) {
		return typeof input === 'boolean';
	};

	/** Checks if valid load object
		Valid Example: { procedure: 'getCustomers', params: [], key: "customers" }
		@private
	*/
	var __isValidLoadObject = function (obj) {

		if (!__isObject(obj)) {
			return false;
		}

		return (__isString(obj.procedure) && isArray(obj.params) && __isString(obj.key));
	};

	/** Merges to objects
		var obj1 = {fn: 'carlos'}, var obj2 = {ln: 'andreu'};
		mergeObjects(obj1,obj2) => {fn: 'carlos', ln: 'andreu'}
		@private
	*/
	var __mergeObjects = function (obj1, obj2) {

		if (!__isObject(obj1) || !__isObject(obj2)) {
			return -1;
		}

		return $.extend(obj1, obj2);
	};

	/** Checks if it's part of the searchFields, if you pass additionalSearchFields
		it will also check those and only return true if it's inside one of those objects.
		@private
	*/
	var __isPartofSearchFields = function (obj, searchFields, additionalSearchFields) {

		if (!__isSimpleObject(obj) || !__isSimpleObject(searchFields)) {
			return false;
		}

		var key,
			hasOwn = Object.prototype.hasOwnProperty,
			allSearchFields = searchFields;

		//We want to make _id a valid searchField
		allSearchFields[constant.ID_KEY] = 'number';

		if (!__isUndefined(additionalSearchFields)) {
			allSearchFields = __mergeObjects(searchFields, additionalSearchFields);
		}

		//search searchFields in obj
		for (key in obj) {
			if (hasOwn.call(obj, key) && __isUndefined(allSearchFields[key.toLocaleLowerCase()])) {
				return false;
			}
		}

		return true;
	};

	/** Counts how many keys an object has
		@private
	*/
	var __countKeys = function (obj) {

		if (!__isObject(obj)) {
			return -1;
		}

		//This is faster but not supported everywhere
		if (!__isUndefined(Object.keys)) {

			return Object.keys(obj).length;

		//Loop over the keys and count them
		} else {
			var key,
				hasOwn = Object.prototype.hasOwnProperty,
				count = 0;

			for (key in obj) {
				if (hasOwn.call(obj, key)) {
					count++;
				}
			}

			return count;
		}
	};

	/** Checks if a reserved word is used
		@private
	*/
	var __isReservedWord = function (username) {

		if (!__isString(username)) {
			return false;
		}

		var usr = username.toLowerCase();

		return (usr.indexOf(constant.DEFAULT_USERNAME) === 0 ||
				usr.indexOf(constant.DEFAULT_KEYCHAIN_USERNAME) === 0 ||
				usr.indexOf(constant.DEFAULT_ANDROID_KEYCHAIN_ID) === 0);
	};

	/** Checks if the search fields object has valid types
		@private
	*/
	var __isValidSchemaObject = function (obj) {

		var key,
			hasOwn = Object.prototype.hasOwnProperty,
			invalidKeys = [constant.ID_KEY, constant.OPERATION_KEY, constant.DELETED_KEY, constant.DIRTY_KEY, constant.JSON_DATA_KEY],
			validTypes = ['string', 'integer', 'boolean', 'number'];

		for(key in obj) {

			if(hasOwn.call(obj, key) && validTypes.indexOf(obj[key]) === -1 || invalidKeys.indexOf(key) > -1) {
				return false;
			}
		}
		return true;
	};


	/** Checks if n is a number
		@private
	*/
	var __isNumber = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	//public api
	return {
		isAlphaNumeric: __isAlphaNumeric,
		isObject: __isObject,
		isSimpleObject: __isSimpleObject,
		isArrayOfObjects : __isArrayOfObjects,
		containsDuplicateKeys : __containsDuplicateKeys,
		isValidAdapter : __isValidAdapter,
		isInt : __isInt,
		isValidDocument : __isValidDocument,
		isFunction : __isFunction,
		isString : __isString,
		isUndefined : __isUndefined,
		isBoolean : __isBoolean,
		isValidLoadObject : __isValidLoadObject,
		isPartofSearchFields : __isPartofSearchFields,
		countKeys : __countKeys,
		mergeObjects : __mergeObjects,
		isReservedWord : __isReservedWord,
		isArrayOfInts : __isArrayOfInts,
		isValidSchemaObject : __isValidSchemaObject,
		isNumber: __isNumber,
		filterPick : __filterPick,
		isArrayOfDocuments : __isArrayOfDocuments,
		isArray : __isArray
	};

})(WLJQ, WL_); //end WL.check

/**
Provides support for setting up callbacks with events.
@private
**/
WL.callback = (function(jQuery){

	'use strict';

	//Dependencies
	var check = WL.check,
		constant = WL.constant,
		$ = jQuery;

	/**
		Error object returned by rejected deferreds
		@private
		@param obj {object} src = source of the error,
		err = error int, col = collection name, usr = username,
		doc = doc that failed and res = response from the server.
	*/
	var ErrorObject = function (obj) {
		this.src = obj.src || '';
		this.err = obj.err || constant.UNKNOWN_FAILURE;
		this.msg = WL.JSONStore.getErrorMessage(this.err);
		this.col = obj.col || '';
		this.usr = obj.usr || constant.DEFAULT_USERNAME;
		this.doc = obj.doc || {};
		this.res = obj.res || {};
	};

	ErrorObject.prototype.toString = function () {
		return JSON.stringify(this, null, ' ');
	};

	//Private Members
	var _generate = function (options, events, src, collectionName, username, deferred) {

		var success,
			failure;

		success = function(data, more) {

			//Push is a special case we handle separately, search for __push
			if (!check.isUndefined(deferred) && 'push' !== src) {
				deferred.resolve(data, more);
			}

			//Send the WL/JSONSTORE/SUCCESS event
			$(document.body).trigger(events.success, [data, src, collectionName, more, username]);

			//Call the user provided callback if there is one
			if (check.isObject(options) && check.isFunction(options.onSuccess)) {
				options.onSuccess(data, more);
			}
		},

		failure = function(data, more) {

			var errorObject = {
				src: src,
				col: collectionName,
				usr: username
			},
			realErrorObject;

			if (check.isInt(data)) {
				errorObject.err = data;
				errorObject.msg = WL.JSONStore.getErrorMessage(data);
			}else{
				//We got a document back instead of an error code
				errorObject.doc = data;
				errorObject.err = -11;
				errorObject.msg = WL.JSONStore.getErrorMessage(-11);
			}

			realErrorObject = new ErrorObject(errorObject);

			//Resolve with an error object
			if (!check.isUndefined(deferred)) {
				deferred.reject(realErrorObject);
			}

			WL.Logger.ctx({pkg: constant.PKG_NAME}).error(realErrorObject);

			//Send the WL/JSONSTORE/FAILURE event
			$(document.body).trigger(events.failure, [data, src, collectionName, more, username]);

			//Call the user provided callback if there is one
			if (check.isObject(options) && check.isFunction(options.onFailure)) {
				options.onFailure(data, more);
			}
		};

		return {onSuccess: success, onFailure: failure};
	};

	//public api
	return {
		generate : _generate,
		ErrorObject : ErrorObject
	};

})(WLJQ); //end WL.callback

/**
Provides a way to traverse JSON objects in JavaScript
@private
**/
WL.jspath = (function(jQuery){

	'use strict';

	var $ = jQuery,
		check = WL.check,

		__locate = function (element, key) {

			var arr = [];

			function traverse(currentKey, curretValue, parentPath) {

				if (check.isObject(curretValue, {isArrayValid: true}) && !check.isUndefined(curretValue)) {

					if (!check.isUndefined(currentKey)) {
						parentPath.push(currentKey);
					}

					$.map(curretValue, function(v,k) {

						if (key === k) {
							arr.push({parent: parentPath.join('.').replace('.',''),key : k, value: v});
						}

						traverse(k, v, parentPath);
					});

					if (!check.isUndefined(currentKey)) {
						parentPath.pop();
					}
				}
			}

			traverse('', element, []);

			return arr;
		},

		__get = function (data, element, parent) {

			var databack,
				arr = [],
				currentParent;

			if (check.isUndefined(parent)) {
				parent = 'root';
			}

			if (!check.isObject(data, {isArrayValid: true}) ||
				!check.isString(element) ||
				!check.isString(parent)) {

				return [];
			}

			if (parent === 'root') {
				return [data[element]];
			}

			databack = __locate(data, element);

			for (var i=0; i< databack.length; i++) {
				currentParent = databack[i].parent;
				if (currentParent.indexOf(parent) >= 0) {
					arr.push(databack[i].value);
				}
			}

			return arr;
		};

	//public api
	return {
		get : __get
	};

})(WLJQ); //end WL.jspath


if (WL.Client.getEnvironment() === 'iphone' ||
	WL.Client.getEnvironment() === 'ipad' ||
	WL.Client.getEnvironment() === 'android') {

	/**
	Provides access to our internal storage via cordova.
	Internally used in WL.JSONStore.
	@private
	**/
	WL.db = (function (jQuery) {

		'use strict';

		//dependencies
		var cdv = cordova,
		$ = jQuery,

		//constants
		STORAGE_PLUGIN = 'StoragePlugin',
		PROVISION_METHOD = 'provision',
		STORE_METHOD = 'store',
		FIND_METHOD = 'find',
		FIND_BY_ID_METHOD = 'findById',
		REPLACE_METHOD = 'replace',
		REMOVE_METHOD = 'remove',
		ALL_DIRTY_METHOD = 'allDirty',
		CLEAN_METHOD = 'markClean',
		QUEUE_COUNT_METHOD = 'localCount',
		COLLECTION_COUNT_METHOD = 'count',
		IS_DIRTY_METHOD = 'isDirty',
		DROP_TABLE_METHOD = 'dropTable',
		STORE_SALT_METHOD = 'storeSalt',
		STORE_DPK_METHOD = 'storeDPK',
		IS_KEY_GEN_REQ_METHOD = 'isKeyGenRequired',
		CHANGE_PW_METHOD = 'changePassword',
		CLOSE_METHOD = 'closeDatabase',
		DESTROY_METHOD = 'destroyDbFileAndKeychain',

		__callNative = function (args, options, pluginName, nativeFunction) {
			cdv.exec(options.onSuccess, options.onFailure, pluginName, nativeFunction, args);
		},

		_provision = function (collection, searchFields, options) {

			__callNative([collection, JSON.stringify(searchFields), JSON.stringify(options)], options, STORAGE_PLUGIN, PROVISION_METHOD);
		},

		_store = function (collection, data, options) {

			__callNative([collection, JSON.stringify(data), JSON.stringify(options)], options, STORAGE_PLUGIN, STORE_METHOD);
		},

		_find = function (collection, query, options) {

			__callNative([collection, JSON.stringify(query), JSON.stringify(options)], options, STORAGE_PLUGIN, FIND_METHOD);
		},

		_findById = function (collection, id, options) {

			__callNative([collection, JSON.stringify(id)], options, STORAGE_PLUGIN, FIND_BY_ID_METHOD);
		},

		_replace = function (collection, doc, options) {

			__callNative([collection, JSON.stringify(doc), JSON.stringify(options)], options, STORAGE_PLUGIN, REPLACE_METHOD);
		},

		_remove = function (collection, query, options) {

			__callNative([collection, JSON.stringify(query), JSON.stringify(options)], options, STORAGE_PLUGIN, REMOVE_METHOD);
		},

		_allDirty = function (collection, docs, options) {
			__callNative([collection, JSON.stringify(docs)], options, STORAGE_PLUGIN, ALL_DIRTY_METHOD);
		},

		_clean = function (collection, docId) {
			//The method was changed to use promises instead of callbacks.
			var deferred = $.Deferred(),
				options = {
					onSuccess : function (rc) {
						deferred.resolve(rc);
					},
					onFailure : function (err) {
						deferred.reject(err);
					}
				};

			__callNative([collection, JSON.stringify(docId)], options, STORAGE_PLUGIN, CLEAN_METHOD);
			return deferred.promise();
		},

		_localCount = function (collection, options) {

			__callNative([collection], options, STORAGE_PLUGIN, QUEUE_COUNT_METHOD);
		},

		_count = function (collection, options, query) {

			__callNative([collection, JSON.stringify(query), JSON.stringify(options)], options, STORAGE_PLUGIN, COLLECTION_COUNT_METHOD);
		},

		_isDirty = function (collection, docId, options) {

			__callNative([collection, JSON.stringify(docId)], options, STORAGE_PLUGIN, IS_DIRTY_METHOD);
		},

		_clear = function (collection, options) {

			__callNative([collection], options, STORAGE_PLUGIN, DROP_TABLE_METHOD);
		},

		_storeSalt = function (salt, options) {

			__callNative([salt], options, STORAGE_PLUGIN, STORE_SALT_METHOD);
		},

		_storeDPK = function (secRand, password, salt, username, localKeyGen, options) {
			__callNative([secRand, password, salt, username, localKeyGen], options, STORAGE_PLUGIN, STORE_DPK_METHOD);
			password = null;
		},

		_changePW = function (oldPw, newPw, username, options) {

			__callNative([oldPw, newPw, username], options, STORAGE_PLUGIN, CHANGE_PW_METHOD);
			oldPw = null;
			newPw = null;
		},

		_isKeyGenRequired = function (username, options) {

			__callNative([username], options, STORAGE_PLUGIN, IS_KEY_GEN_REQ_METHOD);
		},

		_closeDatabase = function(options) {

			__callNative([], options, STORAGE_PLUGIN, CLOSE_METHOD);
		},

		_destroy = function (options) {

			__callNative([], options, STORAGE_PLUGIN, DESTROY_METHOD);
		};

		//public API
		return {
			provision : _provision,
			store : _store,
			find : _find,
			findById : _findById,
			replace : _replace,
			remove : _remove,
			allDirty: _allDirty,
			pushRequiredCount : _localCount,
			count : _count,
			isPushRequired : _isDirty,
			markpushed : _clean,
			removeCollection : _clear,
			storeSalt : _storeSalt,
			storeDPK : _storeDPK,
			isKeyGenRequired: _isKeyGenRequired,
			changePassword: _changePW,
			closeAll : _closeDatabase,
			destroy : _destroy
		};

	}(WLJQ));//WL.db

} else {

	/**
		Provides an async interface to localStorage
		@private
	**/
	WL.storage = (function (jQuery) {

		'use strict';

		var ls = localStorage,
			$ = jQuery,
			constant = WL.constant,
			check = WL.check,

		__genFullName = function(username, name) {
			return ''+ username + '.' + name;
		},

		__dropFirst = function(username, name, options) {
			var deferred = $.Deferred();

			if (check.isBoolean(options.dropCollection) && options.dropCollection) {
				//drop the collection first
				return _clearKey(username, name);
			} else {

				setTimeout(function () {
					deferred.resolve(constant.SUCCESS);
				}, 0);

				return deferred.promise();
			}
		},

		__init = function (username, name){
			var deferred = $.Deferred();

			_read(username, name)

			.then(function (val) {
				if (null !== val) {
					deferred.resolve(val);
				} else {
					deferred.resolve(constant.SUCCESS);
				}
			})

			.fail(function () {
				deferred.reject(constant.PERSISTENT_STORE_FAILURE);
			});

			return deferred.promise();
		},

		_provision = function(username, name, options){
			var deferred = $.Deferred();
			options = options || {};

			__dropFirst(username, name, options)

			.then(function(){
				return __init(username, name);
			})

			.then(function(data){
				deferred.resolve(data);
			})

			.fail(function(e){
				deferred.reject(e);
			});

			return deferred.promise();
		},

		_write = function(username, name, data){
			var deferred = $.Deferred();

			setTimeout(function(){
				ls.setItem(__genFullName(username, name), JSON.stringify(data));
				deferred.resolve(constant.SUCCESS);
			}, 0);

			return deferred.promise();
		},

		_read = function(username, name){
			var deferred = $.Deferred(),
				ret;

			setTimeout(function () {
				ret = JSON.parse(ls.getItem(__genFullName(username, name)));
				deferred.resolve(ret);
			}, 0);

			return deferred.promise();
		},

		_clearKey = function(username, name){
			var deferred = $.Deferred();

			setTimeout(function () {
				ls.removeItem(__genFullName(username, name));
				deferred.resolve(constant.SUCCESS);
			}, 0);

			return deferred.promise();
		},

		_destroy = function(){
			var deferred = $.Deferred();

			setTimeout(function () {
				ls.clear();
				deferred.resolve();
			}, 0);

			return deferred.promise();
		};

		//public api
		return {
			write : _write,
			read: _read,
			destroy: _destroy,
			clear : _clearKey,
			provision: _provision
		};

	})(WLJQ); //end WL.storage

	/**
	JSONStore Indexer for the JS-only implementation
	@private
	**/
	WL.indexer = (function(underscore){

		'use strict';

		//dependencies
		var check = WL.check,
			_ = underscore,

		__updatePath = function(oldPath, newItem){
			var retStr;
			if (oldPath === '') {

				retStr =  '' + newItem.toLowerCase();
				return retStr;
			} else {

				retStr = ''  + (oldPath + '.' + newItem).toLowerCase();
				return retStr;
			}
		},

		__handleJsonObj = function( ret, path, object, searchFields) {
			var tmpPath,
				key,
				i = 0,
				l,
				idx,
				searchFieldEqTempPath = function (sf) {
					return sf === tmpPath;
				};

			for (key in object) {

				if (check.isArray(object[key])) {

					for (l = object[key].length; i < l; i ++) {
						__handleJsonObj(ret, __updatePath(path, key), object[key][i], searchFields);
					}

				} else if (check.isObject(object[key])) {

					__handleJsonObj(ret, __updatePath(path, key), object[key], searchFields);
				} else {

					tmpPath = __updatePath(path, key);
					idx = _.find(searchFields, searchFieldEqTempPath);

					if (! check.isUndefined(idx)) {
						//Native stores booleans as 1 (true) and 0 (false)
						var isBoolean = false,
							intVal = 0;

						if (check.isBoolean(object[key])) {

							isBoolean = true;
							intVal = object[key] ? 1 : 0;

						}

						ret[tmpPath] = ret[tmpPath] || [];
						if(isBoolean){
							ret[tmpPath].push(intVal);
						}else {
							ret[tmpPath].push(object[key]);
						}

					}
				}
			}
		};

		//Given an object from the user, apply the array of search fields.
		var _index = function (object, searchFields) {

			var ret = {}; //gets modified by __handleJsonObj
			__handleJsonObj(ret, '', object, searchFields);
			return ret;
		};

		return {
			index : _index
		};

	}(WL_)); //end WL.indexer

	/**
	Provides access to our internal storage in the browser
	Internally used in WL.JSONStore.
	@private
	**/
	WL.browser = (function (jQuery, underscore) {

		'use strict';

		//dependencies
		var constant = WL.constant,
			storage = WL.storage,
			indexer = WL.indexer,
			check = WL.check,
			$ = jQuery,
			_ = underscore;

		var Store = function (options) {
			options = options || {};
			var pw = check.isString(options.pwHash) ? options.pwHash : '',
				usr = options.username;

			//holds the set of open collections
			this.collections =  options.collections || {};

			this.metadata = { pwHash : pw , username : usr};
			this.storeOpen = false;
		};

		Store.prototype = {

			saveStoreMetadata : function(){
				var that = this,
					deferred = $.Deferred(),
					name = constant.METADATA_TAG;

				//We don't want the username here, it's a custom thing for the metadata
				storage.write(that.metadata.username, name, that.metadata)

				.then(function () {
					deferred.resolve();
				})

				.fail(function () {
					deferred.reject(constant.PERSISTENT_STORE_FAILURE);
				});

				return deferred.promise();
			},

			readStoreMetadata : function(username){
				var that = this,
					deferred = $.Deferred();

				storage.read(username, constant.METADATA_TAG)

				.then(function(data){
					that.metadata = data;
					deferred.resolve();
				})

				.fail(function(){
					deferred.reject(constant.PERSISTENT_STORE_FAILURE);
				});

				return deferred.promise();
			},

			isStoreOpen : function () {
				return this.storeOpen;
			},

			addOpened : function (collection) {
				this.storeOpen = true;
				this.collections[collection.name] = collection;
			},

			removeOpened : function (collectionName) {

				if (_.has(this.collections, collectionName)) {
					delete this.collections[collectionName];
				}
			},

			isOpen : function (name) {
				return _.has(this.collections, name);
			},

			anyOpen : function () {

				return this.storeOpen && (! _.isEmpty(this.collections));
			},

			refresh : function (collection) {
				var that = this,
					deferred = $.Deferred();

				storage.read(this.metadata.username, collection)

				.then(function(data){
					that.collections[collection] = data;
					deferred.resolve();
				})

				.fail(function(){
					deferred.reject(constant.PERSISTENT_STORE_FAILURE);
				});

				return deferred.promise();
			}
		};

		/**
			Object that holds all the opened collections in memory
		*/
		var store = new Store(),

		Collection = function (options) {
			options = options || {};

			this.name = options.name || '';
			this.username = options.username || constant.DEFAULT_USERNAME;
			this.searchFields = options.searchFields || {};
			this.additionalSearchFields = options.additionalSearchFields || {};
			this.sfTree = options.sfTree || {};
			this.data = options.data || [];
		},

		Document = function (options) {
			options = options || {};

			this.json = options.json || {};
			this._indexes = options.indexes || {};
			this._deleted = options.deleted || false;
			this._dirty = options.dirty || '';
			this._operation = options.operation || '';
		},

		__createNewStore = function () {
			//called from destroy and close to remove all opened collections
			store = new Store();
		},

		__hashPassword = function (pw) {
			var bitArray = sjcl.hash.sha256.hash(pw),
				pwHash = sjcl.codec.hex.fromBits(bitArray);

			return pwHash;
		},

		__handlePassword = function (pwHash, deferred) {

			//Handle password cases
			if (! check.isUndefined(pwHash)) {
				if (! check.isUndefined(store.metadata.pwHash)) {
					if(pwHash === store.metadata.pwHash){
						//user pw and stored pw match
						deferred.resolve();
					} else {
						//use pw doesn't match stored pw
						deferred.reject(constant.INVALID_KEY_ON_PROVISION);
					}
				} else {
					//Init without pass and then init with pass
					deferred.reject(constant.INVALID_KEY_ON_PROVISION);
				}
			} else {
				if (! check.isUndefined(store.metadata.pwHash)) {
					//user did not specify password, but we have one saved
					deferred.reject(constant.INVALID_KEY_ON_PROVISION);
				}
				deferred.resolve(); //no passed in or stored passwords
			}
		},

		__ensureStoreOpen = function (pwHash, user) {
			//Make sure the store has been opened.
			var deferred = $.Deferred();

			if (! store.isStoreOpen()) {

				store.readStoreMetadata(user)

				.then(function () {

					if(check.isUndefined(store.metadata)){

						//Very first provision, need to store the key and username
						store.metadata = {
							pwHash : pwHash,
							username : user
						};

						deferred.resolve();

					} else { //Not the first provision

						__handlePassword(pwHash, deferred);
					}
				})

				.fail(function(e){
					deferred.reject(e);
				});

			} else {
				setTimeout(function(){
					if (user === store.metadata.username) {
						deferred.resolve();
					} else {
						deferred.reject(constant.USERNAME_MISMATCH_DETECTED);
					}
				}, 0);
			}

			return deferred.promise();
		},

		__searchFieldsMatch = function (newSearchFields, collection) {
			return _.isEqual(store.collections[collection].searchFields, newSearchFields);
		},

		__processAdditionalSearchFields = function (searchFields, options){
			var asfNames = [],
				sfKeys;

			if (! _.isEmpty(options.additionalSearchFields)) {
				sfKeys = _.keys(searchFields); //e.g. [fn, ln]
				sfKeys.unshift(options.additionalSearchFields);//e.g. [{orderid: 'number'}, fn, ln]
				//Doing this because apply takes idx 0 as the first argument
				asfNames = _.omit.apply(this, sfKeys); //omit searchFields keys from additional SF
			}

			return asfNames;
		},

		__provisionPreprocessor = function(options) {
			var deferred = $.Deferred(),
				pwHash;

			if (check.isString(options.collectionPassword) &&
				! _.isEmpty(options.collectionPassword)) {
				pwHash = __hashPassword(options.collectionPassword);
			}

			//FIPS is not supported in the browser environment
			if (options.fipsEnabled) {
				setTimeout(function () {
					return deferred.reject(constant.FIPS_ENABLEMENT_FAILURE);
				}, 0);
			}

			__ensureStoreOpen(pwHash, options.username)

			.then(function () {

				if (check.isUndefined(pwHash)) {
					//no password, could be a 2nd init attempt where we have cleared the pw.
					return deferred.resolve(constant.SUCCESS);

				} else {

					if (pwHash !== store.metadata.pwHash) {
						//user password didn't match stored password.
						return deferred.reject(constant.INVALID_KEY_ON_PROVISION);

					} else {

						return deferred.resolve(constant.SUCCESS);
					}
				}
			})

			.fail(function (e) {
				return deferred.reject(e);
			});

			return deferred.promise();
		},

		__createNewCollection = function (collection, searchFields, options) {
			var asfNames = __processAdditionalSearchFields(searchFields, options),
				c = new Collection({
					name: collection,
					searchFields: searchFields,
					additionalSearchFields : asfNames,
					username: options.username,
					data : []
				});

			store.addOpened(c);
			return c;
		},

		__handleStorageProvisionResult  = function (result, collection, searchFields, options) {
			//rc === 0 means the collection doesn't exist, so create it
			//rc === { data.. }  means it does exist, open it up
			var c;

			if (result === 0) {
				c = __createNewCollection(collection, searchFields, options);
				return storage.write(options.username, collection, c);

			} else {
				store.addOpened(result);

				if (! __searchFieldsMatch(searchFields, collection)) {
					store.removeOpened(result.name);
					return $.Deferred().reject(constant.PROVISION_TABLE_SEARCH_FIELDS_MISMATCH);
				}

				//Open existing collection, backwards compatible with initCollection
				return $.Deferred().resolve(1);
			}
		},

		_provision = function (collection, searchFields, options) {
			var userRc;

			__provisionPreprocessor(options)

			.then(function () {
				return storage.provision(options.username, collection, options);
			})

			.then(function (rc) {
				return __handleStorageProvisionResult(rc, collection, searchFields, options);
			})

			.then(function (rc) {
				userRc = rc; //0 or 1 is returned to the user
				return store.saveStoreMetadata();
			})

			.then(function () {
				options.onSuccess(userRc);
			})

			.fail(function (e) {
				options.onFailure(e);
			});
		},

		__storeImpl = function (collection, data, options, rc) {
			var indexes,
				sfKeys  = [],
				operation = options.isAdd ? 'add' : '',
				dirty = options.isAdd ? new Date() : 0,
				deferred = $.Deferred();

			sfKeys = _.keys(store.collections[collection].searchFields);

			_.each(data, function(obj){
				indexes = indexer.index(obj, sfKeys);
				if(! check.isUndefined(options.additionalSearchFields)){
					//add each additionalSearchField to the indexes
					_.each(options.additionalSearchFields, function(val, key){
						key = key.toLowerCase();
						if(! _.isArray(indexes[key])){
							indexes[key] = [];
						}
						indexes[key].push(val);
					});
				}
				var d = new Document({json : obj, indexes : indexes, dirty : dirty, operation : operation});
				d._id = store.collections[collection].data.push(d);

			});
			rc = data.length;

			storage.write(store.metadata.username, collection, store.collections[collection])

			.then(function () {
				deferred.resolve(rc);
			})

			.fail(function (e) {
				deferred.reject(e);
			});

			return deferred.promise();
		},

		_store = function (collection, data, options) {

			if (! store.isOpen(collection)) {
				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function(){
					return __storeImpl(collection, data, options);
				})

				.then(function(rc){
					options.onSuccess(rc);
				})

				.fail(function(e){
					options.onFailure(e);
				});
			}
		},

		__queryProcessorImpl = function (doc) {

			var kLower = '',
				dataTracker = this.dataTracker, //records indexes already found
				counters = this.counters,
				offset = this.offset,
				limit = this.limit,
				limitDefined = !check.isUndefined(limit),
				offsetDefined = !check.isUndefined(offset),
				exact = this.exact,
				query = this.query,
				interceptor = this.interceptor,
				sf = this.sf, //searchFields
				ptr,
				searchStr,
				mySearchStr,
				found,
				hasOwn = Object.prototype.hasOwnProperty,
				likeIterator = function(idx){

					idx = ('' + idx).toLowerCase();
					this.searchStr = this.searchStr.toLowerCase();
					return idx.indexOf(this.searchStr) > -1;
				},
				exactIterator = function(idx){

					//Not lowercasing anymore to match native behavior; in native, when comparing with exact=true it is case sensitive
					idx = ('' + idx); 

					if(this.sf[this.kLower] === 'integer'){
						return Number(idx) === Number(this.searchStr);

					} else {
						return idx === this.searchStr;
					}


				},
				iteratorImpl = exact ? exactIterator : likeIterator;

			//doc is a document in the collection
			if (! check.isObject(doc)) {
				//has been removed
				return false;
			}

			if(doc._deleted){
				return false; //skip this doc, it's been marked deleted
			}

			//Loop over every key in the query obj and look for matches
			for (var k in query) {

				if (hasOwn.call(query, k)) {

					kLower = k.toLowerCase();
					//check for _id field
					if (kLower === constant.ID_KEY) {

						if(doc._id === query[k]){
							//_id fields are the same
							continue;
						} else {
							return false; //_id did not match
						}

					} else {
						ptr = doc._indexes;
					}

					//not an _id field, looking at indexes
					if (! check.isUndefined(ptr[kLower])) {

						//Simulate LIKE query search
						searchStr = query[k];

						//In native booleans are stored as 1 (true) or 0 (false)
						if(check.isBoolean(searchStr)){
							mySearchStr = searchStr ? '1' : '0';
						} else {
							//Not lowercasing anymore to match native behavior; in native, when comparing with exact=true it is case sensitive
							mySearchStr = (''+searchStr);
						}

						found = _.find(ptr[kLower], iteratorImpl, {searchStr: mySearchStr, sf: sf, kLower: kLower});

						if (! check.isUndefined(found)) {
							continue; // We found a matching key, make sure the rest match
						} else {
							return false;
						}

					} else {
						//indexes did not contain the search key
						return false;
					}
				}
			}

			//doc match applying limit and offset rules
			if (limitDefined) {

				if (offsetDefined) {
					//We have a limit and offset
					if (counters.skippedCtr < offset) {
						counters.skippedCtr = counters.skippedCtr + 1;
						return false; //offset not reached, so skip this match
					}
				}

				if (counters.foundCtr < limit) {
					counters.foundCtr = counters.foundCtr + 1;
					if (check.isUndefined(dataTracker[doc[constant.ID_KEY]])) {
						//we haven't seen this element
						dataTracker[doc[constant.ID_KEY]] = true;
						interceptor(doc);
						return true; //all keys matched and we are under our limit
					} else {
						//We have a match, but it was already captured so skip it.
						return false;
					}
				}
				//We are over our limit
				return false;
			}

			//Ensure we don't return duplicates
			if (check.isUndefined(dataTracker[doc[constant.ID_KEY]])) {
				//Element not seen before
				dataTracker[doc[constant.ID_KEY]] = true;
				interceptor(doc);
				return true; //all keys matched and we are under our limit
			} else {
				//We have a match, but it was already captured so skip it.
				return false;
			}
		},

		//internal find impl, does all the looping and filtering
		__queryProcessor = function (ctx) {
			var retData = [],
				currData = [],
				dataTracker = [], //records indexes already found
				counters = {
					foundCtr : 0,
					skippedCtr : 0
				},

			//no default for limit or offset, since you can specify a negative limit,
			//and limit = 0. We have to deal with undefined as the case where no limit
			//was specified so we skip
			interceptor = ctx.interceptor || function(){};

			_.each(ctx.query, function (query) {

					//loop over all the docs if there is a hit, return _id and json
					ctx.dataTracker = dataTracker;
					ctx.counters = counters;
					ctx.interceptor = interceptor;
					ctx.query = query;

					currData = check.filterPick(ctx.data, [constant.ID_KEY, constant.JSON_DATA_KEY], __queryProcessorImpl, ctx);

					retData = retData.concat(currData);

				});
			return retData;
		},

		_findImpl = function (collection, query, options) {

			var col = store.collections[collection],
				reversedData = [],
				retData = [],
				clones = [],
				l,
				ctx = {
					query : query,
					data: col.data,
					sf: col.searchFields,
					limit : options.limit,
					offset : options.offset,
					exact : options.exact,
					interceptor : function(){}
				};

			if (check.isInt(ctx.limit) && (ctx.limit < 0)) {
				//We have a negative limit, reverse the array before traversing
				l = ctx.data.length;

				while (l--) {
					reversedData.push(ctx.data[l]);
				}

				ctx.data = reversedData;
				ctx.limit = Math.abs(ctx.limit);
			}

			retData = __queryProcessor(ctx);

			clones = _.cloneDeep(retData); //31% faster than $.extend(true, [], retData)

			options.onSuccess(clones);
		},

		_find = function (collection, query, options) {

			if (! store.isOpen(collection)){

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function () {
					_findImpl(collection, query, options);
				})

				.fail(function (e) {
					options.onFailure(e);
				});
			}

		}, //end find

		__findByIdImpl = function (collection, id, options) {
			var data = store.collections[collection].data,
				retData = [],
				clones = [];

			//Loop over all the documents in the store
			_.each(data, function (doc) {
				//See if this doc matches an id in our query
				if(!check.isUndefined(doc) && _.contains(id, doc._id)){
					if(doc[constant.DELETED_KEY] === false){
						//make sure document is not marked deleted
						retData.push(_.pick(doc, constant.ID_KEY, constant.JSON_DATA_KEY));
					}
				}
			});

			clones = _.cloneDeep(retData); //31% faster than $.extend(true, [], retData)

			options.onSuccess(clones);
		},

		_findById = function (collection, id, options) {

			if (! store.isOpen(collection)){

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function(){
					__findByIdImpl(collection, id, options);
				})

				.fail(function(){
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});
			}
		},

		__replaceImpl = function (collection, docs, options) {

			var col = store.collections[collection],
				data = col.data,
				found = [],
				operation = options.isRefresh ? '' : 'replace',
				dirty = options.isRefresh ? 0 : new Date(),
				sfKeys,
				failedDoc;

			//See if the documents exist in the store, if we can't find one, track it and pass it to the fail cb
			_.each(docs, function (doc) {
				var idx = doc._id - 1,
					curr = data[idx];

				if (check.isUndefined(curr) || curr[constant.DELETED_KEY]) {
					//error, don't update anything, save the bad doc to return to the user
					failedDoc = doc;

				} else {
					found.push(curr);
				}
			});

			if (! check.isUndefined(failedDoc)) {
				return options.onFailure([failedDoc]);
			}

			if (found.length !== docs.length) {
				return options.onFailure(constant.PERSISTENT_STORE_FAILURE);
			}

			//We found all the docs to be replaced, now process them
			sfKeys = _.keys(col.searchFields);

			_.each(docs, function (doc) {

				var docData = doc.json,
					indexes = indexer.index(docData, sfKeys),
					docId = doc._id - 1,
					newDoc = new Document({
						json : docData,
						indexes : indexes,
						dirty : dirty,
						//if the operation was already add, keep it
						operation : (data[docId]._operation === 'add') ? 'add' : operation
					});

				newDoc._id = doc._id;

				//preserve the old additional indexes
				_.each(_.keys(col.additionalSearchFields), function (key) {
					newDoc._indexes[key] = data[docId]._indexes[key];
				});

				data[docId] = newDoc; //swap with the newly indexed item.
			});

			storage.write(store.metadata.username, collection, col)

			.then(function(){
				options.onSuccess(found.length);
			})

			.fail(function(){
				options.onFailure(constant.PERSISTENT_STORE_FAILURE);
			});
		},

		_replace = function (collection, docs, options) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function () {
					__replaceImpl(collection, docs, options);
				})

				.fail(function () {
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});
			}
		},

		__removeImpl = function (collection, query, options) {
			var col = store.collections[collection],
				retData,
				addIds = [],
				operation = options.isErase ? '' : 'remove',
				interceptor = function (doc) {

					if (doc._operation === 'add' || operation === '' ) {
						addIds.push(doc._id);
					}

					doc._deleted = true;
					doc._dirty = new Date();
					doc._operation = operation;
				},
				ctx = {
					data : col.data,
					sf : col.searchFields,
					query: query,
					interceptor : interceptor,
					exact : options.exact
				};

			retData = __queryProcessor(ctx);

			//Items that were operation 'add' are local only so a remove, erases them
			_.each(addIds, function (id) {
				delete ctx.data[id - 1];
			});

			storage.write(store.metadata.username, collection, col)

			.then(function () {
				options.onSuccess(retData.length);
			})

			.fail(function () {
				options.onFailure(constant.PERSISTENT_STORE_FAILURE);
			});
		},

		_remove = function (collection, query, options) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function(){
					__removeImpl(collection, query, options);
				})

				.fail(function(){
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});
			}
		},

		__allDirtyImpl = function (collection, docs, options) {

			var data = store.collections[collection].data,
				result = [],
				found = [],
				idx = 0,
				curr;

			if (docs.length > 0 ) {

				_.each(docs, function (doc) {
					idx = doc._id - 1;
					curr = data[idx];
					if ((! check.isUndefined(curr)) && (curr[constant.DIRTY_KEY].length > 0)) {
						found.push(curr);
					}
				});

				options.onSuccess(found);

			} else {

				result = _.filter(data, function (doc) {
					return (! check.isUndefined(doc)) && (doc[constant.DIRTY_KEY].length > 0);
				});

				options.onSuccess(result);
			}
		},

		_allDirty = function (collection, docs, options) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function(){
					__allDirtyImpl(collection, docs, options);
				})

				.fail(function(){
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});

			}
		},

		__cleanImpl = function (collection, docs, deferred) {
			var col = store.collections[collection],
				data = col.data,
				doc,
				failedDoc = {},
				docId;

			_.each(docs, function(minimalDoc){
				//minimalDoc contains only _id and operation keys

				docId = minimalDoc._id -1;
				doc = data[docId];

				if (! check.isUndefined(doc)) {
					if (doc[constant.OPERATION_KEY] === constant.OPERATION_DELETED) {
						//do the actual delete here.
						data[docId] = null;
					} else {
						doc[constant.DIRTY_KEY] = '';
						doc[constant.DELETED_KEY] = false;
						doc[constant.OPERATION_KEY] = '';
					}

				} else {
					failedDoc = doc;
				}
			});

			storage.write(store.metadata.username, collection, col)

			.then(function () {
				deferred.resolve();
			})

			.fail(function () {
				deferred.reject(failedDoc);
			});
		},

		_clean = function (collection, docs) {
			var deferred = $.Deferred();

			if (! store.isOpen(collection)) {

				setTimeout(function(){
					deferred.reject(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function(){
					__cleanImpl(collection, docs, deferred);
				})

				.fail(function(){
					deferred.reject(constant.PERSISTENT_STORE_FAILURE);
				});
			}
			return deferred.promise();

		},

		__localCountImpl = function (collection, options) {
			var data = store.collections[collection].data,
				count = 0,
				memo = 0,
				iterator = function (memo, doc) {
					if (check.isUndefined(doc) || doc[constant.DIRTY_KEY].length === 0) {
						return memo;
					} else {
						return memo + 1;
					}
				};

			count = _.reduce(data, iterator, memo);

			options.onSuccess(count);
		},

		_localCount = function (collection, options) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function () {
					__localCountImpl(collection, options);
				})

				.fail(function () {
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});
			}
		},

		__countWholeCollectionImpl = function (collection, options) {

			var data = store.collections[collection].data,
				count = 0,
				memo = 0,
				iterator = function (memo, doc) {
					if (check.isUndefined(doc) || doc[constant.DELETED_KEY]) {
						return memo;
					} else {
						return memo + 1;
					}
				};

			count = _.reduce(data, iterator, memo);
			options.onSuccess(count);
		},

		__countWithQuery = function (collection, options, query) {

			var internalSuccessCallback = function (res) {
				//We only need to return the length of the results, not the actual results
				options.onSuccess(res.length);
			},

			ops = _.defaults({onSuccess: internalSuccessCallback}, options);

			_findImpl(collection, [query], ops);
		},

		_count = function (collection, options, query) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function () {
					if (check.isSimpleObject(query)) {
						
						__countWithQuery(collection, options, query);

					} else {

						__countWholeCollectionImpl(collection, options);
					}
					
				})

				.fail(function () {
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});
			}

		},

		__isDirtyImpl = function (collection, id, options) {
			var data = store.collections[collection].data,
				docId = id - 1,
				rc = 0;

			if (! check.isUndefined(data[docId])) {
				rc = data[docId][constant.DIRTY_KEY].length > 0 ? 1 : 0;
				options.onSuccess(rc);
			}
		},

		_isDirty = function (collection, docId, options) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				store.refresh(collection)

				.then(function(){
					__isDirtyImpl(collection, docId._id, options);
				})

				.fail(function(){
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});
			}
		},

		__clearImpl = function (collection, options) {
			storage.clear(store.metadata.username, collection)

			.then(function(){
				store.removeOpened(collection);
				options.onSuccess(constant.SUCCESS);
			})

			.fail(function(){
				options.onFailure(constant.ERROR_CLEARING_COLLECTION);
			});
		},

		_clear = function (collection, options) {

			if (! store.isOpen(collection)) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				__clearImpl(collection, options);
			}
		},

		_storeSalt = function (salt, options) {
			//Encryption not implemented in the browser code.
		},

		_storeDPK = function (secRand, password, salt, username, localKeyGen, options) {
			//Encryption not implemented in the browser code.
			password = null;
		},

		__changePWImpl = function (oldPw, newPw, username, options) {

			var oldHash = __hashPassword(oldPw),
				newHash = __hashPassword(newPw);

			if (store.metadata.username === username && oldHash === store.metadata.pwHash) {

				store.metadata.pwHash = newHash;

				store.saveStoreMetadata()

				.then(function () {
					options.onSuccess(constant.SUCCESS);
				})

				.fail(function () {
					options.onFailure(constant.PERSISTENT_STORE_FAILURE);
				});

			} else { //bad old password or wrong username

				setTimeout(function ()  {
					options.onFailure(constant.ERROR_CHANGING_PASSWORD);
				}, 0);
			}
		},

		_changePW = function (oldPw, newPw, username, options) {

			if (! store.anyOpen()) {

				setTimeout(function () {
					options.onFailure(constant.PERSISTENT_STORE_NOT_OPEN);
				}, 0);

			} else {

				__changePWImpl(oldPw, newPw, username, options);
			}

			//Clear passwords from memory
			oldPw = null;
			newPw = null;
		},

		_isKeyGenRequired = function (username, options) {

			setTimeout(function () {
				options.onSuccess(constant.KEYGEN_NOT_REQUIERED);
			}, 0);

		},

		_closeDatabase = function(options) {

			__createNewStore();

			setTimeout(function () {
				options.onSuccess(constant.SUCCESS);
			}, 0);

		},

		_destroy = function (options) {

			__createNewStore();

			storage.destroy()

			.then(function () {
				options.onSuccess(constant.SUCCESS);
			})

			.fail(function (e) {
				options.onFailure(e);
			});
		};

		//public API
		return {
			provision : _provision,
			store : _store,
			find : _find,
			findById : _findById,
			replace : _replace,
			remove : _remove,
			allDirty: _allDirty,
			pushRequiredCount : _localCount,
			count : _count,
			isPushRequired : _isDirty,
			markpushed : _clean,
			removeCollection : _clear,
			storeSalt : _storeSalt,
			storeDPK : _storeDPK,
			isKeyGenRequired: _isKeyGenRequired,
			changePassword: _changePW,
			closeAll : _closeDatabase,
			destroy : _destroy
		};

	}(WLJQ, WL_));//WL.browser
}

/**
Provides the API for storing JSON data locally, it may be linked to an adapter for data syncronization.
**/
WL._JSONStoreImpl = (function (jQuery, underscore) {

	'use strict';

	/**
		Dependencies
		@private
	*/
	var db = WL.db || WL.browser,
		_ = underscore,
		check = WL.check,
		cb = WL.callback,
		constant = WL.constant,
		eoc = WL.EncryptedCache,
		jspath = WL.jspath,
		$ = jQuery,
		ErrorObject = cb.ErrorObject,
		/**
			CONSTANTS / GLOBALS
			@private
		*/
		COLLECTIONS = {},
		EVENT_LABELS = {success: 'WL/JSONSTORE/SUCCESS', failure: 'WL/JSONSTORE/FAILURE'},
		ERROR = constant.ERROR,
		PWD,
		UNDEF,

		/**
			Interacts with a single collection.
			@private
			@param name {string} Collection name.
			@param searchFields {searchFields}
			@param [adapter] {Adapter}
		*/
		JSONStoreInstance = function (name, searchFields, adapter, additionalSearchFields, username, deferred) {

			this.name = name || '';
			this.username = username || constant.DEFAULT_USERNAME;
			this.searchFields = searchFields || {};
			this.adapter = adapter; //no default value for backwards compatibility
			this.additionalSearchFields = additionalSearchFields || {};
			this.promise = deferred.promise();
		},

		/**
			Used to preserve state while pushing.
			@private
			@param pushData {object} Contains the following: 'name' with the collection name,
				'adapter' is an Adapter and 'data' is what we want to push.
		*/
		PushInstance = function (pushData) {

			this.pushData = pushData;
		},

		/**
			Handles failure cases (mostly for push), where we need to do the following:
			- Populate an error object
			- Call the failure callback
			- Async reject of the promise
			@private
			@param errObj {err: object, errCode: int, onFailure: function, deferred: object, doc: <doc object>}
				An object containing all the data we need
		*/
		__handleErrorReturn = function (errObj) {
			var e = errObj.err || {};

			e.err = errObj.errCode;
			e.msg = WL.JSONStore.getErrorMessage(errObj.errCode);

			setTimeout(function () {
				errObj.onFailure(e.err, e.doc);
				errObj.deferred.reject(new ErrorObject(e));
			}, 0);

			return errObj.deferred.promise();
		},

		/**
			Handles success cases (mostly for push), where we need to do the following:
			- Call the success callback
			- Async resolve of the promise
			@private
			@param errObj {retCode: < to callback, ret val>, retVal: <to promise, return val>, onSuccess: function, deferred: object}
				An object containing all the data we need
		*/
		__handleSuccessReturn = function (obj) {

			setTimeout(function () {
				obj.onSuccess(obj.retCode);
				obj.deferred.resolve(obj.retVal);
			}, 0);

			return obj.deferred.promise();
		},

		/**
			Log deprecated message
			@private
			@param old {string} old function
			@param alt {string} new function
		 */

		__logDeprecatedMessage = function (old, alt) {
			if (check.isObject(WL) && check.isObject(WL.Logger) && check.isFunction(WL.Logger.debug)) {
				WL.Logger.ctx({pkg: constant.PKG_NAME}).debug('[Deprecated] ' + old + ', use ' + alt+ ' instead.');
			}
		},

		/**
			Used to generated onSuccess and onFailure callbacks
			@private
			@param options {object} should contain `onSuccess` and `onFailure` keys
			@param src {string} name of the function that generated the callbacks (ie. find, replace, etc.)
			@return {object} An object that has an onSuccess and onFailure key.
		*/
		__generateCallbacks = function (options, src, collectionName, username, deferred) {

			return cb.generate(options, EVENT_LABELS, src, collectionName, username, deferred);
		},

		/**
			Used to check if we can call down to native with data after it's validated an put in an array.
			@private
			@param arr {array} should contain `onSuccess` and `onFailure` keys
			@param callbacks {string} An object that has an onSuccess and onFailure key.
			@return {object} True if there's something in the array, false otherwise.
		*/
		__validDataExists = function (arr, callbacks) {

			if (arr.length > 0) {

				return true;

			} else {

				setTimeout(function () {
					callbacks.onFailure(constant.BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS);
				}, 0);

				return false;
			}
		},

		/**
			If data is a an object or an array of objects, push it to an array.
			@private
			@param data {object or array of objects} Object we are going to check.
			@return {array} Array with objects in every index
		*/
		__getDataArray = function (data) {

			var arrayOfObjects = [],
				i = 0;

			if (check.isObject(data)) {

				arrayOfObjects.push(data);

			} else if (check.isArrayOfObjects(data)) {

				for ( ; i < data.length; i++) {

					if (check.isObject(data[i])) {

						arrayOfObjects.push(data[i]);

					} else {

						return [];
					}
				}
			}

			return arrayOfObjects;
		},

		/**
			If data is a valid document, a simple object (query), an array of documents or an integer (_id) push it to an array.
			@private
			@param doc {document, simple object, array of documents or int} Valid values.
			@param idOnly {boolean} Determines if we return {_id: [int]} or a whole document.
			@return {array} Array with one of more of those in every index.
		*/
		__getQueryArray = function (doc, obj) {

			obj = obj || {};

			var idQueryObj = {},
				arrayOfQueries = [],
				i = 0,
				len = 0,
				idOnly = obj.idOnly || false,
				fakeDoc = obj.fakeDoc || false,
				idArray = obj.idArray || false,
				isQueryValid = obj.isQueryValid || false;

			if (check.isValidDocument(doc)) {

				if(idOnly){
					idQueryObj[constant.ID_KEY] = doc[constant.ID_KEY];
					arrayOfQueries.push(_.cloneDeep(idQueryObj));				}
				else {
					arrayOfQueries.push(doc);
				}

			} else if (isQueryValid && check.isSimpleObject(doc)) {

				arrayOfQueries.push(doc);

			} else if (check.isArrayOfObjects(doc)) {

				for ( ; i < doc.length; i++) {

					if (check.isValidDocument(doc[i])) {

						if(idOnly){
							idQueryObj[constant.ID_KEY] = doc[i][constant.ID_KEY];
							arrayOfQueries.push(_.cloneDeep(idQueryObj));						
							}
						else{
							arrayOfQueries.push(doc[i]);
						}

					} else {

						return [];
					}
				}

			} else if (idOnly && check.isInt(doc)) {

				idQueryObj[constant.ID_KEY] = doc;

				if (fakeDoc) { //Special case for push, we need this to pass validation
					idQueryObj[constant.JSON_DATA_KEY] = {};
				}

				arrayOfQueries.push(_.cloneDeep(idQueryObj));

			} else if (idArray && check.isArrayOfInts(doc)) {
				len = doc.length;
				while (len--) {
					arrayOfQueries.push({_id: doc[len], json: {}});
				}
			}

			return arrayOfQueries;
		},

		/**
			Holds the push logic that is used via push and pushSelected.
			@private
			@param [options] {Options}
			@param name {string} Collection name.
			@param searchFields {searchFields}
		*/
		__push = function (options, name, username, adapter, doc) {

			var deferred = $.Deferred(),
				collectionAdapter = adapter,
				collectionName = name,
				usr = username || '',
				errObject = {src: 'push', col: collectionName, usr: username},
				callbacks = __generateCallbacks(options, 'push', collectionName, usr, null),
				arrayOfObjects = [],
				arr = [],
				retarr = [],
				i = 0,
				len = 0,
				inst = {},

				allDirtySuccess = function (data) {

					len = data.length;

					if (len < 1) {

						return __handleSuccessReturn({ retCode: constant.SUCCESS,
							retVal: retarr,
							onSuccess: callbacks.onSuccess,
							deferred: deferred
						});

					}

					//Time to push the data Array we got back
					for (i = 0; i < len; i++) {

						inst = new PushInstance({name: collectionName, adapter: collectionAdapter, data: data[i],
							onSuccess: callbacks.onSuccess, onFailure: callbacks.onFailure, usr: usr});
						arr.push(inst.invokeProcedure({timeout: adapter.timeout}));
					}

					$.when.apply($, arr).then(function () {

						var args = Array.prototype.slice.call(arguments);
						var errors = [];
						var docs = [];
						_.each(args, function(a){
							if(a instanceof ErrorObject){
								errors.push(a);
							}else{
								docs.push(a);
							}
						});

						if(docs.length > 0){
							db.markpushed(collectionName, docs)

							.then(function(){
								//backwards compat. go to the succ cb for each doc, with a 0.
								var l = docs.length;
								while(l--){
									callbacks.onSuccess(constant.SUCCESS);
								}

								if(errors.length > 0){
									deferred.resolve(errors);
								}else{
									deferred.resolve(retarr);
								}
							})
							.fail(function(badDoc){
								//backwards compat. go to the succ cb for each doc, with a 0.

								var rc = constant.COULD_NOT_MARK_DOCUMENT_PUSHED;
								callbacks.onFailure(rc);

								$.extend(errObject, {
									err : rc,
									msg : WL.JSONStore.getErrorMessage(rc),
									doc : badDoc
								});
								errors.push(new ErrorObject(errObject));
								deferred.resolve(errors);
							});
						}else{
							//All the docs we tried to push were errors, we've already
							//called the error cb N times, so resolve the promise
							//with all the failed docs
							deferred.resolve(errors);
						}

					});
				},

				allDirtyFailure = function (data) {
					// If we get the special "can not access the database manager" failure, then return that
					// otherwise, return we could not find dirty doc

					if (data === constant.PERSISTENT_STORE_NOT_OPEN) {

						return __handleErrorReturn( {err : errObject,
							errCode : data,
							onFailure : callbacks.onFailure,
							deferred : deferred
						});

					} else {

						return __handleErrorReturn( {err : errObject,
							errCode : constant.FAILED_TO_GET_UNPUSHED_DOCUMENTS_FROM_DB,
							onFailure : callbacks.onFailure,
							deferred : deferred
						});

					}

				};

			//Checks if collectionAdapter is an object with a key 'name' that has a string value.
			if (!check.isValidAdapter(collectionAdapter)) {

				return __handleErrorReturn( {err : errObject,
					errCode : constant.NO_ADAPTER_LINKED_TO_COLLECTION,
					onFailure : callbacks.onFailure,
					deferred : deferred
				});
			}

			if (check.isUndefined(doc) && doc !== null ) {

				//Get ALL of the dirty records in the database
				db.allDirty(collectionName, [], {onSuccess: allDirtySuccess, onFailure: allDirtyFailure});

			} else if (check.isValidDocument(doc)) {

				db.allDirty(collectionName, [doc], {onSuccess: allDirtySuccess, onFailure: allDirtyFailure});

			} else if (check.isArrayOfObjects(doc)) {

				for (i = 0, len = doc.length ; i < len; i++) {

					if (check.isValidDocument(doc[i])) {

						arrayOfObjects.push(doc[i]);
					} else {

						errObject.data = doc[i];
						return __handleErrorReturn( {err : errObject,
							errCode : constant.BAD_PARAMETER_EXPECTED_DOCUMENT,
							doc: doc[i],
							onFailure : callbacks.onFailure,
							deferred : deferred
						});

					}
				}

				db.allDirty(collectionName, arrayOfObjects, {onSuccess: allDirtySuccess, onFailure: allDirtyFailure});

			} else {
				//Trying to call push with invalid data

				return __handleErrorReturn( {err : errObject,
					errCode : constant.BAD_PARAMETER_EXPECTED_DOCUMENT_OR_ARRAY_OF_DOCUMENTS,
					onFailure : callbacks.onFailure,
					deferred : deferred
				});
			}

			return deferred.promise();
		},

		/**
			Holds the store and add logic.
			@private
			@param name {string} Collection name.
			@param searchFields {searchFields}
			@param data {Object} Data we want to store or add.
			@param [options] {Options}
		*/
		__store = function (name, username, searchFields, additionalSearchFields, data, options) {

			var deferred = $.Deferred(),
				arrayOfObjects = __getDataArray(data),
				usr = username || '',
				callbacks = __generateCallbacks(options, 'store', name, usr, deferred),
				additionalSearchFieldsObj = options.additionalSearchFields;

			callbacks.isAdd = options.isAdd;

			if (check.isSimpleObject(additionalSearchFieldsObj)) {

				if (check.isPartofSearchFields(additionalSearchFieldsObj, searchFields, additionalSearchFields)) {

					callbacks.additionalSearchFields = additionalSearchFieldsObj;
				} else {

					callbacks.onFailure(constant.INVALID_ADD_INDEX_KEY);
				}
			}

			if(__validDataExists(arrayOfObjects, callbacks)){
				db.store(name, arrayOfObjects, callbacks);
			}

			return deferred.promise();
		},

		/**
			Holds the replace and refresh logic.
			@private
			@param name {string} Collection name.
			@param doc {Document} Document we want to replace or refresh.
			@param [options] {Options}
		*/
		__replace = function (name, username, doc, options) {

			var deferred = $.Deferred(),
				arrayOfQueries = __getQueryArray(doc, {idOnly: false, isQueryValid: false}),
				usr = username || '',
				callbacks = __generateCallbacks(options, 'replace', name, usr, deferred);

			callbacks.isRefresh = options.isRefresh;

			if(__validDataExists(arrayOfQueries, callbacks)){
				db.replace(name, arrayOfQueries, callbacks);
			}

			return deferred.promise();
		},

		/**
			Holds the remove and erase logic.
			@private
			@param name {string} Collection name.
			@param doc {Document} Document we want to remove or erase.
			@param [options] {Options}
		*/
		__remove = function (name, username, doc, options) {

			var deferred = $.Deferred(),
				arrayOfQueries = __getQueryArray(doc, {idOnly: true, isQueryValid: true}),
				usr = username || '',
				callbacks = __generateCallbacks(options, 'remove', name, usr, deferred);

			callbacks.isErase = options.isErase;
			callbacks.exact = check.isBoolean(options.exact) ? options.exact : false;


			if(__validDataExists(arrayOfQueries, callbacks)){
				db.remove(name, arrayOfQueries, callbacks);
			}

			return deferred.promise();
		},

		__handleOptions = function (options) {

			var opts = {};

			if (check.isObject(options)) {

				if (check.isBoolean(options.exact)) {
					opts.exact = options.exact;
				}

				if (check.isUndefined(options.limit) && check.isInt(options.offset)) {
					throw constant.OFFSET_WITHOUT_LIMIT;
				}

				if (check.isInt(options.limit)) {

					if(options.limit < 0 ) {
						//If limit is negative, we can not have an offset
						if (!check.isUndefined(options.offset) ){
							throw constant.INVALID_LIMIT_OR_OFFSET;
						}
					}

					opts.limit = options.limit;

					if (check.isInt(options.offset)) {

						if (options.offset < 0) {
							throw constant.INVALID_LIMIT_OR_OFFSET;
						}

						opts.offset = options.offset;
					}
				}
			}

			return opts;
		},

		__handleQueryObject = function (query, searchFields, additionalSearchFields) {

			if (check.isSimpleObject(query)) { //Arrays are not valid objects

				if (check.isPartofSearchFields(query, searchFields, additionalSearchFields)) {
					return [query];

				} else {
					throw constant.INVALID_SEARCH_FIELD;
				}

			} else if (check.isArrayOfObjects(query)) {

				for (var i = 0, len = query.length ; i < len; i++) {

					if(! check.isPartofSearchFields(query[i], searchFields, additionalSearchFields)){
						throw constant.INVALID_SEARCH_FIELD;
					}
				}

				return query;

			} else if (Array.isArray(query) && query.length < 1) {

				return [];

			} else {

				throw constant.BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT;
			}
		},

		/**
			Holds the find and findAll logic.
			@private
			@param name {string} Collection name.
			@param query {Query} Object with a search key from the searchFields
				and a search term in the value. FindAll passes an empty object.
			@param [options] {Options}
		*/
		__find = function (name, username, query, searchFields, additionalSearchFields, options) {

			var deferred = $.Deferred(),
				queries,
				callbacks = __generateCallbacks(options, 'find', name, username || '', deferred);

			callbacks.exact = false;

			try {
				//Limit and offset are appended to the callbacks obj
				_.extend(callbacks, __handleOptions(options));

				queries = __handleQueryObject(query, searchFields, additionalSearchFields);

				if (queries.length === 0) { //Empty query array passed

					setTimeout(function () {
						callbacks.onSuccess(queries);
					}, 0);

				} else {

					db.find(name, queries, callbacks);
				}

			} catch (rc) {
				setTimeout(function () {
					callbacks.onFailure(rc);
				}, 0);
			}

			return deferred.promise();
		},

		/**
			Creates a Document.
		*/
		_documentify = function (id, data) {

			var documentId = Number(id),
				documentToReturn = {};

			if (!check.isInt(documentId)) {

				return constant.BAD_PARAMETER_EXPECTED_INT;
			}

			if (!check.isObject(data)) {

				return constant.BAD_PARAMETER_EXPECTED_OBJECT;
			}

			documentToReturn[constant.ID_KEY] = documentId;
			documentToReturn[constant.JSON_DATA_KEY] = data;

			return documentToReturn;
		},

		/**
			Sets the password used to generate keys to encrypt date stored locally on the device.
		*/
		_usePassword = function (pwd) {

			__logDeprecatedMessage('WL.JSONStore.usePassword', 'WL.JSONStore.init');

			if (check.isString(pwd) && pwd.length > 0) {

				PWD = pwd;
				return true;

			} else {

				return false;

			}
		},

		/**
			Removes the password from memory.
		*/
		_clearPassword = function () {

			__logDeprecatedMessage('WL.JSONStore.clearPassword', 'WL.JSONStore.init');

			if(check.isUndefined(PWD)){
				return false;
			}else{
				PWD = null;
				return (PWD === null);
			}

		},

		/**
			Closes all the collections in JSONStore.
		*/
		_closeAll = function (options) {

			COLLECTIONS = {};

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'closeAll', '', '', deferred);

			db.closeAll(callbacks);

			return deferred.promise();
		},

		/**
			Changes the password for the internal storage.
		*/
		_changePassword = function (oldPW, newPW, user, options) {

			var deferred = $.Deferred();

			//Preserve legacy signature of changePassword(oldPW, newPW, options)
			var opts = {
					onSuccess: function () {},
					onFailure: function() {}
				},
				usr = WL.constant.DEFAULT_USERNAME,
				rc = constant.SUCCESS;

			if (check.isString(user) && user.length > 0) {
				usr = user;

				if (!check.isAlphaNumeric(usr) || check.isReservedWord(usr)) {
					rc = constant.INVALID_USERNAME;
				}
			}

			if (check.isObject(user)) {
				opts.onSuccess = (typeof user.onSuccess === 'function') ? user.onSuccess : function () {};
				opts.onFailure = (typeof user.onFailure === 'function') ? user.onFailure : function () {};

			} else if(check.isObject(options)) {
				opts.onSuccess = (typeof options.onSuccess === 'function') ? options.onSuccess : function () {};
				opts.onFailure = (typeof options.onFailure === 'function') ? options.onFailure : function () {};
			}

			var callbacks = __generateCallbacks(opts, 'changePassword', '', usr, deferred);

			if (rc !== constant.SUCCESS) {

				//Invalid username
				setTimeout(function () {
					callbacks.onFailure(rc);
				}, 0);
				return deferred.promise();
			}

			if (check.isString(oldPW) && oldPW.length > 0 &&
				check.isString(newPW) && newPW.length > 0) {

				db.changePassword(oldPW, newPW, usr, callbacks);

			} else {
				// Both Passwords must be an alphanumeric string of length greater than zero
				setTimeout(function () {
					callbacks.onFailure(constant.INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO);
				}, 0);
			}

			return deferred.promise();
		},

		/**
			A complete data wipe for all users, destroys the internal storage and clears the secuirty artifacts.
		*/
		_destroy = function (options) {

			COLLECTIONS = {};

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'destroy', '', '', deferred);

			db.destroy(callbacks);

			return deferred;
		},

		/**
			Returns the message associated with a JSONStore-specific status/error code.
		*/
		_getErrorMessage = function (statusCode) {

			if(!check.isInt(statusCode)){
				return constant.NOT_FOUND;
			}

			return ERROR[statusCode] || constant.NOT_FOUND;
		},

		/**
			Returns a JSONStoreInstance linked to a collection or undefined if the instance is not found.
		 */
		_get = function (collection) {

			return COLLECTIONS[collection];
		},

		/**
			Initializes a set of collections.
		 */

		_init = function (collections, options) {

			options = options || {};

			if(check.isBoolean(options.clear) && options.clear) {
				COLLECTIONS = {};
			}

			var arrp = [],
				def = $.Deferred(),
				col,
				first,
				firstPromise,
				otherPromise,
				errCode,
				returnError = function (err) {
					COLLECTIONS = {};
					def.reject(err);
				},
				setOptions = function (key) {
					options.adapter = collections[key].adapter;
					options.additionalSearchFields = collections[key].additionalSearchFields || {};
				},
				addToCollections = function (key, value) {
					COLLECTIONS[key] = value;
				},
				genSearchFields = function (key) {
					return collections[key].searchFields || {};
				},
				errorFoundReject = function (faultyPromise, col) {
					errCode = check.isInt(faultyPromise) ? faultyPromise : -100;

					def.reject(new ErrorObject({err: errCode,
								msg: WL.JSONStore.getErrorMessage(errCode),
								src: 'initCollection',
								usr: options.username || WL.constant.DEFAULT_USERNAME,
								col: col
					}));
				};

			if (check.countKeys(collections) < 1) {

				setTimeout(function () {
					def.resolve({});
				}, 0);

			} else {

				for (first in collections) { break; }

				setOptions(first);

				col = _provisionCollection(first, genSearchFields(first), options);

				addToCollections(first, col);

				firstPromise = col.promise;

				if (check.isUndefined(firstPromise)) {

					errorFoundReject(col, first);

				} else {

					firstPromise.then(function () {

						for (var name in collections) {

							if (first !== name) {
								setOptions(name);

								//The password was already used during the first init, we clear it here
								options.password = null;

								col = _provisionCollection(name, genSearchFields(name), options);
								otherPromise = col.promise;

								if (check.isUndefined(otherPromise)) {

									errorFoundReject(col, name);

								} else {
									arrp.push(col.promise);
									addToCollections(name, col);
								}
							}
						}

						$.when.apply(this, arrp)

						.done(function () {
							def.resolve(COLLECTIONS);
						})

						.fail(returnError);
					})

					.fail(returnError);
				}

			}

			return def;
		},

		/**
			Creates an new object to interact with a single collection.
		*/
		_provisionCollection = function (name, searchFields, options) {

			var instance,
				deferred = $.Deferred(),
				collectionAdapter,
				collectionName = '',
				username = WL.constant.DEFAULT_USERNAME,
				collectionsearchFields = {},
				collectionAdditionalSearchFields = {},
				collectionOptions = {},
				dropCollection = false,
				fipsEnabled = WL.Client.__state().enableFIPS,
				localKeyGen = false,
				collectionPassword = '',
                key = '',
                hasOwn = Object.prototype.hasOwnProperty,
				callbacks = __generateCallbacks(options, 'initCollection', name, username, deferred),
				checkKeysCB;

			if (check.isObject(options)) {

				if (check.isBoolean(options.dropCollection)) {
					dropCollection = options.dropCollection;
				}

				if (check.isBoolean(options.fipsEnabled)) {
					WL.Logger.ctx({pkg: constant.PKG_NAME}).warn("fipsEnabled option is deprecated.  Use initOptions.enableFIPS instead.");
				}

				if (check.isBoolean(options.localKeyGen)){
					localKeyGen = options.localKeyGen;
				}

				if(check.isString(options.username) && options.username.length > 0) {

					username = options.username;

					if(!check.isAlphaNumeric(username) || check.isReservedWord(username)) {

						//Those are default usernames that are used only in old versions of JSONStore
						//and the special case where it's not an alphanumeric string
						callbacks.onFailure(constant.INVALID_USERNAME);
						return constant.INVALID_USERNAME;
					}

					//Regenerate callback using the correct username
					callbacks = __generateCallbacks(options, 'initCollection', name, username, deferred);
				}

				//check if the password key exists
				if (!check.isUndefined(PWD)) {
					//validate passswrd
					if (check.isString(PWD) && PWD.length > 0) {
						collectionPassword = PWD;
					}else{

						callbacks.onFailure(constant.INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO);
						return constant.INVALID_PASSWORD_EXPECTED_ALPHANUMERIC_STRING_WITH_LENGTH_GREATER_THAN_ZERO;
					}
				}

				if (check.isString(options.password) && options.password.length > 0) {
					collectionPassword = options.password;
				}

				if (check.isValidAdapter(options.adapter)) {
					collectionAdapter = options.adapter;
				}
			}

			//Collection names need be alphanumeric and start with /[a-z]/i
			if (check.isAlphaNumeric(name) && !check.isNumber(name.charAt(0))) {
				collectionName = name;
			} else {

				callbacks.onFailure(constant.BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING);
				return constant.BAD_PARAMETER_EXPECTED_ALPHANUMERIC_STRING;
			}

			//searchFields
			if (check.isSimpleObject(searchFields) && !check.containsDuplicateKeys(searchFields)) {

				if (!check.isValidSchemaObject(searchFields)) {
					callbacks.onFailure(constant.INVALID_SEARCH_FIELD_TYPES);
					return constant.INVALID_SEARCH_FIELD_TYPES;
				}

				//Make lowercase
				for (key in searchFields) {
					if (hasOwn.call(searchFields, key)) {
						collectionsearchFields[key.toLocaleLowerCase()] = searchFields[key];
					}
				}

			} else {
				callbacks.onFailure(constant.BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT);
				return constant.BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT;
			}

			//Additional search fields (optional parameter)
			if (check.isObject(options) && !check.isUndefined(options.additionalSearchFields)) {

				if (check.isSimpleObject(options.additionalSearchFields) &&
					!check.containsDuplicateKeys(options.additionalSearchFields)) {

					//Make lowercase
					for (key in options.additionalSearchFields) {
						if (hasOwn.call(options.additionalSearchFields, key)) {
							collectionAdditionalSearchFields[key.toLocaleLowerCase()] = options.additionalSearchFields[key];
						}
					}

				} else {
					callbacks.onFailure(constant.BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT);
					return constant.BAD_PARAMETER_EXPECTED_SIMPLE_OBJECT;
				}

				if (check.countKeys(collectionAdditionalSearchFields) + check.countKeys(collectionsearchFields) !==
					check.countKeys(check.mergeObjects(collectionAdditionalSearchFields, collectionsearchFields))) {
					callbacks.onFailure(constant.INVALID_SEARCH_FIELD);
					return constant.INVALID_SEARCH_FIELD;
				}
			}

			instance = new JSONStoreInstance(collectionName, collectionsearchFields, collectionAdapter,
				collectionAdditionalSearchFields, username, deferred);

			collectionOptions = {dropCollection: dropCollection, collectionPassword: collectionPassword,
					additionalSearchFields: collectionAdditionalSearchFields, username: username,
					localKeyGen: localKeyGen, fipsEnabled: fipsEnabled,
					onSuccess: callbacks.onSuccess, onFailure: callbacks.onFailure};


			checkKeysCB = function (result) {
				var salt = '' + eoc.random(),
				sr = '';


				if (result === constant.KEYGEN_NOT_REQUIERED) {
					//All the keys are in the keychain, just need to pass user PW
					db.provision(collectionName, collectionsearchFields, collectionOptions);
				}else if (localKeyGen === true){
					//User requested local key gen instead of getting from server
					db.storeDPK(null, collectionPassword, salt, username, localKeyGen,
						{ onSuccess : function () {
							db.provision(collectionName, collectionsearchFields, collectionOptions);
						}
					});
				} else {
					//Need to gen keys and store in keychain
					eoc.secureRandom(function(response) {
						if (response === eoc.ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE) {
							callbacks.onFailure(constant.COULD_NOT_GET_SECURE_KEY);
							return constant.COULD_NOT_GET_SECURE_KEY;
						}
						sr =  '' + response;
						db.storeDPK(sr, collectionPassword, salt, username, localKeyGen, {
							onSuccess : function () {
								db.provision(collectionName, collectionsearchFields, collectionOptions);
							}
						});
					});
				}
			};

			//ANDROID-FIX: Provision blocks and returns before 'return instance'
			setTimeout(function () {
				if(collectionPassword.length > 0){
					//User specified a pw
					//If the user specified a password, we need to see if all of the keys are provisioned.
					db.isKeyGenRequired(username, {onSuccess: checkKeysCB});

				}else{
					//Create the tables with the searchFields the user provided
					db.provision(collectionName, collectionsearchFields, collectionOptions);
				}
			}, 0);

			return instance;
		},


		/**
			See _provisionCollection, the code below is used to deal with load = true.
			@private
		*/
		_initCollection = function (name, searchFields, options) {

			var instance;

			if (check.isObject(options) && check.isBoolean(options.load) &&
				options.load && check.isObject(options.adapter) &&
				check.isValidLoadObject(options.adapter.load)) {

				var userOnSuccessCallback = function () {},
					userOnFailureCallback = function () {},

					provisionSuccessData = 0,

					onLoadSuccessCallback = function (data) {

						userOnSuccessCallback(provisionSuccessData);

					},

					onCountSuccessCallback = function (count) {

						if (count === 0) {
							instance.load({onFailure: userOnFailureCallback, onSuccess: onLoadSuccessCallback});
						} else {
							userOnSuccessCallback(provisionSuccessData);
						}

					},

					onProvisionSuccessCallback = function (data) {

						provisionSuccessData = data;

						instance.count({onFailure: userOnFailureCallback, onSuccess: onCountSuccessCallback});

					};

				if(check.isFunction(options.onSuccess)){
					userOnSuccessCallback = options.onSuccess;
				}

				if(check.isFunction(options.onFailure)){
					userOnFailureCallback = options.onFailure;
				}

				options.onSuccess = onProvisionSuccessCallback;
				options.onFailure = userOnFailureCallback;

				instance = _provisionCollection(name, searchFields, options);


			} else {

				instance = _provisionCollection(name, searchFields, options);
			}

			return instance;

		};

	PushInstance.prototype =  {

		/**
			Invoke the adapter linked to the collection.
			@private
		*/
		invokeProcedure : function (options) {

			var deferred = $.Deferred(),
				collectionName = this.pushData.name,
				usr = this.pushData.usr,
				errorObject = {src: 'push', col: collectionName, usr: usr},
				onFailure = this.pushData.onFailure,
				collectionAdapter = this.pushData.adapter,
				collectionDocument = this.pushData.data[constant.JSON_DATA_KEY],
				documentId = this.pushData.data[constant.ID_KEY],
				documentOperation = this.pushData.data[constant.OPERATION_KEY],
				documentIdAndOperationObj = {},
				ipOpts = {},

				adapterSuccess = function (data) {

					documentIdAndOperationObj[constant.ID_KEY] = documentId;
					documentIdAndOperationObj[constant.OPERATION_KEY] = documentOperation;

					var acceptCondition = check.isUndefined(collectionAdapter.accept) ||
						collectionAdapter.accept(data, collectionDocument);

					if (acceptCondition) {
						deferred.resolve(documentIdAndOperationObj);

					} else {

						errorObject.err = constant.ACCEPT_CONDITION_FAILED;
						errorObject.msg = WL.JSONStore.getErrorMessage(constant.ACCEPT_CONDITION_FAILED);
						errorObject.doc = collectionDocument;
						deferred.resolve(new ErrorObject(errorObject));
						adapterFailure(data);
					}
				},

				adapterFailure = function (data) {
					if(deferred.state() !== 'resolved'){
						errorObject.err = constant.ADAPTER_FAILURE;
						errorObject.msg = WL.JSONStore.getErrorMessage(constant.ADAPTER_FAILURE);
						errorObject.res = data;
						errorObject.doc = collectionDocument;

						deferred.resolve(new ErrorObject(errorObject));
					}
					//Must call the callback with rc 12 to preserve backwards compatibility with
					//th pre-promises api
					onFailure(constant.ADAPTER_FAILURE, data);
				},

				invocationData = {
					adapter : collectionAdapter.name,
					procedure : collectionAdapter[documentOperation],
					parameters : [JSON.stringify(collectionDocument)]
				};

			if (check.isString(invocationData.procedure) && invocationData.procedure.length > 0 ) {
				ipOpts.onSuccess = adapterSuccess;
				ipOpts.onFailure = adapterFailure;

				if (!check.isUndefined(options.timeout) ){
					ipOpts.timeout = options.timeout;
				}

				WL.Client.invokeProcedure(invocationData, ipOpts);

			} else {

				errorObject.err = constant.UNDEFINED_PUSH_OPERATION;
				errorObject.msg = WL.JSONStore.getErrorMessage(constant.UNDEFINED_PUSH_OPERATION);
				errorObject.doc = collectionDocument;

				deferred.resolve(new ErrorObject(errorObject));
				onFailure(constant.UNDEFINED_PUSH_OPERATION, documentOperation);
			}

			return deferred.promise();
		}

	};

	JSONStoreInstance.prototype = {

		/**
			Returns documents stored in the collection that match the query.
		*/
		find : function (query, options) {

			return __find(this.name, this.username, query, this.searchFields, this.additionalSearchFields, options);

		},

		/**
			Returns one or more documents that match the id or ids supplied to the function.
		*/

		findById : function (id, options) {

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'findById', this.name, this.username, deferred),
				callNative = false,
				param = [],
				validArrayOfInts = function () {
					for (var i = 0, len = id.length; i < len; i++ ) {

						if (!check.isInt(id[i])) {
							return false;
						}

					}
					return true;
				};

			//Check for valid values
			if (check.isInt(id)) {
				callNative = true;
				param = [id];
			}

			if(Array.isArray(id) && id.length > 0) {
				callNative = validArrayOfInts(id);
				param = id;
			}

			//Decide if we want to call native or return an error
			if (callNative) {
				db.findById(this.name, param, callbacks);
			} else {
				callbacks.onFailure(constant.INVALID_PARAMETER_FOR_FIND_BY_ID);
			}

			return deferred.promise();

		},

		/**
			Returns all the documents stored in a collection.
		*/
		findAll : function (options) {

			return __find(this.name, this.username, {}, this.searchFields, this.additionalSearchFields, options);
		},

		/**
			Used to initially load JSON objects into a collection as Documents.
		*/
		store : function (data, options) {

			__logDeprecatedMessage('collection.store(doc)', 'collection.add(doc, {push: false})');

			options = options || {};

			if (check.isUndefined(options.isAdd)) {
				options.isAdd = false;
			}

			return __store(this.name, this.username, this.searchFields, this.additionalSearchFields, data, options);

		},

		/**
			Adds data to a collection, creating a new Document(s).
		*/
		add : function (data, options) {

			options = options || {};

			if (check.isUndefined(options.isAdd)) {
				options.isAdd = true;
			}

			if (check.isBoolean(options.push)) {
				options.isAdd = options.push;
			}

			return __store(this.name, this.username, this.searchFields, this.additionalSearchFields, data, options);

		},

		/**
			Replaces a Document with another Document.
		*/
		replace : function (doc, options) {

			options = options || {};

			if (check.isUndefined(options.isRefresh)){
				options.isRefresh = false;
			}

			if (check.isBoolean(options.push)) {
				options.isRefresh = !options.push;
			}

			return __replace(this.name, this.username, doc, options);
		},

		/**
			Replaces a Document with another Document just like `replace`, but it does
				not mark that change to push to the back end via an adapter.
		*/
		refresh : function (doc, options) {

			__logDeprecatedMessage('collection.refresh(doc)', 'collection.replace(doc, {push: false})');

			options = options || {};

			if (check.isUndefined(options.isRefresh)) {
				options.isRefresh = true;
			}

			return __replace(this.name, this.username, doc, options);
		},

		/**
			Marks 1 or more Documents as removed from a collection.
		*/
		remove : function (doc, options) {

			options = options || {};

			if (check.isUndefined(options.isErase)) {
				options.isErase = false;
			}

			if (check.isBoolean(options.push)) {
				options.isErase = !options.push;
			}

			return __remove(this.name, this.username, doc, options);

		},

		/**
			Same as `remove` but will really remove the document from the internal storage instead
			of marking it for removal.
		*/
		erase : function (doc, options) {

			__logDeprecatedMessage('collection.erase(doc)', 'collection.remove(doc, {push: false})');

			options = options || {};

			if (check.isUndefined(options.isErase)) {
				options.isErase = true;
			}

			return __remove(this.name, this.username, doc, options);

		},

		/**
			Push the collection with an Adapter.
		*/
		push : function (options) {

            options = options || {};

            var arrayOfDocs = __getQueryArray(options, {idOnly: true, idArray: true, fakeDoc: true, isQueryValid: false});

            if (arrayOfDocs.length > 0) {
                return __push(options, this.name, this.username, this.adapter, arrayOfDocs);
            }

            return __push(options, this.name, this.username, this.adapter);
        },

		/**
			Pushes only the selected Documents.
		*/
		pushSelected : function (doc, options) {
			return __push(options, this.name, this.username, this.adapter, doc);
		},

		/**
			Determines if a Document is pushed.
		*/
		isPushRequired : function (doc, options) {

			var deferred = $.Deferred(),
				arrayOfQueries = __getQueryArray(doc, {idOnly: true, isQueryValid: false}),
				callbacks = __generateCallbacks(options, 'isPushRequired', this.name, this.username, deferred);

			if(__validDataExists(arrayOfQueries, callbacks)){
				db.isPushRequired(this.name, arrayOfQueries[0], callbacks);
			}

			return deferred.promise();
		},

		/**
			Get all the Documents that are unpushed.
		*/
		getPushRequired : function (options) {

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'getPushRequired', this.name, this.username, deferred);

			db.allDirty(this.name, [], callbacks);

			return deferred.promise();
		},

		/**
			Returns the number of documents not pushed.
		*/
		pushRequiredCount: function (options) {

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'pushRequiredCount', this.name, this.username, deferred);

			db.pushRequiredCount(this.name, callbacks);

			return deferred.promise();
		},

		/**
			Number of documents in the collection.
		*/
		count : function (query, options) {

			query = query || {};
			options = options || {};

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(query, 'count', this.name, this.username, deferred);


			query = _.omit(query, 'onSuccess', 'onFailure');
			callbacks = _.extend(callbacks, options);
			options = _.defaults(callbacks, {exact: false});

			db.count(this.name, options, query);

			return deferred.promise();
		},

		/**
			Removes the collection locally.
		*/
		removeCollection : function (options) {
			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'removeCollection', this.name, this.username, deferred);

			db.removeCollection(this.name, callbacks);

			return deferred.promise();
		},

		/**
			Add a new function to a collection's protoype.
		*/
		enhance : function (name, func) {

			if (!check.isString(name)) {

				return 2;

			} else if (!check.isFunction(func)) {

				return 3;

			} else if (typeof JSONStoreInstance.prototype[name] !== 'function') {

				JSONStoreInstance.prototype[name] = func ;
				return 0;

			} else {

				return 14;
			}
		},

		/**
			Gets data defined in load portion of the adapter.
		*/
		load : function (options) {

			var deferred = $.Deferred(),
				callbacks = __generateCallbacks(options, 'load', this.name, this.username, deferred),
				collectionAdapter = this.adapter,
				collectionName = this.name,
				invocationData = {},
				resultData,
				input,
				myKey,
				myPath,
				invokeProcedureSuccessCallback = function (response) {

					input = collectionAdapter.load.key.split('.');

					if (input.length > 1) {

						myKey = input.pop(),
						myPath = 'invocationResult.' + input.join('.');
						resultData = jspath.get(response, myKey, myPath);

					} else {

						resultData = [response.invocationResult[collectionAdapter.load.key]];
					}

					if (check.isObject(resultData, {isArrayValid: true}) &&
						resultData.length > 0 &&
						!check.isUndefined(resultData[0])) {

						var arr = resultData[0];
						//Special case when the server returned no data via an empty array
						if (typeof arr === 'object' && typeof arr.length !== 'undefined' && arr.length === 0) {
							callbacks.onSuccess(constant.SUCCESS); //Returns via the success callback 0 docs loaded
						} else {

							if (!Array.isArray(arr)) {
								arr = [arr];
							}

							db.store(collectionName, arr, callbacks);
						}

					} else {

						callbacks.onFailure(constant.INVALID_KEY_IN_LOAD_OBJECT, response);
					}
				},
				invokeProcedureFailureCallback = function (data) {
					callbacks.onFailure(constant.FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER, data);
				};

			if (check.isValidAdapter(collectionAdapter) &&
				check.isValidLoadObject(collectionAdapter.load)) {

				invocationData = {
					adapter : collectionAdapter.name,
					procedure : collectionAdapter.load.procedure,
					parameters : collectionAdapter.load.params
				};

				WL.Client.invokeProcedure(invocationData, {
					onSuccess : invokeProcedureSuccessCallback,
					onFailure : invokeProcedureFailureCallback
				});

			} else {
				callbacks.onFailure(constant.FAILED_TO_LOAD_INITIAL_DATA_FROM_ADAPTER_INVALID_LOAD_OBJ);
			}

			return deferred.promise();
		},

		/**
			Prints the contents of the collection using WL.Logger.debug asynchronously.
		*/
		toString : function (limit, offset) {

			var col = this,
				output = {},
				options = {},
				deferred = $.Deferred();

			if (check.isUndefined(limit) && check.isUndefined(offset)) {

				col.findAll({limit: 100}).then(function (results) {
					output = {collection: col, docs: results};
					WL.Logger.ctx({pkg: constant.PKG_NAME}).debug(output);
					deferred.resolve(output);
				}).fail(function (err) {
					WL.Logger.ctx({pkg: constant.PKG_NAME}).debug(err);
					deferred.resolve(err);
				});

			} else if (check.isInt(limit) && limit === 0 && check.isUndefined(offset)) {

				setTimeout(function () {
					output = {collection: col};
					output.collection.searchFields[WL.constant.ID_KEY] = 'number';
					WL.Logger.ctx({pkg: constant.PKG_NAME}).debug(output);
					deferred.resolve(output);
				}, 0);

			} else {

				if (check.isInt(limit)) {
					options.limit = limit;
				}

				if (check.isInt(offset) && offset >= 0 && check.isInt(limit) && limit > 0) {
					options.offset = offset;
				}

				col.findAll(options)

				.then(function (results) {
					output = {collection: col, docs: results};
					WL.Logger.ctx({pkg: constant.PKG_NAME}).debug(output);
					deferred.resolve(output);
				})

				.fail(function (err) {
					WL.Logger.ctx({pkg: constant.PKG_NAME}).debug(err);
					deferred.resolve(err);
				});
			}

			return deferred.promise();
		}

	};

	//public API
	return {
		init: _init,
		get: _get,
		initCollection : _initCollection,
		usePassword : _usePassword,
		clearPassword : _clearPassword,
		closeAll : _closeAll,
		documentify : _documentify,
		changePassword : _changePassword,
		destroy : _destroy,
		getErrorMessage : _getErrorMessage
	};

}(WLJQ, WL_)); //WL.JSONStore
