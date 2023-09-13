import { useState } from "react";
import { useDreamsContext } from "../hooks/useDreamsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "flowbite-react";

const DreamForm = () => {
  const { dispatch } = useDreamsContext();
  const { user } = useAuthContext();
  // console.log(dispatch);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [emptyFields, setEmptyFields] = useState<String[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const dream = { title, description };
    // console.log(description, title);

    const response = await fetch("http://localhost:4000/api/dreams/", {
      method: "POST",
      body: JSON.stringify(dream),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.Error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");

      setError(null);
      console.log("new dream added", json);
      dispatch({ type: "CREATE_DREAM", payload: json });
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <h3>Log a dream to the journal</h3>

        <div className="form-row">
          <label>Dream title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />
        </div>

        <div className="form-row">
          <label>Describe your dream</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : ""}
          ></textarea>
        </div>

        <Button>
          <button>Log dream</button>
        </Button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default DreamForm;
