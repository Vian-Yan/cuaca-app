import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import './App.css';

import rain from './assets/rain.png';
import humidity from './assets/humidity.png';
import wind from './assets/wind.png';

function App() {
  const [input, setInput] = useState('');
  const [term, setTerm] = useState('lombok');
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    if (input.trim() !== '') {
      setTerm(input);
      setInput('');
    }
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const images = import.meta.glob('./assets/*.png', {
    eager: true,
    import: 'default',
  });

  const iconName = data?.weather[0].icon;
  const iconPatch = images[`./assets/${iconName}.png`];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=6c50ca961aec7db3f45016a10f535f93&units=metric`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, [term]);

  return (
    <>
      <div className="h-screen flex-col items-center justify-center border bg-gray-500 p-4 w-full">
        <h1 className="text-white text-xl font-bold flex justify-center items-center mb-2">
          <Typewriter
            words={[
              'Cuaca Hari Ini',
              'Suhu Terbaru',
              'Info Angin & Kelembaban',
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        <div
          className={`max-w-[450px]  mx-auto  flex flex-col items-center justify-center p-4 rounded-lg shadow-lg w-full ${data && data.weather[0].icon.slice(-1) === 'n' ? 'bg-night' : 'bg-day'}`}
        >
          <div className="flex  justify-center items-center  gap-2 w-full mt-4">
            <input
              type="text"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter city name"
              className="px-3 py-2 font-sans  bg-slate-200  rounded-full outline-none w-full fon"
            />
            <button
              onClick={handleSubmit}
              className=" p-2 text-white rounded-full bg-slate-300 hover:bg-slate-200 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
            </button>
          </div>
          {data && (
            <motion.div
              className="mt-4 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img src={iconPatch} alt="Weather Icon" className="w-24 h-24" />
              <p className="text-4xl text-slate-100">
                {data ? `${data.main.temp}°C` : 'Loading...'}
              </p>
            </motion.div>
          )}

          {data ? (
            <motion.div
              className="flex flex-col items-center text-slate-100 mt-2"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h2 className="text-3xl font-bold" variants={itemVariants}>
                {data.name}
              </motion.h2>

              <motion.h1 className="mt-1 text-xl" variants={itemVariants}>
                Precipitations
              </motion.h1>

              <motion.div
                className="flex justify-center items-center gap-3 font-light mt-1"
                variants={itemVariants}
              >
                <p>Min: {data?.main.temp_min}°C</p>
                <p>Max: {data?.main.temp_max}°C</p>
              </motion.div>
            </motion.div>
          ) : (
            <span className="transform transition-all animate-ping duration-300 text-xl mt-4 text-slate-500 font-bold">
              Loading.....
            </span>
          )}
          <motion.div
            className="mt-8 p-4 relative rounded-full flex justify-between w-full text-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#001026] opacity-10 w-full rounded-full"></div>

            <div className="flex z-10 text-white gap-1 items-center">
              <img src={rain} className="opacity-100 w-6" alt="" />
              <span>{data && data.main.humidity}%</span>
            </div>

            <div className="flex z-10 text-white gap-1 items-center">
              <img src={humidity} className="opacity-100 w-6" alt="" />
              <span>{data && data.clouds.all}%</span>
            </div>

            <div className="flex z-10 text-white gap-1 items-center">
              <img src={wind} className="opacity-100 w-6" alt="" />
              <span>{data && data.wind.speed} km/h</span>
            </div>
          </motion.div>
          <div className=" flex justify-center items-center mt-3  flex-col rounded-xl ">
            <p className="text-sm text-slate-100">Follow my social media</p>
            <div className="flex justify-around w-full p-0.5">
              <a href="https://www.instagram.com/viannv___/">
                <img
                  className="w-8 h-8"
                  src="https://img.icons8.com/?size=100&id=9R1sV3QvY18K&format=png&color=000000"
                  alt=""
                />
              </a>
              <a href="https://t.me/Aowkaowkaks">
                <img
                  className="w-8 h-8"
                  src="https://img.icons8.com/?size=100&id=32292&format=png&color=000000"
                  alt=""
                />
              </a>
            </div>
          </div>

          <footer className="mt-4 text-slate-300 font-pacifico flex flex-col sm:flex-row justify-between items-center text-sm w-full gap-4 px-4 py-2 border-t border-slate-700">
            <p className="whitespace-nowrap">
              Dibuat dengan{' '}
              <span className="text-red-500 animate-pulse">❤️</span> oleh{' '}
              <span className="text-white">Vian</span>
            </p>
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
              Powered by OpenWeatherMap
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
