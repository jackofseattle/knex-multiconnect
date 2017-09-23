# Knex MultiConnect

## Introduction

> Designed to help manage multiple connection pools when using the [Knex](https://github.com/tgriesser/knex) SQL builder library. Most often, the need for multiple connections arises when using a database that contains slaves that act as read-only replicas. With this library, you can register multiple Knex instances that are associated with a type: read or write. When you need to make a query, you can select to use a connection that is marked as either read or write, depending on the type of query you intend to execute.

> Ideally, this functionality would be moved into the Knex library, or perhaps even down further into the pooling library that Knex utilizing. Until then, this is a nice proof of concept for functionality.

## Usage

> Using the library simply requires you to create a Knex instance, register it with the library, then call whichever type of connection you need.

```javascript
  const KnexManager = require('knex-multiconnect').default

  const KM = new KnexManager();

  KM.registerInstance('read', knex) //knex is an existing knex instance, not shown to save space
  
  KM.read().knex('users').select().then((res) => {
    console.log(res)
  })

  KM.destroyAllInstances()
```

## Installation

> Grab and go!    

```console
npm install -S knex-multiconnect
#or
yarn add knex-multiconnect
```