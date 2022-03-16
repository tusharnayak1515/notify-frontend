import Navbar from './components/Navbar';

import './App.css';
import TodoForm from './components/TodoForm';
import Calender from './components/Calender';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1 className='header'>Notify - Create and access your todolist online!</h1>
      <Calender />
      <TodoForm />
    </div>
  );
}

export default App;
