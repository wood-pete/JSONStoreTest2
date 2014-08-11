/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

#import <Foundation/Foundation.h>

typedef enum {
    OCLogger_DEBUG = 500,
    OCLogger_LOG = 400,
    OCLogger_INFO = 300,
    OCLogger_WARN = 200,
    OCLogger_ERROR = 100
} OCLogType;

@interface OCLogger : NSObject

@property (atomic,strong) NSString* package;

//Instance methods (no context)
-(void) debug: (NSString*) text, ...;
-(void) log: (NSString*) text, ...;
-(void) info: (NSString*) text, ...;
-(void) warn: (NSString*) text, ...;
-(void) error: (NSString*) text, ...;

//Instance methods (with context)
-(void) metadata:(NSDictionary*) metadata debug: (NSString*) text, ...;
-(void) metadata:(NSDictionary*) metadata log: (NSString*) text, ...;
-(void) metadata:(NSDictionary*) metadata info: (NSString*) text, ...;
-(void) metadata:(NSDictionary*) metadata warn: (NSString*) text, ...;
-(void) metadata:(NSDictionary*) metadata error: (NSString*) text, ...;

//Static methods
+(OCLogger*) getInstanceWithPackage: (NSString*) package;

+(void) send;
+(void) sendIfUnCaughtExceptionDetected;

+(BOOL) getCapture;
+(void) setCapture: (BOOL) flag;

+(int) getMaxFileSize;
+(void) setMaxFileSize: (int) bytes;

+(OCLogType) getLevel;
+(void) setLevel: (OCLogType) level;

@end