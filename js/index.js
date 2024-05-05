const 정답 = "CAMEL";

let index = 0;
let attempts = 0;
let timer;
function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료 되었습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; position: fixed; top:50%; left:50%; background-color:white; width:200px; height : 200px; transform: translate(-50%, -50%);";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) --index;
  };

  // JavaScript

  // 모든 키 엘리먼트 선택
  const keys = document.querySelectorAll(".keyboard-column");

  // 각 키에 대한 키보드 이벤트 추가
  document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase(); // 입력된 키

    // 입력된 키와 일치하는 엘리먼트 찾기
    const targetKey = document.querySelector(`[data-key="${key}"]`);

    if (targetKey) {
      // 키의 배경색 변경
      targetKey.style.backgroundColor = "#ffcc00"; // 변경할 색상 설정

      // 1초 후에 원래 색상으로 되돌리기
      setTimeout(() => {
        targetKey.style.backgroundColor = "#d3d6da"; // 원래 색상 설정
      }, 1000);
    }
  });

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  //리얼타임
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const currentTime = `현재시간 ${hours}:${minutes}.${seconds}`;

    document.querySelector(".time > div:first-child").textContent = currentTime;
  };

  updateTime();

  setInterval(updateTime, 1000);

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".timer");
      timeDiv.innerText = `진행시간${분}:${초}`;
    }
    timer = setInterval(setTime, 1000); // 1초마다
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
