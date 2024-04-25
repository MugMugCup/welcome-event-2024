// sleep 関数
const sleep = (wait_time) =>
    new Promise((resolve) => setTimeout(resolve, wait_time));

/*--------------------------------------------------------------------*/

// パラメータで内容を変更
let my_grid = 0;
let event_type = 0;
let true_answer = 0;

// 得点系
let normal_point; // このマスに止まるだけでもらえる得点
let bonus_point; // ミッション達成時にもらえる得点
let point_in_game; // ミニゲーム内で用いる得点
let this_turn_point; // このターンで獲得した合計点
let _client_index = -1; //clientのindex

const grid_num = document.getElementById("grid_num");
const talk_theme = document.getElementById("talk_theme");
const talk_img = document.getElementById("talk_img");
const choice_theme = document.getElementById("choice_theme");
const choice_img1 = document.getElementById("choice_img1");
const choice_img2 = document.getElementById("choice_img2");
const choice_img3 = document.getElementById("choice_img3");
const choice_img4 = document.getElementById("choice_img4");
const quiz1_question = document.getElementById("quiz1_question");
const quiz1_img = document.getElementById("quiz1_img");
const quiz1_ans1 = document.getElementById("quiz1_ans1");
const quiz1_ans2 = document.getElementById("quiz1_ans2");
const quiz1_ans3 = document.getElementById("quiz1_ans3");
const quiz1_ans4 = document.getElementById("quiz1_ans4");
const quiz2_question = document.getElementById("quiz2_question");
const quiz2_ans1 = document.getElementById("quiz2_ans1");
const quiz2_ans2 = document.getElementById("quiz2_ans2");
const quiz2_ans3 = document.getElementById("quiz2_ans3");
const quiz2_ans4 = document.getElementById("quiz2_ans4");
const result_answer = document.getElementById("result_answer");
const result_description = document.getElementById("result_description");

eel.expose(set_index);
function set_index(index) {
    _client_index = index;
    switch (String(parseInt(index))) {
        // チーム名登録用
        case "0":
            event_type = 0;
            break;

        case "1":
            event_type = 1;
            talk_theme.innerHTML = "自分の趣味";
            talk_img.src = "./img/event/hobby.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "30秒では全然時間が足りないと思います！<br>ぜひ、すごろくクリア後に話し合ってみてください！";
            normal_point = 20;
            bonus_point = 30;
            break;

        case "2":
            event_type = 1;
            talk_theme.innerHTML = "自分の中高の頃の部活";
            talk_img.src = "./img/event/bukatu.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "大同大学にも中高の頃の部活と似たサークルがあるかもしれません。<br>入学式で配られた和技という冊子をチェックしてみてください！";
            normal_point = 20;
            bonus_point = 30;
            break;

        case "3":
            event_type = 2;
            choice_theme.innerHTML = "この中で興味のあるサークルは？";
            choice_img1.src = "./img/event/circle/badminton.png";
            choice_img2.src = "./img/event/circle/music.png";
            choice_img3.src = "./img/event/circle/e_sport.png";
            choice_img4.src = "./img/event/circle/programming.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "僕がプログラミング研究会に所属してるので宣伝しておきます！<br>プログラミング系の色んな活動してるのでぜひ遊びに来てください！";
            normal_point = 20;
            bonus_point = 30;
            break;

        case "4":
            event_type = 2;
            choice_theme.innerHTML = "この中で一番好きなポテチの味は？";
            choice_img1.src = "./img/event/poteti/ususio.png";
            choice_img2.src = "./img/event/poteti/konsome.png";
            choice_img3.src = "./img/event/poteti/norisio.png";
            choice_img4.src = "./img/event/poteti/bata-.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "ポテチも色んな味がありますよね。<br>今は期間限定で２種類の味を合わせたドリームタッグってのがあるらしいです。";
            normal_point = 20;
            bonus_point = 30;
            break;

        case "5":
            // 神経衰弱
            event_type = 5;
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML = "結果はいかがでしたか？";
            normal_point = 0;
            bonus_point = 0;
            break;

        case "6":
            // 神経衰弱
            event_type = 5;
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML = "結果はいかがでしたか？";
            normal_point = 0;
            bonus_point = 0;
            break;

        case "7":
            event_type = 3;
            quiz1_question.innerHTML = '"！"の正しい名称はどれ？';
            quiz1_img.src = "./img/event/exclamation.png";
            quiz1_ans1.value = "ハプニングマーク";
            quiz1_ans2.value = "アテンションマーク";
            quiz1_ans3.value = "バッククオートマーク";
            quiz1_ans4.value = "エクスクラメーションマーク";
            true_answer = 4;
            result_answer.innerHTML = "答え： 4. エクスクラメーションマーク";
            result_description.innerHTML =
                "普段はびっくりマークと呼ばれることが多いこのマークですが、<br>正式には感嘆符やエクスクラメーションマークと呼ばれているそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "8":
            event_type = 1;
            talk_theme.innerHTML = "自分の出身地";
            talk_img.src = "./img/event/where_from.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "皆さんの出身地で何か有名な物はありますか？<br>おススメの観光地や名物料理についてぜひ話し合ってみてください！";
            normal_point = 20;
            bonus_point = 30;
            break;

        case "9":
            event_type = 3;
            quiz1_question.innerHTML = "今いるこの棟はどの棟？";
            quiz1_img.src = "./img/event/school.png";
            quiz1_ans1.value = "D棟";
            quiz1_ans2.value = "E棟";
            quiz1_ans3.value = "F棟";
            quiz1_ans4.value = "G棟";
            true_answer = 2;
            result_answer.innerHTML = "答え： 2. E棟";
            result_description.innerHTML =
                "E棟はコンピュータ教室が多く、情報システム科だとよくお世話になります。<br>ぜひ、名前と場所を覚えていってください。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "10":
            event_type = 3;
            quiz1_question.innerHTML = "この動物の名前は何？";
            quiz1_img.src = "./img/event/tasumania.png";
            quiz1_ans1.value = "タスマニアデビル";
            quiz1_ans2.value = "クアッカーワラビ";
            quiz1_ans3.value = "ラット";
            quiz1_ans4.value = "ハムスター";
            true_answer = 1;
            result_answer.innerHTML = "答え： 1. タスマニアデビル";
            result_description.innerHTML =
                "タスマニア州に生息する現生では最大の肉食性有袋類。<br>名前の由来は、叫び声やうなり声が悪魔の様だったからだそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "11":
            event_type = 1;
            talk_theme.innerHTML = "自分の趣味";
            talk_img.src = "./img/event/hobby.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "30秒では全然時間が足りないと思います！<br>ぜひ、すごろくクリア後に話し合ってみてください！";
            normal_point = 20;
            bonus_point = 30;
            break;

        case "12":
            event_type = 4;
            quiz2_question.innerHTML = "正しいWindowsマークはどれ？";
            quiz2_ans1.src = "./img/event/logo/windows1.png";
            quiz2_ans2.src = "./img/event/logo/windows2.png";
            quiz2_ans3.src = "./img/event/logo/windows3.png";
            quiz2_ans4.src = "./img/event/logo/windows4.png";
            true_answer = 3;
            result_answer.innerHTML = "答え： 左下";
            result_description.innerHTML =
                "Windowsのロゴの４色は「光の三原色」＋「色の三原色」とされている。<br>この４色があればどんな色でも表現できる、という意味があるそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "13":
            // クイズ
            event_type = 3;
            quiz1_question.innerHTML =
                "台風、ハリケーン、サイクロンこれらの違いは何？";
            quiz1_img.src = "./img/event/taihuu.png";
            quiz1_ans1.value = "違いはない";
            quiz1_ans2.value = "最大風速";
            quiz1_ans3.value = "観測された場所";
            quiz1_ans4.value = "発見した人が決める";
            true_answer = 3;
            result_answer.innerHTML = "答え： 3. 観測された場所";
            result_description.innerHTML =
                "北西太平洋・アジアでは台風(タイフーン)、<br>北中米ではハリケーン、その他の地域ではサイクロンだそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "14":
            // ジェスチャーゲーム
            event_type = 6;
            result_answer.innerHTML = "答え： 背泳ぎ";
            result_description.innerHTML = "結果はいかがでしたか？";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "15":
            // ブラックジャック
            event_type = 7;
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML = "結果はいかがでしたか？";
            normal_point = 0;
            bonus_point = 0;
            break;

        case "16":
            // ブラックジャック
            event_type = 7;
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML = "結果はいかがでしたか？";
            normal_point = 0;
            bonus_point = 0;
            break;

        case "17":
            event_type = 3;
            quiz1_question.innerHTML = "この野菜は何でしょう？";
            quiz1_img.src = "./img/event/kyabetu.png";
            quiz1_ans1.value = "キャベツ";
            quiz1_ans2.value = "レタス";
            quiz1_ans3.value = "ネギ";
            quiz1_ans4.value = "白菜";
            true_answer = 1;
            result_answer.innerHTML = "答え： 1. キャベツ";
            result_description.innerHTML =
                "他の野菜にはない白く太い筋が特徴的です。<br>キャベツの名前はラテン語で頭を意味する「caput」に由来するそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "18":
            event_type = 3;
            quiz1_question.innerHTML =
                "学問的には野菜に分類されるのは次のうちどれ？";
            quiz1_img.src = "./img/event/fruits.png";
            quiz1_ans1.value = "リンゴ";
            quiz1_ans2.value = "ブドウ";
            quiz1_ans3.value = "イチゴ";
            quiz1_ans4.value = "アボカド";
            true_answer = 3;
            result_answer.innerHTML = "答え： 3. イチゴ";
            result_description.innerHTML =
                "園芸学では木の実は果物で草の実は野菜と分類します。<br>私たちが果実だと思って食べている部分は、実際は茎の先端の花床だそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "19":
            event_type = 3;
            quiz1_question.innerHTML = "オーストラリアの首都は？";
            quiz1_img.src = "./img/event/australia.png";
            quiz1_ans1.value = "シドニー";
            quiz1_ans2.value = "キャンベラ";
            quiz1_ans3.value = "バンコク";
            quiz1_ans4.value = "モスクワ";
            true_answer = 2;
            result_answer.innerHTML = "答え： 2. キャンベラ";
            result_description.innerHTML =
                "シドニーとメルボルンの間で首都を巡る争いがあり、<br>両都市の間を取って生まれたのがキャンベラだそうです。";
            normal_point = 20;
            bonus_point = 60;
            break;

        case "20":
            event_type = 1;
            talk_theme.innerHTML = "大学で頑張りたい事";
            talk_img.src = "./img/event/daigaku.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "この新入生交流イベントの先輩サポーター、すごいおススメです！<br>来年、よかったら参加してみて下さい！";
            normal_point = 20;
            bonus_point = 30;
            break;

        default:
            event_type = 1;
            talk_theme.innerHTML = "大学で頑張りたい事";
            talk_img.src = "./img/event/daigaku.png";
            result_answer.innerHTML = "製作者より";
            result_description.innerHTML =
                "この新入生交流イベントの先輩サポーター、すごいおススメです！<br>来年、よかったら参加してみて下さい！";
            normal_point = 20;
            bonus_point = 30;
            break;
    }

    my_grid = Number(parseInt(index) + 1);
    grid_num.innerHTML = Number(parseInt(index) + 1);
    console.log("set " + Number(parseInt(index) + 1) + " grid.");
}

/*--------------------------------------------------------------------*/

const waiting_display = document.getElementById("waiting_display");

/*--------------------------------------------------------------------*/

// チーム追加
const teamwindow = document.getElementById("m_inputbox"); //　ここにサイコロ表示
const form_input = document.getElementById("form_textbox_id");
const form_btn = document.getElementById("form_btn_id");

//チーム名入力ウィンドウを表示
eel.expose(team_inputbox_visible);
function team_inputbox_visible() {
    console.log("team_input_box_visible");
    form_input.value = "";
    waiting_display.style.visibility = "hidden";
    teamwindow.style.visibility = "visible";
}

//チーム名入力ウィンドウを非表示
function team_inputbox_hidden() {
    console.log("team_input_box_hidden");
    teamwindow.style.visibility = "hidden";
}

form_btn.addEventListener("click", () => {
    let colon_str = document.getElementById("form_textbox_id").value;
    let colon_found = colon_str.indexOf(":");
    if (colon_found != -1) {
        alert(
            "船長より\n名前に「：：」が含まれているみてぇだ！\nすまねぇが「：：」を含まない名前に変えて、もう一度試してくれ！"
        );
    } else {
        // チーム名を送信する関数を書く
        eel.append_send_data(
            `:200::${document.getElementById("form_textbox_id").value}:`
        );
        set_ship(2);
        teamwindow.style.visibility = "hidden";
        waiting_display.style.visibility = "visible";
    }
});

/*--------------------------------------------------------------------*/

// タイマー
let timer = false;
let start, time_passed, time_left;
const time_num = document.getElementById("time_num");
function start_timer(time) {
    console.log("start_timer");
    start = Date.now();
    timer = setInterval(() => {
        time_passed = Date.now() - start;
        time_left = time - time_passed;
        time_num.innerHTML = Math.floor(time_left / 1000) + 1;
        if (time_left < 0) {
            clearInterval(timer);
            timer = false;
        }
    });
}

function stop_timer() {
    if (timer) {
        clearInterval(timer);
        timer = false;
    }
    time_num.innerHTML = 0;
}

/*--------------------------------------------------------------------*/

// ステータスの更新
const state_name = document.getElementById("state_name");
const state_point = document.getElementById("state_point");
function updata_statu(name, point) {
    console.log("updata_statu");
    state_name.innerHTML = name + " 海賊団";
    state_point.innerHTML = point + " pt";
}

/*--------------------------------------------------------------------*/

// サイコロを振る
const video_box = document.getElementById("video-box");

let diceColorArray = [
    "#ffd200",
    "#ffa11a",
    "#ff1a1a",
    "#ff00b4",
    "#ae00ff",
    "#6100ff",
    "#0000ff",
    "#00bbff",
    "#00cc5c",
    "#73eb00",
]; //サイコロの面の色の配列

var diceid = [
    "anim_1",
    "anim_2",
    "anim_3",
    "anim_4",
    "anim_5",
    "anim_6",
    "anim_7",
    "anim_8",
    "anim_9",
    "anim_10",
];

for (let i = 0; i < 10; ++i) {
    diceid[i] = document.getElementById(diceid[i]);
}

var dice_front = document.getElementById("dice_front"); //  ここに画像を表示
var dice_bottom = document.getElementById("dice_bottom"); //  ここに画像を表示
var id_dicenum_b = document.getElementById("id_dicenum_b"); //ここに数字を表示
var id_dicenum_f = document.getElementById("id_dicenum_f"); //ここに数字を表示
const diceContent = document.getElementById("id_diceContent"); //　ここにサイコロ表示

var period = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //サイコロの周期
var period_len = 0;
var dice_switchtime = 50; //ダイスロールするときに、サイコロの目が変わる時間(単位:ms)
var dicenum = 0;
var isDiceroll = false;
var ispush = false;
var isprint = true;
var timerId = 0; ///setIntervalの管理をする変数(暗黙宣言になってたことに気づいた)

let roll_yet = false; //サイコロの状態(振ったor振ってない)

//サイコロを表示する関数(diceanim関数を使用したあとに使用する用途)
function print_dice() {
    roll_yet = true;
    console.log(new Date().getTime() + "print_dice");
    var print;

    //サイコロアニメーション動画を非表示にする&動画をリロード(再生位置のリセット)
    for (let i = 0; i < 10; ++i) {
        diceid[i].style.visibility = "hidden";
        /*if(diceid[i].currentTime!=0){
            diceid[i].load();
        }*/
    }
    print = `
    <div id="scene">
        <div class="boxBase" id="id_boxBase">
            <div class="bottom" id="dice_bottom"><div class="dice_num" id="id_dicenum_b">${
                period[0] + 1
            }</div></div>
            <div class="front" id="dice_front"><div class="dice_num" id="id_dicenum_f">${
                period[0] + 1
            }</div></div>
        </div>
        <p class="please_space">spaceキーを押して下さい</p>
    </div>`;
    diceContent.innerHTML = print; //サイコロ表示

    //IDの再設定
    dice_front = document.getElementById("dice_front"); //  ここに画像を表示
    dice_bottom = document.getElementById("dice_bottom"); //  ここに画像を表示
    id_dicenum_b = document.getElementById("id_dicenum_b"); //ここに数字を表示
    id_dicenum_f = document.getElementById("id_dicenum_f"); //ここに数字を表示

    //サイコロの面の色を変更
    dice_bottom.style.backgroundColor = diceColorArray[period[0]];
    dice_front.style.backgroundColor = diceColorArray[period[0]];
}

///サイコロルーレットスタートの関数(引数:min=最低値,max=最大値)
function start_diceroll(min, max) {
    console.log(new Date().getTime() + "start_diceroll");

    //gifアニメーションをリロード
    //for(let i=0;i<10;++i){
    //diceid[i].src=`anim/anim_${i+1}.gif?`+ (new Date).getTime();    //gifアニメーションのリロード
    //}
    //非数値判定
    if (isNaN(min)) {
        min = 1;
    }
    if (isNaN(max)) {
        max = 10;
    }

    //min>maxが入力されたときの処理(min<maxになるように)
    if (min > max) {
        //swap
        let tmp;
        tmp = max;
        max = min;
        min = tmp;
    }

    //長さを計算する
    period_len = max - min + 1;

    //period配列(周期)作成
    for (let i = 0; i < period_len; ++i) {
        period[i] = i + min - 1;
    }

    print_dice(); //サイコロを表示する
    timerId = setInterval(diceroll, dice_switchtime); //  ランダム表示
}

//ダイスロールする関数(ランダムな値を表示する関数)
function diceroll() {
    dicenum++;
    if (dicenum >= period_len) {
        dicenum = 0;
    }

    //サイコロの面の色を変更
    dice_bottom.style.backgroundColor = diceColorArray[period[dicenum]];
    dice_front.style.backgroundColor = diceColorArray[period[dicenum]];

    //サイコロの目の値を変更
    id_dicenum_b.innerHTML = period[dicenum] + 1;
    id_dicenum_f.innerHTML = period[dicenum] + 1;
    return period[dicenum];
}

let dice_finish = 0;
//決定した数字を表示する関数
function stop_diceroll() {
    console.log(new Date().getTime() + "stop_diceroll");
    let _dicenum = dicenum;
    console.log("ランダム表示停止！");

    console.log("サイコロ非表示！");
    diceContent.innerHTML = ""; //サイコロを消す
    diceid[period[_dicenum]].style.visibility = "visible"; //数字に対応したサイコロアニメーションを表示する
    console.log("visibility:" + diceid[period[_dicenum]].style.visibility);
    console.log("動画再生！(stopdiceroll)");
    console.log("再生時間" + diceid[period[_dicenum]].currentTime);

    //diceid[period[_dicenum]].play();
    //diceid[period[_dicenum]].play(); //アニメーションを再生

    clearInterval(timerId); //  ランダム表示の停止
    console.log("period[dicenum]:" + period[_dicenum]);
    console.log("再生直後" + diceid[period[_dicenum]].currentTime);
    setTimeout(_stop_diceroll, 20 * 1000);
    //setTimeout(_stop_diceroll,500);
    /*setTimeout(()=>{
        console.log("1秒後"+diceid[period[dicenum]].currentTime);
    },500);
    setTimeout(()=>{
        console.log("2秒後"+diceid[period[dicenum]].currentTime);
    },2000);*/
    /*dice_finish = 0;
    setTimeout(() => {
        dice_finish = 1;
    }, 5000);
    for (let i = 0; i < 10; i++) {
        diceid[i].addEventListener("playing", function (event) {
            isplay = true;
        });
    }*/

    return period[dicenum];
}

function _stop_diceroll() {
    /*if(diceid[period[dicenum]].currentTime==0 && diceid[period[dicenum]].style.visibility=="visible"){
        console.log("再生");
        diceid[period[dicenum]].play();
        setTimeout(_stop_diceroll,500);
    }*/
    //gifアニメーションをリロード(2重ロード防止)
    if (roll_yet) {
        for (let i = 0; i < 10; ++i) {
            diceid[i].src = `anim/anim_${i + 1}.gif?` + new Date().getTime(); //gifアニメーションのリロード
        }
        roll_yet = false;
    }
}

///サイコロ非表示
/*function del_diceroll() {
    console.log("del_diceroll");
    const minvideotime = 2100; //動画を再生するのに必要な最低限の時間
    let rest = minvideotime - diceid[period[dicenum]].currentTime * 1000; //残りの動画時間を計算(videnElement.currentTime...動画の現在の時間を取得)

    //残りの動画時間が0より多ければ再生中
    if (rest > 0) {
        //再生中なら動画が終了するころに_del_diceroll関数を実行する
        setTimeout(_del_diceroll, rest);
    } else {
        //再生終了してたら_del_diceroll関数を実行する
        _del_diceroll();
    }
}*/

//旧_del_diceroll()関数　(gifファイルにしたことで動画時間を取得することができなくなったため直接実行するしかない)
function del_diceroll() {
    console.log(new Date().getTime() + "_del_diceroll");
    let print = "";
    diceContent.innerHTML = print; //非表示

    //サイコロアニメーション動画を非表示にする & 動画をリロード(再生位置のリセット)
    for (let i = 0; i < 10; ++i) {
        diceid[i].style.visibility = "hidden";
        /*if(diceid[i].currentTime!=0){
            diceid[i].load();
        }*/
    }
}

/*--------------------------------------------------------------------*/

let ship_speed = -0.4;
let ship_route = 0;
// 左から順に
let left_end_pos = -20;
let left_land_pos = 25;
let right_land_pos = 55;
let right_end_pos = 110;
let ship_pos = right_end_pos;
let ship_moving = false;

const ship = document.getElementById("ship");

function set_ship(route, speed = ship_speed) {
    console.log("set_ship");
    if (route == 0 || route == 1) {
        if (speed < 0) {
            ship.style.transform = "scale(1, 1)";
            ship_pos = right_end_pos;
        } else {
            ship.style.transform = "scale(-1, 1)";
            ship_pos = left_end_pos;
        }
    } else if (route == 2) {
        if (speed < 0) {
            ship.style.transform = "scale(1, 1)";
            ship_pos = right_land_pos;
        } else {
            ship.style.transform = "scale(-1, 1)";
            ship_pos = left_land_pos;
        }
    }
    ship.style.left = ship_pos + "vw";
}

/*
    go_sihp 関数の使い方

    route は 0, 1, 2 のどれかを入れてください
    0...画面端から反対側の画面端まで進みます
    1...島から画面端まで進みます
    2...画面端から島まで進みます

    speed は船の速度です
    speed >= 0 で進行方向が左になります
    speed < 0 で進行方向が右になります
    入力しないと、初期設定の -0.4 で進みます
*/

function go_ship(route, speed = ship_speed) {
    console.log("go_ship");
    ship_route = parseInt(route);
    ship_speed = parseFloat(speed);

    ship.style.visibility = "visible";

    set_ship(ship_route, ship_speed);

    if (!ship_moving) {
        ship_moving = setInterval(move_ship);
    }
}

function move_ship() {
    ship_pos = ship_pos + ship_speed;
    ship.style.left = ship_pos + "vw";

    // 端まで移動
    if (ship_route == 0 || ship_route == 2) {
        // 左進行
        if (ship_speed < 0) {
            if (ship_pos <= left_end_pos) {
                clearInterval(ship_moving);
                ship_moving = false;
            }
        }
        // 右進行
        else {
            if (right_end_pos <= ship_pos) {
                clearInterval(ship_moving);
                ship_moving = false;
            }
        }
    }
    // 島で止まる
    else if (ship_route == 1) {
        // 左進行
        if (ship_speed < 0) {
            if (ship_pos <= right_land_pos) {
                clearInterval(ship_moving);
                ship_moving = false;
            }
        }
        // 右進行
        else {
            if (left_land_pos <= ship_pos) {
                clearInterval(ship_moving);
                ship_moving = false;
            }
        }
    }
}

/*--------------------------------------------------------------------*/

let event_clear = false;
let playing_event = false;

const event_paper = document.getElementById("event_paper");
const event_talk = document.getElementById("event_talk");
const talk_btn = document.getElementById("talk_btn");
const event_choice = document.getElementById("event_choice");
const choice_btn = document.getElementById("choice_btn");
const event_quiz1 = document.getElementById("event_quiz1");
const event_quiz2 = document.getElementById("event_quiz2");
const event_game1 = document.getElementById("event_game1");
const start_flag = document.getElementById("start_flag");
const timeup_flag = document.getElementById("timeup_flag");

// 引数には event_type を入れてください
function print_event(e_type) {
    event_paper.style.visibility = "visible";

    // トークイベント
    if (e_type == 1) {
        reset_talk();
        event_talk.style.visibility = "visible";
    }
    // チョイス
    else if (e_type == 2) {
        reset_choice();
        event_choice.style.visibility = "visible";
    }
    // クイズ1
    else if (e_type == 3) {
        reset_quiz1();
        event_quiz1.style.visibility = "visible";
    }
    // クイズ2
    else if (e_type == 4) {
        reset_quiz2();
        event_quiz2.style.visibility = "visible";
    }
    // 神経衰弱
    else if (e_type == 5) {
        reset_game1();
        event_game1.style.visibility = "visible";
    }
    // ジェスチャーゲーム
    else if (e_type == 6) {
        reset_game2();
        event_game2.style.visibility = "visible";
    }
    // ブラックジャック
    else if (e_type == 7) {
        reset_game3();
        event_game3.style.visibility = "visible";
    }
}

// イベント開始
async function start_event(time) {
    console.log("start_event");
    eel.server_sound("start_whistle.mp3");
    start_flag.style.visibility = "visible";
    await sleep(1000);
    playing_event = true;
    start_flag.style.visibility = "hidden";
    start_timer(time);
}

/*-------------------*/

talk_btn.addEventListener("click", () => {
    if (event_type == 1) {
        if (playing_event) {
            event_clear = true;
            talk_btn.style.border = "0.3vw solid red";
        }
    }
});

function reset_talk() {
    event_clear = false;
    talk_btn.style.border = "";
}

/*-------------------*/

choice_btn.addEventListener("click", () => {
    if (event_type == 2) {
        if (playing_event) {
            event_clear = true;
            choice_btn.style.border = "0.3vw solid red";
        }
    }
});

function reset_choice() {
    event_clear = false;
    choice_btn.style.border = "";
}

/*-------------------*/

let your_answer = 0;
quiz1_ans1.addEventListener("click", () => {
    if (event_type == 3) {
        if (playing_event) {
            your_answer = 1;
            reset_border_quiz1();
            quiz1_ans1.style.border = "0.3vw solid red";
        }
    }
});
quiz1_ans2.addEventListener("click", () => {
    if (event_type == 3) {
        if (playing_event) {
            your_answer = 2;
            reset_border_quiz1();
            quiz1_ans2.style.border = "0.3vw solid red";
        }
    }
});
quiz1_ans3.addEventListener("click", () => {
    if (event_type == 3) {
        if (playing_event) {
            your_answer = 3;
            reset_border_quiz1();
            quiz1_ans3.style.border = "0.3vw solid red";
        }
    }
});
quiz1_ans4.addEventListener("click", () => {
    if (event_type == 3) {
        if (playing_event) {
            your_answer = 4;
            reset_border_quiz1();
            quiz1_ans4.style.border = "0.3vw solid red";
        }
    }
});

function reset_border_quiz1() {
    quiz1_ans1.style.border = "";
    quiz1_ans2.style.border = "";
    quiz1_ans3.style.border = "";
    quiz1_ans4.style.border = "";
}

function reset_quiz1() {
    your_answer = 0;
    reset_border_quiz1();
}

/*-------------------*/

quiz2_ans1.addEventListener("click", () => {
    if (event_type == 4) {
        if (playing_event) {
            your_answer = 1;
            reset_border_quiz2();
            quiz2_ans1.style.border = "0.3vw solid red";
        }
    }
});
quiz2_ans2.addEventListener("click", () => {
    if (event_type == 4) {
        if (playing_event) {
            your_answer = 2;
            reset_border_quiz2();
            quiz2_ans2.style.border = "0.3vw solid red";
        }
    }
});
quiz2_ans3.addEventListener("click", () => {
    if (event_type == 4) {
        if (playing_event) {
            your_answer = 3;
            reset_border_quiz2();
            quiz2_ans3.style.border = "0.3vw solid red";
        }
    }
});
quiz2_ans4.addEventListener("click", () => {
    if (event_type == 4) {
        if (playing_event) {
            your_answer = 4;
            reset_border_quiz2();
            quiz2_ans4.style.border = "0.3vw solid red";
        }
    }
});

function reset_border_quiz2() {
    quiz2_ans1.style.border = "";
    quiz2_ans2.style.border = "";
    quiz2_ans3.style.border = "";
    quiz2_ans4.style.border = "";
}

function reset_quiz2() {
    your_answer = 0;
    reset_border_quiz2();
}

/*-------------------*/

// ID 取得
let cards_id = [];
for (let i = 1; i <= 12; i++) {
    cards_id.push(document.getElementById("game1_card" + i));
}

// カードの順番
const card_order = [5, 2, 1, 6, 4, 3, 3, 5, 1, 2, 6, 4];
let got_cards = [];
const card_imgs = [
    "./img/event/cards/trump_s1.png",
    "./img/event/cards/trump_s2.png",
    "./img/event/cards/trump_s3.png",
    "./img/event/cards/trump_s4.png",
    "./img/event/cards/trump_s5.png",
    "./img/event/cards/trump_s6.png",
];

let open_idx1 = -1;
let open_idx2 = -1;
let open_card1 = -1;
let open_card2 = -1;
let able_open = true;
for (let i = 0; i < 12; i++) {
    cards_id[i].addEventListener("click", () => {
        if (able_open && playing_event) {
            if (open_card1 == -1) {
                open_idx1 = i;
                open_card1 = card_order[i];
                cards_id[i].src = card_imgs[open_card1 - 1];
            } else {
                if (i != open_idx1) {
                    open_idx2 = i;
                    open_card2 = card_order[i];
                    cards_id[i].src = card_imgs[open_card2 - 1];
                    check_card();
                }
            }
        }
    });
}

const complete_msg = document.getElementById("complete_msg");

async function check_card() {
    // 揃った時、
    able_open = false;
    if (open_card1 == open_card2) {
        got_cards.push(open_card1);
        got_cards.push(open_card2);
        await sleep(1000);
        cards_id[open_idx1].style.visibility = "hidden";
        cards_id[open_idx2].style.visibility = "hidden";
        point_in_game++;
        if (12 <= got_cards.length) {
            complete_msg.style.visibility = "visible";
        }
    } else {
        await sleep(1000);
        cards_id[open_idx1].src = "./img/event/cards/trump_b.png";
        cards_id[open_idx2].src = "./img/event/cards/trump_b.png";
    }

    // 変数を初期化
    open_idx1 = -1;
    open_idx2 = -1;
    open_card1 = -1;
    open_card2 = -1;
    able_open = true;
}

function del_game1() {
    for (let i = 0; i < 12; i++) {
        cards_id[i].style.visibility = "hidden";
        cards_id[i].src = "./img/event/cards/trump_b.png";
    }
    complete_msg.style.visibility = "hidden";
}

// ゲームが終了
function reset_game1() {
    open_idx1 = -1;
    open_idx2 = -1;
    open_card1 = -1;
    open_card2 = -1;
    point_in_game = 0;
    got_cards = [];
    able_open = true;
    for (let i = 0; i < 12; i++) {
        cards_id[i].src = "./img/event/cards/trump_b.png";
        cards_id[i].style.visibility = "visible";
    }
}

/*-------------------*/

let looked_theme = false;
const event_game2 = document.getElementById("event_game2");
const game2_look_btn = document.getElementById("game2_look_btn");
const game2_gesture_theme_div = document.getElementById(
    "game2_gesture_theme_div"
);
const game2_rule1 = document.getElementById("game2_rule1");
const game2_rule2 = document.getElementById("game2_rule2");
const game2_rule3 = document.getElementById("game2_rule3");

game2_look_btn.addEventListener("click", () => {
    if (event_type == 6) {
        if (playing_event) {
            if (!looked_theme) {
                display_gesture_theme();
                looked_theme = true;
            } else {
                event_clear = true;
                game2_look_btn.style.border = "0.3vw solid red";
            }
        }
    }
});

async function display_gesture_theme() {
    game2_gesture_theme_div.style.visibility = "visible";
    await sleep(3000);
    game2_gesture_theme_div.style.visibility = "hidden";
    game2_rule1.innerHTML = "４. 代表者以外の人も前を向いてください";
    game2_rule2.innerHTML = "５. 代表者は動きだけでお題を表現してください";
    game2_rule3.innerHTML = "６. 代表者以外は何の動きか当ててください";
    game2_look_btn.value = "できた！！";
}

function reset_game2() {
    looked_theme = false;
    event_clear = false;
    game2_look_btn.style.border = "";
    game2_rule1.innerHTML = "１. 出題役を１人決めてください";
    game2_rule2.innerHTML = "２. それ以外の人は後ろを向いてください";
    game2_rule3.innerHTML = "３. 準備ができたらボタンを押してください";
    game2_gesture_theme_div.style.visibility = "hidden";
    game2_look_btn.value = "お題を見る";
}

/*-------------------*/

// ID 取得
const event_game3 = document.getElementById("event_game3");
const card_deck = document.getElementById("card_deck");
const move_card = document.getElementById("move_card");
const open_card = document.getElementById("open_card");
const card_num_sum = document.getElementById("card_num_sum");
const open_card_btn = document.getElementById("open_card_btn");

let random_num;
let total_num = 0;
let card_moving = false;
let start_position = 5;
let card_position = start_position;
let goal_position = 37;
let card_speed = 0.5; // 0.075がデフォ
let card_pass = [
    "img/event/cards/trump_s1.png",
    "img/event/cards/trump_s2.png",
    "img/event/cards/trump_s3.png",
    "img/event/cards/trump_s4.png",
    "img/event/cards/trump_s5.png",
    "img/event/cards/trump_s6.png",
];

open_card_btn.addEventListener("click", () => {
    if (event_type == 7) {
        if (playing_event) {
            if (card_moving == false) {
                random_num = Math.floor(Math.random() * 5);
                open_card.src = card_pass[random_num];
                card_position = start_position;
                card_moving = setInterval(() => {
                    card_position += card_speed;
                    move_card.style.left = card_position + "vw";
                    if (card_position >= goal_position) {
                        move_card.style.left = start_position + "vw";
                        open_card.style.visibility = "visible";
                        total_num += random_num + 1;
                        card_num_sum.innerHTML = total_num;
                        clearInterval(card_moving);
                        card_moving = false;
                        if (total_num == 21) {
                            card_num_sum.style.fontSize = "3vw";
                            card_num_sum.innerHTML = "ブラック<br>ジャック";
                        }
                        if (total_num > 21) {
                            card_num_sum.style.fontSize = "3vw";
                            card_num_sum.innerHTML = "バースト<br>over...";
                        }
                    }
                });
            }
        }
    }
});

function reset_game3() {
    total_num = 0;
    point_in_game = 0;
    card_num_sum.innerHTML = total_num;
    card_num_sum.style.fontSize = "6vw";
    card_position = start_position;
    move_card.style.left = card_position + "vw";
    open_card.style.visibility = "hidden";
}

/*-------------------*/

// イベントを終了
async function finish_event() {
    console.log("finish_event");
    eel.server_sound("finish_whistle.mp3");
    timeup_flag.style.visibility = "visible";
    playing_event = false;
    check_answer();
    check_bj_point();
    await sleep(2000);
    timeup_flag.style.visibility = "hidden";
    del_event();
}

// クイズの答え合わせ
function check_answer() {
    console.log("check_answer");
    if (event_type == 3 || event_type == 4) {
        if (your_answer == true_answer) {
            event_clear = true;
        } else {
            event_clear = false;
        }
    }
}

// ブラックジャックの得点
function check_bj_point() {
    if (event_type == 7) {
        point_in_game = 21 - total_num;
    }
}

// イベントを非表示
function del_event() {
    console.log("del_event");
    event_paper.style.visibility = "hidden";
    event_talk.style.visibility = "hidden";
    event_choice.style.visibility = "hidden";
    event_quiz1.style.visibility = "hidden";
    event_quiz2.style.visibility = "hidden";
    del_game1();
    event_game1.style.visibility = "hidden";
    event_game2.style.visibility = "hidden";
    event_game3.style.visibility = "hidden";
    open_card.style.visibility = "hidden";
}

/*--------------------------------------------------------------------*/

const treasurebox_anim = document.getElementById("tresurebox_anim");

// 宝箱を表示, 再生
function print_trebox() {
    console.log("print_trebox");
    treasurebox_anim.style.visibility = "visible";
    treasurebox_anim.play();
    eel.server_sound("tresure_box.mp3");
}

// 宝箱を非表示
function del_trebox() {
    console.log("del_trebox");
    treasurebox_anim.load();
    treasurebox_anim.style.visibility = "hidden";
}

/*-------------------*/

let fade_in;
let opacity = 1;
let bj_point = [120, 90, 70, 50, 30, 0]; // ブラックジャックでの得点
const result = document.getElementById("result");
const result_paper = document.getElementById("result_paper");
const result_clear = document.getElementById("result_clear");
const result_normal_point = document.getElementById("result_normal_point");
const result_bonus_point = document.getElementById("result_bonus_point");
const result_turn_point = document.getElementById("result_turn_point");

// リザルトを更新
function updata_result() {
    console.log("updata_result");
    // 得点計算
    this_turn_point = normal_point;
    if ((1 <= event_type && event_type <= 4) || event_type == 6) {
        if (event_clear) {
            this_turn_point += bonus_point;
        }
    }
    // 神経衰弱
    else if (event_type == 5) {
        bonus_point = point_in_game * 20;
        this_turn_point += bonus_point;
    }
    // ブラックジャック
    else if (event_type == 7) {
        if (6 <= point_in_game) {
            bonus_point = 10;
        } else if (point_in_game <= -1) {
            bonus_point = 0;
        } else {
            bonus_point = bj_point[point_in_game];
        }
        this_turn_point += bonus_point;
    }

    // 表示を変更
    if (event_type == 1 || event_type == 2 || event_type == 6) {
        if (event_clear) {
            result_clear.innerHTML = "ミッション成功！";
        } else {
            result_clear.innerHTML = "ミッション失敗！";
        }
    } else if (event_type == 3 || event_type == 4) {
        if (event_clear) {
            result_clear.innerHTML = "正解！";
        } else {
            result_clear.innerHTML = "不正解！";
        }
    }
    // 神経衰弱
    else if (event_type == 5) {
        if (point_in_game <= 6) {
            result_clear.innerHTML = "ミッション大成功！！";
        } else if (0 < point_in_game) {
            result_clear.innerHTML = "ミッション成功！";
        } else if (point_in_game == 0) {
            result_clear.innerHTML = "ミッション失敗！";
        }
    }
    // ブラックジャック
    else if (event_type == 7) {
        if (point_in_game == 0) {
            result_clear.innerHTML = "ミッション大成功！！";
        } else if (1 <= point_in_game) {
            result_clear.innerHTML = "ミッション成功！";
        } else if (point_in_game <= -1) {
            result_clear.innerHTML = "ミッション失敗！";
        }
    }

    result_normal_point.innerHTML = "　　通常点：" + normal_point + "pt";
    if ((1 <= event_type && event_type <= 4) || event_type == 6) {
        if (event_clear) {
            result_bonus_point.innerHTML = "ボーナス点：" + bonus_point + "pt";
        } else {
            result_bonus_point.innerHTML = "ボーナス点：0pt";
        }
    } else {
        result_bonus_point.innerHTML = "ボーナス点：" + bonus_point + "pt";
    }

    result_turn_point.innerHTML = "　総合得点：" + this_turn_point + "pt";
}

// リザルトを表示
function print_result() {
    console.log("print_result");
    video_box.style.visibility = "visible";
    opacity = 0;
    result.style.opacity = opacity;
    result_paper.style.opacity = opacity;
    result.style.visibility = "visible";
    result_paper.style.visibility = "visible";

    fade_in = setInterval(() => {
        opacity += 0.005;
        if (1 <= opacity) {
            opacity = 1;
            clearInterval(fade_in);
        }
        result.style.opacity = opacity;
        result_paper.style.opacity = opacity;
    });
}

// リザルトを非表示
function del_result() {
    console.log("del_result");
    video_box.style.visibility = "hidden";
    result.style.visibility = "hidden";
    result_paper.style.visibility = "hidden";
}

/*--------------------------------------------------------------------*/

let ending_video = document.getElementById("ending");
let end_result = document.getElementById("end_result");
let m_anim = new Array(6);

//エンディング再生&諸々設定する関数(引数 teamname:チームネーム, subtotal:ここまでの合計得点, bonus:ボーナス[残りマスで得点を追加？])
function end_play(teamname, subtotal, turn_num) {
    console.log("end_play");

    end_del(); //初期化

    end_result.style.visibility = "visible"; //表示

    subtotal = parseInt(subtotal);
    let bonus = calc_result_bonus(turn_num);
    let total = subtotal + bonus; //総合得点を計算

    ending_video = document.getElementById("ending");
    end_result = document.getElementById("end_result");

    //動画再生
    ending_video.load();
    ending_video.play();

    //表示する文字を設定
    document.getElementById("end_teamname").innerHTML = teamname;
    document.getElementById("end_subtotal").innerHTML = `得点:${subtotal}点`;
    document.getElementById("end_bonus").innerHTML = `ボーナス:+${bonus}点`;
    document.getElementById("end_total").innerHTML = `総合得点:${total}点`;
    send_function_point(teamname, bonus);
}

// ターン数から
function calc_result_bonus(turn_num) {
    turn_num = parseInt(turn_num);
    console.log("calc_result_bonus");
    // 5 手以内にゴール時、
    if (turn_num <= 5) {
        return 130;
    } else if (turn_num == 6) {
        return 70;
    } else if (7 <= turn_num) {
        return 10;
    }
}

//エンディングを消す(非表示)&色々初期化
function end_del() {
    console.log("end_del");
    set_ship(0);
    end_result.style.visibility = "hidden"; //非表示

    //アニメーションをキャンセル
    for (let i = 0; i < 7; ++i) {
        clearTimeout(m_anim[i]);
    }

    //リセット処理
    document.getElementById("end_teamname").classList.remove("end_teamname_c");
    document.getElementById("end_subtotal").classList.remove("end_subtotal_c");
    document.getElementById("end_bonus").classList.remove("end_bonus_c");
    document.getElementById("end_total").classList.remove("end_total_c");
    document.getElementById("end_fade").classList.remove("end_fade_c");
    document.getElementById("end_fade").style.opacity = 0;
}

//動画が再生されたら
ending_video.addEventListener("playing", function (event) {
    //starttime:アニメーションを開始する時間(ms)
    let starttime = 11017;

    //チームネーム表示
    m_anim[0] = setTimeout(function () {
        document.getElementById("end_teamname").classList.add("end_teamname_c");
    }, starttime);

    //得点(小計)表示
    m_anim[1] = setTimeout(function () {
        document.getElementById("end_subtotal").classList.add("end_subtotal_c");
    }, starttime + 617);

    //ボーナス表示
    m_anim[2] = setTimeout(function () {
        document.getElementById("end_bonus").classList.add("end_bonus_c");
    }, starttime + 1233);

    //総合得点(小計+ボーナス)表示
    m_anim[3] = setTimeout(function () {
        document.getElementById("end_total").classList.add("end_total_c");
    }, starttime + 1850);

    //フェードアウト(画面が徐々に暗くなるやつ)
    m_anim[4] = setTimeout(function () {
        document.getElementById("end_fade").classList.add("end_fade_c");
        document.getElementById("end_fade").style.opacity = 1;
    }, 25000);

    //暗転後自動で消えるようにする
    m_anim[5] = setTimeout(function () {
        end_del();
    }, 31000);
});

/*--------------------------------------------------------------------*/

// 関数まとめ
let debug_index = -2;
function change_index() {
    debug_index++;
    set_index(debug_index);
}

let regi_flag = true;
function team_input_func() {
    if (regi_flag) {
        team_inputbox_visible();
        regi_flag = false;
    } else {
        team_inputbox_hidden();
        regi_flag = true;
    }
}

async function saikoro_func() {
    print_dice();
    await sleep(1000);
    start_diceroll(3, 5);
    start_timer(5000);
    once = true;
    await sleep(5000);
    if (once) {
        stop_diceroll();
    }
    once = false;
    await sleep(2000);
    del_diceroll();
}

async function ship_func() {
    go_ship(2);
    await sleep(2000);
    go_ship(0);
    await sleep(2000);
    go_ship(1);
}

async function event_func() {
    print_event(event_type);
    await sleep(2000);
    start_event();
    start_timer(4000);
    await sleep(5000);
    finish_event();
    await sleep(2000);
    del_event(1);
}

async function result_func() {
    updata_result();
    print_trebox();
    await sleep(1000);
    print_result();
    await sleep(4000);
    del_trebox();
    del_result();
}

let able_shortcut = false;
const bgm1 = new Audio("./snd/Go Against the Compass.mp3");
const bgm2 = new Audio("./snd/VSQSE_0706_boat_01_wave.mp3");
window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        if (once) {
            stop_diceroll();
            once = false;
        }
    } else if (
        e.key == "Enter" ||
        e.key == "F1" ||
        e.key == "F2" ||
        e.key == "F3" ||
        e.key == "F4" ||
        e.key == "F6" ||
        e.key == "F7" ||
        e.key == "F8" ||
        e.key == "F9" ||
        e.key == "F10"
    ) {
        e.preventDefault();
    }

    // if (able_shortcut) {
    //     if (e.key == "1") {
    //         change_index();
    //     } else if (e.key == "2") {
    //         team_input_func();
    //     } else if (e.key == "3") {
    //         saikoro_func();
    //     } else if (e.key == "4") {
    //         ship_func();
    //     } else if (e.key == "5") {
    //         event_func();
    //     } else if (e.key == "6") {
    //         result_func();
    //     }
    //     if (e.key == "7") {
    //         end_play("ギギギアル", 2000, 300);
    //     } else if (e.key == "8") {
    //         async_func();
    //     } else if (e.key == "Enter") {
    //         sugoroku_func();
    //     } else if (e.key == "z") {
    //         bgm1.play();
    //         bgm1.loop = true;
    //         bgm2.volume = 0.5;
    //         bgm2.play();
    //         bgm2.loop = true;
    //     }
    // }
});

// すごろく全体の関数
async function sugoroku_func() {
    // イベント
    print_event(event_type);
    await sleep(2000);
    start_event(4000);
    await sleep(5000); // start_event より 1000 大きい数
    finish_event();
    await sleep(2000);
    del_event(1);
    await sleep(3000);

    // リザルト
    updata_result();
    print_trebox();
    await sleep(1000);
    print_result();
    await sleep(4000);
    del_trebox();
    del_result();
    await sleep(3000);

    // サイコロ
    print_dice();
    await sleep(1000);
    start_diceroll(3, 5);
    start_timer(5000);
    once = true;
    await sleep(5000);
    if (once) {
        stop_diceroll();
    }
    once = false;
    await sleep(2000);
    del_diceroll();
    await 1000;
}

/*--------------------------------------------------------------------*/

const send_function = (teamname) => {
    // eel.change_current_value(teamname, _dice, _point, "");
};

const send_function_point = (teamname, point) => {
    eel.append_send_data(`:302::${teamname}::${point}:`);
};

const send_function_dice = (teamname, dice) => {
    eel.append_send_data(`:301::${teamname}::${dice}:`);
};
// 待機画面を表示させる関数(ユーザーが来たときのみ)
function display_wait_page() {
    waiting_display.style.visibility = "visible";
}

// 待機を解除する関数
function display_start() {
    waiting_display.style.visibility = "hidden";
}

let once = false;
// サーバからの指示でサイコロをふる関数
eel.expose(client_roll_dice1);
function client_roll_dice1(teamname, point) {
    client_roll_dice2(teamname, point);
}

async function client_roll_dice2(teamname, point) {
    updata_statu(teamname, point);
    // サイコロ
    display_start();
    print_dice();
    await sleep(1000);
    start_diceroll(3, 5);
    start_timer(10000);
    once = true;
    await sleep(10000);
    if (once) {
        stop_diceroll();
    }
    once = false;
    await sleep(2000);
    del_diceroll();

    display_start();
    let _dice = period[dicenum] + 1; // さいころの出目

    display_wait_page();
    send_function_dice(teamname, _dice);
    console.log("send_dice");
}

eel.expose(start_ship);
function start_ship(direction, route) {
    if (direction == "right" && ship_speed < 0) {
        ship_speed = -ship_speed;
    } else if (direction == "left" && 0 <= ship_speed) {
        ship_speed = -ship_speed;
    }
    waiting_display.style.visibility = "hidden";
    updata_statu("○○○○", 0);
    go_ship(route);
}

function _test(teamname, point) {
    let fff = client_start_game1("teamname", 1221);
    console.log(fff);
}
//サーバからの指示でゲームを開始する関数(終了時のリザルトも含む)
eel.expose(client_start_game1);
function client_start_game1(teamname, point) {
    async_client_start_game1(teamname, point);
}

async function async_client_start_game1(teamname, point) {
    // イベント
    updata_statu(teamname, point);
    display_start();
    print_event(event_type);
    await sleep(2000);
    start_event(30000);
    await sleep(31000); // start_event より 1000 大きい数
    finish_event();
    // del_event();
    await sleep(3000);

    // リザルト
    updata_result();
    print_trebox();
    await sleep(1000);
    print_result();
    await sleep(4000);
    del_trebox();
    del_result();

    client_start_game2(teamname, point);
}

async function client_start_game2(teamname, point) {
    display_start();
    let _point = this_turn_point; //入手した金貨

    display_wait_page();
    // return teamname, _point;
    send_function_point(teamname, _point);
}

//サーバーからの指示で画面の表示を更新する関数
eel.expose(client_updata_display);
function client_updata_display(teamname, point) {
    updata_statu(teamname, point);
}

//サーバからの指示で何も表示させない関数 & 画面の表示を消す関数(ユーザもいないときの待機画面)
eel.expose(client_clean_display);
function client_clean_display() {
    waiting_display.style.visibility = "hidden";
    team_inputbox_hidden();
    stop_timer();
    updata_statu("○○○○", 0);
    del_diceroll();
    set_ship(0);
    del_event();
    del_trebox();
    del_result();
    end_del();
}

eel.expose(team_finish);
function team_finish(teamname, distance, point, buf) {
    end_play(teamname, point, buf);
}
eel.expose(same_team_alert);
function same_team_alert() {
    alert(
        "船長より\n同じチーム名のチームがいるみたいだ。\nすまないが別のチーム名にして、もう一度頼むぞ！"
    );
    team_inputbox_visible();
}
eel.load_function();
