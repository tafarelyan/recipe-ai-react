import { Autocomplete, Box, Button, Container, IconButton, List, ListItem, TextField, Typography, type AutocompleteInputChangeReason } from "@mui/material";
import type { Route } from "./+types/home";
import { useCallback, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<string[]>([]);
  const opcoesIngredientes: string[] = [
    'Frango'
  ];

  const adicionarIngrediente = useCallback((ingrediente: string) => {
    setIngredientesSelecionados(prevIngredientes => [...prevIngredientes, ingrediente]);
  }, [setIngredientesSelecionados]);

  const removerIngrediente = useCallback((ingredienteRemover: string) => {
    setIngredientesSelecionados(prevIngredientes => prevIngredientes.filter(ingrediente => ingrediente !== ingredienteRemover))
  }, [setIngredientesSelecionados]);

  const handleSubmit = () => {
    console.log('Enviando ingredientes para a API:', ingredientesSelecionados);
    alert('Ingredientes enviados para a API! (Simulação - veja o console)');
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Typography variant="h3" component="h2">Formulário</Typography>
        <Autocomplete
          multiple
          freeSolo
          options={opcoesIngredientes}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Ingredientes Disponíveis (Digite e pressione Enter para adicionar)" />}
          onChange={(event, newValue) => setIngredientesSelecionados(newValue)}
          filterSelectedOptions
          sx={{ marginTop: 2 }}
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
