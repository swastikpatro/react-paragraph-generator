import { useState } from 'react';
import data from './text';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [paraCount, setParaCount] = useState(0);
  const [text, setText] = useState<string[]>([]);

  function notify(count: number): void {
    toast.success(`Generated ${count} paragraphs`, {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

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
    setParaCount((prevCount) => checkCount(e.target.valueAsNumber));
  }
  return (
    <div className='section-center'>
      <h3>tired of boring lorem ipsum ?</h3>
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
          <button
            className='btn'
            onClick={() => {
              paraCount <= 1000 && paraCount > 0 && notify(paraCount);
            }}
          >
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
        {paraCount > 1000 ? (
          <span>Sorry Can't Generate Paragraphs more than 1000 🙏🏻</span>
        ) : (
          text.map((singleText, i) => (
            <p key={new Date().getTime().toString()}>
              <span>{i + 1}.</span> {singleText}
            </p>
          ))
        )}
      </article>
    </div>
  );
}

export default App;
