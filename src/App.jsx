import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, GraduationCap, Trophy, Timer, Lightbulb, Pencil, ClipboardCheck } from 'lucide-react';

const App = () => {
  // Giả định ngày thi vào 10 thường vào khoảng đầu tháng 6. 
  // Ở đây tôi đặt mốc 30/05/2026 như yêu cầu trước đó, coi như đây là mốc "về đích" ôn tập.
  const targetDate = new Date('2026-05-30T07:30:00').getTime();
  
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [quote, setQuote] = useState("");

  const quotes = [
    "Học tập là hạt giống của hạnh phúc.",
    "Thành công là kết quả của sự chuẩn bị kỹ càng.",
    "Cố gắng thêm một chút nữa, vinh quang đang chờ bạn.",
    "Đừng dừng lại cho đến khi bạn tự hào về chính mình.",
    "Kỳ thi này chỉ là một bước đệm cho tương lai rực rỡ."
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const StatBox = ({ value, label, icon: Icon, color }) => (
    <div className="relative group flex-1 min-w-[120px]">
      <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
      <div className="relative flex flex-col items-center bg-white/80 backdrop-blur-md border border-green-100 p-5 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="text-green-600 mb-2">
          <Icon size={24} />
        </div>
        <span className="text-4xl font-black text-slate-800 tracking-tight">
          {String(value).padStart(2, '0')}
        </span>
        <span className="text-green-700 font-bold uppercase text-[10px] mt-2 tracking-widest">
          {label}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4faf5] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] animate-pulse"><BookOpen className="text-green-300" size={40} /></div>
        <div className="absolute bottom-[15%] right-[10%] animate-bounce"><GraduationCap className="text-emerald-300" size={60} /></div>
        <div className="absolute top-[20%] right-[15%]"><Pencil className="text-green-200" size={30} /></div>
      </div>

      <div className="z-10 max-w-3xl w-full text-center">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100 text-green-700 font-bold text-sm mb-4">
            <Timer size={18} className="animate-spin-slow" />
            <span>CHIẾN DỊCH VƯỢT VŨ MÔN 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-green-900 mb-4">
            Đếm Ngược <span className="text-emerald-600">Thi Vào 10</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-600 font-medium">
             <ClipboardCheck size={18} className="text-green-500" />
             <span>Mục tiêu: Đỗ nguyện vọng 1</span>
          </div>
        </div>

        {/* Countdown Grid */}
        {timeLeft ? (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <StatBox value={timeLeft.days} label="Ngày" icon={Trophy} color="from-yellow-400 to-orange-500" />
            <StatBox value={timeLeft.hours} label="Giờ" icon={Lightbulb} color="from-green-400 to-emerald-500" />
            <StatBox value={timeLeft.minutes} label="Phút" icon={BookOpen} color="from-blue-400 to-indigo-500" />
            <StatBox value={timeLeft.seconds} label="Giây" icon={Timer} color="from-emerald-400 to-teal-500" />
          </div>
        ) : (
          <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-green-500 mb-10">
            <h2 className="text-3xl font-bold text-green-700 italic">🔥 GIỜ G ĐÃ ĐIỂM! 🔥</h2>
            <p className="mt-2 text-slate-600 font-medium">Chúc các sĩ tử bình tĩnh, tự tin và làm bài thật tốt!</p>
          </div>
        )}

        {/* Motivation Card */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
             <GraduationCap size={100} />
          </div>
          <p className="relative z-10 text-lg font-medium italic mb-2">"{quote}"</p>
          <div className="w-12 h-1 bg-green-300 mx-auto rounded-full mb-4 opacity-50"></div>
          <div className="flex justify-center gap-6 text-xs font-bold tracking-widest uppercase">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full"></div> Toán</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full"></div> Ngữ Văn</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full"></div> Tiếng Anh</span>
          </div>
        </div>

        {/* Progress Tip */}
        <div className="mt-10 text-slate-400 text-sm flex items-center justify-center gap-4">
           <div className="h-[1px] bg-slate-200 flex-1"></div>
           <span className="uppercase tracking-[0.2em] font-bold">Hãy tập trung tối đa</span>
           <div className="h-[1px] bg-slate-200 flex-1"></div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-emerald-500 to-green-300"></div>
    </div>
  );
};

export default App;
