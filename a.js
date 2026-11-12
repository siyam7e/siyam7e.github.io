const SS = SpreadsheetApp.getActive();
const MONTHS = ["\u099c\u09be\u09a8\u09c1","\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1","\u09ae\u09be\u09b0\u09cd\u099a","\u098f\u09aa\u09cd\u09b0\u09bf","\u09ae\u09c7","\u099c\u09c1\u09a8","\u099c\u09c1\u09b2\u09be","\u0986\u0997","\u09b8\u09c7\u09aa\u09cd\u099f\u09c7","\u0985\u0995\u09cd\u099f\u09cb","\u09a8\u09ad\u09c7","\u09a1\u09bf\u09b8\u09c7"];
const READ_SHEETS = ["Contributions","Fines","Summary","Investments","Notices","Members","Images"];

function doGet() { return out({ ok: true, msg: "UIF API \u099a\u09be\u09b2\u09c1 \u0986\u099b\u09c7" }); }

function doPost(e) {
  try {
    const q = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (q.action === "login") return out(login(q.username, q.password));
    const u = auth(q.token);
    if (!u) return out({ ok: false, auth: false, error: "login_required" });
    if (q.action === "logout") { props().deleteProperty("t_" + q.token); return out({ ok: true }); }
    if (q.action === "data") {
      touch(u);
      return out({ ok: true, user: { name: u.name, username: u.username, role: u.role }, data: readAll(u.role === "admin") });
    }
    if (u.role !== "admin") return out({ ok: false, error: "admin_only" });
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const r = adminAction(q);
      SpreadsheetApp.flush();
      return out(Object.assign({ ok: true }, r || {}));
    } finally { lock.releaseLock(); }
  } catch (err) {
    return out({ ok: false, error: String((err && err.message) || err) });
  }
}

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function props() { return PropertiesService.getScriptProperties(); }
function sheet(n) { const s = SS.getSheetByName(n); if (!s) throw new Error("\u09b6\u09bf\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf: " + n); return s; }
function hash(salt, pw) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + pw, Utilities.Charset.UTF_8);
  return b.map(function (x) { const v = (x < 0 ? x + 256 : x).toString(16); return v.length === 1 ? "0" + v : v; }).join("");
}
function rows(n) { const s = SS.getSheetByName(n); if (!s) return []; return s.getDataRange().getDisplayValues().slice(1); }
function isOff(v) { return String(v).trim() === "\u09ac\u09a8\u09cd\u09a7"; }
function monthLabel(m) { m = Number(m); return m >= 0 && m < 12 ? MONTHS[m] : "\u09aa\u09c1\u09b0\u09cb\u09a8\u09cb"; }

function findUser(username) {
  const sh = sheet("Users"), v = sh.getDataRange().getValues();
  username = String(username || "").trim().toLowerCase();
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][1]).trim().toLowerCase() === username)
      return { sh: sh, row: i + 1, name: String(v[i][0]).trim(), username: username, pass: String(v[i][2]),
               role: String(v[i][3]).trim().toLowerCase() === "admin" ? "admin" : "member", off: isOff(v[i][4]), last: v[i][5] };
  }
  return null;
}

function login(username, password) {
  username = String(username || "").trim().toLowerCase(); password = String(password || "");
  if (!username || !password) return { ok: false, error: "missing" };
  const cache = CacheService.getScriptCache(), ck = "f_" + username, fails = Number(cache.get(ck) || 0);
  if (fails >= 8) return { ok: false, error: "locked" };
  const u = findUser(username);
  let good = false;
  if (u && !u.off) {
    if (u.pass.indexOf("sha256$") === 0) { const p = u.pass.split("$"); good = hash(p[1], password) === p[2]; }
    else if (u.pass && u.pass === password) {
      good = true;
      const s = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
      u.sh.getRange(u.row, 3).setValue("sha256$" + s + "$" + hash(s, password));
    }
  }
  if (u && u.off) return { ok: false, error: "disabled" };
  if (!good) { cache.put(ck, String(fails + 1), 600); return { ok: false, error: "wrong" }; }
  cache.remove(ck);
  const t = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "").slice(0, 12);
  props().setProperty("t_" + t, u.username);
  u.sh.getRange(u.row, 6).setValue(new Date());
  return { ok: true, token: t, user: { name: u.name, username: u.username, role: u.role } };
}

function auth(token) {
  if (!token) return null;
  const un = props().getProperty("t_" + token);
  if (!un) return null;
  const u = findUser(un);
  if (!u || u.off) { props().deleteProperty("t_" + token); return null; }
  return u;
}

function touch(u) {
  const last = u.last instanceof Date ? u.last.getTime() : 0;
  if (Date.now() - last > 600000) u.sh.getRange(u.row, 6).setValue(new Date());
}

function dropTokens(username) {
  const p = props(), all = p.getProperties();
  Object.keys(all).forEach(function (k) { if (k.indexOf("t_") === 0 && all[k] === username) p.deleteProperty(k); });
}

function readAll(isAdmin) {
  const d = {};
  READ_SHEETS.forEach(function (n) { d[n] = rows(n); });
  if (isAdmin) d.Users = rows("Users").map(function (r) { return [r[0], r[1], r[3], r[4], r[5]]; });
  return d;
}

function checkRow(sh, row, key, col) {
  row = Number(row);
  if (!(row >= 2 && row <= sh.getLastRow())) throw new Error("\u09b8\u09be\u09b0\u09bf \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
  if (key !== undefined && String(sh.getRange(row, col || 1).getDisplayValue()) !== String(key)) throw new Error("\u09a1\u09c7\u099f\u09be \u09ac\u09a6\u09b2\u09c7 \u0997\u09c7\u099b\u09c7, \u09b0\u09bf\u09ab\u09cd\u09b0\u09c7\u09b6 \u0995\u09b0\u09c7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8");
  return row;
}

function adminAction(q) {
  switch (q.action) {
    case "user_active": {
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      if (u.role === "admin" && !q.active) throw new Error("\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u0995\u09c7 \u09ac\u09a8\u09cd\u09a7 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be");
      u.sh.getRange(u.row, 5).setValue(q.active ? "\u099a\u09be\u09b2\u09c1" : "\u09ac\u09a8\u09cd\u09a7");
      if (!q.active) dropTokens(u.username);
      return {};
    }
    case "notice_add": {
      const sh = sheet("Notices"); sh.insertRowAfter(1);
      sh.getRange(2, 1, 1, 3).setValues([[String(q.date || ""), String(q.title || ""), String(q.body || "")]]);
      return {};
    }
    case "notice_edit": {
      const sh = sheet("Notices"), r = checkRow(sh, q.row, q.key, 2);
      sh.getRange(r, 1, 1, 3).setValues([[String(q.date || ""), String(q.title || ""), String(q.body || "")]]);
      return {};
    }
    case "notice_del": { const sh = sheet("Notices"); sh.deleteRow(checkRow(sh, q.row, q.key, 2)); return {}; }

    case "contrib_set": {
      const sh = sheet("Contributions"), v = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).getDisplayValues();
      const m = Number(q.month); if (!(m >= 0 && m < 12)) throw new Error("\u09ae\u09be\u09b8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      for (let i = 0; i < v.length; i++) if (String(v[i][0]).trim() === String(q.member).trim()) {
        const amt = Number(q.amount) || 0; sh.getRange(i + 2, 3 + m).setValue(amt ? amt : ""); return {};
      }
      throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
    }

    case "fine_add": sheet("Fines").appendRow([String(q.member), Number(q.amount) || 0, q.status === "paid" ? "paid" : "due", monthLabel(q.month)]); return {};
    case "fine_edit": {
      const sh = sheet("Fines"), r = checkRow(sh, q.row, q.key);
      sh.getRange(r, 1, 1, 4).setValues([[String(q.member), Number(q.amount) || 0, q.status === "paid" ? "paid" : "due", monthLabel(q.month)]]);
      return {};
    }
    case "fine_del": { const sh = sheet("Fines"); sh.deleteRow(checkRow(sh, q.row, q.key)); return {}; }

    case "inv_add": sheet("Investments").appendRow([String(q.sector), Number(q.amount) || 0, String(q.date || ""), Number(q.current) || 0, String(q.note || "")]); return {};
    case "inv_edit": {
      const sh = sheet("Investments"), r = checkRow(sh, q.row, q.key);
      sh.getRange(r, 1, 1, 5).setValues([[String(q.sector), Number(q.amount) || 0, String(q.date || ""), Number(q.current) || 0, String(q.note || "")]]);
      return {};
    }
    case "inv_del": { const sh = sheet("Investments"); sh.deleteRow(checkRow(sh, q.row, q.key)); return {}; }
  }
  throw new Error("\u0985\u099c\u09be\u09a8\u09be \u0995\u09be\u099c: " + q.action);
}

function setup() { Logger.log("\u09a0\u09bf\u0995 \u0986\u099b\u09c7: " + SS.getName() + " \u2013 Users \u09b6\u09bf\u099f: " + (SS.getSheetByName("Users") ? "\u0986\u099b\u09c7" : "\u09a8\u09c7\u0987")); }
