const C="uif-v69",A=["./","index.html","manifest.json","icon-192.png","icon-512.png","badge-72.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!="GET"||new URL(e.request.url).origin!=location.origin)return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
// ফোনে নোটিফিকেশন (Firebase থেকে আসে)
self.addEventListener("push",e=>{let j={};try{j=e.data?e.data.json():{}}catch(x){try{j={data:{body:e.data.text()}}}catch(y){}}
const d=j.data||j,n=j.notification||{},title=d.title||n.title||"UIF",body=d.body||n.body||"",url=d.url||"home";
e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{const f=cs.find(c=>c.visibilityState=="visible"&&c.focused);if(f){f.postMessage({push:{title,body,url}});return}
return self.registration.showNotification(title,{body,icon:"icon-192.png",badge:"badge-72.png",tag:(d.tag||"uif")+"-"+Date.now(),data:{url},vibrate:[80,40,80],lang:"bn"})}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const u=(e.notification.data||{}).url||"home";
e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{const c=cs[0];if(c){c.postMessage({go:u});return c.focus()}return self.clients.openWindow("./index.html?go="+encodeURIComponent(u))}))});
