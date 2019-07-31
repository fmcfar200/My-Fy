import React from "react";
import { Link } from "react-router-dom";

const GridList = props => {
  const { data, gridClassName, routeName } = props;
  const list = data.map(item => (
    <Link key={item.id} to={`/${routeName}/${item.id}`}>
      <div>
        <img src={item.images[0].url} alt="Cover" />
      </div>
    </Link>
  ));
  return <div className={gridClassName}>{list}</div>;
};

export default GridList;
