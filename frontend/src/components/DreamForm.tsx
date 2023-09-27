import { useState } from "react";
import { useDreamsContext } from "../hooks/useDreamsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Label, TextInput, Textarea, Spinner } from "flowbite-react";
// import { Button } from "flowbite-react";

const DreamForm = () => {
  const { dispatch } = useDreamsContext();
  const { user } = useAuthContext();
  // console.log(dispatch);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [emptyFields, setEmptyFields] = useState<String[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const dream = { title, description };

    setLoading(true); // Start loading
    // console.log(description, title);

    try {
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
      } else {
        setTitle("");
        setDescription("");
        setError(null);
        dispatch({ type: "CREATE_DREAM", payload: json });
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dreamTitle" className="text-theme  font-normal w-[30vw] whitespace-nowrap overflow-hidden overflow-ellipsis" value="Dream Title" />
          </div>
          <TextInput
            id="dreamTitle"
            placeholder="Carnivore flower"
            required
            // type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={`input-effect form-element-theme ${
              emptyFields.includes("title") ? "error" : ""
            }`}
          />
        </div>

        <div className="w-full" id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="dreamDescription" className="text-theme  font-normal w-[30vw] whitespace-nowrap overflow-hidden overflow-ellipsis" value="Dream description" />
          </div>
          <Textarea
            id="dreamDescription"
            placeholder="Last night I dreamed about a flesh-eating carnivore flower and it was beautiful..."
            required
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={`p-2 glassmorphism-effect form-element-theme ${
              emptyFields.includes("description") ? "error" : ""
            }`}
          />
        </div>

        {loading ? (
          <Button color="gray">
            <Spinner aria-label="Alternate spinner button example" />
            <span className="pl-3">Loading...</span>
          </Button>
        ) : (
          <Button gradientDuoTone="purpleToBlue" type="submit">Submit</Button>
        )}

        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default DreamForm;
