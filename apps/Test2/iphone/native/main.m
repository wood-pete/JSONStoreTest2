/*
* Licensed Materials - Property of IBM
* 5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

#import <UIKit/UIKit.h>
// IBM Worklight auto-generated comment added during project migration to Worklight 6.2:
// Beginning with Worklight 6.2 the Tealeaf header files are no longer part of the Worklight SDK; they are
// only added to the project by enabling the Tealeaf Optional Feature.  Worklight projects migrated from versions prior
// to 6.2 will have import statements for these Tealeaf header files.  During project migration to 6.2 these 
// import statements are commented out to prevent compilation errors resulting from referenceing files which have
// been removed from the Worklight SDK.  If your application uses Tealeaf directly you will need to add the appropriate
// header file imports based on the Tealeaf version you are using.  If your application does not use Tealeaf directly
// you may remove commented out import statements and the setting of 'appClass' to the TLFApplication class below.
// #import "TLFPublicDefinitions.h"
// #import "TLFApplication.h"
// #import "TLFCustomEvent.h"

int main(int argc, char *argv[]) {

    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    NSString *appClass = nil;

    appClass = NSStringFromClass(NSClassFromString(@"TLFApplication"));

    int retVal = UIApplicationMain(argc, argv, appClass, @"MyAppDelegate");
    [pool release];
    return retVal;
}
