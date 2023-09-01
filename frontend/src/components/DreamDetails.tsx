import { Dream } from "../types";
import { useDreamsContext } from "../hooks/useDreamsContext";

interface DreamDetailProps {
    dream: Dream;
}

const DreamDetails = (props: DreamDetailProps) => {
    const { title, description, createdAt, _id } = props.dream;
    const { dispatch } = useDreamsContext();
    // console.log(props);

    const handleDelete = async () => {
        const response = await fetch('http://localhost:4000/api/dreams/' + _id, {
            method: 'DELETE'
        })
        const json = await response.json();

        
    if (response.ok) {
        dispatch({type: 'DELETE_DREAM', payload: json})
    }
    }

    return (
        <>
            <h3>{title}</h3>
            <p>Dream description: <span>{description}</span></p>
            <p>{createdAt}</p>

            <button onClick={handleDelete}>Delete dream</button>
        </>
    )
}

export default DreamDetails;