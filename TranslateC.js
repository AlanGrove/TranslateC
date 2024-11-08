const translationTable=document.getElementById("translationTable"),generateButton=document.getElementById("generateButton"),copyButton=document.getElementById("copyButton"),createDocButton=document.getElementById("createDocButton"),subtitleInput=document.getElementById("subtitleInput");let fullTranslation="";subtitleInput.addEventListener("input",a=>{fullTranslation=a.target.value});
generateButton.addEventListener("click",async()=>{const a=fullTranslation.split("\n"),c=[];for(let d=0;d<a.length;d+=300){var f=a.slice(d,d+300);f=await Promise.all(f.map(e=>translateText(e)));c.push(...f)}translationTable.querySelector("tbody").innerHTML="";a.forEach((d,e)=>{const b=translationTable.insertRow();b.insertCell(0).textContent=d||"";b.insertCell(1).textContent=c[e]||""});generateButton.textContent="\u751f\u6210\u5b8c\u6210";generateButton.classList.add("completed");generateButton.disabled=
!0});async function translateText(a){a=a.replace(/^\[.*?\]/,"").trim();if(""===a)return"";a=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(a)}`;return(a=await (await fetch(a)).json())&&a[0]?a[0].map(c=>c[0]).join(""):""}
copyButton.addEventListener("click",()=>{const a=document.createRange();a.selectNode(translationTable);const c=window.getSelection();c.removeAllRanges();c.addRange(a);try{document.execCommand("copy"),alert("\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f\uff01")}catch(f){console.error("\u590d\u5236\u5931\u8d25\uff1a",f)}c.removeAllRanges()});
createDocButton.addEventListener("click",async()=>{function a(b){const g=document.createElement("div");g.innerText=b;Object.assign(g.style,{position:"fixed",top:"150px",left:"50%",transform:"translate(-50%, -50%)",padding:"15px 20px",background:"linear-gradient(45deg, #ff6b6b, #f7b733)",color:"#fff",borderRadius:"12px",boxShadow:"0 8px 16px rgba(0, 0, 0, 0.2)",fontSize:"18px",lineHeight:"1.5",cursor:"pointer",zIndex:"9999",transition:"opacity 0.3s ease-in-out",opacity:"1"});return g}function c(b){b.style.opacity=
"0";setTimeout(()=>{b.remove();b===e&&(e=null)},300)}const f=document.createRange();f.selectNode(translationTable);const d=window.getSelection();d.removeAllRanges();d.addRange(f);let e=null;try{document.execCommand("copy");e&&c(e);const b=a("\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f\uff01\u53ef\u76f4\u63a5\u7c98\u8d34");document.body.appendChild(b);e=b;b.addEventListener("click",()=>c(b))}catch(b){console.error("\u590d\u5236\u5931\u8d25\uff1a",b)}d.removeAllRanges();chrome.tabs.create({url:"https://docs.google.com/document/create"},
b=>{chrome.tabs.onUpdated.addListener(function h(k,l){k===b.id&&"complete"===l.status&&(chrome.scripting.executeScript({target:{tabId:b.id},func:pasteCopiedContent}),chrome.tabs.onUpdated.removeListener(h))})})});
function pasteCopiedContent(){const a=document.querySelector('[contenteditable="true"]');a?(a.focus(),navigator.clipboard.readText().then(c=>{document.execCommand("insertText",!1,c)}).catch(c=>{console.error("\u7c98\u8d34\u5931\u8d25\uff1a",c)})):console.error("\u672a\u80fd\u627e\u5230Google\u6587\u6863\u7684\u7f16\u8f91\u533a\u57df")};
