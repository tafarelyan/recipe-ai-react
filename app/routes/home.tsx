import React, { useState } from "react";
import type { Route } from "./+types/home";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Slider,
  TextField,
  Typography
} from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
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
  const [recipeIndex, setRecipeIndex] = useState<number>(0);

  const handleSubmit = () => {
    const prompt = `Você é um cozinheiro profissional bem criativo que pode fazer receita com qualquer
    ingrediente, nesta receita, esses ingredientes precisam estar presentes na receita:
    ${ingredientesSelecionados.join(', ')}. Além disso, ajuste a receita para poder servir ${porcoes}
    porções, em número exato. A partir disso, eu quero a resposta no seguinte formato JSON, tente gerar
    5 receitas nessa lista JSON:
    [
      {
        "nome": "nome da receita",
        "ingredientes": [
          {
            "nome": "nome do ingrediente",
            "quantidade": "quantidade",
            "unidade": "unidade de medida",
          },
        ],
        "modo_de_preparo": ["lista ordenada sobre o passo a passo, em formato de lista"],
        "tempo_de_preparo": "tempo total em minutos",
        "porcoes": "quantas porcoes servem"
      },
    ]`;
    console.log(prompt);
    alert(prompt);
  }

  return (
    <Container>
      <Box sx={{ my: 8 }}>
        <Typography variant="h3" component="h2">Formulário</Typography>
        <Autocomplete
          multiple
          freeSolo
          options={opcoesIngredientes}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Ingredientes Disponíveis (Digite e pressione Enter para adicionar)" />}
          onChange={(event, value) => setIngredientesSelecionados(value)}
          filterSelectedOptions
          sx={{ marginTop: 2 }}
        />
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 3 }}
        >
          Buscar receitas
        </Button>
      </Box>
    </Container>
  );
}
