/***
 * FANCC PROJECT
 * 2026.1
 */

const BOOKS = [
    "--",
    "k-sz-zy.json",
    "k-sz-qt.json",
    "k-sz-book.json"
];
let bookData = [];

const uLoad = document.getElementById("uLoad");
const uSelect = document.getElementById("uSelect");
const qQuestion = document.getElementById("question");
const qAnswer = document.getElementById("answer");
const qAnswerC = document.getElementById("answerContainer");
const qId = document.getElementById("qId");
const qBtn = document.getElementById("uAns");

let lock = false;

uLoad.addEventListener("click", () => {
    init();
});

async function init() {
    if (lock || uSelect.value === '0') return;
    const url = BOOKS[Number(uSelect.value)];
    lock = true;
    queue = [];
    page = 0;
    resetBox();
    let response;
    try {
        response = await fetch(url).then(r => r.json());
        lock = false;
    }
    catch {
        alert("未知错误");
        lock = false;
    }
    bookData = response.data;
    setRandomQuestion();
}

let queue = [];
let page = 0;
function getDataByQueue(qid) {
    return bookData.filter(v => v.id === qid)[0];
}
function setRandomQuestion(direction = 0) {
    if (page + direction < 0 || page + direction >= bookData.length) return;
    page += direction;
    trigger = false;
    loadAnswer();
    if (queue.length === 0) {
        let ids = bookData.map(v => v.id);
        queue = [...ids].sort(_ => Math.random() - 0.5);
        console.log(queue);
    }
    const qData = getDataByQueue(queue[page]);
    qId.innerText = queue[page];
    qQuestion.innerText = qData.question;
    qAnswer.innerHTML = handle_answer(qData.answer);
    tts.stop();
}
function resetBox(){
    qId.innerText = "--";
    qQuestion.innerText = "加载中...";
    qAnswer.innerHTML = "--";
    tts.stop();
}


// trigger
let trigger = false;
qBtn.addEventListener("click", () => {
    trigger = true;
    loadAnswer();
});
function loadAnswer(rev = false) {
    if (trigger) {
        qAnswerC.style.display = "block";
        qBtn.style.display = "none";
    } else {
        qAnswerC.style.display = "none";
        qBtn.style.display = "block";
    }
}

window.onload = init;

const mic = document.getElementById("mic");
mic.addEventListener("click", () => {tts.resetAndPlay.call(mic, getDataByQueue(queue[page]).answer)});

// handle answer link break
function handle_answer(text){
    return text.replaceAll(/([。；])(?![“”])/g, '$1<br />');
    // .replaceAll(/(?<!^)(?<![。；“”])\s*(\d+\.)/g, '<br />$1');
}
