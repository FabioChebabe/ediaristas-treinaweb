import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/UserInterface";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useIndex() {
    const [cep, setCep] = useState(''),
        cepValido = useMemo(() => {
            return ValidationService.cep(cep);
        }, [cep]),
        [erro, setErro] = useState(''),
        [buscaFeita, setBuscaFeita] = useState(false),
        [loading, setLoading] = useState(false),
        [diaristas, setDiaristas] = useState([] as UserShortInterface[]),
        [diaristasRestantes, setDiaristasRestantes] = useState(0);

    async function buscaProfissionais(cep: string) {
        setBuscaFeita(false);
        setLoading(true);
        setErro('');

        try {
            const resp = await ApiService.get<{
                diaristas: UserShortInterface[],
                quantidade_diaristas: number
            }>('/api/diaristas-cidade?cep=' + cep.replace(/\D/g, ''));
            setDiaristas(resp.data.diaristas);
            setDiaristasRestantes(resp.data.quantidade_diaristas);
            setBuscaFeita(true);
            setLoading(false);
        } catch (error) {
            setErro('CEP não encontrado');
            setLoading(false);
        }
    }


    return {
        cep, setCep,
        cepValido,
        buscaProfissionais,
        erro,
        diaristas,
        buscaFeita,
        loading,
        diaristasRestantes
    }
}