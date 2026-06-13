import { useState } from 'react';

export default function SlotMachine({ students, secretOrder, setSecretOrder, pickedStudents, setPickedStudents, isPicking, setIsPicking }) {
  const [pickCount, setPickCount] = useState(1);
  const [currentName, setCurrentName] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | spinning | reveal | done

  const startPicking = () => {
    if (pickCount < 1 || pickCount > students.length - pickedStudents.length) {
      alert('뽑을 인원수가 올바르지 않습니다.');
      return;
    }

    setIsPicking(true);
    pickNext(pickCount, pickedStudents, secretOrder);
  };

  const pickNext = (remaining, currentPickedList, currentSecretOrder) => {
    if (remaining <= 0) {
      setIsPicking(false);
      setPhase('idle');
      return;
    }

    const availableStudents = students.filter(s => !currentPickedList.includes(s));
    let target = '';
    let newSecretOrder = [...currentSecretOrder];

    const secretTarget = newSecretOrder.find(s => availableStudents.includes(s));

    if (secretTarget) {
      target = secretTarget;
      newSecretOrder = newSecretOrder.filter(s => s !== secretTarget);
      setSecretOrder(newSecretOrder);
    } else {
      target = availableStudents[Math.floor(Math.random() * availableStudents.length)];
    }

    setPhase('spinning');
    let count = 0;
    const maxCount = 20;
    const interval = setInterval(() => {
      const randomS = availableStudents[Math.floor(Math.random() * availableStudents.length)];
      setCurrentName(randomS);
      count++;

      if (count >= maxCount) {
        clearInterval(interval);

        setPhase('reveal');
        setCurrentName('선발!');

        setTimeout(() => {
          setCurrentName(target);
          setPhase('done');

          setTimeout(() => {
            const newPickedList = [...currentPickedList, target];
            setPickedStudents(newPickedList);

            setTimeout(() => {
              pickNext(remaining - 1, newPickedList, newSecretOrder);
            }, 800);
          }, 800);
        }, 700);
      }
    }, 50);
  };

  const remainingCount = students.length - pickedStudents.length;

  const displayText = () => {
    if (!isPicking) return '발표자를 뽑아보세요';
    return currentName;
  };

  const slotClass = () => {
    if (phase === 'spinning') return 'slot-name active';
    if (phase === 'reveal') return 'slot-name picked';
    if (phase === 'done') return 'slot-name active';
    return 'slot-name';
  };

  return (
    <div className="card">
      <div className={`slot-display${isPicking ? ' spinning' : ''}`}>
        <span className={slotClass()} key={currentName + phase}>
          {displayText()}
        </span>
      </div>

      {!isPicking && remainingCount > 0 ? (
        <div className="controls-row">
          <span className="pick-count-label">뽑을 인원수</span>
          <input
            type="number"
            min="1"
            max={remainingCount}
            value={pickCount}
            onChange={e => setPickCount(parseInt(e.target.value) || 1)}
            className="pick-count-input"
            style={{ width: '80px' }}
          />
          <button className="btn-primary" onClick={startPicking} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined" style={{fontSize: '18px'}}>play_arrow</span> 발표자 선발
          </button>
        </div>
      ) : remainingCount === 0 ? (
        <div className="empty-state">
          모든 학생이 선발되었습니다
        </div>
      ) : null}
    </div>
  );
}
