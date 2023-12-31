import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useDreamsContext } from '../hooks/useDreamsContext';
import moment from 'moment';
import { Dream } from '../types';
import { getShortSentiment } from '../utils/shortSentiment';
import { FormattedDreamDate, AggregatedData } from '../types';

const Heatmap = () => {
  const { dreams } = useDreamsContext();

  const aggregateDreamData = () : FormattedDreamDate[] => {
    // Object to hold the aggregated data
    const aggregatedData: AggregatedData = {};

    if (dreams) {
      dreams.forEach((dream: Dream) => {
        const formattedDate = moment(dream.createdAt).format('YYYY-MM-DD');
        const sentimentValue = getShortSentiment(dream.sentiment);

        // Initialize the date in the aggregatedData object if it doesn't exist
        if (!aggregatedData[formattedDate]) {
          aggregatedData[formattedDate] = { positive: 0, negative: 0, neutral: 0 };  // Added neutral here
        }

        // Increment the corresponding sentiment count
        if (sentimentValue === 'positive') {
          aggregatedData[formattedDate].positive += 1;
        } else if (sentimentValue === 'negative') {
          aggregatedData[formattedDate].negative += 1;
        } else if (sentimentValue === 'neutral') {  // Added this block for neutral case
          aggregatedData[formattedDate].neutral += 1;
        }
      })
    }

    console.log(aggregatedData);

    // Convert aggregatedData object to the array format expected by CalendarHeatmap
    const formattedDreamDates = Object.keys(aggregatedData).map(date => ({
      date,
      count: aggregatedData[date].positive + aggregatedData[date].negative + aggregatedData[date].neutral,  // Updated count
      ...aggregatedData[date]
    }));

    return formattedDreamDates;
  }

  const formattedDreamDates = aggregateDreamData();

  return (
    <>
      <div className="text-theme">View your dream history for the past 3 months</div>
      <CalendarHeatmap
        startDate={moment().subtract(3, 'month').toDate()}
        endDate={moment().toDate()}
        values={formattedDreamDates}
        showWeekdayLabels={true}
        // gutterSize={2}
        classForValue={(value) => {
          if (value !== null) {
            // You can use value.positive, value.negative, and value.neutral to determine the class
            if (value.positive > value.negative) {
              return 'positive';
            } else if (value.positive < value.negative) {
              return 'negative';
            } else {  // This case will now also handle when there are only neutral values
              return 'neutral';
            }
          }
        }}
      />
    </>
  );
};

export default Heatmap;
