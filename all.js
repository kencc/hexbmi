var btnSend = document.querySelector('.btn-calc');
var bmiRecords = document.querySelector('.bmi-records');
var inputHeight = document.querySelector('#myHeight');
var inputWeight = document.querySelector('#myWeight');
var data = JSON.parse(localStorage.getItem('bmiStore')) || [];

btnSend.addEventListener('click',getData,false)
bmiRecords.addEventListener('click',removeData,false)

updateRecords();

// 刪除 BMI 紀錄
function removeData(e){
  if(e.target.innerText !== '刪除'){return};
  var index = e.target.dataset.index;
  data.splice(index,1);
  localStorage.setItem('bmiStore', JSON.stringify(data));
  updateRecords();
}

function getData(){
  var cm = inputHeight.value;
  var kg = inputWeight.value;

  // 排除不適合的數據
  if(cm == '' || kg == '' && cm == '0' || kg == '0'){
    alert('請填寫正確數值');
    return;
  }

  // 計算 BMI
  bmi = Math.round((kg/((cm/100)*(cm/100)))*100)/100;
  console.log('BMI計算的結果為：' + bmi);

  // 取得 BMI 的評價與建議主題
  var bmiStatus = getEvaluation(bmi,1);
  console.log('Return 的評價為：' + bmiStatus);
  var bmiTheme = getEvaluation(bmi,2);
  console.log('Return 的建議主題為：' + bmiTheme);

  // 取得日期
  var whatDay = getDateLa();
  console.log('Return的日期為：' + whatDay);

  // 將資料紀錄在 data 陣列中，再將資料放到 localStorage 存放。
  saveData(bmiStatus,bmi,kg,cm,whatDay,bmiTheme);
  console.log(data);
  console.log(localStorage.getItem('bmiStore'));
  
  // 處理好資料後，再將資料的內容更新到畫面上
  updateRecords();

  // 將計算結果更新到按鈕
  btnShowResult(bmi, bmiStatus, bmiTheme);
}

// 將計算結果更新到按鈕
function btnShowResult(bmi, bmiStatus, bmiTheme){
  var str = `
  <div class="btn-result btn-theme-`+ bmiTheme +`">
    <div class="btn-bmi-info">
      <div class="btn-bmi-val">`+ bmi +`</div>
      <div class="btn-bmi-label">BMI</div>
      <div class="btn-reflash"><img src="./images/icons_loop.png" alt="reflash"></div>
    </div>
    <div class="bmi-msg">`+ bmiStatus +`</div>
  </div>
  `
  document.querySelector('.data-send').innerHTML = str;

  // 對 reflash 按鈕加上 Click Event
  document.querySelector('.btn-reflash').addEventListener('click',function(){
    
    // 將按鈕恢復到初始狀態
    str = `<div class="btn-calc"><div class="btn-calc-text">看結果</div></div>`;
    document.querySelector('.data-send').innerHTML = str;
    
    // 將 input 欄位的值清空
    myHeight.value = '';
    myWeight.value = '';

    // 對復原的按鈕重新加上 Click Event
    document.querySelector('.btn-calc').addEventListener('click',getData,false)
  },false)
}

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

// 更新 BMI 資料到畫面
function updateRecords(){
  console.log(data);
  var str = '';
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
  bmiRecords.innerHTML = str;
}

// 取得日期
function getDateLa(){
  var Today = new Date();
  var str = Today.getDate() + '-' + (Today.getMonth()+1) + '-' + Today.getFullYear()
  console.log('取得的日期資料：' + str);
  return str;
}

// 取得 BMI 的評價與主題顏色
function getEvaluation(bmi,whatYouWant){
  console.log("getEvaluation 收到的BMI數值是：" + bmi );
  var bmiStatus = '';
  var bmiTheme = '';
  if (bmi >= 40){
    bmiStatus = '重度肥胖';
    bmiTheme = 'bmi-danger';
    console.log('getEvaluation 的評價：' + bmiStatus + '使用' + bmiTheme + '主題' );
  }else if (bmi < 40 && bmi >= 35){
    bmiStatus = '中度肥胖';
    bmiTheme = 'bmi-fat';
    console.log('getEvaluation 的評價：' + bmiStatus + '使用' + bmiTheme + '主題' );
  }else if (bmi < 35 && bmi >= 30){
    bmiStatus = '輕度肥胖';
    bmiTheme = 'bmi-fat';
    console.log('getEvaluation 的評價：' + bmiStatus + '使用' + bmiTheme + '主題' );
  }else if (bmi < 30 && bmi >= 25){
    bmiStatus = '過重';
    bmiTheme = 'bmi-warning';
    console.log('getEvaluation 的評價：' + bmiStatus + '使用' + bmiTheme + '主題' );
  }else if (bmi < 25 && bmi >= 18.5){
    bmiStatus = '理想';
    bmiTheme = 'bmi-good';
    console.log('getEvaluation 的評價：' + bmiStatus + '使用' + bmiTheme + '主題' );
  }
  else if (bmi < 18.5){
    bmiStatus = '過輕';
    bmiTheme = 'bmi-short';
    console.log('getEvaluation 的評價：' + bmiStatus + '使用' + bmiTheme + '主題' );
  }
  if (whatYouWant == 1){
    return bmiStatus;
  }else {
    return bmiTheme;
  }
}