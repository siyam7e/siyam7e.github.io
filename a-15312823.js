/* UIF সার্ভার — সংস্করণ 4 (১৯-১১-২০২৬): অ্যাডমিন 2FA (Authenticator), নোটিফিকেশন সেন্টার, বিনিয়োগের বর্তমান মূল্যের ইতিহাস, কার্যক্রমের লগ (খোঁজ/ছাঁকনি)
 * 3B (১৯-১১-২০২৬): গিরবি রেজিস্টার (মালিক/জমি/মেয়াদ/ফেরত), লাভের সূত্র, মেয়াদের নোটিফিকেশন, ২০২৫-এর বিশেষ চাঁদা, মোবাইল সবার জন্য
 * 3A: হিসাব খাতা (Double-Entry Journal), বিশেষ চাঁদা আলাদা, মোছার বদলে বাতিল
 * Apps Script-এর লোডার এই ফাইলের SHA-256 মিলিয়ে তবেই চালায়। এক অক্ষর বদলালেও লোডারের UIF_SHA বদলাতে হবে।
 */
const UIF_VER = "4";
const SS = SpreadsheetApp.getActive();
const MONTHS = ["\u099c\u09be\u09a8\u09c1","\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1","\u09ae\u09be\u09b0\u09cd\u099a","\u098f\u09aa\u09cd\u09b0\u09bf","\u09ae\u09c7","\u099c\u09c1\u09a8","\u099c\u09c1\u09b2\u09be","\u0986\u0997","\u09b8\u09c7\u09aa\u09cd\u099f\u09c7","\u0985\u0995\u09cd\u099f\u09cb","\u09a8\u09ad\u09c7","\u09a1\u09bf\u09b8\u09c7"];
const READ_SHEETS = ["Contributions","Fines","Summary","Investments","Notices","Members","Images","Payments","Rules","Ledger","Polls","MemberIDs","Special","InvValues"];
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
    migrate1a(); migrate1b(); migrate2a(); migrate3a(); migrate3b(); migrate4();
    const q = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (q.action === "login") {   // \u09b2\u0997\u0987\u09a8\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7\u0987 \u09b8\u09ac \u09a4\u09a5\u09cd\u09af (\u098f\u0995\u09ac\u09be\u09b0\u09c7, \u09a6\u09cd\u09b0\u09c1\u09a4)
      return out(loginData(login(q.username, q.password, q.dev), q));
    }
    if (q.action === "login2") return out(loginData(login2(q.tf, q.code, q.dev), q));   // অ্যাডমিনের দ্বিতীয় ধাপ (Authenticator কোড)
    const u = auth(q.token);
    if (!u) {
      const kicked = q.token && CacheService.getScriptCache().get("k_" + q.token);
      return out({ ok: false, auth: false, kicked: !!kicked, kick: kicked || "", error: kicked ? "kicked" : "login_required" });
    }
    // রক্ষণাবেক্ষণ চলাকালে শুধু অ্যাডমিন
    if (u.role !== "admin" && q.action !== "logout" && mntOn()) return out({ ok: false, error: "maint", maint: mntMsg() });
    // অ্যাডমিনের দেওয়া অস্থায়ী পাসওয়ার্ডে ঢুকলে আগে নিজের পাসওয়ার্ড দিতে হবে
    if (u.apw && !MUST_OK[q.action]) return out({ ok: false, error: "must_change_pw" });
    // অ্যাডমিনের 2FA চালু না থাকলে আগে চালু করতে হবে
    if (u.role === "admin" && !tfaOn(u) && !TFA_OK[q.action]) return out({ ok: false, error: "must_2fa" });
    if (q.action === "logout") { props().deleteProperty("t_" + q.token); if (q.ptk) pushDel(String(q.ptk)); return out({ ok: true }); }
    if (q.action === "push_reg" || q.action === "push_unreg" || q.action === "push_pref" || q.action === "push_test") return out(pushUser(u, q));
    if (q.action === "nf_read") return out(nfMark(u, q));
    if (/^tfa_/.test(String(q.action))) return out(tfaAction(u, q));
    if (q.action === "ping") {   // \u0985\u09cd\u09af\u09be\u09aa \u0996\u09cb\u09b2\u09be \u09a5\u09be\u0995\u09b2\u09c7 \u09aa\u09cd\u09b0\u09a4\u09bf \u09ae\u09bf\u09a8\u09bf\u099f\u09c7 \u2013 \u0995\u09c7 \u0985\u09a8\u09b2\u09be\u0987\u09a8\u09c7 \u0986\u099b\u09c7\u09a8
      markOn(u); touch(u, q.dev); return out({ ok: true, seen: seenList() });
    }
    if (q.action === "data") {
      markOn(u); touch(u, q.dev);
      return out({ ok: true, user: { name: u.name, username: u.username, role: u.role, adminSet: !!u.apw, tfa: tfaOn(u) }, cashOn: cashOn(), settings: settings(), data: readAll(u.role === "admin", u, u.role === "moderator") });
    }
    if (q.action === "archive_get") {   // \u09aa\u09c1\u09b0\u09cb\u09a8\u09cb \u09ac\u099b\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac (\u09b8\u09ac\u09be\u0987 \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8)
      const y = Number(q.year); if (!(y > 2000)) return out({ ok: false, error: "\u09ac\u099b\u09b0 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc" });
      return out({ ok: true, year: y, Contributions: rows("Contributions_" + y), Fines: rows("Fines_" + y), Special: rows("Special_" + y) });
    }
    if (q.action === "log_get") {   // \u0995\u09be\u09b0\u09cd\u09af\u0995\u09cd\u09b0\u09ae\u09c7\u09b0 \u0987\u09a4\u09bf\u09b9\u09be\u09b8 \u2013 \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8
      if (u.role !== "admin" && u.role !== "moderator") return out({ ok: false, error: "admin_only" });
      return out(logGet(q));
    }
    if (q.action === "vote") {
      const lock2 = LockService.getScriptLock(); lock2.waitLock(20000);
      try { const r = castVote(u, q); logAct(u, q); SpreadsheetApp.flush(); dropRS(); return out(Object.assign({ ok: true }, r)); }
      finally { lock2.releaseLock(); }
    }
    if (q.action === "sess_list") {   // একজনের লগইন থাকা ডিভাইস – শুধু অ্যাডমিন
      if (u.role !== "admin") return out({ ok: false, error: "admin_only" });
      return out({ ok: true, list: sessList(String(q.username || "").trim().toLowerCase()) });
    }
    const isPay = String(q.action || "").indexOf("pay_") === 0;
    if (q.action === "pass_change") {   // \u09a8\u09bf\u099c\u09c7\u09b0 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u09ac\u09a6\u09b2 \u2013 \u09b8\u09ac\u09be\u0987
      const r = passChange(u, q); logAct(u, { action: "pass_change" }); return out(Object.assign({ ok: true }, r));
    }
    if (!isPay && u.role !== "admin" && !(u.role === "moderator" && MOD_ACTIONS[q.action]) && !(u.role === "cashier" && cashOn() && CASH_ACTIONS[q.action])) return out({ ok: false, error: "admin_only" });
    let lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const r = isPay ? payAction(q, u) : adminAction(q, u);
      logAct(u, q);
      if (FIN_ACT[q.action] && props().getProperty("mig3a") === "1") { try { SpreadsheetApp.flush(); jSync(u, q); } catch (je) { try { logAct(u, { action: "journal_error", e: String(je && je.message || je) }); } catch (e2) {} } }
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
const MUST_OK = { logout: 1, ping: 1, data: 1, pass_change: 1, push_reg: 1, push_unreg: 1, push_pref: 1, push_test: 1 };
// 2FA চালু না করা পর্যন্ত অ্যাডমিন শুধু এগুলো করতে পারবেন
const TFA_OK = { logout: 1, ping: 1, data: 1, pass_change: 1, push_reg: 1, push_unreg: 1, push_pref: 1, push_test: 1, tfa_init: 1, tfa_on: 1, nf_read: 1 };
// ক্যাশিয়ার যা পারবেন (ক্যাশিয়ার প্যানেল চালু থাকলে): নোটিশ ও ভোট
const CASH_ACTIONS = { notice_add: 1, notice_edit: 1, notice_del: 1, poll_add: 1, poll_edit: 1, poll_close: 1, poll_del: 1 };
const MOD_ACTIONS = { notice_add: 1, notice_edit: 1, notice_del: 1, poll_add: 1, poll_edit: 1, poll_close: 1, poll_del: 1, info_set: 1, img_add: 1, img_del: 1 };
function bnNum(n) { return String(n).replace(/\d/g, function (d) { return "\u09e6\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef"[d]; }); }
function curYear() { return Number(props().getProperty("set_year")) || 2026; }
function archYears() { const out = [], cy = curYear(); for (let y = 2025; y <= cy + 1; y++) { try { if (SS.getSheetByName("Contributions_" + y)) out.push(y); } catch (e) {} } return out; }
function settings() { const p = props(); return { est: p.getProperty("set_est") || "\u09e6\u09e8 | \u09e8\u09e6\u09e8\u09eb", slogan: p.getProperty("set_slogan") || "\u0990\u0995\u09cd\u09af \u2022 \u09ac\u09bf\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u2022 \u0989\u09a8\u09cd\u09a8\u09af\u09bc\u09a8", msgr: p.getProperty("set_msgr") || "", year: curYear(), years: archYears(),
  mnt: mntOn() ? mntMsg() : null,
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
function payWhat(tg) { const i = MONTHS.indexOf(String(tg.mon).trim()), m = i >= 0 ? MONTHS_F[i] : "\u0986\u0997\u09c7\u09b0"; if (String(tg.type) === SPC_T) return SPC_T + (i >= 0 ? " (" + MONTHS_F[i] + ")" : ""); return String(tg.type) === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be" ? m + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be" : m + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be"; }
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
        payload: JSON.stringify({ message: { token: r[1], data: { title: String(it.msg.t), body: String(it.msg.b), url: String(it.msg.u || "home"), tag: String(it.msg.g || ((it.msg.k || "uif") + "-" + Date.now())) }, webpush: { headers: { Urgency: "high", TTL: "86400" } } } }) });
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
function pushFlush() { if (!PQ.length) return null; const l = PQ; PQ = []; nfSave(l); try { const r = pushSend(l); if (!r) return null; r.t = l[0].msg.t; r.b = l[0].msg.b; return r; } catch (e) { return { n: 0, p: 0, err: String(e.message || e) }; } }
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
  ScriptApp.newTrigger("weeklyBackup").timeBased().everyHours(1).create();
  const p = props(); p.setProperty("sched", "hourly"); p.setProperty("bk_auto", "1");
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
        b: (paid ? MONTHS_F[mo] + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be\u09b0 " + tk(paid) + " \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7, \u0986\u09b0\u0993 " + tk(due) + " \u09ac\u09be\u0995\u09bf\u0964 " : MONTHS_F[mo] + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be " + tk(due) + " \u09ac\u09be\u0995\u09bf\u0964 ") + (d === 5 ? "\u0986\u099c\u0995\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09a6\u09bf\u09b2\u09c7 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09b2\u09be\u0997\u09ac\u09c7 \u09a8\u09be\u0964" : "\u09eb \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09a6\u09bf\u09a8\u0964"), u: "pay", k: "due", g: "due-" + mo });
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
  const sc = props().getProperty("sched");
  if (sc === "hourly") {   // প্রতি ঘণ্টায়: পেন্ডিং রিমাইন্ডার; সকাল ১০টায় দৈনিক কাজ; শুক্রবার রাত ১১টায় ব্যাকআপ (বাংলাদেশ সময়)
    const H = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "H")), wd = Utilities.formatDate(new Date(), "Asia/Dhaka", "u");
    try { pendRun(); } catch (e) {}
    try { susRun(); } catch (e) {}
    try { invRemind(); } catch (e) {}
    try { if (props().getProperty("mig3a") === "1") { const lk = LockService.getScriptLock(); lk.waitLock(20000); try { if (jSync(null, { action: "auto_check" })) dropRS(); } finally { lk.releaseLock(); } } } catch (e) {}
    if (H === 10) { try { dailyRun(); } catch (e) {} try { loginPrune(); } catch (e) {} }
    if (wd === "5" && H === 23) return bkCopy();
    return {};
  }
  if (sc === "daily") {
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
  if (props().getProperty("sched") === "daily" || props().getProperty("sched") === "hourly") schedSetup();
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

function login(username, password, dev) {
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
      u.sh.getRange(u.row, 7).setValue("1");   // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 Sheet-\u098f \u09b2\u09bf\u0996\u09c7\u099b\u09c7\u09a8, \u09a4\u09be\u0987 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1
    }
  }
  if (u && u.off) return { ok: false, error: "disabled" };
  if (!good) { cache.put(ck, String(fails + 1), 600); return { ok: false, error: "wrong" }; }
  cache.remove(ck);
  const sus = susGet(u.username);
  if (sus) return { ok: false, error: "suspended", sus: { r: sus.r, until: susDay(sus.until) } };
  if (u.role !== "admin" && mntOn()) return { ok: false, error: "maint", maint: mntMsg() };
  if (u.role === "admin" && tfaOn(u)) {   // পাসওয়ার্ড ঠিক — এবার Authenticator কোড (৫ মিনিটের টিকিট)
    const tf = Utilities.getUuid().replace(/-/g, "");
    CacheService.getScriptCache().put("tf_" + tf, u.username + "|" + String(dev || "").slice(0, 80), 300);
    return { ok: false, need2fa: true, tf: tf };
  }
  return issueTok(u, dev);
}
function issueTok(u, dev) {
  const t = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "").slice(0, 12);
  pruneTokens(u.username, MAX_DEV - 1);   // একসাথে সর্বোচ্চ ২টি ডিভাইস: সবচেয়ে পুরোনোটা বের হয়ে যায়
  props().setProperty("t_" + t, tokStr(u.username, Date.now(), dev, now()));
  u.sh.getRange(u.row, 6).setValue(new Date());
  loginLog(u, "login", dev);
  return { ok: true, token: t, user: { name: u.name, username: u.username, role: u.role } };
}

function auth(token) {
  if (!token) return null;
  const p = props(), v = p.getProperty("t_" + token);
  if (!v) return null;
  const a = String(v).split("|"), un = a[0], ts = Number(a[1]) || 0, t = Date.now();
  const u = findUser(un);
  if (!u || u.off) { p.deleteProperty("t_" + token); return null; }
  if (susGet(un)) { p.deleteProperty("t_" + token); CacheService.getScriptCache().put("k_" + token, "s", 21600); return null; }
  // অব্যবহৃত থাকলে মেয়াদ শেষ: অ্যাডমিন ৭ দিন, অন্যরা ৩০ দিন
  if (ts && t - ts > (u.role === "admin" ? 7 : 30) * 864e5) { p.deleteProperty("t_" + token); return null; }
  if (!ts || t - ts > 864e5) p.setProperty("t_" + token, tokStr(un, t, a[2], a[3]));
  return u;
}

function touch(u, dev) {   // \u09b6\u09c7\u09b7 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc (\u09eb \u09ae\u09bf\u09a8\u09bf\u099f\u09c7 \u098f\u0995\u09ac\u09be\u09b0 \u09b2\u09c7\u0996\u09be \u09b9\u09af\u09bc)
  const last = u.last instanceof Date ? u.last.getTime() : 0;
  if (Date.now() - last > 300000) {
    // নতুন দিনে প্রথম ব্যবহার হলে একটি "use" সারি (দৈনিক সক্রিয় সদস্যের হিসাব)
    const day = function (x) { return Utilities.formatDate(new Date(x), "Asia/Dhaka", "yyyy-MM-dd"); };
    if (!last || day(last) !== day(Date.now())) loginLog(u, "use", dev);
    u.sh.getRange(u.row, 6).setValue(new Date());
  }
}

function dropTokens(username, kicked) {
  const p = props(), all = p.getProperties(), c = CacheService.getScriptCache();
  Object.keys(all).forEach(function (k) {
    if (k.indexOf("t_") === 0 && String(all[k]).split("|")[0] === username) {
      p.deleteProperty(k);
      if (kicked) c.put("k_" + k.slice(2), kicked === true ? "1" : String(kicked), 21600);
    }
  });
}
function pruneTokens(username, keep) {   // একজনের সবচেয়ে নতুন `keep`টি লগইন রেখে বাকিগুলো বের করে দেওয়া (বার্তা: অন্য ডিভাইসে লগইন)
  const p = props(), all = p.getProperties(), c = CacheService.getScriptCache(), mine = [];
  Object.keys(all).forEach(function (k) { if (k.indexOf("t_") === 0) { const a = String(all[k]).split("|"); if (a[0] === username) mine.push([k, Number(a[1]) || 0]); } });
  mine.sort(function (a, b) { return b[1] - a[1]; });
  mine.slice(Math.max(0, keep)).forEach(function (x) { p.deleteProperty(x[0]); c.put("k_" + x[0].slice(2), "1", 21600); });
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
// সদস্যের তথ্য: নাম, পূর্ণ নাম, পেশা, যোগদান, মাসিক চাঁদা সবাই দেখেন; বাকিটা শুধু নিজের, অ্যাডমিন ও মডারেটর (ক্যাশিয়ার মোবাইলও)
const MEM_PUBLIC = { 0: 1, 1: 1, 7: 1, 9: 1, 11: 1, 12: 1 };   // 9 = মোবাইল: সবাই দেখবে (সিয়ামের সিদ্ধান্ত, ১৯-১১-২০২৬)
function memFilter(list, u) {
  if (!u || u.role === "admin" || u.role === "moderator") return list;
  return (list || []).map(function (r) {
    if (String(r[0]).trim() === u.name) return r;
    return r.map(function (v, i) { return MEM_PUBLIC[i] || (i === 9 && u.role === "cashier") ? v : ""; });
  });
}
function dropRS() { try { CacheService.getScriptCache().remove("rs1"); } catch (e) {} }
function readAll(isAdmin, u, isMod) {
  const d = {};
  rulesSheet();
  const sh0 = readShared(); READ_SHEETS.forEach(function (n) { d[n] = sh0[n] || []; });
  d.Members = memFilter(d.Members, u);
  // \u09ad\u09cb\u099f: \u09b8\u09ac\u09be\u0987 \u09b6\u09c1\u09a7\u09c1 \u09ae\u09cb\u099f \u09b8\u0982\u0996\u09cd\u09af\u09be \u09a6\u09c7\u0996\u09ac\u09c7\u09a8; \u0995\u09c7 \u0995\u09c0 \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09c7\u09a8 \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8
  const vs = rows("Votes"), cnt = {}, mine = {};
  vs.forEach(function (r) { const id = String(r[0]), c = Number(r[3]); if (!cnt[id]) cnt[id] = []; cnt[id][c] = (cnt[id][c] || 0) + 1; if (u && String(r[1]) === u.username) mine[id] = c; });
  d.VoteCounts = cnt; d.MyVotes = mine;
  // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 \u0993 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0\u09c7\u09b0 \u09a8\u09be\u09ae (\u09a8\u09be\u09ae\u09c7\u09b0 \u09aa\u09be\u09b6\u09c7 \u099a\u09bf\u09b9\u09cd\u09a8\u09c7\u09b0 \u099c\u09a8\u09cd\u09af) \u2013 \u0985\u09a8\u09cd\u09af \u0995\u09cb\u09a8\u09cb \u09a4\u09a5\u09cd\u09af \u09a8\u09af\u09bc
  d.Roles = rows("Users").filter(function (r) { const x = roleOf(r[3]); return x !== "member"; }).map(function (r) { return [String(r[0]).trim(), roleOf(r[3])]; });
  if (isAdmin || isMod || (u && u.role === "cashier")) d.Votes = vs.map(function (r) { return [r[0], r[2], r[3], r[4]]; });
  d.Seen = seenList();
  if (isAdmin || (u && u.role === "cashier")) { try { d.RemSent = JSON.parse(props().getProperty("rem_log") || "{}") || {}; } catch (e) { d.RemSent = {}; } }
  if (isAdmin) { const p = props(); d.Backup = { last: p.getProperty("bk_last") || "", url: p.getProperty("bk_url") || "", auto: p.getProperty("bk_auto") === "1", n: Number(p.getProperty("bk_n") || 0) }; }
  try { const pp = props(), np = pp.getProperty("npf_" + (u ? u.username : "")); d.MyPush = { prefs: np ? JSON.parse(np) : {} };
    if (isAdmin) { const ps = SS.getSheetByName("Push"), pv = ps && ps.getLastRow() > 1 ? ps.getRange(2, 1, ps.getLastRow() - 1, 1).getDisplayValues().map(function (r) { return String(r[0]); }) : [];
      const tr = {}; pv.forEach(function (x) { tr[x] = (tr[x] || 0) + 1; });
      d.Push = { on: !!(pp.getProperty("fcm_cfg") && pp.getProperty("fcm_sa")), sa: !!pp.getProperty("fcm_sa"), sched: pp.getProperty("sched") === "daily", devices: pv.length, users: tr, cfg: JSON.parse(pp.getProperty("fcm_cfg") || "null"), vapid: pp.getProperty("fcm_vapid") || "" }; } } catch (e) {}
  if (isAdmin || isMod || (u && u.role === "cashier")) { try { d.Acc = jView(); } catch (e) { d.Acc = null; } }
  if (isAdmin) d.Logins = loginRows(30);
  d.Notifs = nfList(u);
  if (isAdmin && u) { const tf = tfaGet(u.username); d.Tfa = { on: !!tf.on, bk: (tf.bk || []).length, at: tf.at || "" }; }
  if (isAdmin) { const ap = props().getProperties(), nd = {};
    Object.keys(ap).forEach(function (k) { if (k.indexOf("t_") === 0) { const x = String(ap[k]).split("|")[0]; nd[x] = (nd[x] || 0) + 1; } });
    d.Users = rows("Users").map(function (r) { const un = String(r[1]).trim().toLowerCase(), sv = susGet(un);
      return [r[0], r[1], r[3], r[4], r[5], String(r[6] || "").trim() ? "1" : "", sv ? { r: sv.r, until: susDay(sv.until), by: sv.by } : "", nd[un] || 0, tfaGet(un).on ? 1 : 0]; }); } // \u09b8\u0982\u0995\u09c7\u09a4\u09be\u09af\u09bc\u09bf\u09a4 \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u0996\u09a8\u09cb \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc \u09a8\u09be; \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 (G)
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
      if (!q.active) dropTokens(u.username, "r");
      return {};
    }
    /* ----- সংস্করণ 2A: ডিভাইস, স্থগিত, রক্ষণাবেক্ষণ ----- */
    case "sess_kill": return sessKill(String(q.username || "").trim().toLowerCase(), String(q.id || ""));
    case "sus_set": return susSet(q, u);
    case "sus_lift": return susLift(String(q.username || "").trim().toLowerCase(), u.name, "হাতে চালু");
    case "maint_set": return mntSet(q, u);
    /* ----- \u09b8\u09a6\u09b8\u09cd\u09af ----- */
    case "mem_add": {
      const name = String(q.name || "").trim(), sh = sheet("Contributions");
      if (!name) throw new Error("\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      if (memberExists(name)) throw new Error("\u098f\u0987 \u09a8\u09be\u09ae\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af \u0986\u0997\u09c7\u0987 \u0986\u099b\u09c7");
      const sr = Number(q.shares); if (!(sr > 0)) throw new Error("\u09a8\u09be\u09ae \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      const row = [name, sr]; for (let i = 0; i < 12; i++) row.push(""); row.push("");
      sh.appendRow(row); midAssign(name); return {};
    }
    case "mem_edit": {
      const sh = sheet("Contributions"), r = checkRow(sh, q.row, q.key), name = String(q.name || "").trim(), old = String(q.key).trim();
      if (!name) throw new Error("\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      const sr = Number(q.shares); if (!(sr > 0)) throw new Error("\u09a8\u09be\u09ae \u09b8\u0982\u0996\u09cd\u09af\u09be \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      if (name !== old && memberExists(name)) throw new Error("\u098f\u0987 \u09a8\u09be\u09ae\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af \u0986\u0997\u09c7\u0987 \u0986\u099b\u09c7");
      sh.getRange(r, 1, 1, 2).setValues([[name, sr]]);
      if (name !== old) { renameEverywhere(old, name); midRename(old, name); }
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
      if (pw.length < 6) throw new Error("\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09ec \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
      const salt = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
      sheet("Users").appendRow([name, un, "sha256$" + salt + "$" + hash(salt, pw), "member", "\u099a\u09be\u09b2\u09c1", "", "1"]);
      return {};
    }
    case "user_pass": {
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const pw = String(q.password || ""); if (pw.length < 6) throw new Error("\u09aa\u09be\u09b8\u0993\u09af\u09bc\u09be\u09b0\u09cd\u09a1 \u0995\u09ae\u09aa\u0995\u09cd\u09b7\u09c7 \u09ec \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7");
      const salt = Utilities.getUuid().replace(/-/g, "").slice(0, 10);
      u.sh.getRange(u.row, 3).setValue("sha256$" + salt + "$" + hash(salt, pw));
      u.sh.getRange(u.row, 7).setValue("1");   // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u2013 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8 \u09af\u09a4\u0995\u09cd\u09b7\u09a3 \u09b8\u09a6\u09b8\u09cd\u09af \u09a8\u09bf\u099c\u09c7 \u09a8\u09be \u09ac\u09a6\u09b2\u09be\u09a8
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
      const cv = copy("Contributions"), fv = copy("Fines") || [], spv = copy("Special") || [];
      if (pay) copy("Payments");
      const n = function (x) { return Number(String(x).replace(/[^0-9.]/g, "")) || 0; };
      let c = 0; cv.slice(1).forEach(function (r) { for (let i = 2; i < 14; i++) c += n(r[i]); });
      let fp = 0; fv.slice(1).forEach(function (r) { if (String(r[2]).trim() === "paid") fp += n(r[1]); });
      let sp = 0; spv.slice(1).forEach(function (r) { if (String(r[0]).trim()) sp += n(r[3]); });
      fp += sp;   // বিশেষ চাঁদাও পূর্ববর্তী তহবিলে যায়
      const ss0 = SS.getSheetByName("Special"); if (ss0 && ss0.getLastRow() > 1) ss0.deleteRows(2, ss0.getLastRow() - 1);
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
        fs.appendRow([nm, Math.round(sr * 200), "due", MONTHS[m], newId2("F")]); added++;
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
      sh.getRange(r, 1, 1, 11).setNumberFormat("@");
      sh.getRange(r, 1, 1, 11).setValues([[id, String(q.date || ""), type, String(q.cat || "").slice(0, 60), String(amt), from, to, String(q.note || "").slice(0, 200), u ? u.name : "", now(), type === "in" ? String(q.inv || "").slice(0, 30) : ""]]);
      if (sh.getRange(1, 11).getDisplayValue() === "") sh.getRange(1, 11).setValue("বিনিয়োগ আইডি");
      return { id: id };
    }
    case "led_void": { const why = needReason(q), sh = sheet("Ledger"), p = findById(sh, q.id); q.cat = p.r[3]; q.amount = p.r[4]; voidRow(sh, p.row, "Ledger", q.id, u, why); return {}; }
    /* ----- বিশেষ চাঁদা (Phase 3A) ----- */
    case "spc_add": {
      const member = String(q.member || "").trim(); if (!memberExists(member)) throw new Error("সদস্য পাওয়া যায়নি");
      const amt = money(q.amount); const m = Number(q.month), mon = q.month !== "" && q.month != null && m >= 0 && m < 12 ? MONTHS[m] : "";
      return { id: spcAdd(member, amt, mon, String(q.date || ""), String(q.note || ""), u.name, "অ্যাপ") };
    }
    case "spc_void": { const why = needReason(q), sh = spcSheet(), p = findById(sh, q.id); q.member = p.r[2]; q.amount = p.r[3]; voidRow(sh, p.row, "Special", q.id, u, why); return {}; }
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
        const amt = money(q.amount, true); sh.getRange(i + 2, 3 + m).setValue(amt ? amt : ""); return {};
      }
      throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
    }

    case "fine_add": { if (!memberExists(q.member)) throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf"); sheet("Fines").appendRow([String(q.member), money(q.amount), q.status === "paid" ? "paid" : "due", monthLabel(q.month), newId2("F")]); return {}; }
    case "fine_edit": {
      const sh = sheet("Fines"), r = checkRow(sh, q.row, q.key);
      sh.getRange(r, 1, 1, 4).setValues([[String(q.member), money(q.amount), q.status === "paid" ? "paid" : "due", monthLabel(q.month)]]);
      return {};
    }
    case "fine_void": { const why = needReason(q), sh = sheet("Fines"), r = checkRow(sh, q.row, q.key), x = sh.getRange(r, 1, 1, 5).getDisplayValues()[0]; q.member = x[0]; q.amount = x[1]; q.fineMonth = x[3]; voidRow(sh, r, "Fines", x[4], u, why); return {}; }

    case "inv_add": sheet("Investments").appendRow([String(q.sector), money(q.amount), String(q.date || ""), money(q.current, true), String(q.note || ""), newId2("I"),
      String(q.owner || "").slice(0, 60), String(q.land || "").slice(0, 40), invDate(q.until), ""]);
      { const sh = sheet("Investments"), r = sh.getLastRow(), x = sh.getRange(r, 1, 1, 6).getDisplayValues()[0];
        if (money(q.current, true) > 0) { sh.getRange(r, 11).setNumberFormat("@"); sh.getRange(r, 11).setValue(ivToday()); ivAdd(x[5], ivToday(), money(q.current, true), u); } }
      return {};
    case "inv_edit": {
      const sh = sheet("Investments"), r = checkRow(sh, q.row, q.key), old = sh.getRange(r, 1, 1, 6).getDisplayValues()[0];
      if (money(q.current, true) !== Math.round(Number(sh.getRange(r, 4).getValue()) || 0)) { sh.getRange(r, 11).setNumberFormat("@"); sh.getRange(r, 11).setValue(ivToday()); ivAdd(old[5], ivToday(), money(q.current, true), u); }
      sh.getRange(r, 1, 1, 5).setValues([[String(q.sector), money(q.amount), String(q.date || ""), money(q.current, true), String(q.note || "")]]);
      sh.getRange(r, 7, 1, 3).setNumberFormat("@");
      sh.getRange(r, 7, 1, 3).setValues([[String(q.owner || "").slice(0, 60), String(q.land || "").slice(0, 40), invDate(q.until)]]);
      return {};
    }
    case "inv_val": {   // শুধু বর্তমান মূল্য হালনাগাদ (হিসাবে ধরা হয় না, শুধু দেখানো)
      const sh = sheet("Investments"), r = checkRow(sh, q.row, q.key), x = sh.getRange(r, 1, 1, 6).getDisplayValues()[0];
      const v = money(q.current), d = invDate(q.date) || ivToday();
      q.sector = x[0]; q.before = x[3];
      sh.getRange(r, 4).setValue(v); sh.getRange(r, 11).setNumberFormat("@"); sh.getRange(r, 11).setValue(d);
      ivAdd(x[5], d, v, u); return {};
    }
    case "inv_ret": {   // জমি ফেরত / গিরবি শেষ: মূলধন নগদে ফেরত আসে (undo দিলে আবার চালু)
      const sh = sheet("Investments"), r = checkRow(sh, q.row, q.key), x = sh.getRange(r, 1, 1, 10).getDisplayValues()[0];
      q.sector = x[0]; q.amount = x[1];
      if (q.undo) { if (!/^ফেরত/.test(x[9])) throw new Error("এটি ফেরত চিহ্নিত নয়"); sh.getRange(r, 10).setValue(""); q._jd = "আবার চালু"; return {}; }
      if (/^ফেরত/.test(x[9])) throw new Error("আগেই ফেরত চিহ্নিত");
      const d = invDate(q.date) || Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy");
      sh.getRange(r, 10).setNumberFormat("@"); sh.getRange(r, 10).setValue("ফেরত " + d); q._jd = "মূলধন নগদে ফেরত (" + d + ")";
      return {};
    }
    case "inv_void": { const why = needReason(q), sh = sheet("Investments"), r = checkRow(sh, q.row, q.key), x = sh.getRange(r, 1, 1, 6).getDisplayValues()[0]; q.sector = x[0]; q.amount = x[1]; voidRow(sh, r, "Investments", x[5], u, why); return {}; }
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
  if (type === SPC_T) {   // বিশেষ চাঁদা: Special শিটে সারি যোগ / সিদ্ধান্ত বদলালে বাতিল
    const src = "পেমেন্ট " + String(r[0]);
    if (sign > 0) { spcAdd(name, amt, mon, String(r[5] || ""), String(r[8] || "").replace(/^'/, ""), String(r[10] || ""), src); return; }
    const sh = SS.getSheetByName("Special"); if (!sh) return; const v = sh.getDataRange().getDisplayValues();
    for (let i = v.length - 1; i >= 1; i--) if (String(v[i][8]) === src) { voidRow(sh, i + 1, "Special", v[i][0], null, "পেমেন্টের সিদ্ধান্ত বদল / বাতিল (" + String(r[0]) + ")"); return; }
    return;
  }
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
function payTarget(q) {
  if (q.type === "special") { const m = Number(q.month); return { type: SPC_T, mon: q.month !== "" && q.month != null && m >= 0 && m < 12 ? MONTHS[m] : "" }; }   // \u09ae\u09be\u09b8 \u09ac\u09be \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be \u09af\u09be\u099a\u09be\u0987
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
    case "pay_del": {      // শুধু অ্যাডমিন – Phase 3A: মোছা নয়, কারণসহ "বাতিল" (জমা হয়ে থাকলে হিসাব থেকে উল্টো ভাউচার)
      if (u.role !== "admin") throw new Error("শুধু অ্যাডমিন");
      const why = needReason(q), p = findPay(sh, q.id);
      if (p.r[9] === ST.c) throw new Error("আগেই বাতিল করা হয়েছে");
      if (p.r[9] === ST.a) applyPay(p.r, -1);
      q.member = p.r[2]; q.amount = p.r[4];
      sh.getRange(p.row, 10, 1, 4).setValues([[ST.c, u.name, now(), (p.r[12] ? p.r[12] + "\n" : "") + now() + " " + u.name + ": " + ST.c + " (কারণ: " + why + ")"]]);
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


/* ---------- সংস্করণ 1A: সাহায্যকারী ফাংশন ---------- */
function money(x, allowZero) {   // টাকা: সংখ্যা, ঋণাত্মক নয়
  const n = Math.round(Number(x));
  if (!isFinite(n) || n < 0 || (!allowZero && n === 0)) throw new Error("টাকার পরিমাণ সঠিক নয় (০-এর বেশি লিখুন)");
  return n;
}
function newId2(p) { return p + Date.now().toString(36).toUpperCase() + Utilities.getUuid().replace(/-/g, "").slice(0, 4).toUpperCase(); }

// MemberIDs শিট: A আইডি | B বর্তমান নাম | C আগের নাম (; দিয়ে) | D যোগ হয়েছে
const MID_ALIAS = { "প্রিন্স জাহিদ": "জাহিদ হাসান" };   // একই ব্যক্তি (সিয়াম নিশ্চিত করেছেন, ১৮-১১-২০২৬)
function midSheet() { return mkSheet("MemberIDs", ["আইডি", "বর্তমান নাম", "আগের নাম", "যোগ হয়েছে"]); }
function midRows() { const sh = midSheet(); return sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues() : []; }
function midFind(v, name) {
  name = String(name).trim();
  for (let i = 0; i < v.length; i++) {
    if (String(v[i][1]).trim() === name) return i;
    if (String(v[i][2]).split(";").map(function (x) { return x.trim(); }).indexOf(name) >= 0) return i;
  }
  return -1;
}
function midNext(v) { let mx = 0; v.forEach(function (r) { const n = Number(String(r[0]).replace(/\D/g, "")) || 0; if (n > mx) mx = n; }); return "M-" + String(mx + 1).padStart(2, "0"); }
function midAssign(name, old) {
  name = String(name || "").trim(); if (!name || name.charAt(0) === "※") return;
  const sh = midSheet(), v = midRows();
  if (midFind(v, name) >= 0 || (old && midFind(v, old) >= 0)) return;
  const r = sh.getLastRow() + 1; sh.getRange(r, 1, 1, 4).setNumberFormat("@");
  sh.getRange(r, 1, 1, 4).setValues([[midNext(v), name, old || "", now()]]);
}
function midRename(old, name) {
  const sh = midSheet(), v = midRows(), i = midFind(v, old); if (i < 0) { midAssign(name); return; }
  const al = String(v[i][2] || "").split(";").map(function (x) { return x.trim(); }).filter(Boolean);
  if (al.indexOf(old) < 0) al.push(old);
  sh.getRange(i + 2, 2, 1, 2).setValues([[name, al.join("; ")]]);
}
function midSync() {   // পুরোনো বছর থেকে শুরু করে সবাইকে আইডি দেওয়া (যাঁদের নেই)
  const names = [];
  archYears().forEach(function (y) { rows("Contributions_" + y).forEach(function (r) { names.push(String(r[0]).trim()); }); });
  rows("Contributions").forEach(function (r) { names.push(String(r[0]).trim()); });
  names.forEach(function (n) {
    if (!n || n.charAt(0) === "※") return;
    const cur = MID_ALIAS[n] || n;
    if (cur !== n) { midAssign(cur, n); const v = midRows(), i = midFind(v, cur); if (i >= 0 && midFind(v, n) < 0) { const sh = midSheet(); sh.getRange(i + 2, 3).setValue([String(v[i][2] || ""), n].filter(Boolean).join("; ")); } }
    else midAssign(n);
  });
}
function idCol(name, col, p) {   // আইডি কলাম যোগ (যে সারিতে নেই)
  const sh = SS.getSheetByName(name); if (!sh) return;
  if (!String(sh.getRange(1, col).getDisplayValue()).trim()) sh.getRange(1, col).setValue("আইডি");
  if (sh.getLastRow() < 2) return;
  const n = sh.getLastRow() - 1, a = sh.getRange(2, 1, n, 1).getDisplayValues(), rg = sh.getRange(2, col, n, 1), v = rg.getDisplayValues();
  let ch = false; v.forEach(function (r, i) { if (String(a[i][0]).trim() && !String(r[0]).trim()) { r[0] = newId2(p); ch = true; } });
  if (ch) { rg.setNumberFormat("@"); rg.setValues(v); }
}
function migrate1a() {   // প্রথম অনুরোধে একবার চলে; আবার চালালেও ক্ষতি নেই
  const p = props(); if (p.getProperty("mig") === "1a") return;
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    if (p.getProperty("mig") === "1a") return;
    const us = SS.getSheetByName("Users");
    if (us) {
      us.getRange(1, 7).setValue("পাসওয়ার্ড বদলানো বাকি (1 = হ্যাঁ)");
      if (us.getLastRow() > 1) { const rg = us.getRange(2, 7, us.getLastRow() - 1, 1), v = rg.getValues(); v.forEach(function (r) { if (String(r[0]).trim()) r[0] = "1"; }); rg.setValues(v); }
    }
    midSync();
    idCol("Fines", 5, "F"); idCol("Investments", 6, "I");
    p.setProperty("mig", "1a");
    try { logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_1a" }); } catch (e) {}
    dropRS();
  } finally { lock.releaseLock(); }
}


/* ---------- সংস্করণ 1B-১ ---------- */
// Logins শিট: A সময় | B ইউজারনেম | C নাম | D ধরন (login/use) | E ডিভাইস
function loginSheet() { return mkSheet("Logins", ["সময়", "ইউজারনেম", "নাম", "ধরন", "ডিভাইস"]); }
function loginLog(u, kind, dev) {
  try {
    const sh = loginSheet(), r = sh.getLastRow() + 1;
    sh.getRange(r, 1, 1, 5).setNumberFormat("@");
    sh.getRange(r, 1, 1, 5).setValues([[now(), u.username, u.name, kind, String(dev || "").replace(/[=+@\-]/, "").slice(0, 40)]]);
  } catch (e) {}
}
function bdTime(s) {   // "dd-MM-yyyy HH:mm" (বাংলাদেশ সময়) → মিলিসেকেন্ড
  const m = String(s || "").match(/(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{1,2}):(\d{2})/);
  return m ? Date.UTC(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]) - 6 * 36e5 : 0;
}
function loginRows(days) {
  const sh = SS.getSheetByName("Logins"); if (!sh || sh.getLastRow() < 2) return [];
  const lim = Date.now() - days * 864e5, n = Math.min(sh.getLastRow() - 1, 3000);
  return sh.getRange(sh.getLastRow() - n + 1, 1, n, 5).getDisplayValues().filter(function (r) { return bdTime(r[0]) >= lim; });
}
function loginPrune() {   // ৯০ দিনের পুরোনো সারি মুছে ফেলা
  const sh = SS.getSheetByName("Logins"); if (!sh || sh.getLastRow() < 2) return;
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues(), lim = Date.now() - 90 * 864e5;
  let k = 0; while (k < v.length && bdTime(v[k][0]) && bdTime(v[k][0]) < lim) k++;
  if (k) sh.deleteRows(2, k);
}
// পেন্ডিং রিকোয়েস্ট: যত পুরোনো ও যত বেশি, তত ঘন ঘন ক্যাশিয়ার ও অ্যাডমিনকে মনে করানো।
// একটাই নোটিফিকেশন (g: "pend") — নতুনটি পুরোনোটার জায়গা নেয়, স্তূপ হয় না। রাত ১১টা–সকাল ৯টা চুপ।
function pendGap(n, ageH) {   // ঘণ্টা; 0 = এখন নয়
  if (ageH < 6) return 0;
  let g = ageH < 24 ? 12 : ageH < 72 ? 6 : ageH < 168 ? 3 : 2;
  if (n >= 5) g = Math.min(g, 3);
  return g;
}
function pendRun() {
  const p = props(), sh = SS.getSheetByName("Payments");
  const v = sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 10).getDisplayValues().filter(function (r) { return r[9] === ST.p; }) : [];
  if (!v.length || !cashOn()) { p.deleteProperty("pend_last"); return { n: 0 }; }
  const H = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "H")); if (H < 9 || H >= 23) return { quiet: 1 };
  const old = Math.min.apply(null, v.map(function (r) { return bdTime(r[1]) || Date.now(); })), ageH = (Date.now() - old) / 36e5, n = v.length, g = pendGap(n, ageH);
  if (!g) return { n: n, wait: 1 };
  const last = Number(p.getProperty("pend_last") || 0);
  if (Date.now() - last < g * 36e5 - 300000) return { n: n, skip: 1 };
  const age = ageH < 24 ? bnNum(Math.floor(ageH)) + " ঘণ্টা" : bnNum(Math.floor(ageH / 24)) + " দিন";
  pushQ(staffUsers(), { t: (ageH >= 72 ? "🔴 " : "⏳ ") + bnNum(n) + "টি টাকার রিকোয়েস্ট অপেক্ষায়", b: "সবচেয়ে পুরোনোটি " + age + " ধরে পেন্ডিং। যাচাই করে \"জমা হয়েছে\" বা \"হয়নি\" দিন।", u: "cash", k: "req", g: "pend" });
  const r = pushFlush(); p.setProperty("pend_last", String(Date.now()));
  return { n: n, sent: r };
}
function migrate1b() {   // প্রথম অনুরোধে একবার: সময়সূচি প্রতি ঘণ্টায় (আগে থেকে চালু থাকলে)
  const p = props(); if (p.getProperty("mig1b") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    if (p.getProperty("mig1b") === "1") return;
    let ok = "skip";
    try { if (ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === "weeklyBackup"; })) { schedSetup(); ok = "hourly"; } } catch (e) { ok = "err: " + (e.message || e); }
    loginSheet();
    p.setProperty("mig1b", "1");
    try { logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_1b", sched: ok }); } catch (e) {}
  } finally { lock.releaseLock(); }
}

/* ---------- সংস্করণ 2A ---------- */
const MAX_DEV = 2;   // একজন সদস্য একসাথে সর্বোচ্চ কয়টি ডিভাইসে লগইন থাকবেন
// টোকেন: t_<token> = ইউজারনেম | শেষ ব্যবহার (ms) | ডিভাইস | লগইনের সময়
function tokStr(un, ts, dev, at) { return [un, ts, String(dev || "").replace(/\|/g, " ").slice(0, 40), String(at || "")].join("|"); }
function sessId(k) { return hash("s", k).slice(0, 12); }   // আসল টোকেন কখনো পাঠানো হয় না
function sessList(username) {
  const all = props().getProperties(), out = [];
  Object.keys(all).forEach(function (k) {
    if (k.indexOf("t_") !== 0) return;
    const a = String(all[k]).split("|"); if (a[0] !== username) return;
    out.push({ id: sessId(k), dev: a[2] || "", at: a[3] || "", last: Number(a[1]) || 0 });
  });
  out.sort(function (a, b) { return b.last - a.last; });
  out.forEach(function (x) { x.last = x.last ? Utilities.formatDate(new Date(x.last), "Asia/Dhaka", "dd-MM-yyyy HH:mm") : ""; });
  return out;
}
function sessKill(username, id) {   // id = "all" হলে সব ডিভাইস
  if (!findUser(username)) throw new Error("ব্যবহারকারী পাওয়া যায়নি");
  if (id === "all") { dropTokens(username, "r"); return {}; }
  const p = props(), all = p.getProperties(), c = CacheService.getScriptCache();
  let n = 0;
  Object.keys(all).forEach(function (k) {
    if (k.indexOf("t_") === 0 && String(all[k]).split("|")[0] === username && sessId(k) === id) { p.deleteProperty(k); c.put("k_" + k.slice(2), "r", 21600); n++; }
  });
  if (!n) throw new Error("এই ডিভাইস আগেই বের হয়ে গেছে, রিফ্রেশ করুন");
  return {};
}

// সাময়িক স্থগিত: চলতি অবস্থা props-এ (sus_<username>), ইতিহাস "Suspensions" শিটে
// Suspensions শিট: A সময় | B ইউজারনেম | C নাম | D কারণ | E শেষ তারিখ | F কে দিলেন | G অবস্থা | H চালু হলো
const SUS_HEAD = ["সময়", "ইউজারনেম", "নাম", "কারণ", "শেষ তারিখ", "কে দিলেন", "অবস্থা", "চালু হলো"];
function susSheet() { return mkSheet("Suspensions", SUS_HEAD); }
function susDay(ms) { return Utilities.formatDate(new Date(Number(ms) - 60000), "Asia/Dhaka", "dd-MM-yyyy"); }   // স্থগিতের শেষ দিন
function susGet(username) {   // চলতি স্থগিত থাকলে {r, until, by}; সময় পার হলে নিজে থেকে চালু
  const v = props().getProperty("sus_" + username); if (!v) return null;
  let o; try { o = JSON.parse(v); } catch (e) { return null; }
  if (Date.now() >= Number(o.until)) { try { susLift(username, "সিস্টেম", "সময় শেষে নিজে থেকে চালু"); } catch (e) {} return null; }
  return o;
}
function susSet(q, by) {
  const un = String(q.username || "").trim().toLowerCase(), u = findUser(un);
  if (!u) throw new Error("ব্যবহারকারী পাওয়া যায়নি");
  if (u.role === "admin") throw new Error("অ্যাডমিনকে স্থগিত করা যাবে না");
  const reason = String(q.reason || "").replace(/^[=+@\-]+/, "").trim().slice(0, 200);
  if (!reason) throw new Error("কারণ লিখুন");
  const m = String(q.until || "").match(/^(\d{4})-(\d{2})-(\d{2})$/); if (!m) throw new Error("শেষ তারিখ দিন");
  const until = Date.UTC(+m[1], +m[2] - 1, +m[3], 24, 0) - 6 * 36e5;   // ওই দিনের শেষে (বাংলাদেশ সময়) চালু
  if (until <= Date.now()) throw new Error("শেষ তারিখ আজ বা পরের কোনো দিন হতে হবে");
  if (until - Date.now() > 366 * 864e5) throw new Error("সর্বোচ্চ ১ বছরের জন্য স্থগিত করা যায়");
  if (props().getProperty("sus_" + un)) susLift(un, by.name, "নতুন স্থগিতে বদল");
  const sh = susSheet(), r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, 8).setNumberFormat("@");
  sh.getRange(r, 1, 1, 8).setValues([[now(), un, u.name, reason, susDay(until), by.name, "চলছে", ""]]);
  props().setProperty("sus_" + un, JSON.stringify({ r: reason, until: until, by: by.name, row: r }));
  dropTokens(un, "s");
  return {};
}
function susLift(username, byName, how) {
  const p = props(), v = p.getProperty("sus_" + username); if (!v) throw new Error("এই সদস্য স্থগিত নেই");
  let o = {}; try { o = JSON.parse(v); } catch (e) {}
  p.deleteProperty("sus_" + username);
  const sh = SS.getSheetByName("Suspensions");
  if (sh && sh.getLastRow() > 1) {
    const vals = sh.getRange(2, 1, sh.getLastRow() - 1, 7).getDisplayValues();
    for (let i = vals.length - 1; i >= 0; i--) if (vals[i][1] === username && vals[i][6] === "চলছে") {
      sh.getRange(i + 2, 7, 1, 2).setNumberFormat("@");
      sh.getRange(i + 2, 7, 1, 2).setValues([[how, now() + " (" + byName + ")"]]); break;
    }
  }
  if (byName === "সিস্টেম") logAct({ name: "সিস্টেম", role: "system" }, { action: "sus_auto", username: username });
  return {};
}
function susRun() {   // প্রতি ঘণ্টায়: মেয়াদ শেষ হওয়া স্থগিত চালু
  const all = props().getProperties();
  Object.keys(all).forEach(function (k) { if (k.indexOf("sus_") === 0) susGet(k.slice(4)); });
}

// রক্ষণাবেক্ষণ (Maintenance): চালু থাকলে শুধু অ্যাডমিন ঢুকতে পারেন
const MNT_BN = "অ্যাপের রক্ষণাবেক্ষণের কাজ চলছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
const MNT_EN = "The app is under maintenance. Please try again a little later.";
function mntOn() { return props().getProperty("mnt_on") === "1"; }
function mntMsg() { const p = props(); return { bn: p.getProperty("mnt_bn") || MNT_BN, en: p.getProperty("mnt_en") || MNT_EN, at: p.getProperty("mnt_at") || "" }; }
function mntSet(q) {
  const p = props(), clean = function (x) { return String(x || "").replace(/^[=+@\-]+/, "").trim().slice(0, 300); };
  if (q.on) {
    p.setProperty("mnt_bn", clean(q.bn) || MNT_BN); p.setProperty("mnt_en", clean(q.en) || MNT_EN);
    p.setProperty("mnt_at", now()); p.setProperty("mnt_on", "1");
  } else p.deleteProperty("mnt_on");
  return {};
}

function migrate2a() {   // প্রথম অনুরোধে একবার
  const p = props(); if (p.getProperty("mig2a") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    if (p.getProperty("mig2a") === "1") return;
    susSheet();
    p.setProperty("mig2a", "1");
    try { logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_2a", ver: UIF_VER }); } catch (e) {}
  } finally { lock.releaseLock(); }
}

/* ===================== Phase 3A: হিসাব খাতা (Double-Entry Journal) =====================
 * ক্যাশিয়ার/অ্যাডমিন আগের মতোই সহজ entry দেন। প্রতিটি টাকার কাজের পর jSync() শিটগুলোর
 * বর্তমান অবস্থা থেকে প্রতিটি খাতের ব্যালান্স হিসাব করে, Journal-এর সঙ্গে পার্থক্যটুকু
 * Debit/Credit ভাউচার হিসেবে লেখে। নগদ খাত = বাকি সব খাতের ভারসাম্য, তাই প্রতিটি ভাউচার সবসময় সমান।
 * Journal থেকে কিছু মোছা হয় না; ভুল হলে উল্টো ভাউচার পড়ে। শিটে কেউ সরাসরি বদলালে প্রতি ঘণ্টার যাচাইয়ে ধরা পড়ে। */
const ACC = [   // কোড | নাম | স্বাভাবিক দিক (D = ডেবিট, C = ক্রেডিট)
  ["1100", "নগদ (ক্যাশিয়ারের হাতে)", "D"],
  ["1200", "বিনিয়োগ (গিরবি ইত্যাদি)", "D"],
  ["2100", "জিসানের সঞ্চয় (দায়)", "C"],
  ["3100", "পূর্ববর্তী বছরের তহবিল", "C"],
  ["4100", "নিয়মিত চাঁদা", "C"],
  ["4200", "বিশেষ চাঁদা", "C"],
  ["4300", "জরিমানা", "C"],
  ["4400", "বিনিয়োগের লাভ", "C"],
  ["4900", "অন্যান্য আয়", "C"],
  ["5100", "ব্যাংক ট্যাক্স", "D"],
  ["5200", "সেচ খরচ", "D"],
  ["5900", "অন্যান্য ব্যয়", "D"]
];
const J_HEAD = ["ভাউচার", "সময়", "হিসাব কোড", "হিসাবের নাম", "ডেবিট", "ক্রেডিট", "বিবরণ", "কাজ", "কে"];
const SPC_HEAD = ["আইডি", "তারিখ", "সদস্য", "টাকা", "মাস", "বিবরণ", "কে লিখেছেন", "সময়", "সূত্র"];
const VOID_HEAD = ["সময়", "শিট", "আইডি", "কে বাতিল করলেন", "কারণ", "মূল সারি"];
const SPC_T = "বিশেষ চাঁদা";
// এই কাজগুলোর পর Journal মেলানো হয়
const FIN_ACT = { contrib_set: 1, fine_add: 1, fine_edit: 1, fine_void: 1, inv_add: 1, inv_edit: 1, inv_void: 1, inv_ret: 1, sum_set: 1, led_add: 1, led_void: 1,
  spc_add: 1, spc_void: 1, year_close: 1, pay_cash: 1, pay_set: 1, pay_del: 1, mem_add: 1, mem_edit: 1 };
const J_ACT = { contrib_set: "চাঁদা এন্ট্রি", pay_cash: "ক্যাশ জমা", pay_set: "টাকার রিকোয়েস্ট যাচাই", pay_del: "রিকোয়েস্ট বাতিল (অ্যাডমিন)",
  fine_add: "জরিমানা যোগ", fine_edit: "জরিমানা সংশোধন", fine_void: "জরিমানা বাতিল", inv_add: "বিনিয়োগ যোগ", inv_edit: "বিনিয়োগ সংশোধন", inv_void: "বিনিয়োগ বাতিল", inv_ret: "গিরবি/বিনিয়োগ ফেরত",
  sum_set: "সারসংক্ষেপের অঙ্ক বদল", led_add: "আয়-ব্যয় এন্ট্রি", led_void: "আয়-ব্যয় বাতিল", spc_add: "বিশেষ চাঁদা যোগ", spc_void: "বিশেষ চাঁদা বাতিল",
  year_close: "বছর শেষে হিসাব বন্ধ (আয় → তহবিল)", migrate_3a: "প্রারম্ভিক ব্যালান্স (Phase 3A)", auto_check: "শিটে সরাসরি বদল ধরা পড়েছে", mem_add: "নতুন সদস্য", mem_edit: "সদস্যের তথ্য বদল" };
function nnum(x) { return Number(String(x == null ? "" : x).replace(/[^0-9.]/g, "")) || 0; }
function jSheet() {
  let sh = SS.getSheetByName("Journal");
  if (!sh) { sh = mkSheet("Journal", J_HEAD); sh.setFrozenRows(1); try { sh.protect().setDescription("UIF Journal — হাতে বদলাবেন না").setWarningOnly(true); } catch (e) {} }
  return sh;
}
function spcSheet() { const had = !!SS.getSheetByName("Special"), sh = mkSheet("Special", SPC_HEAD); if (!had) sh.setFrozenRows(1); return sh; }
function voidSheet() {
  let sh = SS.getSheetByName("Voided");
  if (!sh) { sh = mkSheet("Voided", VOID_HEAD); sh.setFrozenRows(1); try { sh.protect().setDescription("UIF বাতিল রেকর্ড — হাতে বদলাবেন না").setWarningOnly(true); } catch (e) {} }
  return sh;
}
function needReason(q) { const s = String(q.reason || "").trim(); if (s.length < 3) throw new Error("বাতিলের কারণ লিখুন (কমপক্ষে ৩ অক্ষর)"); return s.slice(0, 200); }
// সারিটি "Voided" শিটে কারণসহ রেখে মূল শিট থেকে সরানো (রেকর্ড হারায় না, হিসাবে উল্টো ভাউচার পড়ে)
function voidRow(sh, row, name, id, u, reason) {
  const vals = sh.getRange(row, 1, 1, Math.max(sh.getLastColumn(), 1)).getDisplayValues()[0], vs = voidSheet(), r = vs.getLastRow() + 1;
  vs.getRange(r, 1, 1, 6).setNumberFormat("@");
  vs.getRange(r, 1, 1, 6).setValues([[now(), name, String(id || ""), u ? u.name : "সিস্টেম", reason, JSON.stringify(vals)]]);
  sh.deleteRow(row);
}
// শিটগুলোর বর্তমান অবস্থা থেকে প্রতিটি খাতের ব্যালান্স (স্বাভাবিক দিকে ধনাত্মক)
function jState() {
  const b = {}; ACC.forEach(function (a) { b[a[0]] = 0; });
  rows("Contributions").forEach(function (r) { const nm = String(r[0]).trim(); if (!nm || nm.charAt(0) === "※") return; for (let i = 2; i < 14; i++) b["4100"] += nnum(r[i]); });
  rows("Special").forEach(function (r) { if (String(r[0]).trim()) b["4200"] += nnum(r[3]); });
  rows("Fines").forEach(function (r) { if (String(r[0]).trim() && String(r[2]).trim() === "paid") b["4300"] += nnum(r[1]); });
  rows("Investments").forEach(function (r) { if (String(r[0]).trim() && !/^ফেরত/.test(String(r[9] || ""))) b["1200"] += nnum(r[1]); });
  const SK = { prev: "3100", jisan: "2100", tax: "5100", profit: "4400", irr: "5200" };
  rows("Summary").forEach(function (r) { const k = SK[String(r[0]).trim()]; if (k) b[k] += nnum(r[1]); });
  rows("Ledger").forEach(function (r) {
    if (!String(r[0]).trim()) return; const ty = String(r[2]).trim(), a = nnum(r[4]);
    const ct = String(r[3]);
    if (ty === "in") b[/লাভ|নাফা/.test(ct) ? "4400" : "4900"] += a;
    else if (ty === "out") b[/ট্যাক্স|চার্জ/.test(ct) ? "5100" : /সেচ|চাষ/.test(ct) ? "5200" : "5900"] += a;
  });
  let c = 0, d = 0; ACC.forEach(function (a) { if (a[0] === "1100") return; if (a[2] === "C") c += b[a[0]]; else d += b[a[0]]; });
  b["1100"] = c - d;
  return b;
}
// Journal থেকে প্রতিটি খাতের ব্যালান্স
function jBal(sh) {
  const b = {}, side = {}; ACC.forEach(function (a) { b[a[0]] = 0; side[a[0]] = a[2]; });
  let dr = 0, cr = 0, n = 0;
  const v = sh && sh.getLastRow() > 1 ? sh.getRange(2, 3, sh.getLastRow() - 1, 4).getDisplayValues() : [];
  v.forEach(function (r) {
    const k = String(r[0]).trim(), D = nnum(r[2]), C = nnum(r[3]); if (!side[k]) return;
    dr += D; cr += C; n++; b[k] += side[k] === "D" ? D - C : C - D;
  });
  return { b: b, dr: dr, cr: cr, n: n };
}
function jDesc(q) {
  q = q || {}; const p = [J_ACT[q.action] || String(q.action || "")];
  const who = q.member || q.name || q.sector || q.cat; if (who) p.push(String(who));
  if (q.type === "special") p.push(SPC_T); else if (q.type === "fine") p.push("জরিমানা");
  const m = Number(q.month); if (q.month !== undefined && q.month !== "" && m >= 0 && m < 12) p.push(MONTHS_F[m]);
  if (q.fineMonth) p.push(String(q.fineMonth));
  if (q.amount !== undefined && q.amount !== "") p.push(tk(q.amount));
  if (q.id) p.push("#" + String(q.id));
  if (q.status) p.push(String(ST[q.status] || q.status));
  if (q.reason) p.push("কারণ: " + String(q.reason));
  if (q._jd) p.push(String(q._jd));
  return p.join(" · ").slice(0, 300);
}
// শিটের অবস্থা আর Journal মেলানো; পার্থক্য থাকলে একটি ভাউচার লেখা হয়। ফেরত: ভাউচার আইডি বা null
function jSync(u, q) {
  const sh = jSheet(), st = jState(), cur = jBal(sh).b, lines = [];
  ACC.forEach(function (a) { const d = Math.round(st[a[0]] - cur[a[0]]); if (d) lines.push([a, d]); });
  if (!lines.length) return null;
  const vid = newId(sh, "J"), t = now(), desc = jDesc(q), who = u ? u.name : "সিস্টেম", act = q ? String(q.action || "") : "";
  const out = lines.map(function (x) { const a = x[0], d = x[1], isDr = (a[2] === "D") === (d > 0), amt = String(Math.abs(d));
    return [vid, t, a[0], a[1], isDr ? amt : "", isDr ? "" : amt, desc, act, who]; });
  out.sort(function (x, y) { return (y[4] ? 1 : 0) - (x[4] ? 1 : 0); });   // ডেবিট আগে
  const r = sh.getLastRow() + 1;
  sh.getRange(r, 1, out.length, 9).setNumberFormat("@");
  sh.getRange(r, 1, out.length, 9).setValues(out);
  return vid;
}
// অ্যাপের জন্য: খাতের ব্যালান্স, Debit = Credit যাচাই, শিটের সঙ্গে মিল, সাম্প্রতিক ভাউচার
function jView() {
  const sh = SS.getSheetByName("Journal"); if (!sh) return null;
  const jb = jBal(sh), st = jState();
  const list = ACC.map(function (a) { return [a[0], a[1], a[2], jb.b[a[0]]]; });
  const diff = ACC.filter(function (a) { return Math.round(st[a[0]] - jb.b[a[0]]) !== 0; }).map(function (a) { return a[0]; });
  const n = Math.min(400, Math.max(sh.getLastRow() - 1, 0));
  const last = n ? sh.getRange(sh.getLastRow() - n + 1, 1, n, 9).getDisplayValues().reverse() : [];
  return { acc: list, dr: jb.dr, cr: jb.cr, lines: jb.n, diff: diff, rows: last };
}
// বিশেষ চাঁদা যোগ (অ্যাপ থেকে বা পেমেন্ট যাচাই থেকে)
function spcAdd(member, amt, mon, date, note, by, src) {
  const sh = spcSheet(), id = newId(sh, "S"), r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, 9).setNumberFormat("@");
  sh.getRange(r, 1, 1, 9).setValues([[id, String(date || ""), member, String(Math.round(amt)), String(mon || ""), String(note || "").slice(0, 200), by || "", now(), String(src || "")]]);
  return id;
}
function migrate3a() {   // প্রথম অনুরোধে একবার: বিশেষ চাঁদা আলাদা করা + প্রারম্ভিক ব্যালান্স
  const p = props(); if (p.getProperty("mig3a") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    if (p.getProperty("mig3a") === "1") return;
    spcSheet(); voidSheet();
    // চাঁদার ছকে নিয়মিত চাঁদার (নাম × ১,০০০) বেশি যা আছে তা বিশেষ চাঁদা — সিয়ামের সিদ্ধান্ত (১৮-১১-২০২৬)
    const cs = sheet("Contributions"), v = cs.getDataRange().getDisplayValues();
    let moved = 0, cnt = 0;
    for (let i = 1; i < v.length; i++) {
      const nm = String(v[i][0]).trim(); if (!nm || nm.charAt(0) === "※") continue;
      const exp = Math.round(nnum(v[i][1]) * 1000); if (!exp) continue;
      for (let m = 0; m < 12; m++) {
        const cell = nnum(v[i][2 + m]); if (cell <= exp) continue;
        const extra = cell - exp;
        spcAdd(nm, extra, MONTHS[m], "", "আগে মাসিক চাঁদার ঘরে একসাথে লেখা ছিল (ঘরে মোট " + tk(cell) + ")", "সিস্টেম", "migrate3a");
        cs.getRange(i + 1, 3 + m).setValue(exp);
        moved += extra; cnt++;
      }
    }
    SpreadsheetApp.flush();
    jSync({ name: "সিস্টেম" }, { action: "migrate_3a", _jd: "বিশেষ চাঁদা আলাদা: " + cnt + "টি ঘর, " + tk(moved) });
    p.setProperty("mig3a", "1");
    try { logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_3a", ver: UIF_VER, moved: moved, cells: cnt }); } catch (e) {}
    dropRS();
  } finally { lock.releaseLock(); }
}

/* ===================== Phase 3B: গিরবি রেজিস্টার ও অন্যান্য ===================== */
// তারিখ dd-mm-yyyy আকারে (অ্যাপ "yyyy-mm-dd" পাঠালেও চলে); ভুল হলে ফাঁকা
function invDate(v) {
  const s = String(v || "").trim(); if (!s) return "";
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/); if (m) return ("0" + m[3]).slice(-2) + "-" + ("0" + m[2]).slice(-2) + "-" + m[1];
  m = s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/); if (m) return ("0" + m[1]).slice(-2) + "-" + ("0" + m[2]).slice(-2) + "-" + m[3];
  throw new Error("তারিখ সঠিক নয় (দিন-মাস-বছর)");
}
function invDays(s) {   // আজ থেকে কত দিন বাকি (মেয়াদ শেষের দিন ধরে)
  const m = String(s || "").match(/^(\d{2})-(\d{2})-(\d{4})$/); if (!m) return null;
  const t = Utilities.formatDate(new Date(), "Asia/Dhaka", "yyyy-MM-dd").split("-").map(Number);
  return Math.round((Date.UTC(+m[3], +m[2] - 1, +m[1]) - Date.UTC(t[0], t[1] - 1, t[2])) / 864e5);
}
// প্রতি ঘণ্টায়: মেয়াদ শেষের ৩০/৭/১/০ দিন আগে অ্যাডমিনদের একবার করে নোটিফিকেশন
function invRemind() {
  const p = props(), adm = usersAll().filter(function (r) { return roleOf(r[3]) === "admin"; }).map(function (r) { return String(r[1]).trim().toLowerCase(); });
  if (!adm.length) return;
  rows("Investments").forEach(function (r) {
    if (!String(r[0]).trim() || /^ফেরত/.test(String(r[9] || ""))) return;
    const d = invDays(r[8]); if (d === null) return;
    const th = d <= 0 ? 0 : d <= 1 ? 1 : d <= 7 ? 7 : d <= 30 ? 30 : -1; if (th < 0) return;
    const key = "invn_" + String(r[5] || r[0]) + "_" + String(r[8]) + "_" + th; if (p.getProperty(key)) return;
    p.setProperty(key, "1");
    pushQ(adm, { t: "⏰ গিরবির মেয়াদ " + (d <= 0 ? "শেষ" : "শেষ হচ্ছে"), b: String(r[0]) + (r[6] ? " (" + r[6] + ")" : "") + " — " + (d < 0 ? "মেয়াদ পেরিয়ে গেছে" : d === 0 ? "আজ শেষ দিন" : bnNum(d) + " দিন বাকি") + " · " + String(r[8]), u: "inv", k: "inv" }, null, true);
  });
  pushFlush();
}
/* ---------- Phase 4: লগইনের সঙ্গে তথ্য ---------- */
function loginData(r, q) {
  if (r.ok) {
    const lu = findUser(r.user.username);
    if (lu) { r.user.tfa = tfaOn(lu); if (q.withData) { markOn(lu); r.user.adminSet = !!lu.apw; r.cashOn = cashOn(); r.settings = settings(); r.data = readAll(lu.role === "admin", lu, lu.role === "moderator"); } }
  }
  return r;
}

/* ---------- Phase 4: অ্যাডমিন 2FA (Authenticator অ্যাপ, TOTP: ৩০ সেকেন্ড, ৬ অঙ্ক) ----------
 * Script Properties: tfa_<username> = {on, s (গোপন চাবি, base32), ls (শেষ ব্যবহৃত ধাপ), bk (ব্যাকআপ কোডের hash), at}
 * tfp_<username> = চালু করার সময়ের অস্থায়ী চাবি। ফোন হারালে: অন্য অ্যাডমিন "2FA রিসেট", নয়তো লোডারের twoFaReset() Run */
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function tfaGet(un) { try { return JSON.parse(props().getProperty("tfa_" + un) || "{}") || {}; } catch (e) { return {}; } }
function tfaPut(un, t) { props().setProperty("tfa_" + un, JSON.stringify(t)); }
function tfaOn(u) { return !!(u && u.role === "admin" && tfaGet(u.username).on); }
function sbyte(x) { x &= 255; return x > 127 ? x - 256 : x; }
function rndBytes(n) {
  let b = [];
  while (b.length < n) b = b.concat(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid() + Math.random() + Date.now() + b.length, Utilities.Charset.UTF_8));
  return b.slice(0, n).map(function (x) { return x & 255; });
}
function b32enc(b) {
  let bits = 0, val = 0, o = "";
  b.forEach(function (x) { val = ((val << 8) | (x & 255)) & 0xffff; bits += 8; while (bits >= 5) { o += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } });
  if (bits > 0) o += B32[(val << (5 - bits)) & 31];
  return o;
}
function b32dec(s) {
  let bits = 0, val = 0; const o = [];
  String(s).toUpperCase().replace(/[^A-Z2-7]/g, "").split("").forEach(function (c) { val = ((val << 5) | B32.indexOf(c)) & 0xffff; bits += 5; if (bits >= 8) { o.push((val >>> (bits - 8)) & 255); bits -= 8; } });
  return o;
}
function totpCode(sec, step) {
  const key = b32dec(sec).map(sbyte), ctr = []; let s = step;
  for (let i = 7; i >= 0; i--) { ctr[i] = sbyte(s % 256); s = Math.floor(s / 256); }
  const h = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_1, ctr, key).map(function (x) { return x & 255; });
  const o = h[19] & 15, n = ((h[o] & 127) * 16777216) + (h[o + 1] << 16) + (h[o + 2] << 8) + h[o + 3];
  return ("000000" + (n % 1000000)).slice(-6);
}
function tfaMatch(sec, code, after) {   // ফোনের ঘড়ি ±৩০ সেকেন্ড এদিক-ওদিক হলেও চলবে; একই কোড দুবার নয়
  code = String(code || "").replace(/\D/g, ""); if (!/^\d{6}$/.test(code)) return 0;
  const st = Math.floor(Date.now() / 30000);
  for (let d = -1; d <= 1; d++) if (st + d > (after || 0) && totpCode(sec, st + d) === code) return st + d;
  return 0;
}
function tfaCheck(un, code) {   // "totp" | "backup" | false
  code = String(code || "").replace(/[\s-]/g, ""); const t = tfaGet(un); if (!t.on) return false;
  const c = CacheService.getScriptCache(), fk = "tff_" + un, f = Number(c.get(fk) || 0);
  if (f >= 10) return false;   // ১৫ মিনিটে ১০ বার ভুল হলে সাময়িক বন্ধ
  if (/^\d{6}$/.test(code)) { const st = tfaMatch(t.s, code, t.ls); if (st) { t.ls = st; tfaPut(un, t); c.remove(fk); return "totp"; } }
  else if (/^\d{8}$/.test(code)) { const hh = hash("bk", code), i = (t.bk || []).indexOf(hh); if (i >= 0) { t.bk.splice(i, 1); tfaPut(un, t); c.remove(fk); return "backup"; } }
  c.put(fk, String(f + 1), 900); return false;
}
function bkCodes() {   // ৮টি একবার-ব্যবহারযোগ্য ব্যাকআপ কোড (৮ অঙ্ক)
  const o = [];
  while (o.length < 8) { let n = 0; rndBytes(5).forEach(function (x) { n = n * 256 + x; }); const s = ("0000000" + (n % 1e8)).slice(-8); if (o.indexOf(s) < 0) o.push(s); }
  return o;
}
function login2(tf, code, dev) {
  const c = CacheService.getScriptCache(); tf = String(tf || "");
  const v = tf && c.get("tf_" + tf); if (!v) return { ok: false, error: "tf_expired" };
  const un = v.split("|")[0], n = Number(c.get("tfn_" + tf) || 0), u = findUser(un);
  if (!u || u.off || u.role !== "admin") { c.remove("tf_" + tf); return { ok: false, error: "tf_expired" }; }
  const how = tfaCheck(un, code);
  if (!how) {
    if (n + 1 >= 5) { c.remove("tf_" + tf); c.remove("tfn_" + tf); loginLog(u, "2fa_fail", dev); return { ok: false, error: "tf_many" }; }
    c.put("tfn_" + tf, String(n + 1), 300); return { ok: false, error: "tf_wrong", left: 4 - n };
  }
  c.remove("tf_" + tf); c.remove("tfn_" + tf);
  const r = issueTok(u, dev || v.split("|")[1]);
  if (how === "backup") { r.bkLeft = (tfaGet(un).bk || []).length; logAct(u, { action: "tfa_backup", left: r.bkLeft }); }
  return r;
}
function tfaAction(u, q) {
  if (u.role !== "admin") return { ok: false, error: "admin_only" };
  const p = props(), un = u.username;
  if (q.action === "tfa_init") {
    if (tfaOn(u)) return { ok: false, error: "tfa_already" };
    const s = b32enc(rndBytes(20)); p.setProperty("tfp_" + un, s);
    return { ok: true, secret: s, uri: "otpauth://totp/" + encodeURIComponent("UIF:" + un) + "?secret=" + s + "&issuer=UIF&algorithm=SHA1&digits=6&period=30" };
  }
  if (q.action === "tfa_on") {
    if (tfaOn(u)) return { ok: false, error: "tfa_already" };
    const s = p.getProperty("tfp_" + un); if (!s) return { ok: false, error: "tfa_restart" };
    const st = tfaMatch(s, q.code, 0); if (!st) return { ok: false, error: "tf_wrong" };
    const codes = bkCodes();
    tfaPut(un, { on: 1, s: s, ls: st, bk: codes.map(function (x) { return hash("bk", x); }), at: now() });
    p.deleteProperty("tfp_" + un); logAct(u, { action: "tfa_on" });
    return { ok: true, codes: codes };
  }
  if (q.action === "tfa_codes") {   // নতুন ব্যাকআপ কোড (পুরোনোগুলো বাতিল) — এখনকার Authenticator কোড লাগবে
    if (!tfaOn(u)) return { ok: false, error: "must_2fa" };
    if (tfaCheck(un, q.code) !== "totp") return { ok: false, error: "tf_wrong" };
    const t = tfaGet(un), codes = bkCodes(); t.bk = codes.map(function (x) { return hash("bk", x); }); tfaPut(un, t);
    logAct(u, { action: "tfa_codes" }); return { ok: true, codes: codes };
  }
  if (q.action === "tfa_reset") {   // অন্য অ্যাডমিনের ফোন হারালে — নিজের নয়
    const tg = String(q.username || "").trim().toLowerCase();
    if (!tg || tg === un) return { ok: false, error: "tfa_self" };
    const tu = findUser(tg); if (!tu || tu.role !== "admin") return { ok: false, error: "tfa_notadmin" };
    p.deleteProperty("tfa_" + tg); p.deleteProperty("tfp_" + tg); dropTokens(tg, "r");
    logAct(u, { action: "tfa_reset", username: tg }); return { ok: true };
  }
  return { ok: false, error: "অজানা কাজ" };
}
function tfaResetAll() {   // জরুরি: লোডারের twoFaReset() থেকে — সব অ্যাডমিনের 2FA বন্ধ, পরের লগইনে আবার চালু করতে হবে
  const p = props(), a = p.getProperties(); let n = 0;
  Object.keys(a).forEach(function (k) { if (/^tf[ap]_/.test(k)) { p.deleteProperty(k); if (k.indexOf("tfa_") === 0) n++; } });
  logAct({ name: "Apps Script", role: "owner" }, { action: "tfa_reset_all", n: n });
  Logger.log("✅ " + n + " জন অ্যাডমিনের 2FA রিসেট হয়েছে। পরের লগইনে তাঁরা আবার চালু করবেন।");
}

/* ---------- Phase 4: নোটিফিকেশন সেন্টার ----------
 * Notifs শিট: A আইডি (N+সময় base36) | B সময় | C কাকে (username, কমা দিয়ে) | D শিরোনাম | E বার্তা | F পাতা
 * যত push পাঠানো হয় (ফোনে বন্ধ থাকলেও) সব এখানে জমা থাকে; পড়া হয়েছে কি না: nrd_<username> = {t, r:[আইডি]} */
function nfSheet() { return mkSheet("Notifs", ["আইডি", "সময়", "কাকে", "শিরোনাম", "বার্তা", "পাতা"]); }
function nfSave(list) {
  try {
    const b = Date.now(), out = [];
    list.forEach(function (it, i) { const us = (it.users || []).filter(function (x) { return x; }); if (!us.length) return;
      out.push(["N" + (b + i).toString(36), now(), us.join(","), String(it.msg.t || "").slice(0, 150), String(it.msg.b || "").slice(0, 500), String(it.msg.u || "home")]); });
    if (!out.length) return;
    const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return;
    try {
      const sh = nfSheet(), r = sh.getLastRow() + 1;
      sh.getRange(r, 1, out.length, 6).setNumberFormat("@"); sh.getRange(r, 1, out.length, 6).setValues(out);
      if (sh.getLastRow() > 5000) sh.deleteRows(2, 1000);   // পুরোনো ১০০০টি মুছে শিট হালকা রাখা
    } finally { lock.releaseLock(); }
  } catch (e) {}
}
function nfRd(un) { try { return JSON.parse(props().getProperty("nrd_" + un) || "{}") || {}; } catch (e) { return {}; } }
function nfTs(id) { return parseInt(String(id).slice(1), 36) || 0; }
function nfList(u) {
  try {
    const sh = SS.getSheetByName("Notifs"); if (!u || !sh || sh.getLastRow() < 2) return [];
    const n = Math.min(2000, sh.getLastRow() - 1), v = sh.getRange(sh.getLastRow() - n + 1, 1, n, 6).getDisplayValues(), un = u.username, rd = nfRd(un), rs = {}, o = [];
    (rd.r || []).forEach(function (x) { rs[x] = 1; });
    for (let i = v.length - 1; i >= 0 && o.length < 80; i--) {
      if (("," + v[i][2] + ",").indexOf("," + un + ",") < 0) continue;
      o.push([v[i][0], v[i][1], v[i][3], v[i][4], v[i][5], nfTs(v[i][0]) <= (rd.t || 0) || rs[v[i][0]] ? 1 : 0]);
    }
    return o;
  } catch (e) { return []; }
}
function nfMark(u, q) {   // q.all = সব পড়া; নয়তো q.ids
  const rd = nfRd(u.username);
  if (q.all) { rd.t = Date.now(); rd.r = []; }
  else { const t = rd.t || 0; rd.r = (rd.r || []).concat((q.ids || []).map(String).filter(function (x) { return /^N[0-9a-z]+$/.test(x); })).filter(function (x, i, a) { return nfTs(x) > t && a.indexOf(x) === i; }).slice(-300); }
  props().setProperty("nrd_" + u.username, JSON.stringify(rd)); return { ok: true };
}

/* ---------- Phase 4: কার্যক্রমের লগ — খোঁজ, ব্যক্তি ও ধরন অনুযায়ী ছাঁকনি, পাতায় পাতায় ---------- */
function logCat(a) {
  a = String(a);
  if (/^(pay_|contrib_|fine_|spc_|led_|sum_|year_|journal)/.test(a)) return "money";
  if (/^inv_/.test(a)) return "inv";
  if (/^(mem_|user_|info_|img_|mid_|sus_|sess_)/.test(a)) return "mem";
  if (/^(notice_|poll_|vote|rule)/.test(a)) return "not";
  return "sys";
}
function logGet(q) {
  const sh = SS.getSheetByName("Log"); if (!sh || sh.getLastRow() < 2) return { ok: true, rows: [], total: 0, who: [] };
  const all = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getDisplayValues().reverse(), who = {};
  all.forEach(function (r) { if (r[1]) who[r[1]] = 1; });
  const wq = String(q.who || ""), cq = String(q.cat || ""), sq = String(q.q || "").trim().toLowerCase();
  const f = all.filter(function (r) { return (!wq || r[1] === wq) && (!cq || logCat(r[3]) === cq) && (!sq || (r[0] + " " + r[1] + " " + r[3] + " " + r[4]).toLowerCase().indexOf(sq) >= 0); });
  const off = Math.max(0, Number(q.off) || 0), n = Math.min(100, Math.max(10, Number(q.n) || 40));
  return { ok: true, rows: f.slice(off, off + n), total: f.length, off: off, who: Object.keys(who).sort() };
}

/* ---------- Phase 4: বিনিয়োগের বর্তমান মূল্য (শুধু দেখানো, হিসাবে ধরা হয় না) ----------
 * Investments K = মূল্য হালনাগাদের তারিখ · InvValues শিট: A বিনিয়োগ আইডি | B তারিখ | C মূল্য | D কে | E সময় */
function ivToday() { return Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy"); }
function ivAdd(id, d, v, u) {
  const sh = mkSheet("InvValues", ["বিনিয়োগ আইডি", "তারিখ", "মূল্য", "কে", "সময়"]), r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, 5).setNumberFormat("@"); sh.getRange(r, 1, 1, 5).setValues([[String(id), String(d), String(v), u ? u.name : "", now()]]);
}
function migrate4() {   // প্রথম অনুরোধে একবার: নতুন শিট ও কলাম
  const p = props(); if (p.getProperty("mig4") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    if (p.getProperty("mig4") === "1") return;
    const is = sheet("Investments"); if (!String(is.getRange(1, 11).getDisplayValue()).trim()) is.getRange(1, 11).setValue("মূল্য হালনাগাদ");
    mkSheet("InvValues", ["বিনিয়োগ আইডি", "তারিখ", "মূল্য", "কে", "সময়"]); nfSheet();
    p.setProperty("mig4", "1"); dropRS();
    logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_4" });
  } finally { lock.releaseLock(); }
}

function migrate3b() {   // প্রথম অনুরোধে একবার: রেজিস্টারের নতুন কলাম + দুই গিরবির মালিক + ২০২৫-এর বিশেষ চাঁদা আলাদা
  const p = props(); if (p.getProperty("mig3b") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    if (p.getProperty("mig3b") === "1") return;
    const is = sheet("Investments");
    is.getRange(1, 7, 1, 4).setValues([["জমির মালিক", "জমির পরিমাণ", "মেয়াদ শেষ", "অবস্থা"]]);
    const iv = is.getDataRange().getDisplayValues();
    for (let i = 1; i < iv.length; i++) {
      const sec = String(iv[i][0]); let own = "", land = "";
      if (/গিরবি/.test(sec) && /৪\s*কাটা/.test(sec)) { own = "মোফাজ্জল শেখ"; land = "৪ কাটা"; }
      else if (/গিরবি/.test(sec) && /২\s*কাটা/.test(sec)) { own = "জাহিদ হাসান"; land = "২ কাটা"; }
      if (!own) continue;
      is.getRange(i + 1, 7, 1, 2).setNumberFormat("@");
      if (!String(iv[i][6] || "").trim()) is.getRange(i + 1, 7, 1, 2).setValues([[own, land]]);
      if (String(iv[i][4]).trim() === "নাম লিখুন") is.getRange(i + 1, 5).setValue("");
    }
    const ls = SS.getSheetByName("Ledger"); if (ls && ls.getRange(1, 11).getDisplayValue() === "") ls.getRange(1, 11).setValue("বিনিয়োগ আইডি");
    // ২০২৫: নিয়মিতের (নাম × ১,০০০) বেশি = বিশেষ চাঁদা (সিয়াম: ডিসেম্বরে প্রতি ২ নামে বিশেষ ৮,০০০)
    let moved = 0, cnt = 0;
    const cs = SS.getSheetByName("Contributions_2025");
    if (cs && !SS.getSheetByName("Special_2025")) {
      const sp = mkSheet("Special_2025", SPC_HEAD), v = cs.getDataRange().getDisplayValues(), out = [];
      for (let i = 1; i < v.length; i++) {
        const nm = String(v[i][0]).trim(); if (!nm || nm.charAt(0) === "※") continue;
        const exp = Math.round(nnum(v[i][1]) * 1000); if (!exp) continue;
        for (let m = 0; m < 12; m++) {
          const cell = nnum(v[i][2 + m]); if (cell <= exp) continue;
          out.push(["S25-" + (out.length + 1), "", nm, String(cell - exp), MONTHS[m], "আগে মাসিক চাঁদার ঘরে একসাথে লেখা ছিল (ঘরে মোট " + tk(cell) + ")", "সিস্টেম", now(), "migrate3b"]);
          cs.getRange(i + 1, 3 + m).setValue(exp); moved += cell - exp; cnt++;
        }
      }
      if (out.length) { sp.getRange(2, 1, out.length, 9).setNumberFormat("@"); sp.getRange(2, 1, out.length, 9).setValues(out); }
    }
    SpreadsheetApp.flush();
    p.setProperty("mig3b", "1");
    try { logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_3b", ver: UIF_VER, moved2025: moved, cells2025: cnt }); } catch (e) {}
    dropRS();
  } finally { lock.releaseLock(); }
}
