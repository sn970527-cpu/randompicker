import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ResultBoard({ pickedStudents, setPickedStudents }) {

  useEffect(() => {
    if (pickedStudents.length > 0) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0066cc', '#2997ff', '#1d1d1f', '#f5f5f7']
      });
    }
  }, [pickedStudents]);

  return (
    <div className="card">
      <h2 className="card-title">오늘의 발표자</h2>

      <div className="result-list">
        {pickedStudents.map((s, idx) => (
          <div key={idx} className="result-item">
            <span className="result-item-index">{idx + 1}</span>
            <span className="result-item-name">{s}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn-secondary" onClick={() => setPickedStudents([])} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>refresh</span> 결과 초기화
        </button>
      </div>
    </div>
  );
}
