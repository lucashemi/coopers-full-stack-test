import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { SignIn } from "./components/SignIn";
import { Hero } from "./components/Hero";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Header handleOpenModal={onOpenModal} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <SignIn />
        </Modal>
      )}
      <main>
        <Hero />
      </main>
    </>
  );
}

export default App;
