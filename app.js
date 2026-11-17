// ===== Part A =====

let sumA = 0;
for (let i = 0; i < ratings.length; i++) {
    sumA += ratings[i];
}
let averageA = sumA / ratings.length;
console.log("A1 평균 평점: " + averageA);

let maxA = 0;
for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[maxA]) {
        maxA = i;
    }
}
console.log("A2 최고 평점: " + titles[maxA] + " " + ratings[maxA]);

let countA3 = 0;
for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] >= 8) {
        countA3++;
    }
}
console.log("A3 8점 이상: " + countA3 + "편");

let count2020A = 0;
let count2010A = 0;
let count2000A = 0;
let countBeforeA = 0;

for (let i = 0; i < years.length; i++) {
    let decade = years[i] - (years[i] % 10);
    switch (decade) {
        case 2020:
            count2020A++;
            break;
        case 2010:
            count2010A++;
            break;
        case 2000:
            count2000A++;
            break;
        default:
            countBeforeA++;
            break;
    }
}
console.log("A4 2020년대 " + count2020A + "편, 2010년대 " + count2010A + "편, 2000년대 " + count2000A + "편, 그 이전 " + countBeforeA + "편");

let bigA = "";
for (let i = 0; i < audiences.length; i++) {
    if (audiences[i] >= 1000000) {
        bigA += titles[i] + " ";
    }
}
if (bigA === "") {
    bigA = "없음";
} else {
    bigA = bigA.trim();
}
console.log("A5 관객 100만 이상: " + bigA);


// ===== Part B =====

function average(list) {
    return list.reduce((acc, m) => acc + m.rating, 0) / list.length;
}

function best(list) {
    let bestMovie = list[0];
    for (let i = 1; i < list.length; i++) {
        if (list[i].rating > bestMovie.rating) {
            bestMovie = list[i];
        }
    }
    return bestMovie;
}

function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

function sortBy(list, key, desc) {
    const sign = desc ? -1 : 1;
    return [...list].sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]) * sign;
        } else {
            return (a[key] - b[key]) * sign;
        }
    });
}

function search(list, keyword) {
    const searchTerm = keyword.trim().toLowerCase();
    return list.filter(m => m.title.toLowerCase().includes(searchTerm));
}

function formatNumber(n) {
    return Number(n).toLocaleString("ko-KR");
}

function yearsSince(dateStr) {
    const currentYear = new Date().getFullYear();
    const releaseYear = Number(dateStr.split("-")[0]);
    return currentYear - releaseYear;
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const week = days[d.getDay()];
    return `${year}년 ${month}월 ${day}일 (${week})`;
}

const bestMovie = best(movies);
const topAudienceMovie = sortBy(movies, "audience", true)[0];

const line1 = `전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점`;
const line2 = `최고 평점 ${bestMovie.title} (${bestMovie.rating}점, 개봉한 지 ${yearsSince(bestMovie.date)}년)`;
const line3 = `관객 1위 ${topAudienceMovie.title} (누적 ${formatNumber(topAudienceMovie.audience)}명)`;

document.getElementById("out").textContent = line1 + "\n" + line2 + "\n" + line3;


// ===== Part C =====

function getList(data) {
    return data.results;
}

function averageBy(list, key) {
    if (list.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += list[i][key];
    }
    return sum / list.length;
}

console.log(`C1 page ${TMDB.page}, total_pages ${TMDB.total_pages}, total_results ${TMDB.total_results}, 이번 응답 ${getList(TMDB).length}편`);
console.log(`C2 상영작 평균 평점: ${averageBy(getList(TMDB), "vote_average").toFixed(1)}`);
console.table(sortBy(getList(TMDB), "vote_average", true).slice(0, 5), ["title", "release_date", "vote_average"]);

const searchKeyword = "The";
console.log(`C4 '${searchKeyword}' 검색: ${search(getList(TMDB), searchKeyword).length}편`);

// loadJson : tmdb.json 파일 ⇒ 콘솔에 평점 상위 5편 표(13주차 fetch 미리 보기)
async function loadJson() {
 const res = await fetch("tmdb.json");
 const data = await res.json();
 console.table(sortBy(getList(data), "vote_average", true).slice(0, 5), ["title", "vote_average"]);
}
loadJson();