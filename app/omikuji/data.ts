export type Fortune = {
  rank: string;
  weight: number;
  tone: "great" | "good" | "bad";
  message: string;
};

export const FORTUNES: Fortune[] = [
  { rank: "大吉", weight: 10, tone: "great", message: "何をしても順調に進む最高の運勢。迷っていたことに踏み出す好機です。" },
  { rank: "中吉", weight: 18, tone: "good", message: "努力がしっかり実を結ぶとき。周りへの感謝を忘れずに。" },
  { rank: "小吉", weight: 20, tone: "good", message: "小さな幸せがたくさん訪れます。日々の積み重ねを大切に。" },
  { rank: "吉", weight: 22, tone: "good", message: "穏やかで安定した運気。焦らず自分のペースで進みましょう。" },
  { rank: "末吉", weight: 15, tone: "good", message: "今は準備のとき。後になるほど運が開けていきます。" },
  { rank: "凶", weight: 10, tone: "bad", message: "慎重に行動すれば災いは避けられます。足元を見つめ直しましょう。" },
  { rank: "大凶", weight: 5, tone: "bad", message: "これ以上は下がらない、あとは上がるだけ。むしろ好転の兆しです。" },
];

export const CATEGORIES: { label: string; lines: Record<Fortune["tone"], string[]> }[] = [
  {
    label: "願望",
    lines: {
      great: ["思いのままに叶う", "願いは早く叶う"],
      good: ["時間はかかるが叶う", "人の助けで叶う"],
      bad: ["今は控えめに", "焦れば遠のく"],
    },
  },
  {
    label: "恋愛",
    lines: {
      great: ["想いが通じる", "良縁に恵まれる"],
      good: ["誠実さが鍵", "身近に縁あり"],
      bad: ["言葉に気をつけよ", "急がず待て"],
    },
  },
  {
    label: "仕事",
    lines: {
      great: ["大きな成果あり", "評価が高まる"],
      good: ["地道に進めよ", "協力して吉"],
      bad: ["確認を怠るな", "無理は禁物"],
    },
  },
  {
    label: "金運",
    lines: {
      great: ["思わぬ収入あり", "財運上昇"],
      good: ["堅実に貯めよ", "まずまず安定"],
      bad: ["散財に注意", "貸し借りは避けよ"],
    },
  },
  {
    label: "健康",
    lines: {
      great: ["心身ともに充実", "活力にあふれる"],
      good: ["睡眠を大切に", "適度な運動で吉"],
      bad: ["無理をすれば崩す", "早めの休息を"],
    },
  },
  {
    label: "学業",
    lines: {
      great: ["努力が報われる", "ひらめきあり"],
      good: ["復習を怠るな", "継続は力なり"],
      bad: ["集中を欠く", "基礎に立ち返れ"],
    },
  },
];

export const LUCKY_ITEMS = ["ハンカチ", "手帳", "温かいお茶", "鍵", "腕時計", "ボールペン", "傘", "マフラー", "観葉植物", "お守り"];
export const LUCKY_COLORS = ["朱色", "藍色", "若草色", "山吹色", "桜色", "白", "紫", "金色"];

export function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function drawFortune(): Fortune {
  const total = FORTUNES.reduce((sum, f) => sum + f.weight, 0);
  let r = Math.random() * total;
  for (const f of FORTUNES) {
    r -= f.weight;
    if (r < 0) return f;
  }
  return FORTUNES[FORTUNES.length - 1];
}
