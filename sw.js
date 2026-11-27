const C="uif-v201",A=["./","index.html","manifest.json","logo.png","icon-192.png","badge-72.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C&&x!="uif-flag").map(x=>caches.delete(x)))));self.clients.claim()});
// v194: ফোনে রাখা কপি দিয়ে সাথে সাথে খোলে, পেছনে নতুনটা নামিয়ে রাখে (নতুন সংস্করণ এলে "আপডেট করুন" বার্তা আগের মতোই)
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!="GET"||new URL(q.url).origin!=location.origin)return;const nav=q.mode=="navigate",k=nav?"index.html":q;
e.respondWith(caches.open(C).then(c=>c.match(k).then(h=>{const n=fetch(q).then(r=>{if(r&&r.ok&&r.type=="basic")c.put(k,r.clone()).catch(()=>{});return r});if(h){try{e.waitUntil(n.catch(()=>{}))}catch(x){}return h}return n.catch(()=>caches.match(q))})))});
// ফোনে নোটিফিকেশন (Firebase থেকে আসে)
self.addEventListener("push",e=>{let j={};try{j=e.data?e.data.json():{}}catch(x){try{j={data:{body:e.data.text()}}}catch(y){}}
const d=j.data||j,n=j.notification||{},title=d.title||n.title||"UIF",body=d.body||n.body||"",url=d.url||"home";
const tg=d.tag||"";e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{cs.forEach(c=>{try{c.postMessage({pushAck:tg})}catch(x){}});const f=tg!="test"&&cs.find(c=>c.visibilityState=="visible"&&c.focused);if(f){f.postMessage({push:{title,body,url}});return}
return self.registration.showNotification(title,{body,icon:"icon-192.png",badge:"badge-72.png",tag:d.tag||("uif-"+Date.now()),renotify:true,data:{url},vibrate:[80,40,80],lang:"bn"})}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const u=(e.notification.data||{}).url||"home";
e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{const c=cs[0];if(c){c.postMessage({go:u});return c.focus()}return self.clients.openWindow("./index.html?go="+encodeURIComponent(u))}))});
