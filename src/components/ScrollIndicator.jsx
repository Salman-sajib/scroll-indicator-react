import { useEffect, useState } from 'react';

function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollProgress() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const howMuchScrolled = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollProgress((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollProgress);

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  console.log(data, scrollProgress);

  if (loading) {
    return (
      <div>
        <p>Loading... Please wait.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='top-container'>
        <h1>Custom Scroll Indicator</h1>
        <div className='scroll-progress-container'>
          <div
            className='progress-bar'
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </div>

      <div className='data-container'>
        {data && data.length > 0
          ? data.map((dataItem) => <p key={dataItem.id}> {dataItem.title} </p>)
          : null}
      </div>
    </div>
  );
}

export default ScrollIndicator;
