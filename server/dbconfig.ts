const dbconfig : any = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "1111",
  "database": "han_mes",
  "entities": ["dist/src/**/*.entity{.ts,.js}"],


   "synchronize": true,
  "autoLoadEntities": true, // 윈도우에서 개발환경을 시작할때 설정함

}

export default dbconfig;


