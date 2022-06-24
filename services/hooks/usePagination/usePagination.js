/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export const usePagination = ({ buttonsLimit, itemsLimit }) => {
  const [presentPage, setPresentPage] = React.useState(1);
  const [totalCountOfPagesArr, setTotalCountOfPagesArr] = React.useState([]);
  const [currentPagesArr, setCurrentPagesArr] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const checkHigherBoundary = React.useCallback(() => {
    const upperLimit = totalCountOfPagesArr.length;
    let start = presentPage;
    let end = presentPage + buttonsLimit;
    const overflow =
      start > upperLimit - buttonsLimit ||
      end >= upperLimit ||
      end >= upperLimit + buttonsLimit;
    if (overflow) {
      start = upperLimit - buttonsLimit;
      end = upperLimit;
    }
    return {
      start,
      end,
      overflow,
    };
  }, [totalCountOfPagesArr, presentPage, buttonsLimit]);

  const checkLowerBoundary = React.useCallback(() => {
    let start = presentPage - buttonsLimit;
    let end = presentPage;
    const lackness = start < 1 || end < 1;
    if (lackness) {
      start = 1;
      end = buttonsLimit + 1;
    }
    return {
      start,
      end,
      lackness,
    };
  }, [presentPage, buttonsLimit]);

  const getNextPage = React.useCallback(() => {
    const { start, end } = checkHigherBoundary();
    let pageToSwitchOn = presentPage + 1;
    const lastCurrentPagesArrItem = currentPagesArr[currentPagesArr.length - 1];
    if (pageToSwitchOn > lastCurrentPagesArrItem) {
      // Must stop.
      setCurrentPagesArr(totalCountOfPagesArr.slice(start, end));
      setPresentPage(pageToSwitchOn - 1);
      return;
    }
    if (!currentPagesArr.includes(pageToSwitchOn)) {
      setPresentPage(currentPagesArr[0]);
      return;
    }
    setPresentPage(pageToSwitchOn);
  }, [presentPage, totalCountOfPagesArr, currentPagesArr]);

  const getPreviousPage = React.useCallback(() => {
    if (presentPage === 1) return;

    let pageToSwitchOn = presentPage - 1;

    const { start, end, overflow } = checkHigherBoundary();

    if (!currentPagesArr.includes(pageToSwitchOn)) {
      setCurrentPagesArr(
        totalCountOfPagesArr.slice(
          pageToSwitchOn,
          pageToSwitchOn + buttonsLimit
        )
      );
      setPresentPage(pageToSwitchOn);
      return;
    }

    if (overflow) {
      // Buttons array shall remain untouched.
      setCurrentPagesArr(totalCountOfPagesArr.slice(start, end));
      setPresentPage(pageToSwitchOn);
      return;
    }

    setPresentPage(pageToSwitchOn);
  }, [presentPage, totalCountOfPagesArr]);

  const getFirstPage = React.useCallback(() => {
    setCurrentPagesArr(totalCountOfPagesArr.slice(1, buttonsLimit + 1));
    setPresentPage(1);
  }, [totalCountOfPagesArr]);

  const getLastPage = React.useCallback(() => {
    setPresentPage(totalCountOfPagesArr.length - 1);
    setCurrentPagesArr(
      totalCountOfPagesArr.slice(
        totalCountOfPagesArr.length - buttonsLimit,
        totalCountOfPagesArr.length
      )
    );
  }, [totalCountOfPagesArr]);

  const getPage = React.useCallback(
    (pageNumber) => {
      setPresentPage(pageNumber);
    },
    [totalCountOfPagesArr]
  );

  const getNextTenPages = React.useCallback(() => {
    const { start, end } = checkHigherBoundary();
    const upperLimit = totalCountOfPagesArr.length;
    if (end + buttonsLimit >= upperLimit) {
      // In case of not full buttons batch (eg. 4 buttons while should be 8).
      setPresentPage(upperLimit - 1);
      setCurrentPagesArr(
        totalCountOfPagesArr.slice(upperLimit - buttonsLimit, upperLimit)
      );
      return;
    }
    setCurrentPagesArr(
      totalCountOfPagesArr.slice(start + buttonsLimit, end + buttonsLimit)
    );
    setPresentPage(end);
  }, [presentPage, totalCountOfPagesArr]);

  const getPrevTenPages = React.useCallback(() => {
    if (presentPage <= 1) return;
    const { start, end } = checkLowerBoundary();
    setCurrentPagesArr(totalCountOfPagesArr.slice(start, end));
    setPresentPage(start);
  }, [presentPage, totalCountOfPagesArr]);

  React.useEffect(() => {
    if (!total || !buttonsLimit || !itemsLimit) {
      console.error(
        "Not enough data in the paginator! Check total or buttonsLimit or itemsLimit!"
      );
      return;
    }
    const countList = [];
    const countOfPagesList = [];

    for (let count = 0; count < total; count++) {
      countList.push(count);
    }

    const countOfPages = Math.ceil(countList.length / itemsLimit);

    for (let count = 0; count < countOfPages; count++) {
      countOfPagesList.push(count);
    }

    setTotalCountOfPagesArr(countOfPagesList);

    const pageToSwitchOn =
      presentPage >= countOfPagesList.length
        ? countOfPagesList.length - buttonsLimit
        : presentPage;

    setCurrentPagesArr(
      countOfPagesList.slice(pageToSwitchOn, pageToSwitchOn + buttonsLimit)
    );
    setPresentPage(pageToSwitchOn);
  }, [total, buttonsLimit, itemsLimit]);

  return {
    total,
    presentPage,
    currentPagesArr,
    setTotal,
    getFirstPage,
    getLastPage,
    getNextPage,
    getPreviousPage,
    getNextTenPages,
    getPrevTenPages,
    getPage,
  };
};
