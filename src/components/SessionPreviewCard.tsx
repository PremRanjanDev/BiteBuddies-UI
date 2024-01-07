import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BiteSession } from "../services/session-service";

interface Props {
  session: BiteSession;
  selected: boolean;
  onDetailClick: (id: number) => void;
}

export const SessionPreviewCard = ({
  session,
  selected,
  onDetailClick,
}: Props) => {
  return (
    <Card
      className={
        "flex flex-col justify-between border-2 w-full items-center cursor-pointer" +
        selected
          ? "border-l-4 border-orange-600"
          : ""
      }
      onClick={() => onDetailClick(session.id)}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {session.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {session.description}
        </Typography>
      </CardContent>
      {/* <Button onClick={() => onDetailClick(session.id)} variant="contained">
          View Detail
        </Button> */}
    </Card>
  );
};

export default SessionPreviewCard;
