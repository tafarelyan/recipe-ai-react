import React, { useState } from "react";
import type { Route } from "./+types/home";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid2,
  List,
  ListItem,
  Slider,
  TextField,
  Typography
} from "@mui/material";
import mockReceitasJson from '../../mockReceitas.json';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipes AI" },
    { name: "description", content: "Gerador de Receitas por IA" },
  ];
}

interface Ingrediente {
  nome: string;
  quantidade: number;
  unidade: string;
}

interface Receita {
  nome: string;
  ingredientes: Ingrediente[];
  modo_de_preparo: string[];
  tempo_de_preparo: number;
  porcoes: number;
}

export default function Home() {
  const opcoesIngredientes: string[] = [
    // Lista de Ingredientes Genéricos Completa (por categorias):

    // Vegetais:
    'Tomate', 'Cebola', 'Alho', 'Pimentão Vermelho', 'Pimentão Verde', 'Pimentão Amarelo', 'Cenoura', 'Brócolis',
    'Couve-flor', 'Espinafre', 'Alface', 'Pepino', 'Abobrinha', 'Beringela', 'Batata', 'Batata Doce', 'Milho',
    'Ervilha', 'Feijão Verde', 'Abóbora', 'Rúcula', 'Agrião', 'Rabanete', 'Beterraba', 'Nabo', 'Aspargo', 'Alcachofra',
    'Cogumelo Champignon', 'Cogumelo Portobello', 'Cogumelo Shimeji', 'Cogumelo Shitake',

    // Proteínas:
    'Frango (Peito)', 'Frango (Coxa)', 'Frango (Sobrecoxa)', 'Frango (Asa)',
    'Carne Bovina (Filé Mignon)', 'Carne Bovina (Alcatra)', 'Carne Bovina (Patinho)', 'Carne Bovina (Músculo)',
    'Carne Suína (Lombo)', 'Carne Suína (Filé Mignon Suíno)', 'Carne Suína (Pernil)', 'Carne Suína (Costelinha)',
    'Peixe (Salmão)', 'Peixe (Atum)', 'Peixe (Tilápia)', 'Peixe (Bacalhau)', 'Peixe (Sardinha)',
    'Camarão', 'Ovo', 'Tofu', 'Lentilha', 'Grão de Bico', 'Feijão Preto', 'Feijão Carioca', 'Feijão Branco', 'Feijão Fradinho',
    'Soja', 'Quinoa', 'Ervilha Partida',

    // Grãos e Carboidratos:
    'Arroz Branco', 'Arroz Integral', 'Arroz Parboilizado', 'Arroz Basmati', 'Arroz Arborio',
    'Macarrão Espaguete', 'Macarrão Penne', 'Macarrão Farfalle', 'Macarrão Fusilli',
    'Pão Francês', 'Pão Integral', 'Pão de Forma', 'Baguete', 'Ciabatta',
    'Aveia', 'Farinha de Trigo', 'Farinha de Milho', 'Mandioca', 'Polenta', 'Cuscuz', 'Trigo Sarraceno', 'Cevada', 'Centeno',

    // Laticínios e Alternativas:
    'Leite de Vaca', 'Leite de Amêndoa', 'Leite de Soja', 'Leite de Coco', 'Leite de Aveia',
    'Queijo Mussarela', 'Queijo Parmesão', 'Queijo Cheddar', 'Queijo Prato', 'Queijo Minas', 'Queijo Brie', 'Queijo Gouda', 'Queijo Coalho', 'Queijo Ricota',
    'Iogurte Natural', 'Iogurte Grego', 'Iogurte de Frutas', 'Manteiga', 'Creme de Leite', 'Requeijão', 'Leite Condensado', 'Creme de Coco',
    'Queijo Vegano', 'Iogurte Vegano',

    // Frutas:
    'Maçã', 'Banana', 'Morango', 'Uva', 'Limão', 'Laranja', 'Abacaxi', 'Melancia', 'Melão',
    'Manga', 'Pêssego', 'Pera', 'Kiwi', 'Cereja', 'Amora', 'Framboesa', 'Mirtilo', 'Abacate', 'Coco', 'Romã',

    // Temperos, Ervas e Especiarias:
    'Sal', 'Pimenta do Reino', 'Alho em Pó', 'Cebola em Pó', 'Páprica Doce', 'Páprica Picante', 'Páprica Defumada',
    'Cominho', 'Coentro', 'Manjericão', 'Orégano', 'Louro', 'Alecrim', 'Tomilho', 'Salsa', 'Cebolinha', 'Gengibre', 'Canela', 'Cravo', 'Noz Moscada', 'Curry', 'Açafrão', 'Mostarda',
    'Vinagre Branco', 'Vinagre de Vinho Tinto', 'Vinagre de Maçã', 'Vinagre Balsâmico', 'Azeite de Oliva', 'Óleo Vegetal',
    'Molho de Soja', 'Molho Inglês', 'Caldo de Galinha (em pó)', 'Caldo de Carne (em pó)', 'Caldo de Vegetais (em pó)', 'Caldo de Galinha (líquido)', 'Caldo de Carne (líquido)', 'Caldo de Vegetais (líquido)',
    'Mel', 'Açúcar Branco', 'Açúcar Mascavo', 'Açúcar Demerara',

    // Outros Ingredientes:
    'Chocolate Amargo', 'Chocolate Meio Amargo', 'Chocolate ao Leite', 'Chocolate Branco',
    'Café', 'Chá Preto', 'Chá Verde', 'Chá Branco', 'Chá de Camomila', 'Chá de Erva-Cidreira',
    'Farinha de Rosca', 'Fermento Químico', 'Bicarbonato de Sódio', 'Amido de Milho', 'Gelatina', 'Molho de Pimenta', 'Ketchup', 'Maionese'
  ];

  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<string[]>([]);
  const [porcoes, setPorcoes] = useState<number>(8);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [receitaIndex, setReceitaIndex] = useState<number>(0);

  const handleSubmit = () => {
    const prompt = `Você é um cozinheiro profissional bem criativo que pode fazer receita com qualquer
    ingrediente, nesta receita, esses ingredientes precisam estar presentes na receita:
    ${ingredientesSelecionados.join(', ')}. Além disso, ajuste a receita para poder servir ${porcoes}
    porções, em número exato. A partir disso, eu quero a resposta no seguinte formato JSON, tente gerar
    5 receitas nessa lista JSON:
    [
      {
        "nome": "nome da receita, tipo string",
        "ingredientes": [
          {
            "nome": "nome do ingredientem tipo string",
            "quantidade": "quantidade, tipo number",
            "unidade": "unidade de medida, tipo string",
          },
        ],
        "modo_de_preparo": ["lista ordenada sobre o passo a passo, em formato de lista"],
        "tempo_de_preparo": "tempo total em minutos, tipo number",
        "porcoes": "quantas porcoes servem, tipo number"
      },
    ]`;

    // navigator.clipboard.writeText(prompt);
    // alert('Prompt copiado para a clipboard!');
    setReceitas(mockReceitasJson);
  }

  return (
    <Container>
      <Grid2 container sx={{ marginY: 8, minHeight: '80vh', border: '1px solid #777' }}>
        <Grid2 size={6} sx={{ padding: 2 }}>
          <Typography variant="h4" component="h2">Gerador de Receitas por IA</Typography>
          <Autocomplete
            multiple
            freeSolo
            options={opcoesIngredientes}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Ingredientes Disponíveis (Digite e pressione Enter para adicionar)" />}
            onChange={(event, value) => setIngredientesSelecionados(value)}
            filterSelectedOptions
            value={['Tomate', 'Brócolis', 'Tofu', 'Ovo', 'Carne Bovina (Patinho)']}
            sx={{ marginY: 3 }}
          />
          <Box mb={3}>
            <Typography gutterBottom>Número de porções</Typography>
            <Slider
              value={porcoes}
              onChange={(event: Event, value: number | number[]) => setPorcoes(value as number)}
              valueLabelDisplay="on"
              aria-labelledby="porcoes-slider"
              marks={[...Array(8)].map((_, i) => ({
                value: 2*i+1,
                label: `${2*i+1}`,
              }))}
              min={1}
              max={15}
            />
          </Box>
          <TextField
            fullWidth
            id="observations"
            label="Alguma observação adicional sobre a receita?"
            minRows={4}
            multiline
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 3 }}
          >
            Gerar receitas
          </Button>
        </Grid2>
        <Grid2 size={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          {receitas.length > 0 && (
            <>
            {receitas.map((receita, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: 1,
                    border: '1px solid black',
                    cursor: 'pointer',
                    height: index === receitaIndex ? '100%' : 'auto',
                    overflow: 'hidden',
                  }}
                  onClick={() => setReceitaIndex(index)}
                >
                  {index == receitaIndex ? (
                    <>
                      <Typography variant="h5" gutterBottom>{receita.nome}</Typography>
                      <hr />

                      <Typography variant="subtitle1">Ingredientes:</Typography>
                      <List dense>
                        {receita.ingredientes.map((ingrediente, idx) => (
                          <ListItem key={idx}>
                            <Typography>{ingrediente.nome} - {ingrediente.quantidade} {ingrediente.unidade}</Typography>
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="subtitle1" gutterBottom>
                        Modo de Preparo:
                      </Typography>
                      <List dense>
                        {receita.modo_de_preparo.map((passo, idx) => (
                          <ListItem key={idx}>
                            <Typography>{idx + 1}. {passo}</Typography>
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="body2">
                        Tempo de Preparo: {receita.tempo_de_preparo} minutos
                      </Typography>
                      <Typography variant="body2">
                        Porções: {receita.porcoes}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h6">{receita.nome}</Typography>
                  )}
                </Box>
            ))}
            </>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}