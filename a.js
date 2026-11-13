const SS = SpreadsheetApp.getActive();
const MONTHS = ["\u099c\u09be\u09a8\u09c1","\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1","\u09ae\u09be\u09b0\u09cd\u099a","\u098f\u09aa\u09cd\u09b0\u09bf","\u09ae\u09c7","\u099c\u09c1\u09a8","\u099c\u09c1\u09b2\u09be","\u0986\u0997","\u09b8\u09c7\u09aa\u09cd\u099f\u09c7","\u0985\u0995\u09cd\u099f\u09cb","\u09a8\u09ad\u09c7","\u09a1\u09bf\u09b8\u09c7"];
const READ_SHEETS = ["Contributions","Fines","Summary","Investments","Notices","Members","Images","Payments","Rules","Ledger","Polls"];
// Payments \u09b6\u09bf\u099f\u09c7\u09b0 \u0995\u09b2\u09be\u09ae: A \u0986\u0987\u09a1\u09bf | B \u099c\u09ae\u09be\u09b0 \u09b8\u09ae\u09af\u09bc | C \u09b8\u09a6\u09b8\u09cd\u09af | D \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09b6\u09c7\u09b7 \u09ea | E \u099f\u09be\u0995\u09be | F \u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a4\u09be\u09b0\u09bf\u0996 | G \u09a7\u09b0\u09a8 | H \u09ae\u09be\u09b8 | I \u09ae\u09be\u09a7\u09cd\u09af\u09ae | J \u0985\u09ac\u09b8\u09cd\u09a5\u09be | K \u09af\u09be\u099a\u09be\u0987\u0995\u09be\u09b0\u09c0 | L \u09af\u09be\u099a\u09be\u0987\u09af\u09bc\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc | M \u0987\u09a4\u09bf\u09b9\u09be\u09b8
const PAY_HEAD = ["\u0986\u0987\u09a1\u09bf","\u099c\u09ae\u09be\u09b0 \u09b8\u09ae\u09af\u09bc","\u09b8\u09a6\u09b8\u09cd\u09af","\u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09b6\u09c7\u09b7 \u09ea","\u099f\u09be\u0995\u09be","\u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a4\u09be\u09b0\u09bf\u0996","\u09a7\u09b0\u09a8","\u09ae\u09be\u09b8","\u09ae\u09be\u09a7\u09cd\u09af\u09ae","\u0985\u09ac\u09b8\u09cd\u09a5\u09be","\u09af\u09be\u099a\u09be\u0987\u0995\u09be\u09b0\u09c0","\u09af\u09be\u099a\u09be\u0987\u09af\u09bc\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc","\u0987\u09a4\u09bf\u09b9\u09be\u09b8"];
// Rules \u09b6\u09bf\u099f\u09c7\u09b0 \u0995\u09b2\u09be\u09ae: A \u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae | B \u09ac\u09bf\u09b8\u09cd\u09a4\u09be\u09b0\u09bf\u09a4  (\u09aa\u09cd\u09b0\u09a5\u09ae\u09ac\u09be\u09b0 \u09a8\u09bf\u099c\u09c7 \u09a5\u09c7\u0995\u09c7\u0987 \u09a4\u09c8\u09b0\u09bf \u09b9\u09af\u09bc)
const RULES0 = [
  ["\u09aa\u09b0\u09bf\u099a\u09be\u09b2\u09a8\u09be \u0993 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4", "\u09ab\u09be\u0989\u09a8\u09cd\u09a1\u09c7\u09b6\u09a8\u09c7\u09b0 \u0995\u09cb\u09a8\u09cb \u09a8\u09bf\u09af\u09bc\u09ae \u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8 \u09ac\u09be \u09a8\u09a4\u09c1\u09a8 \u09a8\u09bf\u09af\u09bc\u09ae \u09aa\u09cd\u09b0\u09a3\u09af\u09bc\u09a8\u09c7\u09b0 \u099c\u09a8\u09cd\u09af \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09ed\u09eb% \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09b8\u09ae\u09cd\u09ae\u09a4\u09bf \u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8 \u09b9\u09ac\u09c7\u0964 \u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af \u09b8\u0995\u09b2 \u09aa\u09cd\u09b0\u09b6\u09be\u09b8\u09a8\u09bf\u0995 \u0993 \u0986\u09b0\u09cd\u09a5\u09bf\u0995 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09b8\u0982\u0996\u09cd\u09af\u09be\u0997\u09b0\u09bf\u09b7\u09cd\u09a0 \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09ae\u09a4\u09be\u09ae\u09a4\u09c7\u09b0 \u09ad\u09bf\u09a4\u09cd\u09a4\u09bf\u09a4\u09c7 \u0995\u09be\u09b0\u09cd\u09af\u0995\u09b0 \u09b9\u09ac\u09c7\u0964"],
  ["\u09ae\u09be\u09b8\u09bf\u0995 \u099a\u09be\u0981\u09a6\u09be \u0993 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be", "\u09b8\u0995\u09b2 \u09b8\u09a6\u09b8\u09cd\u09af\u0995\u09c7 \u09aa\u09cd\u09b0\u09a4\u09bf \u09ae\u09be\u09b8\u09c7\u09b0 \u09eb \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u099a\u09be\u0981\u09a6\u09be \u09aa\u09cd\u09b0\u09a6\u09be\u09a8 \u0995\u09b0\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964 \u09a8\u09bf\u09b0\u09cd\u09a7\u09be\u09b0\u09bf\u09a4 \u09b8\u09ae\u09af\u09bc \u0985\u09a4\u09bf\u0995\u09cd\u09b0\u09ae \u0995\u09b0\u09b2\u09c7 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u0986\u09b0\u09cb\u09aa \u09b9\u09ac\u09c7 \u098f\u09ac\u0982 \u09a4\u09be \u09aa\u09cd\u09b0\u09a6\u09be\u09a8 \u09ac\u09be\u09a7\u09cd\u09af\u09a4\u09be\u09ae\u09c2\u09b2\u0995 \u09b9\u09ac\u09c7\u0964"],
  ["\u09ac\u09bf\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u09a8\u09c0\u09a4\u09bf", "\u09ac\u09bf\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u099a\u09b2\u09be\u0995\u09be\u09b2\u09c0\u09a8 \u0995\u09cb\u09a8\u09cb \u09b8\u09a6\u09b8\u09cd\u09af \u09a4\u09be\u09b0 \u09ae\u09c2\u09b2\u09a7\u09a8 \u0989\u09a4\u09cd\u09a4\u09cb\u09b2\u09a8 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be \u098f\u09ac\u0982 \u09ab\u09be\u0989\u09a8\u09cd\u09a1\u09c7\u09b6\u09a8 \u09aa\u09cd\u09b0\u09a4\u09bf\u09b7\u09cd\u09a0\u09be\u09b0 \u09e8 \u09ac\u099b\u09b0 \u09aa\u09c2\u09b0\u09cd\u09a3 \u09b9\u0993\u09af\u09bc\u09be\u09b0 \u0986\u0997\u09c7 \u09b2\u09be\u09ad \u0989\u09a4\u09cd\u09a4\u09cb\u09b2\u09a8 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964"],
  ["\u09a8\u09a4\u09c1\u09a8 \u09b8\u09a6\u09b8\u09cd\u09af \u09a8\u09bf\u09af\u09bc\u09ae", "\u09a8\u09a4\u09c1\u09a8 \u09b8\u09a6\u09b8\u09cd\u09af \u09ab\u09be\u0989\u09a8\u09cd\u09a1\u09c7\u09b6\u09a8\u09c7 \u09af\u09cb\u0997 \u09a6\u09bf\u09a4\u09c7 \u099a\u09be\u0987\u09b2\u09c7 \u09ac\u09bf\u09a6\u09cd\u09af\u09ae\u09be\u09a8 \u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u09ae\u09cb\u099f \u099c\u09ae\u09be\u0995\u09c3\u09a4 \u0985\u09b0\u09cd\u09a5\u09c7\u09b0 \u09b8\u09ae\u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u0985\u09b0\u09cd\u09a5 \u09aa\u09cd\u09b0\u09a6\u09be\u09a8 \u0995\u09b0\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964"],
  ["\u09b8\u09a6\u09b8\u09cd\u09af\u09aa\u09a6 \u09b8\u09cd\u09a5\u0997\u09bf\u09a4", "\u09e9 \u09ae\u09be\u09b8 \u099a\u09be\u0981\u09a6\u09be \u09ac\u0995\u09c7\u09af\u09bc\u09be \u09a5\u09be\u0995\u09b2\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af\u09aa\u09a6 \u09b8\u09be\u09ae\u09af\u09bc\u09bf\u0995\u09ad\u09be\u09ac\u09c7 \u09b8\u09cd\u09a5\u0997\u09bf\u09a4 \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7 \u098f\u09ac\u0982 \u099a\u09c2\u09a1\u09bc\u09be\u09a8\u09cd\u09a4 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u09ae\u09a4\u09be\u09ae\u09a4\u09c7\u09b0 \u09ad\u09bf\u09a4\u09cd\u09a4\u09bf\u09a4\u09c7 \u0997\u09cd\u09b0\u09b9\u09a3 \u0995\u09b0\u09be \u09b9\u09ac\u09c7\u0964"],
  ["\u09b8\u09a6\u09b8\u09cd\u09af\u09aa\u09a6 \u09a4\u09cd\u09af\u09be\u0997", "\u0995\u09cb\u09a8\u09cb \u09b8\u09a6\u09b8\u09cd\u09af \u09ab\u09be\u0989\u09a8\u09cd\u09a1\u09c7\u09b6\u09a8 \u09a5\u09c7\u0995\u09c7 \u09ac\u09c7\u09b0 \u09b9\u09a4\u09c7 \u099a\u09be\u0987\u09b2\u09c7 \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09e9 \u09ae\u09be\u09b8 \u0986\u0997\u09c7 \u09b8\u0995\u09b2 \u09b8\u09a6\u09b8\u09cd\u09af\u0995\u09c7 \u0985\u09ac\u09b9\u09bf\u09a4 \u0995\u09b0\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964"],
  ["\u0997\u09cb\u09aa\u09a8\u09c0\u09af\u09bc\u09a4\u09be", "\u09ab\u09be\u0989\u09a8\u09cd\u09a1\u09c7\u09b6\u09a8\u09c7\u09b0 \u0995\u09cb\u09a8\u09cb \u09a4\u09a5\u09cd\u09af \u09ac\u09be\u0987\u09b0\u09c7 \u09b6\u09c7\u09af\u09bc\u09be\u09b0 \u0995\u09b0\u09be \u09ac\u09be \u09b8\u09c1\u09a8\u09be\u09ae \u0995\u09cd\u09b7\u09c1\u09a3\u09cd\u09a8 \u0995\u09b0\u09be \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09bf\u09b7\u09bf\u09a6\u09cd\u09a7\u0964"],
  ["\u09ae\u09c3\u09a4\u09cd\u09af\u09c1 \u09b8\u0982\u0995\u09cd\u09b0\u09be\u09a8\u09cd\u09a4 \u09a8\u09bf\u09af\u09bc\u09ae", "\u0995\u09cb\u09a8\u09cb \u09b8\u09a6\u09b8\u09cd\u09af \u09ae\u09be\u09b0\u09be \u0997\u09c7\u09b2\u09c7 \u09a4\u09be\u09b0 \u099c\u09ae\u09be\u0995\u09c3\u09a4 \u0985\u09b0\u09cd\u09a5 \u09af\u09be\u099a\u09be\u0987 \u09b6\u09c7\u09b7\u09c7 \u09a4\u09be\u09b0 \u09aa\u09b0\u09bf\u09ac\u09be\u09b0\u09c7\u09b0 \u0995\u09be\u099b\u09c7 \u09ab\u09c7\u09b0\u09a4 \u09aa\u09cd\u09b0\u09a6\u09be\u09a8 \u0995\u09b0\u09be \u09b9\u09ac\u09c7\u0964"],
  ["\u099a\u09c2\u09a1\u09bc\u09be\u09a8\u09cd\u09a4 \u0995\u09b0\u09cd\u09a4\u09c3\u09a4\u09cd\u09ac", "\u09ab\u09be\u0989\u09a8\u09cd\u09a1\u09c7\u09b6\u09a8\u09c7\u09b0 \u09b8\u0995\u09b2 \u09a8\u09bf\u09af\u09bc\u09ae \u0993 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u09b8\u09ae\u09cd\u09ae\u09bf\u09b2\u09bf\u09a4 \u09ae\u09a4\u09be\u09ae\u09a4\u09c7\u09b0 \u09ad\u09bf\u09a4\u09cd\u09a4\u09bf\u09a4\u09c7 \u09aa\u09b0\u09bf\u099a\u09be\u09b2\u09bf\u09a4 \u0993 \u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8\u09af\u09cb\u0997\u09cd\u09af \u09b9\u09ac\u09c7 \u098f\u09ac\u0982 \u09b8\u0995\u09b2 \u09b8\u09a6\u09b8\u09cd\u09af \u09a4\u09be \u09ae\u09be\u09a8\u09a4\u09c7 \u09ac\u09be\u09a7\u09cd\u09af \u09a5\u09be\u0995\u09ac\u09c7\u09a8\u0964"],
  ["\u09ac\u09bf\u09b0\u09cb\u09a7 \u09a8\u09bf\u09b7\u09cd\u09aa\u09a4\u09cd\u09a4\u09bf \u0993 \u099c\u09b0\u09c1\u09b0\u09bf \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4", "\u0995\u09cb\u09a8\u09cb \u09ac\u09bf\u09b0\u09cb\u09a7 \u09b9\u09b2\u09c7 \u09aa\u09cd\u09b0\u09a5\u09ae\u09c7 \u0986\u09b2\u09cb\u099a\u09a8\u09be\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u09b8\u09ae\u09be\u09a7\u09be\u09a8 \u0995\u09b0\u09be \u09b9\u09ac\u09c7\u0964 \u09b8\u09ae\u09be\u09a7\u09be\u09a8 \u09a8\u09be \u09b9\u09b2\u09c7 \u0997\u09cd\u09b0\u09c1\u09aa \u09ae\u09bf\u099f\u09bf\u0982 \u09ac\u09be \u09ad\u09bf\u09a1\u09bf\u0993 \u0995\u09a8\u09ab\u09be\u09b0\u09c7\u09a8\u09cd\u09b8\u09c7 \u0989\u09aa\u09b8\u09cd\u09a5\u09bf\u09a4 \u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u09b8\u0982\u0996\u09cd\u09af\u09be\u0997\u09b0\u09bf\u09b7\u09cd\u09a0 \u09ae\u09a4\u09be\u09ae\u09a4\u09c7\u09b0 \u09ad\u09bf\u09a4\u09cd\u09a4\u09bf\u09a4\u09c7 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09a8\u09c7\u0993\u09af\u09bc\u09be \u09b9\u09ac\u09c7\u0964 \u099c\u09b0\u09c1\u09b0\u09bf \u09aa\u09b0\u09bf\u09b8\u09cd\u09a5\u09bf\u09a4\u09bf\u09a4\u09c7 \u0989\u09aa\u09b8\u09cd\u09a5\u09bf\u09a4 \u09b8\u09a6\u09b8\u09cd\u09af\u09b0\u09be \u09a6\u09cd\u09b0\u09c1\u09a4 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09a8\u09bf\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7, \u09af\u09be \u09aa\u09b0\u09c7 \u09b8\u0995\u09b2\u0995\u09c7 \u099c\u09be\u09a8\u09be\u09a8\u09cb \u09b9\u09ac\u09c7\u0964"]
];
function rulesSheet() {
  let sh = SS.getSheetByName("Rules");
  if (!sh) {
    sh = SS.insertSheet("Rules");
    sh.getRange(1, 1, 1, 2).setValues([["\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae", "\u09ac\u09bf\u09b8\u09cd\u09a4\u09be\u09b0\u09bf\u09a4"]]);
    sh.getRange(2, 1, RULES0.length, 2).setValues(RULES0);
  }
  return sh;
}
const ST = { p: "\u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982", a: "\u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7", r: "\u09b9\u09af\u09bc\u09a8\u09bf", c: "\u09ac\u09be\u09a4\u09bf\u09b2" };

function doGet() { return out({ ok: true, msg: "UIF API \u099a\u09be\u09b2\u09c1 \u0986\u099b\u09c7" }); }

function doPost(e) {
  try {
    const q = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (q.action === "login") {   // \u09b2\u0997\u0987\u09a8\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7\u0987 \u09b8\u09ac \u09a4\u09a5\u09cd\u09af (\u098f\u0995\u09ac\u09be\u09b0\u09c7, \u09a6\u09cd\u09b0\u09c1\u09a4)
      const r = login(q.username, q.password);
      if (r.ok && q.withData) {
        const lu = findUser(r.user.username);
        if (lu) { markOn(lu); r.user.adminSet = !!lu.apw; r.cashOn = cashOn(); r.settings = settings(); r.data = readAll(lu.role === "admin", lu, lu.role === "moderator"); }
      }
      return out(r);
    }
    const u = auth(q.token);
    if (!u) {
      const kicked = q.token && CacheService.getScriptCache().get("k_" + q.token);
      return out({ ok: false, auth: false, kicked: !!kicked, error: kicked ? "kicked" : "login_required" });
    }
    if (q.action === "logout") { props().deleteProperty("t_" + q.token); if (q.ptk) pushDel(String(q.ptk)); return out({ ok: true }); }
    if (q.action === "push_reg" || q.action === "push_unreg" || q.action === "push_pref" || q.action === "push_test") return out(pushUser(u, q));
    if (q.action === "ping") {   // \u0985\u09cd\u09af\u09be\u09aa \u0996\u09cb\u09b2\u09be \u09a5\u09be\u0995\u09b2\u09c7 \u09aa\u09cd\u09b0\u09a4\u09bf \u09ae\u09bf\u09a8\u09bf\u099f\u09c7 \u2013 \u0995\u09c7 \u0985\u09a8\u09b2\u09be\u0987\u09a8\u09c7 \u0986\u099b\u09c7\u09a8
      markOn(u); touch(u); return out({ ok: true, seen: seenList() });
    }
    if (q.action === "data") {
      markOn(u); touch(u);
      return out({ ok: true, user: { name: u.name, username: u.username, role: u.role, adminSet: !!u.apw }, cashOn: cashOn(), settings: settings(), data: readAll(u.role === "admin", u, u.role === "moderator") });
    }
    if (q.action === "archive_get") {   // \u09aa\u09c1\u09b0\u09cb\u09a8\u09cb \u09ac\u099b\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac (\u09b8\u09ac\u09be\u0987 \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8)
      const y = Number(q.year); if (!(y > 2000)) return out({ ok: false, error: "\u09ac\u099b\u09b0 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc" });
      return out({ ok: true, year: y, Contributions: rows("Contributions_" + y), Fines: rows("Fines_" + y) });
    }
    if (q.action === "log_get") {   // \u0995\u09be\u09b0\u09cd\u09af\u0995\u09cd\u09b0\u09ae\u09c7\u09b0 \u0987\u09a4\u09bf\u09b9\u09be\u09b8 \u2013 \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8
      if (u.role !== "admin" && u.role !== "moderator") return out({ ok: false, error: "admin_only" });
      const sh = SS.getSheetByName("Log"); if (!sh || sh.getLastRow() < 2) return out({ ok: true, rows: [] });
      const n = Math.min(300, sh.getLastRow() - 1);
      return out({ ok: true, rows: sh.getRange(sh.getLastRow() - n + 1, 1, n, 5).getDisplayValues().reverse() });
    }
    if (q.action === "vote") {
      const lock2 = LockService.getScriptLock(); lock2.waitLock(20000);
      try { const r = castVote(u, q); logAct(u, q); SpreadsheetApp.flush(); dropRS(); return out(Object.assign({ ok: true }, r)); }
      finally { lock2.releaseLock(); }
    }
    const isPay = String(q.action || "").indexOf("pay_") === 0;
    if (q.action === "pass_change") {   // \u09a8\u09bf\u099c\u09c7\u09b0 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09ac\u09a6\u09b2 \u2013 \u09b8\u09ac\u09be\u0987
      const r = passChange(u, q); logAct(u, { action: "pass_change" }); return out(Object.assign({ ok: true }, r));
    }
    if (!isPay && u.role !== "admin" && !(u.role === "moderator" && MOD_ACTIONS[q.action])) return out({ ok: false, error: "admin_only" });
    let lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const r = isPay ? payAction(q, u) : adminAction(q, u);
      logAct(u, q);
      SpreadsheetApp.flush(); dropRS();
      lock.releaseLock(); lock = null;
      const pr = pushFlush();
      return out(Object.assign({ ok: true }, r || {}, pr ? { push: pr } : {}));
    } finally { if (lock) lock.releaseLock(); }
  } catch (err) {
    return out({ ok: false, error: String((err && err.message) || err) });
  }
}

/* ---------- helpers ---------- */
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function props() { return PropertiesService.getScriptProperties(); }
function sheet(n) { const s = SS.getSheetByName(n); if (!s) throw new Error("\u09b6\u09bf\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf: " + n); return s; }
function hash(salt, pw) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + pw, Utilities.Charset.UTF_8);
  return b.map(function (x) { const v = (x < 0 ? x + 256 : x).toString(16); return v.length === 1 ? "0" + v : v; }).join("");
}
function rows(n) { const s = SS.getSheetByName(n); if (!s) return []; return s.getDataRange().getDisplayValues().slice(1); }
function isOff(v) { return String(v).trim() === "\u09ac\u09a8\u09cd\u09a7"; }
function roleOf(v) { v = String(v).trim().toLowerCase(); return v === "admin" ? "admin" : v === "cashier" ? "cashier" : v === "moderator" ? "moderator" : "member"; }
// \u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0 \u09af\u09be \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8
const MOD_ACTIONS = { notice_add: 1, notice_edit: 1, notice_del: 1, poll_add: 1, poll_edit: 1, poll_close: 1, poll_del: 1, info_set: 1, img_add: 1, img_del: 1 };
function bnNum(n) { return String(n).replace(/\d/g, function (d) { return "\u09e6\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef"[d]; }); }
function curYear() { return Number(props().getProperty("set_year")) || 2026; }
function archYears() { const out = [], cy = curYear(); for (let y = 2025; y <= cy + 1; y++) { try { if (SS.getSheetByName("Contributions_" + y)) out.push(y); } catch (e) {} } return out; }
function settings() { const p = props(); return { est: p.getProperty("set_est") || "\u09e6\u09e8 | \u09e8\u09e6\u09e8\u09eb", slogan: p.getProperty("set_slogan") || "\u0990\u0995\u09cd\u09af \u2022 \u09ac\u09bf\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u2022 \u0989\u09a8\u09cd\u09a8\u09af\u09bc\u09a8", msgr: p.getProperty("set_msgr") || "", year: curYear(), years: archYears(),
  pay: { num: p.getProperty("pay_num") || "", type: p.getProperty("pay_type") || "", wa: p.getProperty("pay_wa") || "" }, remTpl: p.getProperty("rem_tpl") || "",
  fcm: p.getProperty("fcm_cfg") && p.getProperty("fcm_sa") ? { cfg: JSON.parse(p.getProperty("fcm_cfg")), vapid: p.getProperty("fcm_vapid") || "" } : null }; }
// WhatsApp \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0: + \u09ac\u09be 00 \u09a6\u09bf\u09af\u09bc\u09c7 \u09a6\u09c7\u09b6\u09c7\u09b0 \u0995\u09cb\u09a1\u09b8\u09b9, \u0985\u09a5\u09ac\u09be \u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09bf 01\u2026 / 880\u2026 ; \u09a8\u09be \u09ae\u09bf\u09b2\u09b2\u09c7 null
function waNorm(s) {
  s = String(s || "").trim(); if (!s) return ""; let d = s.replace(/\D/g, "");
  if (s.charAt(0) === "+") return d.length >= 8 && d.length <= 15 ? d : null;
  if (d.indexOf("00") === 0) { d = d.slice(2); return d.length >= 8 && d.length <= 15 ? d : null; }
  if (d.indexOf("880") === 0 && d.length === 13) return d;
  if (d.indexOf("01") === 0 && d.length === 11) return "88" + d;
  return null;
}
// \u0995\u09c7 \u0985\u09a8\u09b2\u09be\u0987\u09a8\u09c7 \u0986\u099b\u09c7\u09a8: [\u09a8\u09be\u09ae, \u09b6\u09c7\u09b7 \u09a6\u09c7\u0996\u09be \u0995\u09a4 \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1 \u0986\u0997\u09c7 (-1 = \u0995\u0996\u09a8\u09cb \u09a8\u09be), \u098f\u0996\u09a8 \u0985\u09a8\u09b2\u09be\u0987\u09a8 1/0]
function seenList() {
  const v = sheet("Users").getDataRange().getValues().slice(1), c = CacheService.getScriptCache(), t = Date.now();
  let hit = {}; try { hit = c.getAll(v.map(function (r) { return "on_" + String(r[1]).trim().toLowerCase(); })) || {}; } catch (e) {}
  return v.filter(function (r) { return String(r[0]).trim() && String(r[1]).trim() && !isOff(r[4]); }).map(function (r) {
    const o = Number(hit["on_" + String(r[1]).trim().toLowerCase()]) || 0;
    let l = r[5] instanceof Date ? r[5].getTime() : 0;
    if (!l && r[5]) { const m = String(r[5]).match(/(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})\s+(\d{1,2}):(\d{2})/); if (m) l = Date.UTC(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]) - 6 * 36e5; }
    const last = Math.max(o, l);
    return [String(r[0]).trim(), last ? Math.max(0, Math.round((t - last) / 1000)) : -1, o && t - o < 120000 ? 1 : 0];
  });
}
function markOn(u) { try { CacheService.getScriptCache().put("on_" + u.username, String(Date.now()), 150); } catch (e) {} }
/* ---------- \u09ab\u09cb\u09a8\u09c7 \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 (Firebase Cloud Messaging) ---------- */
// Push \u09b6\u09bf\u099f: A \u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae | B \u099f\u09cb\u0995\u09c7\u09a8 | C \u09a1\u09bf\u09ad\u09be\u0987\u09b8 | D \u09b8\u09ae\u09af\u09bc   \u2014 \u09aa\u09cd\u09b0\u09a4\u09bf \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09b8\u09b0\u09cd\u09ac\u09cb\u099a\u09cd\u099a \u09eb\u099f\u09bf \u09a1\u09bf\u09ad\u09be\u0987\u09b8
const MONTHS_F = ["\u099c\u09be\u09a8\u09c1\u09af\u09bc\u09be\u09b0\u09bf","\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1\u09af\u09bc\u09be\u09b0\u09bf","\u09ae\u09be\u09b0\u09cd\u099a","\u098f\u09aa\u09cd\u09b0\u09bf\u09b2","\u09ae\u09c7","\u099c\u09c1\u09a8","\u099c\u09c1\u09b2\u09be\u0987","\u0986\u0997\u09b8\u09cd\u099f","\u09b8\u09c7\u09aa\u09cd\u099f\u09c7\u09ae\u09cd\u09ac\u09b0","\u0985\u0995\u09cd\u099f\u09cb\u09ac\u09b0","\u09a8\u09ad\u09c7\u09ae\u09cd\u09ac\u09b0","\u09a1\u09bf\u09b8\u09c7\u09ae\u09cd\u09ac\u09b0"];
const PUSH_KEYS = { not: 1, vote: 1, rule: 1, due: 1, msg: 1, req: 1 };
let PQ = [];
function tk(n) { return bnNum(Math.round(Number(n) || 0).toLocaleString("en-IN")) + " \u09f3"; }
function payWhat(tg) { const i = MONTHS.indexOf(String(tg.mon).trim()), m = i >= 0 ? MONTHS_F[i] : "\u0986\u0997\u09c7\u09b0"; return String(tg.type) === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be" ? m + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be" : m + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be"; }
function usersAll() { return sheet("Users").getDataRange().getValues().slice(1).filter(function (r) { return String(r[1]).trim() && !isOff(r[4]); }); }
function allUsers() { return usersAll().map(function (r) { return String(r[1]).trim().toLowerCase(); }); }
function unOf(names) { const s = {}; names.forEach(function (n) { s[String(n).trim()] = 1; }); return usersAll().filter(function (r) { return s[String(r[0]).trim()]; }).map(function (r) { return String(r[1]).trim().toLowerCase(); }); }
function staffUsers() { const co = cashOn(); return usersAll().filter(function (r) { const x = roleOf(r[3]); return x === "admin" || (x === "cashier" && co); }).map(function (r) { return String(r[1]).trim().toLowerCase(); }); }
function pushQ(users, msg, except, force) { if (!users || !users.length) return; PQ.push({ users: users.filter(function (x) { return x !== except; }), msg: msg, force: !!force }); }
function pushSheet() { return mkSheet("Push", ["\u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae", "\u099f\u09cb\u0995\u09c7\u09a8", "\u09a1\u09bf\u09ad\u09be\u0987\u09b8", "\u09b8\u09ae\u09af\u09bc"]); }
function pushDel(tok) { const sh = SS.getSheetByName("Push"); if (!sh || sh.getLastRow() < 2) return; const v = sh.getRange(2, 2, sh.getLastRow() - 1, 1).getDisplayValues(); for (let i = v.length - 1; i >= 0; i--) if (v[i][0] === tok) sh.deleteRow(i + 2); }
function fcmAuth(sa) {
  const c = CacheService.getScriptCache(), hit = c.get("fcm_at"); if (hit) return hit;
  const b64 = function (x) { return Utilities.base64EncodeWebSafe(x).replace(/=+$/, ""); }, t = Math.floor(Date.now() / 1000);
  const inp = b64(JSON.stringify({ alg: "RS256", typ: "JWT" })) + "." + b64(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/firebase.messaging", aud: "https://oauth2.googleapis.com/token", iat: t, exp: t + 3600 }));
  let sig; try { sig = b64(Utilities.computeRsaSha256Signature(inp, sa.private_key)); } catch (e) { throw new Error("Service account-\u098f\u09b0 private key \u0995\u09be\u099c \u0995\u09b0\u099b\u09c7 \u09a8\u09be"); }
  const r = UrlFetchApp.fetch("https://oauth2.googleapis.com/token", { method: "post", payload: { grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: inp + "." + sig }, muteHttpExceptions: true });
  let j = {}; try { j = JSON.parse(r.getContentText()); } catch (e) {}
  if (!j.access_token) throw new Error("Firebase-\u098f \u09a2\u09cb\u0995\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf: " + (j.error_description || j.error || r.getResponseCode()));
  c.put("fcm_at", j.access_token, 3000); return j.access_token;
}
function pushSend(list) {   // list: [{users, msg, force}] \u2192 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09a1\u09bf\u09ad\u09be\u0987\u09b8\u09c7\u09b0 \u09b8\u0982\u0996\u09cd\u09af\u09be
  const p = props(), saS = p.getProperty("fcm_sa"); if (!saS || !p.getProperty("fcm_cfg")) return null;
  const sa = JSON.parse(saS), sh = SS.getSheetByName("Push"); if (!sh || sh.getLastRow() < 2) return { n: 0, p: 0 };
  const rowsP = sh.getRange(2, 1, sh.getLastRow() - 1, 2).getDisplayValues(), pref = {}, reqs = [], meta = [];
  const pf = function (un) { if (!(un in pref)) { try { pref[un] = JSON.parse(p.getProperty("npf_" + un) || "{}") || {}; } catch (e) { pref[un] = {}; } } return pref[un]; };
  const at = fcmAuth(sa), url = "https://fcm.googleapis.com/v1/projects/" + sa.project_id + "/messages:send", ppl = {};
  list.forEach(function (it) {
    const want = {}; it.users.forEach(function (x) { if (it.force || PUSH_KEYS[it.msg.k] !== 1 || pf(x)[it.msg.k] !== 0) want[x] = 1; });
    rowsP.forEach(function (r, i) { if (!want[String(r[0])]) return; ppl[r[0]] = 1;
      reqs.push({ url: url, method: "post", contentType: "application/json", headers: { Authorization: "Bearer " + at }, muteHttpExceptions: true,
        payload: JSON.stringify({ message: { token: r[1], data: { title: String(it.msg.t), body: String(it.msg.b), url: String(it.msg.u || "home"), tag: String(it.msg.k || "uif") }, webpush: { headers: { Urgency: "high", TTL: "86400" } } } }) });
      meta.push(r[1]); });
  });
  if (!reqs.length) return { n: 0, p: 0 };
  let sent = 0; const bad = [];
  for (let i = 0; i < reqs.length; i += 50) {
    UrlFetchApp.fetchAll(reqs.slice(i, i + 50)).forEach(function (res, j) { const c = res.getResponseCode(); if (c === 200) sent++; else if (c === 404 || /UNREGISTERED|registration-token-not-registered|INVALID_ARGUMENT/.test(res.getContentText())) bad.push(meta[i + j]); });
  }
  bad.forEach(pushDel);
  return { n: sent, p: Object.keys(ppl).length };
}
function pushFlush() { if (!PQ.length) return null; const l = PQ; PQ = []; try { const r = pushSend(l); if (!r) return null; r.t = l[0].msg.t; r.b = l[0].msg.b; return r; } catch (e) { return { n: 0, p: 0, err: String(e.message || e) }; } }
function pushUser(u, q) {
  const p = props();
  if (q.action === "push_pref") { const o = {}; Object.keys(PUSH_KEYS).forEach(function (k) { if (q.prefs && q.prefs[k] === 0) o[k] = 0; }); p.setProperty("npf_" + u.username, JSON.stringify(o)); return { ok: true }; }
  const tok = String(q.ptk || "").trim(); if (!/^[\w:.-]{20,400}$/.test(tok)) return { ok: false, error: "\u099f\u09cb\u0995\u09c7\u09a8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc" };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    if (q.action === "push_unreg") { pushDel(tok); return { ok: true }; }
    if (q.action === "push_reg") {
      pushDel(tok); const sh = pushSheet(), r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, 4).setNumberFormat("@"); sh.getRange(r, 1, 1, 4).setValues([[u.username, tok, String(q.dev || "").slice(0, 60), now()]]);
      const v = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues(), mine = [];
      v.forEach(function (x, i) { if (x[0] === u.username) mine.push(i + 2); });
      mine.slice(0, Math.max(0, mine.length - 5)).reverse().forEach(function (rr) { sh.deleteRow(rr); });
      return { ok: true };
    }
  } finally { lock.releaseLock(); }
  // push_test \u2013 \u09b6\u09c1\u09a7\u09c1 \u098f\u0987 \u09a1\u09bf\u09ad\u09be\u0987\u09b8\u09c7
  const sa = p.getProperty("fcm_sa"); if (!sa) return { ok: false, error: "\u098f\u09a1\u09ae\u09bf\u09a8 \u098f\u0996\u09a8\u09cb \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09b8\u09c7\u099f\u0986\u09aa \u0995\u09b0\u09c7\u09a8\u09a8\u09bf" };
  const s = JSON.parse(sa), at = fcmAuth(s);
  const res = UrlFetchApp.fetch("https://fcm.googleapis.com/v1/projects/" + s.project_id + "/messages:send", { method: "post", contentType: "application/json", headers: { Authorization: "Bearer " + at }, muteHttpExceptions: true,
    payload: JSON.stringify({ message: { token: tok, data: { title: "\ud83d\udd14 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09ae\u09c2\u09b2\u0995 \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8", body: "\u099a\u09ae\u09ce\u0995\u09be\u09b0! " + u.name + ", \u098f\u0987 \u09ab\u09cb\u09a8\u09c7 \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09a0\u09bf\u0995\u09ae\u09a4\u09cb \u0986\u09b8\u099b\u09c7 \u2705", url: "home", tag: "test" }, webpush: { headers: { Urgency: "high", TTL: "600" } } } }) });
  if (res.getResponseCode() !== 200) { if (res.getResponseCode() === 404) pushDel(tok); return { ok: false, error: "\u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09af\u09be\u09af\u09bc\u09a8\u09bf (" + res.getResponseCode() + ")" }; }
  return { ok: true };
}
function schedSetup() {   // \u09a6\u09c8\u09a8\u09bf\u0995 \u09b8\u0995\u09be\u09b2 \u09e7\u09e6\u099f\u09be (\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6): \u09b0\u09bf\u09ae\u09be\u0987\u09a8\u09cd\u09a1\u09be\u09b0; \u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0\u09c7 \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa\u0993
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "weeklyBackup") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("weeklyBackup").timeBased().everyDays(1).atHour(10).inTimezone("Asia/Dhaka").create();
  const p = props(); p.setProperty("sched", "daily"); p.setProperty("bk_auto", "1");
}
function dailyRun() {
  if (!props().getProperty("fcm_sa")) return;
  const d = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "d")), mo = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "M")) - 1;
  if (d === 3 || d === 5) {   // \u099a\u09be\u0981\u09a6\u09be \u09eb \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7
    const fines = rows("Fines");
    rows("Contributions").forEach(function (r) {
      const nm = String(r[0]).trim(); if (!nm || nm.charAt(0) === "\u203b" || String(r[14] || "").trim() === "\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc") return;
      const n = function (x) { return Number(String(x).replace(/[^0-9.]/g, "")) || 0; }, exp = Math.round(n(r[1]) * 1000), paid = n(r[2 + mo]), due = Math.max(0, exp - paid);
      if (!due) return;
      pushQ(unOf([nm]), { t: d === 5 ? "\u23f0 \u0986\u099c \u099a\u09be\u0981\u09a6\u09be \u09a6\u09c7\u0993\u09af\u09bc\u09be\u09b0 \u09b6\u09c7\u09b7 \u09a6\u09bf\u09a8" : "\ud83d\udcb8 \u099a\u09be\u0981\u09a6\u09be\u09b0 \u0995\u09a5\u09be \u09ae\u09a8\u09c7 \u0995\u09b0\u09bf\u09af\u09bc\u09c7 \u09a6\u09bf\u099a\u09cd\u099b\u09bf",
        b: (paid ? MONTHS_F[mo] + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be\u09b0 " + tk(paid) + " \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7, \u0986\u09b0\u0993 " + tk(due) + " \u09ac\u09be\u0995\u09bf\u0964 " : MONTHS_F[mo] + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be " + tk(due) + " \u09ac\u09be\u0995\u09bf\u0964 ") + (d === 5 ? "\u0986\u099c\u0995\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09a6\u09bf\u09b2\u09c7 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09b2\u09be\u0997\u09ac\u09c7 \u09a8\u09be\u0964" : "\u09eb \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09a6\u09bf\u09a8\u0964"), u: "pay", k: "due" });
    });
  }
  const ps = SS.getSheetByName("Polls");
  if (ps && ps.getLastRow() > 1) {
    const tm = Utilities.formatDate(new Date(Date.now() + 864e5), "Asia/Dhaka", "d-M-yyyy"), vs = rows("Votes");
    const mem = {}; rows("Contributions").forEach(function (r) { const nm = String(r[0]).trim(); if (nm && String(r[14] || "").trim() !== "\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc") mem[nm] = 1; });
    ps.getDataRange().getDisplayValues().slice(1).forEach(function (r) {
      const m = String(r[4] || "").match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/); if (!m || !pollOpen(r) || Number(m[1]) + "-" + Number(m[2]) + "-" + m[3] !== tm) return;
      const voted = {}; vs.forEach(function (v) { if (String(v[0]) === String(r[0])) voted[String(v[1])] = 1; });
      const who = usersAll().filter(function (x) { return mem[String(x[0]).trim()] && !voted[String(x[1]).trim().toLowerCase()]; }).map(function (x) { return String(x[1]).trim().toLowerCase(); });
      pushQ(who, { t: "\ud83d\uddf3\ufe0f \u0986\u0997\u09be\u09ae\u09c0\u0995\u09be\u09b2 \u09ad\u09cb\u099f \u09b6\u09c7\u09b7", b: String(r[1]) + " \u2014 \u0986\u09aa\u09a8\u09bf \u098f\u0996\u09a8\u09cb \u09ad\u09cb\u099f \u09a6\u09c7\u09a8\u09a8\u09bf\u0964", u: "vote", k: "vote" });
    });
  }
  pushFlush();
}
/* ---------- \u09b8\u09be\u09aa\u09cd\u09a4\u09be\u09b9\u09bf\u0995 \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa (Google Drive-\u098f\u09b0 "UIF Backup" \u09ab\u09cb\u09b2\u09cd\u09a1\u09be\u09b0\u09c7, \u09b6\u09c7\u09b7 \u09ee\u099f\u09bf \u09b0\u09be\u0996\u09be \u09b9\u09af\u09bc) ---------- */
function bkFolder() {
  const p = props(); let f = null, id = p.getProperty("bk_folder");
  if (id) { try { f = DriveApp.getFolderById(id); if (f.isTrashed()) f = null; } catch (e) { f = null; } }
  if (!f) { const it = DriveApp.getFoldersByName("UIF Backup"); f = it.hasNext() ? it.next() : DriveApp.createFolder("UIF Backup"); p.setProperty("bk_folder", f.getId()); }
  return f;
}
function bkRun() {   // \u09b8\u09ae\u09af\u09bc\u09b8\u09c2\u099a\u09bf \u09a5\u09c7\u0995\u09c7 \u099a\u09b2\u09c7 (main-\u098f\u09b0 weeklyBackup): \u09a6\u09c8\u09a8\u09bf\u0995 \u09b9\u09b2\u09c7 \u09b0\u09bf\u09ae\u09be\u0987\u09a8\u09cd\u09a1\u09be\u09b0, \u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0\u09c7 \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa
  if (props().getProperty("sched") === "daily") {
    try { dailyRun(); } catch (e) {}
    if (Utilities.formatDate(new Date(), "Asia/Dhaka", "u") !== "5") return {};
  }
  return bkCopy();
}
function bkCopy() {
  let f; try { f = bkFolder(); } catch (e) { throw new Error("\u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa\u09c7\u09b0 \u0985\u09a8\u09c1\u09ae\u09a4\u09bf \u098f\u0996\u09a8\u09cb \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09b9\u09af\u09bc\u09a8\u09bf\u0964 Apps Script-\u098f backupSetup \u098f\u0995\u09ac\u09be\u09b0 Run \u0995\u09b0\u09c1\u09a8\u0964"); }
  DriveApp.getFileById(SS.getId()).makeCopy("UIF \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa " + Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy HH-mm"), f);
  const files = [], it = f.getFiles();
  while (it.hasNext()) { const x = it.next(); if (String(x.getName()).indexOf("UIF \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa") === 0) files.push(x); }
  files.sort(function (a, b) { return b.getDateCreated().getTime() - a.getDateCreated().getTime(); });
  files.slice(8).forEach(function (x) { x.setTrashed(true); });
  const p = props(), at = now(); p.setProperty("bk_last", at); p.setProperty("bk_url", f.getUrl()); p.setProperty("bk_n", String(Math.min(files.length, 8)));
  return { last: at, url: f.getUrl() };
}
function bkSetup() {   // main \u09ab\u09be\u0987\u09b2\u09c7\u09b0 backupSetup \u09a5\u09c7\u0995\u09c7 \u098f\u0995\u09ac\u09be\u09b0 \u099a\u09be\u09b2\u09be\u09a4\u09c7 \u09b9\u09af\u09bc
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "weeklyBackup") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("weeklyBackup").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(23).inTimezone("Asia/Dhaka").create();
  props().setProperty("bk_auto", "1");
  if (props().getProperty("sched") === "daily") schedSetup();
  const r = bkCopy(); Logger.log("\u2705 \u09b8\u09be\u09aa\u09cd\u09a4\u09be\u09b9\u09bf\u0995 \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa \u099a\u09be\u09b2\u09c1 \u09b9\u09af\u09bc\u09c7\u099b\u09c7 (\u09aa\u09cd\u09b0\u09a4\u09bf \u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0 \u09b0\u09be\u09a4 \u09e7\u09e7\u099f\u09be, \u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6 \u09b8\u09ae\u09af\u09bc)\u0964 \u09ab\u09cb\u09b2\u09cd\u09a1\u09be\u09b0: " + r.url); return r;
}
function cashOn() { return props().getProperty("cash_off") !== "1"; }
function now() { return Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy HH:mm"); }
function monthLabel(m) { m = Number(m); return m >= 0 && m < 12 ? MONTHS[m] : "\u09aa\u09c1\u09b0\u09cb\u09a8\u09cb"; }

/* ---------- users ---------- */
// Users \u09b6\u09bf\u099f\u09c7\u09b0 \u0995\u09b2\u09be\u09ae: A \u09a8\u09be\u09ae | B \u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae | C \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 | D \u09ad\u09c2\u09ae\u09bf\u0995\u09be (admin/member) | E \u0985\u09ac\u09b8\u09cd\u09a5\u09be (\u099a\u09be\u09b2\u09c1/\u09ac\u09a8\u09cd\u09a7) | F \u09b6\u09c7\u09b7 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0
function findUser(username) {
  const sh = sheet("Users"), v = sh.getDataRange().getValues();
  username = String(username || "").trim().toLowerCase();
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][1]).trim().toLowerCase() === username)
      return { sh: sh, row: i + 1, name: String(v[i][0]).trim(), username: username, pass: String(v[i][2]),
               role: roleOf(v[i][3]), off: isOff(v[i][4]), last: v[i][5], apw: String(v[i][6] || "") };
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
    else if (u.pass && u.pass === password) {           // \u09b6\u09bf\u099f\u09c7 \u09b8\u09be\u09a7\u09be\u09b0\u09a3 \u09b2\u09c7\u0996\u09be\u09af\u09bc \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09a5\u09be\u0995\u09b2\u09c7 \u09aa\u09cd\u09b0\u09a5\u09ae \u09b2\u0997\u0987\u09a8\u09c7 \u09b8\u09be\u0982\u0995\u09c7\u09a4\u09bf\u0995 \u0995\u09b0\u09c7 \u09b0\u09be\u0996\u09be \u09b9\u09af\u09bc
      good = true;
      const s = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
      u.sh.getRange(u.row, 3).setValue("sha256$" + s + "$" + hash(s, password));
      u.sh.getRange(u.row, 7).setValue(password);   // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 Sheet-\u098f \u09b2\u09bf\u0996\u09c7\u099b\u09c7\u09a8, \u09a4\u09be\u0987 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1
    }
  }
  if (u && u.off) return { ok: false, error: "disabled" };
  if (!good) { cache.put(ck, String(fails + 1), 600); return { ok: false, error: "wrong" }; }
  cache.remove(ck);
  const t = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "").slice(0, 12);
  dropTokens(u.username, true);   // \u098f\u0995\u09b8\u09be\u09a5\u09c7 \u098f\u0995\u099f\u09bf \u09a1\u09bf\u09ad\u09be\u0987\u09b8: \u0986\u0997\u09c7\u09b0 \u09a1\u09bf\u09ad\u09be\u0987\u09b8 \u09b2\u0997\u0986\u0989\u099f
  props().setProperty("t_" + t, u.username + "|" + Date.now());
  u.sh.getRange(u.row, 6).setValue(new Date());
  return { ok: true, token: t, user: { name: u.name, username: u.username, role: u.role } };
}

function auth(token) {
  if (!token) return null;
  const v = props().getProperty("t_" + token);
  if (!v) return null;
  const un = String(v).split("|")[0];
  const u = findUser(un);
  if (!u || u.off) { props().deleteProperty("t_" + token); return null; }
  return u;
}

function touch(u) {   // \u09b6\u09c7\u09b7 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc (\u09eb \u09ae\u09bf\u09a8\u09bf\u099f\u09c7 \u098f\u0995\u09ac\u09be\u09b0 \u09b2\u09c7\u0996\u09be \u09b9\u09af\u09bc)
  const last = u.last instanceof Date ? u.last.getTime() : 0;
  if (Date.now() - last > 300000) u.sh.getRange(u.row, 6).setValue(new Date());
}

function dropTokens(username, kicked) {
  const p = props(), all = p.getProperties(), c = CacheService.getScriptCache();
  Object.keys(all).forEach(function (k) {
    if (k.indexOf("t_") === 0 && String(all[k]).split("|")[0] === username) {
      p.deleteProperty(k);
      if (kicked) c.put("k_" + k.slice(2), "1", 21600);
    }
  });
}
function pruneTokens(username) {   // \u098f\u0995\u099c\u09a8\u09c7\u09b0 \u09b8\u09b0\u09cd\u09ac\u09cb\u099a\u09cd\u099a \u09eb\u099f\u09bf \u09a1\u09bf\u09ad\u09be\u0987\u09b8\u09c7 \u09b2\u0997\u0987\u09a8 \u09ae\u09a8\u09c7 \u09a5\u09be\u0995\u09ac\u09c7; \u09aa\u09c1\u09b0\u09cb\u09a8\u09cb\u0997\u09c1\u09b2\u09cb \u09ae\u09c1\u099b\u09c7 \u09af\u09be\u09ac\u09c7
  const p = props(), all = p.getProperties(), mine = [];
  Object.keys(all).forEach(function (k) { if (k.indexOf("t_") === 0) { const a = String(all[k]).split("|"); if (a[0] === username) mine.push([k, Number(a[1]) || 0]); } });
  mine.sort(function (a, b) { return b[1] - a[1]; });
  mine.slice(5).forEach(function (x) { p.deleteProperty(x[0]); });
}

/* ---------- read ---------- */
// \u09b8\u09ac \u09b6\u09bf\u099f \u09aa\u09a1\u09bc\u09be \u0995\u09af\u09bc\u09c7\u0995 \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1\u09c7\u09b0 \u099c\u09a8\u09cd\u09af \u099c\u09ae\u09bf\u09af\u09bc\u09c7 \u09b0\u09be\u0996\u09be \u09b9\u09af\u09bc (\u09a6\u09cd\u09b0\u09c1\u09a4 \u09b2\u09cb\u09a1); \u09af\u09c7\u0995\u09cb\u09a8\u09cb \u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8\u09c7 \u09b8\u09be\u09a5\u09c7 \u09b8\u09be\u09a5\u09c7 \u09ae\u09c1\u099b\u09c7 \u09af\u09be\u09af\u09bc
function readShared() {
  const c = CacheService.getScriptCache();
  try { const hit = c.get("rs1"); if (hit) return JSON.parse(hit); } catch (e) {}
  const d = {}; READ_SHEETS.forEach(function (n) { d[n] = rows(n); });
  try { const js = JSON.stringify(d); if (js.length < 45000) c.put("rs1", js, 20); } catch (e) {}
  return d;
}
function dropRS() { try { CacheService.getScriptCache().remove("rs1"); } catch (e) {} }
function readAll(isAdmin, u, isMod) {
  const d = {};
  rulesSheet();
  const sh0 = readShared(); READ_SHEETS.forEach(function (n) { d[n] = sh0[n] || []; });
  // \u09ad\u09cb\u099f: \u09b8\u09ac\u09be\u0987 \u09b6\u09c1\u09a7\u09c1 \u09ae\u09cb\u099f \u09b8\u0982\u0996\u09cd\u09af\u09be \u09a6\u09c7\u0996\u09ac\u09c7\u09a8; \u0995\u09c7 \u0995\u09c0 \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09c7\u09a8 \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8
  const vs = rows("Votes"), cnt = {}, mine = {};
  vs.forEach(function (r) { const id = String(r[0]), c = Number(r[3]); if (!cnt[id]) cnt[id] = []; cnt[id][c] = (cnt[id][c] || 0) + 1; if (u && String(r[1]) === u.username) mine[id] = c; });
  d.VoteCounts = cnt; d.MyVotes = mine;
  // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 \u0993 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0\u09c7\u09b0 \u09a8\u09be\u09ae (\u09a8\u09be\u09ae\u09c7\u09b0 \u09aa\u09be\u09b6\u09c7 \u099a\u09bf\u09b9\u09cd\u09a8\u09c7\u09b0 \u099c\u09a8\u09cd\u09af) \u2013 \u0985\u09a8\u09cd\u09af \u0995\u09cb\u09a8\u09cb \u09a4\u09a5\u09cd\u09af \u09a8\u09af\u09bc
  d.Roles = rows("Users").filter(function (r) { const x = roleOf(r[3]); return x !== "member"; }).map(function (r) { return [String(r[0]).trim(), roleOf(r[3])]; });
  if (isAdmin || isMod) d.Votes = vs.map(function (r) { return [r[0], r[2], r[3], r[4]]; });
  d.Seen = seenList();
  if (isAdmin || (u && u.role === "cashier")) { try { d.RemSent = JSON.parse(props().getProperty("rem_log") || "{}") || {}; } catch (e) { d.RemSent = {}; } }
  if (isAdmin) { const p = props(); d.Backup = { last: p.getProperty("bk_last") || "", url: p.getProperty("bk_url") || "", auto: p.getProperty("bk_auto") === "1", n: Number(p.getProperty("bk_n") || 0) }; }
  try { const pp = props(), np = pp.getProperty("npf_" + (u ? u.username : "")); d.MyPush = { prefs: np ? JSON.parse(np) : {} };
    if (isAdmin) { const ps = SS.getSheetByName("Push"), pv = ps && ps.getLastRow() > 1 ? ps.getRange(2, 1, ps.getLastRow() - 1, 1).getDisplayValues().map(function (r) { return String(r[0]); }) : [];
      const tr = {}; pv.forEach(function (x) { tr[x] = (tr[x] || 0) + 1; });
      d.Push = { on: !!(pp.getProperty("fcm_cfg") && pp.getProperty("fcm_sa")), sa: !!pp.getProperty("fcm_sa"), sched: pp.getProperty("sched") === "daily", devices: pv.length, users: tr, cfg: JSON.parse(pp.getProperty("fcm_cfg") || "null"), vapid: pp.getProperty("fcm_vapid") || "" }; } } catch (e) {}
  if (isAdmin) d.Users = rows("Users").map(function (r) { return [r[0], r[1], r[3], r[4], r[5], r[6] || ""]; }); // \u09b8\u0982\u0995\u09c7\u09a4\u09be\u09af\u09bc\u09bf\u09a4 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u0996\u09a8\u09cb \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc \u09a8\u09be; \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 (G)
  return d;
}

/* ---------- admin writes ---------- */
function checkRow(sh, row, key, col) {
  row = Number(row);
  if (!(row >= 2 && row <= sh.getLastRow())) throw new Error("\u09b8\u09be\u09b0\u09bf \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
  if (key !== undefined && String(sh.getRange(row, col || 1).getDisplayValue()) !== String(key)) throw new Error("\u09a1\u09c7\u099f\u09be \u09ac\u09a6\u09b2\u09c7 \u0997\u09c7\u099b\u09c7, \u09b0\u09bf\u09ab\u09cd\u09b0\u09c7\u09b6 \u0995\u09b0\u09c7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8");
  return row;
}

function adminAction(q, u) {
  switch (q.action) {
    case "user_active": {
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      if (u.role === "admin" && !q.active) throw new Error("\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u0995\u09c7 \u09ac\u09a8\u09cd\u09a7 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be");
      u.sh.getRange(u.row, 5).setValue(q.active ? "\u099a\u09be\u09b2\u09c1" : "\u09ac\u09a8\u09cd\u09a7");
      if (!q.active) dropTokens(u.username);
      return {};
    }
    /* ----- \u09b8\u09a6\u09b8\u09cd\u09af ----- */
    case "mem_add": {
      const name = String(q.name || "").trim(), sh = sheet("Contributions");
      if (!name) throw new Error("\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      if (memberExists(name)) throw new Error("\u098f\u0987 \u09a8\u09be\u09ae\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af \u0986\u0997\u09c7\u0987 \u0986\u099b\u09c7");
      const sr = Number(q.shares); if (!(sr > 0)) throw new Error("\u09a8\u09be\u09ae \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      const row = [name, sr]; for (let i = 0; i < 12; i++) row.push(""); row.push("");
      sh.appendRow(row); return {};
    }
    case "mem_edit": {
      const sh = sheet("Contributions"), r = checkRow(sh, q.row, q.key), name = String(q.name || "").trim(), old = String(q.key).trim();
      if (!name) throw new Error("\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      const sr = Number(q.shares); if (!(sr > 0)) throw new Error("\u09a8\u09be\u09ae \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      if (name !== old && memberExists(name)) throw new Error("\u098f\u0987 \u09a8\u09be\u09ae\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af \u0986\u0997\u09c7\u0987 \u0986\u099b\u09c7");
      sh.getRange(r, 1, 1, 2).setValues([[name, sr]]);
      if (name !== old) renameEverywhere(old, name);
      return {};
    }
    case "mem_active": {   // \u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc \u0995\u09b0\u09b2\u09c7 \u09b9\u09bf\u09b8\u09be\u09ac \u09a5\u09be\u0995\u09c7, \u09b6\u09c1\u09a7\u09c1 \u09b2\u0997\u0987\u09a8 \u09ac\u09a8\u09cd\u09a7 \u09b9\u09af\u09bc
      const sh = sheet("Contributions"), r = checkRow(sh, q.row, q.key), name = String(q.key).trim();
      if (!String(sh.getRange(1, 15).getDisplayValue())) sh.getRange(1, 15).setValue("\u0985\u09ac\u09b8\u09cd\u09a5\u09be");
      sh.getRange(r, 15).setValue(q.active ? "" : "\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc");
      const us = sheet("Users"), v = us.getDataRange().getValues();
      for (let i = 1; i < v.length; i++) if (String(v[i][0]).trim() === name && roleOf(v[i][3]) !== "admin") {
        us.getRange(i + 1, 5).setValue(q.active ? "\u099a\u09be\u09b2\u09c1" : "\u09ac\u09a8\u09cd\u09a7");
        if (!q.active) dropTokens(String(v[i][1]).trim().toLowerCase());
      }
      return {};
    }
    /* ----- \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 ----- */
    case "user_add": {
      const name = String(q.name || "").trim(), un = String(q.username || "").trim().toLowerCase(), pw = String(q.password || "");
      if (!memberExists(name)) throw new Error("\u0986\u0997\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af \u09a4\u09be\u09b2\u09bf\u0995\u09be\u09af\u09bc \u09a8\u09be\u09ae\u099f\u09bf \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8");
      if (!/^[a-z0-9._]{3,20}$/.test(un)) throw new Error("\u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae \u09e9\u2013\u09e8\u09e6 \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u0987\u0982\u09b0\u09c7\u099c\u09bf \u099b\u09cb\u099f \u09b9\u09be\u09a4\u09c7\u09b0 \u0985\u0995\u09cd\u09b7\u09b0/\u09b8\u0982\u0996\u09cd\u09af\u09be \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
      if (findUser(un)) throw new Error("\u098f\u0987 \u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae \u0986\u0997\u09c7\u0987 \u0986\u099b\u09c7");
      if (pw.length < 4) throw new Error("\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09ea \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
      const salt = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
      sheet("Users").appendRow([name, un, "sha256$" + salt + "$" + hash(salt, pw), "member", "\u099a\u09be\u09b2\u09c1", "", pw]);
      return {};
    }
    case "user_pass": {
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const pw = String(q.password || ""); if (pw.length < 4) throw new Error("\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09ea \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
      const salt = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
      u.sh.getRange(u.row, 3).setValue("sha256$" + salt + "$" + hash(salt, pw));
      u.sh.getRange(u.row, 7).setValue(pw);   // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u2013 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8 \u09af\u09a4\u0995\u09cd\u09b7\u09a3 \u09b8\u09a6\u09b8\u09cd\u09af \u09a8\u09bf\u099c\u09c7 \u09a8\u09be \u09ac\u09a6\u09b2\u09be\u09a8
      dropTokens(u.username); return {};
    }
    case "user_rename": {
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const un = String(q.newUsername || "").trim().toLowerCase();
      if (!/^[a-z0-9._]{3,20}$/.test(un)) throw new Error("\u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae \u09e9\u2013\u09e8\u09e6 \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u0987\u0982\u09b0\u09c7\u099c\u09bf \u099b\u09cb\u099f \u09b9\u09be\u09a4\u09c7\u09b0 \u0985\u0995\u09cd\u09b7\u09b0/\u09b8\u0982\u0996\u09cd\u09af\u09be \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
      if (un !== u.username && findUser(un)) throw new Error("\u098f\u0987 \u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae \u0986\u0997\u09c7\u0987 \u0986\u099b\u09c7");
      u.sh.getRange(u.row, 2).setValue(un); dropTokens(u.username); return {};
    }
    /* ----- \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09a4\u09a5\u09cd\u09af (NID-\u098f\u09b0 \u09b6\u09c1\u09a7\u09c1 \u09b6\u09c7\u09b7 \u09ea \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b0\u09be\u0996\u09be \u09b9\u09af\u09bc) ----- */
    case "info_set": {
      const name = String(q.name || "").trim(); if (!memberExists(name)) throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const f = (q.fields || []).slice(0, 12).map(function (x) { return String(x == null ? "" : x).trim(); });
      while (f.length < 12) f.push("");
      f[7] = f[7].replace(/\s/g, "").slice(-4);
      let sh = SS.getSheetByName("Members");
      if (!sh) { sh = SS.insertSheet("Members"); sh.getRange(1, 1, 1, 13).setValues([["\u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09a8\u09be\u09ae", "\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09be\u09ae", "\u09aa\u09bf\u09a4\u09be\u09b0 \u09a8\u09be\u09ae", "\u09ae\u09be\u09a4\u09be\u09b0 \u09a8\u09be\u09ae", "\u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09a0\u09bf\u0995\u09be\u09a8\u09be", "\u09b8\u09cd\u09a5\u09be\u09af\u09bc\u09c0 \u09a0\u09bf\u0995\u09be\u09a8\u09be", "\u099c\u09a8\u09cd\u09ae \u09a4\u09be\u09b0\u09bf\u0996", "\u09aa\u09c7\u09b6\u09be", "NID/\u09aa\u09be\u09b8\u09aa\u09cb\u09b0\u09cd\u099f (\u09b6\u09c7\u09b7 \u09ea)", "\u09ae\u09cb\u09ac\u09be\u0987\u09b2", "\u0987\u09ae\u09c7\u0987\u09b2", "\u09af\u09cb\u0997\u09a6\u09be\u09a8\u09c7\u09b0 \u09a4\u09be\u09b0\u09bf\u0996", "\u09ae\u09be\u09b8\u09bf\u0995 \u099a\u09be\u0981\u09a6\u09be (\u09f3)"]]); }
      const v = sh.getDataRange().getDisplayValues();
      let r = -1; for (let i = 1; i < v.length; i++) if (String(v[i][0]).trim() === name) { r = i + 1; break; }
      if (r < 0) r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, 13).setNumberFormat("@");
      sh.getRange(r, 1, 1, 13).setValues([[name].concat(f)]); return {};
    }
    /* ----- \u09b8\u09be\u09b0\u09be\u0982\u09b6 ----- */
    case "sum_set": {
      const keys = ["prev", "jisan", "tax", "profit", "irr"], vals = q.values || {}, sh = sheet("Summary"), v = sh.getDataRange().getDisplayValues();
      keys.forEach(function (k) {
        if (vals[k] === undefined) return;
        const n = Number(vals[k]); if (!(n >= 0)) throw new Error("\u09b8\u09a0\u09bf\u0995 \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b2\u09bf\u0996\u09c1\u09a8");
        let r = -1; for (let i = 1; i < v.length; i++) if (String(v[i][0]).trim() === k) { r = i + 1; break; }
        if (r < 0) { sh.appendRow([k, n]); v.push([k, n]); } else sh.getRange(r, 2).setValue(n);
      });
      return {};
    }
    /* ----- \u099b\u09ac\u09bf\u09b0 \u09b8\u09cd\u09b2\u09be\u0987\u09a1\u09be\u09b0 ----- */
    case "img_add": {
      const url = String(q.url || "").trim(); if (!/^https?:\/\//.test(url)) throw new Error("\u09b8\u09a0\u09bf\u0995 \u09b2\u09bf\u0982\u0995 \u09a6\u09bf\u09a8 (https:// \u09a6\u09bf\u09af\u09bc\u09c7 \u09b6\u09c1\u09b0\u09c1)");
      let sh = SS.getSheetByName("Images"); if (!sh) { sh = SS.insertSheet("Images"); sh.getRange(1, 1, 1, 2).setValues([["link", "note"]]); }
      sh.appendRow([url, String(q.note || "")]); return {};
    }
    case "img_del": { const sh = sheet("Images"); sh.deleteRow(checkRow(sh, q.row, q.key)); return {}; }
    /* ----- \u09b8\u09be\u09a7\u09be\u09b0\u09a3 \u09a4\u09a5\u09cd\u09af ----- */
    case "settings_set": {
      const est = String(q.est || "").trim(), sl = String(q.slogan || "").trim();
      if (est) props().setProperty("set_est", est); if (sl) props().setProperty("set_slogan", sl);
      if (q.msgr !== undefined) {   // \u09ae\u09c7\u09b8\u09c7\u099e\u09cd\u099c\u09be\u09b0 \u0997\u09cd\u09b0\u09c1\u09aa\u09c7\u09b0 \u09b2\u09bf\u0982\u0995 (\u0996\u09be\u09b2\u09bf \u09a6\u09bf\u09b2\u09c7 \u09ae\u09c1\u099b\u09c7 \u09af\u09be\u09ac\u09c7)
        const m = String(q.msgr || "").trim();
        if (!m) props().deleteProperty("set_msgr");
        else { if (!/^https:\/\/(m\.me|www\.messenger\.com|messenger\.com|www\.facebook\.com|facebook\.com|fb\.me)\//i.test(m)) throw new Error("\u09b8\u09a0\u09bf\u0995 \u09ae\u09c7\u09b8\u09c7\u099e\u09cd\u099c\u09be\u09b0 \u09b2\u09bf\u0982\u0995 \u09a6\u09bf\u09a8 (https://m.me/... )"); props().setProperty("set_msgr", m); }
      }
      return {};
    }
    case "rem_tpl": {   // WhatsApp \u09b0\u09bf\u09ae\u09be\u0987\u09a8\u09cd\u09a1\u09be\u09b0\u09c7\u09b0 \u09ac\u09be\u09b0\u09cd\u09a4\u09be (\u0996\u09be\u09b2\u09bf \u09a6\u09bf\u09b2\u09c7 \u0986\u0997\u09c7\u09b0 \u09b2\u09c7\u0996\u09be\u09af\u09bc \u09ab\u09c7\u09b0\u09a4)
      const s = String(q.tpl || "").replace(/\r/g, "").trim().slice(0, 1200);
      if (!s) props().deleteProperty("rem_tpl"); else props().setProperty("rem_tpl", s);
      return {};
    }
    case "backup_now": return bkCopy();
    case "push_cfg": {   // Firebase \u09b8\u09c7\u099f\u0986\u09aa (\u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8)
      const p = props(), c = q.cfg || {}, cfg = {};
      ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach(function (k) { if (c[k]) cfg[k] = String(c[k]).trim().slice(0, 200); });
      const vap = String(q.vapid || "").replace(/\s/g, "");
      if (!cfg.apiKey || !cfg.projectId || !cfg.messagingSenderId || !cfg.appId) throw new Error("Firebase config \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09af\u09bc (apiKey, projectId, messagingSenderId, appId \u09b2\u09be\u0997\u09ac\u09c7)");
      if (!/^[A-Za-z0-9_-]{60,120}$/.test(vap)) throw new Error("Web Push key (VAPID) \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      let sa = null;
      if (q.sa) { try { sa = JSON.parse(String(q.sa)); } catch (e) { throw new Error("Service account \u09ab\u09be\u0987\u09b2\u099f\u09bf \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc"); }
        if (!sa.client_email || !sa.private_key || !sa.project_id) throw new Error("Service account \u09ab\u09be\u0987\u09b2\u09c7 client_email / private_key \u09a8\u09c7\u0987");
        if (sa.project_id !== cfg.projectId) throw new Error("Service account \u0986\u09b0 config \u0986\u09b2\u09be\u09a6\u09be Firebase \u09aa\u09cd\u09b0\u099c\u09c7\u0995\u09cd\u099f\u09c7\u09b0");
        CacheService.getScriptCache().remove("fcm_at"); fcmAuth({ client_email: sa.client_email, private_key: sa.private_key }); }
      else if (!p.getProperty("fcm_sa")) throw new Error("Service account \u09ab\u09be\u0987\u09b2\u099f\u09bf \u09a6\u09bf\u09a8");
      p.setProperty("fcm_cfg", JSON.stringify(cfg)); p.setProperty("fcm_vapid", vap);
      if (sa) p.setProperty("fcm_sa", JSON.stringify({ client_email: sa.client_email, private_key: sa.private_key, project_id: sa.project_id }));
      let sched = true; try { schedSetup(); } catch (e) { sched = false; }
      return { sched: sched };
    }
    case "push_sched": schedSetup(); return {};
    case "push_off": { const p = props(); ["fcm_cfg", "fcm_vapid", "fcm_sa"].forEach(function (k) { p.deleteProperty(k); }); return {}; }
    case "push_send": {   // \u098f\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b2\u09c7\u0996\u09be \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8
      const ti = String(q.title || "").trim().slice(0, 80), bo = String(q.body || "").trim().slice(0, 300);
      if (!ti || !bo) throw new Error("\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae \u0993 \u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09b2\u09bf\u0996\u09c1\u09a8");
      const to = Array.isArray(q.to) && q.to.length ? q.to.map(String) : null;
      pushQ(to ? unOf(to) : allUsers(), { t: "\ud83d\udd14 " + ti, b: bo, u: "home", k: "msg" }, u.username, true);
      return {};
    }
    /* ----- \u09a8\u09a4\u09c1\u09a8 \u09ac\u099b\u09b0 \u09b6\u09c1\u09b0\u09c1 ----- */
    case "year_close": {
      const y = curYear();
      if (Number(q.confirmYear) !== y) throw new Error("\u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09a4\u09c7 \u09b8\u09a0\u09bf\u0995 \u09ac\u099b\u09b0 \u09b2\u09bf\u0996\u09c1\u09a8");
      if (SS.getSheetByName("Contributions_" + y)) throw new Error(y + " \u09b8\u09be\u09b2\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac \u0986\u0997\u09c7\u0987 \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7");
      const pay = SS.getSheetByName("Payments");
      if (pay && pay.getLastRow() > 1 && pay.getRange(2, 10, pay.getLastRow() - 1, 1).getDisplayValues().some(function (r) { return r[0] === ST.p; }))
        throw new Error("\u0986\u0997\u09c7 \u09b8\u09ac \u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982 \u099f\u09be\u0995\u09be\u09b0 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09af\u09be\u099a\u09be\u0987 \u0995\u09b0\u09c1\u09a8");
      const copy = function (name) {
        const src = SS.getSheetByName(name); if (!src) return null;
        const v = src.getDataRange().getValues(), dst = SS.insertSheet(name + "_" + y);
        if (v.length && v[0].length) dst.getRange(1, 1, v.length, v[0].length).setValues(v);
        return v;
      };
      const cv = copy("Contributions"), fv = copy("Fines") || [];
      if (pay) copy("Payments");
      const n = function (x) { return Number(String(x).replace(/[^0-9.]/g, "")) || 0; };
      let c = 0; cv.slice(1).forEach(function (r) { for (let i = 2; i < 14; i++) c += n(r[i]); });
      let fp = 0; fv.slice(1).forEach(function (r) { if (String(r[2]).trim() === "paid") fp += n(r[1]); });
      // \u09aa\u09c2\u09b0\u09cd\u09ac\u09ac\u09b0\u09cd\u09a4\u09c0 \u09ac\u099b\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac\u09c7 \u09af\u09cb\u0997
      const sm = sheet("Summary"), sv = sm.getDataRange().getDisplayValues();
      let pr = -1; for (let i = 1; i < sv.length; i++) if (String(sv[i][0]).trim() === "prev") { pr = i + 1; break; }
      if (pr < 0) sm.appendRow(["prev", c + fp]); else sm.getRange(pr, 2).setValue(n(sm.getRange(pr, 2).getDisplayValue()) + c + fp);
      // \u09ae\u09be\u09b8\u09c7\u09b0 \u0998\u09b0 \u0996\u09be\u09b2\u09bf
      const cs = sheet("Contributions"); if (cs.getLastRow() > 1) cs.getRange(2, 3, cs.getLastRow() - 1, 12).clearContent();
      // \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be: \u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4\u0997\u09c1\u09b2\u09cb \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3\u09c7, \u09ac\u09be\u0995\u09bf\u0997\u09c1\u09b2\u09cb "\u09ae\u09be\u09b8 \u09b8\u09be\u09b2" \u09b2\u09c7\u0996\u09be\u09b8\u09b9 \u09a5\u09c7\u0995\u09c7 \u09af\u09be\u09ac\u09c7
      const fs = SS.getSheetByName("Fines");
      if (fs && fs.getLastRow() > 1) {
        const v = fs.getRange(2, 1, fs.getLastRow() - 1, 4).getValues();
        for (let i = v.length - 1; i >= 0; i--) {
          if (String(v[i][2]).trim() === "paid") fs.deleteRow(i + 2);
          else { const m = MONTHS.indexOf(String(v[i][3]).trim()); if (m >= 0) fs.getRange(i + 2, 4).setValue(MONTHS[m] + " " + bnNum(y)); }
        }
      }
      // \u099f\u09be\u0995\u09be \u099c\u09ae\u09be\u09b0 \u09b0\u09c7\u0995\u09b0\u09cd\u09a1 \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3\u09c7 (\u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982 \u09a8\u09c7\u0987, \u09a4\u09be\u0987 \u09b8\u09ac \u09b8\u09b0\u09be\u09a8\u09cb \u09af\u09be\u09af\u09bc)
      if (pay && pay.getLastRow() > 1) pay.deleteRows(2, pay.getLastRow() - 1);
      props().setProperty("set_year", String(y + 1));
      return { year: y, added: c + fp };
    }
    /* ----- \u09b8\u09cd\u09ac\u09af\u09bc\u0982\u0995\u09cd\u09b0\u09bf\u09af\u09bc \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be: \u09a8\u09be\u09ae \u09aa\u09cd\u09b0\u09a4\u09bf \u09e8\u09e6\u09e6 \u09f3 ----- */
    case "fine_auto": {
      const m = Number(q.month); if (!(m >= 0 && m < 12)) throw new Error("\u09ae\u09be\u09b8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      const names = (q.members || []).map(function (x) { return String(x).trim(); }).filter(Boolean);
      if (!names.length) throw new Error("\u0995\u09be\u0989\u0995\u09c7 \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09a8\u09bf");
      const cv = rows("Contributions"), fs = sheet("Fines"), fv = rows("Fines");
      let added = 0;
      names.forEach(function (nm) {
        const c = cv.filter(function (r) { return String(r[0]).trim() === nm; })[0]; if (!c) return;
        if (fv.some(function (r) { return String(r[0]).trim() === nm && String(r[3]).trim() === MONTHS[m]; })) return;
        const sr = Number(String(c[1]).replace(/[^0-9.]/g, "")) || 0;
        fs.appendRow([nm, Math.round(sr * 200), "due", MONTHS[m]]); added++;
        pushQ(unOf([nm]), { t: "\u2696\ufe0f \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09af\u09cb\u0997 \u09b9\u09af\u09bc\u09c7\u099b\u09c7", b: MONTHS_F[m] + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be \u09a6\u09c7\u09b0\u09bf\u09a4\u09c7 \u09b9\u0993\u09af\u09bc\u09be\u09af\u09bc \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be " + tk(Math.round(sr * 200)) + "\u0964 \u0985\u09cd\u09af\u09be\u09aa\u09c7 \"\u099f\u09be\u0995\u09be \u099c\u09ae\u09be \u09a6\u09bf\u09a8\" \u09a5\u09c7\u0995\u09c7 \u09aa\u09b0\u09bf\u09b6\u09cb\u09a7 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8\u0964", u: "pay", k: "due" }, u.username);
      });
      return { added: added };
    }
    /* ----- \u0986\u09af\u09bc-\u09ac\u09cd\u09af\u09af\u09bc\u09c7\u09b0 \u0996\u09be\u09a4\u09be ----- */
    case "led_add": {   // A \u0986\u0987\u09a1\u09bf | B \u09a4\u09be\u09b0\u09bf\u0996 | C \u09a7\u09b0\u09a8 | D \u0996\u09be\u09a4 | E \u099f\u09be\u0995\u09be | F \u09a5\u09c7\u0995\u09c7 | G \u09a4\u09c7 | H \u09ac\u09bf\u09ac\u09b0\u09a3 | I \u0995\u09c7 | J \u09b8\u09ae\u09af\u09bc
      const sh = mkSheet("Ledger", ["\u0986\u0987\u09a1\u09bf", "\u09a4\u09be\u09b0\u09bf\u0996", "\u09a7\u09b0\u09a8", "\u0996\u09be\u09a4", "\u099f\u09be\u0995\u09be", "\u09a5\u09c7\u0995\u09c7", "\u09a4\u09c7", "\u09ac\u09bf\u09ac\u09b0\u09a3", "\u0995\u09c7 \u09b2\u09bf\u0996\u09c7\u099b\u09c7\u09a8", "\u09b8\u09ae\u09af\u09bc"]);
      const type = String(q.type), amt = Math.round(Number(q.amount) || 0), L = { hand: 1, bank: 1 };
      if (["in", "out", "tr"].indexOf(type) < 0) throw new Error("\u09a7\u09b0\u09a8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      if (amt <= 0) throw new Error("\u099f\u09be\u0995\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09b2\u09bf\u0996\u09c1\u09a8");
      let from = "", to = "";
      if (type === "in") { to = String(q.to); if (!L[to]) throw new Error("\u0995\u09cb\u09a5\u09be\u09af\u09bc \u099c\u09ae\u09be \u09b9\u09b2\u09cb \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09c1\u09a8"); }
      if (type === "out") { from = String(q.from); if (!L[from]) throw new Error("\u0995\u09cb\u09a5\u09be \u09a5\u09c7\u0995\u09c7 \u0996\u09b0\u099a \u09b9\u09b2\u09cb \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09c1\u09a8"); }
      if (type === "tr") { from = String(q.from); to = String(q.to); if (!L[from] || !L[to] || from === to) throw new Error("\u09b8\u09cd\u09a5\u09be\u09a8\u09be\u09a8\u09cd\u09a4\u09b0\u09c7\u09b0 \u099c\u09be\u09af\u09bc\u0997\u09be \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc"); }
      const id = newId(sh, "L"), r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, 10).setNumberFormat("@");
      sh.getRange(r, 1, 1, 10).setValues([[id, String(q.date || ""), type, String(q.cat || "").slice(0, 60), String(amt), from, to, String(q.note || "").slice(0, 200), u ? u.name : "", now()]]);
      return { id: id };
    }
    case "led_del": { const sh = sheet("Ledger"), p = findById(sh, q.id); sh.deleteRow(p.row); return {}; }
    /* ----- \u09ad\u09cb\u099f ----- */
    case "poll_add": {   // A \u0986\u0987\u09a1\u09bf | B \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 | C \u0985\u09aa\u09b6\u09a8 (|) | D \u09a8\u09bf\u09af\u09bc\u09ae (50/75) | E \u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996 | F \u0985\u09ac\u09b8\u09cd\u09a5\u09be | G \u09a4\u09c8\u09b0\u09bf | H \u09ac\u09bf\u09ac\u09b0\u09a3
      const sh = mkSheet("Polls", ["\u0986\u0987\u09a1\u09bf", "\u09aa\u09cd\u09b0\u09b6\u09cd\u09a8", "\u0985\u09aa\u09b6\u09a8", "\u09a8\u09bf\u09af\u09bc\u09ae", "\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996", "\u0985\u09ac\u09b8\u09cd\u09a5\u09be", "\u09a4\u09c8\u09b0\u09bf", "\u09ac\u09bf\u09ac\u09b0\u09a3"]);
      const qq = String(q.question || "").trim(); if (!qq) throw new Error("\u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u09b2\u09bf\u0996\u09c1\u09a8");
      const opts = (q.options || []).map(function (x) { return String(x).replace(/\|/g, "/").trim(); }).filter(Boolean);
      if (opts.length < 2) throw new Error("\u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09e8\u099f\u09bf \u0985\u09aa\u09b6\u09a8 \u09a6\u09bf\u09a8");
      const rule = Number(q.rule) === 75 ? "75" : "50", end = String(q.end || "").trim();
      if (end && !/^\d{1,2}-\d{1,2}-\d{4}$/.test(end)) throw new Error("\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8-\u09ae\u09be\u09b8-\u09ac\u099b\u09b0 \u0986\u0995\u09be\u09b0\u09c7 \u09b2\u09bf\u0996\u09c1\u09a8");
      const id = newId(sh, "V"), r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, 8).setNumberFormat("@");
      sh.getRange(r, 1, 1, 8).setValues([[id, qq, opts.slice(0, 8).join("|"), rule, end, "\u099a\u09be\u09b2\u09c1", now(), String(q.desc || "").slice(0, 300)]]);
      pushQ(allUsers(), { t: "\ud83d\uddf3\ufe0f \u09a8\u09a4\u09c1\u09a8 \u09ad\u09cb\u099f", b: qq + (end ? " (\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996 " + bnNum(end) + ")" : ""), u: "vote", k: "vote" }, u.username);
      return { id: id };
    }
    case "poll_edit": {   // \u09ad\u09cb\u099f\u09c7\u09b0 \u09b8\u09ac\u0995\u09bf\u099b\u09c1 \u09af\u09c7\u0995\u09cb\u09a8\u09cb \u09b8\u09ae\u09af\u09bc \u09ac\u09a6\u09b2\u09be\u09a8\u09cb \u09af\u09be\u09af\u09bc; \u09ad\u09cb\u099f \u0985\u09aa\u09b6\u09a8\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09a5\u09be\u0995\u09c7, \u09ac\u09be\u09a6 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u0985\u09aa\u09b6\u09a8\u09c7\u09b0 \u09ad\u09cb\u099f \u09ac\u09be\u09a4\u09bf\u09b2 \u09b9\u09af\u09bc
      const sh = sheet("Polls"), p = findById(sh, q.id);
      const qq = String(q.question || "").trim(); if (!qq) throw new Error("\u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u09b2\u09bf\u0996\u09c1\u09a8");
      const opts = (q.options || []).map(function (x) { return String(x).replace(/\|/g, "/").trim(); }).filter(Boolean).slice(0, 8);
      if (opts.length < 2) throw new Error("\u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09e8\u099f\u09bf \u0985\u09aa\u09b6\u09a8 \u09a6\u09bf\u09a8");
      const rule = Number(q.rule) === 75 ? "75" : "50", end = String(q.end || "").trim();
      if (end && !/^\d{1,2}-\d{1,2}-\d{4}$/.test(end)) throw new Error("\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8-\u09ae\u09be\u09b8-\u09ac\u099b\u09b0 \u0986\u0995\u09be\u09b0\u09c7 \u09b2\u09bf\u0996\u09c1\u09a8");
      const old = String(p.r[2]).split("|");
      let map = Array.isArray(q.map) ? q.map.slice(0, opts.length).map(Number) : opts.map(function (_, i) { return i < old.length ? i : -1; });
      while (map.length < opts.length) map.push(-1);
      const vs = SS.getSheetByName("Votes");
      if (vs && vs.getLastRow() > 1) {
        const v = vs.getRange(2, 1, vs.getLastRow() - 1, 4).getDisplayValues();
        for (let i = v.length - 1; i >= 0; i--) {
          if (String(v[i][0]) !== String(q.id)) continue;
          const oc = Number(v[i][3]), ni = map.indexOf(oc);
          if (ni < 0) vs.deleteRow(i + 2);
          else if (ni !== oc) { const c = vs.getRange(i + 2, 4); c.setNumberFormat("@"); c.setValue(String(ni)); }
        }
      }
      const a = sh.getRange(p.row, 2, 1, 4); a.setNumberFormat("@"); a.setValues([[qq, opts.join("|"), rule, end]]);
      const b = sh.getRange(p.row, 8, 1, 2); b.setNumberFormat("@"); b.setValues([[String(q.desc || "").slice(0, 300), now()]]);
      if (!String(sh.getRange(1, 9, 1, 1).getDisplayValues()[0][0] || "")) sh.getRange(1, 9, 1, 1).setValues([["\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09bf\u09a4"]]);
      return {};
    }
    case "poll_close": { const sh = sheet("Polls"), p = findById(sh, q.id); sh.getRange(p.row, 6).setValue(q.open ? "\u099a\u09be\u09b2\u09c1" : "\u09ac\u09a8\u09cd\u09a7"); return {}; }
    case "poll_del": {
      const sh = sheet("Polls"), p = findById(sh, q.id); sh.deleteRow(p.row);
      const vs = SS.getSheetByName("Votes");
      if (vs && vs.getLastRow() > 1) { const v = vs.getRange(2, 1, vs.getLastRow() - 1, 1).getDisplayValues(); for (let i = v.length - 1; i >= 0; i--) if (String(v[i][0]) === String(q.id)) vs.deleteRow(i + 2); }
      return {};
    }
    case "set_moderator": {   // \u098f\u0995\u09be\u09a7\u09bf\u0995 \u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0 \u09b0\u09be\u0996\u09be \u09af\u09be\u09af\u09bc; \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0 \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8 \u09a8\u09be
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      if (u.role === "admin") throw new Error("\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u0995\u09c7 \u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be");
      if (u.role === "cashier") throw new Error("\u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0\u0995\u09c7 \u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be \u2014 \u0986\u0997\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09a5\u09c7\u0995\u09c7 \u09b8\u09b0\u09be\u09a8");
      u.sh.getRange(u.row, 4).setValue(q.on ? "moderator" : "member"); return {};
    }
    case "set_cashier": {   // \u098f\u0995\u09b8\u09be\u09a5\u09c7 \u098f\u0995\u099c\u09a8\u0987 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0; \u0986\u09ac\u09be\u09b0 \u099a\u09be\u09aa\u09b2\u09c7 \u09b8\u09b0\u09be\u09a8\u09cb \u09b9\u09af\u09bc
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      if (u.role === "admin") throw new Error("\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u0995\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be");
      if (u.role === "moderator") throw new Error("\u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0\u0995\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be \u2014 \u0986\u0997\u09c7 \u09ae\u09a1\u09be\u09b0\u09c7\u099f\u09b0 \u09a5\u09c7\u0995\u09c7 \u09b8\u09b0\u09be\u09a8");
      const sh = sheet("Users"), v = sh.getDataRange().getValues(), make = u.role !== "cashier";
      for (let i = 1; i < v.length; i++) if (roleOf(v[i][3]) === "cashier") sh.getRange(i + 1, 4).setValue("member");
      if (make) sh.getRange(u.row, 4).setValue("cashier");
      return {};
    }
    case "cash_toggle": { if (q.on) props().deleteProperty("cash_off"); else props().setProperty("cash_off", "1"); return {}; }
    case "rule_add": {
      const t = String(q.title || "").trim(); if (!t) throw new Error("\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      rulesSheet().appendRow([t, String(q.body || "")]);
      pushQ(allUsers(), { t: "\ud83d\udcdc \u09a8\u09a4\u09c1\u09a8 \u09a8\u09bf\u09af\u09bc\u09ae \u09af\u09cb\u0997 \u09b9\u09af\u09bc\u09c7\u099b\u09c7", b: t, u: "rules", k: "rule" }, u.username); return {};
    }
    case "rule_edit": {
      const sh = rulesSheet(), r = checkRow(sh, q.row, q.key, 1), t = String(q.title || "").trim(); if (!t) throw new Error("\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      sh.getRange(r, 1, 1, 2).setValues([[t, String(q.body || "")]]);
      pushQ(allUsers(), { t: "\ud83d\udcdc \u09a8\u09bf\u09af\u09bc\u09ae \u09ac\u09a6\u09b2\u09c7\u099b\u09c7", b: t, u: "rules", k: "rule" }, u.username); return {};
    }
    case "rule_del": { const sh = rulesSheet(); sh.deleteRow(checkRow(sh, q.row, q.key, 1)); return {}; }
    case "notice_add": {
      const sh = sheet("Notices"); sh.insertRowAfter(1);
      sh.getRange(2, 1, 1, 3).setValues([[String(q.date || ""), String(q.title || ""), String(q.body || "")]]);
      pushQ(allUsers(), { t: "\ud83d\udce3 \u09a8\u09a4\u09c1\u09a8 \u09a8\u09cb\u099f\u09bf\u09b6", b: String(q.title || q.body || "").slice(0, 150), u: "not", k: "not" }, u.username);
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

/* ---------- payments (\u099f\u09be\u0995\u09be \u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a4\u09a5\u09cd\u09af) ---------- */
function paySheet() {
  let sh = SS.getSheetByName("Payments");
  if (!sh) {
    sh = SS.insertSheet("Payments");
    sh.getRange(1, 1, 1, PAY_HEAD.length).setValues([PAY_HEAD]);
  }
  return sh;
}
function newPayId(sh) {
  const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(function (x) { return x[0]; }) : [];
  let id;
  do { id = "P" + Date.now().toString(36).toUpperCase() + Utilities.getUuid().replace(/-/g, "").slice(0, 4).toUpperCase(); } while (ids.indexOf(id) >= 0);
  return id;
}
function findPay(sh, id) {
  const v = sh.getDataRange().getDisplayValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(id)) return { row: i + 1, r: v[i] };
  throw new Error("\u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
}
function renameEverywhere(old, name) {   // \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09a8\u09be\u09ae \u09ac\u09a6\u09b2\u09be\u09b2\u09c7 \u09b8\u09ac \u099f\u09cd\u09af\u09be\u09ac\u09c7 \u09ac\u09a6\u09b2\u09be\u09a8\u09cb
  [["Users", 1], ["Members", 1], ["Fines", 1], ["Payments", 3]].forEach(function (x) {
    const sh = SS.getSheetByName(x[0]); if (!sh || sh.getLastRow() < 2) return;
    const rg = sh.getRange(2, x[1], sh.getLastRow() - 1, 1), v = rg.getValues();
    let ch = false; v.forEach(function (r) { if (String(r[0]).trim() === old) { r[0] = name; ch = true; } });
    if (ch) rg.setValues(v);
  });
}
function logAct(u, q) {   // Log \u09b6\u09bf\u099f: A \u09b8\u09ae\u09af\u09bc | B \u0995\u09c7 | C \u09ad\u09c2\u09ae\u09bf\u0995\u09be | D \u0995\u09be\u099c | E \u09ac\u09bf\u09ac\u09b0\u09a3
  try {
    let sh = SS.getSheetByName("Log");
    if (!sh) { sh = SS.insertSheet("Log"); sh.getRange(1, 1, 1, 5).setValues([["\u09b8\u09ae\u09af\u09bc", "\u0995\u09c7", "\u09ad\u09c2\u09ae\u09bf\u0995\u09be", "\u0995\u09be\u099c", "\u09ac\u09bf\u09ac\u09b0\u09a3"]]); }
    const skip = { action: 1, token: 1, password: 1, key: 1, row: 1, fields: 1, confirmYear: 1, sa: 1, cfg: 1, vapid: 1, ptk: 1 };
    const d = Object.keys(q).filter(function (k) { return !skip[k] && q[k] !== "" && q[k] != null; }).map(function (k) {
      let v = q[k]; if (typeof v === "object") v = JSON.stringify(v); return k + "=" + String(v).slice(0, 220);
    }).join(", ");
    const det = (q.action === "user_pass" ? "username=" + q.username + " (\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09ac\u09a6\u09b2)" : d) + (q.key ? (d ? ", " : "") + "\u0986\u0997\u09c7=" + String(q.key).slice(0, 40) : "");
    const r = sh.getLastRow() + 1;
    sh.getRange(r, 1, 1, 5).setNumberFormat("@");
    sh.getRange(r, 1, 1, 5).setValues([[now(), u.name, u.role, q.action, det.slice(0, 500)]]);
  } catch (e) {}
}
function newId(sh, p) {
  const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(function (x) { return x[0]; }) : [];
  let id; do { id = p + Date.now().toString(36).toUpperCase() + Utilities.getUuid().replace(/-/g, "").slice(0, 4).toUpperCase(); } while (ids.indexOf(id) >= 0);
  return id;
}
function mkSheet(name, head) { let sh = SS.getSheetByName(name); if (!sh) { sh = SS.insertSheet(name); sh.getRange(1, 1, 1, head.length).setValues([head]); } return sh; }
function findById(sh, id) {
  const v = sh.getDataRange().getDisplayValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(id)) return { row: i + 1, r: v[i] };
  throw new Error("\u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
}
function pollOpen(r) {   // r = Polls \u09b8\u09be\u09b0\u09bf
  if (String(r[5]).trim() === "\u09ac\u09a8\u09cd\u09a7") return false;
  const m = String(r[4] || "").match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (m) { const end = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), 23, 59, 59); if (new Date() > end) return false; }
  return true;
}
function castVote(u, q) {
  const ps = SS.getSheetByName("Polls"); if (!ps) throw new Error("\u09ad\u09cb\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
  const p = findById(ps, q.id);
  if (!pollOpen(p.r)) throw new Error("\u098f\u0987 \u09ad\u09cb\u099f \u09ac\u09a8\u09cd\u09a7 \u09b9\u09af\u09bc\u09c7 \u0997\u09c7\u099b\u09c7");
  const cv = rows("Contributions").filter(function (r) { return String(r[0]).trim() === u.name; })[0];
  if (!cv || String(cv[14] || "").trim() === "\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc") throw new Error("\u09b6\u09c1\u09a7\u09c1 \u09b8\u0995\u09cd\u09b0\u09bf\u09af\u09bc \u09b8\u09a6\u09b8\u09cd\u09af\u09b0\u09be \u09ad\u09cb\u099f \u09a6\u09bf\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8");
  const opts = String(p.r[2]).split("|"), c = Number(q.choice);
  if (!(c >= 0 && c < opts.length)) throw new Error("\u0985\u09aa\u09b6\u09a8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
  const vs = mkSheet("Votes", ["\u09ad\u09cb\u099f \u0986\u0987\u09a1\u09bf", "\u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae", "\u09a8\u09be\u09ae", "\u0985\u09aa\u09b6\u09a8", "\u09b8\u09ae\u09af\u09bc"]);
  if (rows("Votes").some(function (r) { return String(r[0]) === String(q.id) && String(r[1]) === u.username; })) throw new Error("\u0986\u09aa\u09a8\u09bf \u0986\u0997\u09c7\u0987 \u09ad\u09cb\u099f \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09c7\u09a8");
  const r = vs.getLastRow() + 1; vs.getRange(r, 1, 1, 5).setNumberFormat("@");
  vs.getRange(r, 1, 1, 5).setValues([[String(q.id), u.username, u.name, String(c), now()]]);
  return {};
}
function passChange(u, q) {
  const old = String(q.old || ""), nw = String(q.password || "");
  let good = false;
  if (u.pass.indexOf("sha256$") === 0) { const p = u.pass.split("$"); good = hash(p[1], old) === p[2]; } else good = u.pass === old;
  if (!good) throw new Error("\u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09ad\u09c1\u09b2");
  if (nw.length < 6) throw new Error("\u09a8\u09a4\u09c1\u09a8 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09ec \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
  if (nw === old) throw new Error("\u09a8\u09a4\u09c1\u09a8 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0986\u0997\u09c7\u09b0\u099f\u09be \u09a5\u09c7\u0995\u09c7 \u0986\u09b2\u09be\u09a6\u09be \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
  const salt = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
  u.sh.getRange(u.row, 3).setValue("sha256$" + salt + "$" + hash(salt, nw));
  u.sh.getRange(u.row, 7).setValue("");   // \u09b8\u09a6\u09b8\u09cd\u09af \u09a8\u09bf\u099c\u09c7 \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09c7\u09a8 \u2013 \u0995\u09c7\u0989 \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be
  return {};
}
function memberExists(name) {
  const v = rows("Contributions");
  for (let i = 0; i < v.length; i++) if (String(v[i][0]).trim() === String(name).trim()) return true;
  return false;
}
// "\u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7" \u09b9\u09b2\u09c7 \u09b9\u09bf\u09b8\u09be\u09ac\u09c7 \u09af\u09cb\u0997 (sign = 1), \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09ac\u09a6\u09b2\u09be\u09b2\u09c7 \u09ac\u09bf\u09af\u09bc\u09cb\u0997 (sign = -1)
function applyPay(r, sign) {
  const name = String(r[2]).trim(), amt = Number(String(r[4]).replace(/[^0-9.]/g, "")) || 0, type = String(r[6]), mon = String(r[7]);
  if (type === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") {
    const sh = sheet("Fines"), v = sh.getDataRange().getDisplayValues();
    const want = sign > 0 ? "paid" : "due";
    for (let i = 1; i < v.length; i++) {
      if (String(v[i][0]).trim() === name && String(v[i][3]).trim() === mon && String(v[i][2]).trim() !== want) {
        sh.getRange(i + 1, 3).setValue(want); return;
      }
    }
    return;
  }
  const m = MONTHS.indexOf(mon); if (m < 0) return;
  const sh = sheet("Contributions"), v = sh.getDataRange().getDisplayValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]).trim() === name) {
    const c = sh.getRange(i + 1, 3 + m), cur = Number(String(c.getDisplayValue()).replace(/[^0-9.]/g, "")) || 0;
    const nv = Math.max(0, cur + sign * amt);
    c.setValue(nv ? nv : ""); return;
  }
}
function fineDue(name, mon) {   // \u09ac\u09be\u0995\u09bf \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3, \u09a8\u09be \u09a5\u09be\u0995\u09b2\u09c7 -1
  const v = rows("Fines");
  for (let i = 0; i < v.length; i++)
    if (String(v[i][0]).trim() === String(name).trim() && String(v[i][3]).trim() === mon && String(v[i][2]).trim() !== "paid")
      return Number(String(v[i][1]).replace(/[^0-9.]/g, "")) || 0;
  return -1;
}
function checkFine(name, mon, amt) {   // \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be\u09b0 \u09aa\u09c1\u09b0\u09cb \u099f\u09be\u0995\u09be \u09a8\u09be \u09b9\u09b2\u09c7 \u099c\u09ae\u09be \u09b9\u09ac\u09c7 \u09a8\u09be
  const due = fineDue(name, mon);
  if (due < 0) throw new Error("\u09ac\u09be\u0995\u09bf \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
  if (amt < due) throw new Error("\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be\u09b0 \u09aa\u09c1\u09b0\u09cb \u099f\u09be\u0995\u09be (" + due + " \u09f3) \u09a8\u09be \u09aa\u09be\u09a0\u09be\u09b2\u09c7 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u099c\u09ae\u09be \u09b9\u09ac\u09c7 \u09a8\u09be");
}
function payRow(id, member, last4, amt, date, type, mon, method, status, by) {
  return [id, now(), member, last4, amt, date, type, mon, method, status, by || "", by ? now() : "", by ? now() + " " + by + ": " + status : ""];
}
function payTarget(q) {   // \u09ae\u09be\u09b8 \u09ac\u09be \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09af\u09be\u099a\u09be\u0987
  if (q.type === "fine") {
    const mon = String(q.fineMonth || "").trim(); if (!mon) throw new Error("\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09c1\u09a8");
    return { type: "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be", mon: mon };
  }
  const m = Number(q.month); if (!(m >= 0 && m < 12)) throw new Error("\u09ae\u09be\u09b8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
  return { type: "\u099a\u09be\u0981\u09a6\u09be", mon: MONTHS[m] };
}
function payAction(q, u) {
  const staff = u.role === "admin" || (u.role === "cashier" && cashOn());   // \u09aa\u09cd\u09af\u09be\u09a8\u09c7\u09b2 \u09ac\u09a8\u09cd\u09a7 \u09a5\u09be\u0995\u09b2\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u0995\u09bf\u099b\u09c1 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8 \u09a8\u09be
  const sh = paySheet();
  switch (q.action) {
    case "pay_add": {      // \u09b8\u09a6\u09b8\u09cd\u09af \u09a8\u09bf\u099c\u09c7 \u09ac\u09bf\u0995\u09be\u09b6/\u09a8\u0997\u09a6/\u09b0\u0995\u09c7\u099f\u09c7\u09b0 \u09a4\u09a5\u09cd\u09af \u09a6\u09c7\u09ac\u09c7
      const isCash = String(q.method || "").trim() === "\u0995\u09cd\u09af\u09be\u09b6";
      const last4 = isCash ? "" : String(q.last4 || "").replace(/\D/g, "");
      if (!isCash && last4.length !== 4) throw new Error("\u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09b6\u09c7\u09b7 \u09ea \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b2\u09bf\u0996\u09c1\u09a8");
      const amt = Math.round(Number(q.amount) || 0); if (amt <= 0) throw new Error("\u099f\u09be\u0995\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09b2\u09bf\u0996\u09c1\u09a8");
      const date = String(q.date || "").trim(); if (!date) throw new Error("\u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8");
      if (!memberExists(u.name)) throw new Error("\u0986\u09aa\u09a8\u09be\u09b0 \u09a8\u09be\u09ae \u099a\u09be\u0981\u09a6\u09be\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be\u09af\u09bc \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf, \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u0995\u09c7 \u099c\u09be\u09a8\u09be\u09a8");
      let meth = String(q.method || "").trim().slice(0, 30); if (!meth) meth = "MFS";
      if (/[=+@\-]/.test(meth.charAt(0))) meth = "'" + meth;
      const tg = payTarget(q);
      if (tg.type === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") checkFine(u.name, tg.mon, amt);
      const id = newPayId(sh), r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, PAY_HEAD.length).setNumberFormat("@");
      sh.getRange(r, 1, 1, PAY_HEAD.length).setValues([payRow(id, u.name, last4, amt, date, tg.type, tg.mon, meth, ST.p, "")]);
      pushQ(staffUsers(), { t: "\ud83d\udcb8 \u09a8\u09a4\u09c1\u09a8 \u099f\u09be\u0995\u09be\u09b0 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f", b: u.name + " \u00b7 " + tk(amt) + " \u00b7 " + payWhat(tg) + (meth && meth !== "MFS" ? " (" + String(meth).replace(/^'/, "") + ")" : ""), u: "cash", k: "req" }, u.username);
      return { id: id };
    }
    case "pay_cash": {     // \u0995\u09cd\u09af\u09be\u09b6 \u099c\u09ae\u09be \u2013 \u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u0993 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8, \u09b8\u09b0\u09be\u09b8\u09b0\u09bf "\u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7"
      if (!staff) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ac\u09be \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const member = String(q.member || "").trim(); if (!memberExists(member)) throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const amt = Math.round(Number(q.amount) || 0); if (amt <= 0) throw new Error("\u099f\u09be\u0995\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09b2\u09bf\u0996\u09c1\u09a8");
      const date = String(q.date || "").trim() || Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy");
      const tg = payTarget(q);
      if (tg.type === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") checkFine(member, tg.mon, amt);
      const id = newPayId(sh), row = payRow(id, member, "", amt, date, tg.type, tg.mon, "\u0995\u09cd\u09af\u09be\u09b6", ST.a, u.name);
      const r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, PAY_HEAD.length).setNumberFormat("@");
      sh.getRange(r, 1, 1, PAY_HEAD.length).setValues([row]);
      applyPay(row, 1);
      pushQ(unOf([member]), { t: "\u2705 \u0995\u09cd\u09af\u09be\u09b6 \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7", b: payWhat(tg) + " " + tk(amt) + " \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7 \u2014 " + u.name, u: "pay:r", k: "pay" }, u.username);
      return { id: id };
    }
    case "pay_info": {     // \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0/\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8: \u099f\u09be\u0995\u09be \u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0, \u09a7\u09b0\u09a8 \u0993 WhatsApp
      if (!staff) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ac\u09be \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const ty = String(q.type || ""); if (["bk", "ng", "both"].indexOf(ty) < 0) throw new Error("\u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09a7\u09b0\u09a8 \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09c1\u09a8");
      let n = String(q.num || "").replace(/\D/g, ""); if (n.indexOf("880") === 0) n = n.slice(2);
      if (!/^01\d{9}$/.test(n)) throw new Error("\u09b8\u09a0\u09bf\u0995 \u09ac\u09bf\u0995\u09be\u09b6/\u09a8\u0997\u09a6 \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0 \u09a6\u09bf\u09a8 (\u09e6\u09e7 \u09a6\u09bf\u09af\u09bc\u09c7 \u09b6\u09c1\u09b0\u09c1, \u09e7\u09e7 \u09b8\u0982\u0996\u09cd\u09af\u09be)");
      const wr = String(q.wa || "").trim(), wa = wr ? waNorm(wr) : "";
      if (wr && !wa) throw new Error("WhatsApp \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7 \u09a6\u09c7\u09b6\u09c7\u09b0 \u0995\u09cb\u09a1 \u09a6\u09bf\u09a8, \u09af\u09c7\u09ae\u09a8: +966 55 123 4567");
      const p = props(); p.setProperty("pay_num", n); p.setProperty("pay_type", ty);
      if (wa) p.setProperty("pay_wa", "+" + wa); else p.deleteProperty("pay_wa");
      return {};
    }
    case "pay_rem": {      // \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0/\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8: \u0995\u09be\u0995\u09c7 WhatsApp \u09b0\u09bf\u09ae\u09be\u0987\u09a8\u09cd\u09a1\u09be\u09b0 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09b2\u09cb
      if (!staff) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ac\u09be \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const nm = String(q.name || "").trim(); if (!memberExists(nm)) throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const p = props(); let m = {}; try { m = JSON.parse(p.getProperty("rem_log") || "{}") || {}; } catch (e) {}
      m[nm] = Date.now(); p.setProperty("rem_log", JSON.stringify(m)); return { at: m[nm] };
    }
    case "pay_cancel": {   // \u09b8\u09a6\u09b8\u09cd\u09af \u09a8\u09bf\u099c\u09c7\u09b0 \u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09ac\u09be\u09a4\u09bf\u09b2 \u0995\u09b0\u09ac\u09c7
      const p = findPay(sh, q.id);
      if (String(p.r[2]).trim() !== u.name && u.role !== "admin") throw new Error("\u09b6\u09c1\u09a7\u09c1 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09ac\u09be\u09a4\u09bf\u09b2 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7");
      if (p.r[9] !== ST.p) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09ac\u09be\u09a4\u09bf\u09b2 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7");
      sh.getRange(p.row, 10, 1, 4).setValues([[ST.c, u.name, now(), (p.r[12] ? p.r[12] + "\n" : "") + now() + " " + u.name + ": " + ST.c]]);
      return {};
    }
    case "pay_set": {      // \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0/\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8: \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7 / \u09b9\u09af\u09bc\u09a8\u09bf / \u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982
      if (!staff) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ac\u09be \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const ns = ST[q.status]; if (!ns || q.status === "c") throw new Error("\u0985\u09ac\u09b8\u09cd\u09a5\u09be \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      const p = findPay(sh, q.id), old = p.r[9];
      if (old === ST.c) throw new Error("\u09ac\u09be\u09a4\u09bf\u09b2 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09ac\u09a6\u09b2\u09be\u09a8\u09cb \u09af\u09be\u09ac\u09c7 \u09a8\u09be");
      if (old === ns) return {};
      if (ns === ST.a && p.r[6] === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") checkFine(p.r[2], String(p.r[7]).trim(), Number(String(p.r[4]).replace(/[^0-9.]/g, "")) || 0);
      if (old === ST.a) applyPay(p.r, -1);
      if (ns === ST.a) applyPay(p.r, 1);
      sh.getRange(p.row, 10, 1, 4).setValues([[ns, u.name, now(), (p.r[12] ? p.r[12] + "\n" : "") + now() + " " + u.name + ": " + ns]]);
      if (ns === ST.a || ns === ST.r) {
        const w = payWhat({ type: p.r[6], mon: String(p.r[7]).trim() }), a = tk(Number(String(p.r[4]).replace(/[^0-9.]/g, "")) || 0);
        pushQ(unOf([String(p.r[2]).trim()]), ns === ST.a ? { t: "\u2705 \u099f\u09be\u0995\u09be \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7", b: w + " " + a + " \u2014 \u09af\u09be\u099a\u09be\u0987 \u0995\u09b0\u09c7\u099b\u09c7\u09a8 " + u.name, u: "pay:r", k: "pay" }
          : { t: "\u274c \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09ae\u09c7\u09b2\u09c7\u09a8\u09bf", b: w + " " + a + " \u2014 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ae\u09c7\u09b2\u09be\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8\u09a8\u09bf\u0964 \u09a4\u09a5\u09cd\u09af \u09a6\u09c7\u0996\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964", u: "pay:r", k: "pay" }, u.username);
      }
      return {};
    }
    case "pay_del": {      // \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 \u2013 \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be (\u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7 \u09a5\u09be\u0995\u09b2\u09c7 \u09b9\u09bf\u09b8\u09be\u09ac \u09a5\u09c7\u0995\u09c7\u0993 \u09ac\u09be\u09a6)
      if (u.role !== "admin") throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const p = findPay(sh, q.id);
      if (p.r[9] === ST.a) applyPay(p.r, -1);
      sh.deleteRow(p.row);
      return {};
    }
  }
  throw new Error("\u0985\u099c\u09be\u09a8\u09be \u0995\u09be\u099c: " + q.action);
}

/** Apps Script \u098f\u09a1\u09bf\u099f\u09b0\u09c7 \u098f\u0995\u09ac\u09be\u09b0 \u098f\u099f\u09bf Run \u0995\u09b0\u09c1\u09a8 \u2013 \u0985\u09a8\u09c1\u09ae\u09a4\u09bf \u09a6\u09c7\u0993\u09af\u09bc\u09be\u09b0 \u099c\u09a8\u09cd\u09af
 *  \u09b8\u09be\u09aa\u09cd\u09a4\u09be\u09b9\u09bf\u0995 \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa \u099a\u09be\u09b2\u09c1 \u0995\u09b0\u09a4\u09c7 main \u09ab\u09be\u0987\u09b2\u09c7 \u098f\u0987 \u09a6\u09c1\u099f\u09bf \u09b2\u09be\u0987\u09a8 \u09a5\u09be\u0995\u09a4\u09c7 \u09b9\u09ac\u09c7:
 *  function backupSetup() { if (0) { DriveApp.createFolder(""); DriveApp.getFileById("").makeCopy(""); } ScriptApp.getProjectTriggers(); bkSetup(); }
 *  function weeklyBackup() { bkRun(); }
 */
function setup() { Logger.log("\u09a0\u09bf\u0995 \u0986\u099b\u09c7: " + SS.getName() + " \u2013 Users \u09b6\u09bf\u099f: " + (SS.getSheetByName("Users") ? "\u0986\u099b\u09c7" : "\u09a8\u09c7\u0987")); }
