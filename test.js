//待機画面を表示させる関数(ユーザーが来たときのみ)
function display_wait_page() {}
//待機を解除する関数
function display_start() {}
//サーバーからの指示でさいころを振る関数
eel.expose(client_roll_dice1);
function client_roll_dice1(teamname) {
    return client_roll_dice2(teamname);
}
async function client_roll_dice2(teamname) {
    display_start();
    let _dice; //さいころの出目

    display_wait_page();
    return teamname, _dice;
}

//サーバからの指示でゲームを開始する関数(終了時のリザルトも含む)
eel.expose(client_start_game1);
function client_start_game1(teamname, point) {
    return client_start_game2(teamname, point);
}
function client_start_game2(teamname, point) {
    display_start();
    let _point; //入手した金貨

    display_wait_page();
    return taamname, _point;
}

//サーバーからの指示で画面の表示を更新する関数
function client_updata_display(teamname, point) {}

//サーバからの指示で何も表示させない関数&画面の表示を消す関数(ユーザもいないときの待機画面)
eel.expose(client_clean_display);
function client_clean_display() {}
