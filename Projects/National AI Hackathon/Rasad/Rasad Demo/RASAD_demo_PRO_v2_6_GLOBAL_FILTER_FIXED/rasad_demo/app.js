'use strict';

const $=(q,root=document)=>root.querySelector(q);
const $$=(q,root=document)=>[...root.querySelectorAll(q)];
const fmt=n=>Number(n).toLocaleString('uz-UZ');
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

const nav=[
  ['Bosh sahifa','i-home'],['Hududlar','i-pin'],['Subyektlar','i-building'],['Tahlillar','i-chart'],['Aloqadorliklar','i-network'],['Ogohlantirishlar','i-bell'],['Hisobotlar','i-file'],['Ma’lumot manbalari','i-db'],['Modellar','i-model'],['Audit','i-audit'],['Foydalanuvchilar','i-user'],['Sozlamalar','i-gear']
];

const regions=[
  {name:'Qoraqalpog‘iston Respublikasi',en:'Karakalpakstan',count:1421,risk:54,alerts:21},
  {name:'Xorazm viloyati',en:'Khorezm',count:932,risk:48,alerts:11},
  {name:'Navoiy viloyati',en:'Navoiy',count:1074,risk:36,alerts:8},
  {name:'Buxoro viloyati',en:'Bukhara',count:1200,risk:39,alerts:9},
  {name:'Samarqand viloyati',en:'Samarkand',count:1984,risk:58,alerts:17},
  {name:'Qashqadaryo viloyati',en:'Kashkadarya',count:1811,risk:61,alerts:19},
  {name:'Surxondaryo viloyati',en:'Surkhandarya',count:1488,risk:71,alerts:24},
  {name:'Jizzax viloyati',en:'Jizzakh',count:1070,risk:68,alerts:16},
  {name:'Sirdaryo viloyati',en:'Syrdarya',count:724,risk:33,alerts:6},
  {name:'Toshkent viloyati',en:'Tashkent Region',count:2385,risk:44,alerts:13},
  {name:'Toshkent shahri',en:'Tashkent city',count:3830,risk:59,alerts:20},
  {name:'Namangan viloyati',en:'Namangan',count:2042,risk:72,alerts:27},
  {name:'Andijon viloyati',en:'Andijan',count:2084,risk:63,alerts:22},
  {name:'Farg‘ona viloyati',en:'Fergana',count:2337,risk:57,alerts:18}
];

const subjects=[
  {code:'SUB-000125',name:'Namangan tekstil servis MChJ',region:'Namangan viloyati',sector:'Sanoat',risk:82,confidence:'Yuqori',quality:87,state:'Ko‘rib chiqilmoqda',riskType:'R05 — Aloqadorlik xavfi',official:'12.4 mlrd so‘m',factors:[['Aylanma o‘zgarishi','−68%','−10% ... +15%','+21 ball'],['Sohaviy og‘ish','94-percentil','Bir xil tarmoq','+16 ball'],['Aloqadorlik xavfi','7 ta aloqa','2 ta yuqori xavfli','+13 ball']]},
  {code:'SUB-000982',name:'Farg‘ona agro savdo MChJ',region:'Farg‘ona viloyati',sector:'Savdo',risk:76,confidence:'Yuqori',quality:84,state:'Tahlil jarayonida',riskType:'R01 — Faoliyat dinamikasi',official:'8.7 mlrd so‘m',factors:[['Aylanma dinamikasi','−54%','−12% ... +18%','+19 ball'],['Davriy og‘ish','2.8σ','≤1.5σ','+15 ball'],['Hududiy farq','89-percentil','Hudud guruhi','+11 ball']]},
  {code:'SUB-001420',name:'Qashqadaryo qurilish invest MChJ',region:'Qashqadaryo viloyati',sector:'Qurilish',risk:71,confidence:'O‘rta',quality:79,state:'Ko‘rib chiqilmoqda',riskType:'R02 — Sohaviy og‘ish',official:'10.1 mlrd so‘m',factors:[['Sohaviy og‘ish','91-percentil','Bir xil tarmoq','+20 ball'],['Ma’lumot ziddiyati','3 ta maydon','0–1 ta','+12 ball'],['Davriy sakrash','+47%','−15% ... +20%','+10 ball']]},
  {code:'SUB-001103',name:'Toshkent logistik markaz MChJ',region:'Toshkent viloyati',sector:'Transport va logistika',risk:68,confidence:'Yuqori',quality:83,state:'Tekshiruvga yuborildi',riskType:'R04 — Operatsion noodatiylik',official:'15.8 mlrd so‘m',factors:[['Operatsiyalar soni','+63%','−10% ... +25%','+18 ball'],['Aloqalar soni','14 ta','4–8 ta','+12 ball'],['Tarmoq og‘ishi','84-percentil','Bir xil tarmoq','+9 ball']]},
  {code:'SUB-001887',name:'Samarqand universal savdo MChJ',region:'Samarqand viloyati',sector:'Savdo',risk:65,confidence:'O‘rta',quality:76,state:'Tahlil jarayonida',riskType:'R07 — Davriy xavf',official:'7.2 mlrd so‘m',factors:[['Mavsumiy og‘ish','2.1σ','≤1.5σ','+14 ball'],['Aylanma beqarorligi','41%','≤20%','+12 ball'],['Ma’lumot sifati','76/100','≥85','+7 ball']]},
  {code:'SUB-002102',name:'Buxoro servis loyiha MChJ',region:'Buxoro viloyati',sector:'Xizmatlar',risk:39,confidence:'Yuqori',quality:91,state:'Tasdiqlandi',riskType:'R03 — Hududiy og‘ish',official:'5.1 mlrd so‘m',factors:[['Hududiy og‘ish','63-percentil','Hudud guruhi','+8 ball'],['Faoliyat dinamikasi','+12%','−10% ... +20%','+4 ball'],['Aloqadorlik','2 ta','0–4 ta','+2 ball']]},
  {code:'SUB-002331',name:'Andijon tex servis MChJ',region:'Andijon viloyati',sector:'Axborot va aloqa',risk:57,confidence:'Yuqori',quality:89,state:'Ko‘rib chiqilmoqda',riskType:'R06 — Ma’lumotlar ziddiyati',official:'6.8 mlrd so‘m',factors:[['Ma’lumot ziddiyati','4 ta maydon','0–1 ta','+15 ball'],['Tarmoq og‘ishi','74-percentil','Bir xil tarmoq','+8 ball'],['Davriy og‘ish','1.7σ','≤1.5σ','+5 ball']]}
];


const sectorOptions=['Sanoat','Qurilish','Savdo','Qishloq xo‘jaligi','Xizmatlar','Transport va logistika','Axborot va aloqa'];
const periodOptions=['2024-yil, yanvar – dekabr','2024-yil, I chorak','2024-yil, II chorak','2024-yil, III chorak','2024-yil, IV chorak'];

function hashNum(str){let h=2166136261;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return Math.abs(h>>>0)}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function syntheticFactorSet(seed){
  const a=48+(seed%27), b=65+((seed>>>3)%30), c=2+((seed>>>5)%8);
  return [
    ['Faoliyat dinamikasi',`−${a}%`,'−10% ... +15%',`+${14+(seed%9)} ball`],
    ['Sohaviy og‘ish',`${b}-percentil`,'Bir xil tarmoq',`+${9+(seed%8)} ball`],
    ['Aloqadorlik xavfi',`${c} ta aloqa`,'0–4 ta',`+${6+(seed%7)} ball`]
  ];
}

// Har bir hududda demo jadval va filtrlar bo‘sh qolmasligi uchun deterministik sintetik subyektlar.
regions.forEach((r,ri)=>{
  const existing=subjects.filter(s=>s.region===r.name).length;
  for(let j=existing;j<7;j++){
    const seed=hashNum(`${r.name}-${j}`);
    const sector=sectorOptions[(ri+j)%sectorOptions.length];
    const risk=clamp(Math.round(r.risk-14+(seed%29)),18,94);
    const quality=clamp(78+((seed>>>4)%18),72,96);
    subjects.push({
      code:`DEMO-${String(ri+1).padStart(2,'0')}${String(j+1).padStart(3,'0')}`,
      name:`${r.name.replace(' viloyati','').replace(' Respublikasi','')} demo subyekti ${j+1}`,
      region:r.name,sector,risk,
      confidence:quality>=88?'Yuqori':quality>=80?'O‘rta':'Past',
      quality,
      state:['Ko‘rib chiqilmoqda','Tahlil jarayonida','Tekshiruvga yuborildi','Tasdiqlandi'][(seed>>>7)%4],
      riskType:[
        'R01 — Faoliyat dinamikasi','R02 — Sohaviy og‘ish','R03 — Hududiy og‘ish','R04 — Operatsion noodatiylik',
        'R05 — Aloqadorlik xavfi','R06 — Ma’lumotlar ziddiyati','R07 — Davriy xavf','R08 — Kompleks xavf'
      ][(seed>>>9)%8],
      official:`${(3+(seed%120)/10).toFixed(1)} mlrd so‘m`,
      factors:syntheticFactorSet(seed)
    });
  }
});


// Har bir hudud × tarmoq × xavf darajasi kombinatsiyasi uchun kichik demo namunalar.
// Bu agregat sonlar emas; jadval va filtrlarning mantiqiy ishlashini ko‘rsatadigan sintetik yozuvlardir.
regions.forEach((r,ri)=>sectorOptions.forEach((sector,si)=>{
  const tiers=[
    {name:'high',risk:clamp(Math.max(72,r.risk+8+(si%5)),70,94),quality:90,state:'Ko‘rib chiqilmoqda'},
    {name:'mid',risk:clamp(48+((ri+si)%18),42,68),quality:76,state:'Tahlil jarayonida'},
    {name:'low',risk:clamp(24+((ri*2+si)%14),18,38),quality:58,state:'Tasdiqlandi'}
  ];
  tiers.forEach((t,ti)=>{
    const code=`SIM-${String(ri+1).padStart(2,'0')}${String(si+1).padStart(2,'0')}${ti+1}`;
    if(subjects.some(x=>x.code===code))return;
    const seed=hashNum(code);
    subjects.push({code,name:`${r.name.replace(' viloyati','').replace(' Respublikasi','')} ${sector.toLowerCase()} demo ${ti+1}`,region:r.name,sector,risk:t.risk,confidence:t.quality>=88?'Yuqori':t.quality>=70?'O‘rta':'Past',quality:t.quality,state:t.state,riskType:['R01 — Faoliyat dinamikasi','R02 — Sohaviy og‘ish','R04 — Operatsion noodatiylik','R05 — Aloqadorlik xavfi'][(si+ti)%4],official:`${(2+(seed%90)/10).toFixed(1)} mlrd so‘m`,factors:syntheticFactorSet(seed)});
  });
}));

const alerts=[
  {id:'ALT-1028',severity:'Yuqori',subject:'SUB-000125',type:'Aloqadorlik xavfi',region:'Namangan viloyati',time:'10:21',assignee:'M. Tursunov',status:'Yangi'},
  {id:'ALT-1027',severity:'Yuqori',subject:'SUB-000982',type:'Faoliyat dinamikasi',region:'Farg‘ona viloyati',time:'09:54',assignee:'J. Mirzayev',status:'Ko‘rib chiqilmoqda'},
  {id:'ALT-1026',severity:'O‘rta',subject:'SUB-001420',type:'Sohaviy og‘ish',region:'Qashqadaryo viloyati',time:'09:30',assignee:'M. Obidjanov',status:'Yangi'},
  {id:'ALT-1025',severity:'O‘rta',subject:'SUB-001103',type:'Operatsion noodatiylik',region:'Toshkent viloyati',time:'08:48',assignee:'A. Karimov',status:'Tekshiruvga yuborildi'}
];


regions.forEach((r,ri)=>{
  if(!alerts.some(a=>a.region===r.name)){
    const subj=subjects.filter(s=>s.region===r.name).sort((a,b)=>b.risk-a.risk)[0];
    alerts.push({
      id:`ALT-D${String(ri+1).padStart(2,'0')}`,
      severity:subj.risk>=70?'Yuqori':'O‘rta',subject:subj.code,
      type:subj.riskType.replace(/^R\d+ — /,''),region:r.name,
      time:`${String(8+(ri%3)).padStart(2,'0')}:${String((ri*7)%60).padStart(2,'0')}`,
      assignee:'Demo tahlilchi',status:ri%3===0?'Yangi':'Ko‘rib chiqilmoqda'
    });
  }
});

const sources=[
  {name:'Demo subyektlar bazasi',type:'CSV',status:'Faol',updated:'10:24',rows:5000,rejected:0,quality:94,error:'—'},
  {name:'Demo operatsiyalar',type:'JSON',status:'Faol',updated:'10:19',rows:42580,rejected:17,quality:88,error:'17 qator tekshiruvdan o‘tmadi'},
  {name:'Hududiy ko‘rsatkichlar',type:'XLSX',status:'Faol',updated:'09:55',rows:336,rejected:0,quality:91,error:'—'},
  {name:'Aloqadorliklar',type:'CSV',status:'Kechikkan',updated:'Kecha, 18:40',rows:8920,rejected:32,quality:81,error:'Yangilanish kechikmoqda'}
];

const models=[
  {name:'RASAD kompleks xavf',version:'2.1',algorithm:'Ansambl',status:'Faol',date:'2024-12-20',quality:'0.88',drift:'Barqaror',approved:'B. Umarova'},
  {name:'Noodatiylik aniqlash',version:'1.4',algorithm:'Isolation Forest',status:'Tasdiqlangan',date:'2024-12-17',quality:'0.84',drift:'Barqaror',approved:'U. Erkaboyev'},
  {name:'Davriy og‘ish',version:'1.2',algorithm:'Vaqt qatori',status:'Sinovda',date:'2024-12-22',quality:'0.81',drift:'Kuzatuv',approved:'—'},
  {name:'Aloqadorlik xavfi',version:'0.9',algorithm:'Graf tahlili',status:'Qoralama',date:'2024-12-25',quality:'—',drift:'—',approved:'—'}
];

let audit=[
  {time:'10:24:08',user:'Akmal Dadaboyev',action:'Tizimga kirish',object:'Sessiya',old:'—',next:'Faol',ip:'10.0.0.15'},
  {time:'10:22:31',user:'M. Tursunov',action:'Ekspert qarori',object:'SUB-000125',old:'Yangi',next:'Ko‘rib chiqilmoqda',ip:'10.0.0.24'},
  {time:'10:18:04',user:'Tizim',action:'Model hisoblash',object:'RASAD v2.1',old:'—',next:'24 382 subyekt',ip:'system'}
];

const users=[
  {name:'Akmal Dadaboyev',role:'Administrator',unit:'Tizim boshqaruvi',status:'Faol'},
  {name:'M. Tursunov',role:'Tahlilchi',unit:'Namangan',status:'Faol'},
  {name:'J. Mirzayev',role:'Tahlilchi',unit:'Farg‘ona',status:'Faol'},
  {name:'B. Umarova',role:'Rahbar',unit:'Markaziy apparat',status:'Faol'},
  {name:'A. Karimov',role:'Auditor',unit:'Audit',status:'Faol'}
];

const state={page:'Bosh sahifa',selected:subjects[0],region:'Barcha hududlar',sector:'Barcha tarmoqlar',risk:'Barchasi',expert:'Barchasi',quality:'Cheklanmagan',period:localStorage.getItem('rasadPeriod')||'2024-yil, yanvar – dekabr',role:localStorage.getItem('rasadRole')||'Administrator',low:Number(localStorage.getItem('rasadLow')||40),high:Number(localStorage.getItem('rasadHigh')||70)};

const NATIONAL_TOTAL=regions.reduce((a,r)=>a+r.count,0);
const sectorShare={'Sanoat':.18,'Qurilish':.12,'Savdo':.22,'Qishloq xo‘jaligi':.16,'Xizmatlar':.18,'Transport va logistika':.08,'Axborot va aloqa':.06};
const sectorRiskOffset={'Sanoat':5,'Qurilish':2,'Savdo':-3,'Qishloq xo‘jaligi':-5,'Xizmatlar':-7,'Transport va logistika':1,'Axborot va aloqa':-10};
const periodFactor={'2024-yil, yanvar – dekabr':1,'2024-yil, I chorak':.72,'2024-yil, II chorak':.76,'2024-yil, III chorak':.81,'2024-yil, IV chorak':.86};

function regionQuality(r){return clamp(Math.round(94-r.risk*.09+(hashNum(r.name)%5)-2),78,95)}
function effectiveRegionRisk(r){
  let v=r.risk;
  if(state.sector!=='Barcha tarmoqlar')v+=sectorRiskOffset[state.sector]||0;
  if(state.period.includes('I chorak'))v-=4;
  if(state.period.includes('II chorak'))v-=1;
  if(state.period.includes('III chorak'))v+=2;
  if(state.period.includes('IV chorak'))v+=5;
  return clamp(Math.round(v),12,96);
}
function riskBreakdown(total,risk){
  const highRate=clamp(.006+(risk/100)*.026,.008,.035);
  const midRate=clamp(.14+(risk/100)*.17,.15,.33);
  let high=Math.round(total*highRate), mid=Math.round(total*midRate), low=Math.max(0,total-high-mid);
  return {high,mid,low};
}
function contextForRegion(r){
  let count=r.count;
  if(state.sector!=='Barcha tarmoqlar'){
    const variation=.88+(hashNum(`${r.name}-${state.sector}`)%25)/100;
    count=Math.max(1,Math.round(count*(sectorShare[state.sector]||.1)*variation));
  }
  count=Math.max(1,Math.round(count*(periodFactor[state.period]||1)));
  if(state.expert!=='Barchasi')count=Math.max(1,Math.round(count*.34));
  if(state.quality==='80 va yuqori')count=Math.max(1,Math.round(count*.78));
  if(state.quality==='60–79')count=Math.max(1,Math.round(count*.19));
  if(state.quality==='60 dan past')count=Math.max(1,Math.round(count*.03));
  const baseRisk=effectiveRegionRisk(r);
  let risk=baseRisk;
  let dist=riskBreakdown(count,baseRisk);
  if(state.risk==='Yuqori'){count=dist.high;dist={high:count,mid:0,low:0};risk=clamp(Math.max(state.high+6,baseRisk+12),state.high,96)}
  if(state.risk==='O‘rta'){count=dist.mid;dist={high:0,mid:count,low:0};risk=clamp(Math.round((state.low+state.high-1)/2),state.low,state.high-1)}
  if(state.risk==='Past'){count=dist.low;dist={high:0,mid:0,low:count};risk=clamp(Math.min(state.low-7,baseRisk-10),8,state.low-1)}
  const quality=state.quality==='60 dan past'?56:state.quality==='60–79'?72:state.quality==='80 va yuqori'?Math.max(84,regionQuality(r)):regionQuality(r);
  const alertFactor=r.count?count/r.count:0;
  const alerts=count>0&&r.alerts>0?Math.max(1,Math.round(r.alerts*alertFactor)):0;
  return {count,risk,quality,alerts,...dist};
}
function nationalContext(){
  const rows=regions.map(contextForRegion);
  const count=rows.reduce((a,x)=>a+x.count,0);
  const weighted=rows.reduce((a,x)=>a+x.risk*x.count,0);
  return {count,risk:count?Math.round(weighted/count):0,quality:count?Math.round(rows.reduce((a,x)=>a+x.quality*x.count,0)/count):0,alerts:rows.reduce((a,x)=>a+x.alerts,0),high:rows.reduce((a,x)=>a+x.high,0),mid:rows.reduce((a,x)=>a+x.mid,0),low:rows.reduce((a,x)=>a+x.low,0)};
}
function activeContext(){const r=state.region==='Barcha hududlar'?null:regions.find(x=>x.name===state.region);return r?contextForRegion(r):nationalContext()}
function filteredAlerts(){return alerts.filter(a=>(state.region==='Barcha hududlar'||a.region===state.region))}
function ensureSelectedSubject(){const list=dashboardSubjects().sort((a,b)=>b.risk-a.risk);if(list.length&&!list.some(s=>s.code===state.selected?.code))state.selected=list[0];return list}
function setRegionFilter(name,source='Hudud'){
  state.region=name||'Barcha hududlar';
  ensureSelectedSubject();
  logAction('Hudud filtri',state.region,'—',source);
  renderPage();
  showToast(state.region==='Barcha hududlar'?'Hudud filtri bekor qilindi.':`${state.region} bo‘yicha barcha tahliliy bloklar yangilandi.`,'success');
}
function clearAllFilters(){state.region='Barcha hududlar';state.sector='Barcha tarmoqlar';state.risk='Barchasi';state.expert='Barchasi';state.quality='Cheklanmagan';state.period='2024-yil, yanvar – dekabr';localStorage.setItem('rasadPeriod',state.period);ensureSelectedSubject();renderPage();showToast('Barcha filtrlar bekor qilindi.','success')}
function activeFiltersHtml(){
  const chips=[];
  if(state.region!=='Barcha hududlar')chips.push(['region','Hudud',state.region]);
  if(state.sector!=='Barcha tarmoqlar')chips.push(['sector','Tarmoq',state.sector]);
  if(state.risk!=='Barchasi')chips.push(['risk','Xavf',state.risk]);
  if(state.expert!=='Barchasi')chips.push(['expert','Ekspert',state.expert]);
  if(state.quality!=='Cheklanmagan')chips.push(['quality','Sifat',state.quality]);
  if(state.period!=='2024-yil, yanvar – dekabr')chips.push(['period','Davr',state.period]);
  if(!chips.length)return '';
  return `<div class="active-filters"><strong>Faol filtrlar</strong>${chips.map(([k,l,v])=>`<button class="filter-chip" data-clear-filter="${k}"><span>${l}: ${esc(v)}</span><b>×</b></button>`).join('')}<button class="clear-filters" id="clearAllFilters">Barchasini tozalash</button></div>`;
}


function icon(id){return `<svg><use href="#${id}"/></svg>`}
function badge(text,type='blue'){return `<span class="badge ${type}">${esc(text)}</span>`}
function riskClass(r){return r>=state.high?'high':r>=state.low?'mid':'low'}
function riskLabel(r){return r>=state.high?'Yuqori':r>=state.low?'O‘rta':'Past'}
function confClass(c){return c==='Yuqori'?'high':c==='O‘rta'?'medium':'low'}
function stateClass(s){return s.includes('Tasdiq')?'state-done':s.includes('Tekshir')?'state-check':s.includes('jarayon')?'state-progress':'state-review'}
function pageHead(title,subtitle,actions=''){return `<div class="page-head"><div><div class="title-row"><h1>${title}</h1><span class="demo-badge">◉ &nbsp; Namoyish ma’lumotlari — sintetik</span></div><p>${subtitle}</p></div>${actions?`<div class="head-actions">${actions}</div>`:''}</div>`}

function initNav(){
  $('#sideNav').innerHTML=nav.map(([label,ic])=>`<button class="nav-item ${label===state.page?'active':''}" data-page="${label}">${icon(ic)}<span>${label}</span>${label==='Ogohlantirishlar'?'<b class="nav-badge">12</b>':''}</button>`).join('');
  $$('.nav-item').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
}
function navigate(page){state.page=page;initNav();$('#periodLabel').textContent=state.period;renderPage();if(innerWidth<980)$('#sidebar').classList.remove('open');logAction('Sahifa ochildi',page,'—','Ko‘rildi')}

function dashboardFilters(){return `<button class="select-btn" id="regionBtn">▧ <span>${esc(state.region)}</span> <b>⌄</b></button><button class="select-btn" id="sectorBtn">▣ ${esc(state.sector)} <b>⌄</b></button><button class="select-btn wide" id="periodFilterBtn">▣ ${esc(state.period)} <b>⌄</b></button><button class="filter-btn" id="filterBtn">${icon('i-filter')} Filtrlar <b>⌄</b></button>`}

function dashboardSubjects(){return subjects.filter(s=>(state.region==='Barcha hududlar'||s.region===state.region)&&(state.sector==='Barcha tarmoqlar'||s.sector===state.sector)&&(state.risk==='Barchasi'||riskLabel(s.risk)===state.risk)&&(state.expert==='Barchasi'||s.state===state.expert)&&(state.quality==='Cheklanmagan'||(state.quality==='80 va yuqori'&&s.quality>=80)||(state.quality==='60–79'&&s.quality>=60&&s.quality<80)||(state.quality==='60 dan past'&&s.quality<60))).sort((a,b)=>b.risk-a.risk)}
function dashboard(){
 const m=activeContext(); const list=ensureSelectedSubject(); const total=Math.max(1,m.count); const hp=(m.high/total*100),mp=(m.mid/total*100),lp=(m.low/total*100);
 const countCaption=state.region==='Barcha hududlar'?'Faol filtrlar bo‘yicha':`O‘zbekiston bo‘yicha jami: ${fmt(NATIONAL_TOTAL)}`;
 return `${pageHead('Bosh sahifa','Iqtisodiy xavf signallarini aniqlash, ustuvorlashtirish va ekspert qarorini qo‘llab-quvvatlash.',dashboardFilters())}${activeFiltersHtml()}
<div class="filter-panel" id="filterPanel">
  <div><label>Xavf darajasi</label><select id="riskFilter"><option ${state.risk==='Barchasi'?'selected':''}>Barchasi</option><option ${state.risk==='Yuqori'?'selected':''}>Yuqori</option><option ${state.risk==='O‘rta'?'selected':''}>O‘rta</option><option ${state.risk==='Past'?'selected':''}>Past</option></select></div>
  <div><label>Ekspert holati</label><select id="expertFilter"><option ${state.expert==='Barchasi'?'selected':''}>Barchasi</option><option ${state.expert==='Ko‘rib chiqilmoqda'?'selected':''}>Ko‘rib chiqilmoqda</option><option ${state.expert==='Tahlil jarayonida'?'selected':''}>Tahlil jarayonida</option><option ${state.expert==='Tekshiruvga yuborildi'?'selected':''}>Tekshiruvga yuborildi</option><option ${state.expert==='Tasdiqlandi'?'selected':''}>Tasdiqlandi</option></select></div>
  <div><label>Ma’lumot sifati</label><select id="qualityFilter"><option ${state.quality==='Cheklanmagan'?'selected':''}>Cheklanmagan</option><option ${state.quality==='80 va yuqori'?'selected':''}>80 va yuqori</option><option ${state.quality==='60–79'?'selected':''}>60–79</option><option ${state.quality==='60 dan past'?'selected':''}>60 dan past</option></select></div>
  <button id="applyFilters">Qo‘llash</button>
</div>
<div class="kpi-grid">
 ${kpi('i-building','blue','Tahlil qilingan subyektlar',fmt(m.count),countCaption,'Filtrlangan')}
 ${kpi(null,'red','Yuqori ustuvorlikdagi holatlar',fmt(m.high),'Joriy kesim bo‘yicha',`${hp.toFixed(1)}%`,'▲')}
 ${kpi('i-bell','amber','Yangi ogohlantirishlar',fmt(m.alerts),state.region==='Barcha hududlar'?'Faol kesim bo‘yicha':state.region,'Faol')}
 ${kpi('i-db','cyan','O‘rtacha ma’lumot sifati',`${m.quality}/100`,'Faol kesim bo‘yicha','Sifat')}
 ${kpi('i-network','violet','Faol model','RASAD v2.1','Xavfni kompleks baholash modeli','Faol',null,true)}
 ${kpi('i-calendar','blue','Oxirgi yangilanish','2024-12-28 10:24','(UTC+5)','●')}
</div>
<div class="dashboard-grid">
 <article class="card map-card"><div class="card-head"><h2><span class="section-icon">◫</span> Hududiy ko‘rinish</h2><span class="mini-select static">Analitik xavf</span></div><div class="map-stage"><div id="liveMap"></div>${fallbackMap()}<div class="map-info" id="mapInfo">${state.region==='Barcha hududlar'?nationalInfoHtml():regionInfoHtml(regions.find(r=>r.name===state.region))}</div><div class="map-legend"><span><i class="lg-low"></i> Past (&lt;${state.low})</span><span><i class="lg-mid"></i> O‘rta (${state.low}–${state.high-1})</span><span><i class="lg-high"></i> Yuqori (≥${state.high})</span></div></div></article>
 <article class="card donut-card"><div class="card-head"><h2><span class="section-icon">▥</span> Xavf taqsimoti</h2></div><div class="donut-wrap"><div class="donut" style="background:conic-gradient(#ff5357 0 ${hp}%,#ffbe38 ${hp}% ${hp+mp}%,#47b96f ${hp+mp}% 100%)"><div><strong>${fmt(m.count)}</strong><span>subyekt</span></div></div></div><div class="donut-legend"><div><i class="high"></i><span>Yuqori</span><b>${fmt(m.high)} <em>(${hp.toFixed(1)}%)</em></b></div><div><i class="mid"></i><span>O‘rta</span><b>${fmt(m.mid)} <em>(${mp.toFixed(1)}%)</em></b></div><div><i class="low"></i><span>Past</span><b>${fmt(m.low)} <em>(${lp.toFixed(1)}%)</em></b></div></div></article>
 <article class="card trend-card"><div class="card-head"><h2><span class="section-icon">⌁</span> Vaqt bo‘yicha dinamika</h2><span class="mini-select static">${esc(state.period)}</span></div>${trendSvg()}</article>
 <article class="card sector-card"><div class="card-head"><h2><span class="section-icon">◉</span> Tarmoqlar kesimida</h2><span class="mini-select static">Xavf bahosi</span></div>${sectorBars()}</article>
 <article class="card factors-card"><div class="card-head"><h2><span class="section-icon">▣</span> Asosiy xavf omillari</h2></div>${factorList()}</article>
 <article class="card table-card"><div class="card-head"><h2><span class="triangle">▲</span> Yuqori e’tibor talab qiluvchi subyektlar</h2><button class="text-link" data-go="Subyektlar">Barchasini ko‘rish →</button></div><div class="subject-table-wrap">${list.length?subjectTable(list.slice(0,5),'dashboardSubjectTable'):'<div class="empty-state"><strong>Faol filtrlarga mos subyekt topilmadi</strong><span>Filtrlarni o‘zgartiring yoki barcha hududlarga qayting.</span></div>'}</div></article>
 <article class="card detail-card" id="detailCard">${list.length?detailCard(state.selected):'<div class="empty-state"><strong>Subyekt tanlanmagan</strong></div>'}</article>
</div>`}

function kpi(ic,color,title,value,caption,delta,raw=null,status=false){return `<article class="kpi-card"><div class="kpi-icon ${color}">${ic?icon(ic):raw}</div><div><small>${title}</small><strong>${value}</strong><p>${caption}</p></div>${status?`<span class="status-pill green">${delta}</span>`:`<span class="delta neutral">${delta}</span>`}</article>`}
function trendData(){
 const m=activeContext();const allMonths=['Yan','Fev','Mar','Apr','May','Iyn','Iyl','Avg','Sen','Okt','Noy','Dek'];
 let idx=[0,1,2,3,4,5,6,7,8,9,10,11];
 if(state.period.includes('I chorak'))idx=[0,1,2];if(state.period.includes('II chorak'))idx=[3,4,5];if(state.period.includes('III chorak'))idx=[6,7,8];if(state.period.includes('IV chorak'))idx=[9,10,11];
 const seed=hashNum(`${state.region}-${state.sector}`)%9;
 const vals=idx.map((mi,i)=>clamp(Math.round(m.risk-13+mi*1.6+Math.sin((mi+seed)*1.17)*7),8,96));
 return {months:idx.map(i=>allMonths[i]),vals};
}
function trendSvg(){const {months,vals}=trendData();const xs=vals.map((_,i)=>38+i*(332/Math.max(1,vals.length-1)));const ys=vals.map(v=>180-v*1.45);const pts=xs.map((x,i)=>`${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');const fillPts=vals.length?`${pts} ${xs[xs.length-1]},180 ${xs[0]},180`:'';return `<svg class="trend-chart" viewBox="0 0 390 220"><g class="grid-lines"><path d="M38 30H370M38 80H370M38 130H370M38 180H370"/><path d="M38 30V180M78 30V180M118 30V180M158 30V180M198 30V180M238 30V180M278 30V180M318 30V180M358 30V180"/></g><polygon points="${fillPts}" class="area-path"/><polyline points="${pts}" class="line-path"/>${xs.map((x,i)=>`<circle cx="${x}" cy="${ys[i]}" r="3" fill="#fff" stroke="#1f79e8" stroke-width="2"><title>${months[i]}: ${vals[i]}</title></circle>`).join('')}<g class="axis-text"><text x="6" y="35">100</text><text x="15" y="85">75</text><text x="15" y="135">50</text><text x="15" y="185">0</text></g><g class="axis-text">${xs.map((x,i)=>`<text x="${x-7}" y="207">${months[i]}</text>`).join('')}</g></svg>`}
function sectorBars(){
 const m=activeContext();let arr=sectorOptions.map(n=>[n,clamp(Math.round(m.risk+(sectorRiskOffset[n]||0)+(hashNum(`${state.region}-${n}`)%7)-3),8,96)]);
 if(state.sector!=='Barcha tarmoqlar')arr=arr.filter(([n])=>n===state.sector);
 return `<div class="sector-bars">${arr.map(([n,v])=>`<div><span>${n}</span><i><b style="width:${v}%" class="${v>=state.high?'bar-red':v<state.low?'bar-green':''}"></b></i><em>${v}</em></div>`).join('')}</div>`}
function factorList(){
 const m=activeContext(),seed=hashNum(`${state.region}-${state.sector}-${state.period}`)%11;
 const arr=[['Faoliyat dinamikasi',clamp(m.risk+7+(seed%6),15,96)],['Sohaviy og‘ish',clamp(m.risk-8+(seed%7),12,92)],['Aloqadorlik xavfi',clamp(m.risk-13+((seed*3)%9),10,90)],['Ma’lumotlar ziddiyati',clamp(m.risk-22+((seed*5)%8),8,86)],['Davriy xavf',clamp(m.risk-27+((seed*7)%10),5,82)]];
 return `<div class="factor-list">${arr.map(([n,v],i)=>`<div><span><b class="factor-ico">${['⌁','⌘','⌬','△','◷'][i]}</b>${n}</span><i><b style="width:${v}%" class="${v>=state.high?'risk-high':v>=state.low?'risk-mid':'risk-low'}"></b></i><em>${v}/100</em></div>`).join('')}</div>`}

function fallbackMap(){return `<div class="map-fallback map-offline" id="mapFallback"><div class="map-offline-box"><div class="map-offline-icon">⌖</div><strong>Hududiy xarita yuklanmoqda</strong><span>14 ma’muriy hudud chegaralari aniq GeoJSON qatlamidan olinadi.</span><button type="button" id="retryMap" class="btn">Qayta urinish</button></div></div>`}
function regionInfoHtml(r){if(!r)return nationalInfoHtml();const c=contextForRegion(r);return `<strong>${r.name}</strong><div><span>Subyektlar soni</span><b>${fmt(c.count)}</b></div><div><span>Analitik xavf</span><b class="${riskClass(c.risk)==='high'?'red-text':riskClass(c.risk)==='mid'?'amber-text':'green-text'}">${riskLabel(c.risk)} (${c.risk}/100)</b></div><div><span>Yangi ogohlantirishlar</span><b>${c.alerts}</b></div><div><span>Ma’lumot sifati</span><b>${c.quality}/100</b></div><div><span>Yangilanish</span><b>2024-12-28 10:24</b></div>`}
function nationalInfoHtml(){const c=nationalContext();return `<strong>O‘zbekiston — faol kesim</strong><div><span>Subyektlar soni</span><b>${fmt(c.count)}</b></div><div><span>O‘rtacha xavf</span><b>${c.risk}/100</b></div><div><span>Ogohlantirishlar</span><b>${c.alerts}</b></div><div><span>Ma’lumot sifati</span><b>${c.quality}/100</b></div>`}

function subjectTable(list,id='subjectTable'){return `<table class="subject-table" id="${id}"><thead><tr><th>Ichki kod</th><th>Subyekt nomi</th><th>Hudud</th><th>Xavf</th><th>Ishonch</th><th>Sifat</th><th>Holat</th><th></th></tr></thead><tbody>${list.map(s=>`<tr data-subject="${s.code}" class="${s.code===state.selected.code?'active':''}"><td class="code">${s.code}</td><td>${s.name}</td><td>${s.region.replace(' viloyati','')}</td><td><span class="risk-score ${riskClass(s.risk)}">${s.risk}/100</span></td><td><span class="conf-pill ${confClass(s.confidence)}"><i class="dot"></i>${s.confidence}</span></td><td><span class="quality">${s.quality}/100</span></td><td><span class="state-pill ${stateClass(s.state)}">${s.state}</span></td><td class="kebab">•••</td></tr>`).join('')}</tbody></table>`}
function detailCard(s){return `<div class="card-head"><h2><span class="section-icon">▥</span> Tanlangan subyekt</h2><button class="dots" data-go="Subyektlar">•••</button></div><div class="subject-title-row"><h3>${s.name}</h3><span>${s.code}</span></div><div class="detail-metrics"><div><small>Xavf bahosi</small><div class="risk-ring" style="background:conic-gradient(${s.risk>=state.high?'#ff4e50':s.risk>=state.low?'#f5ad27':'#35ad64'} 0 ${s.risk}%,#edf1f4 ${s.risk}%)"><strong>${s.risk}</strong><span>/100</span></div></div><div><small>Ishonch darajasi</small><span class="metric-pill success">${s.confidence}</span></div><div><small>Ma’lumot sifati</small><span class="quality-pill">${s.quality}/100</span></div><div><small>Rasmiy ko‘rsatkich<br>(namoyish)</small><strong class="official-stat">${s.official}</strong><em>Aylanma hajmi</em></div></div><div class="detail-risk-type"><span>Asosiy xavf turi</span><strong>${s.riskType}</strong><button id="whyBtn">Nega?</button></div><div class="detail-factors"><h4>Asosiy omillar</h4><ol>${s.factors.map(x=>`<li>${x[0]}</li>`).join('')}</ol></div><div class="legal-note">${icon('i-info')}<span>Mazkur baho avtomatik tahlil natijasi bo‘lib, yakuniy huquqiy xulosa hisoblanmaydi.</span></div>`}

function regionsPage(){const m=activeContext();const ranked=[...regions].sort((a,b)=>contextForRegion(b).risk-contextForRegion(a).risk);return `${pageHead('Hududlar','14 ma’muriy hudud bo‘yicha analitik xavf, ma’lumot sifati va ogohlantirishlarni taqqoslash.')}${activeFiltersHtml()}
<div class="mini-card-grid region-summary"><div class="mini-card"><small>Faol hudud</small><strong style="font-size:13px">${state.region}</strong></div><div class="mini-card"><small>Subyektlar</small><strong>${fmt(m.count)}</strong><p>${state.region==='Barcha hududlar'?'O‘zbekiston kesimi':`Jami O‘zbekiston: ${fmt(NATIONAL_TOTAL)}`}</p></div><div class="mini-card"><small>Analitik xavf</small><strong class="${riskClass(m.risk)==='high'?'red-text':riskClass(m.risk)==='mid'?'amber-text':'green-text'}">${m.risk}/100</strong></div><div class="mini-card"><small>Ma’lumot sifati</small><strong>${m.quality}/100</strong></div></div>
<div class="page-grid" style="margin-top:10px"><section class="panel span-7"><div class="toolbar"><h2>Hududiy xarita</h2><button class="btn" id="resetRegion">Barcha hududlar</button></div><div class="network-stage" style="height:520px"><div id="liveMap"></div>${fallbackMap()}<div class="map-info" id="mapInfo">${state.region==='Barcha hududlar'?nationalInfoHtml():regionInfoHtml(regions.find(r=>r.name===state.region))}</div><div class="map-legend"><span><i class="lg-low"></i> Past (&lt;${state.low})</span><span><i class="lg-mid"></i> O‘rta</span><span><i class="lg-high"></i> Yuqori (≥${state.high})</span></div></div></section><section class="panel span-5"><h2>Hududlar reytingi</h2><div class="region-ranking">${ranked.map(r=>{const c=contextForRegion(r);return `<button class="region-row ${state.region===r.name?'selected':''}" data-region-row="${r.name}"><span>${r.name}</span><div class="progress"><i style="width:${c.risk}%;background:${c.risk>=state.high?'#ef5459':c.risk>=state.low?'#f2ad2c':'#35ad64'}"></i></div><b>${c.risk}/100</b>${badge(`${c.alerts} ta`,c.risk>=state.high?'red':c.risk>=state.low?'amber':'green')}</button>`}).join('')}</div></section></div>`}

function subjectsPage(){const list=dashboardSubjects();ensureSelectedSubject();return `${pageHead('Subyektlar','Subyektlarni xavf, ishonch, ma’lumot sifati, hudud va ekspert holati bo‘yicha tahlil qilish.',`<button class="btn" id="exportSubjects">${icon('i-download')} CSV eksport</button>`)}${activeFiltersHtml()}<div class="panel"><div class="toolbar"><div class="toolbar-left"><input class="select-btn" id="subjectSearch" placeholder="Subyekt bo‘yicha qidirish..." /><select class="select-btn" id="subjectRegion"><option>Barcha hududlar</option>${regions.map(r=>`<option ${state.region===r.name?'selected':''}>${r.name}</option>`).join('')}</select><select class="select-btn" id="subjectRisk"><option ${state.risk==='Barchasi'?'selected':''}>Barchasi</option><option ${state.risk==='Yuqori'?'selected':''}>Yuqori</option><option ${state.risk==='O‘rta'?'selected':''}>O‘rta</option><option ${state.risk==='Past'?'selected':''}>Past</option></select></div><div class="toolbar-right"><span class="muted" id="subjectCount">${list.length} ta namuna yozuv</span></div></div><div style="overflow:auto">${subjectTable(list,'fullSubjectTable')}</div></div><div class="page-grid" style="margin-top:10px"><section class="panel span-8" id="subjectDetailPage">${list.length?subjectDetailExtended(state.selected):'<div class="empty-state"><strong>Mos subyekt topilmadi</strong></div>'}</section><section class="panel span-4"><h2>Ekspert qarorlari tarixi</h2><div class="timeline" id="decisionTimeline">${list.length?decisionTimeline(state.selected.code):''}</div></section></div>`}
function subjectDetailExtended(s){return `<h2>${s.name} <span class="badge blue">${s.code}</span></h2><div class="mini-card-grid"><div class="mini-card"><small>Xavf bahosi</small><strong class="${riskClass(s.risk)==='high'?'red-text':riskClass(s.risk)==='mid'?'amber-text':'green-text'}">${s.risk}/100</strong></div><div class="mini-card"><small>Ishonch darajasi</small><strong>${s.confidence}</strong></div><div class="mini-card"><small>Ma’lumot sifati</small><strong>${s.quality}/100</strong></div><div class="mini-card"><small>Xavf turi</small><strong style="font-size:12px">${s.riskType}</strong></div></div><div class="page-grid" style="margin-top:12px"><div class="span-7"><h3>Vaqt bo‘yicha ko‘rsatkich</h3>${trendSvg()}</div><div class="span-5"><h3>Asosiy omillar</h3>${s.factors.map((f,i)=>`<div class="driver"><header><b>${i+1}. ${f[0]}</b><span>${f[3]}</span></header><div class="driver-grid"><p><small>Joriy</small><strong>${f[1]}</strong></p><p><small>Bazaviy</small><strong>${f[2]}</strong></p><p><small>Holat</small><strong class="amber-text">Sezilarli</strong></p></div></div>`).join('')}<button class="btn primary" id="subjectWhy">Nega?</button></div></div><div class="legal-note" style="font-size:9px">${icon('i-info')}<span>Sun’iy intellekt izohi faqat oldindan hisoblangan tahliliy natijalarni tushunarli matnga aylantiradi; u xavf ballini mustaqil yaratmaydi.</span></div>`}
function decisionTimeline(code){const saved=JSON.parse(localStorage.getItem('rasadDecisions')||'[]').filter(x=>x.subject===code);if(!saved.length)return `<div class="empty-state"><strong>Qarorlar hali yo‘q</strong><span>Ekspert qarori “Nega?” oynasidan kiritiladi.</span></div>`;return saved.slice().reverse().map(d=>`<div class="timeline-item"><strong>${d.decision}</strong><small>${d.time} · ${d.user}</small><p>${esc(d.comment||'Izohsiz')}</p></div>`).join('')}

function analysisPage(){const taxonomy=[['R01','Faoliyat dinamikasi','Subyekt ko‘rsatkichlaridagi keskin o‘zgarish'],['R02','Sohaviy og‘ish','O‘xshash subyektlardan sezilarli farq'],['R03','Hududiy og‘ish','Hududiy bazaviy qatorga nisbatan og‘ish'],['R04','Operatsion noodatiylik','Operatsiyalar soni yoki hajmidagi noodatiylik'],['R05','Aloqadorlik xavfi','Yuqori xavfli tugunlar bilan aloqalar'],['R06','Ma’lumotlar ziddiyati','Turli manbalardagi mos kelmaslik'],['R07','Davriy xavf','Mavsumiy qonuniyatdan og‘ish'],['R08','Kompleks xavf','Bir nechta signal bir vaqtda kuzatilishi']];return `${pageHead('Tahlillar','RASAD Risk Engine: ma’lumot sifati, ko‘p modelli tahlil, kalibrlash va tushuntiriladigan natija.')}
<div class="page-grid"><section class="panel span-12"><h2>RASAD Risk Engine</h2><div class="mini-card-grid">${['Ma’lumot sifati','Subyektni moslashtirish','Tahliliy belgilar','Ko‘p modelli tahlil','Kalibrlash','Xavf bahosi','Ishonch darajasi','Ekspert qarori'].map((x,i)=>`<div class="mini-card"><small>${String(i+1).padStart(2,'0')}</small><strong style="font-size:12px">${x}</strong></div>`).join('')}</div></section><section class="panel span-7"><h2>Xavf turlari</h2><table class="data-table"><thead><tr><th>Kod</th><th>Nomi</th><th>Ta’rif</th></tr></thead><tbody>${taxonomy.map(x=>`<tr><td>${badge(x[0],'blue')}</td><td><b>${x[1]}</b></td><td>${x[2]}</td></tr>`).join('')}</tbody></table></section><section class="panel span-5"><h2>Model holati</h2><div class="quality-grid">${[['Ma’lumot sifati',87],['Model ishonchi',91],['Ekspert mosligi',84],['Drift barqarorligi',93],['Noodatiylik sifati',86],['Izohlash qamrovi',96]].map(([n,v])=>`<div class="quality-card"><header><span>${n}</span><b>${v}</b></header><div class="progress"><i style="width:${v}%"></i></div></div>`).join('')}</div><div class="ai-note">${icon('i-info')}<p>Bu ko‘rsatkichlar namoyish uchun sintetik. Haqiqiy aniqlik faqat tasdiqlangan ma’lumotlar to‘plamida baholanadi.</p></div></section></div>`}

function networkPage(){return `${pageHead('Aloqadorliklar','Subyektlar o‘rtasidagi ma’lum aloqalarni graf ko‘rinishida tahlil qilish.',`<button class="btn" id="networkReset">Ko‘rinishni tiklash</button>`) }<div class="page-grid"><section class="panel span-8"><div class="toolbar"><h2>Aloqadorlik grafigi</h2><div class="toolbar-right"><select class="select-btn" id="edgeFilter"><option>Barcha aloqalar</option><option>Yuqori xavfli yo‘l</option><option>Faqat bevosita</option></select></div></div>${networkSvg()}</section><section class="panel span-4"><h2>Tanlangan tugun</h2><div id="nodeInfo">${subjectDetailMini(subjects[0])}</div><h3 style="margin-top:18px">Graf izohi</h3><p>Qizil chiziqlar yuqori xavfli aloqalarni, ko‘k chiziqlar odatiy ma’lum aloqalarni bildiradi. Bog‘lanishning o‘zi qoidabuzarlikni anglatmaydi.</p></section></div>`}
function networkSvg(){const nodes=[['SUB-000125',310,220,'high'],['SUB-000982',150,115,'mid'],['SUB-001420',470,100,'high'],['SUB-001103',135,350,'mid'],['SUB-001887',490,355,'low'],['SUB-002102',305,70,'low'],['SUB-002331',315,390,'mid']];const edges=[[0,1,1],[0,2,1],[0,3,0],[0,4,0],[0,5,0],[0,6,1],[1,5,0],[2,5,0],[3,6,0],[4,6,0]];return `<div class="network-stage"><svg class="network-svg" viewBox="0 0 620 460">${edges.map(([a,b,r])=>`<line class="network-edge ${r?'risky':''}" x1="${nodes[a][1]}" y1="${nodes[a][2]}" x2="${nodes[b][1]}" y2="${nodes[b][2]}"/>`).join('')}${nodes.map(([id,x,y,c])=>`<g class="network-node node-${c}" data-node="${id}" transform="translate(${x},${y})"><circle r="30"/><text y="52">${id}</text></g>`).join('')}</svg></div>`}
function subjectDetailMini(s){return `<div class="mini-card"><small>${s.code}</small><strong style="font-size:13px">${s.name}</strong><p>${s.region} · ${s.sector}</p><div style="display:flex;gap:6px;flex-wrap:wrap">${badge(`${s.risk}/100`,riskClass(s.risk)==='high'?'red':riskClass(s.risk)==='mid'?'amber':'green')}${badge(s.confidence,'blue')}${badge(`${s.quality}/100 sifat`,'gray')}</div><button class="btn primary" data-open-subject="${s.code}" style="margin-top:10px">Subyektni ochish</button></div>`}

function alertsPage(){const list=filteredAlerts();return `${pageHead('Ogohlantirishlar','Yangi xavf signallarini ko‘rib chiqish, mas’ulga biriktirish va holatini boshqarish.',`<button class="btn primary" id="markAllRead">Barchasini ko‘rildi deb belgilash</button>`)}${activeFiltersHtml()}<div class="panel"><div class="toolbar"><div class="toolbar-left"><select class="select-btn" id="alertSeverity"><option>Barcha darajalar</option><option>Yuqori</option><option>O‘rta</option></select><span class="muted">${list.length} ta namoyish ogohlantirishi</span></div></div><table class="data-table"><thead><tr><th>ID</th><th>Daraja</th><th>Subyekt</th><th>Xavf turi</th><th>Hudud</th><th>Vaqt</th><th>Mas’ul</th><th>Holat</th><th></th></tr></thead><tbody>${list.map(a=>`<tr><td>${a.id}</td><td>${badge(a.severity,a.severity==='Yuqori'?'red':'amber')}</td><td><button class="text-link" data-open-subject="${a.subject}">${a.subject}</button></td><td>${a.type}</td><td>${a.region}</td><td>${a.time}</td><td>${a.assignee}</td><td>${badge(a.status,a.status==='Yangi'?'red':a.status.includes('Tekshir')?'amber':'blue')}</td><td><button class="btn" data-alert="${a.id}">Ko‘rib chiqish</button></td></tr>`).join('')}</tbody></table></div>`}

function reportsPage(){return `${pageHead('Hisobotlar','Subyekt, hudud, tarmoq, xavf turi va davr bo‘yicha izohli hisobotlarni shakllantirish.',`<button class="btn primary" id="newReport">Yangi hisobot</button>`)}${activeFiltersHtml()}<div class="report-context">Hisobotlar joriy faol filtrlarni saqlaydi: <b>${esc(state.region)}</b> · <b>${esc(state.sector)}</b> · <b>${esc(state.period)}</b></div><div class="mini-card-grid">${[['Subyekt hisoboti','Bitta subyekt bo‘yicha to‘liq xavf va izoh'],['Hududiy hisobot','Hudud bo‘yicha xavf taqsimoti va ustuvor holatlar'],['Tarmoq hisoboti','Faoliyat yo‘nalishi bo‘yicha taqqoslash'],['Davriy hisobot','Vaqt bo‘yicha dinamik o‘zgarishlar']].map(([n,d])=>`<div class="mini-card"><small>Hisobot turi</small><strong style="font-size:13px">${n}</strong><p>${d}</p><button class="btn report-generate" data-report="${n}">${icon('i-file')} Yaratish</button></div>`).join('')}</div><div class="panel" style="margin-top:10px"><h2>So‘nggi hisobotlar</h2><table class="data-table"><thead><tr><th>Hisobot ID</th><th>Turi</th><th>Hudud</th><th>Davr</th><th>Model</th><th>Ma’lumot versiyasi</th><th>Yaratgan</th><th>Amal</th></tr></thead><tbody><tr><td>RPT-2024-118</td><td>Hududiy hisobot</td><td>${state.region}</td><td>${state.period}</td><td>RASAD v2.1</td><td>demo-v5</td><td>Akmal Dadaboyev</td><td><button class="btn" id="downloadSample">${icon('i-download')} Yuklab olish</button></td></tr></tbody></table></div>`}

function sourcesPage(){return `${pageHead('Ma’lumot manbalari','Ma’lumotlarni yuklash, tekshirish, sifatini baholash va yangilanish holatini boshqarish.',`<button class="btn primary" id="importData">${icon('i-upload')} Ma’lumot yuklash</button>`) }<div class="page-grid"><section class="panel span-8"><h2>Ulangan manbalar</h2><table class="data-table"><thead><tr><th>Nomi</th><th>Turi</th><th>Holat</th><th>Yangilanish</th><th>Qatorlar</th><th>Rad etilgan</th><th>Sifat</th><th>Xato</th></tr></thead><tbody>${sources.map(s=>`<tr><td><b>${s.name}</b></td><td>${s.type}</td><td>${badge(s.status,s.status==='Faol'?'green':'amber')}</td><td>${s.updated}</td><td>${fmt(s.rows)}</td><td>${s.rejected}</td><td><b>${s.quality}/100</b></td><td>${s.error}</td></tr>`).join('')}</tbody></table></section><section class="panel span-4"><h2>Ma’lumot sifati</h2><div class="quality-grid">${[['To‘liqlik',94],['To‘g‘rilik',89],['Yagonalik',97],['Muvofiqlik',84],['Dolzarblik',86],['Mantiqiy to‘g‘rilik',91]].map(([n,v])=>`<div class="quality-card"><header><span>${n}</span><b>${v}</b></header><div class="progress"><i style="width:${v}%"></i></div></div>`).join('')}</div><div class="ai-note">${icon('i-info')}<p>Ma’lumot sifati past bo‘lsa, tizim natija ishonchliligini alohida pasaytirib ko‘rsatadi.</p></div></section></div>`}

function modelsPage(){return `${pageHead('Modellar','Model versiyalari, tasdiqlash holati, sifat ko‘rsatkichlari va og‘ishni kuzatish.',`<button class="btn" id="modelMonitor">Monitoring</button>`) }<div class="panel"><table class="data-table"><thead><tr><th>Model</th><th>Versiya</th><th>Algoritm</th><th>Holat</th><th>Tekshiruv sanasi</th><th>Sifat</th><th>Og‘ish</th><th>Tasdiqlagan</th><th></th></tr></thead><tbody>${models.map((m,i)=>`<tr><td><b>${m.name}</b></td><td>${m.version}</td><td>${m.algorithm}</td><td>${badge(m.status,m.status==='Faol'?'green':m.status==='Tasdiqlangan'?'blue':m.status==='Sinovda'?'amber':'gray')}</td><td>${m.date}</td><td>${m.quality}</td><td>${badge(m.drift,m.drift==='Barqaror'?'green':m.drift==='Kuzatuv'?'amber':'gray')}</td><td>${m.approved}</td><td>${m.status==='Tasdiqlangan'?`<button class="btn activate-model" data-model="${i}">Faollashtirish</button>`:''}</td></tr>`).join('')}</tbody></table></div><div class="page-grid" style="margin-top:10px"><section class="panel span-6"><h2>Model og‘ishini kuzatish</h2>${trendSvg()}</section><section class="panel span-6"><h2>Sifat ko‘rsatkichlari</h2><div class="quality-grid">${[['Natija barqarorligi',93],['Ekspert mosligi',84],['Ishonch kalibrovkasi',90],['Noodatiylik sifati',86],['Izohlash qamrovi',96],['Ma’lumot qamrovi',88]].map(([n,v])=>`<div class="quality-card"><header><span>${n}</span><b>${v}</b></header><div class="progress"><i style="width:${v}%"></i></div></div>`).join('')}</div></section></div>`}

function auditPage(){return `${pageHead('Audit','Foydalanuvchi, model va tizim amallarining o‘zgartirilmaydigan tarixini ko‘rish.',`<button class="btn" id="exportAudit">${icon('i-download')} Eksport</button>`) }<div class="panel"><table class="data-table"><thead><tr><th>Vaqt</th><th>Foydalanuvchi</th><th>Amal</th><th>Obyekt</th><th>Oldingi</th><th>Yangi</th><th>IP</th></tr></thead><tbody>${audit.map(a=>`<tr><td>${a.time}</td><td>${a.user}</td><td>${a.action}</td><td>${a.object}</td><td>${a.old}</td><td>${a.next}</td><td>${a.ip}</td></tr>`).join('')}</tbody></table></div>`}

function usersPage(){return `${pageHead('Foydalanuvchilar','Rol va vakolatlar asosida tizimga kirishni boshqarish.',`<button class="btn primary" id="addUser">Yangi foydalanuvchi</button>`) }<div class="page-grid"><section class="panel span-8"><table class="data-table"><thead><tr><th>F.I.Sh.</th><th>Rol</th><th>Bo‘linma</th><th>Holat</th><th>Amal</th></tr></thead><tbody>${users.map(u=>`<tr><td><b>${u.name}</b></td><td>${badge(u.role,u.role==='Administrator'?'blue':u.role==='Auditor'?'gray':'green')}</td><td>${u.unit}</td><td>${badge(u.status,'green')}</td><td><button class="btn">Tahrirlash</button></td></tr>`).join('')}</tbody></table></section><section class="panel span-4"><h2>Rol simulyatsiyasi</h2><p>Demo davomida turli rollardagi ko‘rinishni tekshiring.</p><div class="role-selector">${['Administrator','Tahlilchi','Rahbar','Auditor'].map(r=>`<button data-role="${r}" class="${state.role===r?'active':''}">${r}</button>`).join('')}</div></section></div>`}

function settingsPage(){return `${pageHead('Sozlamalar','Xavf chegaralari va namoyish tizimi parametrlarini boshqarish.')}
<div class="page-grid"><section class="panel span-7"><h2>Xavf chegaralari</h2><p>MVPdagi chegaralar shartli va sozlanadigan. Haqiqiy sanoat tizimida ular tasdiqlangan ma’lumotlar asosida kalibrlanadi.</p><div class="setting-row"><label>O‘rta xavf boshlanishi</label><input type="range" min="20" max="60" value="${state.low}" id="lowThreshold"><output id="lowOut">${state.low}</output></div><div class="setting-row"><label>Yuqori xavf boshlanishi</label><input type="range" min="50" max="90" value="${state.high}" id="highThreshold"><output id="highOut">${state.high}</output></div><button class="btn primary" id="saveThresholds">Saqlash</button></section><section class="panel span-5"><h2>Semantik talqin</h2><div class="mini-card">${badge(`Past: 0–${state.low-1}`,'green')} ${badge(`O‘rta: ${state.low}–${state.high-1}`,'amber')} ${badge(`Yuqori: ${state.high}–100`,'red')}<p style="margin-top:10px">Xavf darajasi rang bilan birga matn va belgi orqali ham ifodalanadi.</p></div><h3 style="margin-top:16px">Namoyish rejimi</h3><p>Barcha ma’lumotlar sintetik. Real tashkilot, STIR yoki shaxsiy ma’lumotlar ishlatilmaydi.</p></section></div>`}

function renderPage(){
  const map={'Bosh sahifa':dashboard,'Hududlar':regionsPage,'Subyektlar':subjectsPage,'Tahlillar':analysisPage,'Aloqadorliklar':networkPage,'Ogohlantirishlar':alertsPage,'Hisobotlar':reportsPage,'Ma’lumot manbalari':sourcesPage,'Modellar':modelsPage,'Audit':auditPage,'Foydalanuvchilar':usersPage,'Sozlamalar':settingsPage};
  $('#appContent').innerHTML=(map[state.page]||dashboard)();
  if($('#periodLabel'))$('#periodLabel').textContent=state.period;
  bindPageEvents();
  if(['Bosh sahifa','Hududlar'].includes(state.page)) setTimeout(initLiveMap,0);
}

function bindPageEvents(){
  $$('[data-go]').forEach(b=>b.onclick=()=>navigate(b.dataset.go));
  $$('[data-open-subject]').forEach(b=>b.onclick=()=>openSubjectByCode(b.dataset.openSubject));
  $$('tr[data-subject]').forEach(r=>r.onclick=e=>{if(e.target.closest('button'))return;selectSubject(r.dataset.subject)});
  if($('#whyBtn'))$('#whyBtn').onclick=openWhy;
  if($('#subjectWhy'))$('#subjectWhy').onclick=openWhy;
  if($('#filterBtn'))$('#filterBtn').onclick=()=>$('#filterPanel').classList.toggle('open');
  if($('#applyFilters'))$('#applyFilters').onclick=applyDashboardFilters;
  if($('#regionBtn'))$('#regionBtn').onclick=()=>openPicker('Hududni tanlang',['Barcha hududlar',...regions.map(r=>r.name)],v=>setRegionFilter(v,'Tanlash oynasi'));
  if($('#sectorBtn'))$('#sectorBtn').onclick=()=>openPicker('Tarmoqni tanlang',['Barcha tarmoqlar',...sectorOptions],v=>{state.sector=v;ensureSelectedSubject();renderPage();showToast(`${v} filtri qo‘llandi.`,'success')});
  if($('#resetRegion'))$('#resetRegion').onclick=()=>setRegionFilter('Barcha hududlar','Hududlar sahifasi');
  if($('#periodFilterBtn'))$('#periodFilterBtn').onclick=()=>openPicker('Davrni tanlang',periodOptions,v=>{state.period=v;localStorage.setItem('rasadPeriod',v);if($('#periodLabel'))$('#periodLabel').textContent=v;ensureSelectedSubject();renderPage();showToast('Davr filtri yangilandi.','success')});
  $$('.region-row').forEach(row=>row.onclick=()=>setRegionFilter(row.dataset.regionRow,'Hududlar reytingi'));
  $$('[data-clear-filter]').forEach(b=>b.onclick=()=>{const k=b.dataset.clearFilter;if(k==='region')state.region='Barcha hududlar';if(k==='sector')state.sector='Barcha tarmoqlar';if(k==='risk')state.risk='Barchasi';if(k==='expert')state.expert='Barchasi';if(k==='quality')state.quality='Cheklanmagan';if(k==='period'){state.period='2024-yil, yanvar – dekabr';localStorage.setItem('rasadPeriod',state.period)}ensureSelectedSubject();renderPage()});
  if($('#clearAllFilters'))$('#clearAllFilters').onclick=clearAllFilters;

  if($('#exportSubjects'))$('#exportSubjects').onclick=()=>downloadCSV('rasad_subyektlar.csv',dashboardSubjects(),['code','name','region','sector','risk','confidence','quality','state']);
  if($('#subjectSearch'))$('#subjectSearch').oninput=filterFullSubjects;
  if($('#subjectRegion'))$('#subjectRegion').onchange=e=>setRegionFilter(e.target.value,'Subyektlar filtri');
  if($('#subjectRisk'))$('#subjectRisk').onchange=e=>{state.risk=e.target.value;ensureSelectedSubject();renderPage();showToast('Xavf filtri yangilandi.','success')};
  if($('#networkReset'))$('#networkReset').onclick=()=>showToast('Graf ko‘rinishi tiklandi.');
  $$('.network-node').forEach(n=>n.onclick=()=>{const s=subjects.find(x=>x.code===n.dataset.node);if(s)$('#nodeInfo').innerHTML=subjectDetailMini(s);bindPageEvents()});
  if($('#markAllRead'))$('#markAllRead').onclick=()=>{setNotificationCount(0);showToast('Ogohlantirishlar ko‘rildi deb belgilandi.','success')};
  $$('[data-alert]').forEach(b=>b.onclick=()=>showToast(`${b.dataset.alert} ko‘rib chiqish uchun ochildi.`));
  $$('.report-generate').forEach(b=>b.onclick=()=>generateReport(b.dataset.report));
  if($('#downloadSample'))$('#downloadSample').onclick=()=>downloadText('RASAD_RPT-2024-118.txt',sampleReport());
  if($('#newReport'))$('#newReport').onclick=()=>openPicker('Hisobot turini tanlang',['Subyekt hisoboti','Hududiy hisobot','Tarmoq hisoboti','Davriy hisobot'],generateReport);
  if($('#importData'))$('#importData').onclick=openImportWizard;
  $$('.activate-model').forEach(b=>b.onclick=()=>activateModel(Number(b.dataset.model)));
  if($('#exportAudit'))$('#exportAudit').onclick=()=>downloadCSV('rasad_audit.csv',audit,['time','user','action','object','old','next','ip']);
  $$('[data-role]').forEach(b=>b.onclick=()=>{state.role=b.dataset.role;localStorage.setItem('rasadRole',state.role);$('#roleLabel').textContent=roleUz(state.role);renderPage();showToast(`${state.role} roli faollashtirildi.`,'success')});
  if($('#lowThreshold')){$('#lowThreshold').oninput=e=>$('#lowOut').value=e.target.value;$('#highThreshold').oninput=e=>$('#highOut').value=e.target.value;$('#saveThresholds').onclick=()=>{const l=Number($('#lowThreshold').value),h=Number($('#highThreshold').value);if(l>=h)return showToast('Past chegara yuqori chegaradan kichik bo‘lishi kerak.','error');state.low=l;state.high=h;localStorage.setItem('rasadLow',l);localStorage.setItem('rasadHigh',h);renderPage();showToast('Xavf chegaralari saqlandi.','success')}}
}

function roleUz(r){return {'Administrator':'Tizim ma’muri','Tahlilchi':'Tahlilchi','Rahbar':'Rahbar','Auditor':'Auditor'}[r]||r}
function applyDashboardFilters(){state.risk=$('#riskFilter').value;state.expert=$('#expertFilter').value;state.quality=$('#qualityFilter').value;ensureSelectedSubject();showToast('Filtrlar qo‘llandi.','success');renderPage()}
function filterFullSubjects(){let q=($('#subjectSearch')?.value||'').toLowerCase(),r=state.region,risk=state.risk;let list=subjects.filter(s=>(!q||`${s.code} ${s.name} ${s.region} ${s.sector}`.toLowerCase().includes(q))&&(r==='Barcha hududlar'||s.region===r)&&(risk==='Barchasi'||riskLabel(s.risk)===risk));$('#fullSubjectTable tbody').innerHTML=subjectTable(list,'tmp').match(/<tbody>([\s\S]*)<\/tbody>/)[1];$('#subjectCount').textContent=`${list.length} ta yozuv`;$$('#fullSubjectTable tr[data-subject]').forEach(x=>x.onclick=()=>selectSubject(x.dataset.subject))}
function selectSubject(code){const s=subjects.find(x=>x.code===code);if(!s)return;state.selected=s;if(state.page==='Subyektlar'){renderPage()}else if(state.page==='Bosh sahifa'){renderPage()}else{openSubjectByCode(code)}}
function openSubjectByCode(code){const s=subjects.find(x=>x.code===code);if(s){state.selected=s;navigate('Subyektlar')}}

function openWhy(){const s=state.selected;$('#whyDrawer').innerHTML=`<div class="drawer-head"><div><span class="eyebrow">RASAD izohi</span><h3>Xavf bahosi nima sababdan shakllandi?</h3></div><button class="close-btn" id="closeDrawer">×</button></div><div class="drawer-summary"><div class="risk-ring" style="width:78px;height:78px;background:conic-gradient(${s.risk>=state.high?'#ff4e50':s.risk>=state.low?'#f5ad27':'#35ad64'} 0 ${s.risk}%,#edf1f4 ${s.risk}%)"><strong>${s.risk}</strong><span>/100</span></div><div><p><b>${s.name}</b></p><p class="muted">Ishonch: <b>${s.confidence}</b> · Ma’lumot sifati: <b>${s.quality}/100</b></p></div></div>${s.factors.map((f,i)=>`<div class="driver"><header><b>${i+1}. ${f[0]}</b><span>${f[3]}</span></header><div class="driver-grid"><p><small>Joriy</small><strong>${f[1]}</strong></p><p><small>Bazaviy</small><strong>${f[2]}</strong></p><p><small>Manba</small><strong>demo-v4</strong></p></div><div class="driver-bar ${i?'amber':''}"><i style="width:${Math.max(35,82-i*15)}%"></i></div></div>`).join('')}<div class="ai-note">${icon('i-info')}<p>Sun’iy intellekt izohi hisoblangan tahliliy natijalar asosida shakllantirilgan. U xavf ballini mustaqil ravishda yaratmaydi yoki o‘zgartirmaydi.</p></div><div class="expert-actions"><h4>Ekspert qarori</h4><div class="expert-grid">${['Tasdiqlandi','Rad etildi','Qo‘shimcha ma’lumot kerak','Tekshiruvga yuborildi'].map(x=>`<button data-decision="${x}">${x}</button>`).join('')}</div><textarea id="decisionComment" placeholder="Qaror izohini kiriting..."></textarea><button class="save-decision" id="saveDecision">Qarorni saqlash</button></div>`;$('#drawerBackdrop').classList.add('open');$('#whyDrawer').classList.add('open');$('#whyDrawer').setAttribute('aria-hidden','false');let chosen='';$$('[data-decision]',$('#whyDrawer')).forEach(b=>b.onclick=()=>{$$('[data-decision]',$('#whyDrawer')).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');chosen=b.dataset.decision});$('#closeDrawer').onclick=closeDrawer;$('#saveDecision').onclick=()=>{if(!chosen)return showToast('Ekspert qarorini tanlang.','error');const comment=$('#decisionComment').value.trim();if(!comment)return showToast('Qaror uchun qisqa izoh kiriting.','error');const list=JSON.parse(localStorage.getItem('rasadDecisions')||'[]');list.push({subject:s.code,decision:chosen,comment,user:'Akmal Dadaboyev',time:new Date().toLocaleString('uz-UZ')});localStorage.setItem('rasadDecisions',JSON.stringify(list));s.state=chosen;logAction('Ekspert qarori',s.code,'Ko‘rib chiqilmoqda',chosen);closeDrawer();showToast('Ekspert qarori saqlandi.','success');if(state.page==='Subyektlar'||state.page==='Bosh sahifa')renderPage()}}
function closeDrawer(){$('#drawerBackdrop').classList.remove('open');$('#whyDrawer').classList.remove('open');$('#whyDrawer').setAttribute('aria-hidden','true')}

function openPicker(title,items,onPick){openModal(title,`<div class="role-selector">${items.map(x=>`<button data-pick="${esc(x)}">${esc(x)}</button>`).join('')}</div>`,`<button class="btn" id="modalCancel">Bekor qilish</button>`);$$('[data-pick]',$('#modal')).forEach(b=>b.onclick=()=>{closeModal();onPick(b.dataset.pick)});$('#modalCancel').onclick=closeModal}
function openModal(title,body,footer=''){const m=$('#modal');m.innerHTML=`<div class="modal-header"><h3>${title}</h3><button class="close-btn" id="modalClose">×</button></div><div class="modal-body">${body}</div>${footer?`<div class="modal-footer">${footer}</div>`:''}`;$('#modalBackdrop').classList.add('open');m.classList.add('open');m.setAttribute('aria-hidden','false');$('#modalClose').onclick=closeModal}
function closeModal(){$('#modalBackdrop').classList.remove('open');$('#modal').classList.remove('open');$('#modal').setAttribute('aria-hidden','true')}

function openImportWizard(){let step=0,file=null;const steps=['Fayl tanlash','Tuzilmani tekshirish','Ustunlarni moslashtirish','Sifat nazorati','Takroriy yozuvlar','Tasdiqlash','Natija'];function render(){const bodies=[`<div class="drop-zone" id="dropZone"><strong>CSV, XLSX yoki JSON faylni tanlang</strong><small>Namoyish rejimida fayl nomi va hajmi tekshiriladi.</small><input type="file" id="fileInput" accept=".csv,.xlsx,.json" hidden /></div><p id="fileMeta" class="muted"></p>`,`<h3>Tuzilma tekshiruvi</h3><table class="data-table"><tr><td>Format</td><td>${file?.name?.split('.').pop()?.toUpperCase()||'CSV'}</td><td>${badge('Mos','green')}</td></tr><tr><td>Kodlash</td><td>UTF-8</td><td>${badge('Mos','green')}</td></tr><tr><td>Majburiy ustunlar</td><td>8/8</td><td>${badge('Topildi','green')}</td></tr></table>`,`<h3>Ustunlarni moslashtirish</h3><table class="data-table"><thead><tr><th>Fayl ustuni</th><th>RASAD maydoni</th><th>Holat</th></tr></thead><tbody>${[['subject_id','Ichki kod'],['region','Hudud'],['sector','Faoliyat turi'],['value','Ko‘rsatkich'],['period','Davr']].map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>${badge('Moslangan','green')}</td></tr>`).join('')}</tbody></table>`,`<h3>Ma’lumot sifati</h3><div class="quality-grid">${[['To‘liqlik',94],['To‘g‘rilik',91],['Yagonalik',97],['Muvofiqlik',88],['Dolzarblik',93],['Mantiqiy to‘g‘rilik',90]].map(([n,v])=>`<div class="quality-card"><header><span>${n}</span><b>${v}</b></header><div class="progress"><i style="width:${v}%"></i></div></div>`).join('')}</div>`,`<h3>Takroriy yozuvlarni aniqlash</h3><div class="mini-card-grid"><div class="mini-card"><small>Jami yozuv</small><strong>5 000</strong></div><div class="mini-card"><small>Takroriy</small><strong>23</strong></div><div class="mini-card"><small>Rad etiladi</small><strong>17</strong></div><div class="mini-card"><small>Qabul qilinadi</small><strong>4 960</strong></div></div>`,`<h3>Importni tasdiqlash</h3><p>4 960 ta yozuv tahliliy qatlamga yuboriladi. 23 ta takroriy yozuv birlashtiriladi, 17 ta qator validatsiya sababli rad etiladi.</p><div class="ai-note">${icon('i-info')}<p>Import amali audit jurnalida qayd etiladi.</p></div>`,`<div class="empty-state">${icon('i-check')}<strong>Import muvaffaqiyatli yakunlandi</strong><span>4 960 ta yozuv qabul qilindi.</span></div>`];openModal(`Ma’lumot yuklash · ${step+1}/7`,`<div class="wizard-steps">${steps.map((_,i)=>`<i class="wizard-step ${i<step?'done':i===step?'active':''}"></i>`).join('')}</div>${bodies[step]}`,`<button class="btn" id="wizBack" ${step===0?'disabled':''}>Orqaga</button>${step<6?`<button class="btn primary" id="wizNext">${step===5?'Import qilish':'Davom etish'}</button>`:`<button class="btn primary" id="wizDone">Yakunlash</button>`}`);if(step===0){$('#dropZone').onclick=()=>$('#fileInput').click();$('#fileInput').onchange=e=>{file=e.target.files[0];$('#fileMeta').textContent=file?`${file.name} · ${(file.size/1024).toFixed(1)} KB`:''}}if($('#wizBack'))$('#wizBack').onclick=()=>{step=Math.max(0,step-1);render()};if($('#wizNext'))$('#wizNext').onclick=()=>{if(step===0&&!file)return showToast('Avval fayl tanlang.','error');step++;render()};if($('#wizDone'))$('#wizDone').onclick=()=>{closeModal();logAction('Ma’lumot importi',file?.name||'demo.csv','0','4960 yozuv');showToast('Ma’lumotlar import qilindi.','success')}}render()}

function generateReport(type){showToast(`${type} shakllantirilmoqda...`);setTimeout(()=>{downloadText(`RASAD_${type.replaceAll(' ','_')}.txt`,`${type}\nRASAD namoyish hisoboti\nHudud: ${state.region}\nTarmoq: ${state.sector}\nDavr: ${state.period}\nXavf filtri: ${state.risk}\nModel: RASAD v2.1\nMa’lumot: sintetik\n\nMazkur hisobot namoyish maqsadida yaratilgan.`);logAction('Hisobot yaratildi',type,'—','Tayyor');showToast('Hisobot tayyorlandi.','success')},700)}
function sampleReport(){return `RASAD — Hududiy hisobot\nHisobot ID: RPT-2024-118\nHudud: ${state.region}\nTarmoq: ${state.sector}\nDavr: ${state.period}\nModel: RASAD v2.1\nMa’lumot versiyasi: demo-v5\n\nBu fayl namoyish ma’lumotlari asosida avtomatik shakllantirilgan.`}
function activateModel(i){if(models[i].status!=='Tasdiqlangan')return;models.forEach(m=>{if(m.status==='Faol')m.status='Tasdiqlangan'});models[i].status='Faol';logAction('Model faollashtirildi',`${models[i].name} v${models[i].version}`,'Tasdiqlangan','Faol');renderPage();showToast('Tasdiqlangan model faol qilindi.','success')}
function logAction(action,object,old='—',next='—'){audit.unshift({time:new Date().toLocaleTimeString('uz-UZ'),user:'Akmal Dadaboyev',action,object,old,next,ip:'demo-session'})}

function downloadText(name,text){const b=new Blob([text],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function downloadCSV(name,data,fields){const rows=[fields.join(','),...data.map(r=>fields.map(f=>`"${String(r[f]??'').replaceAll('"','""')}"`).join(','))];downloadText(name,'\ufeff'+rows.join('\n'))}

function showToast(msg,type=''){const t=$('#toast');t.textContent=msg;t.className=`toast show ${type}`;clearTimeout(showToast.t);showToast.t=setTimeout(()=>t.className='toast',2600)}
function setNotificationCount(n){$('#notificationCount').textContent=n;const badgeEl=$('.nav-item[data-page="Ogohlantirishlar"] .nav-badge');if(badgeEl)badgeEl.textContent=n}

function initGlobal(){
  initNav();renderPage();
  $('#mobileMenu').onclick=()=>$('#sidebar').classList.toggle('open');
  $('#drawerBackdrop').onclick=closeDrawer;$('#modalBackdrop').onclick=closeModal;
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#globalSearch').focus()}if(e.key==='Escape'){closeDrawer();closeModal();$('.popover.open')?.classList.remove('open')}});
  $('#globalSearch').oninput=globalSearch;$('#globalSearch').onfocus=globalSearch;document.addEventListener('click',e=>{if(!e.target.closest('.search-box'))$('#searchResults').classList.remove('open')});
  $('#notifyBtn').onclick=e=>{e.stopPropagation();toggleNotifications()};
  $('#profileBtn').onclick=e=>{e.stopPropagation();toggleProfile()};
  document.addEventListener('click',e=>{if(!e.target.closest('#notificationPopover')&&!e.target.closest('#notifyBtn'))$('#notificationPopover').classList.remove('open');if(!e.target.closest('#profilePopover')&&!e.target.closest('#profileBtn'))$('#profilePopover').classList.remove('open')});
  $('#periodBtn').onclick=()=>openPicker('Hisobot davrini tanlang',periodOptions,v=>{state.period=v;localStorage.setItem('rasadPeriod',v);$('#periodLabel').textContent=v;ensureSelectedSubject();renderPage();showToast('Hisobot davri va barcha bog‘liq tahlillar yangilandi.','success')});
}
function globalSearch(){const q=$('#globalSearch').value.trim().toLowerCase(),box=$('#searchResults');if(!q){box.classList.remove('open');return}const sHits=subjects.filter(s=>`${s.code} ${s.name} ${s.region} ${s.sector}`.toLowerCase().includes(q)).slice(0,6);const rHits=regions.filter(r=>r.name.toLowerCase().includes(q)).slice(0,3);box.innerHTML=[...sHits.map(s=>`<div class="search-hit" data-search-subject="${s.code}"><strong>${s.name}</strong>${badge(`${s.risk}/100`,riskClass(s.risk)==='high'?'red':riskClass(s.risk)==='mid'?'amber':'green')}<small>${s.code} · ${s.region} · ${s.sector}</small></div>`),...rHits.map(r=>`<div class="search-hit" data-search-region="${r.name}"><strong>${r.name}</strong>${badge(`${r.risk}/100`,'blue')}<small>Hudud · ${fmt(r.count)} subyekt</small></div>`)].join('')||`<div class="empty-state"><strong>Natija topilmadi</strong></div>`;box.classList.add('open');$$('[data-search-subject]',box).forEach(x=>x.onclick=()=>{box.classList.remove('open');openSubjectByCode(x.dataset.searchSubject)});$$('[data-search-region]',box).forEach(x=>x.onclick=()=>{state.region=x.dataset.searchRegion;box.classList.remove('open');navigate('Hududlar')})}
function toggleNotifications(){const p=$('#notificationPopover');p.innerHTML=`<div class="popover-title"><span>Ogohlantirishlar</span><button class="text-link" data-go="Ogohlantirishlar">Barchasi →</button></div>${alerts.slice(0,4).map(a=>`<div class="pop-item" data-pop-subject="${a.subject}"><strong>${a.subject} · ${a.type}</strong><small>${a.region} · ${a.time} · ${a.status}</small></div>`).join('')}`;p.classList.toggle('open');$('[data-go]',p).onclick=()=>{p.classList.remove('open');navigate('Ogohlantirishlar')};$$('[data-pop-subject]',p).forEach(x=>x.onclick=()=>{p.classList.remove('open');openSubjectByCode(x.dataset.popSubject)})}
function toggleProfile(){const p=$('#profilePopover');p.innerHTML=`<div class="popover-title"><span>Profil</span></div><div class="pop-item"><strong>Akmal Dadaboyev</strong><small>${roleUz(state.role)}</small></div><div class="pop-item" id="quickRole"><strong>Rolni almashtirish</strong><small>Demo uchun rol simulyatsiyasi</small></div><div class="pop-item" id="quickSettings"><strong>Sozlamalar</strong><small>Xavf chegaralari va parametrlar</small></div>`;p.classList.toggle('open');$('#quickRole').onclick=()=>{p.classList.remove('open');navigate('Foydalanuvchilar')};$('#quickSettings').onclick=()=>{p.classList.remove('open');navigate('Sozlamalar')}}

async function initLiveMap(){
  const holder=$('#liveMap');
  if(!holder)return;
  const fallback=$('#mapFallback');
  const retry=$('#retryMap');
  if(retry)retry.onclick=()=>initLiveMap();
  if(!window.L){
    fallback?.classList.add('show');
    return;
  }
  const normalize=s=>String(s||'').toLowerCase()
    .replace(/[ʻʼ’‘`´]/g,"'")
    .replace(/\bregion\b|\bprovince\b/g,'')
    .replace(/\s+/g,' ').trim();
  const byUz=new Map(regions.map(r=>[normalize(r.name),r]));
  const aliases=new Map([
    ['toshkent sh.', 'Toshkent shahri'],
    ['toshkent city','Toshkent shahri'],
    ['republic of karakalpakstan','Qoraqalpog‘iston Respublikasi'],
    ["qoraqalpog'iston respublikasi",'Qoraqalpog‘iston Respublikasi'],
    ['navoi','Navoiy viloyati'],['navoiy','Navoiy viloyati'],
    ['bukhara','Buxoro viloyati'],['khorezm','Xorazm viloyati'],
    ['samarkand','Samarqand viloyati'],['kashkadarya','Qashqadaryo viloyati'],
    ['surkhandarya','Surxondaryo viloyati'],['syrdarya','Sirdaryo viloyati'],
    ['jizzakh','Jizzax viloyati'],['andijan','Andijon viloyati'],
    ['fergana','Farg‘ona viloyati'],['namangan','Namangan viloyati'],
    ['tashkent','Toshkent viloyati']
  ]);
  const resolveRegion=props=>{
    const candidates=[props?.ADM1_UZ,props?.ADM1_EN,props?.name,props?.NAME_1].filter(Boolean);
    for(const raw of candidates){
      const n=normalize(raw);
      if(byUz.has(n))return byUz.get(n);
      const alias=aliases.get(n);
      if(alias){const r=regions.find(x=>x.name===alias);if(r)return r;}
      const r=regions.find(x=>normalize(x.name).includes(n)||n.includes(normalize(x.name).replace(' viloyati','')));
      if(r)return r;
    }
    return null;
  };
  try{
    if(holder.__rasadMap){try{holder.__rasadMap.remove()}catch(_e){}holder.__rasadMap=null}
    if(holder._leaflet_id) holder._leaflet_id=null;
    holder.innerHTML='';
    const map=L.map(holder,{zoomControl:true,attributionControl:false,scrollWheelZoom:false,doubleClickZoom:false,boxZoom:false,minZoom:4,maxZoom:8,zoomSnap:.25});
    holder.__rasadMap=map;
    let gj=window.RASAD_UZ_GEOJSON;
    if(!gj){
      const res=await fetch('https://raw.githubusercontent.com/akbartus/GeoJSON-Uzbekistan/main/geojson/uzbekistan_regional.geojson',{cache:'force-cache'});
      if(!res.ok)throw new Error(`GeoJSON HTTP ${res.status}`);
      gj=await res.json();
    }
    if(!gj?.features?.length)throw new Error('GeoJSON bo‘sh');
    const matched=new Set();
    const layer=L.geoJSON(gj,{
      style:f=>{
        const r=resolveRegion(f.properties);
        if(r)matched.add(r.name);
        const c=r?contextForRegion(r):{risk:0};const risk=c.risk;
        const selected=state.region!=='Barcha hududlar'&&r?.name===state.region;
        const dimmed=state.region!=='Barcha hududlar'&&!selected;
        return{color:selected?'#0b5fb5':'#fff',weight:selected?3.2:1.35,fillColor:risk>=state.high?'#ef575b':risk>=state.low?'#f4bd3d':'#48b86b',fillOpacity:selected?.98:(dimmed?.34:.90),opacity:dimmed?.62:1};
      },
      onEachFeature:(f,l)=>{
        const r=resolveRegion(f.properties);if(!r)return;
        const c=contextForRegion(r);l.bindTooltip(`<strong>${esc(r.name)}</strong><br>${fmt(c.count)} subyekt · Xavf ${c.risk}/100`,{sticky:true,direction:'top',className:'rasad-map-tooltip'});
        l.on({
          mouseover:e=>{e.target.setStyle({weight:2.4,color:'#176fc4'});$('#mapInfo').innerHTML=regionInfoHtml(r)},
          mouseout:e=>{layer.resetStyle(e.target);const current=state.region==='Barcha hududlar'?null:regions.find(x=>x.name===state.region);$('#mapInfo').innerHTML=current?regionInfoHtml(current):nationalInfoHtml()},
          click:e=>{e.originalEvent?.preventDefault?.();setRegionFilter(r.name,'Xarita')}
        });
      }
    }).addTo(map);
    if(matched.size!==14) console.warn(`RASAD map: ${matched.size}/14 hudud moslandi`,[...matched]);
    const bounds=layer.getBounds();
    if(bounds.isValid())map.fitBounds(bounds,{padding:[12,12],maxZoom:6});else map.setView([41.3,64.6],5);
    requestAnimationFrame(()=>map.invalidateSize());
    setTimeout(()=>map.invalidateSize(),150);
    fallback?.remove();
    const selected=state.region==='Barcha hududlar'?null:regions.find(r=>r.name===state.region);
    $('#mapInfo').innerHTML=selected?regionInfoHtml(selected):nationalInfoHtml();
  }catch(e){
    console.warn('RASAD hududiy xarita xatosi:',e);
    fallback?.classList.add('show');
    if(fallback){const text=fallback.querySelector('span');if(text)text.textContent='Xarita qatlamini yuklab bo‘lmadi. Internet aloqasini tekshirib, qayta urinib ko‘ring.';}
  }
}

function updateRegionSelection(name){
  const row=$(`[data-region-row="${CSS.escape(name)}"]`);
  $$('.region-row').forEach(x=>x.classList.remove('selected'));
  row?.classList.add('selected');
  const btn=$('#regionBtn span');if(btn)btn.textContent=name;
}


initGlobal();
