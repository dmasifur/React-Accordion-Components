//single selection
//multiple selection

import { useState } from "react";
import data from "./data";
import styles from "./index.styles.module.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);

    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(cpyMultiple);
    console.log(findIndexOfCurrentId, multiple);
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enalbe multi selection
      </button>
      <div className={styles.accordion}>
        {data && data.length > 0
          ? data.map((dataItem) => (
              <div className={styles.item}>
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className={styles.title}
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>
                {selected === dataItem.id ||
                multiple.indexOf(dataItem.id) !== -1 ? (
                  <div className={styles.content}>{dataItem.answer}</div>
                ) : null}
              </div>
            ))
          : "data not found!"}
      </div>
    </div>
  );
};

export default Accordion;
