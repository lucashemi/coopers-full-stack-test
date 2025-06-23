import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { SignIn } from "./components/SignIn";
import { Hero } from "./components/Hero";
import { ToDoTitle } from "./components/ToDoTitle";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <Header handleOpenModal={onOpenModal} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <SignIn />
        </Modal>
      )}
      <main>
        <Hero />
        <ToDoTitle />
      </main>
    </div>
  );
}

export default App;
