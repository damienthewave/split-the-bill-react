import React, { useState } from "react";
import GroupPage from "./GroupPage";
import GroupDetails from "./GroupDetails";
import GroupCreate from "./GroupCreate";

export const GroupContext = React.createContext({
  selectGroupNumber: (groupId: number) => {},
});

const GroupPanel = () => {
  const [detailsSelected, setDetailsSelected] = useState<boolean>(false);
  const [createNewSelected, setCreateNewSelected] = useState<boolean>(true);
  const [groupNumberSelected, setGroupNumberSelected] = useState<number>(0);

  const selectGroupNumber = (groupId: number) => {
    setGroupNumberSelected(groupId);
    setDetailsSelected(true);
    setCreateNewSelected(false);
  };

  return (
    <GroupContext.Provider value={{ selectGroupNumber }}>
      <div className="container">
        <h1 className="text-left">Groups</h1>
        <div className="text-right">
          <button
            className="btn btn-outline-primary btn-round"
            onClick={() => {
              setCreateNewSelected(true);
              setDetailsSelected(false);
            }}
          >
            Add new group
          </button>
        </div>
        <br />
        <div className="d-flex flex-row">
          <div className="p-1">
            <GroupPage />
          </div>
          <div className="col">
            {detailsSelected && <GroupDetails groupId={groupNumberSelected} />}
            {createNewSelected && <GroupCreate />}
            {!createNewSelected && !detailsSelected && (
              <h1>Select your group</h1>
            )}
          </div>
        </div>
      </div>
    </GroupContext.Provider>
  );
};

export default GroupPanel;
