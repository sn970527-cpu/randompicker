import { X, ShieldAlert } from 'lucide-react';

export default function SecretModal({ students, secretOrder, setSecretOrder, onClose }) {
  
  const toggleStudent = (student) => {
    if (secretOrder.includes(student)) {
      setSecretOrder(secretOrder.filter(s => s !== student));
    } else {
      setSecretOrder([...secretOrder, student]);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="glass-card" style={{ width: '90%', maxWidth: '500px', backgroundColor: '#fff', border: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <ShieldAlert /> 비밀 설정 모달
          </h2>
          <button onClick={onClose} style={{ background: 'none', boxShadow: 'none', padding: 0, color: '#666' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.95rem' }}>
          미리 뽑힐 순서를 지정합니다. 클릭한 순서대로 뽑히게 됩니다.<br/>
          이 창은 학생들에게 보여주지 마세요!
        </p>

        {secretOrder.length > 0 && (
          <div style={{ marginBottom: '1rem', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
            <strong>현재 지정된 순서:</strong>
            <ol style={{ marginLeft: '20px', marginTop: '5px', color: 'var(--primary)', fontWeight: 'bold' }}>
              {secretOrder.map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>
            <button onClick={() => setSecretOrder([])} style={{ marginTop: '10px', fontSize: '0.9rem', padding: '5px 10px', backgroundColor: '#95a5a6' }}>초기화</button>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '300px', overflowY: 'auto', padding: '5px' }}>
          {students.map(s => {
            const isSelected = secretOrder.includes(s);
            const orderIdx = secretOrder.indexOf(s) + 1;
            return (
              <button 
                key={s} 
                onClick={() => toggleStudent(s)}
                style={{
                  backgroundColor: isSelected ? 'var(--primary)' : 'white',
                  color: isSelected ? 'white' : 'var(--text)',
                  border: '2px solid var(--primary)',
                  position: 'relative',
                  padding: '8px 16px',
                  fontSize: '1rem',
                  boxShadow: 'none'
                }}
              >
                {s}
                {isSelected && (
                  <span style={{
                    position: 'absolute', top: '-10px', right: '-10px', 
                    backgroundColor: 'var(--accent)', color: '#333', 
                    borderRadius: '50%', width: '24px', height: '24px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', border: '2px solid white', fontSize: '0.9rem'
                  }}>
                    {orderIdx}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="primary" onClick={onClose} style={{ width: '100%' }}>저장하고 닫기</button>
        </div>
      </div>
    </div>
  );
}
