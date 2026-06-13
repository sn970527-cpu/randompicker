
export default function SecretModal({ students, secretOrder, setSecretOrder, onClose }) {

  const toggleStudent = (student) => {
    if (secretOrder.includes(student)) {
      setSecretOrder(secretOrder.filter(s => s !== student));
    } else {
      setSecretOrder([...secretOrder, student]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="card-title" style={{ margin: 0 }}>
            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>warning</span> 비밀 설정
          </h2>
          <button className="modal-close" onClick={onClose}>
            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>close</span>
          </button>
        </div>

        <p className="modal-body">
          미리 뽑힐 순서를 지정합니다. 클릭한 순서대로 선발됩니다.
          이 창은 학생들에게 보여주지 마세요.
        </p>

        {secretOrder.length > 0 && (
          <div className="secret-order-list">
            <strong>지정된 순서</strong>
            <ol>
              {secretOrder.map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>
            <button className="btn-utility" onClick={() => setSecretOrder([])}>초기화</button>
          </div>
        )}

        <div className="secret-chips">
          {students.map(s => {
            const isSelected = secretOrder.includes(s);
            const orderIdx = secretOrder.indexOf(s) + 1;
            return (
              <button
                key={s}
                className={`secret-chip-btn${isSelected ? ' selected' : ''}`}
                onClick={() => toggleStudent(s)}
              >
                {s}
                {isSelected && (
                  <span className="order-badge">{orderIdx}</span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
            저장하고 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
