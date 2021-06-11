import React, { useEffect, useState } from "react";
import { DailyPersonExpenses } from "../../api/statistics/statisticsDtos";
import { loadAllPersonExpenses } from "../../redux/statistics/statisticsActions";
import { connect } from "react-redux";
import ApiCallError from "../../api/apiCallError";
import AllPersonExpensesPane from "./AllPersonExpensesPane";

interface Props {
  loadAllPersonExpenses: () => Promise<DailyPersonExpenses>
}

const StatisticsPage = ({loadAllPersonExpenses}: Props) => {

  const [allExpenses, setAllExpenses] = useState<DailyPersonExpenses>(new Map());

  useEffect(() => {
    loadAllPersonExpenses()
      .then((result: DailyPersonExpenses | void) => {
        const actualResult = result as DailyPersonExpenses
        const resultMap = new Map()
        Object.keys(actualResult).forEach(currency => {
          // @ts-ignore
          resultMap.set(currency, new Map(Object.entries(actualResult[currency])))
        })
        setAllExpenses(resultMap)
      })
      .catch((e: ApiCallError) => {
      })
  }, [loadAllPersonExpenses])

  return <div className='m-5'>
    <AllPersonExpensesPane allExpenses={allExpenses} />
  </div>
}

const mapStateToProps = () => {
  return {
    
  }
}

const mapDispatchToProps = {
  loadAllPersonExpenses
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);