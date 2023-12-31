const stockData = [
  [
    {
      "id": 1,
      "name": "Reliance EQ",
      "stockExchange": "NSE",
      "stockPrice": "2,338.10",
      "stockValueChange": "-35.15 (1.48%)"
    },
    {
      "id": 2,
      "name": "TCS EQ",
      "stockExchange": "BSE",
      "stockPrice": "3,649.55",
      "stockValueChange": "120.55 (3.20%)"
    },
    {
      "id": 3,
      "name": "HDFC EQ",
      "stockExchange": "NSE",
      "stockPrice": "1,474.95",
      "stockValueChange": "-13.10 (0.88%)"
    },
    {
      "id": 4,
      "name": "Infy EQ",
      "stockExchange": "BSE",
      "stockPrice": "1,678.50",
      "stockValueChange": "43.55 (2.58%)"
    },
    {
      "id": 5,
      "name": "Unilever EQ",
      "stockExchange": "NSE",
      "stockPrice": "2,295.30",
      "stockValueChange": "-31.90 (1.37%)"
    }
  ],
];
let watchlist = [];
let orderList=[]
function createData(stockData) {
    let elements = "";
    for (let i = 0; i < stockData.length; i++) {
      for (let j = 0; j < stockData[i].length; j++) {
        const stockItem = stockData[i][j];
        const changeValue = parseFloat(stockItem.stockValueChange);
        const changeColor = changeValue < 0 ? 'color: red;' : 'color:green';
        elements += `
         <div class="wrap">
            <div class="stockName">
                <h3>${stockItem.name}</h3>
                <p>${stockItem.stockExchange}</p>
            </div>
            <div class="actions">
              <button class="colorChange" id="watchListBtn${i}-${j}" onclick="addToWatchlist(${i}, ${j})"><i class="fa-solid fa-heart"></i></button>
              <button class="add-button" id="orderListBtn${i}-${j}" onclick="addToOrderList(${i}, ${j})"><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
              <div class="stockPrice">
                <p>Price: ₹ ${stockItem.stockPrice}</p>
                <p style="${changeColor}">₹ ${stockItem.stockValueChange}</p>
              </div>
          </div>
          
         `;
      }
    }
  
    document.getElementById("stock-items").innerHTML = elements;
  }
createData(stockData);


let updateBtn;
function addToWatchlist(stockDataIndex, stockItemIndex) {
  const item = stockData[stockDataIndex][stockItemIndex];
  const itemIndex = watchlist.findIndex((watchlistItem) => watchlistItem.id === item.id);
  if (itemIndex !== -1) {
      watchlist.splice(itemIndex, 1);

      const button = document.querySelector(`#watchListBtn${stockDataIndex}-${stockItemIndex}`);
      
      updateBtn.classList.remove("added");
      
  } else {
      watchlist.push(item);
      const button = document.querySelector(`#watchListBtn${stockDataIndex}-${stockItemIndex}`);
      updateBtn=button
      updateBtn.classList.add("added");
  }
  updateWatchlist();
  console.log(updateBtn);
}


function updateWatchlist() {
    const watchlistElement = document.getElementById("watchlist");
    let watchlistContent = "";
    for (let i = 0; i < watchlist.length; i++) {
      const changeValue = parseFloat(watchlist[i].stockValueChange);
      const changeColor = changeValue < 0 ? 'color: red;' : 'color:green';
        watchlistContent += `
            <div class="wrap">
                <div class="stockName">
                    <h3>${watchlist[i].name}</h3>
                    <p>${watchlist[i].stockExchange}</p>
                </div>
                <div class="actions">
                <button style="color:red;" onclick="trashwatchList('${watchlist[i].id}')"><i class="fa-solid fa-heart"></i></button>
                <button onclick="trashwatchList('${watchlist[i].name}')"><i class="fa-solid fa-cart-shopping"></i></button>

                </div>
                <div class="stockPrice">
                    <p>Price: ₹ ${watchlist[i].stockPrice}</p>
                    <p style="${changeColor}">${watchlist[i].stockValueChange}</p>
                </div>
            </div>
        `;
    }
    watchlistElement.innerHTML = watchlistContent;
}
function trashwatchList(id){
  
    updateBtn.classList.remove("added");
watchlist = watchlist.filter((item)=>item.id != id)
updateWatchlist()
}


let updateOrder
function addToOrderList(stockDataIndex, stockItemIndex) {
  const item = stockData[stockDataIndex][stockItemIndex];
  const itemIndex = orderList.findIndex((orderlistItem) => orderlistItem.id === item.id);
  if (itemIndex !== -1) {
      orderList.splice(itemIndex, 1);

      const button = document.querySelector(`#orderListBtn${stockDataIndex}-${stockItemIndex}`);
      updateOrder.classList.remove("added");
  } else {
      orderList.push(item);

      const button = document.querySelector(`#orderListBtn${stockDataIndex}-${stockItemIndex}`);
      updateOrder=button
      updateOrder.classList.add("added");
  }
  updateOrderList();
}

function updateOrderList() {
  let orderlistContent = "";
  for (let i = 0; i < orderList.length; i++) {
    const changeValues = parseFloat(orderList[i].stockValueChange);
    const changeColors = changeValues < 0 ? 'color: red;' : 'color:green';
    console.log(changeColors);

    orderlistContent += `
          <div class="wrap">
              <div class="stockName">
                  <h3>${orderList[i].name}</h3>
                  <p>${orderList[i].stockExchange}</p>
              </div>
              <div class="actions">
              <button><i class="fa-solid fa-heart"></i></button>
              <button style="color:red;" onclick="trashOrderList('${orderList[i].id}')"><i class="fa-solid fa-cart-shopping"></i></button>
              </div>
              <div class="stockPrice">
                  <p>Price: ₹ ${orderList[i].stockPrice}</p>
                  <p style="${changeColors}">${orderList[i].stockValueChange}</p>
              </div>
          </div>
      `;
  }
  document.getElementById("orderlist").innerHTML= orderlistContent;
}

function trashOrderList(id){
  updateOrder.classList.remove("added");
orderList = orderList.filter((item)=>item.id != id)
updateOrderList()

}

function toggleContent(buttonId, contentId) {
    const button = document.getElementById(buttonId);
    const content = document.getElementById(contentId);
    button.addEventListener("click", function () {
        const buttons = document.querySelectorAll(".nav-button");
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const contents = document.querySelectorAll(".toggle-content");
        contents.forEach((c) => c.style.display = "none");
        content.style.display = "block";
    });
}

toggleContent("stock-main", "stock-items");
toggleContent("watchlist-button", "watchlist-items");
toggleContent("order-button", "orderList-items");


