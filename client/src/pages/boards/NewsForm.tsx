import { useInput } from "../../hooks/useInput";
import { hasMinLength, isNotEmpty } from "../../services/validator.service";
import { PostNews } from "../../types/PostNews";
import { Button, ButtonProps } from "../../UI/controls/Button";
import { Input, InputProps } from "../../UI/controls/Input";
import { FormInput, FormInputProps } from "../../UI/form/FormInput";

interface Props {
  title: string;
  author: string;
  body: string;
  boardId: number;
  onSave: (news: PostNews) => void;
}

const NewsForm: React.FC<Props> = ({
  title,
  author,
  body,
  boardId,
  onSave,
}) => {
  // From route we would know if we have to create or edit or view news
  const {
    value: newsTitle,
    error,
    isDirty,
    isValid,
    changeHanlder: titleChangeHandler,
    blurHanlder,
    setValue: setNewsTitle,
  } = useInput({
    initValue: title,
    validators: [
      { isValid: isNotEmpty, error: "Title required!" },
      {
        isValid: hasMinLength(5),
        error: "Title should have minimum 5 characters!",
      },
    ],
  });

  const {
    value: newsBody,
    setValue: setNewsBody,
    changeHanlder: bodyChangeHandler,
  } = useInput({
    initValue: body,
  });

  const submitHanlder = (event: React.SyntheticEvent) => {
    //
    event.preventDefault();
    const news: PostNews = {
      title: newsTitle,
      body: newsBody,
      author,
      boardId,
    };
    onSave(news);
  };

  const formTitleConfig: FormInputProps = {
    inputConfig: {
      invalid: isDirty && !isValid,
      elementType: "input",
      value: newsTitle,
      elementConfig: { type: "text", placeholder: "News title" },
      changeHandler: titleChangeHandler,
      blurHandler: blurHanlder,
    },
    label: "Title",
    error: error,
  };

  const inputBodyConfig: InputProps = {
    elementType: "textarea",
    value: newsBody,
    elementConfig: { placeholder: "News body..." },
    changeHandler: bodyChangeHandler,
  };

  const reset = () => {
    setNewsTitle(title);
    setNewsBody(body);
  };

  const submitButtonConfig: ButtonProps = {
    disabled: !isValid,
    type: "submit",
  };

  const resetButtonConfig: ButtonProps = {
    onClick: reset,
  };

  return (
    <form onSubmit={submitHanlder}>
      <FormInput {...formTitleConfig} />
      <Input {...inputBodyConfig} />
      <div>
        <Button {...resetButtonConfig}>Reset</Button>
        <Button {...submitButtonConfig}>Submit</Button>
      </div>
    </form>
  );
};

export default NewsForm;
