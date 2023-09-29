import { useState } from "react";
import { useDreamsContext } from "../hooks/useDreamsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Label, TextInput, Textarea, Spinner } from "flowbite-react";
import { GiNightSleep } from 'react-icons/gi';
// import { LuSubtitles } from "react-icons/lu";
// import { Button } from "flowbite-react";

const DreamForm = () => {
  const { dispatch } = useDreamsContext();
  // console.log(useDreamsContext());
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
            <Label
              htmlFor="dreamTitle"
              className="text-theme text-xl font-normal w-[30vw] whitespace-nowrap overflow-hidden overflow-ellipsis"
              value="Dream Title"
            />
          </div>
          <TextInput
            id="dreamTitle"
            placeholder="Carnivore flower"
            required
            icon={GiNightSleep}
            // type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{ fontSize: '1rem' }}
            className={`input-effect form-element-theme shadow-md text-xl ${
              emptyFields.includes("title") ? "error" : ""
            }`}
          />
        </div>

        <div className="w-full" id="textarea">
          <div className="mb-2 block">
            <Label
              htmlFor="dreamDescription"
              className="text-theme text-xl font-normal w-[30vw] whitespace-nowrap overflow-hidden overflow-ellipsis"
              value="Dream description"
            />
          </div>
          <Textarea
            id="dreamDescription"
            placeholder="Last night I dreamed about a flesh-eating carnivore flower and it was beautiful..."
            required
            rows={6}
            style={{ fontSize: '1rem' }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={`p-2 glassmorphism-effect form-element-theme shadow-md ${
              emptyFields.includes("description") ? "error" : ""
            }`}
          />
        </div>

        {loading ? (
          <div className="py-8 w-full">
            <Button color="gray" className="min-w-[10vw]">
              <Spinner aria-label="Alternate spinner button example" />
              <span className="pl-3">Loading...</span>
            </Button>
          </div>
        ) : (
          <div className="py-8 w-full">
            <Button gradientDuoTone="purpleToBlue" type="submit" className="min-w-[10vw]">
              Submit
            </Button>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default DreamForm;
