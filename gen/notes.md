<!--
  TODOs:
  - Message Queue, 1, Message Broker
 -->

#

# Security considerations (HTTP)

#

## CORS

## Cookies

## Cross site scripting (XSS)

## Session hijaking

## Cross site request forgery (CSRF)

#

# Authentication Schemes + Authorization

#

## Basic

- base64-encoded credentials
- header(WWW-Authenticate: Basic realm="My Realm")

## Bearer

- bearer tokens to access OAuth 2.0 protected resources

## Digest

- md5 hashing in Firefox / SHA encryption

## HOBA

- http origin bound authentication, digital signature based

### Resources

https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

#

# Architectural design patterns (styles)

#

## Monolith

  ### Transaction

    - is a unit of work which will be performed in business applications which persist data in a certain state, that should be entirely committed or rolled back to ensure data integrity
    - ACID principles are implemented
    - can be initiated at database level and can be committed or rolled back based on the final outcome
      [advantages]
    - single and common database server

## Microservices (Distributed system)

  - architectural style for building systems using simple, lightweight, loosely coupled services that can be developed and released independently of each other
  - polyglot persistance architecture

  ### SRP (Single responsability principle) = No shared Database

    - each service maintains its own database and no other service should access that databse directly
      [reasons]
    - hard to make schema changes when more services share the same database
      [approaches]

    1. Updates on one service should share data using asynchronous messaging (queue)
    2. Updates in both services, either merge the two services or use transactions

  ### Communication / Composition

    - connect multiple microservices into one flow to deliver what end-user needs (perform read / updates)

    1. Drive flow from client
    2. API gateway pattern
    3. Choreography (event system)
       - each pariticipant listens to certain event and carries out its task
    4. Orchestration
       - flow is driven from a central place
    5. Centralized server

  ### Inter-service communication mechanisms

    [Synchronous-HTTP][asynchronous-messaging]

  ### Security

  ### Persistance:

  A. Distributed Transactions

  [approaches]

  1. Avoiding transactions across Microservices
     - perform separate requests (addressed at design level)
  2. Two-Phase Commit Protocol (2PC)
     - primaly drivers in a distributed transaction management are the:
       - message broker
       - transaction coordinator
     - implements following steps:
       - prepare phase: participants will be prepared for commit and inform transaction coordinator/message broker that they are ready for completing the transaction
       - commit or rollback phase: coordinator issues adequate command
     - standards: XA or REST-AT
     - downsides: slow, compared to time for the operation on a single service
  3. Sagas (sequence of local transactions)
     - Choreography:
       - each local transaction puclishes domain events that trigger local transactions in other services
     - Orchestration:
       - an orchestrator (object) tells the participants what local transactions to execute
  4. Eventual Consistency and Compensation
     - each service is responsible for updating the corresponding part of the model, even though other services failed to respond
     - failures are compensated when available
       [disadvantages]

  - no direct and simple way of maintaining ACID principles across multiple databases
  - slow, heavy and expensive
    [suggestions]
  - shared database:
    - keep prefix or suffix to each table to indicate the microservice it belings to
    - avoid foreign key constraints across tables beloging to different microservices
    - when data model is complete, move tables in separate database
  - service request for data belongin to other service should be obtaind by interrogating appropiate endpoint for data retrieval (do not access database directly)
  - high demand services for avoiding possible network latencies, should opt for data duplication rather than going for the single database server

  B. Event-driven asynchronous updates (Choreography)

  - services publish events announcing that some data has changed
  - other services subscribe to those events and update their data

  C. Pull all updates to the same Microservice

  D. Compensation / lesser Guarantees

#

# Application / Data Management design

#

### CQRS
  - command query responsability segregation, principle of imperative programming
  - notion: use a different model to update information than the model you use to read information
  - benefits:
    - support multiple denormalized views
    - improve separation of concerns = simple command and query models
  - drawbacks:
    - increased complexity and potential code duplication
    - replication lag / eventually consistent views

### DDD
  - connect the implementation to an evolving model
  - goals:
    - place the project's primary focus on the core domain and domain logic
    - basing complex designs on a model of the domain
    - iteratively refine a conceptual model that addresses particular domain problems
   - domain event:
    - DDD aggregates that emit domain events when they are created/updated
    - used for consumption by other services

### Event sourcing
  - persists the state of a business entity as a sequence of state changing events
  - whenever the state of a business entity changes, a new event is appended to the lists of events
  - the application reconstructs an entity's current state by replaying the events
  - events are persisted in an event store, which acts as a message broker, providing APIs that enable services to subscribe to events
  - for loading optimizations, an application can periodically save a snapshot of an entity's current state or implement CQRS

### Repository
  - it is an abstraction of the data layer
  - way to centralize the handling of domain objects
  - build data access objects (DAOs)

### Unit of work
  - maintains a list of objects affected by a business transaction and coordinates the writing out of changes
  - unit ok work + repository patterns are meant to create an abstraction layer between the data access layer and the business logic layer
  - built as a wrapper over N repositories and the DB context

### Dependency injection

### API Composition

### Service Bus / Message Bus
  - implements a communication system between mutually interacting software applications in a SOA
  - represents a software architecture for distributed computing

### Resources

https://microservices.io/patterns/microservices.html
https://microservices.io/patterns/data/saga.html
https://stoplight.io/blog/stop-calling-your-apis-microservices-e165a80eba9d
https://medium.com/@walkingtreetech/transaction-management-in-microservices-ab09b0cb803b
https://www.infoq.com/articles/microservices-intro/?source=post_page
https://www.infoq.com/presentations/domain-service-aggregator/?source=post_page
https://martinfowler.com/bliki/CQRS.html
https://martinfowler.com/bliki/BoundedContext.html
https://microservices.io/patterns/data/cqrs.html
https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30
https://www.programmingwithwolfgang.com/repository-and-unit-of-work-pattern/
https://en.wikipedia.org/wiki/Domain-driven_design
https://en.wikipedia.org/wiki/Enterprise_service_bus

## SOAP

- simple object access protocol
- allows complex data types to be defined and exchanged
- provides a mechanism for various messaging patterns
  - RPC - remote procedure call
  - allows a developer to execute a function on a server, pass it complex data as parameters and receive complex data back
- messages between server and client are sent in XML structure, called SOAP envelopes

## REST

- application and resource state
  - server should not remember the state of the application
  - client should send all the information necessary for execution
  - client stores and maintains the application state and not the server
  - requests are self-contained; if a request to a server fails it will not affect the success or failure of another request (improves app reliability)
  - application stateless has important implications for horizontal scaling, because no individual server is maintaining state, requests can reach any server in a group and be handled correctly

## HATEOAS

- hypertext as engine of state
- response from server includes information about what actions the client can take next
- options are marked up in hypertext
- the AIM is for the client not to require prior knowledge of the endpoints of the rest service
  - rather, those will be provided with the endpoints they need to proceed through the application when they make a query

#

# Cloud computing

#

## AWS Serverless

- cloud computing model in which a cloud provider automatically manages the provisioning and allocation of computing resources (implementation of serverless architecture known as Function as a services FaaS)
  [advantages]
- client pais for execution and duration
- no maintaince for server, operating system or installation
- automated high availability, reducing time spent on architecture and configuration
  [downsides]
- I/O bottlenecks hard to replicate and lack of visibility in debugging the application flows

### Resources

https://www.hashicorp.com/blog
https://www.terraform-best-practices.com/code-structure
https://www.terraform.io/docs/index.html
https://upcloud.com/community/tutorials/terraform-variables/
https://github.com/shuaibiyy/awesome-terraform
https://aws.amazon.com/serverless/

#

# Communication Protocols

#

##Conceptual models of computer networks communication

### Communication quality attributes:

- latency --> download time = total wait time
- security: confidetiality, integrity, availability

### Internet protocol suite TCP/IP

- abstraction layers:
  - Application: application data communication (data)
  - Transport: host-to-host communication (segments)
    - UDP[header|data]
  - Internet: internetworking datagram exchange (packets)
    - IP[header|data]
  - Link or Network Interface: interhost transmission
    - Frame[header|data|footer]

### Open Systems Interconnection OSI model

- abstraction:
  - Application: network process to application (data)
    \*TCP/IP (application)
    HTTP, SMTP, SNMP, FTP, Telnet, SIP, SSH, NFS, RTSP, XMPP, Whois, ENRP
  - Presentation: data representation & encryption (data)
    \*TCP/IP (application)
    XDR, ASN.1, SMB, AFP, NCP
  - Session: interhost communication (data)
    \*TCP/IP (application)
    ASAP, TLS, SSH, RPC, NetBIOS, ASP, Winsock, BSD sockets, NCP, NFS(Network File System)
  - Transport: end-to-end connections & reliability (segments)
    \*TCP/IP (transport)
    TCP, UDP, RTP, SCTP, SPX, ATP, IL
  - Network: path determination and IP [logical addresing](packets)
    \*TCP/IP (internet)
    IP, ICMP, BGP, OSPF, ARP, X.25(packet switching)
  - Data Link: MAC & LLC [physical addresing](frames)
    \*TCP/IP (link or network interface)
    Ethernet, Token ring, HDLC, Frame relay, ISDN, ATM, 802.11 Wi-Fi, FDDI, PPP
  - Physical: media, signal & binary transmission (bits)
    \*TCP/IP (link or network interface)
    coaxial cable, radio, fiber optics, UTP, satellite

## HTTP

- application level communication protocol, designed for client-server communication
- workflow:
  1. open a TCP connection for sending a request or several and receive the answer (client may open a new connection, reuse existing connection, or open several connections to the server)
  2. send a HTTP message, which is human-readable; in HTTP/2 are encapsulated in frames making them impossible to read directly
  3. read response sent by server
  4. close or reuse the connection for further requests
- components: URL, headers, body
  - protocol version (HTTP/1.1)
  - headers
    - host
    - content-type: sent to the server and defines the MIME type of the body that is being sent
  - request method type (verbs):
    GET - Retrieve a representation of the specified resource
    HEAD - Identical to GET but without any response body
    POST - Submit an entry to the server, often resulting in a change such as adding a new resource
    PUT - Replace the specified resource with the one in the request payload
    PATCH - Apply a partial modification to the specified resource
    DELETE - Delete the specified resource
    CONNECT - Initiate an HTTP tunnel3
    OPTIONS - Describe the communication options for the target resource
    TRACE - Performs a message loop-back test to the target resource
  - status code and message (response only), informs client of the result of the request
- tips:
  - poor practice to send a message in the response body that contradicts the HTTP response code

### Caching

- Shared cache
- Local (private) cache
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
  https://www.quora.com/How-do-I-explain-the-concept-of-caching-to-a-non-Computer-Science-person

### Compression

- various formats: br, gzip, etc.
- Accept-Encoding (request header)
- Content-Encoding (response header)
- Vary: Accept-Encoding (response header)
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression
  https://zoompf.com/blog/2012/02/lose-the-wait-http-compression

### Sessions

- mean for the server to persist application state for consecutive requests from a visitor
- session information stored on the server and associated with a unique identifier
- client sends the session identifier to the server on every request, and this allows the server to associate the request with a particular session
- multiple web servers require sharing of session information between them, and redirect user to the server that holds the session information

### Tools

- WireShark:
  - debugging and analysing traffic / communication
  - configuration for showing encrypted traffic
    https://jimshaver.net/2015/02/11/decrypting-tls-browser-traffic-with-wireshark-the-easy-way/
    http://www.moserware.com/2009/06/first-few-milliseconds-of-https.html

### Resources

    Internet Enginewering task force (IEFT)
    Request for Comments (RFC)
    http 1.1: https://tools.ietf.org/html/rfc2616
    http 2.0: https://tools.ietf.org/html/rfc7540
    Mozilla:
    http 1.1: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

#

## Parallel processing: Process / Threads a.o.

### Process:

- it provides the resources required to execute a program
- has a virtual address space, executable code, open handles to system objects, a security context, a unique process identifier, environment variables, a priority class, min/max working set sizes, and at least one thread for execution

### Thread:

- Path of execution within a process (entity within a process that can be scheduled for execution)
- Share virtual address space and system resources of parent process
- Maintains exception handlers, a scheduling priority, thread local storage, unique thread identifier and a set of structures the system will use to save the thread context until it is scheduled (context = machine registers, the kernel stack, a thread environment block and a user stack in the address space of the thread’s process)
- May have own security context, which can be used for impersonating clients

* both are independent sequences of execution

### Asynchronous handling:

- Python: Twisted and Tornado (frameworks, non-WSGI)
  - use callbacks to pause and resume execution
  - the model reduces idling time in process, and can serve thousands of concurrent requests
  - wsgi: one request == one thread
  * greenlet, gevent
- NodeJS

### References

-
-

#

## Apache Spark

### Description:

- Is a cluster computing framework for large-scale data processing
- 3 libraries (Java, Scala, Python) for unified computing language
  - Unified: multiple build-in APIs for completing job
  - Computing Engine: handles loading data from various file systems and performs computations on it, but doesn’t store any data itself permanently. It operates only in memory - allowing unparalleled performance and speed
  - Libraries: comprised from a series of libraries built for data science tasks - SQL, machine learning, stream processing, graph analytics

### Spark app: driver + distributed worker processes (executors)

### Well-defined layered architecture with loosely coupled components based on two primary abstractions:

- Resilient distributed datasets (RDDs)
- Directed Acyclic Graph (DAG)
