import { useEffect, useState } from 'react';
import DreamDetails from '../components/DreamDetails';
import { Dream } from '../types';

const Home = () => {
    const [dreams, setDreams] = useState<Dream[] | null>(null)
    // console.log(dreams);

    useEffect(() => {
        const fetchDreams = () => {
            fetch('http://localhost:4000/api/dreams')
            .then((res) => res.json())
            .then((data) => {
                setDreams(data);
                // console.log(data);
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
        </div>
    )
}

export default Home;