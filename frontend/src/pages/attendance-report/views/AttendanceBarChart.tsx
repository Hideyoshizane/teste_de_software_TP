import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { IRow } from "pages/presential-list/AttendanceList";
import { INoClassDays } from "services/no-class-days/NoClassDaysServices";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type AttendanceBarChartProps = {
  students: IRow[];
  noClassDays: INoClassDays[]
};

export default function AttendanceBarChart({
  students,
  noClassDays,
}: AttendanceBarChartProps) {
  const checkDateAvailability = (date: string) => {
    if (new Date(date).getTime() <= new Date().getTime()) {
      const day = new Date(date).getDay();

      const isNoClassDay = noClassDays.some(noClassDay => {
        const classDate = new Date(noClassDay.date);
        classDate.setHours(0,0,0,0);
        classDate.setDate(classDate.getDate() + 1);
        return classDate.getTime() === new Date(date).getTime()
      });

      return day !== 0 && day !== 6 && !isNoClassDay;
    }

    return false;
  };

  const getBadStudents = () => {
    return students.reduce((acc, current) => {
      let qtdFaltas = 0;
      let qtdPresencas = 0;

      current.attendanceList.forEach((attendance) => {
        if (checkDateAvailability(attendance.date))
          if (!attendance.isPresent) {
            qtdFaltas++;
          } else {
            qtdPresencas++;
          }
      });
      console.log(
        qtdPresencas,
        qtdFaltas,
        qtdPresencas / (qtdPresencas + qtdFaltas)
      );
      return qtdPresencas / (qtdPresencas + qtdFaltas) < 0.75 ? acc + 1 : acc;
    }, 0);
  };

  const getRegularStudents = () => {
    return students.reduce((acc, current) => {
      let qtdFaltas = 0;
      let qtdPresencas = 0;

      current.attendanceList.forEach((attendance) => {
        if (checkDateAvailability(attendance.date))
          if (!attendance.isPresent) {
            qtdFaltas++;
          } else {
            qtdPresencas++;
          }
      });
      const percent = qtdPresencas / (qtdPresencas + qtdFaltas);
      return percent >= 0.75 && percent < 0.9 ? acc + 1 : acc;
    }, 0);
  };

  const getGreatStudents = () => {
    return students.reduce((acc, current) => {
      let qtdFaltas = 0;
      let qtdPresencas = 0;

      current.attendanceList.forEach((attendance) => {
        if (checkDateAvailability(attendance.date))
          if (!attendance.isPresent) {
            qtdFaltas++;
          } else {
            qtdPresencas++;
          }
      });
      const percent = qtdPresencas / (qtdPresencas + qtdFaltas);
      return percent >= 0.9 && percent < 1 ? acc + 1 : acc;
    }, 0);
  };

  const getPerfectStudents = () => {
    return students.reduce((acc, current) => {
      let qtdFaltas = 0;
      let qtdPresencas = 0;

      current.attendanceList.forEach((attendance) => {
        if (checkDateAvailability(attendance.date))
          if (!attendance.isPresent) {
            qtdFaltas++;
          } else {
            qtdPresencas++;
          }
      });
      const percent = qtdPresencas / (qtdPresencas + qtdFaltas);
      return percent === 1 ? acc + 1 : acc;
    }, 0);
  };

  const option = {
    type: "bar",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Relação de presença",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  
  const data = {
    labels: ["Ruim <75%", "Regular >=75% e <90%", "Bom >=90%", "Ótimo = 100%"],
    datasets: [
      {
        label: "Ruim",
        data: [
          getBadStudents(),
          getRegularStudents(),
          getGreatStudents(),
          getPerfectStudents(),
        ],
        backgroundColor: ["#b04038", "#dbd52c", "#37bd58", "#A5CEF4"],
      },
    ],
  };

  return (
    <div className="AttendanceBarChart">
      <Bar options={option} data={data} />
    </div>
  );
}
