import EventsAddPhotos from "pages/events-add-photos/EventsAddPhotos";
import EventsDescription from "pages/events-description/EventsDescription";
import EventsNext from "pages/events-next/EventsNext";
import EventsOld from "pages/events-old/EventsOld";
import EventsRegister from "pages/events-register/EventsRegister";
import Home from "pages/home/Home";
import Login from "pages/login/Login";
import NoPage from "pages/no-page/NoPage";
import RegisterStudent from "pages/register-student/RegisterStudent";
import ScheduledEvents from "pages/scheduled-events/ScheduledEvents";
import ListStudent from "pages/student-list/ListStudent";
import EditRegisterStudent from "pages/student-list/EditRegisterStudent";
import { Route, Routes } from "react-router-dom";
import AttendanceList from "pages/presential-list/AttendanceList";
import AttendanceReport from "pages/attendance-report/AttendanceReport";
import PeriodoLetivo from "pages/periodo-letivo/PeriodoLetivo";
import EditPeriodoLetivo from "pages/periodo-letivo/EditPeriodoLetivo";
import RegisterPeriodoLetivo from "pages/periodo-letivo/RegisterPeriodoLetivo";
import NoClassDays from "pages/no-class-days/NoClassDays";
import EditNoClassDay from "pages/no-class-days/EditNoClassDay";
import RegisterNoClassDay from "pages/no-class-days/RegisterNoClassDay";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="register-student" element={<RegisterStudent />} />
        <Route path="scheduled-events" element={<ScheduledEvents />} />
        <Route path="events-next" element={<EventsNext />} />
        <Route path="events-old" element={<EventsOld />} />
        <Route path="events-register" element={<EventsRegister />} />
        <Route path="events-description" element={<EventsDescription />} />
        <Route path="events-add-photos" element={<EventsAddPhotos />} />
        <Route path="student-list" element={<ListStudent />} />
        <Route
          path="student-list/edit/:name"
          element={<EditRegisterStudent />}
        />
        <Route path="attendance-list" element={<AttendanceList />} />
        <Route path="attendance-report" element={<AttendanceReport />} />
        <Route path="periodo-letivo" element={<PeriodoLetivo />} />
        <Route path="periodo-letivo/edit" element={<EditPeriodoLetivo />} />
        <Route
          path="periodo-letivo/create"
          element={<RegisterPeriodoLetivo />}
        />
        <Route path="no-class-day" element={<NoClassDays />} />
        <Route path="no-class-day/edit" element={<EditNoClassDay />} />
        <Route
          path="no-class-day/create"
          element={<RegisterNoClassDay />}
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};
