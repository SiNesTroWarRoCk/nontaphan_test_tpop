nodejs  v18.17.0
# mariadb connection
username = admin
password = 205205
# path sql file 
- nontaphan_tpop_test/sql/tpop_testdb.sql

# how to run redis server 
- unzip redis-docker-compose
- cd redis-docker-compose
- docker compose up -d 
or 
- docker-compose up -d

# postman for test
- nontaphan_tpop_test/nontaphan_tpop_test.postman_collection.json
- how to authen with jwt
- open postman
- register and login
- copy access_token 
- go to Authorization -> Type = Bearer Token -> paste token


# how to run nest js
- npm run dev

