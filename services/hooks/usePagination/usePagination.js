import React from "react";

export const usePagination = ({ buttonsLimit, itemsLimit }) => {
  const [presentPage, setPresentPage] = React.useState(1);
  const [totalCountOfPagesArr, setTotalCountOfPagesArr] = React.useState([]);
  const [currentPagesArr, setCurrentPagesArr] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [direction, setDirection] = React.useState(true);

  // =====
  const getNextPage = React.useCallback(() => {
    let pageToSwitchOn = presentPage + 1;
    getPage(pageToSwitchOn);
    setDirection(true);
  }, [getPage, presentPage]);

  const getPreviousPage = React.useCallback(() => {
    let pageToSwitchOn = presentPage - 1;
    getPage(pageToSwitchOn);
    setDirection(false);
  }, [getPage, presentPage]);
  // =====

  // =====
  const getFirstPage = React.useCallback(() => {
    getPage(1);
  }, [getPage]);

  const getLastPage = React.useCallback(() => {
    getPage(totalCountOfPagesArr.length - 1);
  }, [getPage, totalCountOfPagesArr.length]);
  // =====

  const getPage = React.useCallback(
    (pageNumber) => {
      if (pageNumber === totalCountOfPagesArr.length) return;
      if (pageNumber === 0) return;
      setPresentPage(pageNumber);
    },
    [totalCountOfPagesArr.length]
  );

  // =====
  const getNextTenPages = React.useCallback(() => {
    if (presentPage + buttonsLimit >= totalCountOfPagesArr.length) {
      getLastPage();
    } else {
      getPage(presentPage + buttonsLimit);
    }
  }, [
    buttonsLimit,
    getLastPage,
    getPage,
    presentPage,
    totalCountOfPagesArr.length,
  ]);

  const getPrevTenPages = React.useCallback(() => {
    if (presentPage - buttonsLimit <= 1) {
      getFirstPage();
    } else {
      getPage(presentPage - buttonsLimit);
    }
  }, [buttonsLimit, getFirstPage, getPage, presentPage]);
  // =====

  React.useEffect(() => {
    const firstPage = 1;
    const lastPage = totalCountOfPagesArr.length;
    const sliceOptionsForward = [presentPage, presentPage + buttonsLimit];
    const sliceOptionsBackward = [
      presentPage - buttonsLimit + 1,
      presentPage + 1,
    ];
    const sliceOptionsTheEnd = [lastPage - buttonsLimit, lastPage];
    const sliceOptionsTheStart = [firstPage, firstPage + buttonsLimit];
    let currentSliceOptions = sliceOptionsForward;
    if (direction === true) currentSliceOptions = sliceOptionsForward;
    if (direction === false) currentSliceOptions = sliceOptionsBackward;
    if (direction === true && currentPagesArr.includes(presentPage)) return;
    if (direction === false && currentPagesArr.includes(presentPage)) return;
    if (direction === true && currentSliceOptions[1] >= lastPage)
      currentSliceOptions = sliceOptionsTheEnd;
    if (direction === false && currentSliceOptions[0] <= firstPage)
      currentSliceOptions = sliceOptionsTheStart;
    setCurrentPagesArr(
      totalCountOfPagesArr.slice(currentSliceOptions[0], currentSliceOptions[1])
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsLimit, direction, presentPage, totalCountOfPagesArr, itemsLimit]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
