import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  IconButton,
  Pagination,
  Paper,
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

import { BoxList, PaperList } from "./styles";
import { useDebounce } from "shared-components/hooks";
import { Environment } from "shared-components/environment";
import Header from "shared-components/header/Header";
import {
  AlunosServices,
  IListagemALunos,
} from "services/alunos/AlunosServices";
import { getEmptyAttendance, IRow } from "pages/presential-list/AttendanceList";
import { ATTENDANCE_LIST } from "utils/storageKeys";
import AttendanceBarChart from "./views/AttendanceBarChart";
import { INoClassDays, NoClassDaysServices } from "services/no-class-days/NoClassDaysServices";
const AttendanceReport = () => {
  //Definindo os stats
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<IRow[]>([]);
  const [noClassDays, setNoClassDays] = useState<INoClassDays[]>([]);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  //Pegando a página atual
  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

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

  const getAttendanceQtd = (row: IRow, quantifyPresent: boolean) => {
    console.log(row)
    return row.attendanceList.reduce((acc, current) => {
      if (new Date(current.date).getTime() < new Date().getTime()) {
        if(isDateAvailable(current.date)) {
          if (current.isPresent) {
            return quantifyPresent ? acc + 1 : acc;
          }
          return quantifyPresent ? acc : acc + 1;
        }
        return acc;
      }
      return acc;
    }, 0);
  };

  const getAttendancePercent = (row: IRow) => {
    return `${(
      getAttendanceQtd(row, false) /
      (getAttendanceQtd(row, true) + getAttendanceQtd(row, false) || 1)
    ).toPrecision(2)} %`;
  };

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
              attendanceList:
                localAdaptedData.find((data) => data.id === dados[i].id)
                  ?.attendanceList || getEmptyAttendance(),
            };
            adaptedData.push(adaptedItem);
          }
        }

        setTotalCount(result.totalCount);
        setRows(adaptedData);
      }
    });
  }, [busca, pagina]);

  return (
    <>
      <Header />

      <Box display="flex" justifyContent="center">
        <PaperList>
          <TextField
            label="Busca por aluno"
            type="search"
            value={busca}
            onChange={(texto) =>
              setSearchParams(
                { busca: texto.target.value, pagina: "1" },
                { replace: true }
              )
            }
            sx={{ flexGrow: 1 }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </PaperList>
      </Box>

      <Typography variant="h4" sx={{ m: 2 }}>
        Relatório dos Alunos
      </Typography>

      <Box display="flex" flexDirection="row">
        <Box sx={{ width: "50%", flexBasis: "50%", marginBottom: '60px' }}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ m: 1, height: "100%" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome dos Alunos</TableCell>
                  <TableCell>Qtd Presença</TableCell>
                  <TableCell>Qtd Faltas</TableCell>
                  <TableCell>Porcentagem de faltas'</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow key={row.id} data-testid="student-row">
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{getAttendanceQtd(row, true)}</TableCell>
                      <TableCell>{getAttendanceQtd(row, false)}</TableCell>
                      <TableCell>{getAttendancePercent(row)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>Nenhum aluno encontrado.</TableCell>
                  </TableRow>
                )}
              </TableBody>

              {totalCount === 0 && (
                <caption>{Environment.LISTAGEM_VAZIA}</caption>
              )}

              <TableFooter>
                {totalCount > 0 &&
                  totalCount > Environment.LIMITE_DE_LINHAS && (
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
        </Box>
        <Box sx={{ width: "50%", flexBasis: "50%", padding: '32px' }}>
          <AttendanceBarChart students={rows} noClassDays={noClassDays} />
        </Box>
      </Box>
    </>
  );
};

export default AttendanceReport;
function debounce(arg0: () => void) {
  throw new Error("Function not implemented.");
}
