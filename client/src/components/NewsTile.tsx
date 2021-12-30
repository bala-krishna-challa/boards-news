import { Button, ButtonProps } from "../UI/controls/Button";

interface Props {
  title: string;
  body: string;
  allowEdit: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const NewsTile: React.FC<Props> = ({
  title,
  body,
  allowEdit,
  onEdit,
  onView,
  onDelete,
}) => {
  const viewButtonConfig: ButtonProps = {
    onClick: onView,
  };

  const editButtonConfig: ButtonProps = {
    onClick: onEdit,
  };

  const delButtonConfig: ButtonProps = {
    onClick: onDelete,
  };

  return (
    <div>
      <div>{title}</div>
      <div>{body}</div>
      <Button {...viewButtonConfig}>View</Button>
      {allowEdit && <Button {...editButtonConfig}>Edit</Button>}
      {allowEdit && <Button {...delButtonConfig}>Delete</Button>}
    </div>
  );
};

export default NewsTile;
