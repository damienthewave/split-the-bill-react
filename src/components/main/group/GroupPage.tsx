import { connect } from "react-redux";
import { AppState } from "../../../redux/appState";
import { GroupReadDto } from "../../../api/group/groupDtos";
import React, { useEffect } from "react";
import { loadGroups } from "../../../redux/group/groupActions";
import ApiCallError from "../../../api/apiCallError";
import GroupList from "./GroupList";

interface GroupPageProps {
  groups: GroupReadDto[];
  loadGroups: () => Promise<void>;
}

const GroupPage: React.FC<GroupPageProps> = ({ groups, loadGroups }) => {
  useEffect(() => {
    loadGroups().catch((e: ApiCallError) => {});
  }, []);

  return (
    <div>
      <GroupList groups={groups} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    groups: state.groups,
  };
};

const mapDispatchToProps = {
  loadGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
