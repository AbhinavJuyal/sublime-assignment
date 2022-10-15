import CheckBox from "@components/CheckBox";
import Text from "@components/Text";
import Radio from "@components/Radio";
import { CHECKBOX, RADIO, TEXT } from "@/utils/constants";

const ShowHOC = ({ id, data, category, edit }: IShowHOC) => {
  const baseProps = {
    id,
    data,
    category,
    edit,
  };

  const ShowTypes: Record<string, JSX.Element> = {
    [TEXT]: <Text {...baseProps} />,
    [CHECKBOX]: <CheckBox {...baseProps} />,
    [RADIO]: <Radio {...baseProps} />,
  };

  return <div>ShowHOC</div>;
};

export default ShowHOC;
