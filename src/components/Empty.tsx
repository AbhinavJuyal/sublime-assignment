import { SmileySad } from "phosphor-react";

const Empty = () => {
  return (
    <div className="px-6 py-8">
      <SmileySad size={52} weight="fill" className="block mx-auto mb-6" />
      <div className="text-center text-xl">
        <p className="font-semibold mb-2">No Forms Found !</p>
        <p className="">Click the button below to create one!</p>
      </div>
    </div>
  );
};

export default Empty;
