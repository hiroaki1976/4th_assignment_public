let arr = [];


// データが無い時はh2とdeleteAllボタンを表示しない
$(window).on('load',function() {
    arr = localStorage.getItem("json");// keyネーム’json’のデータを取得し、変数arrに代入する
    arr = JSON.parse(arr);// arrのJSON文字列をオブジェクトに変換し、arrに代入する
	if (arr === null) {
        $('h2').css('display', 'none');
        $('#deleteAll').css('display', 'none');
    }
});


// Save クリックイベント
$("#save").on("click", function () {
    arr = localStorage.getItem("json");// keyネーム’json’のデータを取得し、変数arrに代入する
    let date = new Date()
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (arr == null) {// 変数arrがnullなら
        arr = [];// arrに空の配列を代入する
    } else {
        arr = JSON.parse(arr);//arrのJSON文字列をオブジェクトに変換し、arrに代入する
    }

    const title = $("#title").val();// id:titleの値を取得し、titleに代入する
    const value = $("#text").val();// id:textの値を取得し、valueに代入する
    arr.unshift({ key: title, value: value , year: year, month: month+1, day: day, hour: hour, minute: minute, second: second });// keyとvalue等の配列を配列arrの一番先頭に追加する
    localStorage.setItem('json', JSON.stringify(arr));// arrのオブジェクトをJSON文字列へ変換し、ローカルストレージのkeyネーム'json'へ登録する

    const html = `
    <li>
        <p>${year}年${month+1}月${day}日${hour}時${minute}分${second}秒</p>
        <p>${title}</p>
        <p>${value}</p>
        <P class="transparent">${year}</P>
        <P class="transparent">${month+1}</P>
        <P class="transparent">${day}</P>
        <P class="transparent">${hour}</P>
        <P class="transparent">${minute}</P>
        <P class="transparent">${second}</P>
        <button class="display">表示</button>
        <button class="delete">削除</button>
    </li>
    `;
    $("#list").prepend(html);
    if (arr !== null) {
        $('h2').css('display', 'block');
        $('#deleteAll').css('display', 'inline-block');
    }
    $('#title').val('');
    $('#text').val('');
    });


// 個別メモ表示クリックイベント
$("#list").on("click", ".display", function () {// デリゲートを使用して、.display ボタンのクリックイベントを処理
    const listItem = $(this).closest("li"); // クリックされたボタンに最も近い親 <li> 要素を取得
    const title = listItem.find("p:nth-child(2)").text(); // <li> の 2番目の <p> 要素のテキストを取得
    const value = listItem.find("p:nth-child(3)").text(); // <li> の 3番目の <p> 要素のテキストを取得
    $('#title').val(title);// 取得したタイトルをフォームに設定
    $('#text').val(value);// 取得したメモをフォームに設定
});


// 個別メモ削除クリックイベント
$('#list').on('click', '.delete', function () {
    const listItem = $(this).closest("li"); 
    listItem.remove();
    const storedData = JSON.parse(localStorage.getItem('json'));// ローカルストレージからデータを取得
    for (let i = 0; i < storedData.length; i++) {// ローカルストレージから対応するメモを削除
        if (storedData[i].key === listItem.find("p:nth-child(2)").text() &&
            storedData[i].value === listItem.find("p:nth-child(3)").text() &&
            storedData[i].year == listItem.find("p:nth-child(4)").text() &&
            storedData[i].month == listItem.find("p:nth-child(5)").text() &&
            storedData[i].day == listItem.find("p:nth-child(6)").text() &&
            storedData[i].hour == listItem.find("p:nth-child(7)").text() &&
            storedData[i].minute == listItem.find("p:nth-child(8)").text() &&
            storedData[i].second == listItem.find("p:nth-child(9)").text()) {
            storedData.splice(i, 1); // 対応するメモを削除
            break; // 削除したらループを抜ける
        }
    }
    if (storedData.length === 0) {
        $('h2').css('display', 'none');
        $('#deleteAll').css('display', 'none');
    }
    localStorage.setItem('json', JSON.stringify(storedData));// 更新されたデータをローカルストレージに保存
});


// clearクリックイベント
$("#clear").on("click", function () {
    $('#title').val('');
    $('#text').val('');
});


// ページ読み込み、保存データ取得表示  
    const j = JSON.parse(localStorage.getItem('json')) || [];// localStorage.getItem('json')の結果が null でないことを確認してから JSON.parse を行う
    const k = j.length;// localStorage内に保存した配列の中にあるオブジェクトの個数を確認
  for (let i = 0; i < k; i++) {   // オブジェクトの個数分繰り返す
    const key = localStorage.key(0);
    let arr = localStorage.getItem(key);
    arr = JSON.parse(arr);
    const title = arr[i].key;// オブジェクトからタイトルを取り出す
    const memo = arr[i].value;// オブジェクトからメモを取り出す
    let year = arr[i].year;
    let month = arr[i].month;
    let day = arr[i].day;
    let hour = arr[i].hour;
    let minute = arr[i].minute;
    let second = arr[i].second;
    
    const html = `
    <li>
        <p>${year}年${month}月${day}日${hour}時${minute}分${second}秒</p>
        <p>${title}</p>
        <p>${memo}</p>
        <P class="transparent">${year}</P>
        <P class="transparent">${month}</P>
        <P class="transparent">${day}</P>
        <P class="transparent">${hour}</P>
        <P class="transparent">${minute}</P>
        <P class="transparent">${second}</P>
        <button class="display">表示</button>
        <button class="delete">削除</button>
    </li>
    `;
    $("#list").append(html);
    }


// 全て削除クリックイベント
    $("#deleteAll").on("click", function () {
        localStorage.clear();
        $("#list").empty();
        $('h2').css('display', 'none');
        $('#deleteAll').css('display', 'none');
    });


// タイトルをクリップボードにコピー
    $('#title').on('dblclick', function () {
        let copyTitle = $('#title')[0].value;// タイトルの文字を取得
        console.log(copyTitle);
        navigator.clipboard.writeText(copyTitle);// クリップボードにコピー
});


// 本文をクリップボードにコピー
    $('#text').on('dblclick', function () {
        let copyText = $('#text')[0].value;// 本文の文字を取得
        console.log(copyText);
        navigator.clipboard.writeText(copyText);// クリップボードにコピー
});
