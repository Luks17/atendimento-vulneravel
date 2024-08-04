"use client";

import Form from "@/app/(components)/dashboard/Form";
import FormCarousel from "@/app/(components)/dashboard/FormCarousel";
import ComboBox from "@/app/(components)/formWidgets/uncontrolled/ComboBox";
import Input from "@/app/(components)/formWidgets/uncontrolled/Input";
import { useSetNotification } from "@/app/(components)/notifications/NotificationProvider";
import {
	submitSolicitacaoAuxilio,
	updateSolicitacaoAuxilio,
} from "@/app/actions/SolicitacaoAuxilioActions";
import { Solicitacao } from "@/database/models/Solicitacao";
import { TiposAuxilios, TiposProblemas } from "@/lib/enums/Solicitacao";
import { enumEntries } from "@/lib/enums/common";
import {
	SolicitacaoAuxilioFormData,
	solicitacaoAuxilioSchema,
} from "@/lib/ui/forms/solicitacao-auxilio/schema";
import { sections } from "@/lib/ui/forms/solicitacao-auxilio/sections";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
	solicitacaoJSON?: string;
}

function SolicitacaoForm({ solicitacaoJSON }: Props) {
	const [currentSection, setCurrentSection] = useState(0);
	const setNotification = useSetNotification();

	const solicitacao: Solicitacao | null = solicitacaoJSON
		? JSON.parse(solicitacaoJSON)
		: null;

	const {
		register,
		reset,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm<SolicitacaoAuxilioFormData>({
		resolver: yupResolver(solicitacaoAuxilioSchema),
	});

	const tipoAuxilio = watch(
		"tipo_auxilio",
		TiposAuxilios["Auxílio Medicamento"],
	);

	useEffect(() => {
		if (solicitacao) {
			reset({
				...solicitacao,
				tipo_auxilio: solicitacao.descriminador,
				qtd_cestas_basica: solicitacao.quantidade_cestas,
			});
		}
	}, []);

	function changeSection(
		e: React.MouseEvent<HTMLButtonElement>,
		next: boolean,
	) {
		e.preventDefault();

		const currentSectionItems = sections[currentSection].items;

		trigger(next ? currentSectionItems : []).then((isValid) => {
			if (isValid) {
				const newCurrentSection = next
					? currentSection + 1
					: currentSection - 1;

				document
					.querySelector(`#form-carousel-section-${newCurrentSection}`)
					?.scrollIntoView();

				setCurrentSection(newCurrentSection);
			}
		});
	}

	return (
		<Form.SectionsWrapper currentSection={currentSection} sections={sections}>
			<Form.Root
				onSubmit={handleSubmit(async (formData) => {
					const { success, data } =
						solicitacao === null
							? await submitSolicitacaoAuxilio(formData)
							: await updateSolicitacaoAuxilio(solicitacao.id, formData);

					if (success) {
						setNotification({ message: data.message, messageType: "success" });
					} else {
						setNotification({ message: data.message, messageType: "error" });
					}
				})}
			>
				<FormCarousel.Root>
					<FormCarousel.Section id={0}>
						<ComboBox
							register={register("tipo_problema")}
							enumOptions={enumEntries(TiposProblemas)}
							label="Tipo de Problema"
							error={errors.tipo_problema}
						/>
						<Input
							register={register("descricao_problema")}
							label="Descrição do Problema"
							error={errors.descricao_problema}
						/>
					</FormCarousel.Section>
					<FormCarousel.Section id={1}>
						<ComboBox
							register={register("tipo_auxilio")}
							enumOptions={enumEntries(TiposAuxilios)}
							label="Tipo de Auxílio"
							error={errors.tipo_auxilio}
						/>
						{tipoAuxilio === TiposAuxilios["Cesta Básica"] && (
							<div className="animate-[fade-in_.5s]">
								<Input
									register={register("qtd_cestas_basica", {
										shouldUnregister: true,
									})}
									label="Quantidade de Cestas Básicas"
									type="number"
									defaultValue={0}
									size={5}
									error={errors.qtd_cestas_basica}
								/>
							</div>
						)}
						{tipoAuxilio === TiposAuxilios["Auxílio Medicamento"] && (
							<div className="animate-[fade-in_.5s]">
								<Input
									register={register("vl_auxilio_medicamento", {
										shouldUnregister: true,
									})}
									label="Valor de Auxílio Medicamento"
									size={10}
									placeholder="R$"
									error={errors.vl_auxilio_medicamento}
								/>
							</div>
						)}
						{tipoAuxilio === TiposAuxilios["Vaga para Creche"] && (
							<div className="animate-[fade-in_.5s]">
								<Input
									register={register("qtd_vagas_creche", {
										shouldUnregister: true,
									})}
									label="Quantidade de Vagas para Creche"
									type="number"
									defaultValue={0}
									size={5}
									error={errors.qtd_vagas_creche}
								/>
							</div>
						)}
						{tipoAuxilio === TiposAuxilios["Vaga para Escola"] && (
							<div className="animate-[fade-in_.5s]">
								<Input
									register={register("qtd_vagas_escola", {
										shouldUnregister: true,
									})}
									label="Quantidade de Vagas para Escola"
									type="number"
									defaultValue={0}
									size={5}
									error={errors.qtd_vagas_escola}
								/>
							</div>
						)}
					</FormCarousel.Section>
				</FormCarousel.Root>
				<Form.SubmitWithSections
					currentSection={currentSection}
					sectionsNumber={sections.length}
					changeSection={changeSection}
				/>
			</Form.Root>
		</Form.SectionsWrapper>
	);
}

export default SolicitacaoForm;