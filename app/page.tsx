import Omikuji from "./omikuji/Omikuji";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-[#f5ecd9] px-4 py-12 font-mincho">
      <h1 className="text-4xl font-bold tracking-widest text-red-900">おみくじ</h1>
      <p className="mt-2 mb-10 text-stone-600">今日の運勢を占ってみましょう</p>
      <Omikuji />
    </div>
  );
}
