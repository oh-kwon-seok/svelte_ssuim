const dbconfig : any = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "1234",
    "database": "nest_test",
    "entities": ["dist/src/**/**.entity{.ts,.js}"],
    "synchronize": true,
  }

  export default dbconfig;


  