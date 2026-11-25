/* UIF সার্ভার — 7.3 (২৬-১১-২০২৬): সংরক্ষণের উত্তরে শুধু যে শিট বদলেছে সেগুলো পাঠানো (RD_MAP; অ্যাপ বাকিটা আগের তথ্য থেকে মেলায়); লগইন-ইতিহাস ও পাঠানো নোটিফিকেশন শুধু দরকারে
 * 7.2 (২৬-১১-২০২৬): সংরক্ষণ দ্রুত — props একবারে পড়া (অনুরোধভিত্তিক ক্যাশ), কাজের পর শিট একবারই পড়া, সংরক্ষণের উত্তরে হিসাব খাতার যাচাই বাদ (অ্যাপ পরে আলাদা আনে), লক্ষ্যের হিসাব (glRun) প্রতি অনুরোধে নয় — সময়সূচিতে / ৬ ঘণ্টায় একবার
 * 7.1 (২৬-১১-২০২৬): সংরক্ষণের সময় মাপা — উত্তরে _t (কোন অংশে কত মিলিসেকেন্ড)
 * 7.0 (২৫-১১-২০২৬): সার্ভারের ত্রুটি-বার্তা ও নোটিফিকেশনের লেখা ছোট ও গোছানো (সিয়ামের নির্দেশ: বাংলা এক লাইনে)
 * 6.9 (২৫-১১-২০২৬): একই রশিদের ছবির ত্রুটি-বার্তা সংক্ষিপ্ত
 * 6.8 (২৫-১১-২০২৬): অ্যাডমিন বাতিল ব্যাংক জমা পুরো মুছতে পারেন (bd_purge; রশিদের ছবিসহ)
 * 6.7 (২৫-১১-২০২৬): ক্যাশিয়ার টাকা পাঠানোর নাম্বার বদলাতে রিকোয়েস্ট পাঠান, অ্যাডমিন অনুমতি/প্রত্যাখ্যান দেন (props pi_req); অ্যাডমিন নিজে সরাসরি বদলান; বদল হলে সব সদস্যকে নোটিফিকেশন
 * 6.6 (২৫-১১-২০২৬): অ্যাডমিন "হয়নি" রিকোয়েস্টও সরাসরি মুছতে পারেন (আগে বাতিল করতে হতো না)
 * 6.5 (২৫-১১-২০২৬): রিকোয়েস্ট যাচাই — ক্যাশিয়ার শুধু পেন্ডিং থেকে "জমা হয়েছে"/"হয়নি" একবার বাছতে পারেন, পরে বদলাতে পারেন শুধু অ্যাডমিন
 * 6.4 (২৫-১১-২০২৬): অ্যাডমিন বাতিল-হওয়া রিকোয়েস্ট পুরো মুছতে পারেন (pay_purge; রশিদের ছবি ও Receipts সারিও মোছে; Log-এ থাকে)
 * 6.3 (২৫-১১-২০২৬): ক্যাশিয়ারের ব্যাংক জমা (BankDeposits শিট, রশিদের ছবি BD-nnn; জমা = ক্যাশিয়ার/অ্যাডমিন, যাচাই/বাতিল = শুধু অ্যাডমিন; হাতের নগদের বেশি নয়; জমার ছবি ৫০০ MB-সীমার বাইরে) — Journal ও মোট ফান্ড অপরিবর্তিত
 * 6.2 (২৪-১১-২০২৬): জরিমানা বাতিলে ধরন (সদস্যের দোষ ছিল না → ব্যাজের ধারায় সময়মতো) · বাতিল করা জরিমানা হাতের স্বয়ংক্রিয় বাটনে আর বসে না
/* UIF সার্ভার — 5.1 (২০-১১-২০২৬): ব্যাংক অপশন + রশিদের ছবি (Google Drive "UIF রশিদ", Receipts শিট, একই ছবি দুবার নয়, ১২ মাস / ৫০০ MB পরে নিজে মোছা)
 * 5.0 (১৯-১১-২০২৬): এক বাটনে সার্ভার আপডেট (লোডার 5.0, সংস্করণ props uif_sha), মাসযুক্ত সব বিশেষ চাঁদা সেই মাসের জমা, পুরোনো বিশেষ হার, "অতিরিক্ত চাঁদা"
 * 4.7 (১৯-১১-২০২৬): চাঁদার রিমাইন্ডার ১/৩/৪ তারিখ ও ৫ তারিখে তিনবার (পেন্ডিং বাদ, জরিমানার পরিমাণসহ)
 * 4.6 (১৯-১১-২০২৬): ডিসেম্বর ২০২৬ বিশেষ ৪,০০০/নাম; স্বয়ংক্রিয় জরিমানা (৬ তারিখ রাত ১২টার পর, মাসে একবার); জরিমানা বাতিলে সদস্যকে খবর
 * 4.5 (১৯-১১-২০২৬): মাসিক বিশেষ চাঁদা (হার অ্যাডমিন সেটিং; ২০২৭ = প্রতি নামে ৩,০০০), মাসিক চাঁদা নিয়মিত+বিশেষে ভাগ, নির্ধারিতের বেশি নয়, বছরভিত্তিক জরিমানা (২০২৭ = বাকির ১০%)
 * আগের: সংস্করণ 4.3 (১৯-১১-২০২৬): সদস্যের নিজের ছবি (Photos শিট; গ্যালারি থেকে)
 * 4.2 (১৯-১১-২০২৬): কাজের উত্তরের সঙ্গেই নতুন তথ্য (withData) — অ্যাপে অপেক্ষা অর্ধেক
 * 4.1 (১৯-১১-২০২৬): সদস্য আইডি নতুন করে — বর্তমান সদস্য M-০১…, প্রাক্তন সদস্য X-০১…
 * 4 (১৯-১১-২০২৬): অ্যাডমিন 2FA (Authenticator), নোটিফিকেশন সেন্টার, বিনিয়োগের বর্তমান মূল্যের ইতিহাস, কার্যক্রমের লগ (খোঁজ/ছাঁকনি)
 * 3B (১৯-১১-২০২৬): গিরবি রেজিস্টার (মালিক/জমি/মেয়াদ/ফেরত), লাভের সূত্র, মেয়াদের নোটিফিকেশন, ২০২৫-এর বিশেষ চাঁদা, মোবাইল সবার জন্য
 * 3A: হিসাব খাতা (Double-Entry Journal), বিশেষ চাঁদা আলাদা, মোছার বদলে বাতিল
 * Apps Script-এর লোডার এই ফাইলের SHA-256 মিলিয়ে তবেই চালায়। এক অক্ষর বদলালেও লোডারের UIF_SHA বদলাতে হবে।
 */
const UIF_VER = "7.7";
const __T0 = Date.now();   // 7.1: সময় মাপা — সার্ভার কোড চালু হওয়ার মুহূর্ত
const SS = SpreadsheetApp.getActive();
const MONTHS = ["\u099c\u09be\u09a8\u09c1","\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1","\u09ae\u09be\u09b0\u09cd\u099a","\u098f\u09aa\u09cd\u09b0\u09bf","\u09ae\u09c7","\u099c\u09c1\u09a8","\u099c\u09c1\u09b2\u09be","\u0986\u0997","\u09b8\u09c7\u09aa\u09cd\u099f\u09c7","\u0985\u0995\u09cd\u099f\u09cb","\u09a8\u09ad\u09c7","\u09a1\u09bf\u09b8\u09c7"];
const READ_SHEETS = ["Contributions","Fines","Summary","Investments","Notices","Members","Images","Payments","Rules","Ledger","Polls","MemberIDs","Special","InvValues","Transfers","BankDeposits"];
// Payments \u09b6\u09bf\u099f\u09c7\u09b0 \u0995\u09b2\u09be\u09ae: A \u0986\u0987\u09a1\u09bf | B \u099c\u09ae\u09be\u09b0 \u09b8\u09ae\u09af\u09bc | C \u09b8\u09a6\u09b8\u09cd\u09af | D \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09b6\u09c7\u09b7 \u09ea | E \u099f\u09be\u0995\u09be | F \u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a4\u09be\u09b0\u09bf\u0996 | G \u09a7\u09b0\u09a8 | H \u09ae\u09be\u09b8 | I \u09ae\u09be\u09a7\u09cd\u09af\u09ae | J \u0985\u09ac\u09b8\u09cd\u09a5\u09be | K \u09af\u09be\u099a\u09be\u0987\u0995\u09be\u09b0\u09c0 | L \u09af\u09be\u099a\u09be\u0987\u09af\u09bc\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc | M \u0987\u09a4\u09bf\u09b9\u09be\u09b8 | N রশিদ (1 = ছবি আছে, x = মুছে গেছে)
const PAY_HEAD = ["\u0986\u0987\u09a1\u09bf","\u099c\u09ae\u09be\u09b0 \u09b8\u09ae\u09af\u09bc","\u09b8\u09a6\u09b8\u09cd\u09af","\u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09b6\u09c7\u09b7 \u09ea","\u099f\u09be\u0995\u09be","\u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a4\u09be\u09b0\u09bf\u0996","\u09a7\u09b0\u09a8","\u09ae\u09be\u09b8","\u09ae\u09be\u09a7\u09cd\u09af\u09ae","\u0985\u09ac\u09b8\u09cd\u09a5\u09be","\u09af\u09be\u099a\u09be\u0987\u0995\u09be\u09b0\u09c0","\u09af\u09be\u099a\u09be\u0987\u09af\u09bc\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc","\u0987\u09a4\u09bf\u09b9\u09be\u09b8","রশিদ"];
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
  const T = { s: Date.now() };
  try {
    migrate1a(); migrate1b(); migrate2a(); migrate3a(); migrate3b(); migrate4(); migrate4b(); migrate57(); migrate58();
    T.mig = Date.now();
    const q = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (q.action === "login") {   // \u09b2\u0997\u0987\u09a8\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7\u0987 \u09b8\u09ac \u09a4\u09a5\u09cd\u09af (\u098f\u0995\u09ac\u09be\u09b0\u09c7, \u09a6\u09cd\u09b0\u09c1\u09a4)
      return out(loginData(login(q.username, q.password, q.dev), q));
    }
    if (q.action === "login2") return out(loginData(login2(q.tf, q.code, q.dev), q));   // অ্যাডমিনের দ্বিতীয় ধাপ (Authenticator কোড)
    const u = auth(q.token); T.auth = Date.now();
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
    if (q.action === "photo_get") return out(photoGet(q));
    if (q.action === "rc_get") { try { return out(rcGet(u, q)); } catch (re) { return out({ ok: false, error: String(re && re.message || re) }); } }
    if (q.action === "photo_set" || q.action === "photo_del") {   // নিজের ছবি (অ্যাডমিন যে কারও ছবি সরাতে/বদলাতে পারেন)
      const lk = LockService.getScriptLock(); lk.waitLock(20000);
      try { const r = photoAct(u, q); logAct(u, { action: q.action, name: r.name }); SpreadsheetApp.flush(); return out(Object.assign({ ok: true }, r)); }
      finally { lk.releaseLock(); }
    }
    if (/^tfa_/.test(String(q.action))) return out(tfaAction(u, q));
    if (q.action === "ping") {   // \u0985\u09cd\u09af\u09be\u09aa \u0996\u09cb\u09b2\u09be \u09a5\u09be\u0995\u09b2\u09c7 \u09aa\u09cd\u09b0\u09a4\u09bf \u09ae\u09bf\u09a8\u09bf\u099f\u09c7 \u2013 \u0995\u09c7 \u0985\u09a8\u09b2\u09be\u0987\u09a8\u09c7 \u0986\u099b\u09c7\u09a8
      markOn(u); touch(u, q.dev); return out({ ok: true, seen: seenList() });
    }
    if (q.action === "data") {
      markOn(u); touch(u, q.dev);
      return out({ ok: true, user: { name: u.name, username: u.username, role: u.role, adminSet: !!u.apw, tfa: tfaOn(u) }, cashOn: cashOn(), settings: settings(), data: readAll(u.role === "admin", u) });
    }
    if (q.action === "archive_get") {   // \u09aa\u09c1\u09b0\u09cb\u09a8\u09cb \u09ac\u099b\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac (\u09b8\u09ac\u09be\u0987 \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8)
      const y = Number(q.year); if (!(y > 2000)) return out({ ok: false, error: "\u09ac\u099b\u09b0 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc" });
      return out({ ok: true, year: y, Contributions: rows("Contributions_" + y), Fines: rows("Fines_" + y), Special: rows("Special_" + y) });
    }
    if (q.action === "log_get") {   // \u0995\u09be\u09b0\u09cd\u09af\u0995\u09cd\u09b0\u09ae\u09c7\u09b0 \u0987\u09a4\u09bf\u09b9\u09be\u09b8 \u2013 \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8
      if (u.role !== "admin") return out({ ok: false, error: "admin_only" });
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
    if (!isPay && u.role !== "admin" && !(u.role === "cashier" && cashOn() && CASH_ACTIONS[q.action])) return out({ ok: false, error: "admin_only" });
    let lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      propsFresh(); T.lock = Date.now();
      const r = isPay ? payAction(q, u) : adminAction(q, u); T.act = Date.now();
      logAct(u, q); T.log = Date.now();
      __RM = {};   // এখন থেকে শিট পড়া মনে রাখা হয় (এরপর এই শিটগুলোতে আর লেখা হয় না)
      if (FIN_ACT[q.action] && props().getProperty("mig3a") === "1") { try { SpreadsheetApp.flush(); jSync(u, q); T.jr1 = Date.now();
          try { if (Date.now() - Number(props().getProperty("gl_at") || 0) > 6 * 36e5) { props().setProperty("gl_at", String(Date.now())); glRun(); } } catch (ge) {} } catch (je) { try { logAct(u, { action: "journal_error", e: String(je && je.message || je) }); } catch (e2) {} } }
      T.jr = Date.now();
      SpreadsheetApp.flush(); dropRS(); T.fl = Date.now();
      const dq = pqDefer(q.action);
      lock.releaseLock(); lock = null;
      if (PQX) { const ox = PQX; PQX = null; nfSave(ox); try { pushSend(ox); } catch (e) {} }   // ৩ মিনিটেও না যাওয়া পুরোনো তালিকা
      const pr = dq ? null : pushFlush(), res = Object.assign({ ok: true }, r || {}, pr ? { push: pr } : {}); T.push = Date.now();
      if (q.withData) {   // আলাদা "data" অনুরোধ লাগবে না — একবারেই হালনাগাদ তথ্য
        try { const fu = q.part && !RD_USR[q.action] ? u : (findUser(u.username) || u);   // 7.6: ভূমিকা বদলায় না এমন কাজে Users আবার পড়া হয় না
         res._d = { user: { name: fu.name, username: fu.username, role: fu.role, adminSet: !!fu.apw, tfa: tfaOn(fu) }, cashOn: cashOn(), settings: settings(), data: readAll(fu.role === "admin", fu, true, q.part ? q.action : "") }; } catch (e) {}
      }
      T.read = Date.now();
      if (u.role === "admin") { const d = function (a, b) { return T[a] && T[b] ? T[a] - T[b] : 0; };
        res._t = { init: T.s - __T0, mig: d("mig", "s"), auth: d("auth", "mig"), lock: d("lock", "auth"), act: d("act", "lock"), log: d("log", "act"), jr: d("jr", "log"), gl: T.jr1 ? d("jr", "jr1") : 0, fl: d("fl", "jr"), push: d("push", "fl"), read: d("read", "push"), all: T.read - T.s }; }
      return out(res);
    } finally { if (lock) lock.releaseLock(); }
  } catch (err) {
    return out({ ok: false, error: String((err && err.message) || err) });
  }
}

/* ---------- helpers ---------- */
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
// 7.2: এক অনুরোধে Script Properties একবারই পড়া হয় (প্রতিটি getProperty আলাদা সার্ভিস-কল ছিল); লেখা সরাসরি যায় ও ক্যাশেও বসে
let __PC = null;
function props() {
  if (__PC) return __PC;
  const P = PropertiesService.getScriptProperties(); let all = null;
  const A = function () { if (!all) all = P.getProperties(); return all; };
  __PC = {
    getProperty: function (k) { const v = A()[k]; return v == null ? null : v; },
    setProperty: function (k, v) { P.setProperty(k, v); A()[k] = String(v); return __PC; },
    deleteProperty: function (k) { P.deleteProperty(k); delete A()[k]; return __PC; },
    getProperties: function () { return Object.assign({}, A()); },
    setProperties: function (o, d) { if (d) P.setProperties(o, true); else P.setProperties(o); if (d) all = null; else Object.keys(o).forEach(function (k) { A()[k] = String(o[k]); }); return __PC; },
    getKeys: function () { return Object.keys(A()); }
  };
  return __PC;
}
function propsFresh() { __PC = null; }
function sheet(n) { const s = SS.getSheetByName(n); if (!s) throw new Error("\u09b6\u09bf\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf: " + n); return s; }
function hash(salt, pw) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + pw, Utilities.Charset.UTF_8);
  return b.map(function (x) { const v = (x < 0 ? x + 256 : x).toString(16); return v.length === 1 ? "0" + v : v; }).join("");
}
let __RM = null;   // 7.2: কাজ শেষ হওয়ার পর একই শিট একবারই পড়া (হিসাব খাতা + অ্যাপের তথ্য)
function rows(n) { if (__RM && Object.prototype.hasOwnProperty.call(__RM, n)) return __RM[n]; const s = SS.getSheetByName(n); const v = s ? s.getDataRange().getDisplayValues().slice(1) : []; if (__RM) __RM[n] = v; return v; }
function isOff(v) { return String(v).trim() === "\u09ac\u09a8\u09cd\u09a7"; }
function roleOf(v) { v = String(v).trim().toLowerCase(); return v === "admin" ? "admin" : v === "cashier" ? "cashier" : "member"; }
const MUST_OK = { logout: 1, ping: 1, data: 1, pass_change: 1, push_reg: 1, push_unreg: 1, push_pref: 1, push_test: 1 };
// 2FA চালু না করা পর্যন্ত অ্যাডমিন শুধু এগুলো করতে পারবেন
const TFA_OK = { logout: 1, ping: 1, data: 1, pass_change: 1, push_reg: 1, push_unreg: 1, push_pref: 1, push_test: 1, tfa_init: 1, tfa_on: 1, nf_read: 1 };
// ক্যাশিয়ার যা পারবেন (ক্যাশিয়ার প্যানেল চালু থাকলে): নোটিশ ও ভোট
const CASH_ACTIONS = { notice_add: 1, notice_edit: 1, notice_del: 1, poll_add: 1, poll_edit: 1, poll_close: 1, poll_del: 1, bd_add: 1 };
function bnNum(n) { return String(n).replace(/\d/g, function (d) { return "\u09e6\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef"[d]; }); }
/* ---------- এক বাটনে সার্ভার আপডেট (সিয়ামের সিদ্ধান্ত, ১৯-১১-২০২৬) ----------
 * লোডার 5.0 props uif_sha থেকে সংস্করণ পড়ে; এখানে শুধু অ্যাডমিন (2FA) সেটা বদলান। নিয়ম: পুরো ৬৪ অক্ষর, কোড আসবে শুধু siyam7e.github.io থেকে
 * ও hash মিলতে হবে, শুধু নতুন (বড়) UIF_VER-এ যাওয়া যায়, ফেরা যায় শুধু ঠিক আগেরটায়; প্রতিটি বদল লগ + সব অ্যাডমিনকে push */
function srvCur() { try { return typeof __uifSha !== "undefined" ? String(__uifSha) : ""; } catch (e) { return ""; } }
function srvVer(code) { const m = String(code || "").match(/const UIF_VER = "([0-9.]+)"/); return m ? m[1] : ""; }
function verCmp(a, b) { const x = String(a).split("."), y = String(b).split("."); for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (Number(x[i]) || 0) - (Number(y[i]) || 0); if (d) return d > 0 ? 1 : -1; } return 0; }
function srvFetch(sha) {
  if (!/^[0-9a-f]{64}$/.test(sha)) throw new Error("পুরো ৬৪ অক্ষরের কোড দিন (0-9, a-f)");
  const r = UrlFetchApp.fetch("https://siyam7e.github.io/a-" + sha.slice(0, 8) + ".js", { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error("GitHub-এ এই সংস্করণের ফাইল পাওয়া যায়নি");
  const code = r.getContentText("UTF-8");
  const h = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, code, Utilities.Charset.UTF_8).map(function (b) { const v = (b < 0 ? b + 256 : b).toString(16); return v.length === 1 ? "0" + v : v; }).join("");
  if (h !== sha) throw new Error("কোড মেলেনি — এই সংস্করণ নিরাপদ নয়");
  try { new Function(code); } catch (e) { throw new Error("নতুন কোডে লেখার ভুল আছে — চালু করা হয়নি"); }
  return code;
}
function srvInfo() { const p = props(); return { ver: UIF_VER, sha: srvCur(), prev: p.getProperty("uif_prev") || "", prevVer: p.getProperty("uif_prevv") || "", fail: p.getProperty("uif_fail") || "", loader: typeof __uifSha !== "undefined" }; }
function srvNotify(u, txt) {
  const ad = usersAll().filter(function (r) { return roleOf(r[3]) === "admin"; }).map(function (r) { return String(r[1]).trim().toLowerCase(); });
  pushQ(ad, { t: "🛠️ সার্ভার আপডেট", b: txt + " — " + u.name, u: "admin:sys", k: "sys" }, u.username);
}
function curYear() { return Number(props().getProperty("set_year")) || 2026; }
/* ---------- মাসিক বিশেষ চাঁদা ও জরিমানার নিয়ম (সিয়ামের সিদ্ধান্ত, ১৯-১১-২০২৬) ---------- */
// spr = [{r: প্রতি নামে মাসিক বিশেষ হার, f: "YYYY-MM" শুরু, t: "YYYY-MM" শেষ}] — অ্যাডমিন বদলাতে পারেন
const SPR_DEF = [{ r: 4000, f: "2025-12", t: "2025-12" }, { r: 1000, f: "2026-03", t: "2026-03" }, { r: 4000, f: "2026-06", t: "2026-06" }, { r: 1000, f: "2026-09", t: "2026-09" }, { r: 4000, f: "2026-12", t: "2026-12" }, { r: 3000, f: "2027-01", t: "2027-12" }];   // পুরোনো বিশেষ (সিয়াম নিশ্চিত, ১৯-১১) + ডিসেম্বর ২০২৬ + ২০২৭   // ডিসেম্বর ২০২৬ = ৪,০০০ (শুধু সেই মাস); ২০২৭ = ৩,০০০
function sprList() { try { const v = JSON.parse(props().getProperty("spr") || "null"); if (Array.isArray(v)) return v; } catch (e) {} return SPR_DEF; }
function spRate(y, m) { const k = y + "-" + (m < 9 ? "0" : "") + (m + 1); let r = 0; sprList().forEach(function (x) { if (k >= String(x.f) && k <= String(x.t)) r = Number(x.r) || 0; }); return r; }
// জরিমানার নিয়ম বছরভিত্তিক: k "n" = প্রতি নামে v টাকা, k "p" = বাকি টাকার v%
function fineRules() { try { return JSON.parse(props().getProperty("fine_r") || "{}") || {}; } catch (e) { return {}; } }
function fineRule(y) { const r = fineRules()[String(y)]; if (r && (r.k === "n" || r.k === "p")) return { k: r.k, v: Number(r.v) || 0 }; return y >= 2027 ? { k: "p", v: 10 } : { k: "n", v: 200 }; }
// এক মাসের জরিমানার পরিমাণ (বছরের নিয়ম অনুযায়ী); ০ = জরিমানা নয়
function fineCalc(nm, m, crow) {
  const md = monDue(nm, m, crow); if (!md || !md.s || md.paid >= md.exp) return 0;
  const fr = fineRule(curYear()); return fr.k === "p" ? Math.round((md.exp - md.paid) * fr.v / 100) : Math.round(md.s * fr.v);
}
// স্বয়ংক্রিয় জরিমানা (সিয়ামের সিদ্ধান্ত, ১৯-১১-২০২৬): ৬ তারিখ রাত ১২টার পর (বাংলাদেশ সময়) প্রতি ঘণ্টার কাজে, মাসে একবার।
// শুধু যাচাই হওয়া জমা ধরা হয় (পেন্ডিং নয়); নিষ্ক্রিয় সদস্য বাদ; বাতিল করা জরিমানা আর বসে না। প্রথমবার চালু হওয়ার মাস বাদ (ডিসেম্বর ২০২৬ থেকে শুরু)
function fineAutoRun() {
  const p = props(), dt = new Date(), Y = Number(Utilities.formatDate(dt, "Asia/Dhaka", "yyyy")), mo = Number(Utilities.formatDate(dt, "Asia/Dhaka", "M")) - 1, d = Number(Utilities.formatDate(dt, "Asia/Dhaka", "d"));
  const key = "fa_" + Y + "_" + mo;
  if (!p.getProperty("fa_start")) { p.setProperty("fa_start", key); if (d >= 6) p.setProperty(key, "skip"); return; }
  if (d < 6 || p.getProperty(key) || Y !== curYear()) return;   // বছর বন্ধ না হলে (জানুয়ারি) অপেক্ষা — বন্ধের পর পরের ঘণ্টায় চলবে
  const lk = LockService.getScriptLock(); lk.waitLock(20000);
  try {
    if (p.getProperty(key)) return;
    const fs = sheet("Fines"), fv = rows("Fines"), out = [];
    rows("Contributions").forEach(function (c) {
      const nm = String(c[0]).trim(); if (!nm || nm.charAt(0) === "※" || String(c[14] || "").trim() === "নিষ্ক্রিয়") return;
      if (fv.some(function (r) { return String(r[0]).trim() === nm && String(r[3]).trim() === MONTHS[mo]; })) return;
      const famt = fineCalc(nm, mo, c); if (famt <= 0) return;
      fs.appendRow([nm, famt, "due", MONTHS[mo], newId2("F")]); out.push(nm + " " + tk(famt));
      pushQ(unOf([nm]), { t: "⚖️ নতুন জরিমানা", b: MONTHS_F[mo] + " মাসের জরিমানা " + tk(famt) + " — ৫ তারিখের মধ্যে পুরো চাঁদা আসেনি", u: "pay", k: "due" });
    });
    p.setProperty(key, String(out.length));
    const ad = usersAll().filter(function (r) { return roleOf(r[3]) === "admin"; }).map(function (r) { return String(r[1]).trim().toLowerCase(); });
    pushQ(ad, { t: "⚖️ " + MONTHS_F[mo] + "-এর জরিমানা", b: out.length ? out.length + " জন: " + out.join(", ") + "। ভুল হলে অ্যাডমিন প্যানেল থেকে বাতিল করুন।" : "এ মাসে সবাই সময়মতো পুরো চাঁদা দিয়েছেন — কোনো জরিমানা বসেনি।", u: "fin", k: "due" });
    try { logAct({ name: "সিস্টেম", username: "system", role: "admin" }, { action: "fine_autorun", month: mo, n: out.length }); } catch (e) {}
    SpreadsheetApp.flush(); dropRS();
  } finally { lk.releaseLock(); }
  pushFlush();
}
const MSP = "মাসিক ";   // পেমেন্ট থেকে ভাগ হওয়া বিশেষ অংশের সূত্র: "মাসিক <পেমেন্ট আইডি>"
function monSpc(name, mon) { let t = 0; rows("Special").forEach(function (r) { if (String(r[2]).trim() === name && String(r[4]).trim() === mon) t += nnum(r[3]); }); return t; }   // মাসযুক্ত সব বিশেষ চাঁদা সেই মাসের জমা (সিয়ামের সিদ্ধান্ত: সদস্যের চোখে একটাই হিসাব)
// একজনের এক মাসের নির্ধারিত ও জমা (নিয়মিত + মাসিক বিশেষ)
function monDue(name, m, crow) {
  name = String(name).trim(); const y = curYear();
  if (!crow) crow = rows("Contributions").filter(function (r) { return String(r[0]).trim() === name; })[0];
  if (!crow) return null;
  const s = shAt(name, nnum(crow[1]), y, m), rate = spRate(y, m), reg = nnum(crow[2 + m]), sp = rate ? monSpc(name, MONTHS[m]) : 0;
  return { s: s, rate: rate, expReg: Math.round(s * 1000), exp: Math.round(s * (1000 + rate)), reg: reg, sp: sp, paid: reg + sp };
}
// মাসিক বিশেষ চালু থাকলে নির্ধারিতের বেশি মাসিক চাঁদা নেওয়া হয় না (বাড়তি দিতে হলে আলাদা "বিশেষ চাঁদা")
function monCap(name, mon, amt, pend, exclId) {
  const m = MONTHS.indexOf(String(mon).trim()); if (m < 0) return;
  const d = monDue(name, m); if (!d || !d.rate) return;
  let pn = 0;
  if (pend) rows("Payments").forEach(function (r) { if (String(r[0]) !== String(exclId || "") && String(r[2]).trim() === String(name).trim() && String(r[6]) === "চাঁদা" && String(r[7]).trim() === MONTHS[m] && String(r[9]) === ST.p) pn += nnum(r[4]); });
  const left = Math.max(0, d.exp - d.paid - pn);
  if (amt > left) throw new Error(MONTHS_F[m] + " মাসের নির্ধারিত " + d.exp + " ৳, জমা " + d.paid + " ৳" + (pn ? ", যাচাইয়ের অপেক্ষায় " + pn + " ৳" : "") + " — এ মাসে সর্বোচ্চ " + left + " ৳ দেওয়া যাবে। বাড়তি টাকা দিতে \"➕ অতিরিক্ত চাঁদা\" বেছে নিন।");
}
function archYears() { const out = [], cy = curYear(); for (let y = 2025; y <= cy + 1; y++) { try { if (SS.getSheetByName("Contributions_" + y)) out.push(y); } catch (e) {} } return out; }
function settings() { const p = props(); return { est: p.getProperty("set_est") || "\u09e6\u09e8 | \u09e8\u09e6\u09e8\u09eb", slogan: p.getProperty("set_slogan") || "\u0990\u0995\u09cd\u09af \u2022 \u09ac\u09bf\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u2022 \u0989\u09a8\u09cd\u09a8\u09af\u09bc\u09a8", msgr: p.getProperty("set_msgr") || "", year: curYear(), years: archYears(), spr: sprList(), fr: (function () { const o = {}, cy = curYear(); [cy - 1, cy, cy + 1].forEach(function (y) { o[y] = fineRule(y); }); return o; })(),
  mnt: mntOn() ? mntMsg() : null,
  nfl: nfLock(),
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
const PUSH_KEYS = { pay: 1, not: 1, vote: 1, rule: 1, due: 1, msg: 1, req: 1 };   // 5.3: টাকা জমাও বন্ধ করা যায়, যদি অ্যাডমিন লক না করেন
/* 5.3: অ্যাডমিনের লক — props nf_lock {ধরন:1}; লক করা ধরন সদস্যের পছন্দ উপেক্ষা করে সবাই পান; খুলে দিলে সদস্যের পুরোনো পছন্দ ফেরে (npf_ অপরিবর্তিত) */
function nfLock() { try { const o = JSON.parse(props().getProperty("nf_lock") || "{}") || {}, r = {}; Object.keys(PUSH_KEYS).forEach(function (k) { if (o[k]) r[k] = 1; }); return r; } catch (e) { return {}; } }
let PQ = [];
function tk(n) { return bnNum(Math.round(Number(n) || 0).toLocaleString("en-IN")) + " \u09f3"; }
function payWhat(tg) { const i = MONTHS.indexOf(String(tg.mon).trim()), m = i >= 0 ? MONTHS_F[i] : "\u0986\u0997\u09c7\u09b0"; if (String(tg.type) === SPC_T) return i >= 0 ? MONTHS_F[i] + " মাসের বিশেষ চাঁদা" : "অতিরিক্ত চাঁদা"; return String(tg.type) === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be" ? m + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be" : m + " \u09ae\u09be\u09b8\u09c7\u09b0 \u099a\u09be\u0981\u09a6\u09be"; }
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
  const lk = nfLock(), at = fcmAuth(sa), url = "https://fcm.googleapis.com/v1/projects/" + sa.project_id + "/messages:send", ppl = {};
  list.forEach(function (it) {
    const want = {}; it.users.forEach(function (x) { if (it.force || PUSH_KEYS[it.msg.k] !== 1 || lk[it.msg.k] || pf(x)[it.msg.k] !== 0) want[x] = 1; });
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
/* 7.4: নোটিফিকেশন পরে পাঠানো — সংরক্ষণ অপেক্ষা করে না। তালিকা props "pq"-তে জমে, এককালীন সময়সূচি pqRun সাধারণত ১ মিনিটের মধ্যে ফোনে পাঠায়।
 * নিরাপত্তা: সময়সূচি বানানো না গেলে, তালিকা বড় হলে বা ৩ মিনিটেও না গেলে আগের মতো সাথে সাথে পাঠানো হয়; ঘণ্টার সময়সূচিও (bkRun) বাকি থাকলে পাঠায় */
const PQ_SYNC = { push_send: 1, push_cfg: 1 };
function pqGet() { try { const o = JSON.parse(props().getProperty("pq") || "null"); return o && Array.isArray(o.l) ? o : null; } catch (e) { return null; } }
let PQX = null;
function pqDefer(act) {   // লকের ভেতরে ডাকা হয়; সফল হলে জমানো তালিকা ফেরত দেয় (নোটিফিকেশন সেন্টারে লেখার জন্য), নইলে null
  try { const p0 = props(), t0 = Date.now(); if (t0 - Number(p0.getProperty("pq_last") || 0) > 60000) p0.setProperty("pq_last", String(t0)); } catch (e) {}   // 7.5: ব্যবহার চলছে — সময়সূচি চালু থাকবে
  if (!PQ.length || PQ_SYNC[act]) return null;
  try {
    const p = props(), t = Date.now(); let old = pqGet();
    if (old && t - Number(old.at || 0) > 180000) { p.deleteProperty("pq"); p.deleteProperty("pq_tr"); pqTrDel(); PQX = old.l; old = null; }   // সময়সূচি চলেনি — লক ছাড়ার পর এখনই পাঠানো হবে
    const at0 = now(); PQ.forEach(function (it, i) { it.ts = t + i; it.at = at0; });   // 7.7: নোটিফিকেশন সেন্টারেও পরে লেখা হয়, সময় থাকে কাজের
    const o = { at: old ? old.at : t, l: (old ? old.l : []).concat(PQ) }, js = JSON.stringify(o);
    if (js.length > 8500) return null;
    const tr = Number(p.getProperty("pq_tr") || 0);
    if (!tr || t - tr > 300000) { ScriptApp.newTrigger("pqRun").timeBased().after(1000).create(); p.setProperty("pq_tr", String(t)); }
    p.setProperty("pq", js);
    const l = PQ; PQ = []; return l;
  } catch (e) { return null; }
}
function pqTrDel() { try { ScriptApp.getProjectTriggers().forEach(function (x) { if (x.getHandlerFunction() === "pqRun") ScriptApp.deleteTrigger(x); }); } catch (e) {} }
function pqRun() {   // এককালীন সময়সূচি থেকে চলে (লোডারের eval-এ এই ফাংশন সবার জন্য দেখা যায়)
  // 7.5: শেষ ১০ মিনিটে সংরক্ষণ হয়ে থাকলে পরের সময়সূচি এখানেই (পেছনে) বানানো হয় — সংরক্ষণকে আর বানাতে হয় না
  const lk = LockService.getScriptLock(); if (!lk.tryLock(30000)) return;
  let o, more = false;
  try { propsFresh(); o = pqGet(); const p = props(); p.deleteProperty("pq"); pqTrDel();
    more = Date.now() - Number(p.getProperty("pq_last") || 0) < 600000;
    if (more) p.setProperty("pq_tr", String(Date.now())); else p.deleteProperty("pq_tr"); }
  finally { lk.releaseLock(); }
  if (more) { try { ScriptApp.newTrigger("pqRun").timeBased().after(1000).create(); } catch (e) { try { props().deleteProperty("pq_tr"); } catch (e2) {} } }
  if (!o || !o.l.length) return;
  nfSave(o.l);
  try { pushSend(o.l); } catch (e) { try { props().setProperty("pq_err", now() + " · " + String(e.message || e).slice(0, 150)); } catch (e2) {} }
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
    payload: JSON.stringify({ message: { token: tok, data: { title: "\ud83d\udd14 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u09b8\u09ab\u09b2", body: "\u099a\u09ae\u09ce\u0995\u09be\u09b0! " + u.name + ", \u098f\u0987 \u09ab\u09cb\u09a8\u09c7 \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09a0\u09bf\u0995\u09ae\u09a4\u09cb \u0986\u09b8\u099b\u09c7 \u2705", url: "home", tag: "test" }, webpush: { headers: { Urgency: "high", TTL: "600" } } } }) });
  if (res.getResponseCode() !== 200) { if (res.getResponseCode() === 404) pushDel(tok); return { ok: false, error: "\u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09af\u09be\u09af\u09bc\u09a8\u09bf (" + res.getResponseCode() + ")" }; }
  return { ok: true };
}
function schedSetup() {   // \u09a6\u09c8\u09a8\u09bf\u0995 \u09b8\u0995\u09be\u09b2 \u09e7\u09e6\u099f\u09be (\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6): \u09b0\u09bf\u09ae\u09be\u0987\u09a8\u09cd\u09a1\u09be\u09b0; \u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0\u09c7 \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa\u0993
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "weeklyBackup") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("weeklyBackup").timeBased().everyHours(1).create();
  const p = props(); p.setProperty("sched", "hourly"); p.setProperty("bk_auto", "1");
}
// চাঁদার রিমাইন্ডার (সিয়ামের সিদ্ধান্ত, ১৯-১১-২০২৬): ১, ৩, ৪ তারিখ সকাল ১০টা; ৫ তারিখ সকাল ১০টা, বিকেল ৪টা ও রাত ১০টা (বাংলাদেশ সময়)।
// শুধু যাঁদের যাচাই হওয়া + পেন্ডিং মিলিয়েও নির্ধারিত পূরণ হয়নি
function remPush(d, H, mo) {
  const pend = {}; rows("Payments").forEach(function (r) { if (String(r[6]) === "চাঁদা" && String(r[7]).trim() === MONTHS[mo] && String(r[9]) === ST.p) pend[String(r[2]).trim()] = (pend[String(r[2]).trim()] || 0) + nnum(r[4]); });
  const M = MONTHS_F[mo], when = "বাংলাদেশ সময় ৫ তারিখ রাত ১২টা (সৌদি সময় রাত ৯টা)";
  rows("Contributions").forEach(function (r) {
    const nm = String(r[0]).trim(); if (!nm || nm.charAt(0) === "※" || String(r[14] || "").trim() === "নিষ্ক্রিয়") return;
    const md = monDue(nm, mo, r); if (!md) return; const due = Math.max(0, md.exp - md.paid); if (!due || md.paid + (pend[nm] || 0) >= md.exp) return;
    const amt = md.paid ? "আরও " + tk(due) + " বাকি" : tk(due), fa = fineCalc(nm, mo, r), fx = fa ? " সময়মতো না দিলে জরিমানা " + tk(fa) + "।" : "";
    const m = d === 1 ? { t: "📅 চাঁদার সময় শুরু", b: M + " মাসের চাঁদা " + amt + " — অনুগ্রহ করে ৫ তারিখের মধ্যে পাঠান।" + fx }
      : d === 3 ? { t: "⏳ ২ দিন বাকি", b: M + " মাসের চাঁদা: " + amt + "। দেরি না করে পাঠিয়ে দিন।" + fx }
      : d === 4 ? { t: "⚠️ কাল শেষ দিন", b: M + " মাসের চাঁদা: " + amt + "। যত তাড়াতাড়ি সম্ভব পাঠান।" + fx }
      : H === 22 ? { t: "🚨 ২ ঘণ্টা বাকি", b: M + " মাসের চাঁদা: " + amt + "। শেষ সময় " + when + "।" + fx }
      : H === 16 ? { t: "⏰ ৮ ঘণ্টা বাকি", b: M + " মাসের চাঁদা: " + amt + "। শেষ সময় " + when + "।" + fx }
      : { t: "🚨 আজ শেষ দিন", b: M + " মাসের চাঁদা: " + amt + "। শেষ সময় " + when + "।" + fx };
    m.u = "pay"; m.k = "due"; m.g = "due-" + mo; pushQ(unOf([nm]), m);
  });
}
function remHour(H) {   // ৫ তারিখ বিকেল ৪টা ও রাত ১০টা — প্রতি ঘণ্টার কাজ থেকে
  if (!props().getProperty("fcm_sa")) return;
  const dt = new Date(), d = Number(Utilities.formatDate(dt, "Asia/Dhaka", "d")), mo = Number(Utilities.formatDate(dt, "Asia/Dhaka", "M")) - 1;
  if (d !== 5 || Number(Utilities.formatDate(dt, "Asia/Dhaka", "yyyy")) !== curYear()) return;
  remPush(5, H, mo); pushFlush();
}
function dailyRun() {
  if (!props().getProperty("fcm_sa")) return;
  const d = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "d")), mo = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "M")) - 1;
  if ((d === 1 || d === 3 || d === 4 || d === 5) && Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "yyyy")) === curYear()) remPush(d, 10, mo);
  const ps = SS.getSheetByName("Polls");
  if (ps && ps.getLastRow() > 1) {
    const tm = Utilities.formatDate(new Date(Date.now() + 864e5), "Asia/Dhaka", "d-M-yyyy"), vs = rows("Votes");
    const mem = {}; rows("Contributions").forEach(function (r) { const nm = String(r[0]).trim(); if (nm && String(r[14] || "").trim() !== "\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc") mem[nm] = 1; });
    ps.getDataRange().getDisplayValues().slice(1).forEach(function (r) {
      const m = String(r[4] || "").match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/); if (!m || !pollOpen(r) || Number(m[1]) + "-" + Number(m[2]) + "-" + m[3] !== tm) return;
      const voted = {}; vs.forEach(function (v) { if (String(v[0]) === String(r[0])) voted[String(v[1])] = 1; });
      const who = usersAll().filter(function (x) { return mem[String(x[0]).trim()] && !voted[String(x[1]).trim().toLowerCase()]; }).map(function (x) { return String(x[1]).trim().toLowerCase(); });
      pushQ(who, { t: "\ud83d\uddf3\ufe0f \u0995\u09be\u09b2 \u09ad\u09cb\u099f \u09b6\u09c7\u09b7", b: String(r[1]) + " \u2014 \u0986\u09aa\u09a8\u09bf \u098f\u0996\u09a8\u09cb \u09ad\u09cb\u099f \u09a6\u09c7\u09a8\u09a8\u09bf\u0964", u: "vote", k: "vote" });
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
    try { pqRun(); } catch (e) {}
    try { pendRun(); } catch (e) {}
    try { susRun(); } catch (e) {}
    try { invRemind(); } catch (e) {}
    try { fineAutoRun(); } catch (e) {}
    try { if (props().getProperty("mig3a") === "1") { const lk = LockService.getScriptLock(); lk.waitLock(20000); try { if (jSync(null, { action: "auto_check" })) dropRS(); } finally { lk.releaseLock(); } } } catch (e) {}
    try { glRun(); pushFlush(); } catch (e) {}
    if (H === 10) { try { dailyRun(); } catch (e) {} try { loginPrune(); } catch (e) {} }
    if (H === 3) { try { rcClean(); } catch (e) {} }
    if (H === 16 || H === 22) { try { remHour(H); } catch (e) {} }
    if (wd === "5" && H === 23) return bkCopy();
    return {};
  }
  if (sc === "daily") {
    try { pqRun(); } catch (e) {}
    try { fineAutoRun(); } catch (e) {}
    try { glRun(); pushFlush(); } catch (e) {}
    try { rcClean(); } catch (e) {}
    try { dailyRun(); } catch (e) {}
    if (Utilities.formatDate(new Date(), "Asia/Dhaka", "u") !== "5") return {};
  }
  return bkCopy();
}
function bkCopy() {
  let f; try { f = bkFolder(); } catch (e) { throw new Error("ব্যাকআপের অনুমতি নেই — Apps Script-এ backupSetup Run করুন"); }
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
// সদস্যের তথ্য: সব ঘর সবাই দেখেন (সিয়ামের সিদ্ধান্ত, ২০-১১-২০২৬); শুধু NID/পাসপোর্টের শেষ ৪ সংখ্যা যায় — পুরোটা নিজের ও অ্যাডমিনের কাছে
const MEM_PUBLIC = { 0: 1, 1: 1, 7: 1, 9: 1, 11: 1, 12: 1 };   // 9 = মোবাইল: সবাই দেখবে (সিয়ামের সিদ্ধান্ত, ১৯-১১-২০২৬)
function memFilter(list, u) {
  if (!u || u.role === "admin") return list;
  return (list || []).map(function (r) {
    if (String(r[0]).trim() === u.name) return r;
    return r.map(function (v, i) { if (i !== 8) return v; const t = String(v == null ? "" : v).replace(/\s/g, ""); return t ? t.slice(-4) : ""; });
  });
}
function dropRS() { try { CacheService.getScriptCache().remove("rs1"); } catch (e) {} }
/* 7.3: কোন কাজে কোন শিট বদলায় — সংরক্ষণের উত্তরে শুধু এগুলো আবার পড়া হয় (তালিকায় না থাকলে সব) */
const RD_PAY = ["Payments", "Contributions", "Fines", "Special"];
const RD_MAP = { pay_add: ["Payments"], pay_cancel: ["Payments"], pay_purge: ["Payments"], pay_set: RD_PAY, pay_cash: RD_PAY, pay_del: RD_PAY,
  bd_add: ["BankDeposits"], bd_ok: ["BankDeposits"], bd_void: ["BankDeposits"], bd_purge: ["BankDeposits"],
  led_add: ["Ledger"], led_void: ["Ledger"], fine_add: ["Fines"], fine_edit: ["Fines"], fine_void: ["Fines"], fine_auto: ["Fines"],
  spc_add: ["Special"], spc_void: ["Special"], contrib_set: ["Contributions"], sum_set: ["Summary"],
  inv_add: ["Investments", "Ledger"], inv_edit: ["Investments", "Ledger"], inv_void: ["Investments", "Ledger"], inv_ret: ["Investments", "Ledger"], inv_val: ["InvValues"],
  notice_add: ["Notices"], notice_edit: ["Notices"], notice_del: ["Notices"], poll_add: ["Polls"], poll_edit: ["Polls"], poll_close: ["Polls"], poll_del: ["Polls"],
  rule_add: ["Rules"], rule_edit: ["Rules"], rule_del: ["Rules"], img_add: ["Images"], img_del: ["Images"], info_set: ["Members"],
  mem_add: ["Contributions", "MemberIDs"], mem_active: ["Contributions"],
  pay_info: [], pay_info_ok: [], pay_info_no: [], pay_rem: [], set_cashier: [], cash_toggle: [], settings_set: [], dues_set: [], rem_tpl: [], maint_set: [],
  user_add: [], user_pass: [], user_active: [], user_rename: [], sess_kill: [], sus_set: [], sus_lift: [], nf_lock: [], nf_edit: [], nf_del: [], push_send: [], push_cfg: [], push_sched: [], push_off: [], backup_now: [] };
const RD_NF = { push_send: 1, nf_edit: 1, nf_del: 1 };
/* 7.4: আংশিক উত্তরে এগুলো শুধু সংশ্লিষ্ট কাজে পড়া হয় — বাকি সময় অ্যাপের আগের তথ্যই থাকে (অনলাইন তালিকা প্রতি মিনিটে ping-এ আসে) */
const RD_USR = { user_add: 1, user_pass: 1, user_active: 1, user_rename: 1, sess_kill: 1, sus_set: 1, sus_lift: 1, set_cashier: 1, mem_active: 1 };
function readAll(isAdmin, u, lite, act) {   // lite (7.2): সংরক্ষণের উত্তরে হিসাব খাতার যাচাই (jView) বাদ — অ্যাপ পরে "data" দিয়ে আনে
  const d = {};
  rulesSheet();
  const only = lite && act && RD_MAP[act] ? RD_MAP[act] : null;
  if (only) { d.Partial = 1; only.forEach(function (n) { d[n] = rows(n); }); }
  else { const sh0 = readShared(); READ_SHEETS.forEach(function (n) { d[n] = sh0[n] || []; }); }
  if (d.Members) d.Members = memFilter(d.Members, u);
  // \u09ad\u09cb\u099f: \u09b8\u09ac\u09be\u0987 \u09b6\u09c1\u09a7\u09c1 \u09ae\u09cb\u099f \u09b8\u0982\u0996\u09cd\u09af\u09be \u09a6\u09c7\u0996\u09ac\u09c7\u09a8; \u0995\u09c7 \u0995\u09c0 \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09c7\u09a8 \u09b6\u09c1\u09a7\u09c1 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8
  const all = !only, ac = String(act || "");
  if (all || /^poll_/.test(ac)) { const vs = rows("Votes"), cnt = {}, mine = {};
  vs.forEach(function (r) { const id = String(r[0]), c = Number(r[3]); if (!cnt[id]) cnt[id] = []; cnt[id][c] = (cnt[id][c] || 0) + 1; if (u && String(r[1]) === u.username) mine[id] = c; });
  d.VoteCounts = cnt; d.MyVotes = mine;
  if (isAdmin || (u && u.role === "cashier")) d.Votes = vs.map(function (r) { return [r[0], r[2], r[3], r[4]]; }); }
  // \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8 \u0993 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0\u09c7\u09b0 \u09a8\u09be\u09ae (\u09a8\u09be\u09ae\u09c7\u09b0 \u09aa\u09be\u09b6\u09c7 \u099a\u09bf\u09b9\u09cd\u09a8\u09c7\u09b0 \u099c\u09a8\u09cd\u09af) \u2013 \u0985\u09a8\u09cd\u09af \u0995\u09cb\u09a8\u09cb \u09a4\u09a5\u09cd\u09af \u09a8\u09af\u09bc
  if (all || RD_USR[ac]) d.Roles = rows("Users").filter(function (r) { const x = roleOf(r[3]); return x !== "member"; }).map(function (r) { return [String(r[0]).trim(), roleOf(r[3])]; });
  if (all) d.Seen = seenList();
  d.FW = fwList().filter(function (o) { return o.nf; }).map(function (o) { return [o.m, o.y, o.mo]; });
  if (isAdmin) d.FWa = fwList().filter(function (o) { return o.y === curYear(); }).map(function (o) { return [o.m, o.mo]; });   // অ্যাডমিনের স্বয়ংক্রিয় জরিমানার তালিকায় বাদ দেখাতে
  // FW: শুধু "দোষ ছিল না" — ধরনটি সদস্যকে আলাদা করে দেখানো হয় না, ব্যাজের হিসাবে লাগে
  if (isAdmin || (u && u.role === "cashier")) { try { d.RemSent = JSON.parse(props().getProperty("rem_log") || "{}") || {}; } catch (e) { d.RemSent = {}; } }
  if (isAdmin) { const p = props(); d.Backup = { last: p.getProperty("bk_last") || "", url: p.getProperty("bk_url") || "", auto: p.getProperty("bk_auto") === "1", n: Number(p.getProperty("bk_n") || 0) }; }
  try { const pp = props(), np = pp.getProperty("npf_" + (u ? u.username : "")); d.MyPush = { prefs: np ? JSON.parse(np) : {} };
    if (isAdmin && (all || /^push_/.test(ac))) { const ps = SS.getSheetByName("Push"), pv = ps && ps.getLastRow() > 1 ? ps.getRange(2, 1, ps.getLastRow() - 1, 1).getDisplayValues().map(function (r) { return String(r[0]); }) : [];
      const tr = {}; pv.forEach(function (x) { tr[x] = (tr[x] || 0) + 1; });
      d.Push = { on: !!(pp.getProperty("fcm_cfg") && pp.getProperty("fcm_sa")), sa: !!pp.getProperty("fcm_sa"), sched: /^(daily|hourly)$/.test(pp.getProperty("sched") || ""), devices: pv.length, users: tr, cfg: JSON.parse(pp.getProperty("fcm_cfg") || "null"), vapid: pp.getProperty("fcm_vapid") || "" }; } } catch (e) {}
  if (isAdmin || (u && u.role === "cashier")) { if (lite) d.AccSkip = 1; else { try { d.Acc = jView(); } catch (e) { d.Acc = null; } } }
  if (isAdmin || (u && u.role === "cashier")) { try { d.PiReq = JSON.parse(props().getProperty("pi_req") || "null"); } catch (e) { d.PiReq = null; } }
  if ((isAdmin || (u && u.role === "cashier")) && (all || /^(pay_|bd_)/.test(ac))) { try { const w = {}; rows("Receipts").forEach(function (r) { if (String(r[8] || "").trim()) w[String(r[0])] = String(r[8]).trim(); }); d.RcW = w; } catch (e) { d.RcW = {}; } }
  if (isAdmin && !only) d.Logins = loginRows(30);
  if (isAdmin) d.Srv = srvInfo();
  if (all || RD_NF[ac]) d.Notifs = nfList(u); if (all) d.PhotoV = photoVers(); if (isAdmin && (all || RD_NF[ac])) d.NfSent = nfSent();
  if (isAdmin && u) { const tf = tfaGet(u.username); d.Tfa = { on: !!tf.on, bk: (tf.bk || []).length, at: tf.at || "" }; }
  if (isAdmin && (all || RD_USR[ac])) { const ap = props().getProperties(), nd = {};
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
    case "tr_add": return trAdd(q, u);
    case "tr_void": return trVoid(q, u);
    case "bd_add": return bdAdd(q, u);
    case "bd_ok": return bdOk(q, u);
    case "bd_void": return bdVoid(q, u);
    case "bd_purge": return bdPurge(q, u);
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
      if (!/^[a-z0-9._]{3,20}$/.test(un)) throw new Error("ইউজারনেম: ইংরেজি ছোট অক্ষর/সংখ্যা, ৩–২০টি");
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
      if (!/^[a-z0-9._]{3,20}$/.test(un)) throw new Error("ইউজারনেম: ইংরেজি ছোট অক্ষর/সংখ্যা, ৩–২০টি");
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
    case "srv_set": {   // নতুন সংস্করণ চালু
      if (typeof __uifSha === "undefined") throw new Error("এই সুবিধার জন্য আগে লোডার 5.0 বসাতে হবে");
      const sha = String(q.sha || "").trim().toLowerCase(), cur = srvCur(), p = props();
      if (sha === cur) throw new Error("এই সংস্করণ এখনই চালু আছে");
      const code = srvFetch(sha), nv = srvVer(code);
      if (!nv) throw new Error("এটি UIF সার্ভারের ফাইল নয়");
      if (verCmp(nv, UIF_VER) <= 0) throw new Error("শুধু নতুন সংস্করণে যাওয়া যায় (এখন " + UIF_VER + ", এটি " + nv + ")। আগেরটায় ফিরতে \"↩️ আগের সংস্করণে ফিরুন\" চাপুন।");
      p.setProperties({ uif_prev: cur, uif_prevv: UIF_VER, uif_sha: sha }); p.deleteProperty("uif_fail");
      q.ver = nv; q.from = UIF_VER; srvNotify(u, "সংস্করণ " + UIF_VER + " → " + nv + " চালু হয়েছে");
      return { ver: nv };
    }
    case "srv_back": {  // ঠিক আগের সংস্করণে ফেরা
      if (typeof __uifSha === "undefined") throw new Error("এই সুবিধার জন্য আগে লোডার 5.0 বসাতে হবে");
      const p = props(), prev = p.getProperty("uif_prev") || "", pv = p.getProperty("uif_prevv") || "";
      if (!/^[0-9a-f]{64}$/.test(prev)) throw new Error("ফেরার মতো আগের সংস্করণ নেই");
      srvFetch(prev);
      p.setProperty("uif_sha", prev); p.deleteProperty("uif_prev"); p.deleteProperty("uif_prevv");
      q.ver = pv; q.from = UIF_VER; srvNotify(u, "আগের সংস্করণে ফেরা হয়েছে: " + UIF_VER + " → " + (pv || prev.slice(0, 8)));
      return { ver: pv };
    }
    case "dues_set": {   // মাসিক বিশেষ চাঁদার হার ও বছরের জরিমানার নিয়ম — শুধু অ্যাডমিন
      if (q.spr !== undefined) {
        const L = Array.isArray(q.spr) ? q.spr : [];
        if (L.length > 12) throw new Error("সর্বোচ্চ ১২টি সময়কাল");
        const out = L.map(function (x) {
          const r = Math.round(Number(x && x.r)), f = String(x && x.f || ""), t = String(x && x.t || "");
          if (!(r >= 0 && r <= 100000)) throw new Error("হার সঠিক নয়");
          if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(f) || !/^\d{4}-(0[1-9]|1[0-2])$/.test(t) || f > t) throw new Error("শুরু ও শেষ মাস সঠিক নয়");
          return { r: r, f: f, t: t };
        });
        props().setProperty("spr", JSON.stringify(out));
      }
      if (q.fy !== undefined) {
        const y = Math.round(Number(q.fy)), k = String(q.fk), v = Math.round(Number(q.fv));
        if (!(y >= 2025 && y <= 2100)) throw new Error("বছর সঠিক নয়");
        if (k !== "n" && k !== "p") throw new Error("জরিমানার ধরন বাছাই করুন");
        if (!(v >= 0 && v <= (k === "p" ? 100 : 100000))) throw new Error("জরিমানার পরিমাণ সঠিক নয়");
        const fr = fineRules(); fr[String(y)] = { k: k, v: v }; props().setProperty("fine_r", JSON.stringify(fr));
      }
      return {};
    }
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
      if (!cfg.apiKey || !cfg.projectId || !cfg.messagingSenderId || !cfg.appId) throw new Error("Firebase config অসম্পূর্ণ (apiKey, projectId, senderId, appId)");
      if (!/^[A-Za-z0-9_-]{60,120}$/.test(vap)) throw new Error("Web Push key (VAPID) \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      let sa = null;
      if (q.sa) { try { sa = JSON.parse(String(q.sa)); } catch (e) { throw new Error("Service account \u09ab\u09be\u0987\u09b2\u099f\u09bf \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc"); }
        if (!sa.client_email || !sa.private_key || !sa.project_id) throw new Error("Service account ফাইল অসম্পূর্ণ");
        if (sa.project_id !== cfg.projectId) throw new Error("Service account ও config একই প্রজেক্টের নয়");
        CacheService.getScriptCache().remove("fcm_at"); fcmAuth({ client_email: sa.client_email, private_key: sa.private_key }); }
      else if (!p.getProperty("fcm_sa")) throw new Error("Service account \u09ab\u09be\u0987\u09b2\u099f\u09bf \u09a6\u09bf\u09a8");
      p.setProperty("fcm_cfg", JSON.stringify(cfg)); p.setProperty("fcm_vapid", vap);
      if (sa) p.setProperty("fcm_sa", JSON.stringify({ client_email: sa.client_email, private_key: sa.private_key, project_id: sa.project_id }));
      let sched = true; try { schedSetup(); } catch (e) { sched = false; }
      return { sched: sched };
    }
    case "nf_del": return nfDel(q);
    case "nf_edit": return nfEdit(q);
    case "nf_lock": { const o = {}; Object.keys(PUSH_KEYS).forEach(function (k) { if (q.lock && q.lock[k]) o[k] = 1; }); props().setProperty("nf_lock", JSON.stringify(o)); return {}; }
    case "push_sched": schedSetup(); return {};
    case "push_off": { const p = props(); ["fcm_cfg", "fcm_vapid", "fcm_sa"].forEach(function (k) { p.deleteProperty(k); }); return {}; }
    case "push_send": {   // \u098f\u09a1\u09ae\u09bf\u09a8\u09c7\u09b0 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b2\u09c7\u0996\u09be \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8
      const ti = String(q.title || "").trim().slice(0, 80), bo = String(q.body || "").trim().slice(0, 300);
      if (!ti || !bo) throw new Error("\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae \u0993 \u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09b2\u09bf\u0996\u09c1\u09a8");
      const to = Array.isArray(q.to) && q.to.length ? q.to.map(String) : null;
      pushQ(to ? unOf(to) : allUsers(), { t: "\ud83d\udd14 " + ti, b: bo, u: "home", k: "msg" }, null);   // 5.2: যিনি পাঠান তিনিও পান · 5.3: সদস্যের পছন্দ/অ্যাডমিনের লক মেনে
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
      // সব নাম হস্তান্তর করা প্রাক্তন সদস্য (০ নাম, নিষ্ক্রিয়, বাকি জরিমানা নেই) নতুন বছরের ছক থেকে সরে যান — আগের বছরে রেকর্ড থাকে
      { const due = {}; rows("Fines").forEach(function (r) { if (String(r[2]).trim() !== "paid") due[String(r[0]).trim()] = 1; });
        const cv2 = cs.getDataRange().getDisplayValues();
        for (let i = cv2.length - 1; i >= 1; i--) { const nm = String(cv2[i][0]).trim(); if (nm && nm.charAt(0) !== "※" && nnum(cv2[i][1]) === 0 && String(cv2[i][14] || "").trim() === "নিষ্ক্রিয়" && !due[nm]) cs.deleteRow(i + 1); } }
      props().setProperty("set_year", String(y + 1));
      return { year: y, added: c + fp };
    }
    /* ----- স্বয়ংক্রিয় জরিমানা: বছরের নিয়ম অনুযায়ী (২০২৬ নাম প্রতি ২০০ ৳; ২০২৭ থেকে বাকি টাকার ১০%) — বসানোর মুহূর্তের হিসাবে, পরে বদলায় না ----- */
    case "fine_auto": {
      const m = Number(q.month); if (!(m >= 0 && m < 12)) throw new Error("\u09ae\u09be\u09b8 \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc");
      const names = (q.members || []).map(function (x) { return String(x).trim(); }).filter(Boolean);
      if (!names.length) throw new Error("\u0995\u09be\u0989\u0995\u09c7 \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09a8\u09bf");
      const cv = rows("Contributions"), fs = sheet("Fines"), fv = rows("Fines");
      let added = 0;
      names.forEach(function (nm) {
        const c = cv.filter(function (r) { return String(r[0]).trim() === nm; })[0]; if (!c) return;
        if (fv.some(function (r) { return String(r[0]).trim() === nm && String(r[3]).trim() === MONTHS[m]; })) return;
        if (fwHas(nm, m)) return;   // আগে বাতিল করা জরিমানা আবার বসে না
        const famt = fineCalc(nm, m, c); if (famt <= 0) return;
        fs.appendRow([nm, famt, "due", MONTHS[m], newId2("F")]); added++;
        pushQ(unOf([nm]), { t: "\u2696\ufe0f \u09a8\u09a4\u09c1\u09a8 \u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be", b: MONTHS_F[m] + " মাসের জরিমানা " + tk(famt) + " — চাঁদা দেরিতে এসেছে", u: "pay", k: "due" }, u.username);
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
      pushQ(allUsers(), { t: "\ud83d\uddf3\ufe0f \u09a8\u09a4\u09c1\u09a8 \u09ad\u09cb\u099f", b: qq + (end ? " (\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996 " + bnNum(end) + ")" : ""), u: "vote", k: "vote" });
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
    case "set_cashier": {   // \u098f\u0995\u09b8\u09be\u09a5\u09c7 \u098f\u0995\u099c\u09a8\u0987 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0; \u0986\u09ac\u09be\u09b0 \u099a\u09be\u09aa\u09b2\u09c7 \u09b8\u09b0\u09be\u09a8\u09cb \u09b9\u09af\u09bc
      const u = findUser(q.username); if (!u) throw new Error("\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      if (u.role === "admin") throw new Error("\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8\u0995\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be");
      const sh = sheet("Users"), v = sh.getDataRange().getValues(), make = u.role !== "cashier";
      for (let i = 1; i < v.length; i++) if (roleOf(v[i][3]) === "cashier") sh.getRange(i + 1, 4).setValue("member");
      if (make) sh.getRange(u.row, 4).setValue("cashier");
      return {};
    }
    case "cash_toggle": { if (q.on) props().deleteProperty("cash_off"); else props().setProperty("cash_off", "1"); return {}; }
    case "rule_add": {
      const t = String(q.title || "").trim(); if (!t) throw new Error("\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      rulesSheet().appendRow([t, String(q.body || "")]);
      pushQ(allUsers(), { t: "\ud83d\udcdc \u09a8\u09a4\u09c1\u09a8 \u09a8\u09bf\u09af\u09bc\u09ae", b: t, u: "rules", k: "rule" }); return {};
    }
    case "rule_edit": {
      const sh = rulesSheet(), r = checkRow(sh, q.row, q.key, 1), t = String(q.title || "").trim(); if (!t) throw new Error("\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8");
      sh.getRange(r, 1, 1, 2).setValues([[t, String(q.body || "")]]);
      pushQ(allUsers(), { t: "\ud83d\udcdc \u09a8\u09bf\u09af\u09bc\u09ae \u09ac\u09a6\u09b2\u09c7\u099b\u09c7", b: t, u: "rules", k: "rule" }); return {};
    }
    case "rule_del": { const sh = rulesSheet(); sh.deleteRow(checkRow(sh, q.row, q.key, 1)); return {}; }
    case "notice_add": {
      const sh = sheet("Notices"); sh.insertRowAfter(1);
      sh.getRange(2, 1, 1, 3).setValues([[String(q.date || ""), String(q.title || ""), String(q.body || "")]]);
      pushQ(allUsers(), { t: "\ud83d\udce3 \u09a8\u09a4\u09c1\u09a8 \u09a8\u09cb\u099f\u09bf\u09b6", b: String(q.title || q.body || "").slice(0, 150), u: "not", k: "not" });
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
    case "fine_void": { const why = needReason(q), sh = sheet("Fines"), r = checkRow(sh, q.row, q.key), x = sh.getRange(r, 1, 1, 5).getDisplayValues()[0]; q.member = x[0]; q.amount = x[1]; q.fineMonth = x[3]; voidRow(sh, r, "Fines", x[4], u, why); fwAdd(x[0], x[3], String(q.nf) === "1");
      { const mi = MONTHS.indexOf(String(x[3]).trim()); pushQ(unOf([String(x[0]).trim()]), { t: "✅ জরিমানা বাতিল", b: (mi >= 0 ? MONTHS_F[mi] + " মাসের " : "") + "জরিমানা " + tk(nnum(x[1])) + " বাতিল — কারণ: " + why, u: "pay:r", k: "pay" }, u.username); }
      return {}; }

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
function newPayId(sh) {   // 7.6: আইডির কলাম আর পড়া হয় না — মিলিসেকেন্ডের সময় + এলোমেলো ৪ অক্ষর (একই হওয়ার সম্ভাবনা কার্যত শূন্য; লকের ভেতরে চলে)
  return "P" + Date.now().toString(36).toUpperCase() + Utilities.getUuid().replace(/-/g, "").slice(0, 4).toUpperCase();
}
function findPay(sh, id) {
  const v = sh.getDataRange().getDisplayValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(id)) return { row: i + 1, r: v[i] };
  throw new Error("\u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
}
function renameEverywhere(old, name) {   // \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09a8\u09be\u09ae \u09ac\u09a6\u09b2\u09be\u09b2\u09c7 \u09b8\u09ac \u099f\u09cd\u09af\u09be\u09ac\u09c7 \u09ac\u09a6\u09b2\u09be\u09a8\u09cb
  [["Users", 1], ["Members", 1], ["Fines", 1], ["Payments", 3], ["Transfers", 5], ["Transfers", 6], ["Special", 3], ["Receipts", 2]].forEach(function (x) {
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
    const skip = { img: 1, hi: 1, withData: 1, action: 1, token: 1, password: 1, key: 1, row: 1, fields: 1, confirmYear: 1, sa: 1, cfg: 1, vapid: 1, ptk: 1, sha: 1, dh: 1 };
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
  const sh = sheet("Contributions"), v = sh.getDataRange().getDisplayValues(), src = MSP + String(r[0]);
  for (let i = 1; i < v.length; i++) if (String(v[i][0]).trim() === name) {
    const c = sh.getRange(i + 1, 3 + m), cur = Number(String(c.getDisplayValue()).replace(/[^0-9.]/g, "")) || 0;
    let reg = amt;
    if (sign > 0) {   // মাসিক বিশেষ চালু: আগে নিয়মিত (নাম × ১,০০০) পূরণ, বাকিটা সেই মাসের বিশেষ চাঁদা
      if (spRate(curYear(), m)) {
        const cap = Math.max(0, Math.round(shAt(name, nnum(v[i][1]), curYear(), m) * 1000) - cur);
        reg = Math.min(amt, cap);
        if (amt - reg > 0) spcAdd(name, amt - reg, mon, String(r[5] || ""), "মাসিক বিশেষ চাঁদা (পেমেন্ট " + String(r[0]) + ")", String(r[10] || "") || name, src);
      }
    } else {          // উল্টানো: এই পেমেন্টের বিশেষ অংশ বাতিল, বাকিটা নিয়মিত থেকে বাদ
      const ss = SS.getSheetByName("Special");
      if (ss) { const sv = ss.getDataRange().getDisplayValues();
        for (let j = sv.length - 1; j >= 1; j--) if (String(sv[j][8]) === src) { reg -= nnum(sv[j][3]); voidRow(ss, j + 1, "Special", sv[j][0], null, "পেমেন্টের সিদ্ধান্ত বদল / বাতিল (" + String(r[0]) + ")"); } }
      reg = Math.max(0, reg);
    }
    const nv = Math.max(0, cur + sign * reg);
    if (reg) c.setValue(nv ? nv : ""); return;
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
  return [id, now(), member, last4, amt, date, type, mon, method, status, by || "", by ? now() : "", by ? now() + " " + by + ": " + status : "", ""];
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
      const isCash = String(q.method || "").trim() === "ক্যাশ", isBank = String(q.method || "").trim() === "ব্যাংক";
      const last4 = isCash || isBank ? "" : String(q.last4 || "").replace(/\D/g, "");
      if (!isCash && !isBank && last4.length !== 4) throw new Error("নাম্বারের শেষ ৪ সংখ্যা লিখুন");
      const amt = Math.round(Number(q.amount) || 0); if (amt <= 0) throw new Error("\u099f\u09be\u0995\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09b2\u09bf\u0996\u09c1\u09a8");
      const date = String(q.date || "").trim(); if (!date) throw new Error("\u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8");
      if (!memberExists(u.name)) throw new Error("চাঁদার তালিকায় আপনার নাম নেই — অ্যাডমিনকে জানান");
      let meth = String(q.method || "").trim().slice(0, 30); if (!meth) meth = "MFS";
      if (/[=+@\-]/.test(meth.charAt(0))) meth = "'" + meth;
      const tg = payTarget(q);
      if (tg.type === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") checkFine(u.name, tg.mon, amt);
      if (tg.type === "চাঁদা") monCap(u.name, tg.mon, amt, true);
      const rc = isBank ? rcCheck(q) : null;   // 5.1: ব্যাংকে রশিদের ছবি বাধ্যতামূলক; একই ছবি আবার চলবে না
      const id = newPayId(sh), prow = payRow(id, u.name, last4, amt, date, tg.type, tg.mon, meth, ST.p, "");
      const rf = rc ? rcSave(rc, id, u.name) : null;
      if (rf) { prow[13] = "1"; if (!String(sh.getRange(1, 14).getValue())) sh.getRange(1, 14).setValue("রশিদ"); }
      const r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, PAY_HEAD.length).setNumberFormat("@");
      sh.getRange(r, 1, 1, PAY_HEAD.length).setValues([prow]);
      if (rf) rcRow(rc, rf, id, u.name);
      pushQ(staffUsers(), { t: "\ud83d\udcb8 \u09a8\u09a4\u09c1\u09a8 \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f", b: u.name + " \u00b7 " + tk(amt) + " \u00b7 " + payWhat(tg) + (meth && meth !== "MFS" ? " (" + String(meth).replace(/^'/, "") + ")" : ""), u: "cash", k: "req" }, u.username);
      return { id: id };
    }
    case "pay_cash": {     // \u0995\u09cd\u09af\u09be\u09b6 \u099c\u09ae\u09be \u2013 \u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u0993 \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8, \u09b8\u09b0\u09be\u09b8\u09b0\u09bf "\u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7"
      if (!staff) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ac\u09be \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const member = String(q.member || "").trim(); if (!memberExists(member)) throw new Error("\u09b8\u09a6\u09b8\u09cd\u09af \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf");
      const amt = Math.round(Number(q.amount) || 0); if (amt <= 0) throw new Error("\u099f\u09be\u0995\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09b2\u09bf\u0996\u09c1\u09a8");
      const date = String(q.date || "").trim() || Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy");
      const tg = payTarget(q);
      if (tg.type === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") checkFine(member, tg.mon, amt);
      if (tg.type === "চাঁদা") monCap(member, tg.mon, amt, true);
      const id = newPayId(sh), row = payRow(id, member, "", amt, date, tg.type, tg.mon, "\u0995\u09cd\u09af\u09be\u09b6", ST.a, u.name);
      const r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, PAY_HEAD.length).setNumberFormat("@");
      sh.getRange(r, 1, 1, PAY_HEAD.length).setValues([row]);
      applyPay(row, 1);
      pushQ(unOf([member]), { t: "\u2705 \u0995\u09cd\u09af\u09be\u09b6 \u099c\u09ae\u09be", b: payWhat(tg) + " " + tk(amt) + " \u099c\u09ae\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7 \u2014 " + u.name, u: "pay:r", k: "pay" }, u.username);
      return { id: id };
    }
    case "pay_info": {     // \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0/\u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8: \u099f\u09be\u0995\u09be \u09aa\u09be\u09a0\u09be\u09a8\u09cb\u09b0 \u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0, \u09a7\u09b0\u09a8 \u0993 WhatsApp
      if (!staff) throw new Error("\u09b6\u09c1\u09a7\u09c1 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ac\u09be \u0985\u09cd\u09af\u09be\u09a1\u09ae\u09bf\u09a8");
      const ty = String(q.type || ""); if (["bk", "ng", "both"].indexOf(ty) < 0) throw new Error("\u09a8\u09be\u09ae\u09cd\u09ac\u09be\u09b0\u09c7\u09b0 \u09a7\u09b0\u09a8 \u09ac\u09be\u099b\u09be\u0987 \u0995\u09b0\u09c1\u09a8");
      let n = String(q.num || "").replace(/\D/g, ""); if (n.indexOf("880") === 0) n = n.slice(2);
      if (!/^01\d{9}$/.test(n)) throw new Error("সঠিক নাম্বার দিন: ০১ দিয়ে শুরু, ১১ সংখ্যা");
      const wr = String(q.wa || "").trim(), wa = wr ? waNorm(wr) : "";
      if (wr && !wa) throw new Error("WhatsApp নাম্বারে দেশের কোড দিন (+966…)");
      const p = props();
      if (u.role !== "admin") {   // 6.7: ক্যাশিয়ারের বদল = অ্যাডমিনের অনুমতির রিকোয়েস্ট (সিয়ামের সিদ্ধান্ত, ২৫-১১-২০২৬)
        if (p.getProperty("pi_req")) throw new Error("আগের রিকোয়েস্ট এখনো অনুমতির অপেক্ষায়");
        p.setProperty("pi_req", JSON.stringify({ num: n, type: ty, wa: wa ? "+" + wa : "", by: u.name, byu: u.username, at: now() }));
        pushQ(piAdmins(), { t: "📲 নাম্বার বদলের রিকোয়েস্ট", b: u.name + " নাম্বার " + n + " করতে চান — অনুমতি দিন", u: "cash:oth", k: "req" }, u.username);
        return { pend: 1 };
      }
      piApply(n, ty, wa ? "+" + wa : "", u);
      return {};
    }
    case "pay_info_ok":
    case "pay_info_no": {  // 6.7: শুধু অ্যাডমিন — ক্যাশিয়ারের নাম্বার-বদল রিকোয়েস্টে সিদ্ধান্ত
      if (u.role !== "admin") throw new Error("শুধু অ্যাডমিন");
      const p = props(), rq = JSON.parse(p.getProperty("pi_req") || "null");
      if (!rq) throw new Error("কোনো অপেক্ষমাণ রিকোয়েস্ট নেই");
      p.deleteProperty("pi_req"); q.num = rq.num; q.by = rq.by;
      if (q.action === "pay_info_ok") piApply(rq.num, rq.type, rq.wa, u, rq.byu);
      pushQ([rq.byu], q.action === "pay_info_ok" ? { t: "✅ নাম্বার বদল অনুমোদিত", b: "নাম্বার এখন " + rq.num + " — অনুমতি দিয়েছেন " + u.name, u: "cash:oth", k: "req" }
        : { t: "❌ নাম্বার বদল প্রত্যাখ্যাত", b: rq.num + " অনুমোদন হয়নি — আগের নাম্বারই থাকছে", u: "cash:oth", k: "req" });
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
      if (u.role !== "admin") {   // 6.5: ক্যাশিয়ার একবারই সিদ্ধান্ত দেন (সিয়ামের সিদ্ধান্ত, ২৫-১১-২০২৬)
        if (ns === ST.p) throw new Error("\"জমা হয়েছে\" বা \"হয়নি\" বাছাই করুন");
        if (old !== ST.p) throw new Error("সিদ্ধান্ত আগেই দেওয়া — বদলাতে অ্যাডমিনকে জানান");
      }
      if (old === ns) return {};
      if (ns === ST.a && p.r[6] === "\u099c\u09b0\u09bf\u09ae\u09be\u09a8\u09be") checkFine(p.r[2], String(p.r[7]).trim(), Number(String(p.r[4]).replace(/[^0-9.]/g, "")) || 0);
      if (ns === ST.a && String(p.r[6]) === "চাঁদা") monCap(String(p.r[2]).trim(), String(p.r[7]).trim(), nnum(p.r[4]), false);
      if (old === ST.a) applyPay(p.r, -1);
      if (ns === ST.a) applyPay(p.r, 1);
      sh.getRange(p.row, 10, 1, 4).setValues([[ns, u.name, now(), (p.r[12] ? p.r[12] + "\n" : "") + now() + " " + u.name + ": " + ns]]);
      if (ns === ST.a || ns === ST.r) {
        const w = payWhat({ type: p.r[6], mon: String(p.r[7]).trim() }), a = tk(Number(String(p.r[4]).replace(/[^0-9.]/g, "")) || 0);
        pushQ(unOf([String(p.r[2]).trim()]), ns === ST.a ? { t: "\u2705 \u099f\u09be\u0995\u09be \u099c\u09ae\u09be", b: w + " " + a + " \u2014 \u09af\u09be\u099a\u09be\u0987 \u0995\u09b0\u09c7\u099b\u09c7\u09a8 " + u.name, u: "pay:r", k: "pay" }
          : { t: "\u274c \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f \u09ae\u09c7\u09b2\u09c7\u09a8\u09bf", b: w + " " + a + " \u2014 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0 \u09ae\u09c7\u09b2\u09be\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8\u09a8\u09bf\u0964 \u09a4\u09a5\u09cd\u09af \u09a6\u09c7\u0996\u09c7 \u0995\u09cd\u09af\u09be\u09b6\u09bf\u09af\u09bc\u09be\u09b0\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964", u: "pay:r", k: "pay" }, u.username);
      }
      return {};
    }
    case "pay_purge": {    // 6.4: শুধু অ্যাডমিন — আগে থেকে "বাতিল" রিকোয়েস্ট শিট থেকে পুরো মুছে ফেলা (পরীক্ষামূলক/ভুল রিকোয়েস্ট); হিসাবে প্রভাব নেই
      if (u.role !== "admin") throw new Error("শুধু অ্যাডমিন");
      const p = findPay(sh, q.id);
      if (p.r[9] !== ST.c && p.r[9] !== ST.r) throw new Error("শুধু \"বাতিল\" বা \"হয়নি\" রিকোয়েস্ট মোছা যায়");
      q.member = p.r[2]; q.amount = p.r[4];
      const rs = SS.getSheetByName("Receipts");
      if (rs && rs.getLastRow() > 1) { const v = rs.getRange(2, 1, rs.getLastRow() - 1, 3).getDisplayValues();
        for (let i = v.length - 1; i >= 0; i--) if (String(v[i][0]) === String(q.id)) { try { DriveApp.getFileById(String(v[i][2])).setTrashed(true); } catch (e) {} rs.deleteRow(i + 2); } }
      sh.deleteRow(p.row);
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
function midNext(v, pre) {   // pre: "M" = বর্তমান সদস্য, "X" = প্রাক্তন সদস্য — প্রতিটির নিজস্ব ক্রম
  pre = pre || "M"; let mx = 0;
  v.forEach(function (r) { const m = String(r[0]).match(/^([A-Z])-(\d+)$/); if (m && m[1] === pre && Number(m[2]) > mx) mx = Number(m[2]); });
  return pre + "-" + String(mx + 1).padStart(2, "0");
}
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
  pushQ(staffUsers(), { t: (ageH >= 72 ? "🔴 " : "⏳ ") + bnNum(n) + "টি রিকোয়েস্ট অপেক্ষায়", b: "সবচেয়ে পুরোনোটি " + age + " ধরে পেন্ডিং। যাচাই করে \"জমা হয়েছে\" বা \"হয়নি\" দিন।", u: "cash", k: "req", g: "pend" });
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
// বাতিল করা জরিমানার তালিকা (২৪-১১-২০২৬): props fw = [{m:সদস্য, y:বছর, mo:মাস ০-১১, nf:১ = সদস্যের দোষ ছিল না}] — ব্যাজের ধারা ও হাতের স্বয়ংক্রিয় জরিমানার জন্য
function fwList() { try { const a = JSON.parse(props().getProperty("fw") || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
function fwAdd(m, mon, nf) { const mo = MONTHS.indexOf(String(mon).trim()); if (mo < 0) return; const y = curYear(), nm = String(m).trim();
  const a = fwList().filter(function (o) { return !(o.m === nm && o.y === y && o.mo === mo); }); a.push({ m: nm, y: y, mo: mo, nf: nf ? 1 : 0 });
  props().setProperty("fw", JSON.stringify(a.slice(-400))); }
function fwHas(m, mo) { const y = curYear(), nm = String(m).trim(); return fwList().some(function (o) { return o.m === nm && o.y === y && o.mo === mo; }); }
function needReason(q) { const s = String(q.reason || "").trim(); if (s.length < 3) throw new Error("বাতিলের কারণ লিখুন (কমপক্ষে ৩ অক্ষর)"); return s.slice(0, 200); }
// সারিটি "Voided" শিটে কারণসহ রেখে মূল শিট থেকে সরানো (রেকর্ড হারায় না, হিসাবে উল্টো ভাউচার পড়ে)
function voidRow(sh, row, name, id, u, reason) {
  const vals = sh.getRange(row, 1, 1, Math.max(sh.getLastColumn(), 1)).getDisplayValues()[0], vs = voidSheet(), r = vs.getLastRow() + 1;
  vs.getRange(r, 1, 1, 6).setNumberFormat("@");
  vs.getRange(r, 1, 1, 6).setValues([[now(), name, String(id || ""), u ? u.name : "সিস্টেম", reason, JSON.stringify(vals)]]);
  sh.deleteRow(row);
}
// শিটগুলোর বর্তমান অবস্থা থেকে প্রতিটি খাতের ব্যালান্স (স্বাভাবিক দিকে ধনাত্মক)
/* 6.0 আগ্রহ-ফিচার ১: লক্ষ্য ও অগ্রগতি — লক্ষ্য = বছরের শুরুর ফান্ড (পূর্ববর্তী তহবিল 3100 + জিসানের সঞ্চয় 2100) + সেই বছরের সব নির্ধারিত চাঁদা
 * (মাসভিত্তিক নাম × (১,০০০ + মাসিক বিশেষ হার)); অগ্রগতি = মোট ফান্ড (নগদ + বিনিয়োগ)। ৫০/৭৫/৯০/১০০% পার হলে সবাইকে একবার নোটিফিকেশন।
 * props gl_<বছর> = শেষ জানানো ধাপ; প্রথমবার চুপচাপ বর্তমান ধাপ রাখা হয় (আগে পার হওয়া ধাপের খবর যায় না)। ফেরত: {goal, tot, p, ms} */
const GL_MS = [50, 75, 90, 100];
function glCalc() {
  const y = curYear(), st = jState(), tot = (st["1100"] || 0) + (st["1200"] || 0), trs = trActive(y);
  let ex = 0;
  rows("Contributions").forEach(function (r) {
    const nm = String(r[0]).trim(); if (!nm || nm.charAt(0) === "※") return;
    for (let m = 0; m < 12; m++) {
      let s = nnum(r[1]);
      trs.forEach(function (t) { const tm = MONTHS.indexOf(String(t[3]).trim()); if (tm <= m) return; const k = nnum(t[6]); if (String(t[4]).trim() === nm) s += k; if (String(t[5]).trim() === nm) s -= k; });
      ex += Math.max(0, s) * (1000 + spRate(y, m));
    }
  });
  const goal = (st["3100"] || 0) + (st["2100"] || 0) + ex; if (!(ex > 0) || !(goal > 0)) return null;
  const p = tot / goal * 100; let ms = 0; GL_MS.forEach(function (v) { if (p >= v) ms = v; });
  return { y: y, goal: Math.round(goal), tot: Math.round(tot), p: p, ms: ms };
}
function glRun() {
  const P = props(); if (P.getProperty("mig3a") !== "1") return;
  const g = glCalc(); if (!g) return; const key = "gl_" + g.y, v = P.getProperty(key);
  if (v === null) { P.setProperty(key, String(g.ms)); return; }
  if (g.ms <= Number(v)) return;
  P.setProperty(key, String(g.ms));
  const yy = bnNum(g.y), full = g.ms >= 100;
  pushQ(allUsers(), { k: "gl", u: "home", g: "goal-" + g.y + "-" + g.ms,
    t: full ? "🏆 লক্ষ্য পূরণ!" : "লক্ষ্যের " + bnNum(g.ms) + "% পূরণ",
    b: full ? yy + "-এর লক্ষ্য " + tk(g.goal) + " পূরণ হয়েছে — সবাইকে অভিনন্দন! ঐক্য • বিনিয়োগ • উন্নয়ন"
            : yy + "-এর লক্ষ্য " + tk(g.goal) + "-এর " + bnNum(g.ms) + "% জমা হয়েছে — আর " + tk(Math.max(0, g.goal - g.tot)) + " বাকি। চলুন এগিয়ে যাই!" });
  try { logAct({ name: "সিস্টেম", username: "system", role: "admin" }, { action: "goal_step", step: g.ms, goal: g.goal, tot: g.tot }); } catch (e) {}
}
/* 7.6: টাকার রিকোয়েস্টের কাজে (J_FAST) বিনিয়োগ/সারসংক্ষেপ/আয়-ব্যয় শিট বদলায় না — এদের যোগফল props jsc-তে (১ ঘণ্টা) রাখা;
 * অন্য যেকোনো টাকার কাজ, ঘণ্টার যাচাই ও অ্যাপ খোলার jView আবার পুরো পড়ে নতুন করে রাখে */
const J_FAST = { pay_set: 1, pay_cash: 1, pay_del: 1 };
function jState(fast) {
  const b = {}; ACC.forEach(function (a) { b[a[0]] = 0; });
  let sc = null; if (fast) { try { sc = JSON.parse(props().getProperty("jsc") || "null"); if (!sc || Date.now() - Number(sc.at || 0) > 36e5) sc = null; } catch (e) { sc = null; } }
  rows("Contributions").forEach(function (r) { const nm = String(r[0]).trim(); if (!nm || nm.charAt(0) === "※") return; for (let i = 2; i < 14; i++) b["4100"] += nnum(r[i]); });
  rows("Special").forEach(function (r) { if (String(r[0]).trim()) b["4200"] += nnum(r[3]); });
  rows("Fines").forEach(function (r) { if (String(r[0]).trim() && String(r[2]).trim() === "paid") b["4300"] += nnum(r[1]); });
  if (sc) Object.keys(sc.b || {}).forEach(function (k) { if (k in b) b[k] += Number(sc.b[k]) || 0; });
  else {
    const z = {}; ACC.forEach(function (a) { z[a[0]] = 0; });
    rows("Investments").forEach(function (r) { if (String(r[0]).trim() && !/^ফেরত/.test(String(r[9] || ""))) z["1200"] += nnum(r[1]); });
    const SK = { prev: "3100", jisan: "2100", tax: "5100", profit: "4400", irr: "5200" };
    rows("Summary").forEach(function (r) { const k = SK[String(r[0]).trim()]; if (k) z[k] += nnum(r[1]); });
    rows("Ledger").forEach(function (r) {
      if (!String(r[0]).trim()) return; const ty = String(r[2]).trim(), a = nnum(r[4]);
      const ct = String(r[3]);
      if (ty === "in") z[/লাভ|নাফা/.test(ct) ? "4400" : "4900"] += a;
      else if (ty === "out") z[/ট্যাক্স|চার্জ/.test(ct) ? "5100" : /সেচ|চাষ/.test(ct) ? "5200" : "5900"] += a;
    });
    const zz = {}; Object.keys(z).forEach(function (k) { if (z[k]) { zz[k] = z[k]; b[k] += z[k]; } });
    try { props().setProperty("jsc", JSON.stringify({ at: Date.now(), b: zz })); } catch (e) {}
  }
  let c = 0, d = 0; ACC.forEach(function (a) { if (a[0] === "1100") return; if (a[2] === "C") c += b[a[0]]; else d += b[a[0]]; });
  b["1100"] = c - d;
  return b;
}
// Journal থেকে প্রতিটি খাতের ব্যালান্স
function jBal(sh) {
  const b = {}, side = {}; ACC.forEach(function (a) { b[a[0]] = 0; side[a[0]] = a[2]; });
  let dr = 0, cr = 0, n = 0;
  const L = sh ? sh.getLastRow() : 0, v = L > 1 ? sh.getRange(2, 3, L - 1, 4).getDisplayValues() : [];
  v.forEach(function (r) {
    const k = String(r[0]).trim(), D = nnum(r[2]), C = nnum(r[3]); if (!side[k]) return;
    dr += D; cr += C; n++; b[k] += side[k] === "D" ? D - C : C - D;
  });
  if (sh) jbcPut(L, b);
  return { b: b, dr: dr, cr: cr, n: n };
}
/* 7.6: Journal-এর খাতভিত্তিক যোগফল props jbc {n: শেষ সারি, b} — শুধু নতুন সারি পড়া হয়; সারি কমলে বা না মিললে পুরো পড়া।
 * Journal-এ লেখে শুধু jSync (লকের ভেতরে); ঘণ্টার যাচাই (auto_check) ও অ্যাপ খোলার jView সবসময় পুরো পড়ে, তাই হাতে বদল ধরা পড়ে */
function jbcPut(n, b) { try { const o = {}; Object.keys(b).forEach(function (k) { if (b[k]) o[k] = Math.round(b[k] * 100) / 100; }); props().setProperty("jbc", JSON.stringify({ n: n, b: o })); } catch (e) {} }
function jBalFast(sh, L) {
  let c = null; try { c = JSON.parse(props().getProperty("jbc") || "null"); } catch (e) {}
  if (!c || !(c.n >= 1) || L < c.n) return jBal(sh).b;
  const b = {}, side = {}; ACC.forEach(function (a) { b[a[0]] = Number((c.b || {})[a[0]]) || 0; side[a[0]] = a[2]; });
  if (L > c.n) sh.getRange(c.n + 1, 3, L - c.n, 4).getDisplayValues().forEach(function (r) {
    const k = String(r[0]).trim(), D = nnum(r[2]), C = nnum(r[3]); if (!side[k]) return; b[k] += side[k] === "D" ? D - C : C - D; });
  return b;
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
  const act0 = q ? String(q.action || "") : "", full = act0 === "auto_check" || /^migrate/.test(act0);
  const sh = jSheet(), L = sh.getLastRow(), st = jState(!full && J_FAST[act0]), cur = full ? jBal(sh).b : jBalFast(sh, L), lines = [];
  ACC.forEach(function (a) { const d = Math.round(st[a[0]] - cur[a[0]]); if (d) lines.push([a, d]); });
  if (!lines.length) { if (!full) jbcPut(L, cur); return null; }
  const vid = newId2("J"), t = now(), desc = jDesc(q), who = u ? u.name : "সিস্টেম", act = q ? String(q.action || "") : "";
  const out = lines.map(function (x) { const a = x[0], d = x[1], isDr = (a[2] === "D") === (d > 0), amt = String(Math.abs(d));
    return [vid, t, a[0], a[1], isDr ? amt : "", isDr ? "" : amt, desc, act, who]; });
  out.sort(function (x, y) { return (y[4] ? 1 : 0) - (x[4] ? 1 : 0); });   // ডেবিট আগে
  const r = L + 1;
  sh.getRange(r, 1, out.length, 9).setNumberFormat("@");
  sh.getRange(r, 1, out.length, 9).setValues(out);
  lines.forEach(function (x) { cur[x[0][0]] += x[1]; });   // d = st − cur, তাই নতুন যোগফল = st
  jbcPut(r + out.length - 1, cur);
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
    pushQ(adm, { t: "⏰ গিরবির মেয়াদ", b: String(r[0]) + (r[6] ? " (" + r[6] + ")" : "") + " — " + (d < 0 ? "মেয়াদ পেরিয়ে গেছে" : d === 0 ? "আজ শেষ দিন" : bnNum(d) + " দিন বাকি") + " · " + String(r[8]), u: "inv", k: "inv" }, null, true);
  });
  pushFlush();
}
/* ---------- Phase 4: লগইনের সঙ্গে তথ্য ---------- */
function loginData(r, q) {
  if (r.ok) {
    const lu = findUser(r.user.username);
    if (lu) { r.user.tfa = tfaOn(lu); if (q.withData) { markOn(lu); r.user.adminSet = !!lu.apw; r.cashOn = cashOn(); r.settings = settings(); r.data = readAll(lu.role === "admin", lu); } }
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
      out.push(["N" + ((Number(it.ts) || b) + i).toString(36), it.at || now(), us.join(","), String(it.msg.t || "").slice(0, 150), String(it.msg.b || "").slice(0, 500), String(it.msg.u || "home"), String(it.msg.k || "")]); });
    if (!out.length) return;
    const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return;
    try {
      const sh = nfSheet(), r = sh.getLastRow() + 1;
      if (!String(sh.getRange(1, 7).getValue()).trim()) sh.getRange(1, 7).setValue("ধরন");
      sh.getRange(r, 1, out.length, 7).setNumberFormat("@"); sh.getRange(r, 1, out.length, 7).setValues(out);
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
/* 5.2: অ্যাডমিনের নিজে লেখা নোটিফিকেশন — তালিকা ও সবার নোটিফিকেশন সেন্টার থেকে মোছা (ফোনে পৌঁছানোটা ফেরানো যায় না) */
function nfSent() {
  try {
    const sh = SS.getSheetByName("Notifs"); if (!sh || sh.getLastRow() < 2) return [];
    const n = Math.min(2000, sh.getLastRow() - 1), w = Math.min(7, sh.getLastColumn()), v = sh.getRange(sh.getLastRow() - n + 1, 1, n, w).getDisplayValues(), o = [];
    for (let i = v.length - 1; i >= 0 && o.length < 30; i--) {
      const k = String(v[i][6] || ""), ti = String(v[i][3]);
      if (!(k === "msg" || (!k && ti.indexOf("\ud83d\udd14 ") === 0))) continue;
      o.push([v[i][0], v[i][1], ti, v[i][4], String(v[i][2]).split(",").filter(function (x) { return x; }).length]);
    }
    return o;
  } catch (e) { return []; }
}
function nfDel(q) {
  const id = String(q.id || "").trim(); if (!/^N[0-9a-z]+$/.test(id)) throw new Error("নোটিফিকেশন আইডি সঠিক নয়");
  const sh = SS.getSheetByName("Notifs"); if (!sh || sh.getLastRow() < 2) throw new Error("নোটিফিকেশনটি পাওয়া যায়নি");
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues();
  for (let i = v.length - 1; i >= 0; i--) if (v[i][0] === id) { sh.deleteRow(i + 2); return {}; }
  throw new Error("নোটিফিকেশনটি পাওয়া যায়নি");
}
function nfEdit(q) {   // শুধু নোটিফিকেশন সেন্টারের লেখা বদলায় — ফোনে আবার যায় না
  const id = String(q.id || "").trim(); if (!/^N[0-9a-z]+$/.test(id)) throw new Error("নোটিফিকেশন আইডি সঠিক নয়");
  const ti = String(q.title || "").trim().slice(0, 80), bo = String(q.body || "").trim().slice(0, 300);
  if (!ti || !bo) throw new Error("শিরোনাম ও বার্তা লিখুন");
  const sh = SS.getSheetByName("Notifs"); if (!sh || sh.getLastRow() < 2) throw new Error("নোটিফিকেশনটি পাওয়া যায়নি");
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues();
  for (let i = v.length - 1; i >= 0; i--) if (v[i][0] === id) { sh.getRange(i + 2, 4, 1, 2).setNumberFormat("@").setValues([["\ud83d\udd14 " + ti, bo]]); return {}; }
  throw new Error("নোটিফিকেশনটি পাওয়া যায়নি");
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
  if (/^(notice_|poll_|vote|rule|nf_|push_send)/.test(a)) return "not";
  return "sys";
}
function logGet(q) {
  const sh = SS.getSheetByName("Log"); if (!sh || sh.getLastRow() < 2) return { ok: true, rows: [], total: 0, who: [] };
  const all = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getDisplayValues().reverse(), who = {};
  all.forEach(function (r) { if (r[1]) who[r[1]] = 1; });
  const wq = String(q.who || ""), cq = String(q.cat || ""), sq = String(q.q || "").trim().toLowerCase();
  // অনুসন্ধান: প্রতিটি শব্দ মিলতে হবে — লেখা সরাসরি মিললে, অথবা অ্যাপের পাঠানো বাংলা নাম থেকে কাজের কোড/তথ্যের কী/ভূমিকা মিললে (সিয়াম ২২-১১: বাংলায় খুঁজলে কিছু আসত না, কারণ শিটে ইংরেজি কোড থাকে)
  const tm = (Array.isArray(q.tm) ? q.tm : []).slice(0, 6).map(function (t) { t = Array.isArray(t) ? t : []; const L = function (x) { return (Array.isArray(x) ? x : []).slice(0, 80).map(String); }; return { w: String(t[0] || "").toLowerCase().slice(0, 60), a: L(t[1]), k: L(t[2]), r: L(t[3]) }; }).filter(function (t) { return t.w; });
  const hit = function (r, t) {
    return (r[0] + " " + r[1] + " " + r[3] + " " + r[4]).toLowerCase().indexOf(t.w) >= 0 || t.a.indexOf(r[3]) >= 0 || t.r.indexOf(r[2]) >= 0 || t.k.some(function (k) { return String(r[4]).indexOf(k + "=") >= 0; });
  };
  const f = all.filter(function (r) { return (!wq || r[1] === wq) && (!cq || logCat(r[3]) === cq) && (!sq || (tm.length ? tm.every(function (t) { return hit(r, t); }) : (r[0] + " " + r[1] + " " + r[3] + " " + r[4]).toLowerCase().indexOf(sq) >= 0)); });
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
/* ---------- 4.3: সদস্যের ছবি — Photos শিট: A নাম | B ছবি (data:image/jpeg;base64, ≤৪৮,০০০ অক্ষর) | C সংস্করণ | D সময় | E কে ----------
 * data-তে শুধু {নাম: সংস্করণ} যায়; অ্যাপ নতুন/বদলানো ছবিগুলো photo_get দিয়ে এনে ফোনে জমা রাখে */
/* 6.1: উচ্চমানের ছবি (৭২০px) — এক ঘরে ৫০,০০০ অক্ষরের সীমা, তাই B-তে প্রথম অংশ, বাকিটা F…J-তে (PH_X ঘর); photo_get জোড়া লাগিয়ে দেয়।
 * অ্যাপ q.img (ছোট, পুরোনো সার্ভারের জন্য) ও q.hi (উচ্চমান) দুটোই পাঠায় */
const PH_CH = 48000, PH_X = 5, PH_W = 5 + PH_X;
function phSheet() { const sh = mkSheet("Photos", ["নাম", "ছবি", "সংস্করণ", "সময়", "কে"]); if (sh.getLastColumn() < PH_W) sh.getRange(1, 6, 1, PH_X).setValues([["ছবি ২", "ছবি ৩", "ছবি ৪", "ছবি ৫", "ছবি ৬"]]); return sh; }
function photoVers() {
  try { const sh = SS.getSheetByName("Photos"); if (!sh || sh.getLastRow() < 2) return {};
    const n = sh.getLastRow() - 1, a = sh.getRange(2, 1, n, 1).getDisplayValues(), c = sh.getRange(2, 3, n, 1).getDisplayValues(), o = {};
    a.forEach(function (x, i) { const k = String(x[0]).trim(); if (k && c[i][0]) o[k] = String(c[i][0]); }); return o; } catch (e) { return {}; }
}
function photoGet(q) {
  const want = {}; (q.names || []).slice(0, 60).forEach(function (x) { want[String(x).trim()] = 1; });
  const sh = SS.getSheetByName("Photos"), o = {}; if (!sh || sh.getLastRow() < 2) return { ok: true, photos: o };
  const w = Math.min(PH_W, sh.getLastColumn());
  sh.getRange(2, 1, sh.getLastRow() - 1, w).getDisplayValues().forEach(function (r) { const k = String(r[0]).trim(); if (want[k] && r[1]) o[k] = { img: r[1] + r.slice(5).join(""), v: r[2] }; });
  return { ok: true, photos: o };
}
function photoAct(u, q) {
  const nm = String(q.name || u.name).trim();
  if (!nm) throw new Error("নাম পাওয়া যায়নি");
  if (nm !== u.name && u.role !== "admin") throw new Error("শুধু নিজের ছবি বদলানো যায়");
  const sh = phSheet(), v = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues() : [];
  let r = -1; v.forEach(function (x, i) { if (String(x[0]).trim() === nm) r = i + 2; });
  if (q.action === "photo_del") { if (r > 0) sh.deleteRow(r); return { name: nm }; }
  const okImg = function (x, mx) { return /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(x) && x.length <= mx; };
  let img = String(q.img || ""); const hi = String(q.hi || "");
  if (hi && okImg(hi, PH_CH * (PH_X + 1))) img = hi;
  else if (!okImg(img, PH_CH)) throw new Error("ছবি সঠিক নয় বা খুব বড়");
  const parts = []; for (let i = 0; i < img.length; i += PH_CH) parts.push(img.slice(i, i + PH_CH));
  const ext = parts.slice(1); while (ext.length < PH_X) ext.push("");
  const ver = Date.now().toString(36); if (r < 0) r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, PH_W).setNumberFormat("@"); sh.getRange(r, 1, 1, PH_W).setValues([[nm, parts[0], ver, now(), u.name].concat(ext)]);
  return { name: nm, v: ver };
}
function migrate58() {   // একবার: সারাংশের পুরোনো লাভ/ট্যাক্স/সেচ → আয়-ব্যয় (Ledger) তালিকায় (সিয়ামের সিদ্ধান্ত, ২২-১১-২০২৬: সব ২০২৬-এর, তারিখ ২২-১১-২০২৬, লাভ এক লাইনে) — মোট ফান্ড/নগদ/খাত অপরিবর্তিত
  const p = props(); if (p.getProperty("mig58") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    if (p.getProperty("mig58") === "1") return;
    const sm = SS.getSheetByName("Summary");
    if (sm) {
      const MK = "পুরোনো হিসাব — সারাংশ থেকে সরানো", sv = sm.getDataRange().getDisplayValues(), at = {};
      for (let i = 1; i < sv.length; i++) { const k = String(sv[i][0]).trim(); if (k === "profit" || k === "tax" || k === "irr") at[k] = { r: i + 1, v: nnum(sv[i][1]) }; }
      const plan = [["profit", "in", "লাভ প্রাপ্তি", "দুই গিরবি মিলিয়ে লাভ (কোনটি থেকে কত — জানা নেই)"], ["tax", "out", "ট্যাক্স / চার্জ", "ট্যাক্স / চার্জ"], ["irr", "out", "সেচ / চাষের খরচ", "সেচের জন্য প্রদান"]]
        .filter(function (x) { return at[x[0]] && at[x[0]].v > 0; });
      if (plan.length) {
        const sh = mkSheet("Ledger", ["আইডি", "তারিখ", "ধরন", "খাত", "টাকা", "থেকে", "তে", "বিবরণ", "কে লিখেছেন", "সময়"]);
        if (sh.getRange(1, 11).getDisplayValue() === "") sh.getRange(1, 11).setValue("বিনিয়োগ আইডি");
        const done = rows("Ledger").some(function (r) { return String(r[7]).indexOf(MK) >= 0; });   // আগে অর্ধেক হয়ে থাকলে আবার লেখা নয়
        if (!done) {
          const out = plan.map(function (x, i) { return [newId(sh, "L") + i, "22-11-2026", x[1], x[2], String(at[x[0]].v), x[1] === "out" ? "hand" : "", x[1] === "in" ? "hand" : "", x[3] + " · " + MK, "সিস্টেম", now(), ""]; });
          const r = sh.getLastRow() + 1;
          sh.getRange(r, 1, out.length, 11).setNumberFormat("@");
          sh.getRange(r, 1, out.length, 11).setValues(out);
        }
        plan.forEach(function (x) { sm.getRange(at[x[0]].r, 2).setValue(0); });
        SpreadsheetApp.flush();
      }
    }
    p.setProperty("mig58", "1");
  } finally { lock.releaseLock(); }
}
function migrate57() {   // একবার: মডারেটর ব্যবস্থা বাদ (সিয়ামের সিদ্ধান্ত, ২০-১১-২০২৬) — Users শিটে "moderator" → "member"
  const p = props(); if (p.getProperty("mig57") === "1") return;
  const sh = SS.getSheetByName("Users");
  if (sh && sh.getLastRow() >= 2) { const rg = sh.getRange(2, 4, sh.getLastRow() - 1, 1), v = rg.getValues(); let ch = 0;
    v.forEach(function (r) { if (String(r[0]).trim().toLowerCase() === "moderator") { r[0] = "member"; ch = 1; } }); if (ch) rg.setValues(v); }
  p.setProperty("mig57", "1");
}
function migrate4b() {   // একবার: বর্তমান সদস্যরা Contributions-এর ক্রমে M-01…, শুধু পুরোনো বছরে থাকা (প্রাক্তন) সদস্যরা X-01…
  const p = props(); if (p.getProperty("mig4b") === "1") return;
  const lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    if (p.getProperty("mig4b") === "1") return;
    const sh = midSheet(), v = midRows(), cur = [], out = [], used = {};
    rows("Contributions").forEach(function (r) { const n = String(r[0]).trim(); if (n && n.charAt(0) !== "※") cur.push(MID_ALIAS[n] || n); });
    let m = 0, x = 0;
    cur.forEach(function (n) { const i = midFind(v, n); if (i >= 0 && used[i]) return; if (i >= 0) used[i] = 1;
      out.push(["M-" + String(++m).padStart(2, "0"), n, i >= 0 ? v[i][2] : "", i >= 0 ? v[i][3] : now()]); });
    v.forEach(function (r, i) { if (used[i] || !String(r[1]).trim()) return; out.push(["X-" + String(++x).padStart(2, "0"), r[1], r[2], r[3]]); });
    const before = v.map(function (r) { return r[0] + "=" + r[1]; }).join("; ");
    if (v.length) sh.getRange(2, 1, v.length, 4).clearContent ? sh.getRange(2, 1, v.length, 4).clearContent() : sh.getRange(2, 1, v.length, 4).setValues(v.map(function () { return ["", "", "", ""]; }));
    if (out.length) { sh.getRange(2, 1, out.length, 4).setNumberFormat("@"); sh.getRange(2, 1, out.length, 4).setValues(out); }
    p.setProperty("mig4b", "1"); dropRS();
    logAct({ name: "সিস্টেম", role: "system" }, { action: "migrate_4b", current: m, former: x, before: before.slice(0, 400) });
  } finally { lock.releaseLock(); }
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

/* ---------- শেয়ার (নাম) হস্তান্তর — ১৯-১১-২০২৬ ----------
 * Transfers শিট: A আইডি | B তারিখ | C বছর | D মাস | E দাতা | F গ্রহীতা | G নাম সংখ্যা | H স্থানান্তরিত জমা | I কারণ | J কে | K সময় | L অবস্থা | M নতুন সদস্য | N দাতার আগের আইডি
 * হস্তান্তরের মাস থেকে নতুন নাম সংখ্যা ধরা হয় (সেই মাসের চাঁদা নতুন মালিকের); আগের মাসগুলোতে পুরোনো নাম সংখ্যা।
 * টাকার লেনদেন দুজনের মধ্যে — Journal/নগদে কোনো প্রভাব নেই; এখানে শুধু রেকর্ড। */
const TR_HEAD = ["আইডি", "তারিখ", "বছর", "মাস", "দাতা", "গ্রহীতা", "নাম সংখ্যা", "স্থানান্তরিত জমা (৳)", "কারণ", "কে", "সময়", "অবস্থা", "নতুন সদস্য", "দাতার আগের আইডি"];
function trSheet() { const had = !!SS.getSheetByName("Transfers"), sh = mkSheet("Transfers", TR_HEAD); if (!had) { sh.setFrozenRows(1); try { sh.protect().setDescription("UIF শেয়ার হস্তান্তর — হাতে বদলাবেন না").setWarningOnly(true); } catch (e) {} } return sh; }
function trActive(y) { return rows("Transfers").filter(function (r) { return String(r[0]).trim() && !String(r[11] || "").trim() && (y == null || Number(r[2]) === Number(y)); }); }
// বছরের কোনো মাসে কারও নাম সংখ্যা: বছর শেষের (বা এখনকার) সংখ্যা থেকে পরের মাসগুলোর হস্তান্তর উল্টে
function shAt(name, base, y, m) {
  let s = Number(base) || 0; name = String(name).trim();
  trActive(y).forEach(function (r) {
    const tm = MONTHS.indexOf(String(r[3]).trim()); if (tm <= m) return;
    const k = nnum(r[6]); if (String(r[4]).trim() === name) s += k; if (String(r[5]).trim() === name) s -= k;
  });
  return Math.max(0, s);
}
function trNames(name) {   // সদস্যের বর্তমান + আগের নাম (MemberIDs)
  const v = midRows(), i = midFind(v, name), out = [String(name).trim()];
  if (i >= 0) String(v[i][2] || "").split(";").forEach(function (x) { x = x.trim(); if (x && out.indexOf(x) < 0) out.push(x); });
  return out;
}
// রেকর্ডে থাকা মোট জমা: সব বছরের মাসিক চাঁদা + বিশেষ চাঁদা ± আগের হস্তান্তর
function trDeposit(name) {
  const nm = {}; trNames(name).forEach(function (x) { nm[x] = 1; });
  let t = 0;
  const addC = function (v) { v.forEach(function (r) { if (nm[String(r[0]).trim()]) for (let i = 2; i < 14; i++) t += nnum(r[i]); }); };
  const addS = function (v) { v.forEach(function (r) { if (String(r[0]).trim() && nm[String(r[2]).trim()]) t += nnum(r[3]); }); };
  archYears().forEach(function (y) { if (y === curYear()) return; addC(rows("Contributions_" + y)); addS(rows("Special_" + y)); });
  addC(rows("Contributions")); addS(rows("Special"));
  trActive().forEach(function (r) { if (nm[String(r[5]).trim()]) t += nnum(r[7]); if (nm[String(r[4]).trim()]) t -= nnum(r[7]); });
  return Math.max(0, Math.round(t));
}
function trMonthMax() { const y = curYear(), ny = Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "yyyy")); return ny > y ? 11 : ny < y ? -1 : Number(Utilities.formatDate(new Date(), "Asia/Dhaka", "M")) - 1; }
function trUserSet(name, on) {   // সদস্যের লগইন চালু/বন্ধ (অ্যাডমিন বাদে)
  const us = sheet("Users"), v = us.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]).trim() === name && roleOf(v[i][3]) !== "admin") {
    us.getRange(i + 1, 5).setValue(on ? "চালু" : "বন্ধ");
    if (!on) dropTokens(String(v[i][1]).trim().toLowerCase());
  }
}
function trAdd(q, u) {
  const from = String(q.from || "").trim(), to = String(q.to || "").trim(), isNew = !!q.isNew, k = Math.round(Number(q.shares) * 2) / 2, m = Number(q.month);
  const why = String(q.reason || "").trim(); if (why.length < 3) throw new Error("হস্তান্তরের কারণ লিখুন (কমপক্ষে ৩ অক্ষর)");
  if (!from || !to) throw new Error("দাতা ও গ্রহীতা দুজনকেই বাছাই করুন");
  if (from === to) throw new Error("একই সদস্যকে হস্তান্তর করা যায় না");
  if (!(k >= 0.5)) throw new Error("নাম সংখ্যা সঠিক নয়");
  const mx = trMonthMax(); if (!(m >= 0 && m <= mx)) throw new Error("মাস সঠিক নয় (চলতি বছরের এ মাস পর্যন্ত)");
  if (to.charAt(0) === "※") throw new Error("নাম সঠিক নয়");
  const cs = sheet("Contributions"), v = cs.getDataRange().getDisplayValues(), y = curYear();
  let fr = -1, tr = -1;
  for (let i = 1; i < v.length; i++) { const n = String(v[i][0]).trim(); if (n === from) fr = i; if (n === to) tr = i; }
  if (fr < 0) throw new Error("দাতা সদস্য পাওয়া যায়নি");
  if (String(v[fr][14] || "").trim() === "নিষ্ক্রিয়") throw new Error("দাতা সদস্য নিষ্ক্রিয়");
  const S = nnum(v[fr][1]);
  let minS = S; for (let i = m; i < 12; i++) minS = Math.min(minS, shAt(from, S, y, i));
  if (k > minS + 1e-9) throw new Error("দাতার " + bnNum(minS) + "টির বেশি নাম নেই (সেই মাস থেকে)");
  if (isNew) { if (tr >= 0 || memberExists(to)) throw new Error("এই নামে সদস্য আছে — \"বর্তমান সদস্য\" বাছুন"); }
  else { if (tr < 0) throw new Error("গ্রহীতা সদস্য পাওয়া যায়নি"); if (String(v[tr][14] || "").trim() === "নিষ্ক্রিয়") throw new Error("গ্রহীতা সদস্য নিষ্ক্রিয় — আগে সক্রিয় করুন"); }
  const dep = Math.round(trDeposit(from) * k / S);
  // নাম সংখ্যা বদল
  cs.getRange(fr + 1, 2).setValue(S - k);
  if (isNew) { const row = [to, k]; for (let i = 0; i < 12; i++) row.push(""); row.push(""); cs.appendRow(row); midAssign(to); }
  else cs.getRange(tr + 1, 2).setValue(nnum(v[tr][1]) + k);
  // সব নাম দিলে প্রাক্তন সদস্য: নিষ্ক্রিয় + লগইন বন্ধ + X-আইডি
  let oldId = "";
  if (Math.abs(S - k) < 1e-9) {
    if (!String(cs.getRange(1, 15).getDisplayValue())) cs.getRange(1, 15).setValue("অবস্থা");
    cs.getRange(fr + 1, 15).setValue("নিষ্ক্রিয়");
    trUserSet(from, false);
    const ms = midSheet(), mv = midRows(), mi = midFind(mv, from);
    if (mi >= 0) { oldId = String(mv[mi][0]); ms.getRange(mi + 2, 1).setNumberFormat("@").setValue(midNext(mv, "X")); }
  }
  const sh = trSheet(), id = "T-" + String(sh.getLastRow()).padStart(3, "0"), r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, 14).setNumberFormat("@");
  sh.getRange(r, 1, 1, 14).setValues([[id, now().slice(0, 10), String(y), MONTHS[m], from, to, String(k), String(dep), why.slice(0, 200), u.name, now(), "", isNew ? "1" : "", oldId]]);
  const msg = from + " → " + to + ": " + bnNum(k) + "টি নাম (" + MONTHS_F[m] + " থেকে)";
  pushQ(unOf([from, to]), { t: "🔁 শেয়ার হস্তান্তর", b: msg + "। জমা " + tk(dep) + " নতুন মালিকের হিসাবে।", u: "mem", k: "tr" });
  return { id: id, dep: dep, former: Math.abs(S - k) < 1e-9 };
}
function trVoid(q, u) {
  const why = needReason(q), sh = trSheet(), v = sh.getDataRange().getDisplayValues();
  let ix = -1; for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(q.id)) ix = i;
  if (ix < 0) throw new Error("হস্তান্তর পাওয়া যায়নি");
  const t = v[ix]; if (String(t[11] || "").trim()) throw new Error("এটি আগেই বাতিল হয়েছে");
  if (Number(t[2]) !== curYear()) throw new Error("পুরোনো বছরের হস্তান্তর বাতিল করা যায় না");
  for (let i = ix + 1; i < v.length; i++) if (String(v[i][0]).trim() && !String(v[i][11] || "").trim()) throw new Error("আগে সবশেষ হস্তান্তর বাতিল করুন");
  const from = String(t[4]).trim(), to = String(t[5]).trim(), k = nnum(t[6]);
  const cs = sheet("Contributions"), cv = cs.getDataRange().getDisplayValues();
  let fr = -1, tr = -1; for (let i = 1; i < cv.length; i++) { const n = String(cv[i][0]).trim(); if (n === from) fr = i; if (n === to) tr = i; }
  if (fr < 0 || tr < 0) throw new Error("সদস্যের সারি পাওয়া যায়নি");
  const ts = nnum(cv[tr][1]); if (ts + 1e-9 < k) throw new Error("গ্রহীতার কাছে এখন " + bnNum(ts) + "টি নাম — বাতিল করা যাচ্ছে না");
  // দাতাকে ফেরত
  cs.getRange(fr + 1, 2).setValue(nnum(cv[fr][1]) + k);
  if (String(t[13] || "").trim()) {
    cs.getRange(fr + 1, 15).setValue(""); trUserSet(from, true);
    const ms = midSheet(), mv = midRows(), mi = midFind(mv, from); if (mi >= 0) ms.getRange(mi + 2, 1).setNumberFormat("@").setValue(String(t[13]).trim());
  }
  // গ্রহীতা
  let dropped = false;
  if (Math.abs(ts - k) < 1e-9 && String(t[12] || "").trim() === "1") {
    const paid = cv[tr].slice(2, 14).some(function (x) { return nnum(x) > 0; }) || rows("Fines").some(function (r) { return String(r[0]).trim() === to; }) || rows("Special").some(function (r) { return String(r[2]).trim() === to; });
    if (!paid) { cs.deleteRow(tr + 1); const ms = midSheet(), mv = midRows(), mi = midFind(mv, to); if (mi >= 0) ms.deleteRow(mi + 2); dropped = true; }
  }
  if (!dropped) { cs.getRange(tr + 1, 2).setValue(ts - k); if (Math.abs(ts - k) < 1e-9) { if (!String(cs.getRange(1, 15).getDisplayValue())) cs.getRange(1, 15).setValue("অবস্থা"); cs.getRange(tr + 1, 15).setValue("নিষ্ক্রিয়"); trUserSet(to, false); } }
  sh.getRange(ix + 1, 12).setValue("বাতিল: " + why + " (" + u.name + ", " + now() + ")");
  pushQ(unOf([from, to]), { t: "↩️ হস্তান্তর বাতিল", b: from + " → " + to + ": " + bnNum(k) + "টি নাম — বাতিল হয়েছে।", u: "mem", k: "tr" });
  return {};
}

/* ---------- 5.1: ব্যাংক রশিদের ছবি (Google Drive-এর "UIF রশিদ" ফোল্ডারে) ----------
 * Receipts শিট: A পেমেন্ট আইডি | B সদস্য | C ফাইল আইডি | D SHA-256 (আসল ফাইলের) | E ছাপ (৩২×৩২ ধূসর, hex) | F আকার (byte) | G সময় | H অবস্থা ("মুছে গেছে …") | I মিল (দেখতে প্রায় একই আগের রশিদের পেমেন্ট আইডি)
 * নিয়ম (সিয়াম, ২০-১১-২০২৬): শুধু ব্যাংক অপশনে ছবি; দেখবেন ক্যাশিয়ার/অ্যাডমিন ও সদস্য নিজে; যাচাই/বাতিলের ১২ মাস পর ছবি মুছবে;
 * ফোল্ডার ৫০০ MB ছাড়ালে সবচেয়ে পুরোনো সিদ্ধান্ত-হওয়া ছবি আগে মুছবে; পেন্ডিং কখনো মুছবে না; আঙুলের ছাপ (hash) শিটে থেকে যায়। */
const RC_HEAD = ["পেমেন্ট আইডি", "সদস্য", "ফাইল আইডি", "SHA-256", "ছাপ (32×32)", "আকার (byte)", "সময়", "অবস্থা", "মিল"];
const RC_KEEP_MS = 365 * 864e5, RC_CAP = 500 * 1024 * 1024, RC_MAX = 7000000, RC_SIM = 6;
function rcSheet() {
  const had = !!SS.getSheetByName("Receipts"), sh = mkSheet("Receipts", RC_HEAD);
  if (!had) { sh.setFrozenRows(1); try { sh.protect().setDescription("UIF রশিদ — হাতে বদলাবেন না").setWarningOnly(true); } catch (e) {} }
  return sh;
}
function rcFolder() {
  const p = props(); let f = null, id = p.getProperty("rc_folder");
  if (id) { try { f = DriveApp.getFolderById(id); if (f.isTrashed()) f = null; } catch (e) { f = null; } }
  if (!f) { const it = DriveApp.getFoldersByName("UIF রশিদ"); f = it.hasNext() ? it.next() : DriveApp.createFolder("UIF রশিদ"); p.setProperty("rc_folder", f.getId()); }
  return f;
}
function rcHam(a, b) {   // দুটি ছাপের সবচেয়ে বড় পার্থক্য (০–২৫৫); RC_SIM-এর বেশি হলেই থামে
  a = String(a); b = String(b); if (a.length !== b.length || !a.length) return 999;
  let m = 0; for (let i = 0; i < a.length; i += 2) { const d = Math.abs(parseInt(a.substr(i, 2), 16) - parseInt(b.substr(i, 2), 16)); if (d > m) { m = d; if (m > RC_SIM) return m; } }
  return m;
}
function rcStatus() {   // পেমেন্ট আইডি → {s: অবস্থা, at: সিদ্ধান্তের সময়} — চলতি ও পুরোনো বছরের Payments মিলিয়ে
  const m = {};
  SS.getSheets().forEach(function (s) {
    const n = s.getName(); if (!(n === "Payments" || /^Payments_\d{4}$/.test(n)) || s.getLastRow() < 2) return;
    s.getRange(2, 1, s.getLastRow() - 1, 12).getDisplayValues().forEach(function (r) { const k = String(r[0]); if (k && (n === "Payments" || !m[k])) m[k] = { s: String(r[9]), at: String(r[11]) }; });
  });
  const bs = SS.getSheetByName("BankDeposits");   // ব্যাংক জমা: বাতিল হলে ছবি আবার দেওয়া যাবে
  if (bs && bs.getLastRow() > 1) bs.getRange(2, 1, bs.getLastRow() - 1, 8).getDisplayValues().forEach(function (r) { const k = String(r[0]); if (k) m[k] = { s: String(r[7]).trim() ? ST.c : ST.a, at: String(r[5]) }; });
  return m;
}
function rcCheck(q) {
  const img = String(q.img || ""), mt = img.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+\/=]+)$/);
  if (!mt) throw new Error("ব্যাংকের রশিদের ছবি দিন");
  if (img.length > RC_MAX) throw new Error("ছবিটি খুব বড় — অন্য একটি ছবি দিন");
  const sha = String(q.sha || "").toLowerCase(); let dh = String(q.dh || "").toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(sha)) throw new Error("ছবিটি পড়া যায়নি — আবার ছবি দিন");
  if (!/^[0-9a-f]{2048}$/.test(dh)) dh = "";
  let st = null, sim = "", best = 999;   // 7.5: সব Payments শিট পড়া (rcStatus) শুধু মিল পেলে — ফল একই
  const off = function (r) { if (!st) st = rcStatus(); const s0 = st[String(r[0])]; return !!(s0 && s0.s === ST.c); };   // বাতিল করা রিকোয়েস্টের ছবি আবার দেওয়া যায়
  rows("Receipts").forEach(function (r) {
    const same = String(r[3]).toLowerCase() === sha, d = dh && r[4] ? rcHam(dh, String(r[4]).toLowerCase()) : 999;
    if (!same && !(d <= RC_SIM && d < best)) return;
    if (off(r)) return;
    if (same) throw new Error("এই ছবি আগেই ব্যবহার হয়েছে — নতুন ছবি দিন");
    best = d; sim = String(r[0]);
  });
  return { ext: mt[1], b64: mt[2], sha: sha, dh: dh, sim: sim };
}
function rcSave(rc, payId, name) {
  let f; try { f = rcFolder(); } catch (e) { throw new Error("ছবি রাখা যায়নি — অ্যাডমিনকে জানান"); }
  const bytes = Utilities.base64Decode(rc.b64);
  const file = f.createFile(Utilities.newBlob(bytes, "image/" + rc.ext, payId + "_" + name + "." + (rc.ext === "jpeg" ? "jpg" : rc.ext)));
  return { id: file.getId(), size: bytes.length };
}
function rcRow(rc, rf, payId, name) {
  const sh = rcSheet(), r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, RC_HEAD.length).setNumberFormat("@");
  sh.getRange(r, 1, 1, RC_HEAD.length).setValues([[payId, name, rf.id, rc.sha, rc.dh, String(rf.size), now(), "", rc.sim]]);
}
function rcGet(u, q) {
  const id = String(q.id || ""), rs = rows("Receipts");
  let r = null; for (let i = 0; i < rs.length; i++) if (String(rs[i][0]) === id) { r = rs[i]; break; }
  if (!r) throw new Error("এই রিকোয়েস্টের কোনো রশিদ পাওয়া যায়নি");
  const staff = u.role === "admin" || (u.role === "cashier" && cashOn());
  if (!staff && !/^BD-/.test(id) && String(r[1]).trim() !== u.name) throw new Error("শুধু নিজের রশিদ দেখা যাবে");
  if (String(r[7]).trim()) throw new Error("এই রশিদের ছবি ১২ মাস পর মুছে ফেলা হয়েছে");
  let b; try { b = DriveApp.getFileById(String(r[2])).getBlob(); } catch (e) { throw new Error("ছবিটি পাওয়া যায়নি (মুছে গেছে)"); }
  return { ok: true, id: id, m: String(r[1]), at: String(r[6]), img: "data:" + (b.getContentType() || "image/jpeg") + ";base64," + Utilities.base64Encode(b.getBytes()) };
}
function rcClean() {   // প্রতিদিন: ১২ মাসের পুরোনো ও ৫০০ MB-এর বাড়তি ছবি মোছা
  const sh = SS.getSheetByName("Receipts"); if (!sh || sh.getLastRow() < 2) return 0;
  const lk = LockService.getScriptLock(); lk.waitLock(20000);
  try {
    const v = sh.getRange(2, 1, sh.getLastRow() - 1, RC_HEAD.length).getDisplayValues(), st = rcStatus(), nw = Date.now();
    const pt = function (x) { const m = String(x || "").match(/(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})/); return m ? Date.UTC(+m[3], +m[2] - 1, +m[1], +m[4] - 6, +m[5]) : 0; };
    const live = []; let total = 0;
    v.forEach(function (r, i) {
      if (String(r[7]).trim()) return;
      const s = st[String(r[0])], size = Number(r[5]) || 0;
      const bd = /^BD-/.test(String(r[0]));   // ব্যাংক জমার ছবি: সময় আপলোড থেকে, ৫০০ MB-সীমায় মোছা হয় না
      live.push({ i: i, id: String(r[0]), fid: String(r[2]), size: size, bd: bd, pend: !!(s && s.s === ST.p), t: bd ? pt(r[6]) : ((s && s.s !== ST.p && pt(s.at)) || pt(r[6])) });
      total += size;
    });
    const gone = {};
    const del = function (x) {
      try { DriveApp.getFileById(x.fid).setTrashed(true); } catch (e) {}
      sh.getRange(x.i + 2, 8).setValue("মুছে গেছে " + now()); total -= x.size; gone[x.id] = 1; x.done = 1;
    };
    live.forEach(function (x) { if (!x.pend && nw - x.t > RC_KEEP_MS) del(x); });
    if (total > RC_CAP) live.filter(function (x) { return !x.pend && !x.done && !x.bd; }).sort(function (a, b) { return a.t - b.t; }).forEach(function (x) { if (total > RC_CAP) del(x); });
    const n = Object.keys(gone).length;
    if (n) {
      const ps = SS.getSheetByName("Payments");
      if (ps && ps.getLastRow() > 1) { const ids = ps.getRange(2, 1, ps.getLastRow() - 1, 1).getDisplayValues(); ids.forEach(function (r, i) { if (gone[String(r[0])]) ps.getRange(i + 2, 14).setValue("x"); }); }
      const bds = SS.getSheetByName("BankDeposits");
      if (bds && bds.getLastRow() > 1) { const bi = bds.getRange(2, 1, bds.getLastRow() - 1, 1).getDisplayValues(); bi.forEach(function (r, i) { if (gone[String(r[0])]) bds.getRange(i + 2, 9).setValue("x"); }); }
      try { logAct({ name: "সিস্টেম", role: "system" }, { action: "rc_clean", n: n }); } catch (e) {}
      SpreadsheetApp.flush(); dropRS();
    }
    return n;
  } finally { lk.releaseLock(); }
}

/* ---------- 6.3: ক্যাশিয়ারের ব্যাংক জমা (সিয়ামের সিদ্ধান্ত, ২৫-১১-২০২৬) ----------
 * BankDeposits: A আইডি (BD-nnn) | B তারিখ | C টাকা | D নোট | E কে জমা দিয়েছেন | F সময় | G যাচাই ("নাম, সময়") | H অবস্থা ("বাতিল: কারণ (নাম, সময়)") | I রশিদ ("1"; ছবি মুছলে "x")
 * হাতে = সব জমা − ব্যাংকে; ব্যাংকে = আয়-ব্যয়ের ব্যাংক-স্থানান্তর + সক্রিয় জমা। মোট ফান্ড ও Journal অপরিবর্তিত। */
const BD_HEAD = ["আইডি", "তারিখ", "টাকা", "নোট", "কে জমা দিয়েছেন", "সময়", "যাচাই", "অবস্থা", "রশিদ"];
function bdSheet() { const had = !!SS.getSheetByName("BankDeposits"), sh = mkSheet("BankDeposits", BD_HEAD); if (!had) { sh.setFrozenRows(1); try { sh.protect().setDescription("UIF ব্যাংক জমা — হাতে বদলাবেন না").setWarningOnly(true); } catch (e) {} } return sh; }
function bdHand() {   // এখন ক্যাশিয়ারের হাতে কত (সক্রিয় সব জমা বাদে)
  let bank = 0;
  rows("Ledger").forEach(function (r) { const a = nnum(r[4]); if (String(r[6]).trim() === "bank") bank += a; if (String(r[5]).trim() === "bank") bank -= a; });
  rows("BankDeposits").forEach(function (r) { if (String(r[0]).trim() && !String(r[7] || "").trim()) bank += nnum(r[2]); });
  let cash; try { const js = jSheet(); cash = jBalFast(js, js.getLastRow())["1100"]; } catch (e) { cash = jState(true)["1100"]; }   // 7.7: খাতার মনে রাখা যোগফল (প্রতিটি টাকার কাজে ও ঘণ্টায় শিটের সঙ্গে মেলানো)
  return Math.round(cash - bank);
}
function bdAdd(q, u) {
  const amt = Math.round(Number(q.amount) || 0); if (amt <= 0) throw new Error("টাকার পরিমাণ লিখুন");
  const date = String(q.date || "").trim() || Utilities.formatDate(new Date(), "Asia/Dhaka", "dd-MM-yyyy");
  const rc = rcCheck(q);   // ছবি বাধ্যতামূলক; হুবহু একই ছবি আগে ব্যবহার হলে থামে
  const hand = bdHand(); if (amt > hand) throw new Error("হাতের নগদ " + tk(hand) + " — এর বেশি জমা দেওয়া যায় না");
  const sh = bdSheet(), v = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues() : [];
  let mx = 0; v.forEach(function (r) { const m = String(r[0]).match(/^BD-(\d+)$/); if (m && +m[1] > mx) mx = +m[1]; });
  const id = "BD-" + ("00" + (mx + 1)).slice(-3);
  rc.sim = ""; rc.dh = "";   // জমার ছবিতে সদৃশ-ছবির সতর্কতা নেই
  const rf = rcSave(rc, id, u.name), r = sh.getLastRow() + 1;
  sh.getRange(r, 1, 1, BD_HEAD.length).setNumberFormat("@");
  sh.getRange(r, 1, 1, BD_HEAD.length).setValues([[id, date, String(amt), String(q.note || "").trim().slice(0, 200), u.name, now(), "", "", "1"]]);
  rcRow(rc, rf, id, u.name);
  pushQ(allUsers(), { t: "🏛️ ব্যাংকে জমা", b: u.name + " ব্যাংকে " + tk(amt) + " জমা দিয়েছেন — রশিদ দেখুন", u: "led", k: "pay" }, u.username);
  return { id: id };
}
function bdFind(q) {
  const sh = bdSheet(), id = String(q.id || ""), v = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, BD_HEAD.length).getDisplayValues() : [];
  for (let i = 0; i < v.length; i++) if (String(v[i][0]) === id) { if (String(v[i][7]).trim()) throw new Error("এই জমা আগেই বাতিল হয়েছে"); return { sh: sh, row: i + 2, r: v[i] }; }
  throw new Error("জমা পাওয়া যায়নি");
}
function bdOk(q, u) {
  const p = bdFind(q); if (String(p.r[6]).trim()) throw new Error("এই জমা আগেই যাচাই হয়েছে");
  q.amount = p.r[2]; p.sh.getRange(p.row, 7).setValue(u.name + ", " + now()); return {};
}
function bdVoid(q, u) {
  const why = needReason(q), p = bdFind(q);
  q.amount = p.r[2]; p.sh.getRange(p.row, 8).setValue("বাতিল: " + why + " (" + u.name + ", " + now() + ")"); return {};
}

/* ---------- 6.7: টাকা পাঠানোর নাম্বার বদল ---------- */
function piAdmins() { return usersAll().filter(function (r) { return roleOf(r[3]) === "admin"; }).map(function (r) { return String(r[1]).trim().toLowerCase(); }); }
function piApply(n, ty, wa, u, also) {
  const p = props(), old = p.getProperty("pay_num") || "";
  p.setProperty("pay_num", n); p.setProperty("pay_type", ty);
  if (wa) p.setProperty("pay_wa", wa); else p.deleteProperty("pay_wa");
  if (old !== n) pushQ(allUsers().filter(function (x) { return x !== also; }), { t: "📲 টাকা পাঠানোর নাম্বার বদলেছে", b: "নতুন নাম্বার: " + n + " — পাঠানোর আগে দেখে নিন", u: "pay", k: "not" }, u.username);
}
function bdPurge(q, u) {   // 6.8: শুধু অ্যাডমিন (adminAction) — আগে থেকে বাতিল ব্যাংক জমা শিট থেকে পুরো মোছা; হাতে/ব্যাংকে হিসাবে প্রভাব নেই
  const sh = bdSheet(), id = String(q.id || ""), v = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, BD_HEAD.length).getDisplayValues() : [];
  let row = -1; for (let i = 0; i < v.length; i++) if (String(v[i][0]) === id) { row = i; break; }
  if (row < 0) throw new Error("জমা পাওয়া যায়নি");
  if (!String(v[row][7]).trim()) throw new Error("শুধু বাতিল করা জমা মোছা যায় — আগে বাতিল করুন");
  q.amount = v[row][2]; q.by = v[row][4];
  const rs = SS.getSheetByName("Receipts");
  if (rs && rs.getLastRow() > 1) { const r2 = rs.getRange(2, 1, rs.getLastRow() - 1, 3).getDisplayValues();
    for (let i = r2.length - 1; i >= 0; i--) if (String(r2[i][0]) === id) { try { DriveApp.getFileById(String(r2[i][2])).setTrashed(true); } catch (e) {} rs.deleteRow(i + 2); } }
  sh.deleteRow(row + 2);
  return {};
}
