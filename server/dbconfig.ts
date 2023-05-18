const dbconfig : any = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "1111",
    "database": "nest_dev",
    "entities": ["dist/src/**/**.entity{.ts,.js}"],
    "synchronize": true,
  }

  export default dbconfig;


  