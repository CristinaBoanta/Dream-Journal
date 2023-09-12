import { Dream } from "../types";
import { useDreamsContext } from "../hooks/useDreamsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

interface DreamDetailProps {
    dream: Dream;
}

const DreamDetails = (props: DreamDetailProps) => {
    const { title, description, createdAt, _id } = props.dream;
    const { dispatch } = useDreamsContext();
    const { user } = useAuthContext();
    // console.log(props);

    const handleDelete = async () => {
        if (!user) {
            return
        }
        const response = await fetch('http://localhost:4000/api/dreams/' + _id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>

            <button onClick={handleDelete}>Delete dream</button>
        </>
    )
}

export default DreamDetails;