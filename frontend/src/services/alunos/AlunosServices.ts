import { Environment } from '../../shared-components/environment';
import { Api } from '../axios-config';

export interface IListagemALunos {
    id: number;
    name: string;
    born_date: string;
    address: string;
    tutor_name: string;
    tutor_phone: string;
    class_shift: string;
}

export interface IDetalheAlunos {
    id: number;
    name: string;
    born_date: string;
    address: string;
    tutor_name: string;
    tutor_phone: string;
    class_shift: string;
}

//Irá tipar nossos dados
type TPessoasComTotalCount = {
    data: IListagemALunos[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelative = `/aluno?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
    const response = await Api.get(`http://127.0.0.1:8000${urlRelative}`);

    if (response.data) {
      return {
        data: response.data,
        totalCount: Number(response.headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao listar os registros');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar os registros');
  }
};

const getByName = async (name: string): Promise<IDetalheAlunos | Error> => {
  try {
    const response = await Api.get(`http://127.0.0.1:8000/alunos/${name}`);

    if (response.data) {
      return response.data.Aluno[0];
    }
    return new Error('Erro ao consultar o registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};


const create = async (dados: Omit<IDetalheAlunos, 'id'>): Promise<number | Error> => {
  try {
    const response = await Api.post('http://127.0.0.1:8000/create/aluno', dados);
    console.log('Aluno criado com sucesso:', response.data);
    
    if (response.status === 200) {
      const { data } = response;
      return data.id;
    }
    return new Error('Erro ao criar um registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar um registro');
  }
};

const updateById = async (id: number, dados: IDetalheAlunos): Promise<void | Error> => {
  try {
    const response = await Api.post('http://127.0.0.1:8000/update/aluno', dados);
    console.log('Aluno atualizado com sucesso:', response.data);

    if (response.status === 200) {
      return;
    }
    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.post('http://127.0.0.1:8000/delete/aluno', {id:id})
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro');
  }
};

export const AlunosServices = {
  getAll,
  getByName,
  create,
  updateById,
  deleteById,
};