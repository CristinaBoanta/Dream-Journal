import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useDreamsContext } from "../hooks/useDreamsContext";
import moment from "moment";

const Heatmap = () => {
  const { dreams } = useDreamsContext();
  console.log(dreams);

  const formattedDreamDates = dreams
    ? dreams.map((dream) => {
        const formattedDate = moment(dream.createdAt).format('YYYY-MM-DD');
        return { date: formattedDate, count: 1 };
      })
    : [];

  console.log(formattedDreamDates);

  return (
    <>
    <div className="text-theme">View your activity for the past 3 months</div>
      <CalendarHeatmap
        startDate={moment().subtract(3, 'month').toDate()}
        endDate={moment().toDate()}
        values={formattedDreamDates}
      />
    </>
  );
};

export default Heatmap;
