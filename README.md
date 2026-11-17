# web-hw2

<!-- 
GET http://127.0.0.1:5500/tmdb.js net::ERR_ABORTED 404 (Not Found)
index.html:1 Refused to execute script from 'http://127.0.0.1:5500/tmdb.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
app.js:8 A1 평균 평점: 7.540000000000001
app.js:16 A2 최고 평점: 악마는 프라다를 입는다 8.4
app.js:24 A3 8점 이상: 3편
app.js:48 A4 2020년대 5편, 2010년대 4편, 2000년대 1편, 그 이전 0편
app.js:61 A5 관객 100만 이상: 극장판 치이카와: 인어 섬의 비밀 암살자(들) 타짜: 벨제붑의 노래
app.js:135 Uncaught ReferenceError: TMDB is not defined
    at app.js:135:24
formatNumber("1234567")
'1,234,567'
average(movies).toFixed(1)
'7.5'
best(movies).title
'악마는 프라다를 입는다'
sortBy(movies, "rating", true)[0].title
'악마는 프라다를 입는다'
 movies[0].title
'남자가 사랑할 때'
filterByRating(movies, 8).length
3
search(movies, " 남자 ").length
1
yearsSince("2014-11-06")
12 
-->