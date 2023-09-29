import { Dream } from "../types";
import { useDreamsContext } from "../hooks/useDreamsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, Button } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "../components/Modal";
import { useState, useContext } from "react";
import { Modal } from "flowbite-react";
import { ThemeContext } from "../context/ThemeContext";
// import { Spinner } from "flowbite-react";

interface DreamDetailProps {
  dream: Dream;
}

const DreamDetails = (props: DreamDetailProps) => {
  const { title, description, createdAt, _id, sentiment } = props.dream;
  const { dispatch } = useDreamsContext();
  const { user } = useAuthContext();
  const { theme } = useContext(ThemeContext);

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
    <Card className="w-full relative glassmorphism-effect dream-card overflow-hidden rounded-lg shadow-lg">
      <h5 className="text-3xl font-extrabold tracking-tighter text-theme mb-4 mt-4">
        <p>{title}</p>
      </h5>
      <div className="font-light text-theme description-container text-lg mb-4 ml-4 mr-4">
        <span className="description-span">{description}</span>
      </div>

      <div className="text-theme mb-4 ml-4 mr-4">
        <p className="text-xl font-semibold pb-2 pt-4">Dream sentiment:</p>
        <span className="text-xl">{sentiment}</span>
      </div>

      <div
        className="cursor-pointer absolute right-6 top-6 text-theme text-xl"
        onClick={handleDelete}
      >
        <FaRegTrashAlt />
      </div>

      <div className="flex justify-between mb-4 ml-4 mr-4">
        <Button
          gradientDuoTone="purpleToBlue"
          onClick={() => setShowModal(true)}
          className="pr-4"
        >
          Read dream details
        </Button>
        <p className="font-normal text-theme text-lg pl-4">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>

      <ReusableModal showModal={showModal} onClose={() => setShowModal(false)} className={theme}>
        <Modal.Header className="glassmorphism-effect p-4 rounded-t-lg">
          <div className="text-theme text-2xl font-bold">{title}</div>
        </Modal.Header>
        <Modal.Body className="glassmorphism-effect p-4">
          <p className="pb-8 text-lg text-theme">{description}</p>
          <div>
            <p className="text-theme text-lg font-semibold">Dream sentiment:</p>
            <div className="text-theme">{sentiment}</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="glassmorphism-effect p-4 rounded-b-lg">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </ReusableModal>
    </Card>
  );
};

export default DreamDetails;
