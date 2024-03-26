"use client";

import { Vulneravel } from "@/database/models/Vulneravel";
import { useRef, useState } from "react";

function Table({ vulneraveisJson }: { vulneraveisJson: string }) {
  const vulneraveis: Vulneravel[] = JSON.parse(vulneraveisJson);
  const modalContainer = useRef<HTMLDialogElement | null>(null);

  const [currentModalTitle, setCurrentModalTitle] = useState("");
  const [currentModalElements, setCurrentModalElements] = useState<any[]>([]);

  function showModal(
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
    elements: any[],
  ) {
    e.preventDefault();

    setCurrentModalTitle(title);
    setCurrentModalElements(elements);

    modalContainer.current!.showModal();
  }

  return (
    <>
      <div className="w-full py-12 bg-base-200 rounded-2xl form-control items-center">
        <div className="max-w-full max-md:px-2">
          <div className="bg-neutral text-neutral-content overflow-x-auto shadow-sm rounded-lg">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center bg-primary text-primary-content">
                    Nome
                  </th>
                  <th className="text-center bg-primary text-primary-content">
                    Total de Adultos
                  </th>
                  <th className="text-center bg-primary text-primary-content">
                    Moradia
                  </th>
                  <th className="text-center bg-primary text-primary-content">
                    Problemas de Saúde da Família
                  </th>
                  <th className="text-center bg-primary text-primary-content">
                    Perdas por Catástrofe
                  </th>
                  <th className="text-center bg-primary text-primary-content">
                    Solicitar Cesta Básica?
                  </th>
                </tr>
              </thead>
              <tbody>
                {vulneraveis.length > 0 ? (
                  vulneraveis.map((vulneravel) => {
                    return (
                      <tr key={vulneravel.id}>
                        <td className="text-center">{vulneravel.nome}</td>
                        <td className="text-center">
                          {vulneravel.total_adultos}
                        </td>
                        <td className="text-center">{vulneravel.moradia}</td>
                        <td className="text-center">
                          {vulneravel.tipos.length ? (
                            <button
                              onClick={(e) =>
                                showModal(
                                  e,
                                  "Problemas de Saúde da Família",
                                  vulneravel.tipos,
                                )
                              }
                            >
                              Visualizar
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="text-center">
                          {vulneravel.perdas_catastrofes}
                        </td>
                        <td className="text-center">
                          {vulneravel.cesta_basica}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="py-4 px-10">Nenhum item registrado!</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog ref={modalContainer} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">{currentModalTitle}</h3>
          <ul className="flex flex-col gap-y-1">
            {currentModalElements.map((element, i) => {
              return (
                <li className="p-2" key={i}>
                  {i + 1 + ". " + element.tipo}
                </li>
              );
            })}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Table;
