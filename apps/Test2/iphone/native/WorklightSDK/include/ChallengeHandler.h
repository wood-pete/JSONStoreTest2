/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//
//  ChallengeHandler.h
//  WorklightStaticLibProject
//
//  Created by Ishai Borovoy on 9/13/12.
//

#import "BaseChallengeHandler.h"
#import "WLDelegate.h"
#import "WLProcedureInvocationData.h"
#import "WLClient.h"

@interface ChallengeHandler : BaseChallengeHandler<WLDelegate> {
    @private
    id <WLDelegate> submitLoginFormDelegate;
}
    @property (atomic, retain) id <WLDelegate> submitLoginFormDelegate;

    -(void) handleChallenge: (WLResponse *)response;
    -(void) submitSuccess:(WLResponse *) response; 
    -(BOOL) isCustomResponse:(WLResponse *) response;
    -(void) submitLoginForm: (NSString *)requestUrl requestParameters:(NSDictionary *) parameters requestHeaders:(NSDictionary *) headers requestTimeoutInMilliSeconds:(int) timeout requestMethod:(NSString *) method;
    -(void) onSuccess:(WLResponse *)response;
    -(void) onFailure:(WLFailResponse *)response;
    -(void) submitAdapterAuthentication: (WLProcedureInvocationData *) wlInvocationData options:(NSDictionary *)requestOptions;
@end
