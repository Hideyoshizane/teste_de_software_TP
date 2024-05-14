import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "shared-components/hooks";
import { Environment } from "shared-components/environment";
import Header from "shared-components/header/Header";
import {
  AlunosServices,
  IListagemALunos,
} from "services/alunos/AlunosServices";
import { BoxForm, BoxList, BoxSelect, PaperList } from "./styles";
import { ATTENDANCE_LIST } from "utils/storageKeys";
import { INoClassDays, NoClassDaysServices } from "services/no-class-days/NoClassDaysServices";

const currentYear = new Date().getFullYear();

export const getEmptyAttendance = (): Attendance[] => {
  return [...Array(12)].flatMap((_, month) => {
    const days = new Date(currentYear, month + 1, 0).getDate();
    return [...Array(days)].map((_, index) => ({
      isPresent: new Date(`${currentYear}-${month+1}-${index + 1}`).getTime() < new Date().getTime(),
      date: `${month+1}-${index + 1}-${currentYear}`,
    }))
  })
}

type Attendance = {
  date: string;
  isPresent: boolean;
};

export interface IRow extends IListagemALunos {
  attendanceList: Attendance[];
}

const AttendanceList = () => {
  const currentMonth = new Date().getMonth() + 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<IRow[]>([]);
  const [selectedMonth, setSelectMonth] = useState(currentMonth);
  const [hasChanges, setHasChanges] = useState(false);
  const [noClassDays, setNoClassDays] = useState<INoClassDays[]>([]);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  const onChangeMonth = (month: number) => {
    setSelectMonth(month);
  };

  const numberOfDays = new Date(currentYear, selectedMonth, 0).getDate();

  const handleToggleDay = (id: number, date: string) => {
    setHasChanges(true);

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              attendanceList: row.attendanceList.map((attendance) =>
                attendance.date === date
                  ? { date, isPresent: !attendance.isPresent }
                  : attendance
              ),
            }
          : row
      )
    );
  };

  const onClickSave = () => {
    localStorage.setItem(ATTENDANCE_LIST, JSON.stringify(rows));
    setHasChanges(false);

    alert("Dados salvos com sucesso!");
  };

  const getWeekDay = (year: number, month: number, day: number) => {
    const dayName = new Intl.DateTimeFormat("pt-BR", {
      weekday: "short",
      }).format(new Date(`${year}-${month}-${day}`));
    return dayName;
  }

  const isDateAvailable = (date: string) => {
    const day = new Date(date).getDay();

    const isNoClassDay = noClassDays.some(noClassDay => {
      const classDate = new Date(noClassDay.date);
      classDate.setHours(0,0,0,0);
      classDate.setDate(classDate.getDate() + 1);
      return classDate.getTime() === new Date(date).getTime()
    });

    return day !== 0 && day !== 6 && !isNoClassDay;
  }

  const getAttendaceByStudentMonth = (row: IRow) => {
    const attendanceByMonth = row.attendanceList.filter(attendance => {
      const month = parseInt(attendance.date.split('-')[0])
      return month === selectedMonth;
    });

    return attendanceByMonth.map((attendance, index) => (
      <TableCell key={index}>
        <Checkbox
          style={{ margin: '0px 16px'}}
          indeterminate={!isDateAvailable(attendance.date)}
          disabled={new Date().getTime() < new Date(attendance.date).getTime() || !isDateAvailable(attendance.date)}
          checked={attendance.isPresent}
          onChange={() =>
            handleToggleDay(row.id, attendance.date)
          }
        />
      </TableCell>
    ))
  }

  const getNoClassDays = () => {
    NoClassDaysServices.getAll().then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setNoClassDays(result);
      }
    })
  }

  useEffect(() => {
    getNoClassDays();

    AlunosServices.getAll(pagina, busca).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        const valueStr = localStorage.getItem(ATTENDANCE_LIST);

        let localAdaptedData: IRow[] = [];
        const adaptedData: IRow[] = [];

        if (valueStr) {
          localAdaptedData = JSON.parse(valueStr) as IRow[];
        }

        for (const key in result.data) {
          const item = result.data[key];

          const dados = Object.values(item);
          //Acessar cada indice do array dados
          for (let i = 0; i < dados.length; i++) {
            const adaptedItem = {
              id: dados[i].id,
              name: dados[i].name,
              born_date: dados[i].born_date.toString(),
              address: dados[i].address,
              tutor_name: dados[i].tutor_name,
              tutor_phone: dados[i].tutor_phone,
              class_shift: dados[i].class_shift,
              attendanceList: localAdaptedData.find(data => data.id === dados[i].id)?.attendanceList || getEmptyAttendance(),
            };
            adaptedData.push(adaptedItem);
          }
        }

        setTotalCount(result.totalCount);
        setRows(adaptedData);
      }
    });
  }, [busca, pagina, selectedMonth]);

  return (
    <>
      <Header />

      <BoxList>
        <Typography variant="h4" sx={{ m: 2 }}>
          Lista de Presença
        </Typography>

        <BoxForm>
          <BoxSelect>
            <InputLabel id="month-select-label">Mês</InputLabel>
            <Select
              fullWidth
              labelId="month-select-label"
              id="month-select"
              value={selectedMonth}
              onChange={(e) => onChangeMonth(Number(e.target.value))}
            >
              <MenuItem value={1}>Janeiro</MenuItem>
              <MenuItem value={2}>Fevereiro</MenuItem>
              <MenuItem value={3}>Março</MenuItem>
              <MenuItem value={4}>Abril</MenuItem>
              <MenuItem value={5}>Maio</MenuItem>
              <MenuItem value={6}>Junho</MenuItem>
              <MenuItem value={7}>Julho</MenuItem>
              <MenuItem value={8}>Agosto</MenuItem>
              <MenuItem value={9}>Setembro</MenuItem>
              <MenuItem value={10}>Outubro</MenuItem>
              <MenuItem value={11}>Novembro</MenuItem>
              <MenuItem value={12}>Dezembro</MenuItem>
            </Select>
          </BoxSelect>

          <Button
            variant="contained"
            onClick={() => onClickSave()}
            disabled={!hasChanges}
          >
            Salvar
          </Button>
        </BoxForm>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                {[...Array(numberOfDays)].map((_, index) => (
                  <TableCell key={index}>                    
                    {`${index + 1}, ${getWeekDay(currentYear, selectedMonth, index + 1)}`}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow data-testid="student-row" key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  {getAttendaceByStudentMonth(row)}
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && (
              <caption>{Environment.LISTAGEM_VAZIA}</caption>
            )}

            <TableFooter>
              {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Pagination
                      page={pagina}
                      count={Math.ceil(
                        totalCount / Environment.LIMITE_DE_LINHAS
                      )}
                      onChange={(_, newPage) =>
                        setSearchParams(
                          { busca, pagina: newPage.toString() },
                          { replace: true }
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </BoxList>
    </>
  );
};

export default AttendanceList;
