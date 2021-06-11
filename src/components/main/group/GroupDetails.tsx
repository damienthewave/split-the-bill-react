import { EmptyGroupDetailDto, GroupDetailDto } from "../../../api/group/groupDtos";
import React, { useEffect, useState } from "react";
import { loadGroupDetails } from "../../../api/group/groupApi";
import ApiCallError from "../../../api/apiCallError";


interface GroupTileProps {
  groupId: number;
}

const GroupDetails: React.FC<GroupTileProps> = ({ groupId }) => {
  const [groupDetails, setGroupDetails] = useState<GroupDetailDto>(EmptyGroupDetailDto);
  const [displayExpensesDebtors, setDisplayExpensesDebtors] = useState<number[]>([]);
  const [totalAmountsToPayForExpense, setTotalAmountsToPayForExpense] = useState<Map<number, number>>(new Map());

  function calculateAmountToPay(expenseId: number, total: number, weight: number): string {
    let multiplier: number = 1;
    let totalWeight: number | undefined = totalAmountsToPayForExpense.get(expenseId);
    if (totalWeight)
      multiplier = weight / totalWeight;
    return (total * multiplier).toFixed(2);
  }

  const calculateTotalWeightsForExpense = () => {
    let result: Map<number, number> = new Map();
    groupDetails.expenses.forEach(expense => {
      let totalWeight: number = 0;
      expense.debtors.forEach(debtor => {
        totalWeight += debtor.weight;
      });
      result.set(expense.expenseId, totalWeight);
    });
    setTotalAmountsToPayForExpense(result);
  };

  const addTodisplayExpensesDebtors = (expenseId: number) => {
    let newDisplayDebtors = displayExpensesDebtors;
    if (displayExpensesDebtors.includes(expenseId)) {
      setDisplayExpensesDebtors(newDisplayDebtors.filter((id) => id != expenseId));
    } else {
      setDisplayExpensesDebtors([...newDisplayDebtors, expenseId]);
    }
  };

  useEffect(() => {
    calculateTotalWeightsForExpense();
  }, [totalAmountsToPayForExpense]);

  useEffect(() => {
    loadGroupDetails(groupId)
      .then((data) => {
        setGroupDetails(data as GroupDetailDto);
      })
      .catch((e: ApiCallError) => {
      });
  }, [groupId]);

  return <div>
    <h1>{groupDetails.name}</h1>
    <div className='card mb-3'>
      <img className="card-img-top"
           style={{ width: "100%", height: "200px", objectFit: "cover", objectPosition: "100% 50%" }}
           src={groupDetails.photoPath ? groupDetails.photoPath : "https://comfort-flight.pl/wp-content/uploads/2020/02/2-people-sitting-with-view-of-yellow-flowers-during-daytime-196666.jpg"}
           alt="back" />
    </div>
    <h2>Group members</h2>
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Group member name</th>
        <th scope="col">Balance</th>
      </tr>
      </thead>
      <tbody>
      {groupDetails.members.map((member) =>
        <tr>
          <td>{member.name}</td>
          <td>
            {Object.entries(member.memberBalance).map((key) => {
              if (key[1] < 0) {
                return <li className="list-group-item list-group-item-danger">{key[1]} {key[0]}</li>;
              } else {
                return <li className="list-group-item list-group-item-success">{key[1]} {key[0]}</li>;
              }
            })}
          </td>
        </tr>)}
      <tr>
        <td colSpan={2}>
          <button className="btn btn-outline-primary btn-round">Add group member</button>
        </td>
      </tr>
      </tbody>
    </table>

    <br />
    <br />
    <h2>Group expenses</h2>
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Expense name</th>
        <th scope="col">Total amount</th>
        <th scope="col">Creditor</th>
        <th scope="col">Debtors</th>
      </tr>
      </thead>
      <tbody>
      {groupDetails.expenses.map((expense) => {
        console.log(expense)
        return <tr>
          <td>{expense.title}</td>
          <td>{expense.amount} {expense.currency}</td>
          <td>
            {groupDetails.members.map(member => {
              if (member.groupMemberId === expense.creditorMemberId)
                return <span>{member.name}</span>;
            })}
          </td>
          <td>
            <button onClick={() => addTodisplayExpensesDebtors(expense.expenseId)} type="button"
                    className="btn btn-light" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true"
                    aria-controls="collapseExample">
              Debtors <span className="badge badge-primary">{expense.debtors.length - 1}</span>
            </button>
            {displayExpensesDebtors.includes(expense.expenseId) && <ul className="list-group">
              {expense.debtors.map((debtor) => (debtor.debtorId !== expense.creditorMemberId) &&
                <li className="list-group-item">
                  {debtor.name} - {calculateAmountToPay(expense.expenseId, expense.amount, debtor.weight)} {expense.currency}
                </li>)}
            </ul>}
          </td>
        </tr>;
      })}
      </tbody>
    </table>
  </div>;
};


export default (GroupDetails);
