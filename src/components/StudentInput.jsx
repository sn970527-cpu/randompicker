import { useState } from 'react';
import SecretModal from './SecretModal';
import { Users, UserPlus, Trash2 } from 'lucide-react';

export default function StudentInput({ students, setStudents, secretOrder, setSecretOrder, setPickedStudents }) {
  const [inputText, setInputText] = useState('');
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleAdd = () => {
    if (inputText.trim() === '몰래설정') {
      setShowSecretModal(true);
      setInputText('');
      return;
    }

    // Split by comma or newline, trim spaces, remove empty strings
    const newStudents = inputText.split(/[\n,]+/).map(s => s.trim()).filter(s => s !== '');
    if (newStudents.length > 0) {
      // Prevent duplicates
      const uniqueNew = newStudents.filter(s => !students.includes(s));
      setStudents([...students, ...uniqueNew]);
      setInputText('');
    }
  };

  const handleRemove = (studentToRemove) => {
    setStudents(students.filter(s => s !== studentToRemove));
    setSecretOrder(secretOrder.filter(s => s !== studentToRemove));
    if(setPickedStudents) setPickedStudents(prev => prev.filter(s => s !== studentToRemove));
  };

  const clearAll = () => {
    if(confirm('모든 명단을 지우시겠습니까?')) {
      setStudents([]);
      setSecretOrder([]);
      if(setPickedStudents) setPickedStudents([]);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--primary)' }}>
        <Users /> 학생 명단 입력
      </h2>
      
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <textarea 
          rows={3} 
          placeholder="이름을 입력하세요 (쉼표나 줄바꿈으로 여러 명 동시 입력 가능)&#13;&#10;예: 김철수, 이영희, 박지성"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
           {students.length > 0 && (
             <button className="secondary" onClick={clearAll} style={{backgroundColor: '#ff9f43', display: 'flex', alignItems: 'center', gap: '5px'}}>
               <Trash2 size={18} /> 전체 삭제
             </button>
           )}
           <button className="primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
             <UserPlus size={18} /> 추가하기
           </button>
        </div>
      </div>

      {students.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#ddd' }}>현재 명단 ({students.length}명)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {students.map(s => (
              <div key={s} style={{ 
                backgroundColor: 'white', padding: '5px 12px', borderRadius: '20px', 
                display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid var(--accent)' 
              }}>
                {s}
                <button onClick={() => handleRemove(s)} style={{ 
                  background: 'transparent', padding: 0, color: 'var(--primary)', 
                  boxShadow: 'none', fontSize: '1.5rem', lineHeight: '1', marginTop: '-2px'
                }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSecretModal && (
        <SecretModal 
          students={students}
          secretOrder={secretOrder}
          setSecretOrder={setSecretOrder}
          onClose={() => setShowSecretModal(false)}
        />
      )}
    </div>
  );
}
