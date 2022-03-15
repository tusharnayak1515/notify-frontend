import Navbar from './components/Navbar';

import './App.css';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1 className='header'>Notify - Create and access your todolist online!</h1>
      <TodoForm />
    </div>
  );
}

export default App;
