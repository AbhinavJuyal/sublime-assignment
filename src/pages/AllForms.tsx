import EditOptions from "@/components/EditOptions";
import Empty from "@/components/Empty";
import { storageKey } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllForms = () => {
  const [allForms, setAllForms] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    setAllForms({
      ...JSON.parse(window.localStorage.getItem(storageKey) as string),
    });
  }, []);

  const handleClick = () => {
    navigate("/create");
  };

  const emptyState = Object.keys(allForms).length === 0;

  return (
    <div className="flex flex-col w-full min-h-full">
      <div className="font-bold text-2xl mb-8 text-center">All Forms</div>
      <div className="">
        {emptyState ? (
          <Empty />
        ) : (
          <>
            <div className="grid grid-cols-4 font-bold text-lg mb-2">
              <span className="text-center font-bold">S. No.</span>
              <span className="">Title</span>
              <span className="col-span-2">URL</span>
            </div>
            {Object.entries(allForms).map(
              ([key, form]: [key: string, form: any], idx) => (
                <div key={key} className="grid grid-cols-4">
                  <span className="text-center">{idx + 1}</span>
                  <span className="">{form.formTitle}</span>
                  <span className="">
                    <Link
                      to={`/form/${key}`}
                      className="text-ellipsis whitespace-nowrap overflow-hidden min-w-[114px] max-w-full"
                    >
                      {key}
                    </Link>
                  </span>
                  <span>
                    <EditOptions id={key} type="form" />
                  </span>
                </div>
              )
            )}
          </>
        )}
      </div>
      <button
        type="button"
        className="default-button mt-auto"
        onClick={handleClick}
      >
        Create Form
      </button>
    </div>
  );
};
export default AllForms;
