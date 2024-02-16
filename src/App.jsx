import { useEffect, useState } from 'react'
import './App.css';
import TopButtons from './components/TopButtons';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDeatils from './components/TemparatureAndDeatils';
import Forcast from './components/Forcast'
import getFormattedWeatherData from './service/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({ q: 'Delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message=query.q ? query.q : 'current location';

      toast.info('fetching weather for ' + message)
      const data = await getFormattedWeatherData({ ...query, units }).then(data => {
       
        setWeather(data);
        toast.success(`Successfully fetch weather for ${data.name}, ${data.country}`);
        
      })

    }
    fetchWeather()
  }, [query, units])
  {/* from-cyan-400 to-blue-700 h-fit*/ }


  const formatBackground = () => {
    if (!weather) return "bg-no-repeat bg-cover bg-[url('../summer.png')]";
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return "bg-no-repeat bg-cover bg-[url('../winter.png')]"
    if (weather.temp > threshold && weather.temp <= 25) return "bg-no-repeat bg-cover bg-[url('../rain.png')]"

    return "bg-no-repeat bg-cover bg-[url('../summer.png')]"
  }
  return (
    <div className={`mx-auto back max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} shadow-xl shadow-gray-400`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {
        weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemparatureAndDeatils weather={weather} />
            <Forcast title={"Tommorrow Forcast"} items={weather.tommorrow} />
            <Forcast title={"Overmorrow Forcast"} items={weather.nextDay} />
          </div>
        )
      }

      <ToastContainer  autoClose={3000} theme='colored' newestOnTop={true} />
    </div>
  )
}

export default App;
