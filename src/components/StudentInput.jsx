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

    const newStudents = inputText.split(/[\n,]+/).map(s => s.trim()).filter(s => s !== '');
    if (newStudents.length > 0) {
      const uniqueNew = newStudents.filter(s => !students.includes(s));
      setStudents([...students, ...uniqueNew]);
      setInputText('');
    }
  };

  const handleRemove = (studentToRemove) => {
    setStudents(students.filter(s => s !== studentToRemove));
    setSecretOrder(secretOrder.filter(s => s !== studentToRemove));
    if (setPickedStudents) setPickedStudents(prev => prev.filter(s => s !== studentToRemove));
  };

  const clearAll = () => {
    if (confirm('모든 명단을 지우시겠습니까?')) {
      setStudents([]);
      setSecretOrder([]);
      if (setPickedStudents) setPickedStudents([]);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <Users size={20} /> 학생 명단
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <textarea
          rows={3}
          placeholder={"이름을 입력하세요 (쉼표나 줄바꿈으로 여러 명 동시 입력)\n예: 김철수, 이영희, 박지성"}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          {students.length > 0 && (
            <button className="btn-utility" onClick={clearAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Trash2 size={14} /> 전체 삭제
            </button>
          )}
          <button className="btn-primary" onClick={handleAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <UserPlus size={16} /> 추가
          </button>
        </div>
      </div>

      {students.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '14px', color: 'var(--ink-muted-48)', letterSpacing: '-0.224px', marginBottom: '12px' }}>
            현재 명단 — {students.length}명
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {students.map(s => (
              <div key={s} className="chip">
                {s}
                <button onClick={() => handleRemove(s)}>×</button>
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
