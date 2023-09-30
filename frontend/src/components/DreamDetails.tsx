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
import { GrRobot } from "react-icons/gr";
import { getShortSentiment } from "../utils/shortSentiment";
// import { Spinner } from "flowbite-react";

interface DreamDetailProps {
  dream: Dream;
}

const DreamDetails = (props: DreamDetailProps) => {
  const { title, description, createdAt, _id, sentiment } = props.dream;
  const { dispatch } = useDreamsContext();
  const { user } = useAuthContext();
  const { theme } = useContext(ThemeContext);

  // console.log(sentiment);

  // console.log({shortSentiment});

  // alert(data);

  const [showModal, setShowModal] = useState(false);

  const shortSentiment = getShortSentiment(sentiment);

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

  let sentimentStatus;

  if (shortSentiment === "positive") {
    sentimentStatus = <div className="text-green-600">{sentiment}</div>;
  } else if (shortSentiment === "negative") {
    sentimentStatus = <div className="text-red-600">{sentiment}</div>;
  } else {
    sentimentStatus = <div>{sentiment}</div>;
  }

  return (
    <Card className="w-full relative glassmorphism-effect dream-card overflow-hidden rounded-lg shadow-lg">
      <h5 className="text-3xl font-extrabold tracking-tighter text-theme mb-4 mt-4">
        <p>{title}</p>
      </h5>
      <div className="font-light text-theme description-container text-lg mb-4 ml-4 mr-4">
        <span className="description-span">{description}</span>
      </div>

      <div className="text-theme mb-4 ml-4 mr-4">
        <p className="text-xl font-semibold pb-2 pt-4 flex gap-2">
          {" "}
          <div className="icon">
            <GrRobot size={30} />
          </div>{" "}
          <div>AI dream sentiment:</div>
        </p>
        {/* <span className="text-xl">{sentiment}</span> */}
        {/* {sentiment === "Positive" ? <div className="text-red-600">{sentiment}</div> : <div className="text-green-700">{sentiment}</div>} */}
        {sentimentStatus}
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
          className="mr-4 min-w-[10vw]"
        >
          Read dream details
        </Button>
        <p className="font-normal text-theme text-lg pl-4">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>

      <ReusableModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        className={theme}
      >
        <Modal.Header className="glassmorphism-effect p-4 rounded-t-lg modal-header">
          <div className="text-theme text-2xl font-bold">{title}</div>
        </Modal.Header>
        <Modal.Body className="glassmorphism-effect p-4 modal-body">
          <p className="pb-8 text-lg text-theme">{description}</p>
          <div>
          <p className="text-xl font-semibold pb-2 pt-4 flex gap-2 text-theme">
          <div className="icon text-theme">
            <GrRobot size={30} />
          </div>
          <div>AI dream sentiment:</div>
        </p>
            <div className="text-theme">{sentiment}</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="glassmorphism-effect p-4 rounded-b-lg modal-footer">
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
