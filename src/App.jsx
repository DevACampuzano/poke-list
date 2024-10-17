import { useState, useEffect } from "react";

import CardCharacter from "./components/CardCharacter";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [page, setPage] = useState("https://rickandmortyapi.com/api/character");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getData = async () => {
    setLoading2(true);
    const responde = await fetch(page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await responde.json();
    setPage(json.info.next);
    console.log(json.info.next);
    const list = [...data, ...json.results];
    setData(list);
    setListFilter(list);
    setLoading(false);
    setLoading2(false);
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
        paddingY: "20px",
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
      {!loading2 && (
        <Button variant="contained" onClick={getData}>
          Siguientes en la lista
        </Button>
      )}
    </Stack>
  );
}

export default App;
