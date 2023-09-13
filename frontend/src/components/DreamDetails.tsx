import { Dream } from "../types";
import { useDreamsContext } from "../hooks/useDreamsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Card } from "flowbite-react";

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
      return;
    }
    const response = await fetch("http://localhost:4000/api/dreams/" + _id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_DREAM", payload: json });
    }
  };

  return (
    // <div>
    //     <h3>{title}</h3>
    //     <p><span>{description}</span></p>
    //     <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>

    //     <Button onClick={handleDelete}>Delete dream</Button>
    // </div>

    <Card
      className="w-full"
      // href="#"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{title}</p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>{description}</p>
      </p>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>

      <Button onClick={handleDelete}>Delete dream</Button>
    </Card>
  );
};

export default DreamDetails;
