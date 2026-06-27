import { useState, useEffect } from 'react';
import './index.css';
import StudentInput from './components/StudentInput';
import SlotMachine from './components/SlotMachine';
import ResultBoard from './components/ResultBoard';
import EthicsGate from './components/EthicsGate';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';

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
  const [isEthicsAgreed, setIsEthicsAgreed] = useState(() => {
    return localStorage.getItem('randomPicker_ethicsAgreed') === 'true';
  });
  const [activeModal, setActiveModal] = useState(null); // 'terms', 'privacy', or null

  useEffect(() => {
    localStorage.setItem('randomPicker_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('randomPicker_secretOrder', JSON.stringify(secretOrder));
  }, [secretOrder]);

  const handleStartGame = () => {
    localStorage.setItem('randomPicker_ethicsAgreed', 'true');
    setIsEthicsAgreed(true);
  };

  if (!isEthicsAgreed) {
    return <EthicsGate onStart={handleStartGame} />;
  }

  return (
    <>
      <nav className="app-nav">
        <span className="app-nav-title">발표자 뽑기</span>
      </nav>

      <div style={{ padding: '0 24px 80px', maxWidth: '800px', margin: '0 auto', width: '100%', minHeight: 'calc(100vh - 200px)' }}>
        <div className="page-hero">
          <h1 className="page-title">발표자 뽑기</h1>
          <p className="page-subtitle">무작위로 발표자를 선발합니다</p>
        </div>

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

      <Footer onOpenModal={(type) => setActiveModal(type)} />

      {activeModal && (
        <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}

export default App;
