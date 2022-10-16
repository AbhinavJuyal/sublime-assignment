import CheckBox from "@/components/CheckBox";
import Radio from "@/components/Radio";
import Text from "@/components/Text";
import { CHECKBOX, RADIO, TEXT } from "@/utils/constants";

const ComponentHOC = (props: any) => {
  const { category } = props.data;
  console.log(props);

  const ComponentTypes: Record<string, (props: any) => JSX.Element> = {
    [TEXT]: Text,
    [CHECKBOX]: CheckBox,
    [RADIO]: Radio,
  };

  const Component = ComponentTypes[category];

  return <Component {...props} />;
};

export default ComponentHOC;
