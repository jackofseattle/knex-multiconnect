var knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'knex_test'
    }
  });

  var KnexManager = require('../main').default

  const KM = new KnexManager();
  KM.registerInstance('read', knex)
  
  KM.read().knex('users').select().then((res) => {
    console.log(res)
  })

  KM.destroyAllInstances()