import React from "react";

export const usePagination = ({ buttonsLimit, itemsLimit }) => {
  const forward = true;
  const backward = false;

  const [presentPage, setPresentPage] = React.useState(1);
  const [totalCountOfPagesArr, setTotalCountOfPagesArr] = React.useState([]);
  const [currentPagesArr, setCurrentPagesArr] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [direction, setDirection] = React.useState(forward);

  const getNextPage = React.useCallback(() => {
    let pageToSwitchOn = presentPage + 1;
    getPage(pageToSwitchOn);
    setDirection(forward);
  }, [getPage, presentPage]);

  const getPreviousPage = React.useCallback(() => {
    let pageToSwitchOn = presentPage - 1;
    getPage(pageToSwitchOn);
    setDirection(backward);
  }, [getPage, presentPage]);

  const getFirstPage = React.useCallback(() => {
    getPage(1);
  }, [getPage]);

  const getLastPage = React.useCallback(() => {
    const upperLimit = totalCountOfPagesArr.length - 1;
    getPage(upperLimit);
  }, [getPage, totalCountOfPagesArr.length]);

  const getPage = React.useCallback(
    (pageNumber) => {
      const upperLimit = totalCountOfPagesArr.length;
      if (pageNumber === upperLimit) return;
      if (pageNumber === 0) return;
      setPresentPage(pageNumber);
    },
    [totalCountOfPagesArr.length]
  );

  const getNextTenPages = React.useCallback(() => {
    const upperLimit = totalCountOfPagesArr.length;
    if (presentPage + buttonsLimit >= upperLimit) {
      getLastPage();
    } else {
      getPage(presentPage + buttonsLimit);
    }
  }, [buttonsLimit, getLastPage, getPage, presentPage, totalCountOfPagesArr.length]);

  const getPrevTenPages = React.useCallback(() => {
    if (presentPage - buttonsLimit <= 1) {
      getFirstPage();
    } else {
      getPage(presentPage - buttonsLimit);
    }
  }, [buttonsLimit, getFirstPage, getPage, presentPage]);

  React.useEffect(() => {
    const firstPage = 1;
    const lastPage = totalCountOfPagesArr.length;
    const sliceOptionsForward = [presentPage, presentPage + buttonsLimit];
    const sliceOptionsBackward = [presentPage - buttonsLimit + 1, presentPage + 1];
    const sliceOptionsTheEnd = [lastPage - buttonsLimit, lastPage];
    const sliceOptionsTheStart = [firstPage, firstPage + buttonsLimit];

    let currentSliceOptions = sliceOptionsForward;

    if (direction === forward) currentSliceOptions = sliceOptionsForward;
    if (direction === backward) currentSliceOptions = sliceOptionsBackward;
    if (currentPagesArr.includes(presentPage)) return;
    if (direction === forward && currentSliceOptions[1] >= lastPage) currentSliceOptions = sliceOptionsTheEnd;
    if (direction === backward && currentSliceOptions[0] <= firstPage) currentSliceOptions = sliceOptionsTheStart;

    setCurrentPagesArr(totalCountOfPagesArr.slice(currentSliceOptions[0], currentSliceOptions[1]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsLimit, direction, presentPage, totalCountOfPagesArr, itemsLimit]);

  React.useEffect(() => {
    if (!total || !buttonsLimit || !itemsLimit) {
      console.error("Not enough data in the paginator! Check total or buttonsLimit or itemsLimit!");
      return;
    }
    // Getting numbers of pages for loop.
    const countOfPages = Math.ceil(total / itemsLimit);

    // We need list because it's more comfortable to operate with.
    const countOfPagesList = [];

    // Getting total array of numbers of pages.
    for (let count = 0; count < countOfPages; count++) {
      countOfPagesList.push(count);
    }

    // Setting total count of pages array in hook's state.
    setTotalCountOfPagesArr(countOfPagesList);

    // If we had 5 items per page and switched to ten we need to reevaluate present page number.
    const pageToSwitchOn =
      presentPage >= countOfPagesList.length ? countOfPagesList.length - buttonsLimit : presentPage;

    setCurrentPagesArr(countOfPagesList.slice(pageToSwitchOn, pageToSwitchOn + buttonsLimit));

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
