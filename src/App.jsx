import { useState, useEffect } from 'react';
import './index.css';
import StudentInput from './components/StudentInput';
import SlotMachine from './components/SlotMachine';
import ResultBoard from './components/ResultBoard';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('randomPicker_students');
    return saved ? JSON.parse(saved) : [];
  });
  const [secretOrder, setSecretOrder] = useState(() => {
    const saved = localStorage.getItem('randomPicker_secretOrder');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [pickedStudents, setPickedStudents] = useState([]);
  const [isPicking, setIsPicking] = useState(false);

  useEffect(() => {
    localStorage.setItem('randomPicker_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('randomPicker_secretOrder', JSON.stringify(secretOrder));
  }, [secretOrder]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1 className="title">⚽ 슈팅! 발표자 라인업 ⚽</h1>
      
      {!isPicking && pickedStudents.length === 0 && (
        <StudentInput 
          students={students} 
          setStudents={setStudents}
          secretOrder={secretOrder}
          setSecretOrder={setSecretOrder}
          setPickedStudents={setPickedStudents}
        />
      )}

      {students.length > 0 && (
        <SlotMachine 
          students={students}
          secretOrder={secretOrder}
          setSecretOrder={setSecretOrder}
          pickedStudents={pickedStudents}
          setPickedStudents={setPickedStudents}
          isPicking={isPicking}
          setIsPicking={setIsPicking}
        />
      )}

      {pickedStudents.length > 0 && (
        <ResultBoard 
          pickedStudents={pickedStudents} 
          setPickedStudents={setPickedStudents}
        />
      )}
    </div>
  );
}

export default App;
