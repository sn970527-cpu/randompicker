import { useState } from 'react';
import { Play } from 'lucide-react';

export default function SlotMachine({ students, secretOrder, setSecretOrder, pickedStudents, setPickedStudents, isPicking, setIsPicking }) {
  const [pickCount, setPickCount] = useState(1);
  const [currentName, setCurrentName] = useState('???');
  const [showGoal, setShowGoal] = useState(false);

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

    let count = 0;
    const maxCount = 20; 
    const interval = setInterval(() => {
      const randomS = availableStudents[Math.floor(Math.random() * availableStudents.length)];
      setCurrentName(randomS);
      count++;
      
      if (count >= maxCount) {
        clearInterval(interval);
        
        setShowGoal(true);
        setCurrentName('GOAL!!! ⚽');

        setTimeout(() => {
          setShowGoal(false);
          setCurrentName(target);
          
          setTimeout(() => {
            const newPickedList = [...currentPickedList, target];
            setPickedStudents(newPickedList);
            
            setTimeout(() => {
              pickNext(remaining - 1, newPickedList, newSecretOrder);
            }, 800);
          }, 800);
        }, 800);
      }
    }, 50);
  };

  const remainingCount = students.length - pickedStudents.length;

  return (
    <div className="glass-card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <div className={showGoal ? "goal-text" : ""} style={{
        fontSize: showGoal ? '5rem' : '4rem',
        fontWeight: 'bold',
        padding: '2rem',
        backgroundColor: isPicking && !showGoal ? 'rgba(255,255,255,0.2)' : (showGoal ? 'rgba(255, 215, 0, 0.3)' : 'rgba(0,0,0,0.5)'),
        borderRadius: '20px',
        border: '4px dashed ' + (showGoal ? 'var(--primary)' : 'var(--turf-line)'),
        marginBottom: '1.5rem',
        transition: 'background-color 0.3s',
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: showGoal ? 'var(--primary)' : 'var(--text)',
        textShadow: showGoal ? '2px 2px 0 #000' : 'none'
      }}>
        {isPicking ? currentName : '⚽ 슈팅 대기 중...'}
      </div>

      {!isPicking && remainingCount > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#fff' }}>뽑을 인원수:</label>
          <input 
            type="number" 
            min="1" 
            max={remainingCount} 
            value={pickCount}
            onChange={e => setPickCount(parseInt(e.target.value) || 1)}
            style={{ width: '80px', textAlign: 'center', fontSize: '1.2rem' }}
          />
          <button className="primary" onClick={startPicking} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.5rem', padding: '10px 30px' }}>
            <Play fill="black" /> 슈팅!
          </button>
        </div>
      ) : remainingCount === 0 ? (
        <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
          모든 선수를 다 뽑았습니다! 🎉
        </div>
      ) : null}
    </div>
  );
}
