let diceArray = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
    "./images/7.jpg",
    "./images/8.jpg",
    "./images/9.jpg",
    "./images/10.jpg",
]; //  画像の配列

let diceanimArray = [
    "./anim/anim_1.webm",
    "./anim/anim_2.webm",
    "./anim/anim_3.webm",
    "./anim/anim_4.webm",
    "./anim/anim_5.webm",
    "./anim/anim_6.webm",
    "./anim/anim_7.webm",
    "./anim/anim_8.webm",
    "./anim/anim_9.webm",
    "./anim/anim_10.webm",
]; //サイコロ決定アニメーションの配列

const repaint = async () => {
    for (let i = 0; i < 2; i++) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
    }
};

var dice_front = document.getElementById("dice_front"); //  ここに画像を表示
var dice_bottom = document.getElementById("dice_bottom"); //  ここに画像を表示
const diceContent = document.getElementById("id_diceContent"); //　ここにサイコロ表示

const period = [2, 9, 5, 6, 1, 3, 7, 0, 8, 4]; //サイコロの周期

dice_front.src = diceArray[0]; //  最初の画面
dice_bottom.src = diceArray[0]; //  最初の画面

var dicenum = 0;

var isDiceroll = false;

var ispush = false;

var isprint = true;

function main() {
    if (!dise_statu_c) {
        return;
    }
    let diceIndex;
    //サイコロが振られている状態か(ランダムで画像が表示されているか)
    if (isDiceroll) {
        isDiceroll = false;
        diceIndex = diceanim(); //最終的な数字の決定(と画面表示)
        clearInterval(timerId); //  ランダム表示の停止

        //このあたりにサーバーに送るコードが書ければ...(とりあえずconsole.log)
        console.log(diceIndex + 1);
        eel.dise_data(diceIndex + 1);
        dise_statu_c = false;
        setTimeout(dicedel, 8000);
    } else {
        isDiceroll = true;
        diceprint(); //サイコロを表示する
        timerId = setInterval(diceroll, 100); //  ランダム表示
    }
}

var temp_x = 0;
//ダイスロールする関数(ランダムな値を表示する関数)

function diceroll() {
    dicenum++;
    if (dicenum > 9) {
        dicenum = 0;
    }
    dice_front.src = diceArray[period[dicenum]];
    dice_bottom.src = diceArray[period[dicenum]];

    return period[dicenum];
}

//決定した数字を表示する関数
function diceanim() {
    var print;
    dicenum++;
    if (dicenum > 9) {
        dicenum = 0;
    }
    dice_front.src = diceArray[period[dicenum]]; //配列に不正な値が入らないように念の為clampする
    dice_bottom.src = diceArray[period[dicenum]];
    print = `
    <div class="video-box">
        <video class="anim" src="${
            diceanimArray[period[dicenum]]
        }" autoplay muted></video>
    </div>`;
    diceContent.innerHTML = print;
    return period[dicenum];
}

//サイコロを表示する関数(diceanim関数を使用したあとに使用する用途)
function diceprint() {
    var print;
    print = `
    <div id="scene">
        <div class="boxBase">
            <img class="bottom" id="dice_bottom" decoding="async"></img>
            <img class="front" id="dice_front" decoding="async"></img>
        </div>
    </div>`;
    diceContent.innerHTML = print; //サイコロ表示

    //IDの再設定
    dice_front = document.getElementById("dice_front"); //  ここに画像を表示
    dice_bottom = document.getElementById("dice_bottom"); //  ここに画像を表示

    dice_front.src = diceArray[0]; //  最初の画面
    dice_bottom.src = diceArray[0]; //  最初の画面
}

//サイコロ非表示
function dicedel() {
    var print = ``;
    diceContent.innerHTML = print; //非表示
}

//乱数出す関数getrandom(最小値,最大値)
function getrandom(min, max) {
    var random = Math.floor(Math.random() * (max + 1 - min)) + min;

    return random;
}

//valueをminからmaxの値に抑える関数
function m_clamp(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}

//キーイベント
window.document.onkeydown = function (event) {
    if (event.key === "Enter" && ispush == false) {
        ispush = true;
        main();
    }
    if (event.key === " ") {
        if (isprint) {
            dicedel();
            isprint = false;
        } else {
            diceprint();
            isprint = true;
        }
    }
};

window.document.onkeyup = function (event) {
    if (event.key === "Enter") {
        ispush = false;
    }
};
