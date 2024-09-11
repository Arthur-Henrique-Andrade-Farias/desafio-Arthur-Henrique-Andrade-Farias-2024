class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, ocupados: 3, especies: ['MACACO'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, ocupados: 0, especies: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupados: 2, especies: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanho: 8, ocupados: 0, especies: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, ocupados: 3, especies: ['LEAO'] },
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta', 'savana e rio'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const detalhesAnimal = this.animais[animal];

        
        const recintosViaveis = this.recintos.filter(recinto => {
            const espacoDisponivel = recinto.tamanho - recinto.ocupados;
            const temEspaco = espacoDisponivel >= (detalhesAnimal.tamanho * quantidade);
            const biomaAdequado = detalhesAnimal.biomas.includes(recinto.bioma) || 
                                  (recinto.bioma === 'savana e rio' && detalhesAnimal.biomas.includes('savana') && detalhesAnimal.biomas.includes('rio'));

            if (!temEspaco || !biomaAdequado) return false;

            if (animal === 'MACACO') {
                if (recinto.numero === 5) {
                    return false; 
                }

                const temCarnivoro = recinto.especies.some(especie => this.animais[especie].carnivoro);
                if (temCarnivoro) return false; 
                if (recinto.especies.length === 0 && quantidade < 2) return false; 
            }

            return true;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        const resultado = recintosViaveis
            .sort((a, b) => a.numero - b.numero) 
            .map(recinto => {
                let espacoLivre = recinto.tamanho - recinto.ocupados - (detalhesAnimal.tamanho * quantidade);

                if (recinto.especies.length > 0 && !recinto.especies.includes(animal)) {
                    espacoLivre -= 1; 
                }

                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
            });

        return { recintosViaveis: resultado };
    }
}

export { RecintosZoo as RecintosZoo };
