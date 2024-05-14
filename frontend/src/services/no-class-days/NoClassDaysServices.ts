import { Environment } from "../../shared-components/environment";
import { Api } from "../axios-config";

export interface INoClassDays {
  id: number;
  periodo_letivo_id: number;
  date: string;
  reason: string;
}

export interface INoClassDaysResponse {
  DiaSemAula: INoClassDays[];
}

const getAll = async (
  page = 1,
  filter = ""
): Promise<INoClassDays[]> => {
  const response = await Api.get<INoClassDaysResponse>('http://127.0.0.1:8000/all_dias_sem_aula');

  return response.data.DiaSemAula;
};


const create = async (
  dados: Omit<INoClassDays, "id">
): Promise<number | Error> => {
  try {
    const response = await Api.post(
      "http://127.0.0.1:8000/create_dia_sem_aula",
      dados
    );
    console.log("Período letivo criado com sucesso:", response.data);

    if (response.status === 200) {
      const { data } = response;
      return data.id;
    }
    return new Error("Erro ao criar um registro");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao criar um registro"
    );
  }
};

const update = async (
  dados: INoClassDays
): Promise<void | Error> => {
  try {
    const response = await Api.post(
      "http://127.0.0.1:8000/update_dia_sem_aula",
      dados
    );
    console.log("Período Letivo atualizado com sucesso:", response.data);

    if (response.status === 200) {
      return;
    }
    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.post("http://127.0.0.1:8000/delete_dia_sem_aula", { id: id });
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro"
    );
  }
};

export const NoClassDaysServices = {
  getAll,
  create,
  update,
  deleteById,
};
