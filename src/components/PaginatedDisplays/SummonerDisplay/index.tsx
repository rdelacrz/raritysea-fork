import { Fragment, FunctionComponent, useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { LoadingProgress, Pagination, SummonerCard } from '@components';
import { ClassSkillSet, SummonerData } from '@models';
import { PAGE_SIZE } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
  dataLoading?: boolean;
  summonerDataList: SummonerData[];
  classSkills: ClassSkillSet[][];
  onPurchase?: (summoner: SummonerData) => void;
}

export const SummonerDisplay: FunctionComponent<ComponentProps> = (props) => {
  /* State variables */
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Determines pagination values based on page index and size
  const startIndex = pageIndex * PAGE_SIZE;
  const pageCount = Math.ceil(props.summonerDataList.length / PAGE_SIZE);

  // Applies pagination
  const paginatedSummoners = useMemo(() => {
    if (startIndex >= props.summonerDataList.length) {
      return props.summonerDataList;
    }

    return props.summonerDataList.slice(startIndex, startIndex + PAGE_SIZE);
  }, [props.summonerDataList, startIndex]);

  // Resets pagination every time summoner data list size changes to avoid indexing errors
  useEffect(() => {
    setPageIndex(0);
  }, [props.summonerDataList.length])

  return (
    <div className='summoner-display-wrapper'>
      {props.dataLoading ? (
        <LoadingProgress />
      ) : (
        <Fragment>
          <Grid className='summoners-grid-wrapper' container spacing={3}>
              {paginatedSummoners.map((summonerData, index) => {
                const classIndex = summonerData.class ? summonerData.class.toNumber() - 1 : undefined;
                const classSkillSet = props.classSkills && classIndex !== undefined ? props.classSkills[classIndex] : [];
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <SummonerCard summonerData={summonerData} classSkillSet={classSkillSet} onPurchase={props.onPurchase} />
                  </Grid>
                );
              })}
            </Grid>
            <Pagination currentIndex={pageIndex} pageCount={pageCount} onPageChange={setPageIndex} />
        </Fragment>
      )}
    </div>
  );
}
