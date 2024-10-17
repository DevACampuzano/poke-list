import { useState, useEffect } from "react";

import CardCharacter from "./components/CardCharacter";
import { CircularProgress, Stack, TextField, Typography } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getData = async () => {
    const responde = await fetch("https://rickandmortyapi.com/api/character", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await responde.json();
    setData(json.results);
    setListFilter(json.results);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  useEffect(() => {
    const idTime = setTimeout(() => {
      const filter = data.filter((item) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
      console.log(filter);
      setListFilter(filter);
    }, 500);

    return () => {
      clearTimeout(idTime);
    };
  }, [search]);

  return (
    <Stack
      sx={{
        width: "100vw",
        gap: "20px",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          padding: "50px",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Lista de personajes
        </Typography>
        <TextField
          label="Nombre"
          variant="filled"
          value={search}
          onChange={handleChange}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            width: "70%",
          }}
        />
      </Stack>
      <Stack
        sx={{
          gap: "20px",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "100vw",
          paddingX: "20px",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : listFilter.length > 0 ? (
          listFilter.map((item) => {
            return (
              <CardCharacter
                key={item.id}
                gender={item.gender}
                image={item.image}
                name={item.name}
                species={item.species}
                status={item.status}
              />
            );
          })
        ) : (
          <Typography variant="h2"> No se encontraron datos.</Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
