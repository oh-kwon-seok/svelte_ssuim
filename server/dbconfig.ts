const dbconfig : any = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "1111",
  "database": "han_mes",
  "entities": ["dist/src/**/*.entity{.ts,.js}"],
   "synchronize": true,
  "autoLoadEntities": true,

}

export default dbconfig;


