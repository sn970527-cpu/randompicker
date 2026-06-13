import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';

export default function ResultBoard({ pickedStudents, setPickedStudents }) {
  
  useEffect(() => {
    if (pickedStudents.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
      });
    }
  }, [pickedStudents]);

  return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '2.5rem', textShadow: '2px 2px 0 #000' }}>
        🏆 오늘의 선발 라인업 🏆
      </h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginBottom: '2rem' }}>
        {pickedStudents.map((s, idx) => (
          <div key={idx} style={{
            fontSize: '1.8rem',
            padding: '10px 20px',
            backgroundColor: 'var(--grass-dark)',
            border: '2px solid var(--primary)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            fontWeight: 'bold',
            color: 'white',
            animation: 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <span style={{ color: 'var(--primary)', marginRight: '10px' }}>{idx + 1}</span> {s}
          </div>
        ))}
      </div>

      <button className="secondary" onClick={() => setPickedStudents([])} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <RotateCcw size={20} /> 결과 초기화
      </button>

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
