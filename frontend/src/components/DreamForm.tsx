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
      {/* <form className="" onSubmit={handleSubmit}>
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
      </form> */}

      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dreamTitle" value="Dream Title" />
          </div>
          <TextInput
            id="dreamTitle"
            placeholder="Carnivore flower"
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />
        </div>
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="dreamDescription" value="Dream description" />
          </div>
          <TextInput
            placeholder="Last night I dreamed about a beautiful flesh-eating carnivore flower"
            id="dreamDescription"
            required
            // type="password"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : ""}
          />
        </div> */}

        <div className="w-full" id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="dreamDescription" value="Dream description" />
          </div>
          <Textarea
            id="dreamDescription"
            placeholder="Last night I dreamed about a flesh-eating carnivore flower and it was beautiful..."
            required
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={`p-2 ${
              emptyFields.includes("description") ? "error" : ""
            }`}
          />
        </div>
        {/* <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">
          Remember me
        </Label>
      </div> */}
        {/* <Button type="submit">Submit</Button> */}

        {loading ? (
          <Button color="gray">
            <Spinner aria-label="Alternate spinner button example" />
            <span className="pl-3">Loading...</span>
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}

        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default DreamForm;
