import { useEffect } from 'react';
import DreamDetails from '../components/DreamDetails';
import { Dream } from '../types';
import DreamForm from '../components/DreamForm';
import { useDreamsContext } from '../hooks/useDreamsContext';

const Home = () => {
    // const [dreams, setDreams] = useState<Dream[] | null>(null)
    // console.log(dreams);

    const {dreams, dispatch} = useDreamsContext();

    useEffect(() => {
        const fetchDreams = () => {
            fetch('http://localhost:4000/api/dreams/')
            .then((res) => res.json())
            .then((data) => {
                // setDreams(data);
                dispatch({type: 'SET_DREAMS', payload: data})
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
              });

        }
        fetchDreams();
    },[])

    return (
        <div className="">
            <div className='dreams'>
                {dreams && dreams.map((dream: Dream) => {
                    // console.log(dream);
                    return (
                        <DreamDetails key={dream._id} dream={dream} />
                    )
                })}
            </div>

            <div className='form'>
                <DreamForm />
            </div>
        </div>
    )
}

export default Home;