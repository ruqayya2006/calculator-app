let display = document.getElementById('display');
let histList = document.getElementById('histList');
let historyArr = JSON.parse(localStorage.getItem('calcHist') || '[]');

function renderHist(){
  if(historyArr.length==0){ histList.innerHTML='<p style="color:#475569;">No history yet</p>'; return; }
  histList.innerHTML = historyArr.map(h=>`<div class="hist-item">${h}</div>`).join('');
}
renderHist();

function append(v){
  let last = display.value.slice(-1);
  let ops = ['+','-','*','/','%','.'];
  // If last char and new char both are operators, replace last one
  if(ops.includes(last) && ops.includes(v)){
    display.value = display.value.slice(0,-1) + v;
    return;
  }
  display.value += v;
}
function clearAll(){ display.value=''; }
function del(){ display.value = display.value.slice(0,-1); }
function calculate(){
  try{
    let expr = display.value;
    let res = eval(expr);
    historyArr.unshift(expr + ' = ' + res);
    if(historyArr.length>20) historyArr.pop();
    localStorage.setItem('calcHist', JSON.stringify(historyArr));
    renderHist();
    display.value = res;
  }catch{ display.value='Error'; }
}
function clearHist(){ historyArr=[]; localStorage.removeItem('calcHist'); renderHist(); }