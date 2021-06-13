import { connect } from "react-redux";
import { AppState } from "../../redux/appState";
import { GroupDetailDto, GroupReadDto } from "../../api/group/groupDtos";
import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { loadGroups } from "../../redux/group/groupActions";
import { loadCurrencies } from "../../redux/currency/currencyActions";
import { CurrencyReadDto } from "../../api/currency/currencyDtos";
import { addGroupExpense, loadGroupDetails } from "../../api/group/groupApi";
import { Redirect } from "react-router";
import {
  ExpenseCreateDto,
  ExpenseParticipantDto,
} from "../../api/group/expenseDtos";
import { toast } from "react-toastify";

interface Props {
  groups: GroupReadDto[];
  loadGroups: () => Promise<void>;

  currencies: CurrencyReadDto[];
  loadCurrencies: () => Promise<void>;
}

interface NamedParticipant {
  member: GroupReadDto;
  weight: number;
}

const AddExpensePage = (props: Props) => {
  useEffect(() => {
    props.loadGroups();
    props.loadCurrencies();
  }, []);

  const [title, setTitle] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<GroupDetailDto | void>();
  const [debtors, setDebtors] = useState<NamedParticipant[]>([]);
  const [creditorId, setCreditorId] = useState(0);
  const [newDebtorId, setNewDebtorId] = useState(0);
  const [newDebtorWeight, setNewDebtorWeight] = useState(1);
  const [redirect, setRedirect] = useState(false);

  function selectGroup(groupId: string) {
    if (groupId === "0") {
      setSelectedGroup();
    } else {
      loadGroupDetails(+groupId)
        .then((group) => {
          setSelectedGroup(group);
          setDebtors([]);
        })
        .catch((e) => {});
    }
  }

  function addDebtor() {
    if (selectedGroup) {
      console.log("addDebtor", newDebtorId, newDebtorWeight);
      let member = selectedGroup.members.find(
        (member: GroupReadDto) => member.groupMemberId === newDebtorId
      );
      setDebtors([
        ...debtors,
        { member: member as GroupReadDto, weight: newDebtorWeight },
      ]);
    }
    setNewDebtorId(0);
  }

  function canConfirm() {
    return title && currency && amount && debtors.length && creditorId;
  }

  function confirmExpense() {
    function convertDebtorToDto(
      debtor: NamedParticipant
    ): ExpenseParticipantDto {
      return {
        debtorId: debtor.member.groupMemberId,
        weight: debtor.weight,
      };
    }

    if (selectedGroup) {
      let debtorsDto: ExpenseParticipantDto[] = debtors.map(convertDebtorToDto);
      let expense: ExpenseCreateDto = {
        title: title,
        creditorId,
        debtors: debtorsDto,
        amount: amount,
        currencyAbbreviation: currency,
      };
      addGroupExpense(selectedGroup.id, expense)
        .then(() => {
          toast.success("The expense has been created.");
          setRedirect(true);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  }

  const selectedGroupForm = selectedGroup && (
    <div>
      <Form.Group>
        <Form.Label>Creditor</Form.Label>
        <Form.Control
          as="select"
          placeholder="Group"
          onChange={(e) => setCreditorId(+e.target.value)}
        >
          <option value="0" key="0">
            Select...
          </option>
          {selectedGroup.members.map((member: GroupReadDto) => (
            <option value={member.groupMemberId} key={member.groupMemberId}>
              {member.personName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <div>
        <h2>Debtors</h2>
        <div>
          <div>
            <h5>Add a debtor</h5>
            <div className="row">
              <div className="col">
                <Form.Control
                  as="select"
                  placeholder="Group"
                  onChange={(e) => setNewDebtorId(+e.target.value)}
                >
                  <option value="0" key="0">
                    Select...
                  </option>
                  {selectedGroup.members.map((member: GroupReadDto) => (
                    <option
                      value={member.groupMemberId}
                      key={member.groupMemberId}
                      disabled={
                        !!debtors.find(
                          (debtor) =>
                            member.groupMemberId === debtor.member.groupMemberId
                        )
                      }
                    >
                      {member.personName}
                    </option>
                  ))}
                </Form.Control>
              </div>
              <div className="col">
                <Form.Control
                  as="select"
                  placeholder="Group"
                  onChange={(e) => setNewDebtorWeight(+e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </Form.Control>
              </div>
              <div className="col">
                {newDebtorId && newDebtorWeight ? (
                  <div
                    className="btn btn-outline-success"
                    onClick={() => addDebtor()}
                  >
                    Add debtor
                  </div>
                ) : (
                  <div className="btn btn-outline-dark disabled">
                    Add debtor
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Picked</h5>
            <div>
              {debtors.map((debtor) => (
                <div className="row" key={debtor.member.groupMemberId}>
                  <div className="col-4">{debtor.member.personName}</div>
                  <div className="col-4">Weight: {debtor.weight}</div>
                  <div
                    className="col-1 btn btn-outline-danger btn-sm"
                    onClick={() => {
                      setDebtors(
                        debtors.filter(
                          (participant) =>
                            participant.member.groupMemberId !==
                            debtor.member.groupMemberId
                        )
                      );
                    }}
                  >
                    -
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const groupForm = (
    <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter the expense title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <div className="row">
        <div className="col">
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              placeholder="Enter the paid amount"
              type="number"
              onChange={(e) => setAmount(+e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group>
            <Form.Label>Currency</Form.Label>
            <Form.Control
              as="select"
              placeholder="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="0" key="0">
                Select...
              </option>
              {props.currencies.map((currency: CurrencyReadDto) => (
                <option key={currency.id}>{currency.abbreviation}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <Form.Group>
        <Form.Label>Group</Form.Label>
        <Form.Control
          as="select"
          placeholder="Group"
          onChange={(e) => selectGroup(e.target.value)}
        >
          <option value="0" key="0">
            Select...
          </option>
          {props.groups.map((group: GroupReadDto) => (
            <option value={group.groupId} key={group.groupId}>
              {group.groupName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {selectedGroupForm}
      <div className="text-right">
        {canConfirm() ? (
          <div className="btn btn-success" onClick={() => confirmExpense()}>
            Confirm
          </div>
        ) : (
          <div className="btn btn-dark disabled">Confirm</div>
        )}
      </div>
    </Form>
  );

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="container">
      <div className="card mt-2">
        <div className="card-body">
          <h1 className="card-title">Add a new expense</h1>
          <div>
            <div className="text-left">{groupForm}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    groups: state.groups,
    currencies: state.currencies,
  };
};

const mapDispatchToProps = {
  loadGroups,
  loadCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
