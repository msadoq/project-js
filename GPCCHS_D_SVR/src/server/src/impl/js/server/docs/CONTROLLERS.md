# Controllers

## domains

**client/onDomainQuery**
* send a DomainQuery message to DC

**dc/onDomainData**
* receive domains list from DC
* store locally
* forward to client

## client lifecycle

**client/onOpen**
* answer to client with 'authenticated' flag

**client/onClose**
* loop on subscriptions and send dataSubscription (with 'DELETE' action) for each
* empty all models (connectedData, subscriptions, cacheJson) and singletons (domains, timebars, registeredQueries, registeredCallbacks)

## data

**client/onDataQuery**
* loop over remoteIds
    - loop over intervals
        * retrieve missing intervals from connectedData model
    - loop over missing intervals
        * create a queryId 
        * register queryId in registeredQueries singleton
        * register queryId in registeredCallbacks singleton
        * queue a zmq dataQuery message (with dataId, query id, interval and filter)
        * add requested { queryId: interval } to connectedData model
    - if dataId not in subscriptions model
        * add dataId to subscriptions model
        * queue a zmq dataSubscription message (with 'ADD' action)
    - add remoteId and corresponding filters to subscriptions model
    - loop over intervals (TODO here or last action ?)
        * retrieve data in cacheJson model
        * queue a ws newData message (sent periodically)
* send queued messages to DC
    

**dc/onQueryData**
* if queryId not in registeredQueries, stop logic
* get remoteId
* if last chunk of data, set interval as received in connectedData model
* loop over arguments (timestamp, payload) peers
    - deprotobufferize payload
    - store decoded payload in cacheJson model
    - queue a ws newData message (sent periodically)

**dc/onSubscriptionData**
* if dataId not in subscriptions model, stop logic
* get { remoteId: filters } from subscriptions model
* loop over arguments (timestamp, payload) peers
    - loop over remoteId
        * if timestamp not in interval in connectedData model, continue to next iteration
        * deprotobufferize payload
        * apply filters on decode payload
        * store filtered payload in cacheJson model
        * queue a ws newData message (sent periodically)

## cache

**server/onCacheInvalidation**
// trigger by HSS itself

**client/onCacheCleanup**
// trigger by HSC

## dc communication

**dc/onResponse**
* check if query ID exists in registeredCallbacks singleton, if no stop logic
* if status is SUCCESS stop logic
* send error message to client
