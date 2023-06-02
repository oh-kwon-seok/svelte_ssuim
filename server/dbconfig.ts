const dbconfig : any = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "1111",
  "database": "han_mes",
  "entities": ["dist/src/**/*.entity{.ts,.js}"],
  "logging" : true, // 쿼리 로그 찍어줌

   "synchronize": false, // 난 DB에 스키마 정의할거라 연동 필요없음
  "autoLoadEntities": true, // 윈도우에서 개발환경을 시작할때 설정함

}

export default dbconfig;


