/***
 * FANCC PROJECT
 * -catalog
 * 2026.1
 */
let bookData = [];

const loading = document.getElementById("loading");
const tiku = document.getElementById("tiku");
const intro = document.getElementById("intro");
const boxC = document.getElementById("boxContainer");
let uBType;

async function init() {
    const BookFileName = pr.data("book") ?? "";
    if (!pr.data("type") || (pr.data("type") !== "0" && pr.data("type") !== "1")) {
        shouqi();
    } else {
        uBType = pr.data("type");
    }
    let findedBook = BOOKS.filter(book => book.file === BookFileName);
    if (findedBook.length === 0) {
        tiku.innerText = "未找到此书";
        return;
    }
    findedBook = findedBook[0];
    tiku.innerText = findedBook.name;
    intro.innerText = findedBook.description;
    try {
        let response = await fetch("./books/"+findedBook.file).then(r => r.json());
        bookData = response.data;
    }
    catch {
        alert("未知错误");
    }
    loading.remove();
    displayBoxes();
}

/* 
<!-- 示例结构 -->
<div class="box">
    <p>#<span id="qId">--</span></p>
    <p>问：<span id="question">--</span></p>
    <button style="display: block;" id="uAns">查看答案</button>
    <p id="answerContainer" style="display: none;">答：<span id="answer">--</span></p>
</div> 
*/
function generateBox(qid, question, answer) {
    let div = document.createElement("div");
    div.classList.add("box");

    let p1 = document.createElement("p");
    p1.innerText += "#";
    p1.innerText += qid;
    div.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerText += "问：";
    p2.innerText += question;
    div.appendChild(p2);

    let button3 = document.createElement("button");
    button3.innerText = "查看答案";
    button3.style.display = uBType === '0' ? "block" : "none";
    div.appendChild(button3);

    let p4 = document.createElement("p");
    p4.innerText += "答：";
    p4.innerHTML += handle_answer(answer);
    p4.style.display = uBType === '0' ? "none" : "block";
    div.appendChild(p4);

    let span5 = document.createElement("span");
    span5.classList.add("mic");
    span5.innerHTML = "&#xe6b8;";
    div.appendChild(span5);

    // button
    button3.onclick = function () {
        button3.nextElementSibling.style.display = "block";
        button3.style.display = "none";
    }
    span5.addEventListener("click", () => {
        // tts.stop();
        tts.resetAndPlay.call(span5, answer);
    });

    return div;
}
function displayBoxes() {
    boxC.innerHTML = "";
    for (let item of bookData) {
        boxC.appendChild(generateBox(item.id, item.question, item.answer));
    }
}

// 实现不刷新 变url的重加载 优化体验
function zhankai() {
    let h = pr.set_data(window.location.href, { type: "1" });
    history.pushState({ type: "1" }, '', h);
    uBType = "1";
    displayBoxes();
}
function shouqi() {
    let h = pr.set_data(window.location.href, { type: "0" });
    history.pushState({ type: "0" }, '', h);
    uBType = "0";
    displayBoxes();
}
window.onpopstate = function (event) {
    // console.log(event);
    uBType = event.state?.type ?? "0";
    displayBoxes();
};

init();

// handle answer link break
function handle_answer(text) {
    return text.replaceAll(/([。；])(?![“”])/g, '$1<br />');
    // .replaceAll(/(?<!^)(?<![。；“”])\s*(\d+\.)/g, '<br />$1');
}
