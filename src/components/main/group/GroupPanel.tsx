import { connect } from "react-redux";
import { AppState } from "../../../redux/appState";
import React, {useState, useContext} from "react";
import GroupPage from "./GroupPage";
import GroupDetails from "./GroupDetails";
import GroupCreate from "./GroupCreate";

interface Props {}
 
export const GroupContext = React.createContext({selectGroupNumber: (groupId: number) => {}});


const GroupPanel = (props: Props) => {

  const [detailsSelected, setDetailsSelected] = useState<boolean>(false);
  const [createNewSelected, setCreateNewSelected] = useState<boolean>(false);
  const [groupNumberSelected, setGroupNumberSelected] = useState<number>(0);
  
  const selectGroupNumber = (groupId: number) => {
    console.log("GroupPAnel, groupID: " + groupId)
    setGroupNumberSelected(groupId)
    setDetailsSelected(true)
    setCreateNewSelected(false)
  }

  return (
    <GroupContext.Provider value={{selectGroupNumber}}>
      <div className="container">
      <h4 className="text-left">Groups</h4>
      <button className="btn btn-outline-primary py-0 btn-round" onClick={() => {setCreateNewSelected(true); setDetailsSelected(false)}}>Add new group</button>
      <br />
      <div className="row">
        <div className="col"><GroupPage/></div>
        <div className="col">
          {detailsSelected && <GroupDetails groupId={groupNumberSelected}/>}
          {createNewSelected && <GroupCreate/>}
          {!createNewSelected && !detailsSelected && <h1>Select your group</h1>}
        </div>
      </div>
    </div>
    </GroupContext.Provider>
  );
};

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPanel);
