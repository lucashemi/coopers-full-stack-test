import { Header } from "./components/Header";

function App() {
  function onOpenModal() {}

  return (
    <>
      <Header handleOpenModal={onOpenModal} />
    </>
  );
}

export default App;
