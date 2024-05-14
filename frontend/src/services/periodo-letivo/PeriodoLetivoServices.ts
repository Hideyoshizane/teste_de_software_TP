import { Environment } from "../../shared-components/environment";
import { Api } from "../axios-config";

export interface IPeriodoLetivo {
  id: number;
  start_date: string;
  end_date: string;
  class_shift: string;
}

export interface IPeriodoLetivoResponse {
  PeriodoLetivo: IPeriodoLetivo[];
}

const getAll = async (
  page = 1,
  filter = ""
): Promise<IPeriodoLetivo[]> => {
  const response = await Api.get<IPeriodoLetivoResponse>('http://127.0.0.1:8000/all_periodo_letivos');

  return response.data.PeriodoLetivo;
};


const create = async (
  dados: Omit<IPeriodoLetivo, "id">
): Promise<number | Error> => {
  try {
    const response = await Api.post(
      "http://127.0.0.1:8000/create_periodo_letivo",
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
  dados: IPeriodoLetivo
): Promise<void | Error> => {
  try {
    const response = await Api.post(
      "http://127.0.0.1:8000/update_periodo_letivo",
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
    await Api.post("http://127.0.0.1:8000/delete_periodo_letivo", { id: id });
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro"
    );
  }
};

export const PeriodoLetivoServices = {
  getAll,
  create,
  update,
  deleteById,
};
