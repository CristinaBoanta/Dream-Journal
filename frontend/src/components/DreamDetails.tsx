import { Dream } from "../types";
import { useDreamsContext } from "../hooks/useDreamsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, Button } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "../components/Modal";
import { useState } from "react";
import { Modal } from "flowbite-react";
// import { Spinner } from "flowbite-react";

interface DreamDetailProps {
  dream: Dream;
}

const DreamDetails = (props: DreamDetailProps) => {
  const { title, description, createdAt, _id, sentiment } = props.dream;
  const { dispatch } = useDreamsContext();
  const { user } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

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
      className="w-full relative card-effect"
      // href="#"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{title}</p>
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400 w-[30vw] whitespace-nowrap overflow-hidden overflow-ellipsis">
        {description}
      </div>

      <div><p className="mb-4">Dream sentiment:</p>{sentiment}</div>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>

      {/* <Button onClick={handleDelete}>Delete dream</Button> */}
      <div
        className="cursor-pointer absolute right-6 top-6"
        onClick={handleDelete}
      >
        <FaRegTrashAlt />
      </div>

      {/* <Spinner /> */}

      <div>
        <Button gradientDuoTone="purpleToBlue" onClick={() => setShowModal(true)}>Read dream details</Button>
      </div>

      <ReusableModal showModal={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <p className="mb-8">{description}</p>
          <div><p>Dream sentiment:</p>{sentiment}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="purpleToBlue" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </ReusableModal>
    </Card>
  );
};

export default DreamDetails;
