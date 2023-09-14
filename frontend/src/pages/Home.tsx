import { useEffect, useState } from "react";
import DreamDetails from "../components/DreamDetails";
import { Dream } from "../types";
import DreamForm from "../components/DreamForm";
import { useDreamsContext } from "../hooks/useDreamsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Pagination } from 'flowbite-react';

const Home = () => {
  const { dreams, dispatch } = useDreamsContext();
  const { user } = useAuthContext();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((dreams?.length || 0) / 3);

  useEffect(() => {
    const fetchDreams = () => {
      fetch("http://localhost:4000/api/dreams/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "SET_DREAMS", payload: data });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    if (user) {
      fetchDreams();
    }
  }, [dispatch, user]);

  // Function to handle page change
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the slice range for current page
  const startIndex = (currentPage - 1) * 3; // Assuming 10 dreams per page
  const endIndex = startIndex + 3; // Assuming 10 dreams per page

  return (
    <div className="flex gap-20">
      <div className="form flex-1 px-10">
        <DreamForm />
      </div>

    <div className="dreams flex-1 px-10 gap-8 flex flex-col h-[85vh] overflow-hidden">
    <div className="flex flex-col gap-8">
        {dreams &&
          dreams.slice(startIndex, endIndex).map((dream: Dream) => (
            <DreamDetails key={dream._id} dream={dream} />
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </div>
    </div>
  );
};

export default Home;
