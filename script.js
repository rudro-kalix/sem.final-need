function num(id){
  const el = document.getElementById(id);
  const v = el ? el.value.trim() : "";
  if(v === "") return 0;
  return Number(v);
}

function clamp(x, lo, hi){ 
  return Math.min(Math.max(x, lo), hi); 
}

function fmt(x){ 
  return Number.isInteger(x) ? x.toString() : x.toFixed(2).replace(/\.00$/, ""); 
}

function attMarks(){
  const perc = num('attp');
  return clamp((perc/100) * 7, 0, 7);
}

function updateAttMark(){
  const m = attMarks();
  const el = document.getElementById('attMarkDisplay');
  el.innerHTML = `That is <strong>${fmt(m)} / 7</strong> marks.`;
}

function calc(){
  const attPerc = num('attp');
  const assn = num('assn');
  const mid  = num('mid');
  const quiz = num('quiz');
  const pres = num('pres');
  let target = num('target');
  if(!isFinite(target) || target <= 0) target = 80;

  // Validate ranges
  const bounds = [
    ['attp', attPerc, 0, 100],
    ['assn', assn, 0, 5],
    ['mid', mid, 0, 25],
    ['quiz', quiz, 0, 15],
    ['pres', pres, 0, 8],
    ['target', target, 0, 100],
  ];

  for(const [id, val, lo, hi] of bounds){
    const el = document.getElementById(id);
    if(val < lo || val > hi || isNaN(val)){
      if(el) el.style.borderColor = 'var(--bad)';
      if(el) el.focus();
      show(`Please enter a valid number for <strong>${id}</strong> (min ${lo}, max ${hi}).`, 'nope');
      return;
    } else if(el){
      el.style.borderColor = 'rgba(255,255,255,0.15)';
    }
  }

  const att = attMarks(); // convert % to marks out of 7
  const earned = att + assn + mid + quiz + pres; // max 60 including presentation
  const neededRaw = target - earned;
  const needed = clamp(neededRaw, 0, 40);
  const possibleMax = earned + 40;

  let headline = '';
  let difficultyClass = '';

  if(neededRaw <= 0){
    headline = `You already have enough for your target (${fmt(target)}).`;
    headline += ` <span class="pill ok">🎉 No marks needed in Final</span>`;
    difficultyClass = 'easy';
  } else if(possibleMax < target){
    headline = `Target unreachable. <span class="pill nope">Even 40/40 won't reach ${fmt(target)}</span>`;
    difficultyClass = 'impossible';
  } else {
    const badgeClass = needed >= 36 ? 'nope' : (needed >= 28 ? 'maybe' : 'ok');
    headline = `You need <span class="pill ${badgeClass}">${fmt(needed)} / 40</span> in the Final.`;
    
    // Determine difficulty class based on marks needed
    if(needed >= 37) {
      difficultyClass = 'hard';
    } else if(needed >= 32) {
      difficultyClass = 'medium';
      } else {
      difficultyClass = 'easy';
    }
  }

  const out = document.getElementById('out');
  out.style.display = 'block';
  out.innerHTML = `
    <h2>${headline}</h2>
    <div class="split">
      <div class="scorebox">
        <h3>Your earned so far</h3>
        <div class="big">${fmt(earned)} / 60 <span class="hint" style="font-size:0.9rem">(Attendance ${fmt(att)} / 7)</span></div>
      </div>
      <div class="scorebox ${difficultyClass}">
        <h3>Needed in Final</h3>
        <div class="big highlight">${fmt(needed)} / 40</div>
      </div>
      <div class="scorebox">
        <h3>Target total</h3>
        <div class="big">${fmt(target)} / 100</div>
      </div>
    </div>
  `;
}

function show(msg, type){
  const out = document.getElementById('out');
  out.style.display = 'block';
  out.innerHTML = `<div class="pill ${type}">${msg}</div>`;
}

function resetAll(){
  for(const id of ['attp','assn','mid','quiz','pres']){
    const el = document.getElementById(id);
    el.value = '';
    el.style.borderColor = 'rgba(255,255,255,0.15)';
  }
  document.getElementById('target').value = 80;
  updateAttMark();
  const out = document.getElementById('out');
  out.style.display = 'none';
  out.innerHTML = '';
}

// Initialize display when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateAttMark();
}); 