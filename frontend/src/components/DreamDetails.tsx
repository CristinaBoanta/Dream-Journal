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

  // alert(data);

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
      className="w-full relative glassmorphism-effect"
      // href="#"
    >
      <h5 className="text-2xl font-bold tracking-tight card-title text-theme">
        <p>{title}</p>
      </h5>
      <div className="font-normal text-theme description-container">
        <span className="description-span">{description}</span>
      </div>

      <div className="text-theme"><p className="mb-4">Dream sentiment:</p>{sentiment}</div>

      {/* <Button onClick={handleDelete}>Delete dream</Button> */}
      <div
        className="cursor-pointer absolute right-6 top-6 text-theme"
        onClick={handleDelete}
      >
        <FaRegTrashAlt />
      </div>

      {/* <Spinner /> */}

      <div className="flex justify-between">
        <Button gradientDuoTone="purpleToBlue" onClick={() => setShowModal(true)}>Read dream details</Button>
        <p className="font-normal text-theme">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>
      </div>

      <ReusableModal showModal={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header className="glassmorphism-effect"><div className="text-theme">{title}</div></Modal.Header>
        <Modal.Body className="glassmorphism-effect">
          <p className="mb-8 text-theme">{description}</p>
          <div><p className="text-theme">Dream sentiment:</p>{sentiment}</div>
        </Modal.Body>
        <Modal.Footer className="glassmorphism-effect">
          <Button gradientDuoTone="purpleToBlue" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </ReusableModal>
    </Card>
  );
};

export default DreamDetails;
