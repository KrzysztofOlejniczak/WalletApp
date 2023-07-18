import { useState } from "react";
import { LoginForm } from "./components/login/login";
import { RegisterForm } from "./components/registration/registerForm";
import { ButtonAddTransactions } from "./components/buttonAddTransactions/buttonAddTransactions";
import { ModalAddTransaction } from "./components/modalAddTransaction/modalAddTransaction";

function App() {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);

  return (
    <div>
      <RegisterForm />
      <LoginForm />
      <ButtonAddTransactions
        handleClick={() =>
          setIsModalAddTransactionOpen(!isModalAddTransactionOpen)
        }
      />
      {isModalAddTransactionOpen && (
        <ModalAddTransaction
          closeModal={() => setIsModalAddTransactionOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
