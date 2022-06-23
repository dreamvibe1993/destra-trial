/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLoadTotal } from "../useLoadTotal/useLoadTotal";

export const usePagination = ({ limit }) => {
  const { data: total } = useLoadTotal();

  const [presentPage, setPresentPage] = React.useState(1);
  const [countOfPagesList, setCountOfPagesList] = React.useState([]);
  const [currentBatch, setCurrentBatch] = React.useState([]);

  const restrict = React.useCallback(
    (num) => {
      if (num > countOfPagesList.length - 1) return countOfPagesList.length - 1;
      return num;
    },
    [countOfPagesList]
  );

  const checkOverflow = React.useCallback(() => {
    let start = presentPage;
    let end = presentPage + limit;
    let overflow = false;
    if (
      start > countOfPagesList.length - limit ||
      end > countOfPagesList.length
    ) {
      start = countOfPagesList.length - limit;
      end = countOfPagesList.length;
      overflow = true;
    }
    return {
      start,
      end,
      overflow,
    };
  }, [countOfPagesList, presentPage]);

  const getNextPage = React.useCallback(() => {
    const { start, end, overflow } = checkOverflow();
    let pp = presentPage + 1;
    if (overflow) {
      setCurrentBatch(countOfPagesList.slice(start, end));
      if (pp < countOfPagesList.length) {
        setPresentPage(pp);
      }
      return;
    }
    if (pp > currentBatch[currentBatch.length - 1]) {
      setCurrentBatch(countOfPagesList.slice(start + 1, end + 1));
      setPresentPage(pp);
      return;
    }
    if (!currentBatch.includes(pp)) {
      pp = currentBatch[0];
      setPresentPage(pp);
      return;
    }
    setPresentPage(pp);
  }, [presentPage, countOfPagesList, currentBatch]);

  const getPreviousPage = React.useCallback(() => {
    if (presentPage === 1) return;
    const { start, end, overflow } = checkOverflow();
    let pp = presentPage - 1;
    if (overflow) {
      setCurrentBatch(countOfPagesList.slice(start, end));
    } else {
      if (!currentBatch.includes(pp)) {
        setCurrentBatch(
          countOfPagesList.slice(presentPage - 1, presentPage + (limit - 1))
        );
      }
    }
    setPresentPage(pp);
  }, [presentPage, countOfPagesList, restrict]);

  const getFirstPage = React.useCallback(() => {
    setCurrentBatch(countOfPagesList.slice(1, limit + 1));
    setPresentPage(1);
  }, [countOfPagesList, restrict]);

  const getLastPage = React.useCallback(() => {
    setPresentPage(countOfPagesList.length - 1);
    setCurrentBatch(
      countOfPagesList.slice(
        countOfPagesList.length - limit,
        countOfPagesList.length
      )
    );
  }, [countOfPagesList, restrict]);

  const getPage = React.useCallback(
    (pageNumber) => {
      if (pageNumber > countOfPagesList.length) return getLastPage();
      if (pageNumber < 1) return getFirstPage();
      setPresentPage(pageNumber);
    },
    [countOfPagesList]
  );

  const getNextTenPages = React.useCallback(() => {
    const { start, end } = checkOverflow();
    if (end + limit > countOfPagesList.length) {
      setPresentPage(end - 1);
      setCurrentBatch(
        countOfPagesList.slice(
          countOfPagesList.length - limit,
          countOfPagesList.length
        )
      );
      return;
    }
    setCurrentBatch(countOfPagesList.slice(start + limit, end + limit));
    setPresentPage(end);
  }, [presentPage, countOfPagesList]);

  const getPrevTenPages = React.useCallback(() => {
    if (presentPage === 1) return;
    let start = presentPage - limit;
    let end = presentPage;
    if (start < 1 || end < 1) {
      start = 1;
      end = limit + 1;
    }
    setCurrentBatch(countOfPagesList.slice(start, end));
    setPresentPage(start);
  }, [presentPage, countOfPagesList]);

  React.useEffect(() => {
    if (total?.count && limit) {
      const countList = [];
      const countOfPagesList = [];
      for (let count = 0; count < total.count; count++) {
        countList.push(count);
      }
      const countOfPages = Math.ceil(countList.length / limit);
      for (let count = 0; count < countOfPages; count++) {
        countOfPagesList.push(count);
      }

      setCountOfPagesList(countOfPagesList);

      setCurrentBatch(countOfPagesList.slice(presentPage, presentPage + limit));
    } else {
      console.error("No data in paginator!");
    }
  }, [total?.count, limit]);

  return {
    total,
    presentPage,
    currentBatch,
    getFirstPage,
    getLastPage,
    getNextPage,
    getPreviousPage,
    getNextTenPages,
    getPrevTenPages,
    getPage,
  };
};
