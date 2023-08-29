import { Dream } from "../types";

interface DreamDetailProps {
    dream: Dream;
}

const DreamDetails = (props: DreamDetailProps) => {
    const { title, description, createdAt } = props.dream;
    // console.log(props);


    return (
        <>
            <h3>{title}</h3>
            <p>Dream description: <span>{description}</span></p>
            <p>{createdAt}</p>
        </>
    )
}

export default DreamDetails;