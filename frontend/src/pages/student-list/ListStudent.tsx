import React, { useEffect, useMemo, useState } from "react";
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
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
  Typography
} from "@mui/material";

import { BoxList, PaperList } from "./styles";
import { useDebounce } from "shared-components/hooks";
import { Environment } from "shared-components/environment";
import Header from "shared-components/header/Header";
import { AlunosServices, IListagemALunos } from "services/alunos/AlunosServices";


const ListStudent = () => {
  //Definindo os stats
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<IListagemALunos[]>([]);
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  //Pegando a página atual
  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      AlunosServices.getAll(pagina, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
  
            const adaptedData = [];
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
                };
                adaptedData.push(adaptedItem);
              }
            }
  
            setTotalCount(result.totalCount);
            setRows(adaptedData);
          }
        });
    });
  }, [busca, pagina]);
  
    //Lógica para deletar o registro
    const handleDelete = (id: number) => {
      if(window.confirm('Realmente deseja apagar?')){
        AlunosServices.deleteById(id)
          .then((result) => {
            if(result instanceof Error){
              alert(result.message);
            }else{
              setRows(oldRows => {
                return[
                  ...oldRows.filter(row => row.id !== id)
                ];
              });
              alert('Registro apagado com sucesso!');
            }
          });
      }
    };

  return (
    <>
      <Header />

      <Box display='flex' justifyContent='center'>
        <PaperList>
           <TextField
             label="Busca por aluno"
             type="search"
             value={busca}
             onChange={texto => setSearchParams({ busca: texto.target.value, pagina: '1' }, { replace: true })}
             sx={{ flexGrow: 1 }}
           />
           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
             <SearchIcon />
           </IconButton>
         </PaperList>
        </Box>

      <BoxList >
        <Typography variant="h4" sx={{ m: 2 }}>Lista de Alunos</Typography>

        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>Editar/Excluir</TableCell>
                <TableCell >Nome dos Alunos</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Nome do tutor</TableCell>
                <TableCell>Telefone do tutor</TableCell>
                <TableCell>Turno de aula</TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow data-testid="student-row">
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/student-list/edit/${row.name}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.born_date}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.tutor_name}</TableCell>
                    <TableCell>{row.tutor_phone}</TableCell>
                    <TableCell>{row.class_shift}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    Nenhum aluno encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            {totalCount === 0 &&(
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
            )}

            <TableFooter>
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={pagina}
                    count={Math.ceil(totalCount/Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({busca, pagina: newPage.toString()}, {replace: true})}
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

export default ListStudent;
function debounce(arg0: () => void) {
  throw new Error("Function not implemented.");
}
