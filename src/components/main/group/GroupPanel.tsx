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
  const [createNewSelected, setCreateNewSelected] = useState<boolean>(true);
  const [groupNumberSelected, setGroupNumberSelected] = useState<number>(0);
  
  const selectGroupNumber = (groupId: number) => {
    setGroupNumberSelected(groupId)
    setDetailsSelected(true)
    setCreateNewSelected(false)
  }

  return (
    <GroupContext.Provider value={{selectGroupNumber}}>
      <div className="container" style={{}}>

      <h1 className="text-left">Groups</h1>
      <div className="text-right">
        <button className="btn btn-outline-primary btn-round" onClick={() => {setCreateNewSelected(true); setDetailsSelected(false)}}>Add new group</button>
      </div>
      <br />
      <div className="d-flex flex-row">
        <div className="p-1"><GroupPage/></div>
        <div className="col">
          {detailsSelected && <GroupDetails key={'detailsid' + groupNumberSelected} groupId={groupNumberSelected}/>}
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
