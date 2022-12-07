import { useState } from 'react';
import data from './text';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [paraCount, setParaCount] = useState(0);
  const [text, setText] = useState<string[]>([]);

  const notify = () =>
    toast.success('Generated!', {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();

    setText([
      ...Array.from({ length: paraCount }, (_, i) => data[i % data.length]),
    ]);
  }

  function checkCount(count: number): number {
    if (count < 0) {
      return 0;
    }

    return count;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setParaCount((prevCount) => checkCount(Number(e.target.value)));
  }
  return (
    <div className='section-center'>
      <h3>tired of boring lorem ipsum</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>Paragraphs: </label>
        <span>
          <input
            type='number'
            name='amount'
            id='id'
            value={paraCount}
            onChange={(e) => handleChange(e)}
          />
          <button className='btn' onClick={notify}>
            generate
          </button>
          <ToastContainer
            position='top-left'
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </span>
      </form>

      <article className='lorem-text'>
        {text.map((singleText, i) => (
          <p key={i + 1}>
            <span>{i + 1}.</span> {singleText}
          </p>
        ))}
      </article>
    </div>
  );
}

export default App;
