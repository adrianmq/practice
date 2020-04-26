# Server-side storage [Databases]

## Relational (SQL)

- SQL (structured query language) versatile and widely-used options available
- SQL is a safe choice and great for complex queries
- table based
- requires a predefined schema to determine the structure of the data before actually working on it
- vertically scalable (increase load on server by increasing CPU, RAM or SSD)
- sharding (MySQL, Postgress)
- better option for applications that require multi-row transactions

## Non-relational (NoSQL)

- dynamic schema for unstructured data
- many ways to store data
  - column-oriented
  - document-oriented
  - graph-based
  - key-value store
- flexibility
  - create documents without having to first define their structure
  - each document with its own unique structure
  - syntax varies between databases
  - fields can be added on the go
- horizontally scalable (handle more traffic by sharding or adding more servers in the database)
- preffered choice for large or ever-changing data sets

## MySQL

### Advantages

- maturity: extremely established db, huge community, extensive testing and stable
- compatibility: available on all major platforms and has connectors to many programming languages
- cost-effective: open-source
- replicable: can be replicated across multiple nodes, thus reducing workload and increasing the scalability and availability
- sharding: available on mysql servers

### Terminology:

- modeling entities: data model design
- DDL: data definition language (create, alter, drop)
- DML: data manipulation language (select, insert, update, delete)
- DCL: data control language (grant, revoke)
- primary key:
  - options: default, not null, unique, binary, unsigned, zero fill, autoincrement
- foreign key:
- foreign key constraint (integritate referentiala):
  - options: restrict, no action, cascade, set null

### SQL:

- case-sensitive
- variables start with @

### Table types:

- [MyISAM]:
  - storage:
    - mechanism: binary tree
    - file system using 3 different file types:
      - FRM, tables' descriptive files (column and index information, etc)
      - MYD, table data
      - MYI, table indexes
- [InnoDB]:
  - storage:
    - mechanism: pagination (units)
- [Comparison]:
  - MyISAM is faster than InnoDB
  - MyISAM is not able to block the object at the lower table level
  - InnoDB supports transactions
  - InnoDB supports foreign keys
  - Clustered index
  - Data cache

### Operations:

- inner join
- left/right join
- union

### Indexes:

- [clustered]:
  - 1 per table = primary key
  - real data storage
- [non-clustered]:
  - references to data
  - slower than prev

### Procedures:

### UDF (use defined functions):

### Concurrency:

- [read]:
  - Dirty Read / Uncommited Read
  - Non-repetitive Read
  - Phantom Read
  - Lost Update
- [lock]:
  - shared (LOCK IN SHARE MODE)
  - exclusive
- [isolation-levels]:
  - read uncommited
  - read commited
  - repeatable read
  - serializable

### Scaling:

- replica databases for read operations [horizontal|infrastructure]:
  - built-in support for replicas, which are database copies of the master database
  - the replicas are synced using master's binary log for tracking data changes
  - the replicas can take the load of the master by handling read queries considering the replica latency
  - having read/writes on separate databases prevents read-write locking issues
- functional partitioning [horizontal]:
  - using separate databases partitioned by functionality, which might lead to a micro-service application level separation
- table sharding [horizontal]:
  - user defined partitioning (mysql)
  - means partitioning a table by rows in many smaller tables with the same schema
  - resulting partitions should be roughly the same size
  - the resulted tables can reside on separate database servers
  - downsides: slower queries, longer backups and longer migration locks
- upgrading server hardware [vertical]:
  - upgrading hardware to a machine with more memory, CPU speed/cores, I/O capacity...

### MongoDB

#### Advantages

- dynamic schema: change data schema without modifying existing data
- scalability: horizontable = scale with ease
- manageability: no admin, user friendly
- speed: fast for simple queries
- flexibility: add new columns or fields without affecting existing rows or application performance
- JSON schema validation

### Resources

https://www.xplenty.com/blog/the-sql-vs-nosql-difference/
https://hackernoon.com/mongodb-schema-design-86327d8fae83
https://en.wikipedia.org/wiki/Database_design
https://medium.com/@User3141592/how-to-scale-mysql-42ebd2841fa6
