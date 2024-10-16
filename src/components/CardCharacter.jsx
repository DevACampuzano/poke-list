/* eslint-disable react/prop-types */
import {
  Avatar,
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "./CardCharacterStyles";

const CardCharacter = ({
  name = "Nombre",
  species = "Espacie",
  image = "Foto",
  status = "Estado",
  gender = "Genero",
}) => {
  return (
    <Card sx={{ maxWidth: "300px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#0a6fc7" }} aria-label="recipe">
            {name[0].toUpperCase()}
          </Avatar>
        }
        title={name}
        subheader={species}
      />

      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={name}
        sx={styles.cardMidia}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {status}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {gender}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardCharacter;
