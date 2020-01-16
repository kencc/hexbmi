# Hex-BMI 六角 BMI 計算器

六角學院 JavaScript 學徒的試煉 課程最終作業。

* 網頁：https://kencc.github.io/hexbmi/
* 原始碼：https://github.com/kencc/hexbmi/
* 設計稿：

# 內容
* JavaScript 沒有編譯，請使用目錄下的 all.js
* Webpack 僅編譯 SCSS 檔案與導入 Bootstrap 來處理 CSS 樣式

# 專案配置

使用 npm 方式建置專案與 Webpack 編譯產出最終 CSS

# 編譯方式
1. npm install
2. npx webpack --mode development (未壓縮版本的 CSS)
3. npx webpack (壓縮版本的 CSS)

# 練習過程中遇到的問題

## if 的控制判斷，錯用 && 邏輯運算子

錯誤：兩個中間使用 && 邏輯運算子，就算只填寫身高時，還是可以進行 BMI 計算。

```javascript=
if(cm == '' || kg == '' && cm == '0' || kg == '0'){
  alert('請填寫正確數值');
  return;
}
```

正確：全部使用 || 邏輯運算子，這樣只要一個條件成立，就會判定數值有問題。
```javascript=
if(cm == '' || kg == '' || cm == '0' || kg == '0'){
  alert('請填寫正確數值');
  return;
}
```

## 沒有將主題顏色的資料放到 Data 陣列裡面

傻傻地做完 BMI 資料並順利更新資料到畫面上後，等到要處理 CSS 來套用顏色時，第一個想法是再增加一個 functin 來判斷 BMI 的評價，決定應該使用的 CSS 樣式。

實作的時候發現跟設定評價的工作重複，才想到要將兩個結合，並將資料加入 Data 陣列。

```javascript=
// 存資料進 localStorage
function saveData(bmiStatus,bmi,kg,cm,whatDay,bmiTheme){
  var newBMI = {
    summary: bmiStatus,
    bmi: bmi,
    weight: kg,
    height: cm,
    date: whatDay,
    theme: bmiTheme
  };
  data.push(newBMI);
  localStorage.setItem('bmiStore', JSON.stringify(data));
}
```

## 實作 for 迴圈的 i 沒有設定初始值

由於 console 沒錯誤訊息，所以剛開始以為是字串太龐大，效能卡住了，因為畫面還是有顯示 BMI 出來。重新寫一段 code 覆蓋掉測試正常，才發現少了初始值，但也花掉不少時間。

```javascript=
// 更新 BMI 資料到畫面
  for(var i=0;i<data.length;i++){
    console.log('這是 Data 陣列的資料');
    console.log('For 評價：' + data[i].summary);
    str +=`
    <div class="bmi-card `+ data[i].theme +`">
      <div class="bmi-item">`+ data[i].summary +`</div>
      <div class="bmi-item"><span>BMI</span>`+ data[i].bmi +`</div>
      <div class="bmi-item"><span>weight</span>`+ data[i].weight +`</div>
      <div class="bmi-item"><span>height</span>`+ data[i].height +`</div>
      <div class="bmi-item"><span>`+ data[i].date +`</span></div>
      <div class="bmi-delete" data-index="`+ i + `">刪除</div>
    </div>
    `;
  }
```

## 設定 addEventListener 的對象有問題

在設定"刪除 BMI 資料"的事件對象時，很直覺的選擇最內層的 bmi-delete 來加 Event ，但 Event 一直沒反應，回想課程內容，改將挑選的對象改成 bmi-records ，再搭配 e.target 的方式找出被點擊的對象後才成功。

```htmlmixed=
<div class="bmi-records">
  <div class="bmi-card bmi-good">
    <div class="bmi-item">理想</div>
    <div class="bmi-item"><span>BMI</span>20.90</div>
    <div class="bmi-item"><span>weight</span>70kg</div>
    <div class="bmi-item"><span>height</span>180cm</div>
    <div class="bmi-item"><span>06-19-2017</span></div>
    <div class="bmi-delete">刪除</div>
  </div>
</div>
```

# 過程中學習到的技巧

## 使用 Math() 取得四捨五入的整數

```javascript=
bmi = Math.round((kg/((cm/100)*(cm/100)))*100)/100;
```

參考資料：http://www.eion.com.tw/Blogger/?Pid=1173

## 使用 Date() 取得今天的日期

```javascript=
function getDateLa(){
  var Today = new Date();
  var str = Today.getDate() + '-' + (Today.getMonth()+1) + '-' + Today.getFullYear()
  console.log('取得的日期資料：' + str);
  return str;
}
```

參考資料：https://www.wibibi.com/info.php?tid=175