import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import './styles.scss';

interface PaginationProps {
  className?: string;
  currentIndex: number;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
}

const MAX_NUMBERED_BUTTONS = 6;

export const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const lastIndex = props.pageCount - 1;
  const alloWPreviousPageClick = props.currentIndex > 0;
  const allowNextPageClick = props.currentIndex < lastIndex;

  // Variables for display button and ellipsis functions
  const mid = Math.floor(MAX_NUMBERED_BUTTONS / 2) - 1;
  const amongFirstOrLastButtons = props.currentIndex < mid || props.currentIndex > lastIndex - mid;
  const amongFirstBelowMax = props.currentIndex < MAX_NUMBERED_BUTTONS - 2;
  const amongLastBelowMax = props.currentIndex > lastIndex - MAX_NUMBERED_BUTTONS + 2;

  /* Functions */

  const withinCurrentRange = (pageIndex: number, range: number) => {
    return Math.abs(props.currentIndex - pageIndex) <= range;
  }

  const displayPageNumber = (pageIndex: number) => {
    // First and last page numbers are always displayed
    if (pageIndex === 0 || pageIndex === lastIndex) {
      return true;

    // Shows first several and last several pages if current index is among them
    } else if (amongFirstOrLastButtons) {
      return pageIndex < mid + 1 || pageIndex > lastIndex - mid - 1;
    }

    // Shows first several pages if current index is within two less of the maximum button count
    else if (amongFirstBelowMax) {
      return pageIndex < MAX_NUMBERED_BUTTONS - 1;
    }

    // Shows last several pages if current index is within two less of the maximum button count away from last button
    else if (amongLastBelowMax) {
      return pageIndex > lastIndex - MAX_NUMBERED_BUTTONS + 1;
    }

    // Shows page numbers one away from current index
    else {
      return withinCurrentRange(pageIndex, 1);
    }
  }

  const displayEllipsis = (pageIndex: number) => {
    if (displayPageNumber(pageIndex)) {
      return false;
    }

    if (amongFirstOrLastButtons) {
      return pageIndex === mid + 1;
    } else if (amongFirstBelowMax) {
      return pageIndex === MAX_NUMBERED_BUTTONS - 1;
    } else if (amongLastBelowMax) {
      return pageIndex === lastIndex - MAX_NUMBERED_BUTTONS + 1;
    } else {
      return withinCurrentRange(pageIndex, 2);
    }
  }

  const handlePreviousPage = () => {
    if (alloWPreviousPageClick) {
      props.onPageChange(props.currentIndex - 1);
    }
  }
  const handleNextPage = () => {
    if (allowNextPageClick) {
      props.onPageChange(props.currentIndex + 1);
    }
  }

  return (
    <div className={classNames('pagination-wrapper', props.className)}>
      <Button id='paginationPreviousPage' color='secondary' variant='contained' disabled={!alloWPreviousPageClick}
          onClick={handlePreviousPage} >
        <ChevronLeft />
      </Button>
      {[...Array(props.pageCount).keys()].map(i => (
        displayPageNumber(i) ? (
          <Button id={`pageBtn_${i + 1}`} className={classNames({ 'active': i === props.currentIndex })} key={i}
            color='secondary' variant='contained'
              onClick={() => props.onPageChange(i)}>
            {i + 1}
          </Button>
        ) : (
          displayEllipsis(i) && (
            <div className='ellipsis'>
              ...
            </div>
          )
        )
      ))}
      <Button id='paginationNextPage' color='secondary' variant='contained' disabled={!allowNextPageClick}
          onClick={handleNextPage} >
        <ChevronRight />
      </Button>
    </div>
  );
}
