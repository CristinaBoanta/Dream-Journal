import { useEffect, useState } from "react";
import DreamDetails from "../components/DreamDetails";
import { Dream } from "../types";
import DreamForm from "../components/DreamForm";
import { useDreamsContext } from "../hooks/useDreamsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Pagination } from 'flowbite-react';
import CalendarHeatmap from "../components/Heatmap";


const Home = () => {
  const { dreams, dispatch } = useDreamsContext();
  const { user } = useAuthContext();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((dreams?.length || 0) / 1);

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
  const startIndex = (currentPage - 1) * 1; // Assuming 10 dreams per page
  const endIndex = startIndex + 1; // Assuming 10 dreams per page

  return (
    <div className="flex lg:flex-row flex-col gap-12">
      <div className="form flex-1 px-10 glassmorphism-effect rounded-lg p-6 shadow-md">
        <DreamForm />

        <div className="flex items-center justify-center">
        <div className="heatmap"><CalendarHeatmap /></div>
        <div className="text-theme p-8">Overall score for the past 3 months:</div>
        </div>
      </div>

      <div className="dreams flex-1 gap-8 flex flex-col h-[85vh] overflow-hidden">
        <div className="flex flex-col gap-8">
          {dreams && dreams.length > 0 ? (
            dreams.slice(startIndex, endIndex).map((dream: Dream) => (
              <DreamDetails key={dream._id} dream={dream} />
            ))
          ) : (
            <p>No dreams logged</p>
          )}
        </div>

        {dreams && dreams.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
            className="pagination-effect"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
